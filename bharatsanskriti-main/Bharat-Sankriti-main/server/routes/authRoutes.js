import express from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { generateToken, authenticateToken, requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new regular User or Temple Administrator
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'USER', location = '', skills = [], bio = '', templeName = '' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await query('SELECT id FROM users WHERE email = $1', [cleanEmail]);

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `${role.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const userRole = role.toUpperCase() === 'TEMPLE_ADMIN' ? 'TEMPLE_ADMIN' : 'USER';
    const avatarInitial = name.charAt(0).toUpperCase() || 'U';

    const insertRes = await query(
      `INSERT INTO users (id, name, email, password_hash, role, location, skills, bio, avatar_initial, temple_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, name, email, role, location, skills, bio, avatar_initial, temple_name, created_at`,
      [userId, name.trim(), cleanEmail, passwordHash, userRole, location.trim() || 'India', Array.isArray(skills) ? skills : [skills], bio, avatarInitial, templeName]
    );

    const user = insertRes.rows[0];
    const token = generateToken(user);

    return res.status(201).json({
      message: 'Account registered successfully',
      token,
      user
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Failed to register account' });
  }
});

/**
 * POST /api/auth/login
 * Sign in as User or Temple Administrator
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const result = await query('SELECT * FROM users WHERE email = $1', [cleanEmail]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (role && role.toUpperCase() !== user.role.toUpperCase() && user.role !== 'TEMPLE_ADMIN') {
      return res.status(403).json({ error: `Account role mismatch. This account is registered as ${user.role}.` });
    }

    const token = generateToken(user);

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location,
      skills: user.skills || [],
      bio: user.bio || '',
      avatarInitial: user.avatar_initial || 'U',
      templeProfile: user.temple_name ? { templeName: user.temple_name } : null
    };

    return res.json({
      message: 'Logged in successfully',
      token,
      user: userPayload
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Failed to log in' });
  }
});

/**
 * GET /api/auth/me
 * Fetch current user profile
 */
router.get('/me', authenticateToken, requireAuth, async (req, res) => {
  try {
    const result = await query('SELECT id, name, email, role, location, skills, bio, avatar_initial, temple_name FROM users WHERE id = $1', [req.user.id]);

    if (result.rows.length === 0) {
      return res.status(444).json({ error: 'User not found' });
    }

    const u = result.rows[0];
    return res.json({
      user: {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        location: u.location,
        skills: u.skills || [],
        bio: u.bio || '',
        avatarInitial: u.avatar_initial,
        templeProfile: u.temple_name ? { templeName: u.temple_name } : null
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

export default router;
