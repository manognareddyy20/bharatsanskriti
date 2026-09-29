// ============================================================
// BHARAT SANSKRITI - TEMPLE SEVA & OPPORTUNITIES SERVICE
// Connects to REST Backend API with LocalStorage Fallback
// Manages:
// 1. Dynamic Opportunities created by Temple Administrators
// 2. Real User Applications (PENDING → ACCEPTED / REJECTED)
// 3. Accepted Workers tracking (STRICTLY NO default/fake workers)
// ============================================================

import apiClient from './api/apiClient.js';

const SEVAS_STORAGE_KEY = 'bharat_sanskriti_opportunities_v2';
const APPLICATIONS_STORAGE_KEY = 'bharat_sanskriti_applications_v2';

// ------------------------------------------------------------
// Opportunities Management
// ------------------------------------------------------------

export async function getAllSevasAsync() {
  try {
    const res = await apiClient.get('/api/sevas');
    if (res.sevas && Array.isArray(res.sevas)) {
      return res.sevas;
    }
  } catch (err) {
    console.warn('API getAllSevas failed, falling back to LocalStorage:', err.message);
  }
  return getAllSevas();
}

export function getAllSevas() {
  try {
    const raw = localStorage.getItem(SEVAS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function getAllOpportunities() {
  return getAllSevas();
}

export function getSevaById(sevaId) {
  const sevas = getAllSevas();
  return sevas.find((s) => s.id === sevaId) || null;
}

export function getOpportunityById(id) {
  return getSevaById(id);
}

export async function createSeva(sevaData, templeAdminProfile = null) {
  const templeId = sevaData.templeId || templeAdminProfile?.templeProfile?.templeId || `temple-${Date.now()}`;
  const templeName = sevaData.templeName || templeAdminProfile?.templeProfile?.templeName || templeAdminProfile?.name || 'Temple Trust';
  const templeLocation = sevaData.templeLocation || sevaData.location || templeAdminProfile?.templeProfile?.location || 'Telangana, India';

  try {
    const res = await apiClient.post('/api/sevas', {
      title: (sevaData.title || '').trim(),
      description: (sevaData.description || '').trim(),
      required_skills: Array.isArray(sevaData.skillsRequired)
        ? sevaData.skillsRequired
        : (sevaData.skillsRequired || '').split(',').map(s => s.trim()).filter(Boolean),
      location: (sevaData.location || templeLocation).trim(),
      date_details: (sevaData.date || 'Upcoming / Flexible').trim()
    });

    if (res.seva) {
      const formattedSeva = {
        ...res.seva,
        skillsRequired: res.seva.required_skills || [],
        templeName,
        templeLocation,
        spotsRemaining: 4,
        peopleNeeded: 4
      };
      // Save in local storage cache
      const sevas = getAllSevas();
      localStorage.setItem(SEVAS_STORAGE_KEY, JSON.stringify([formattedSeva, ...sevas]));
      return formattedSeva;
    }
  } catch (err) {
    console.warn('API createSeva failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const sevas = getAllSevas();
  const defaultImage = 'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80';

  const newSeva = {
    id: `opp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    adminId: templeAdminProfile?.id || 'admin-system',
    adminName: templeAdminProfile?.name || 'Temple Administrator',
    templeId,
    templeName,
    templeLocation,
    templeImage: sevaData.templeImage || defaultImage,
    title: (sevaData.title || '').trim(),
    category: sevaData.category || 'Cultural Service',
    location: (sevaData.location || templeLocation).trim(),
    date: (sevaData.date || 'Upcoming / Flexible').trim(),
    duration: (sevaData.duration || 'Flexible').trim(),
    peopleNeeded: parseInt(sevaData.peopleNeeded, 10) || 4,
    spotsRemaining: parseInt(sevaData.peopleNeeded, 10) || 4,
    skillsRequired: Array.isArray(sevaData.skillsRequired)
      ? sevaData.skillsRequired
      : (sevaData.skillsRequired || '').split(',').map(s => s.trim()).filter(Boolean),
    description: (sevaData.description || '').trim(),
    additionalRequirements: (sevaData.additionalRequirements || '').trim(),
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  const updated = [newSeva, ...sevas];
  try {
    localStorage.setItem(SEVAS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving opportunity to localStorage:', e);
  }

  return newSeva;
}

export function createOpportunity(data, admin) {
  return createSeva(data, admin);
}

export function updateSeva(sevaId, updates) {
  const sevas = getAllSevas();
  const index = sevas.findIndex(s => s.id === sevaId);
  if (index === -1) return null;

  sevas[index] = {
    ...sevas[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(SEVAS_STORAGE_KEY, JSON.stringify(sevas));
  } catch (e) {
    console.error('Error updating opportunity in localStorage:', e);
  }

  return sevas[index];
}

export function deleteSeva(sevaId) {
  const sevas = getAllSevas();
  const updated = sevas.filter(s => s.id !== sevaId);

  try {
    localStorage.setItem(SEVAS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting opportunity from localStorage:', e);
  }

  return true;
}

export function markSevaCompleted(sevaId) {
  updateSeva(sevaId, { status: 'COMPLETED' });

  const applications = getAllApplications();
  const updatedApps = applications.map(app => {
    if (app.sevaId === sevaId && app.status === 'ACCEPTED') {
      return { ...app, status: 'COMPLETED', completedAt: new Date().toISOString() };
    }
    return app;
  });

  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updatedApps));
  } catch (e) {
    console.error('Error updating applications for completed opportunity:', e);
  }

  return true;
}

// ------------------------------------------------------------
// Real Applications Management
// ------------------------------------------------------------

export function getAllApplications() {
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function getUserApplications(userId) {
  if (!userId) return [];
  const all = getAllApplications();
  return all.filter(a => a.applicantId === userId || a.user_id === userId);
}

export function getSevaApplications(sevaId) {
  const all = getAllApplications();
  return all.filter(a => a.sevaId === sevaId || a.seva_id === sevaId);
}

export function getTempleApplications(templeId = null, adminId = null) {
  const all = getAllApplications();
  if (!templeId && !adminId) return all;
  return all.filter(a => {
    if (templeId && a.templeId === templeId) return true;
    if (adminId && a.adminId === adminId) return true;
    return false;
  });
}

export function getAcceptedWorkers(templeId = null) {
  const apps = getAllApplications();
  return apps.filter(a => {
    if (a.status !== 'ACCEPTED' && a.application_status !== 'ACCEPTED') return false;
    if (templeId && a.templeId !== templeId) return false;
    return true;
  });
}

/**
 * User submits an application for an opportunity.
 */
export async function applyForSeva({ sevaId, user, message = '' }) {
  if (!sevaId) throw new Error('Opportunity ID is required.');
  if (!user || !user.id || !user.name) {
    throw new Error('Please log in with your User account to apply for opportunities.');
  }

  try {
    const res = await apiClient.post(`/api/sevas/${sevaId}/apply`, { message });
    if (res.application) {
      const appData = res.application;
      const formattedApp = {
        id: appData.id,
        sevaId: appData.seva_id || sevaId,
        applicantId: user.id,
        applicantName: user.name,
        applicantEmail: user.email || '',
        message: appData.message || message,
        status: appData.application_status || 'PENDING',
        appliedAt: appData.applied_at || new Date().toISOString()
      };

      const existingApps = getAllApplications();
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify([formattedApp, ...existingApps]));
      return formattedApp;
    }
  } catch (err) {
    if (err.data?.error) throw err;
    console.warn('API applyForSeva failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const seva = getSevaById(sevaId);

  const existingApps = getAllApplications();
  const alreadyApplied = existingApps.find(
    a => (a.sevaId === sevaId || a.seva_id === sevaId) && (a.applicantId === user.id || a.user_id === user.id)
  );

  if (alreadyApplied) {
    throw new Error('You have already submitted an application for this opportunity.');
  }

  const newApp = {
    id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    sevaId: sevaId,
    sevaTitle: seva?.title || 'Temple Opportunity',
    adminId: seva?.adminId || 'admin-system',
    templeId: seva?.templeId || 'temple-ramappa',
    templeName: seva?.templeName || 'Temple Trust',
    applicantId: user.id,
    applicantName: user.name,
    applicantEmail: user.email || '',
    applicantLocation: user.location || '',
    applicantSkills: user.skills || [],
    message: message.trim() || 'I would be honoured to contribute voluntary skill service for this sacred temple opportunity.',
    status: 'PENDING',
    appliedAt: new Date().toISOString(),
    reviewedAt: null
  };

  const updated = [newApp, ...existingApps];
  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving application to localStorage:', e);
  }

  return newApp;
}

export function applyForOpportunity(args) {
  return applyForSeva(args);
}

/**
 * Temple Administrator reviews and accepts or rejects an application.
 */
export async function reviewApplication(applicationId, newStatus) {
  if (!['ACCEPTED', 'REJECTED'].includes(newStatus)) {
    throw new Error('Invalid status. Status must be either ACCEPTED or REJECTED.');
  }

  try {
    const res = await apiClient.patch(`/api/sevas/applications/${applicationId}/status`, {
      status: newStatus
    });

    if (res.application) {
      const updatedApp = res.application;
      const applications = getAllApplications();
      const index = applications.findIndex(a => a.id === applicationId);
      if (index !== -1) {
        applications[index] = {
          ...applications[index],
          status: updatedApp.application_status || newStatus,
          reviewedAt: new Date().toISOString()
        };
        localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
      }
      return applications[index] || updatedApp;
    }
  } catch (err) {
    console.warn('API reviewApplication failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const applications = getAllApplications();
  const index = applications.findIndex(a => a.id === applicationId);
  if (index === -1) throw new Error('Application not found.');

  const currentApp = applications[index];
  const oldStatus = currentApp.status;

  applications[index] = {
    ...currentApp,
    status: newStatus,
    reviewedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
  } catch (e) {
    console.error('Error updating application status in localStorage:', e);
  }

  if (newStatus === 'ACCEPTED' && oldStatus !== 'ACCEPTED') {
    const seva = getSevaById(currentApp.sevaId);
    if (seva && seva.spotsRemaining > 0) {
      updateSeva(seva.id, { spotsRemaining: seva.spotsRemaining - 1 });
    }
  }

  if (newStatus === 'REJECTED' && oldStatus === 'ACCEPTED') {
    const seva = getSevaById(currentApp.sevaId);
    if (seva && seva.spotsRemaining < seva.peopleNeeded) {
      updateSeva(seva.id, { spotsRemaining: seva.spotsRemaining + 1 });
    }
  }

  return applications[index];
}

export function seedSampleOpportunities(adminProfile = null) {
  const current = getAllSevas();
  if (current.length > 0) return current;

  const sampleOpps = [
    {
      title: 'Kakatiya Inscription & Basalt Carving Photographic Archiving',
      category: 'Photography',
      location: 'Telangana',
      date: 'Upcoming Weekend',
      duration: '3 Days',
      peopleNeeded: 4,
      skillsRequired: ['Photography', 'Documentation', 'Lighting'],
      description: 'Help the temple trust create high-resolution digital archival records of the 800-year-old black basalt bracket figures and stone inscriptions.',
      templeName: adminProfile?.templeProfile?.templeName || 'Ramappa Temple (Rudreshwara)',
      templeId: adminProfile?.templeProfile?.templeId || 'temple-ramappa'
    },
    {
      title: 'Heritage Temple Outreach & Cultural Guide Bilingual Assistance',
      category: 'Translation',
      location: 'Telangana',
      date: 'Festival Week',
      duration: '2 Days',
      peopleNeeded: 6,
      skillsRequired: ['Telugu', 'English', 'Hindi', 'Event Support'],
      description: 'Guide visiting students and pilgrims through the historical sanctum corridors, explaining the architectural significance and temple traditions.',
      templeName: adminProfile?.templeProfile?.templeName || 'Ramappa Temple (Rudreshwara)',
      templeId: adminProfile?.templeProfile?.templeId || 'temple-ramappa'
    }
  ];

  sampleOpps.forEach(opp => createSeva(opp, adminProfile));
  return getAllSevas();
}
