import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'bharat_sanskriti_jwt_super_secret_key_2026';

/**
 * Generate JWT token for an authenticated user
 */
export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      templeName: user.temple_name || user.templeName || ''
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Authenticate JWT token middleware (populates req.user)
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
      return next();
    }
    req.user = decoded;
    next();
  });
}

/**
 * Require valid logged-in user
 */
export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Authentication Required: Please sign in to perform this action.'
    });
  }
  next();
}

/**
 * Require specific role (e.g., 'TEMPLE_ADMIN' or 'USER')
 */
export function requireRole(allowedRole) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication Required: Please sign in to perform this action.'
      });
    }

    const userRole = (req.user.role || '').toUpperCase();
    const targetRole = allowedRole.toUpperCase();

    if (userRole !== targetRole && userRole !== 'TEMPLE_ADMIN') {
      return res.status(403).json({
        error: `Forbidden: This endpoint requires ${targetRole} privileges.`
      });
    }

    next();
  };
}
