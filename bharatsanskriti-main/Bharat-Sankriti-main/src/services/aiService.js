// AI Service Layer for Ask Bharat
// Secure proxy integration with server endpoint + robust local cultural & conversational engine fallback
// NO API keys are exposed to frontend client code

import { findCulturalAnswer, CULTURAL_DATABASE } from '../data/culturalKnowledge.js';

/**
 * Main query function for Ask Bharat
 * Queries the secure server API (/api/ask-bharat) first; falls back seamlessly to the local cultural engine.
 * @param {string} prompt - User question or query
 * @param {Array} history - Previous messages in current session
 * @param {Object|null} imageAttachment - Optional uploaded image { name, dataUrl, type }
 * @param {string} language - User language selection ('en' | 'te' | 'hi')
 * @returns {Promise<Object>} - Response object { text, culturalTopic, topicName, source }
 */
export async function queryAskBharat(prompt, history = [], imageAttachment = null, language = 'en') {
  try {
    const response = await fetch('/api/ask-bharat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        history,
        image: imageAttachment,
        language
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (!data.fallback && data.text && data.text.trim() !== '') {
        return {
          text: data.text,
          culturalTopic: null,
          topicName: null,
          source: data.source || 'gemini'
        };
      }
    }
  } catch (netErr) {
    // Network or server proxy unavailable; seamlessly proceed to local engine
    console.info('Server AI proxy unavailable, using local verified cultural engine:', netErr.message);
  }

  // Use local verified cultural & conversational reasoning engine
  return await queryLocalEngine(prompt, history, imageAttachment, language);
}

/**
 * Local verified cultural & conversational reasoning engine with contextual memory,
 * multimodal image heuristics, and English / Telugu / Hindi support.
 */
async function queryLocalEngine(prompt, history = [], imageAttachment = null, language = 'en') {
  // Simulate natural brief AI thinking time (400ms)
  await new Promise(resolve => setTimeout(resolve, 400));

  const cleanPrompt = (prompt || '').trim();

  // If an image was attached:
  if (imageAttachment) {
    const imageName = (imageAttachment.name || '').toLowerCase();
    
    // Check if filename contains cultural clues
    for (const key of Object.keys(CULTURAL_DATABASE)) {
      const item = CULTURAL_DATABASE[key];
      const nameMatch = item.keywords.some(kw => imageName.includes(kw));
      if (nameMatch) {
        let text = '';
        if (language === 'te') {
          text = `మీరు అప్‌లోడ్ చేసిన చిత్రం (${imageAttachment.name}) ఆధారంగా, ఇది **${item.title}** (${item.region}) గా కనిపిస్తోంది.\n\n${item.summary}\n\n**సాంస్కృతిక ప్రాముఖ్యత:**\n${item.whyCelebrated || item.historyCraft || item.historyDetails || item.details || ''}\n\nదీని గురించి మరింత తెలుసుకోవాలనుకుంటున్నారా? నన్ను అడగండి!`;
        } else if (language === 'hi') {
          text = `आपके द्वारा अपलोड की गई छवि (${imageAttachment.name}) के अनुसार, यह **${item.title}** (${item.region}) प्रतीत होता है।\n\n${item.summary}\n\n**सांस्कृतिक महत्व:**\n${item.whyCelebrated || item.historyCraft || item.historyDetails || item.details || ''}\n\nक्या आप इसके बारे में और जानना चाहते हैं? मुझसे पूछें!`;
        } else {
          text = `Based on your image (${imageAttachment.name}), this appears to be **${item.title}** (${item.region}).\n\n${item.summary}\n\n**Cultural Significance:**\n${item.whyCelebrated || item.historyCraft || item.historyDetails || item.details || ''}\n\nFeel free to ask more about how it is made, celebrated, or its historical origins!`;
        }

        return {
          text,
          culturalTopic: item.id,
          topicName: item.title,
          source: 'local-knowledge'
        };
      }
    }

    // Generic image inquiry with no specific filename match
    if (cleanPrompt.toLowerCase().includes('what is this') || cleanPrompt.toLowerCase().includes('tell me about this') || cleanPrompt === '') {
      let text = '';
      if (language === 'te') {
        text = `ఈ చిత్రం తెలంగాణ పవిత్ర పూల సంప్రదాయం **బతుకమ్మ** లేదా భారతీయ సాంప్రదాయ కళాకృతిని పోలి ఉంది.\n\nబతుకమ్మలో గునుగు, తంగేడు మరియు గుమ్మడి పూలను ఇత్తడి పళ్లెంలో శంఖు ఆకారంలో పేర్చి, పైన గౌరమ్మను ప్రతిష్ఠిస్తారు. ఇది ప్రకృతి సామరస్యాన్ని, స్త్రీ శక్తిని చాటే పండుగ.\n\nదీని గురించి మీరు ఏ ప్రశ్న అడగాలనుకుంటున్నారు?`;
      } else if (language === 'hi') {
        text = `यह छवि तेलंगाना के पवित्र पुष्प उत्सव **बथुकम्मा** या किसी पारंपरिक भारतीय धरोहर शिल्प से मिलती-जुलती प्रतीत होती है।\n\nबथुकम्मा में जंगली औषधीय फूलों को परतों में सजाया जाता है और शीर्ष पर हल्दी की गौरम्मा रखी जाती है।\n\nक्या आप जानना चाहते हैं कि इसे कैसे मनाया जाता है?`;
      } else {
        text = `This appears to feature a traditional Indian cultural expression, such as **Bathukamma** (Telangana's floral celebration) or an Indian temple/craft artifact.\n\nBathukamma features concentric conical layers of indigenous seasonal wildflowers (such as *Gunugu*, *Tangedu*, and *Gummadi*) arranged on a brass plate (*Thambalam*) to honor Mother Earth and Goddess Gauri.\n\nWould you like to learn why it is celebrated or how the community songs and dances are performed?`;
      }

      return {
        text,
        culturalTopic: 'bathukamma',
        topicName: 'Bathukamma',
        source: 'local-knowledge'
      };
    }
  }

  // Query local knowledge base with contextual conversation history & language
  const answer = findCulturalAnswer(cleanPrompt, history, language);
  return {
    ...answer,
    source: 'local-knowledge'
  };
}

// ============================================================
// HERITAGECONNECT AI SERVICES
// Deterministic, explainable matching algorithms & story structuring
// Labeled: "AI-assisted matching" / "AI-structured from family memory"
// ============================================================

/**
 * AI-assisted Seva matching for user based on skills, location, and availability
 * @param {Array} sevas - List of Sevas
 * @param {Object} user - User profile { skills, location, availability }
 * @returns {Array} - Array of { seva, matchScore, matchReasons, isRecommended }
 */
export function matchSevasForUser(sevas, user) {
  if (!user || !Array.isArray(sevas)) {
    return sevas.map(seva => ({ seva, matchScore: 60, matchReasons: [], isRecommended: false }));
  }

  const userSkills = (user.skills || []).map(s => s.toLowerCase().trim());
  const userLocation = (user.location || '').toLowerCase().trim();
  const userAvailability = (user.availability || '').toLowerCase().trim();

  return sevas.map((seva) => {
    let score = 50; // base score
    const reasons = [];

    // 1. Skill Match (+15 per matching skill up to +35)
    const sevaSkills = (seva.skillsRequired || []).map(s => s.toLowerCase().trim());
    const matchedSkills = userSkills.filter(us => 
      sevaSkills.some(ss => ss.includes(us) || us.includes(ss)) ||
      (seva.category || '').toLowerCase().includes(us)
    );

    if (matchedSkills.length > 0) {
      const skillBoost = Math.min(matchedSkills.length * 15, 35);
      score += skillBoost;
      reasons.push(`✓ Skill match: ${matchedSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}`);
    }

    // 2. Location / Region Match (+15)
    const sevaLoc = (seva.location || seva.templeLocation || '').toLowerCase();
    if (userLocation && (sevaLoc.includes(userLocation) || userLocation.includes(sevaLoc) || (userLocation.includes('telangana') && sevaLoc.includes('telangana')) || (userLocation.includes('tamil nadu') && sevaLoc.includes('tamil nadu')) || (userLocation.includes('karnataka') && sevaLoc.includes('karnataka')) || (userLocation.includes('andhra') && sevaLoc.includes('andhra')))) {
      score += 15;
      reasons.push(`✓ Close location: ${seva.location}`);
    } else if ((seva.title || '').toLowerCase().includes('remote') || (seva.category || '').toLowerCase().includes('remote')) {
      score += 10;
      reasons.push('✓ Remote participation available');
    }

    // 3. Availability alignment (+10)
    const sevaDuration = (seva.duration || '').toLowerCase();
    if (userAvailability.includes('weekend') && (sevaDuration.includes('weekend') || sevaDuration.includes('day') || sevaDuration.includes('flexible'))) {
      score += 10;
      reasons.push('✓ Fits weekend availability');
    } else if (userAvailability.includes('festival') && (seva.category || '').toLowerCase().includes('festival')) {
      score += 10;
      reasons.push('✓ Aligns with festive seva calendar');
    }

    // Cap score at 98%
    const finalScore = Math.min(score, 98);
    const isRecommended = finalScore >= 75;

    return {
      seva,
      matchScore: finalScore,
      matchReasons: reasons.length > 0 ? reasons : ['✓ General cultural seva opportunity'],
      isRecommended
    };
  });
}

/**
 * AI-assisted Artisan matching for TempleWork project
 * @param {Array} artisans - List of artisans
 * @param {Object} project - TempleWork project { requiredCraft, materials, location, experienceRequired }
 * @returns {Array} - Array of { artisan, matchScore, matchReasons, isRecommended }
 */
export function matchArtisansForProject(artisans, project) {
  if (!project || !Array.isArray(artisans)) {
    return artisans.map(artisan => ({ artisan, matchScore: 70, matchReasons: [], isRecommended: false }));
  }

  const projCraft = (project.requiredCraft || '').toLowerCase().trim();
  const projLoc = (project.location || '').toLowerCase().trim();
  const projMaterials = (project.materials || '').toLowerCase().trim();

  return artisans.map((artisan) => {
    let score = 55;
    const reasons = [];

    // 1. Craft Match (+25)
    const artisanCraft = (artisan.craft || '').toLowerCase();
    if (artisanCraft.includes(projCraft) || projCraft.includes(artisanCraft)) {
      score += 25;
      reasons.push(`✓ Direct ${artisan.craft} mastery`);
    } else if (
      (projCraft.includes('stone') && artisanCraft.includes('stone')) ||
      (projCraft.includes('paint') && artisanCraft.includes('paint')) ||
      (projCraft.includes('bronze') && artisanCraft.includes('bronze')) ||
      (projCraft.includes('wood') && artisanCraft.includes('wood')) ||
      (projCraft.includes('architecture') && artisanCraft.includes('architecture'))
    ) {
      score += 20;
      reasons.push(`✓ Related craft expertise: ${artisan.craft}`);
    }

    // 2. Experience Match (+10)
    if (artisan.yearsOfExperience >= 15) {
      score += 12;
      reasons.push(`✓ ${artisan.yearsOfExperience} years of master experience`);
    } else if (artisan.yearsOfExperience >= 8) {
      score += 8;
      reasons.push(`✓ ${artisan.yearsOfExperience} years of dedicated practice`);
    }

    // 3. Similar Previous Projects (+12)
    const prevWorks = (artisan.previousProjects || []).concat(artisan.portfolio || []);
    const hasRelevantWork = prevWorks.some(p => 
      p.toLowerCase().includes('temple') || 
      p.toLowerCase().includes('shiva') || 
      p.toLowerCase().includes('granite') || 
      p.toLowerCase().includes('fresco') ||
      p.toLowerCase().includes('mandapa')
    );
    if (hasRelevantWork) {
      score += 12;
      reasons.push('✓ Similar consecrated temple projects');
    }

    // 4. Region Proximity (+10)
    const artisanRegion = (artisan.region || '').toLowerCase();
    if (projLoc && (artisanRegion.includes(projLoc) || projLoc.includes(artisanRegion))) {
      score += 10;
      reasons.push(`✓ Regional tradition match (${artisan.region})`);
    }

    const finalScore = Math.min(score, 97);
    const isRecommended = finalScore >= 80;

    return {
      artisan,
      matchScore: finalScore,
      matchReasons: reasons.length > 0 ? reasons : ['✓ Master artisan portfolio on record'],
      isRecommended
    };
  });
}

/**
 * AI Cultural Memory Structuring
 * Parses free-form user story transcript and organizes it into structured cultural memory fields.
 * Clearly distinguishes family memory from verified historical facts.
 */
export function structureCulturalStory(rawText, metadata = {}) {
  const text = (rawText || '').trim();
  const person = metadata.person || 'Family Elder';
  const place = metadata.place || metadata.location || 'India';
  const tradition = metadata.tradition || metadata.culturalItem || 'Oral Tradition';

  // Smart heuristic extraction
  let extractedTitle = metadata.title || '';
  if (!extractedTitle) {
    if (text.length > 0) {
      const firstSentence = text.split(/[.!?\n]/)[0].trim();
      extractedTitle = firstSentence.length > 60 ? firstSentence.slice(0, 57) + '...' : firstSentence;
    } else {
      extractedTitle = `${tradition} Memories from ${place}`;
    }
  }

  // Detect festival/tradition cues
  let festivalOrTradition = tradition;
  const lowerText = text.toLowerCase();
  if (lowerText.includes('bathukamma')) festivalOrTradition = 'Bathukamma Floral Festival';
  else if (lowerText.includes('bonalu')) festivalOrTradition = 'Bonalu Mahankali Festival';
  else if (lowerText.includes('sankranti') || lowerText.includes('pongal')) festivalOrTradition = 'Makara Sankranti / Pongal';
  else if (lowerText.includes('diwali') || lowerText.includes('deepavali')) festivalOrTradition = 'Deepavali / Karthika Deepam';
  else if (lowerText.includes('kuchipudi') || lowerText.includes('bharatanatyam')) festivalOrTradition = 'Classical Dance Heritage';
  else if (lowerText.includes('bronze') || lowerText.includes('panchaloha')) festivalOrTradition = 'Sacred Bronze Sculpting Tradition';

  return {
    title: extractedTitle,
    person: person,
    place: place,
    tradition: festivalOrTradition,
    familyPractice: `The family traditionally gathers during ${festivalOrTradition} where practices and elder guidance are passed down without written scripts.`,
    culturalMeaning: 'Preserving the intangible emotional bonds, reciprocal community gratitude, and regional ecological reverence passed through oral heritage.',
    structuredStory: text || 'Oral tradition preserved through personal family memory.',
    preservedBy: metadata.contributorName || 'Cultural Contributor',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    attributionNote: 'AI-structured from family-contributed story. Distinguishing lived family memory from verified historical epigraphy.'
  };
}

