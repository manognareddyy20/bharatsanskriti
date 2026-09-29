// ============================================================
// BHARAT SANSKRITI - STORIES & MEMORIES STORAGE SERVICE
// Connects to REST Backend API with LocalStorage Fallback
// State → Feature → Cultural Item → Preserved Stories
// Extended for CULTURAL CONTENT VERIFICATION & REVIEW MODERATION:
// - Automatic Cultural Story Verification Engine integration
// - Attaches verificationStatus, verificationBadge, storyType
// - Admin story moderation support
// ============================================================

import { DEMO_TEXT_CULTURAL_STORIES } from '../data/heritageConnectData.js';
import { isStoryFavorite, toggleStoryFavorite } from './favoritesService.js';
import { verifyCulturalStory, getVerificationBadge, STATUS_CODES } from './contentVerificationService.js';
import apiClient from './api/apiClient.js';

const STORAGE_KEY = 'bharat_sanskriti_preserved_stories_v2';
const CULTURAL_STORIES_KEY = 'bharat_sanskriti_cultural_stories_v1';

// Format Date
function getFormattedDate(date = new Date()) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Helper to ensure story objects have all verification metadata attached
 */
export function ensureStoryVerificationMetadata(story) {
  if (story.verificationStatus && story.verificationBadge) {
    return story;
  }

  const hasAudio = Boolean(story.hasAudio) || Boolean(story.audioId) || story.contentType === 'audio';

  const verification = verifyCulturalStory({
    title: story.title || story.storyTitle || '',
    description: story.description || story.textContent || '',
    person: story.person || story.contributorName || '',
    place: story.place || story.state || '',
    tradition: story.tradition || story.culturalItem || '',
    hasAudio: hasAudio,
    contentType: story.contentType
  });

  return {
    ...story,
    verificationStatus: story.verificationStatus || verification.status,
    verificationBadge: getVerificationBadge(story.verificationStatus || verification.status),
    verificationReason: story.verificationReason || verification.reason,
    verificationAction: story.verificationAction || verification.action,
    storyType: story.storyType || verification.storyType || 'GENERAL'
  };
}

/**
 * Load stored stories from localStorage (Fallback)
 */
export function getStoredStories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let stories = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) stories = parsed;
    }
    return stories.map(ensureStoryVerificationMetadata);
  } catch (err) {
    return [];
  }
}

/**
 * Save a new story to general archive
 */
export async function saveStoryToArchive(storyPayload) {
  // Run Cultural Story Verification Engine
  const verification = verifyCulturalStory({
    title: storyPayload.storyTitle || '',
    description: storyPayload.textContent || '',
    person: storyPayload.contributorName || '',
    place: storyPayload.state || '',
    tradition: storyPayload.culturalItem || '',
    hasAudio: storyPayload.contentType === 'audio' || Boolean(storyPayload.audioDuration),
    contentType: storyPayload.contentType
  });

  try {
    const res = await apiClient.post('/api/stories', {
      title: storyPayload.storyTitle?.trim(),
      description: storyPayload.textContent || '',
      person: storyPayload.contributorName?.trim(),
      place: storyPayload.state,
      tradition: storyPayload.culturalItem,
      storyType: verification.storyType || 'GENERAL',
      verificationStatus: verification.status,
      verificationReason: verification.reason,
      hasAudio: storyPayload.contentType === 'audio',
      audioDuration: storyPayload.audioDuration || ''
    });

    if (res.story) {
      return ensureStoryVerificationMetadata(res.story);
    }
  } catch (err) {
    console.warn('API saveStoryToArchive failed, falling back to LocalStorage:', err.message);
  }

  // Fallback
  const currentStories = getStoredStories();
  const now = new Date();

  const newStory = {
    id: `story-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    state: storyPayload.state,
    stateId: (storyPayload.state || '').toLowerCase().replace(/\s+/g, '-'),
    feature: storyPayload.feature,
    featureId: (storyPayload.feature || '').toLowerCase().replace(/\s+/g, '-'),
    culturalItem: storyPayload.culturalItem,
    storyTitle: storyPayload.storyTitle.trim(),
    contributorName: storyPayload.contributorName.trim(),
    contentType: storyPayload.contentType || 'text',
    textContent: storyPayload.textContent || '',
    mediaUrl: storyPayload.mediaUrl || '',
    audioDuration: storyPayload.audioDuration || '',
    videoDuration: storyPayload.videoDuration || '',
    createdAt: now.toISOString(),
    formattedDate: getFormattedDate(now),
    verificationStatus: verification.status,
    verificationBadge: verification.badge,
    verificationReason: verification.reason,
    verificationAction: verification.action,
    storyType: verification.storyType || 'GENERAL'
  };

  const updated = [newStory, ...currentStories];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error writing story to localStorage:', err);
  }

  return newStory;
}

/**
 * Get all Cultural Stories
 * Async API fetch with sync LocalStorage fallback support
 */
export async function getAllCulturalStoriesAsync() {
  try {
    const res = await apiClient.get('/api/stories');
    if (res.stories && Array.isArray(res.stories)) {
      return res.stories.map((s) => ({
        ...ensureStoryVerificationMetadata(s),
        isFavorite: isStoryFavorite(s.id)
      }));
    }
  } catch (err) {
    console.warn('API getAllCulturalStories failed, falling back to LocalStorage:', err.message);
  }

  return getAllCulturalStories();
}

/**
 * Synchronous get all cultural stories from LocalStorage
 */
export function getAllCulturalStories() {
  try {
    const raw = localStorage.getItem(CULTURAL_STORIES_KEY);
    let stories = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) stories = parsed;
    } else {
      stories = [...DEMO_TEXT_CULTURAL_STORIES];
      localStorage.setItem(CULTURAL_STORIES_KEY, JSON.stringify(stories));
    }

    return stories.map((s) => ({
      ...ensureStoryVerificationMetadata(s),
      isFavorite: isStoryFavorite(s.id)
    }));
  } catch (e) {
    return DEMO_TEXT_CULTURAL_STORIES.map(s => ({
      ...ensureStoryVerificationMetadata(s),
      isFavorite: isStoryFavorite(s.id)
    }));
  }
}

/**
 * Save a newly recorded or structured Cultural Story
 */
export async function saveCulturalStory(storyData) {
  const verification = verifyCulturalStory({
    title: storyData.title || '',
    description: storyData.description || storyData.textContent || '',
    person: storyData.person || '',
    place: storyData.place || '',
    tradition: storyData.tradition || '',
    hasAudio: Boolean(storyData.hasAudio) || Boolean(storyData.audioId),
    contentType: storyData.contentType
  });

  try {
    const res = await apiClient.post('/api/stories', {
      title: storyData.title?.trim() || 'Untitled Cultural Memory',
      description: (storyData.description || storyData.textContent || '').trim(),
      person: (storyData.person || 'Family Elder').trim(),
      place: (storyData.place || 'India').trim(),
      tradition: (storyData.tradition || 'Cultural Tradition').trim(),
      storyType: verification.storyType || 'GENERAL',
      verificationStatus: verification.status,
      verificationReason: verification.reason,
      hasAudio: Boolean(storyData.hasAudio),
      audioDuration: storyData.audioDuration || '',
      audioId: storyData.audioId || null
    });

    if (res.story) {
      const saved = ensureStoryVerificationMetadata(res.story);
      // Also update LocalStorage cache
      const current = getAllCulturalStories();
      localStorage.setItem(CULTURAL_STORIES_KEY, JSON.stringify([saved, ...current]));
      return saved;
    }
  } catch (err) {
    console.warn('API saveCulturalStory failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const current = getAllCulturalStories();
  const now = new Date();

  const newStory = {
    id: `cultural-story-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: (storyData.title || 'Untitled Cultural Memory').trim(),
    person: (storyData.person || 'Family Elder').trim(),
    place: (storyData.place || 'India').trim(),
    tradition: (storyData.tradition || 'Cultural Tradition').trim(),
    description: (storyData.description || storyData.textContent || '').trim(),
    preservedBy: (storyData.preservedBy || storyData.contributorName || 'Family Member').trim(),
    hasAudio: Boolean(storyData.hasAudio),
    audioDuration: storyData.audioDuration || '',
    audioId: storyData.audioId || null,
    structuredData: storyData.structuredData || null,
    createdAt: now.toISOString(),
    formattedDate: getFormattedDate(now),
    isFavorite: false,
    verificationStatus: verification.status,
    verificationBadge: verification.badge,
    verificationReason: verification.reason,
    verificationAction: verification.action,
    storyType: verification.storyType || 'GENERAL'
  };

  const updated = [newStory, ...current];
  try {
    localStorage.setItem(CULTURAL_STORIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving cultural story to localStorage:', e);
  }

  return newStory;
}

/**
 * Toggle favourite on a cultural story
 */
export function toggleCulturalStoryFavorite(storyId) {
  return toggleStoryFavorite(storyId);
}

/**
 * Delete a cultural story
 */
export async function deleteCulturalStory(storyId) {
  try {
    await apiClient.delete(`/api/stories/${storyId}`);
  } catch (err) {
    console.warn('API deleteCulturalStory failed:', err.message);
  }

  const current = getAllCulturalStories();
  const updated = current.filter(s => s.id !== storyId);

  try {
    localStorage.setItem(CULTURAL_STORIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting cultural story from localStorage:', e);
  }

  return true;
}

// ------------------------------------------------------------
// Admin Moderation Helpers for Stories
// ------------------------------------------------------------

export function getAllStoriesNeedingVerification() {
  return getAllCulturalStories();
}

export async function updateStoryVerificationStatus(storyId, newStatus, adminReason = '') {
  try {
    const res = await apiClient.patch(`/api/admin/stories/${storyId}/moderate`, {
      verificationStatus: newStatus,
      verificationReason: adminReason || `Updated by Admin to ${newStatus}`
    });

    if (res.story) {
      const updatedStory = ensureStoryVerificationMetadata(res.story);
      // Update local storage cache as well
      const current = getAllCulturalStories();
      const idx = current.findIndex(s => s.id === storyId);
      if (idx !== -1) {
        current[idx] = updatedStory;
        localStorage.setItem(CULTURAL_STORIES_KEY, JSON.stringify(current));
      }
      return updatedStory;
    }
  } catch (err) {
    console.warn('API updateStoryVerificationStatus failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const current = getAllCulturalStories();
  const index = current.findIndex(s => s.id === storyId);
  if (index === -1) return false;

  current[index] = {
    ...current[index],
    verificationStatus: newStatus,
    verificationBadge: getVerificationBadge(newStatus),
    verificationReason: adminReason || `Updated by Admin to ${newStatus}`,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(CULTURAL_STORIES_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Error updating story verification status:', e);
  }

  return current[index];
}

// ------------------------------------------------------------
// Hierarchical & Filter Helpers
// ------------------------------------------------------------

export function getStoriesHierarchical(storiesList = null) {
  const stories = storiesList || getStoredStories();
  const hierarchy = {};

  stories.forEach((story) => {
    const stateName = story.state || 'General';
    const featureName = story.feature || 'General';
    const itemName = story.culturalItem || 'General';

    if (!hierarchy[stateName]) hierarchy[stateName] = {};
    if (!hierarchy[stateName][featureName]) hierarchy[stateName][featureName] = {};
    if (!hierarchy[stateName][featureName][itemName]) hierarchy[stateName][featureName][itemName] = [];

    hierarchy[stateName][featureName][itemName].push(story);
  });

  return hierarchy;
}

export function filterPreservedStories({
  state = '',
  feature = '',
  culturalItem = '',
  contentType = '',
  searchQuery = '',
  currentUser = null
}) {
  let stories = getStoredStories();

  stories = stories.filter(s => {
    const isPending = s.verificationStatus === 'NEEDS_VERIFICATION' || s.verificationStatus === 'ADMIN_REVIEW';
    const isRejected = s.verificationStatus === 'NOT_RELEVANT' || s.verificationStatus === 'REJECTED';
    const isAuthor = currentUser && (
      (s.contributorName || '').toLowerCase() === (currentUser.name || '').toLowerCase() ||
      (s.preservedBy || '').toLowerCase() === (currentUser.name || '').toLowerCase()
    );
    const isTempleAdmin = currentUser && (currentUser.role === 'temple_admin' || currentUser.role === 'TEMPLE_ADMIN');

    if (isRejected && !isTempleAdmin && !isAuthor) return false;
    if (isPending && !isAuthor && !isTempleAdmin) return false;
    return true;
  });

  if (state && state !== 'all') {
    stories = stories.filter(
      (s) => (s.state || '').toLowerCase() === state.toLowerCase() ||
             (s.stateId || '').toLowerCase() === state.toLowerCase()
    );
  }

  if (feature && feature !== 'all') {
    stories = stories.filter(
      (s) => (s.feature || '').toLowerCase().includes(feature.toLowerCase()) ||
             (s.featureId || '').toLowerCase().includes(feature.toLowerCase())
    );
  }

  if (culturalItem && culturalItem !== 'all') {
    stories = stories.filter(
      (s) => (s.culturalItem || '').toLowerCase() === culturalItem.toLowerCase()
    );
  }

  if (contentType && contentType !== 'all') {
    stories = stories.filter(
      (s) => (s.contentType || '').toLowerCase() === contentType.toLowerCase()
    );
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    stories = stories.filter((s) => {
      const titleMatch = (s.storyTitle || '').toLowerCase().includes(q);
      const nameMatch = (s.contributorName || '').toLowerCase().includes(q);
      const itemMatch = (s.culturalItem || '').toLowerCase().includes(q);
      const stateMatch = (s.state || '').toLowerCase().includes(q);
      const featureMatch = (s.feature || '').toLowerCase().includes(q);
      const textMatch = (s.textContent || '').toLowerCase().includes(q);
      return titleMatch || nameMatch || itemMatch || stateMatch || featureMatch || textMatch;
    });
  }

  return stories;
}

export function getStoryCountForItem(culturalItemName) {
  const stories = getStoredStories();
  return stories.filter(
    (s) => (s.culturalItem || '').toLowerCase() === (culturalItemName || '').toLowerCase()
  ).length;
}
