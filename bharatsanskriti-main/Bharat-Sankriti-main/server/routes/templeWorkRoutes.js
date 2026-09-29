import express from 'express';
import { query } from '../config/db.js';
import { authenticateToken, requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { estimateProjectBudget } from '../services/budgetEstimationService.js';

const router = express.Router();

/**
 * GET /api/temple-work
 * Fetch all TempleWork restoration projects
 */
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT p.*, u.name as admin_name, u.temple_name
      FROM temple_work_projects p
      LEFT JOIN users u ON p.temple_admin_id = u.id
      ORDER BY p.created_at DESC
    `);

    const formatted = result.rows.map(p => ({
      id: p.id,
      templeAdminId: p.temple_admin_id,
      adminName: p.admin_name,
      templeName: p.temple_name || 'Temple Administration',
      title: p.title,
      description: p.description,
      category: p.category,
      projectSize: p.project_size,
      complexity: p.complexity,
      duration: p.duration,
      materials: p.materials,
      numArtisans: p.num_artisans,
      suggestedBudgetMin: Number(p.suggested_budget_min),
      suggestedBudgetMax: Number(p.suggested_budget_max),
      finalBudget: Number(p.final_budget),
      status: p.status,
      createdAt: p.created_at
    }));

    return res.json(formatted);
  } catch (err) {
    console.error('Fetch temple work error:', err);
    return res.status(500).json({ error: 'Failed to fetch TempleWork projects' });
  }
});

/**
 * POST /api/temple-work/estimate-budget
 * Rule-Based Budget Estimation (Deterministic labor + size + complexity calculations)
 */
router.post('/estimate-budget', (req, res) => {
  try {
    const estimation = estimateProjectBudget(req.body);
    return res.json(estimation);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to calculate budget estimation' });
  }
});

/**
 * POST /api/temple-work
 * Create a new TempleWork restoration project (Temple Admin only)
 */
router.post('/', authenticateToken, requireRole('TEMPLE_ADMIN'), async (req, res) => {
  try {
    const {
      title,
      description = '',
      category,
      projectSize = 'Medium',
      complexity = 'Moderate',
      duration = '1 month',
      materials = '',
      numArtisans = 1,
      finalBudget = 0
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: 'Project title and craft category are required.' });
    }

    // Compute rule-based suggested min/max budget
    const budgetEstimate = estimateProjectBudget({
      category,
      project_size: projectSize,
      complexity,
      duration,
      num_artisans: numArtisans,
      materials
    });

    const projId = `proj-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    const adminId = req.user.id;
    const finalBudgetValue = Number(finalBudget) || budgetEstimate.suggested_budget_min;

    const result = await query(
      `INSERT INTO temple_work_projects (
        id, temple_admin_id, title, description, category, project_size, complexity,
        duration, materials, num_artisans, suggested_budget_min, suggested_budget_max, final_budget, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'POSTED')
      RETURNING *`,
      [
        projId, adminId, title.trim(), description.trim(), category, projectSize, complexity,
        duration, materials, numArtisans, budgetEstimate.suggested_budget_min, budgetEstimate.suggested_budget_max, finalBudgetValue
      ]
    );

    return res.status(201).json({
      message: 'TempleWork project created successfully',
      project: result.rows[0],
      budgetEstimation: budgetEstimate
    });
  } catch (err) {
    console.error('Create temple work project error:', err);
    return res.status(500).json({ error: 'Failed to create TempleWork project' });
  }
});

/**
 * POST /api/temple-work/:id/apply
 * Artisan applies for a TempleWork project
 */
router.post('/:id/apply', authenticateToken, requireAuth, async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;
    const { proposalText = '', expectedTimeline = '', skillsRef = [] } = req.body;

    const existing = await query('SELECT * FROM temple_work_applications WHERE project_id = $1 AND user_id = $2', [projectId, userId]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'You have already submitted a proposal for this project.' });
    }

    const appId = `tw-app-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;

    const result = await query(
      `INSERT INTO temple_work_applications (id, project_id, user_id, proposal_text, expected_timeline, skills_ref, application_status)
       VALUES ($1, $2, $3, $4, $5, $6, 'PENDING')
       RETURNING *`,
      [appId, projectId, userId, proposalText.trim(), expectedTimeline.trim() || '1 month', Array.isArray(skillsRef) ? skillsRef : [skillsRef]]
    );

    // Update project status to APPLIED
    await query(`UPDATE temple_work_projects SET status = 'APPLIED' WHERE id = $1 AND status = 'POSTED'`, [projectId]);

    return res.status(201).json({
      message: 'Proposal submitted successfully',
      application: result.rows[0]
    });
  } catch (err) {
    console.error('TempleWork apply error:', err);
    return res.status(500).json({ error: 'Failed to submit proposal' });
  }
});

/**
 * POST /api/temple-work/:id/offer
 * Make an agreed offer to an artisan (Calculates 10% platform fee & 90% payout)
 */
router.post('/:id/offer', authenticateToken, requireRole('TEMPLE_ADMIN'), async (req, res) => {
  try {
    const projectId = req.params.id;
    const { artisanUserId, totalAmount } = req.body;

    if (!artisanUserId || !totalAmount) {
      return res.status(400).json({ error: 'Artisan User ID and Agreed Total Amount are required.' });
    }

    const amount = Number(totalAmount);
    const platformFee = Number((amount * 0.10).toFixed(2));
    const artisanPayout = Number((amount - platformFee).toFixed(2));

    const offerId = `offer-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;

    const offerRes = await query(
      `INSERT INTO temple_work_offers (id, project_id, artisan_user_id, amount, platform_fee, artisan_payout, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'OFFER_MADE')
       RETURNING *`,
      [offerId, projectId, artisanUserId, amount, platformFee, artisanPayout]
    );

    // Update project status to OFFER_MADE
    await query(`UPDATE temple_work_projects SET status = 'OFFER_MADE', final_budget = $1 WHERE id = $2`, [amount, projectId]);

    return res.status(201).json({
      message: 'TempleWork offer created successfully',
      offer: {
        id: offerRes.rows[0].id,
        projectId: offerRes.rows[0].project_id,
        artisanUserId: offerRes.rows[0].artisan_user_id,
        agreedAmount: Number(offerRes.rows[0].amount),
        platformFee: Number(offerRes.rows[0].platform_fee),
        artisanPayout: Number(offerRes.rows[0].artisan_payout),
        status: offerRes.rows[0].status
      }
    });
  } catch (err) {
    console.error('Make offer error:', err);
    return res.status(500).json({ error: 'Failed to create offer' });
  }
});

export default router;
