import express from 'express';
import { query } from '../config/db.js';
import { authenticateToken, requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * GET /api/stories
 * Fetch cultural stories with privacy filtering
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { searchQuery, category } = req.query;
    const currentUser = req.user;

    let sql = `
      SELECT s.*, u.name as author_name, u.avatar_initial
      FROM stories s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    // Filter unverified stories from general public
    if (!currentUser || currentUser.role !== 'TEMPLE_ADMIN') {
      if (currentUser) {
        params.push(currentUser.id);
        sql += ` AND (s.verification_status IN ('PERSONAL_STORY', 'SUPPORTED_FACT', 'CULTURALLY_RELEVANT', 'APPROVED') OR s.user_id = $${params.length})`;
      } else {
        sql += ` AND s.verification_status IN ('PERSONAL_STORY', 'SUPPORTED_FACT', 'CULTURALLY_RELEVANT', 'APPROVED')`;
      }
    }

    sql += ` ORDER BY s.created_at DESC`;

    const result = await query(sql, params);

    const formatted = result.rows.map(s => ({
      id: s.id,
      userId: s.user_id,
      title: s.title,
      description: s.description,
      person: s.person,
      place: s.place,
      tradition: s.tradition,
      storyType: s.story_type,
      verificationStatus: s.verification_status,
      verificationReason: s.verification_reason,
      hasAudio: s.has_audio,
      audioDuration: s.audio_duration,
      audioId: s.audio_id,
      preservedBy: s.author_name || s.person || 'Family Contributor',
      createdAt: s.created_at,
      formattedDate: new Date(s.created_at).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })
    }));

    return res.json(formatted);
  } catch (err) {
    console.error('Fetch stories error:', err);
    return res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

/**
 * POST /api/stories
 * Create a new cultural story (Status defaults to NEEDS_VERIFICATION for admin review)
 */
router.post('/', authenticateToken, requireAuth, async (req, res) => {
  try {
    const {
      title,
      description = '',
      person = '',
      place = '',
      tradition = '',
      storyType = 'GENERAL',
      hasAudio = false,
      audioDuration = '',
      audioId = null
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Story title is required.' });
    }

    const storyId = `cultural-story-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const userId = req.user.id;
    const initialStatus = 'NEEDS_VERIFICATION';
    const reason = 'Pending Temple Administrator verification';

    const insertRes = await query(
      `INSERT INTO stories (id, user_id, title, description, person, place, tradition, story_type, verification_status, verification_reason, has_audio, audio_duration, audio_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [storyId, userId, title.trim(), description.trim(), person.trim(), place.trim() || 'India', tradition.trim() || 'Oral Tradition', storyType, initialStatus, reason, Boolean(hasAudio), audioDuration, audioId]
    );

    const s = insertRes.rows[0];

    return res.status(201).json({
      message: 'Cultural story submitted successfully for Temple Verification',
      story: {
        id: s.id,
        userId: s.user_id,
        title: s.title,
        description: s.description,
        person: s.person,
        place: s.place,
        tradition: s.tradition,
        storyType: s.story_type,
        verificationStatus: s.verification_status,
        verificationReason: s.verification_reason,
        hasAudio: s.has_audio,
        audioDuration: s.audio_duration,
        audioId: s.audio_id,
        preservedBy: req.user.name,
        createdAt: s.created_at
      }
    });
  } catch (err) {
    console.error('Create story error:', err);
    return res.status(500).json({ error: 'Failed to create cultural story' });
  }
});

/**
 * GET /api/stories/:id
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await query('SELECT * FROM stories WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch story' });
  }
});

export default router;
