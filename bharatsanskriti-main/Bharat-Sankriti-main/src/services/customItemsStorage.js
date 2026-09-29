// ============================================================
// BHARAT SANSKRITI - COMMUNITY CULTURAL ENTRIES STORAGE SERVICE
// Persistent LocalStorage Archive for Shared Cultural Traditions
// Enables: Discover → Learn → Preserve → Share
// ============================================================

import { getCulturalItems } from '../data/culturalData';

const CUSTOM_ITEMS_STORAGE_KEY = 'bharat_sanskriti_custom_items_v1';

/**
 * Get all custom contributed cultural items from localStorage
 */
export function getAllCustomItems() {
  try {
    const raw = localStorage.getItem(CUSTOM_ITEMS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Could not read custom items from localStorage:', err);
    return [];
  }
}

/**
 * Get custom items for a specific state and feature
 */
export function getCustomItems(stateId, featureId) {
  const allCustom = getAllCustomItems();
  return allCustom.filter(
    (item) =>
      item.stateId?.toLowerCase() === stateId?.toLowerCase() &&
      item.featureId?.toLowerCase() === featureId?.toLowerCase()
  );
}

/**
 * Save a newly contributed cultural entry to localStorage
 */
export function saveCustomItem(itemData) {
  const existingItems = getAllCustomItems();

  const idSlug = (itemData.name || 'item')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const newItem = {
    id: itemData.id || `custom-${idSlug}-${Date.now()}`,
    name: (itemData.name || '').trim(),
    stateId: itemData.stateId,
    stateName: itemData.stateName,
    featureId: itemData.featureId,
    category: itemData.category || 'Cultural Tradition',
    tagline: (itemData.tagline || '').trim(),
    shortIntro: (itemData.shortIntro || itemData.information || itemData.tagline || '').trim(),
    image: itemData.image || null,
    audioUrl: itemData.audioUrl || null,
    audioDuration: itemData.audioDuration || null,
    storyText: itemData.storyText || null,
    contributorName: itemData.contributorName || 'Cultural Contributor',
    createdAt: new Date().toISOString(),
    discover: {
      origin: itemData.origin || `A cherished traditional heritage from ${itemData.stateName || 'this state'}.`,
      highlights: itemData.highlights && itemData.highlights.length > 0
        ? itemData.highlights
        : [
            itemData.tagline,
            `Celebrated with deep cultural devotion in ${itemData.stateName || 'the region'}`,
            'Passed down with love across families and generations',
            'Now preserved as part of the Bharat Sanskriti living archive'
          ].filter(Boolean),
      culturalContext: itemData.culturalContext || itemData.information || itemData.shortIntro || itemData.tagline,
    },
    learn: {
      history: itemData.history || itemData.information || `Preserved by our community as a vital cultural tradition of ${itemData.stateName || 'India'}.`,
      significance: itemData.significance || itemData.information || itemData.tagline,
      traditions: itemData.traditions && itemData.traditions.length > 0
        ? itemData.traditions
        : [
            'Preparation and community gathering according to regional customs.',
            'Passing of sacred practices and culinary or artistic knowledge from elders to youth.',
            'Celebration marked by communal songs, shared feasts, and festive spirit.'
          ],
      howPracticed: itemData.howPracticed || itemData.information || `Celebrated and practiced actively by communities throughout ${itemData.stateName || 'the state'}.`,
      interestingFacts: itemData.interestingFacts || [
        `Preserved directly through the living memory of families in ${itemData.stateName || 'the region'}.`,
        'Part of the intangible cultural tapestry celebrated across Bharat Sanskriti.'
      ],
    },
    preserve: {
      promptText: itemData.preservePrompt || `Preserve your personal or family stories, memories, and celebrations of ${itemData.name}.`,
      memoryIdeas: [
        `How your family prepares for and celebrates ${itemData.name}`,
        `Special recipes, songs, or attire associated with ${itemData.name}`,
        `Childhood memories and stories shared by elders about ${itemData.name}`
      ],
    },
  };

  const updated = [newItem, ...existingItems];
  try {
    localStorage.setItem(CUSTOM_ITEMS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving custom cultural item to localStorage:', err);
  }

  return newItem;
}

/**
 * Returns all cultural items for a feature: baseline curated items + custom shared items.
 * Contributed items appear seamlessly in the collection without distinction.
 */
export function getAllItemsForFeature(stateId, featureId) {
  const baselineItems = getCulturalItems(stateId, featureId) || [];
  const customItems = getCustomItems(stateId, featureId) || [];

  return [...baselineItems, ...customItems];
}

/**
 * Find a specific item by ID across baseline and custom collections
 */
export function getUnifiedItemDetail(stateId, featureId, itemId) {
  const allItems = getAllItemsForFeature(stateId, featureId);
  return allItems.find((item) => item.id === itemId) || null;
}
