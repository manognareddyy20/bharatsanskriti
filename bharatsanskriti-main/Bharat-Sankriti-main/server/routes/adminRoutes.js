import express from 'express';
import { query } from '../config/db.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Enforce Temple Admin RBAC on all admin routes
router.use(authenticateToken, requireRole('TEMPLE_ADMIN'));

/**
 * GET /api/admin/stories
 * Fetch stories for moderation
 */
router.get('/stories', async (req, res) => {
  try {
    const result = await query(`
      SELECT s.*, u.name as author_name
      FROM stories s
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC
    `);

    const formatted = result.rows.map(s => ({
      id: s.id,
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
      preservedBy: s.author_name || s.person || 'Contributor',
      createdAt: s.created_at
    }));

    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch admin stories' });
  }
});

/**
 * PATCH /api/admin/stories/:id/moderate
 * Moderate story verification status (SUPPORTED_FACT, PERSONAL_STORY, NOT_RELEVANT)
 */
router.patch('/stories/:id/moderate', async (req, res) => {
  try {
    const storyId = req.params.id;
    const { status, reason = '' } = req.body;

    const validStatuses = ['PERSONAL_STORY', 'SUPPORTED_FACT', 'NEEDS_VERIFICATION', 'ADMIN_REVIEW', 'NOT_RELEVANT', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid verification status.' });
    }

    const outcomeReason = reason || `Verified by Temple Admin as ${status}`;

    const result = await query(
      `UPDATE stories
       SET verification_status = $1, verification_reason = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [status, outcomeReason, storyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    return res.json({
      message: 'Story verification status updated successfully',
      story: result.rows[0]
    });
  } catch (err) {
    console.error('Moderate story error:', err);
    return res.status(500).json({ error: 'Failed to moderate story' });
  }
});

/**
 * GET /api/admin/reviews
 * Fetch all reviews for moderation
 */
router.get('/reviews', async (req, res) => {
  try {
    const result = await query(`
      SELECT r.*, u.name as reviewer_name,
             (SELECT JSON_AGG(rep) FROM review_reports rep WHERE rep.review_id = r.id) as reports
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `);

    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch admin reviews' });
  }
});

/**
 * PATCH /api/admin/reviews/:id/moderate
 * Approve or Reject review
 */
router.patch('/reviews/:id/moderate', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { status, reason = '' } = req.body; // 'APPROVED' | 'REJECTED'

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Status must be APPROVED or REJECTED.' });
    }

    const outcomeReason = reason || `Manually ${status.toLowerCase()} by Temple Admin`;

    const result = await query(
      `UPDATE reviews SET moderation_status = $1, outcome_reason = $2 WHERE id = $3 RETURNING *`,
      [status, outcomeReason, reviewId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    return res.json({
      message: `Review ${status.toLowerCase()} successfully`,
      review: result.rows[0]
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to moderate review' });
  }
});

export default router;
