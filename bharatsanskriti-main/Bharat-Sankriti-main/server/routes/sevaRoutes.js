import express from 'express';
import { query } from '../config/db.js';
import { authenticateToken, requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * GET /api/sevas
 * Fetch all Seva opportunities
 */
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT s.*, u.name as admin_name, u.temple_name
      FROM sevas s
      LEFT JOIN users u ON s.temple_admin_id = u.id
      ORDER BY s.created_at DESC
    `);

    const formatted = result.rows.map(s => ({
      id: s.id,
      templeAdminId: s.temple_admin_id,
      adminName: s.admin_name,
      templeName: s.temple_name || s.location,
      title: s.title,
      description: s.description,
      requiredSkills: s.required_skills || [],
      location: s.location,
      dateDetails: s.date_details,
      status: s.status,
      createdAt: s.created_at
    }));

    return res.json(formatted);
  } catch (err) {
    console.error('Fetch sevas error:', err);
    return res.status(500).json({ error: 'Failed to fetch Seva opportunities' });
  }
});

/**
 * POST /api/sevas
 * Create a new Seva opportunity (Server-side RBAC: Temple Admin only!)
 */
router.post('/', authenticateToken, requireRole('TEMPLE_ADMIN'), async (req, res) => {
  try {
    const { title, description, requiredSkills = [], location, dateDetails } = req.body;

    if (!title || !location) {
      return res.status(400).json({ error: 'Title and location are required.' });
    }

    const sevaId = `opp-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    const adminId = req.user.id;

    const result = await query(
      `INSERT INTO sevas (id, temple_admin_id, title, description, required_skills, location, date_details, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'OPEN')
       RETURNING *`,
      [sevaId, adminId, title.trim(), description || '', Array.isArray(requiredSkills) ? requiredSkills : [requiredSkills], location.trim(), dateDetails || 'Ongoing']
    );

    return res.status(201).json({
      message: 'Seva opportunity published successfully',
      seva: result.rows[0]
    });
  } catch (err) {
    console.error('Create seva error:', err);
    return res.status(500).json({ error: 'Failed to create Seva opportunity' });
  }
});

/**
 * POST /api/sevas/:id/apply
 * User applies for a Seva (Server-side RBAC: User role)
 */
router.post('/:id/apply', authenticateToken, requireAuth, async (req, res) => {
  try {
    const sevaId = req.params.id;
    const userId = req.user.id;
    const { message = '' } = req.body;

    const existing = await query('SELECT * FROM seva_applications WHERE seva_id = $1 AND user_id = $2', [sevaId, userId]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'You have already applied for this Seva opportunity.' });
    }

    const appId = `app-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;

    const result = await query(
      `INSERT INTO seva_applications (id, seva_id, user_id, application_status, message)
       VALUES ($1, $2, $3, 'PENDING', $4)
       RETURNING *`,
      [appId, sevaId, userId, message.trim()]
    );

    return res.status(201).json({
      message: 'Application submitted successfully',
      application: result.rows[0]
    });
  } catch (err) {
    console.error('Apply seva error:', err);
    return res.status(500).json({ error: 'Failed to submit application' });
  }
});

/**
 * GET /api/sevas/:id/applications
 * Fetch applications for a Seva (Temple Admin only)
 */
router.get('/:id/applications', authenticateToken, requireRole('TEMPLE_ADMIN'), async (req, res) => {
  try {
    const sevaId = req.params.id;
    const result = await query(
      `SELECT sa.*, u.name as applicant_name, u.email as applicant_email, u.skills as applicant_skills, u.location as applicant_location
       FROM seva_applications sa
       JOIN users u ON sa.user_id = u.id
       WHERE sa.seva_id = $1
       ORDER BY sa.applied_at DESC`,
      [sevaId]
    );

    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

/**
 * PATCH /api/sevas/applications/:appId/status
 * Accept or Reject Seva Application (Temple Admin only)
 */
router.patch('/applications/:appId/status', authenticateToken, requireRole('TEMPLE_ADMIN'), async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body; // 'ACCEPTED' | 'REJECTED'

    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Status must be ACCEPTED or REJECTED.' });
    }

    const result = await query(
      `UPDATE seva_applications SET application_status = $1 WHERE id = $2 RETURNING *`,
      [status, appId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    return res.json({
      message: `Application ${status.toLowerCase()} successfully`,
      application: result.rows[0]
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update application status' });
  }
});

export default router;
