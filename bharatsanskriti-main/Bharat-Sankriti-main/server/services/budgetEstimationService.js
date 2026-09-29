/**
 * Rule-Based TempleWork Budget Estimation Engine
 * Calculates suggested minimum & maximum budgets based on deterministic artisan labor, scale, complexity & materials.
 * NO random AI prices.
 */

const CATEGORY_BASE_MONTHLY_COST = {
  'granite stone carving': 25000,
  'bronze idol casting': 30000,
  'temple mural painting': 20000,
  'wood carving': 22000,
  'brass sheet embossing': 24000,
  'terracotta temple tiles': 18000,
  'stucco sculpture': 20000
};

const SIZE_MULTIPLIERS = {
  'small': 0.8,
  'medium': 1.0,
  'large': 1.5,
  'monumental': 2.2
};

const COMPLEXITY_MULTIPLIERS = {
  'basic': 0.85,
  'moderate': 1.0,
  'high': 1.35,
  'master shilpi': 1.75
};

export function estimateProjectBudget({
  category = '',
  project_size = 'Medium',
  complexity = 'Moderate',
  duration = '1 month',
  num_artisans = 1,
  materials = ''
}) {
  const catKey = (category || '').toLowerCase().trim();
  const sizeKey = (project_size || 'Medium').toLowerCase().trim();
  const compKey = (complexity || 'Moderate').toLowerCase().trim();

  // 1. Base monthly cost per artisan
  const baseMonthlyRate = CATEGORY_BASE_MONTHLY_COST[catKey] || 22000;

  // 2. Multipliers
  const sizeMult = SIZE_MULTIPLIERS[sizeKey] || 1.0;
  const compMult = COMPLEXITY_MULTIPLIERS[compKey] || 1.0;

  // 3. Parse Duration in Months
  const durationMatch = (duration || '').match(/\d+/);
  const durationMonths = durationMatch ? Math.max(1, parseInt(durationMatch[0], 10)) : 1;

  // 4. Parse Artisan Count
  const artisanCount = Math.max(1, parseInt(num_artisans || '1', 10));

  // 5. Material Cost Adder based on description keywords
  let materialAdder = 5000;
  const matLower = (materials || '').toLowerCase();
  if (matLower.includes('bronze') || matLower.includes('gold') || matLower.includes('brass')) {
    materialAdder = 15000;
  } else if (matLower.includes('granite') || matLower.includes('stone') || matLower.includes('teak')) {
    materialAdder = 10000;
  }

  // Calculate Base Total Estimate
  const totalLaborCost = baseMonthlyRate * sizeMult * compMult * durationMonths * artisanCount;
  const baseEstimate = totalLaborCost + (materialAdder * durationMonths);

  // Min: 90% of base, Max: 125% of base, rounded to nearest 1,000
  const minBudget = Math.max(5000, Math.round((baseEstimate * 0.90) / 1000) * 1000);
  const maxBudget = Math.max(minBudget + 5000, Math.round((baseEstimate * 1.25) / 1000) * 1000);

  return {
    suggested_budget_min: minBudget,
    suggested_budget_max: maxBudget,
    calculation_breakdown: {
      base_monthly_rate: baseMonthlyRate,
      artisan_count: artisanCount,
      duration_months: durationMonths,
      size_multiplier: sizeMult,
      complexity_multiplier: compMult,
      material_adder: materialAdder
    }
  };
}
