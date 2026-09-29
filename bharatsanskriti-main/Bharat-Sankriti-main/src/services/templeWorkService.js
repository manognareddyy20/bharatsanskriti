import { DEMO_TEMPLEWORK_PROJECTS, DEMO_ARTISANS, DEMO_TEMPLES } from '../data/heritageConnectData.js';
import apiClient from './api/apiClient.js';

const PROJECTS_STORAGE_KEY = 'bharat_sanskriti_templework_projects_v1';
const ENQUIRIES_STORAGE_KEY = 'bharat_sanskriti_templework_enquiries_v1';
const APPLICATIONS_STORAGE_KEY = 'bharat_sanskriti_templework_applications_v1';

// Seed initial demo enquiry
const SEED_ENQUIRIES = [
  {
    id: 'enquiry-seed-1',
    projectId: 'proj-1',
    projectTitle: 'Chola-Style Granite Nandi Mandapa Pillar Flute Restoration',
    artisanId: 'artisan-1',
    artisanName: 'Shilpi K. Ramanathan Sthapathi',
    artisanCraft: 'Traditional stone carving',
    templeId: 'temple-brihadeeswarar',
    templeName: 'Brihadeeswarar Temple',
    templeContact: 'S. Ramanathan (Heritage Restoration Wing)',
    message: 'Respected Sthapathi, the temple trustees would like to invite your workshop to inspect the weathered granite cornices of the outer pavilion and submit technical feasibility notes.',
    status: 'ENQUIRY SENT',
    sentAt: '2026-09-04T12:00:00.000Z'
  }
];

// Seed initial demo application for testing full lifecycle
const SEED_APPLICATIONS = [
  {
    id: 'app-seed-1',
    projectId: 'proj-1',
    projectTitle: 'Chola-Style Granite Nandi Mandapa Pillar Flute Restoration',
    artisanId: 'artisan-1',
    artisanName: 'Shilpi K. Ramanathan Sthapathi',
    artisanCraft: 'Traditional stone carving',
    templeId: 'temple-brihadeeswarar',
    templeName: 'Brihadeeswarar Temple',
    proposedQuote: 85000,
    timeline: '6 Months (Phased)',
    proposalNote: 'Our Mahabalipuram workshop will carefully hand-carve Krishna Shila granite cornices using traditional chisels and lime mortar.',
    status: 'APPLICATION_SUBMITTED',
    appliedAt: '2026-09-10T10:00:00.000Z'
  }
];

// ------------------------------------------------------------
// Intelligent Budget Suggestion Engine Reference Data
// ------------------------------------------------------------

export const BUDGET_REFERENCE_DATA = {
  'Heritage documentation': {
    Small: [5000, 15000],
    Medium: [15000, 40000],
    Large: [40000, 100000]
  },
  'Traditional painting': {
    Small: [15000, 30000],
    Medium: [30000, 60000],
    Large: [60000, 150000]
  },
  'Mural painting': {
    Small: [15000, 30000],
    Medium: [30000, 60000],
    Large: [60000, 150000]
  },
  'Stone carving': {
    Small: [25000, 50000],
    Medium: [50000, 100000],
    Large: [100000, 250000]
  },
  'Traditional stone carving': {
    Small: [25000, 50000],
    Medium: [50000, 100000],
    Large: [100000, 250000]
  },
  'Traditional sculpture': {
    Small: [30000, 60000],
    Medium: [60000, 150000],
    Large: [150000, 350000]
  },
  'Bronze casting': {
    Small: [30000, 70000],
    Medium: [70000, 150000],
    Large: [150000, 400000]
  },
  'Temple restoration': {
    Small: [50000, 100000],
    Medium: [100000, 300000],
    Large: [300000, 1000000]
  },
  'Heritage restoration': {
    Small: [50000, 100000],
    Medium: [100000, 300000],
    Large: [300000, 1000000]
  },
  'Wood carving': {
    Small: [20000, 40000],
    Medium: [40000, 90000],
    Large: [90000, 200000]
  },
  'Metalwork': {
    Small: [20000, 45000],
    Medium: [45000, 100000],
    Large: [100000, 250000]
  },
  'Traditional architecture': {
    Small: [50000, 120000],
    Medium: [120000, 350000],
    Large: [350000, 1200000]
  }
};

export const BUDGET_NOTE = "Indicative estimate only. Final amount is mutually agreed between the temple and artisan based on project requirements.";

/**
 * 10% Platform Service Fee Calculator
 * Bharat Sanskriti retains 10% platform commission; 90% is disbursed to the master artisan upon project confirmation.
 */
export function calculatePlatformFee(amount) {
  const total = Number(amount) || 0;
  const platformFee = Math.round(total * 0.10);
  const netArtisanPayout = total - platformFee;
  return {
    totalAmount: total,
    platformFee, // 10% to Bharat Sanskriti Platform
    netArtisanPayout // 90% to Artisan Studio
  };
}

/**
 * Intelligent Project-Budget Calculator Function (Backend API + Local Fallback)
 */
export async function calculateSuggestedBudgetAsync(params) {
  try {
    const res = await apiClient.post('/api/temple-work/estimate-budget', params);
    if (res.minBudget && res.maxBudget) {
      return res;
    }
  } catch (err) {
    console.warn('API budget calculation failed, using local rule-engine:', err.message);
  }

  return calculateSuggestedBudget(params);
}

export function calculateSuggestedBudget({
  workCategory = 'Traditional stone carving',
  scale = 'Medium',
  complexity = 'Standard',
  duration = '3 Months',
  numArtisans = '2-3 Artisans',
  materialsProvided = 'Shared Procurement',
  expertise = 'Senior Craftsman'
}) {
  let matchedCat = BUDGET_REFERENCE_DATA[workCategory];
  if (!matchedCat) {
    const key = Object.keys(BUDGET_REFERENCE_DATA).find(k => k.toLowerCase().includes((workCategory || '').toLowerCase()));
    matchedCat = key ? BUDGET_REFERENCE_DATA[key] : BUDGET_REFERENCE_DATA['Traditional stone carving'];
  }

  const range = matchedCat[scale] || matchedCat['Medium'] || [50000, 100000];
  let [baseMin, baseMax] = range;

  let multiplier = 1.0;
  if (complexity === 'Basic') multiplier *= 0.85;
  else if (complexity === 'Complex') multiplier *= 1.2;
  else if (complexity === 'High Precision') multiplier *= 1.45;

  if (numArtisans === '2-3 Artisans') multiplier *= 1.25;
  else if (numArtisans === '4-10 Team') multiplier *= 1.75;
  else if (numArtisans === '10+ Guild') multiplier *= 2.5;

  if (materialsProvided === 'Artisan Procures Special Materials') multiplier *= 1.2;
  else if (materialsProvided === 'Temple Provides All') multiplier *= 0.9;

  if (expertise === 'Master Sthapathi') multiplier *= 1.25;
  else if (expertise === 'Skilled Artisan') multiplier *= 0.9;

  let finalMin = Math.round((baseMin * multiplier) / 1000) * 1000;
  let finalMax = Math.round((baseMax * multiplier) / 1000) * 1000;
  if (finalMin < 5000) finalMin = 5000;
  if (finalMax <= finalMin) finalMax = finalMin + 10000;

  const suggestedDefault = Math.round((finalMin + finalMax) / 2 / 1000) * 1000;
  const formattedRange = `₹${finalMin.toLocaleString('en-IN')} – ₹${finalMax.toLocaleString('en-IN')}`;

  return {
    minBudget: finalMin,
    maxBudget: finalMax,
    suggestedDefault,
    formattedRange,
    note: BUDGET_NOTE
  };
}

// ------------------------------------------------------------
// Projects Management
// ------------------------------------------------------------

export async function getAllProjectsAsync() {
  try {
    const res = await apiClient.get('/api/temple-work');
    if (res.projects && Array.isArray(res.projects)) {
      return res.projects.map(p => ({
        ...p,
        requiredCraft: p.category || p.requiredCraft,
        budgetRange: p.budgetRange || `₹${Number(p.suggested_budget_min || 25000).toLocaleString('en-IN')} – ₹${Number(p.suggested_budget_max || 100000).toLocaleString('en-IN')}`,
        offeredBudget: Number(p.final_budget || p.suggested_budget_min || 50000)
      }));
    }
  } catch (err) {
    console.warn('API getAllProjects failed, falling back to LocalStorage:', err.message);
  }
  return getAllProjects();
}

export function getAllProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEMO_TEMPLEWORK_PROJECTS));
      return DEMO_TEMPLEWORK_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEMO_TEMPLEWORK_PROJECTS;
  } catch (e) {
    return DEMO_TEMPLEWORK_PROJECTS;
  }
}

export function getProjectById(projectId) {
  const projects = getAllProjects();
  return projects.find((p) => p.id === projectId) || null;
}

export async function createProject(projectData, templeAdminProfile = null) {
  const templeId = projectData.templeId || templeAdminProfile?.templeProfile?.templeId || 'temple-ramappa';
  const templeName = projectData.templeName || templeAdminProfile?.templeProfile?.templeName || 'Ramappa Temple';
  const templeLocation = projectData.templeLocation || templeAdminProfile?.templeProfile?.location || 'Telangana';

  try {
    const res = await apiClient.post('/api/temple-work', {
      title: (projectData.title || '').trim(),
      description: (projectData.description || '').trim(),
      category: (projectData.requiredCraft || 'Traditional stone carving').trim(),
      project_size: projectData.scale || 'Medium',
      complexity: projectData.complexity || 'Standard',
      duration: projectData.timeline || '3 Months',
      materials: (projectData.materials || '').trim(),
      num_artisans: 1
    });

    if (res.project) {
      const p = res.project;
      const formatted = {
        ...p,
        templeId,
        templeName,
        templeLocation,
        requiredCraft: p.category,
        budgetRange: `₹${Number(p.suggested_budget_min).toLocaleString('en-IN')} – ₹${Number(p.suggested_budget_max).toLocaleString('en-IN')}`,
        offeredBudget: Number(p.suggested_budget_min)
      };
      const existing = getAllProjects();
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([formatted, ...existing]));
      return formatted;
    }
  } catch (err) {
    console.warn('API createProject failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const projects = getAllProjects();

  const newProject = {
    id: `proj-${Date.now()}`,
    templeId,
    templeName,
    templeLocation,
    title: (projectData.title || '').trim(),
    requiredCraft: (projectData.requiredCraft || 'Traditional stone carving').trim(),
    scale: projectData.scale || 'Medium',
    complexity: projectData.complexity || 'Standard',
    numArtisans: projectData.numArtisans || '1 Solo Master',
    materialsProvided: projectData.materialsProvided || 'Shared Procurement',
    expertise: projectData.expertise || 'Senior Craftsman',
    offeredBudget: Number(projectData.offeredBudget) || 50000,
    budgetRange: projectData.budgetRange || '₹25,000 – ₹75,000',
    materials: (projectData.materials || '').trim(),
    location: projectData.location || templeLocation,
    timeline: projectData.timeline || '3 Months',
    experienceRequired: projectData.experienceRequired || '5+ Years experience in heritage craft',
    description: (projectData.description || '').trim(),
    referenceImages: projectData.referenceImages && projectData.referenceImages.length > 0 
      ? projectData.referenceImages 
      : ['https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80'],
    status: 'OPEN',
    createdAt: new Date().toISOString()
  };

  const updated = [newProject, ...projects];
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving project in localStorage:', e);
  }

  return newProject;
}

export function updateProject(projectId, updates) {
  const projects = getAllProjects();
  const index = projects.findIndex(p => p.id === projectId);
  if (index === -1) return null;

  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Error updating project in localStorage:', e);
  }

  return projects[index];
}

// ------------------------------------------------------------
// Applications & End-to-End Lifecycle Management
// ------------------------------------------------------------

export function getAllApplications() {
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(SEED_APPLICATIONS));
      return SEED_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_APPLICATIONS;
  } catch (e) {
    return SEED_APPLICATIONS;
  }
}

export function getApplicationsForProject(projectId) {
  const all = getAllApplications();
  return all.filter(a => a.projectId === projectId);
}

export async function submitProjectApplication({
  projectId,
  artisanId = 'artisan-1',
  artisanName = 'Shilpi K. Ramanathan Sthapathi',
  artisanCraft = 'Traditional stone carving',
  proposedQuote,
  timeline,
  proposalNote
}) {
  try {
    const res = await apiClient.post(`/api/temple-work/${projectId}/apply`, {
      proposalText: proposalNote || '',
      expectedTimeline: timeline || '3 Months'
    });

    if (res.application) {
      const project = getProjectById(projectId);
      const app = res.application;
      const formattedApp = {
        id: app.id,
        projectId,
        projectTitle: project?.title || 'Temple Work Project',
        artisanId,
        artisanName,
        artisanCraft,
        proposedQuote: Number(proposedQuote) || 50000,
        timeline: timeline || '3 Months',
        proposalNote: proposalNote || '',
        status: 'APPLICATION_SUBMITTED',
        appliedAt: app.applied_at || new Date().toISOString()
      };

      const existing = getAllApplications();
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify([formattedApp, ...existing]));
      return formattedApp;
    }
  } catch (err) {
    console.warn('API submitProjectApplication failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const project = getProjectById(projectId);
  if (!project) throw new Error('Project not found');

  const newApp = {
    id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    projectId,
    projectTitle: project.title,
    templeId: project.templeId,
    templeName: project.templeName,
    artisanId,
    artisanName,
    artisanCraft,
    proposedQuote: Number(proposedQuote) || project.offeredBudget || 50000,
    timeline: timeline || project.timeline || '3 Months',
    proposalNote: (proposalNote || '').trim(),
    status: 'APPLICATION_SUBMITTED',
    appliedAt: new Date().toISOString()
  };

  const existing = getAllApplications();
  const updated = [newApp, ...existing];
  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated));
    updateProject(projectId, { status: 'APPLICATION_RECEIVED' });
  } catch (e) {
    console.error('Error saving application:', e);
  }

  return newApp;
}

export async function makeProjectOffer({ applicationId, finalOfferAmount, offerNotes = '' }) {
  const apps = getAllApplications();
  const targetApp = apps.find(a => a.id === applicationId);

  if (targetApp && targetApp.projectId) {
    try {
      const res = await apiClient.post(`/api/temple-work/${targetApp.projectId}/offer`, {
        artisanUserId: targetApp.artisanId || 'artisan-1',
        amount: Number(finalOfferAmount) || targetApp.proposedQuote || 50000
      });

      if (res.offer) {
        const index = apps.findIndex(a => a.id === applicationId);
        if (index !== -1) {
          apps[index] = {
            ...apps[index],
            status: 'OFFER_MADE',
            offeredAmount: res.offer.amount,
            platformFee: res.offer.platform_fee,
            artisanPayout: res.offer.artisan_payout,
            offerNotes,
            offeredAt: new Date().toISOString()
          };
          localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
        }
        return apps[index];
      }
    } catch (err) {
      console.warn('API makeProjectOffer failed, falling back to LocalStorage:', err.message);
    }
  }

  // LocalStorage Fallback
  const index = apps.findIndex(a => a.id === applicationId);
  if (index === -1) throw new Error('Application not found');

  const feeCalculation = calculatePlatformFee(finalOfferAmount || apps[index].proposedQuote);

  apps[index] = {
    ...apps[index],
    status: 'OFFER_MADE',
    offeredAmount: feeCalculation.totalAmount,
    platformFee: feeCalculation.platformFee,
    artisanPayout: feeCalculation.netArtisanPayout,
    offerNotes,
    offeredAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
    updateProject(apps[index].projectId, { 
      status: 'OFFER_MADE', 
      selectedArtisanName: apps[index].artisanName,
      confirmedAmount: apps[index].offeredAmount
    });
  } catch (e) {
    console.error('Error recording offer:', e);
  }

  return apps[index];
}

export function acceptProjectOffer({ applicationId }) {
  const apps = getAllApplications();
  const index = apps.findIndex(a => a.id === applicationId);
  if (index === -1) throw new Error('Application not found');

  apps[index] = {
    ...apps[index],
    status: 'OFFER_ACCEPTED',
    acceptedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
    updateProject(apps[index].projectId, { status: 'OFFER_ACCEPTED' });
  } catch (e) {
    console.error('Error accepting offer:', e);
  }

  return apps[index];
}

export function confirmMockPayment({ applicationId, paymentMethod = 'Temple Trust Escrow UPI', transactionRef = 'ESCROW-MOCK-9988' }) {
  const apps = getAllApplications();
  const index = apps.findIndex(a => a.id === applicationId);
  if (index === -1) throw new Error('Application not found');

  apps[index] = {
    ...apps[index],
    status: 'PROJECT_CONFIRMED',
    paymentMethod,
    transactionRef,
    paidAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
    updateProject(apps[index].projectId, { 
      status: 'PROJECT_CONFIRMED',
      selectedArtisanName: apps[index].artisanName,
      confirmedAmount: apps[index].offeredAmount || apps[index].proposedQuote
    });
  } catch (e) {
    console.error('Error confirming payment:', e);
  }

  return apps[index];
}

// ------------------------------------------------------------
// Artisans Directory & Enquiries
// ------------------------------------------------------------

export function getAllArtisans() {
  return DEMO_ARTISANS;
}

export function getArtisanById(artisanId) {
  return DEMO_ARTISANS.find(a => a.id === artisanId) || null;
}

export function getAllEnquiries() {
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(SEED_ENQUIRIES));
      return SEED_ENQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_ENQUIRIES;
  } catch (e) {
    return SEED_ENQUIRIES;
  }
}

export function getEnquiriesForTemple(templeId) {
  const all = getAllEnquiries();
  if (!templeId) return all;
  return all.filter(e => e.templeId === templeId);
}

export function getEnquiriesForProject(projectId) {
  const all = getAllEnquiries();
  return all.filter(e => e.projectId === projectId);
}

export function sendArtisanEnquiry({
  projectId,
  artisanId,
  templeAdminProfile,
  customMessage = ''
}) {
  const project = getProjectById(projectId);
  const artisan = getArtisanById(artisanId);

  if (!artisan) throw new Error('Artisan not found.');

  const templeId = project?.templeId || templeAdminProfile?.templeProfile?.templeId || 'temple-general';
  const templeName = project?.templeName || templeAdminProfile?.templeProfile?.templeName || 'Temple Administration';
  const contact = templeAdminProfile?.name || 'Temple Trustee & Administrator';

  const defaultMsg = project 
    ? `Respected ${artisan.name}, the administration of ${templeName} would like to consult your studio regarding the heritage project "${project.title}". Please review the specifications and let us know your availability.`
    : `Respected ${artisan.name}, we are reaching out from ${templeName} to enquire regarding traditional temple craft commissions.`;

  const newEnquiry = {
    id: `enquiry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    projectId: project?.id || 'direct-enquiry',
    projectTitle: project?.title || 'General Traditional Heritage Commission',
    artisanId: artisan.id,
    artisanName: artisan.name,
    artisanCraft: artisan.craft,
    artisanImage: artisan.image,
    artisanRegion: artisan.region,
    templeId,
    templeName,
    templeContact: contact,
    message: (customMessage || defaultMsg).trim(),
    status: 'ENQUIRY SENT',
    sentAt: new Date().toISOString()
  };

  const existing = getAllEnquiries();
  const updated = [newEnquiry, ...existing];

  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving enquiry to localStorage:', e);
  }

  return newEnquiry;
}
