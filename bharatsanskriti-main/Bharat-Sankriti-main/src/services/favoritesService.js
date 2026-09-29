// ============================================================
// BHARAT SANSKRITI - FAVORITES & SAVED ITEMS SERVICE
// Syncs with Backend REST API (/api/favorites) with LocalStorage fallback:
// 1. Cultural Story favourites (☆ ↔ ★)
// 2. Saved Artisans in TempleWork
// ============================================================

import apiClient from './api/apiClient.js';

const FAVORITE_STORIES_KEY = 'bharat_sanskriti_fav_stories_v1';
const SAVED_ARTISANS_KEY = 'bharat_sanskriti_saved_artisans_v1';

// ------------------------------------------------------------
// Cultural Stories Favourites
// ------------------------------------------------------------

export async function getFavoriteStoryIdsAsync() {
  try {
    const res = await apiClient.get('/api/favorites');
    if (res.favoriteStoryIds) {
      localStorage.setItem(FAVORITE_STORIES_KEY, JSON.stringify(res.favoriteStoryIds));
      if (res.savedArtisanIds) {
        localStorage.setItem(SAVED_ARTISANS_KEY, JSON.stringify(res.savedArtisanIds));
      }
      return res.favoriteStoryIds;
    }
  } catch (err) {
    console.warn('API getFavorites failed, falling back to LocalStorage:', err.message);
  }
  return getFavoriteStoryIds();
}

export function getFavoriteStoryIds() {
  try {
    const raw = localStorage.getItem(FAVORITE_STORIES_KEY);
    if (!raw) return ['demo-story-2'];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function isStoryFavorite(storyId) {
  if (!storyId) return false;
  const list = getFavoriteStoryIds();
  return list.includes(storyId);
}

export async function toggleStoryFavorite(storyId) {
  if (!storyId) return false;

  const current = getFavoriteStoryIds();
  const isFav = current.includes(storyId);
  const updated = isFav ? current.filter(id => id !== storyId) : [...current, storyId];

  // Update local storage immediately for fast UI feedback
  try {
    localStorage.setItem(FAVORITE_STORIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating favorite stories in localStorage:', e);
  }

  // Sync with API in background
  try {
    await apiClient.post('/api/favorites/toggle', {
      targetType: 'story',
      targetId: storyId
    });
  } catch (err) {
    console.warn('API toggleStoryFavorite failed:', err.message);
  }

  return !isFav;
}

// ------------------------------------------------------------
// Saved Artisans
// ------------------------------------------------------------

export function getSavedArtisanIds() {
  try {
    const raw = localStorage.getItem(SAVED_ARTISANS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function isArtisanSaved(artisanId) {
  if (!artisanId) return false;
  const list = getSavedArtisanIds();
  return list.includes(artisanId);
}

export async function toggleSaveArtisan(artisanId) {
  if (!artisanId) return false;

  const current = getSavedArtisanIds();
  const isSaved = current.includes(artisanId);
  const updated = isSaved ? current.filter(id => id !== artisanId) : [...current, artisanId];

  try {
    localStorage.setItem(SAVED_ARTISANS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating saved artisans in localStorage:', e);
  }

  try {
    await apiClient.post('/api/favorites/toggle', {
      targetType: 'artisan',
      targetId: artisanId
    });
  } catch (err) {
    console.warn('API toggleSaveArtisan failed:', err.message);
  }

  return !isSaved;
}
