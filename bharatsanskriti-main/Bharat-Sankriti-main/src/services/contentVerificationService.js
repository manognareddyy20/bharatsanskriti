// ============================================================
// BHARAT SANSKRITI - CULTURAL CONTENT VERIFICATION & REVIEW MODERATION
// Comprehensive Architecture for Story Classification, Claim Verification,
// Review Eligibility, Spam Filtering & Admin Moderation.
// Connects to Backend REST API with LocalStorage Fallback
// ============================================================

import { CULTURAL_DATABASE } from '../data/culturalKnowledge.js';
import { getUserApplications as getSevaUserApps } from './sevaService.js';
import { getAllApplications as getWorkApps, getAllEnquiries as getWorkEnquiries } from './templeWorkService.js';
import apiClient from './api/apiClient.js';

const MODERATION_REVIEWS_KEY = 'bharat_sanskriti_cultural_reviews_v1';

// ------------------------------------------------------------
// Unified Status Codes & Badges Architecture
// ------------------------------------------------------------
export const STATUS_CODES = {
  CULTURALLY_RELEVANT: 'CULTURALLY_RELEVANT',
  PERSONAL_STORY: 'PERSONAL_STORY',
  SUPPORTED_FACT: 'SUPPORTED_FACT',
  NEEDS_VERIFICATION: 'NEEDS_VERIFICATION',
  ADMIN_REVIEW: 'ADMIN_REVIEW',
  NOT_RELEVANT: 'NOT_RELEVANT',
  REPORTED: 'REPORTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export function getVerificationBadge(statusCode) {
  switch (statusCode) {
    case STATUS_CODES.PERSONAL_STORY:
      return { code: STATUS_CODES.PERSONAL_STORY, icon: '🔵', label: 'Personal / Community Story', class: 'badge-personal' };
    case STATUS_CODES.SUPPORTED_FACT:
      return { code: STATUS_CODES.SUPPORTED_FACT, icon: '🟢', label: 'Supported Fact', class: 'badge-supported' };
    case STATUS_CODES.CULTURALLY_RELEVANT:
      return { code: STATUS_CODES.CULTURALLY_RELEVANT, icon: '🟢', label: 'Culturally Relevant', class: 'badge-relevant' };
    case STATUS_CODES.NEEDS_VERIFICATION:
      return { code: STATUS_CODES.NEEDS_VERIFICATION, icon: '🟡', label: 'Needs Verification', class: 'badge-needs-verification' };
    case STATUS_CODES.ADMIN_REVIEW:
      return { code: STATUS_CODES.ADMIN_REVIEW, icon: '🟠', label: 'Admin Review', class: 'badge-admin-review' };
    case STATUS_CODES.NOT_RELEVANT:
      return { code: STATUS_CODES.NOT_RELEVANT, icon: '🔴', label: 'Not Relevant', class: 'badge-not-relevant' };
    case STATUS_CODES.REPORTED:
      return { code: STATUS_CODES.REPORTED, icon: '🚩', label: 'Reported', class: 'badge-reported' };
    case STATUS_CODES.APPROVED:
      return { code: STATUS_CODES.APPROVED, icon: '🟢', label: 'Approved', class: 'badge-approved' };
    case STATUS_CODES.REJECTED:
      return { code: STATUS_CODES.REJECTED, icon: '🔴', label: 'Rejected', class: 'badge-rejected' };
    default:
      return { code: statusCode || STATUS_CODES.CULTURALLY_RELEVANT, icon: '🟢', label: 'Culturally Relevant', class: 'badge-relevant' };
  }
}

// Relevant Cultural Categories & Keywords
export const CULTURAL_KEYWORDS = [
  'temple', 'mandir', 'heritage', 'festival', 'tradition', 'art', 'craft',
  'music', 'dance', 'cuisine', 'prasadam', 'artisans', 'sthapathi', 'mural',
  'sculpture', 'bronze', 'stone carving', 'wood carving', 'architecture',
  'seva', 'pooja', 'archana', 'devaswom', 'agama', 'shilpa shastra',
  'bathukamma', 'bonalu', 'sankranti', 'diwali', 'kuchipudi', 'bharatanatyam',
  'carnatic', 'hindustani', 'folk', 'oral history', 'ramappa', 'kakatiya',
  'chola', 'hoysala', 'dravidian', 'nagara', 'monument', 'god', 'goddess',
  'village', 'grandmother', 'grandfather', 'mother', 'father', 'family',
  'recipe', 'sarva pindi', 'sakinalu', 'pulihora', 'gongura', 'dal baati', 'ghevar',
  'amer', 'golconda', 'charminar', 'lepakshi', 'perini', 'ghoomar', 'burra katha',
  'oggu katha', 'cheriyal', 'pochampally', 'kalamkari', 'kondapalli', 'blue pottery',
  'bandhani', 'handloom', 'saree', 'custom', 'pooja', 'blessing'
];

export const SPAM_PRODUCT_KEYWORDS = [
  'phone', 'camera', 'battery', 'screen', 'laptop', 'ios', 'android',
  'iphone', 'samsung', 'crypto', 'bitcoin', 'discount link', 'buy cheap',
  'casino', 'viagra', 'earn money', 'free download', 'cashback', 'telegram group'
];

export const GENUINE_CRITICISM_CUES = [
  'poor', 'bad', 'disappointed', 'coordination', 'delayed', 'crowded',
  'long queue', 'mismanaged', 'cleanliness', 'facilities', 'parking',
  'slow', 'noise', 'hot', 'signage', 'waiting time', 'management'
];

export const PERSONAL_STORY_CUES = [
  'grandma', 'grandmma', 'grandmother', 'grand-mother', 'granma', 'granny',
  'grandpa', 'grandfather', 'nani', 'dadi', 'ammamma', 'paati', 'thatha',
  'ajji', 'ajja', 'nana', 'mother', 'father', 'mom', 'dad', 'mummy', 'pappa',
  'my ', 'our ', 'my family', 'our family', 'our village', 'our festival',
  'when i was', 'my childhood', 'my elder', 'our ancestors', 'my teacher',
  'in our tradition', 'i remember', 'told me', 'taught me', 'used to tell me',
  'family story', 'recollect', 'oral history', 'passed down', 'reminiscing',
  'recorded', 'audio', 'voice', 'recording', 'shit', 'memory', 'recollection'
];

export const FACTUAL_CLAIM_CUES = [
  'built in', 'constructed in', '11th century', '12th century', '13th century',
  '14th century', '15th century', '16th century', 'ad', 'ce', 'bce', 'dynasty',
  'king', 'emperor', 'ruler', 'inscription', 'architect', 'sthapathi', 'founded in',
  'unesco', 'dated to', 'commissioned by', 'century'
];

const SEED_MODERATION_REVIEWS = [
  {
    id: 'rev-seed-1',
    itemType: 'seva',
    itemId: 'opp-1',
    itemTitle: 'Ramappa Temple Heritage Documentator & Guide Seva',
    reviewerName: 'Ramesh Sharma (Verified Volunteer)',
    reviewerId: 'user-seed-1',
    rating: 5,
    reviewText: 'The temple festival was well organized and I learned about our local Kakatiya architectural tradition. Sacred experience!',
    verifiedExperience: true,
    culturalRelevanceScore: 95,
    outcome: 'APPROVED',
    status: 'CULTURALLY_RELEVANT',
    outcomeReason: 'Approved — Verified Cultural Contribution',
    createdAt: '2026-09-12T10:00:00.000Z'
  },
  {
    id: 'rev-seed-2',
    itemType: 'seva',
    itemId: 'opp-1',
    itemTitle: 'Ramappa Temple Heritage Documentator & Guide Seva',
    reviewerName: 'Ananya Rao (Verified Contributor)',
    reviewerId: 'user-seed-2',
    rating: 3,
    reviewText: 'The temple festival was meaningful and rich in tradition, but volunteer coordination was poor during afternoon prasadam distribution.',
    verifiedExperience: true,
    culturalRelevanceScore: 88,
    outcome: 'APPROVED',
    status: 'CULTURALLY_RELEVANT',
    outcomeReason: 'Approved — Authentic Negative Cultural Critique Allowed',
    createdAt: '2026-09-14T14:30:00.000Z'
  }
];

// ------------------------------------------------------------
// Helper Engine Functions
// ------------------------------------------------------------

export function checkCulturalRelevance(text = '') {
  const clean = (text || '').trim();
  const lower = clean.toLowerCase();

  const spamMatched = SPAM_PRODUCT_KEYWORDS.filter(kw => lower.includes(kw));
  if (spamMatched.length > 0) {
    return {
      isRelevant: false,
      status: STATUS_CODES.NOT_RELEVANT,
      reason: `Rejected — Unrelated Product / Electronics Spam (Detected: ${spamMatched.join(', ')})`
    };
  }

  const culturalMatched = CULTURAL_KEYWORDS.filter(kw => lower.includes(kw));
  const criticismMatched = GENUINE_CRITICISM_CUES.filter(cue => lower.includes(cue));
  const isGenuineCritique = criticismMatched.length > 0;

  return {
    isRelevant: true,
    status: STATUS_CODES.CULTURALLY_RELEVANT,
    matchedKeywords: culturalMatched,
    isGenuineCritique,
    reason: isGenuineCritique
      ? 'Culturally Relevant — Genuine Negative Feedback Allowed'
      : 'Culturally Relevant — Cultural Contribution'
  };
}

export function identifyStoryType(text = '', person = '', hasAudio = false, contentType = '') {
  const lower = `${text} ${person}`.toLowerCase();
  const elderRegex = /\b(grand?m[am]m?[a-z]*|grand?p[ap]a?[a-z]*|granny|nani|dadi|ammamma|paati|thatha|ajji|ajja|nana|mother|father|mom|dad|mummy|pappa|uncle|aunt|ancestor|elder|family)\b/i;

  const isPersonal = PERSONAL_STORY_CUES.some(cue => lower.includes(cue)) || 
                     elderRegex.test(lower) || 
                     Boolean(hasAudio) || 
                     contentType === 'audio' || 
                     (person && person.trim().length > 0);
  const isFactual = FACTUAL_CLAIM_CUES.some(cue => lower.includes(cue)) || /\b(1\d{3}|20\d{2})\b\s*(ad|ce|bce|bc)?/i.test(text);

  if (isPersonal) {
    return {
      type: 'PERSONAL',
      status: STATUS_CODES.PERSONAL_STORY,
      label: 'Personal / Community Story',
      badge: getVerificationBadge(STATUS_CODES.PERSONAL_STORY),
      note: 'Lived family memory / oral history. AI will not claim 100% certainty over lived family memories.'
    };
  }

  if (isFactual) {
    return {
      type: 'FACTUAL',
      status: STATUS_CODES.NEEDS_VERIFICATION,
      label: 'Historical / Factual Claim',
      note: 'Contains dates or historical assertions requiring factual cross-checking.'
    };
  }

  return {
    type: 'GENERAL',
    status: STATUS_CODES.CULTURALLY_RELEVANT,
    label: 'Cultural Narrative',
    badge: getVerificationBadge(STATUS_CODES.CULTURALLY_RELEVANT),
    note: 'General cultural contribution.'
  };
}

export function checkFactualClaims(text = '') {
  const lower = (text || '').toLowerCase();
  let matchedTopic = null;
  for (const key of Object.keys(CULTURAL_DATABASE)) {
    const item = CULTURAL_DATABASE[key];
    const match = item.keywords.some(kw => lower.includes(kw));
    if (match) {
      matchedTopic = item;
      break;
    }
  }

  if (matchedTopic) {
    return {
      isSupported: true,
      status: STATUS_CODES.SUPPORTED_FACT,
      badge: getVerificationBadge(STATUS_CODES.SUPPORTED_FACT),
      topicTitle: matchedTopic.title,
      reason: `Supported — Verified against cultural knowledge base (${matchedTopic.title})`
    };
  }

  const hasDateClaim = /\b(1\d{3}|20\d{2})\b/i.test(text) || lower.includes('built in') || lower.includes('constructed in') || lower.includes('century');
  if (hasDateClaim) {
    return {
      isSupported: false,
      status: STATUS_CODES.NEEDS_VERIFICATION,
      badge: getVerificationBadge(STATUS_CODES.NEEDS_VERIFICATION),
      reason: 'Needs Verification — Historical / Architectural claim requires admin cross-checking'
    };
  }

  return {
    isSupported: true,
    status: STATUS_CODES.CULTURALLY_RELEVANT,
    badge: getVerificationBadge(STATUS_CODES.CULTURALLY_RELEVANT),
    reason: 'Culturally Relevant Narrative'
  };
}

export function verifyCulturalStory({
  title = '',
  description = '',
  textContent = '',
  person = '',
  place = '',
  tradition = '',
  hasAudio = false,
  contentType = ''
}) {
  const fullText = `${title} ${description} ${textContent} ${tradition} ${person} ${place}`.trim();

  const relevance = checkCulturalRelevance(fullText);
  if (!relevance.isRelevant && relevance.status === STATUS_CODES.NOT_RELEVANT) {
    return {
      isValid: false,
      status: STATUS_CODES.NOT_RELEVANT,
      badge: getVerificationBadge(STATUS_CODES.NOT_RELEVANT),
      action: 'REJECT',
      reason: relevance.reason
    };
  }

  const typeInfo = identifyStoryType(fullText, person, hasAudio, contentType);

  return {
    isValid: true,
    storyType: typeInfo.type || 'GENERAL',
    status: STATUS_CODES.NEEDS_VERIFICATION,
    badge: getVerificationBadge(STATUS_CODES.NEEDS_VERIFICATION),
    action: 'ADMIN_REVIEW',
    reason: typeInfo.type === 'PERSONAL' 
      ? 'Personal Memory / Oral History — Pending Temple Administrator verification'
      : 'Cultural Assertion — Pending Temple Administrator verification'
  };
}

export function checkUserEligibilityToReview({ currentUser, itemType = 'seva', itemId }) {
  if (!currentUser) {
    return {
      isEligible: false,
      reason: 'Authentication Required: Please sign in to submit a review.'
    };
  }

  if (itemType === 'seva') {
    const apps = getSevaUserApps(currentUser.id);
    const validApp = apps.find(a => (a.sevaId === itemId || a.id === itemId) && ['ACCEPTED', 'COMPLETED'].includes(a.status));
    if (!validApp) {
      return {
        isEligible: false,
        reason: 'Participation Required: You can submit a review after participating in or completing this Temple Seva.'
      };
    }
    return { isEligible: true, application: validApp };
  }

  if (itemType === 'templework') {
    const workApps = getWorkApps();
    const workEnquiries = getWorkEnquiries();

    const hasConfirmedApp = workApps.some(a => a.projectId === itemId || a.id === itemId);
    const hasEnquiry = workEnquiries.some(e => e.projectId === itemId);
    const isMasterArtisan = currentUser.role === 'artisan' || currentUser.role === 'temple_admin';

    if (!hasConfirmedApp && !hasEnquiry && !isMasterArtisan) {
      return {
        isEligible: false,
        reason: 'Participation Required: Only verified artisan participants or project leads can review this TempleWork project.'
      };
    }
    return { isEligible: true };
  }

  return { isEligible: true };
}

// ------------------------------------------------------------
// Local Storage & API Sync for Reviews
// ------------------------------------------------------------

export function getAllModerationReviews() {
  try {
    const raw = localStorage.getItem(MODERATION_REVIEWS_KEY);
    if (!raw) {
      localStorage.setItem(MODERATION_REVIEWS_KEY, JSON.stringify(SEED_MODERATION_REVIEWS));
      return SEED_MODERATION_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_MODERATION_REVIEWS;
  } catch (e) {
    return SEED_MODERATION_REVIEWS;
  }
}

function saveModerationReviews(reviews) {
  try {
    localStorage.setItem(MODERATION_REVIEWS_KEY, JSON.stringify(reviews));
  } catch (e) {
    console.error('Error saving moderation reviews:', e);
  }
}

/**
 * Submit a new user review with backend API integration
 */
export async function submitVerifiedCulturalReview({
  itemId,
  itemType = 'seva',
  itemTitle,
  rating = 5,
  reviewText,
  currentUser,
  hasCompletedExperience = false
}) {
  if (!currentUser) {
    throw new Error('Authentication Required: Please log in to submit a review.');
  }

  if (!reviewText || !reviewText.trim()) {
    throw new Error('Please enter your review feedback.');
  }

  const cleanText = reviewText.trim();

  try {
    const res = await apiClient.post('/api/reviews', {
      targetType: itemType,
      targetId: itemId,
      targetTitle: itemTitle || 'Cultural Activity',
      rating: Number(rating) || 5,
      reviewText: cleanText
    });

    if (res.review) {
      const rev = res.review;
      const formattedRev = {
        ...rev,
        itemType: rev.target_type || itemType,
        itemId: rev.target_id || itemId,
        itemTitle: rev.target_title || itemTitle,
        reviewerName: currentUser.name,
        reviewerId: currentUser.id,
        badge: getVerificationBadge(rev.moderation_status || STATUS_CODES.APPROVED)
      };

      const existing = getAllModerationReviews();
      saveModerationReviews([formattedRev, ...existing]);

      return {
        review: formattedRev,
        verification: {
          isValid: rev.moderation_status === 'APPROVED',
          outcome: rev.moderation_status,
          status: rev.moderation_status,
          badge: getVerificationBadge(rev.moderation_status),
          reason: 'Submitted to REST Backend API'
        }
      };
    }
  } catch (err) {
    console.warn('API submitReview failed, falling back to LocalStorage:', err.message);
  }

  // LocalStorage Fallback
  const relevance = checkCulturalRelevance(cleanText);
  let finalOutcome = 'APPROVED';
  let finalStatus = STATUS_CODES.CULTURALLY_RELEVANT;

  if (!relevance.isRelevant) {
    finalOutcome = relevance.status === STATUS_CODES.NOT_RELEVANT ? 'REJECTED' : 'ADMIN_REVIEW';
    finalStatus = relevance.status === STATUS_CODES.NOT_RELEVANT ? STATUS_CODES.NOT_RELEVANT : STATUS_CODES.ADMIN_REVIEW;
  }

  const newReview = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    itemId,
    itemType,
    itemTitle: itemTitle || 'Cultural Activity',
    reviewerName: currentUser.name,
    reviewerId: currentUser.id,
    rating: Number(rating) || 5,
    reviewText: cleanText,
    verifiedExperience: true,
    culturalRelevanceScore: relevance.isRelevant ? 90 : 20,
    outcome: finalOutcome,
    status: finalStatus,
    badge: getVerificationBadge(finalStatus),
    outcomeReason: relevance.reason,
    createdAt: new Date().toISOString()
  };

  const existingReviews = getAllModerationReviews();
  const updated = [newReview, ...existingReviews];
  saveModerationReviews(updated);

  return {
    review: newReview,
    verification: {
      isValid: finalOutcome === 'APPROVED',
      outcome: finalOutcome,
      status: finalStatus,
      badge: getVerificationBadge(finalStatus),
      reason: relevance.reason
    }
  };
}

export async function reportCulturalReview({
  reviewId,
  reason = 'Unrelated content',
  userNote = '',
  reportedByName = 'Community Contributor'
}) {
  try {
    await apiClient.post(`/api/reviews/${reviewId}/report`, { reason, userNote });
  } catch (err) {
    console.warn('API reportReview failed:', err.message);
  }

  const reviews = getAllModerationReviews();
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index === -1) return null;

  reviews[index] = {
    ...reviews[index],
    outcome: 'REPORTED',
    status: STATUS_CODES.REPORTED,
    badge: getVerificationBadge(STATUS_CODES.REPORTED),
    outcomeReason: `Flagged by Users — Reported for ${reason}`,
    reportDetails: {
      reason,
      userNote: (userNote || '').trim(),
      reportedBy: reportedByName,
      reportedAt: new Date().toISOString()
    }
  };

  saveModerationReviews(reviews);
  return reviews[index];
}

export async function approveModeratedReview(reviewId) {
  try {
    await apiClient.patch(`/api/admin/reviews/${reviewId}/moderate`, {
      moderationStatus: 'APPROVED'
    });
  } catch (err) {
    console.warn('API approveReview failed:', err.message);
  }

  const reviews = getAllModerationReviews();
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index === -1) return null;

  reviews[index] = {
    ...reviews[index],
    outcome: 'APPROVED',
    status: STATUS_CODES.APPROVED,
    badge: getVerificationBadge(STATUS_CODES.APPROVED),
    outcomeReason: 'Manually Approved by Temple Admin',
    approvedAt: new Date().toISOString()
  };

  saveModerationReviews(reviews);
  return reviews[index];
}

export async function rejectModeratedReview(reviewId, adminReason = 'Rejected by Temple Admin') {
  try {
    await apiClient.patch(`/api/admin/reviews/${reviewId}/moderate`, {
      moderationStatus: 'REJECTED',
      outcomeReason: adminReason
    });
  } catch (err) {
    console.warn('API rejectReview failed:', err.message);
  }

  const reviews = getAllModerationReviews();
  const index = reviews.findIndex(r => r.id === reviewId);
  if (index === -1) return null;

  reviews[index] = {
    ...reviews[index],
    outcome: 'REJECTED',
    status: STATUS_CODES.REJECTED,
    badge: getVerificationBadge(STATUS_CODES.REJECTED),
    outcomeReason: adminReason,
    rejectedAt: new Date().toISOString()
  };

  saveModerationReviews(reviews);
  return reviews[index];
}

export function deleteModeratedReview(reviewId) {
  const reviews = getAllModerationReviews();
  const filtered = reviews.filter(r => r.id !== reviewId);
  saveModerationReviews(filtered);
  return true;
}
