import express from 'express';
import { query } from '../config/db.js';
import { authenticateToken, requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * GET /api/reviews
 * Fetch published reviews
 */
router.get('/', async (req, res) => {
  try {
    const { itemId, itemType } = req.query;

    let sql = `
      SELECT r.*, u.name as reviewer_name, u.avatar_initial
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (itemId) {
      params.push(itemId);
      sql += ` AND r.target_id = $${params.length}`;
    }

    if (itemType) {
      params.push(itemType);
      sql += ` AND r.target_type = $${params.length}`;
    }

    sql += ` ORDER BY r.created_at DESC`;

    const result = await query(sql, params);

    const formatted = result.rows.map(r => ({
      id: r.id,
      itemId: r.target_id,
      itemType: r.target_type,
      itemTitle: r.target_title,
      reviewerName: r.reviewer_name || 'Verified Participant',
      reviewerId: r.user_id,
      rating: r.rating,
      reviewText: r.review_text,
      verifiedExperience: r.verified_experience,
      culturalRelevanceScore: r.cultural_relevance_score,
      status: r.moderation_status,
      outcomeReason: r.outcome_reason,
      createdAt: r.created_at
    }));

    return res.json(formatted);
  } catch (err) {
    console.error('Fetch reviews error:', err);
    return res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

/**
 * POST /api/reviews
 * Submit a new review (Checks participation eligibility)
 */
router.post('/', authenticateToken, requireAuth, async (req, res) => {
  try {
    const { itemId, itemType = 'seva', itemTitle = '', rating = 5, reviewText, hasCompletedExperience = false } = req.body;
    const userId = req.user.id;

    if (!reviewText || !reviewText.trim()) {
      return res.status(400).json({ error: 'Review text is required.' });
    }

    // Participation check: For Seva / TempleWork, verify user has accepted application if not already verified
    let verifiedExp = Boolean(hasCompletedExperience);
    if (!verifiedExp && (itemType === 'seva' || itemType === 'templework')) {
      const appCheck = await query(
        `SELECT id FROM seva_applications WHERE seva_id = $1 AND user_id = $2 AND application_status IN ('ACCEPTED', 'COMPLETED')`,
        [itemId, userId]
      );
      if (appCheck.rows.length > 0) {
        verifiedExp = true;
      }
    }

    const reviewId = `rev-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    const initialStatus = 'APPROVED';
    const reason = 'Approved — Verified Cultural Contribution';

    const insertRes = await query(
      `INSERT INTO reviews (id, user_id, target_type, target_id, target_title, rating, review_text, verified_experience, moderation_status, outcome_reason)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [reviewId, userId, itemType, itemId, itemTitle, rating, reviewText.trim(), verifiedExp, initialStatus, reason]
    );

    return res.status(201).json({
      message: 'Review submitted successfully',
      review: insertRes.rows[0]
    });
  } catch (err) {
    console.error('Submit review error:', err);
    return res.status(500).json({ error: 'Failed to submit review' });
  }
});

/**
 * POST /api/reviews/:id/report
 * Report a published review
 */
router.post('/:id/report', authenticateToken, requireAuth, async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { reason = 'Unrelated content', userNote = '' } = req.body;
    const reporterUserId = req.user.id;

    const reportId = `rep-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;

    await query(
      `INSERT INTO review_reports (id, review_id, reporter_user_id, reason, user_note)
       VALUES ($1, $2, $3, $4, $5)`,
      [reportId, reviewId, reporterUserId, reason, userNote.trim()]
    );

    // Update review status to REPORTED
    await query(
      `UPDATE reviews SET moderation_status = 'REPORTED', outcome_reason = $1 WHERE id = $2`,
      [`Flagged by Community — Reported for ${reason}`, reviewId]
    );

    return res.json({ message: 'Review reported to Temple Admin for moderation.' });
  } catch (err) {
    console.error('Report review error:', err);
    return res.status(500).json({ error: 'Failed to report review' });
  }
});

export default router;
