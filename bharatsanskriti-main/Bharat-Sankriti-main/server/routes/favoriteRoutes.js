import express from 'express';
import pool from '../config/db.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * GET /api/favorites
 * Get all favorite story IDs and saved artisan IDs for authenticated user
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT target_type, target_id FROM favorites WHERE user_id = $1`,
      [req.user.id]
    );

    const favoriteStoryIds = result.rows
      .filter((row) => row.target_type === 'story')
      .map((row) => row.target_id);

    const savedArtisanIds = result.rows
      .filter((row) => row.target_type === 'artisan')
      .map((row) => row.target_id);

    res.json({
      success: true,
      favoriteStoryIds,
      savedArtisanIds,
      all: result.rows
    });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ error: 'Server error fetching favorites' });
  }
});

/**
 * POST /api/favorites/toggle
 * Toggle favorite for story or artisan for authenticated user
 */
router.post('/toggle', authenticateToken, async (req, res) => {
  const { targetType, targetId } = req.body;

  if (!targetType || !targetId) {
    return res.status(400).json({ error: 'targetType and targetId are required' });
  }

  const normalizedType = targetType.toLowerCase();
  if (!['story', 'artisan', 'item'].includes(normalizedType)) {
    return res.status(400).json({ error: 'Invalid targetType' });
  }

  try {
    // Check if favorite exists
    const existing = await pool.query(
      `SELECT id FROM favorites WHERE user_id = $1 AND target_type = $2 AND target_id = $3`,
      [req.user.id, normalizedType, targetId]
    );

    if (existing.rows.length > 0) {
      // Remove favorite
      await pool.query(
        `DELETE FROM favorites WHERE user_id = $1 AND target_type = $2 AND target_id = $3`,
        [req.user.id, normalizedType, targetId]
      );
      return res.json({
        success: true,
        isFavorite: false,
        targetType: normalizedType,
        targetId
      });
    } else {
      // Add favorite
      const id = `fav-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      await pool.query(
        `INSERT INTO favorites (id, user_id, target_type, target_id) VALUES ($1, $2, $3, $4)`,
        [id, req.user.id, normalizedType, targetId]
      );
      return res.json({
        success: true,
        isFavorite: true,
        targetType: normalizedType,
        targetId
      });
    }
  } catch (err) {
    console.error('Error toggling favorite:', err);
    res.status(500).json({ error: 'Server error toggling favorite' });
  }
});

export default router;
