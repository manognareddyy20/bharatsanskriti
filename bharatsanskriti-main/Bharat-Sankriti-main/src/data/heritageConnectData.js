// ============================================================
// BHARAT SANSKRITI - HERITAGECONNECT DATA ARCHIVE
// Authentic Demo Data for:
// 1. Temple Seva Exchange (8 Sevas, 5 Temples)
// 2. TempleWork (8 Heritage Projects, 12 Master Artisans)
// 3. Cultural Stories (Demo text records with NO fake audio)
// Across: Telangana, Andhra Pradesh, Tamil Nadu, Karnataka, Odisha, Rajasthan, Kerala
// ============================================================

export const DEMO_TEMPLES = [
  {
    id: 'temple-meenakshi',
    name: 'Sri Meenakshi Sundareswarar Temple',
    location: 'Madurai, Tamil Nadu',
    state: 'Tamil Nadu',
    deity: 'Goddess Meenakshi & Lord Sundareswarar',
    era: '6th Century CE / Nayaka Architecture (1623–1655)',
    description: 'Famed ancient temple complex with 14 magnificent gopurams adorned with thousands of vibrant mythological stucco figures and the Thousand Pillar Hall.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    contactPerson: 'K. Sunderarajan (Trustee & Seva Coordinator)'
  },
  {
    id: 'temple-brihadeeswarar',
    name: 'Brihadeeswarar Temple (Peruvudaiyar Kovil)',
    location: 'Thanjavur, Tamil Nadu',
    state: 'Tamil Nadu',
    deity: 'Lord Shiva (Rajarajeshwaram)',
    era: '1010 CE / Chola Dynasty (Emperor Raja Raja Chola I)',
    description: 'UNESCO World Heritage Great Living Chola Temple featuring a massive 216-foot granite vimana topped by an 80-tonne monolithic kumbam and 11th-century murals.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
    contactPerson: 'S. Ramanathan (Heritage Restoration Wing)'
  },
  {
    id: 'temple-virupaksha',
    name: 'Virupaksha Temple',
    location: 'Hampi, Karnataka',
    state: 'Karnataka',
    deity: 'Lord Virupaksha (Shiva)',
    era: '7th Century CE / Vijayanagara Empire (Sri Krishnadevaraya expansion)',
    description: 'Sacred sanctum on the banks of the Tungabhadra river, preserved amidst the boulders and architectural marvels of the historic Vijayanagara capital.',
    image: 'https://images.unsplash.com/photo-1609137144822-793675f63d09?auto=format&fit=crop&w=800&q=80',
    contactPerson: 'Vidyashankar Bhat (Temple Seva Samiti)'
  },
  {
    id: 'temple-lepakshi',
    name: 'Veerabhadra Temple (Lepakshi)',
    location: 'Lepakshi, Sri Sathya Sai District, Andhra Pradesh',
    state: 'Andhra Pradesh',
    deity: 'Lord Veerabhadra',
    era: '1530 CE / Vijayanagara Architecture (Virupanna & Veeranna)',
    description: 'Renowned for its hanging pillar, exquisite Vijayanagara ceiling murals, monolithic Nandi, and carved Natya Mandapa depicting musicians and dancers.',
    image: 'https://images.unsplash.com/photo-1628170281699-28c0b6b27e8a?auto=format&fit=crop&w=800&q=80',
    contactPerson: 'Prasada Rao (Lepakshi Heritage Circle)'
  },
  {
    id: 'temple-ramappa',
    name: 'Ramappa Temple (Rudreshwara)',
    location: 'Palampet, Mulugu District, Telangana',
    state: 'Telangana',
    deity: 'Lord Shiva (Ramalingeswara)',
    era: '1213 CE / Kakatiya Dynasty (General Recharla Rudra / Sculptor Ramappa)',
    description: 'UNESCO World Heritage Kakatiya marvel constructed using floating lightweight bricks, carved sandstone pillars with dancing bracket figures (Madanikas).',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80',
    contactPerson: 'Venkata Ramana (Kakatiya Heritage Trust)'
  }
];

export const DEMO_SEVAS = [
  {
    id: 'seva-1',
    templeId: 'temple-ramappa',
    templeName: 'Ramappa Temple (Rudreshwara)',
    templeLocation: 'Mulugu District, Telangana',
    templeImage: 'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80',
    title: 'Kakatiya Inscription & Bracket Figures Photographic Documentation',
    category: 'Photography',
    location: 'Telangana',
    date: '2026-10-18 to 2026-10-20',
    duration: '3 Days (Weekend)',
    peopleNeeded: 4,
    spotsRemaining: 2,
    skillsRequired: ['Photography', 'Documentation', 'Lighting', 'Cultural Research'],
    description: 'Help the temple trust create an archival digital library of the delicate 800-year-old black basalt bracket figures (Madanikas) and Telugu-Sanskrit inscriptions.',
    additionalRequirements: 'Volunteers should have basic DSLR or mirrorless photography skills. Macro lens preferred.',
    status: 'ACTIVE'
  },
  {
    id: 'seva-2',
    templeId: 'temple-meenakshi',
    templeName: 'Sri Meenakshi Sundareswarar Temple',
    templeLocation: 'Madurai, Tamil Nadu',
    templeImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    title: 'Chithirai Festival Pilgrim Guidance & Multi-lingual Assistance',
    category: 'Festival Volunteer',
    location: 'Tamil Nadu',
    date: '2026-10-25 to 2026-10-28',
    duration: '4 Days (Shifts available)',
    peopleNeeded: 12,
    spotsRemaining: 5,
    skillsRequired: ['Translation', 'Event Support', 'Tamil', 'Hindi', 'English'],
    description: 'Assist arriving devotees and international visitors during temple festivities, providing informational route guidance, elderly support, and safety coordination.',
    additionalRequirements: 'Patience and welcoming demeanor. Respectful traditional dress required within temple premises.',
    status: 'ACTIVE'
  },
  {
    id: 'seva-3',
    templeId: 'temple-brihadeeswarar',
    templeName: 'Brihadeeswarar Temple',
    templeLocation: 'Thanjavur, Tamil Nadu',
    templeImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
    title: 'Palm-Leaf Manuscript & Sanskrit Inscription Translation Seva',
    category: 'Translation',
    location: 'Tamil Nadu',
    date: '2026-11-05 to 2026-11-15',
    duration: '10 Days (Remote & On-site)',
    peopleNeeded: 3,
    spotsRemaining: 1,
    skillsRequired: ['Translation', 'Cultural Research', 'Documentation', 'Sanskrit'],
    description: 'Assist senior epigraphists in transcribing Chola endowment records and liturgical commentaries from palm-leaf folios into digital formats.',
    additionalRequirements: 'Reading comprehension in classical Tamil, Grantha, or Sanskrit epigraphy.',
    status: 'ACTIVE'
  },
  {
    id: 'seva-4',
    templeId: 'temple-virupaksha',
    templeName: 'Virupaksha Temple',
    templeLocation: 'Hampi, Karnataka',
    templeImage: 'https://images.unsplash.com/photo-1609137144822-793675f63d09?auto=format&fit=crop&w=800&q=80',
    title: 'Sacred Temple Tank (Pushkarini) Cleanliness & Ecology Seva',
    category: 'Cleaning / Service',
    location: 'Karnataka',
    date: '2026-10-12',
    duration: '1 Day (Morning 6 AM - 12 PM)',
    peopleNeeded: 20,
    spotsRemaining: 9,
    skillsRequired: ['Cleaning / Service', 'Event Support', 'Teamwork'],
    description: 'Join local youth and temple sevaks in eco-friendly desilting and water-edge cleansing of the historic stone stepwell ahead of the Karthika Deepotsavam.',
    additionalRequirements: 'Comfortable cotton clothing. Gloves and eco-cleaning gear will be provided.',
    status: 'ACTIVE'
  },
  {
    id: 'seva-5',
    templeId: 'temple-lepakshi',
    templeName: 'Veerabhadra Temple (Lepakshi)',
    templeLocation: 'Lepakshi, Andhra Pradesh',
    templeImage: 'https://images.unsplash.com/photo-1628170281699-28c0b6b27e8a?auto=format&fit=crop&w=800&q=80',
    title: 'Vijayanagara Fresco Preservation Video Documentary',
    category: 'Videography',
    location: 'Andhra Pradesh',
    date: '2026-11-20 to 2026-11-22',
    duration: '3 Days',
    peopleNeeded: 3,
    spotsRemaining: 2,
    skillsRequired: ['Videography', 'Documentation', 'Technical Support'],
    description: 'Document the painstaking natural pigment consolidation work being conducted on the ceiling fresco of Lord Shiva and the 70-pillar Natya Mandapa.',
    additionalRequirements: 'Gimbal or tripod support; low-light video capture capability without intrusive flash.',
    status: 'ACTIVE'
  },
  {
    id: 'seva-6',
    templeId: 'temple-meenakshi',
    templeName: 'Sri Meenakshi Sundareswarar Temple',
    templeLocation: 'Madurai, Tamil Nadu',
    templeImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    title: 'Heritage Temple Outreach & Digital Storytelling Graphic Design',
    category: 'Graphic Design',
    location: 'Tamil Nadu (Remote)',
    date: '2026-10-15 to 2026-10-30',
    duration: '2 Weeks (Flexible Remote)',
    peopleNeeded: 2,
    spotsRemaining: 1,
    skillsRequired: ['Graphic Design', 'Social Media', 'Documentation'],
    description: 'Design informative bilingual heritage signage, temple architecture infographics, and conservation awareness posters for young devotees.',
    additionalRequirements: 'Familiarity with Canva, Figma, or Adobe InDesign/Illustrator.',
    status: 'ACTIVE'
  },
  {
    id: 'seva-7',
    templeId: 'temple-ramappa',
    templeName: 'Ramappa Temple (Rudreshwara)',
    templeLocation: 'Mulugu District, Telangana',
    templeImage: 'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80',
    title: 'Classical Perini Sivatandavam & Temple Music Documentation',
    category: 'Music',
    location: 'Telangana',
    date: '2026-11-14 to 2026-11-15',
    duration: '2 Days (Evening)',
    peopleNeeded: 5,
    spotsRemaining: 3,
    skillsRequired: ['Music', 'Documentation', 'Event Support', 'Technical Support'],
    description: 'Support sound engineering, stage coordination, and oral history recording for Kakatiya-era warrior dance masters performing under temple arches.',
    additionalRequirements: 'Appreciation of South Indian classical rhythm systems (Talam) and traditional instruments.',
    status: 'ACTIVE'
  },
  {
    id: 'seva-8',
    templeId: 'temple-virupaksha',
    templeName: 'Virupaksha Temple',
    templeLocation: 'Hampi, Karnataka',
    templeImage: 'https://images.unsplash.com/photo-1609137144822-793675f63d09?auto=format&fit=crop&w=800&q=80',
    title: 'Heritage Walk Guided Interpretation for Students & Pilgrims',
    category: 'Cultural Research',
    location: 'Karnataka',
    date: '2026-11-01 to 2026-11-03',
    duration: '3 Days',
    peopleNeeded: 6,
    spotsRemaining: 4,
    skillsRequired: ['Cultural Research', 'Event Support', 'Translation'],
    description: 'Lead visiting school groups through the pillared corridors, explaining the pinhole camera effect in the inner sanctum and Vijayanagara royal architecture.',
    additionalRequirements: 'Prior reading of Hampi architectural guides; workshop provided on first morning.',
    status: 'ACTIVE'
  }
];

export const DEMO_TEMPLEWORK_PROJECTS = [
  {
    id: 'proj-1',
    templeId: 'temple-brihadeeswarar',
    templeName: 'Brihadeeswarar Temple',
    templeLocation: 'Thanjavur, Tamil Nadu',
    title: 'Chola-Style Granite Nandi Mandapa Pillar Flute Restoration',
    requiredCraft: 'Traditional stone carving',
    scale: 'Medium',
    complexity: 'Complex',
    numArtisans: '2-3 Artisans',
    materialsProvided: 'Temple Provides All',
    expertise: 'Master Sthapathi',
    offeredBudget: 85000,
    budgetRange: '₹50,000 – ₹1,00,000',
    materials: 'Dravidian Granite (Krishna Shila)',
    location: 'Tamil Nadu',
    timeline: '6 Months (Phased)',
    experienceRequired: '10+ Years in Shilpa Shastra stone sculpting',
    description: 'Meticulous replacement and consolidation of weathered fluted cornices on the outer stone pavilions using hand chisels and traditional lime-surkhi binders without power tools.',
    referenceImages: [
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'OPEN'
  },
  {
    id: 'proj-2',
    templeId: 'temple-meenakshi',
    templeName: 'Sri Meenakshi Sundareswarar Temple',
    templeLocation: 'Madurai, Tamil Nadu',
    title: 'Ashta Shakti Mandapa Natural Mineral Pigment Fresco Conservation',
    requiredCraft: 'Mural painting',
    scale: 'Medium',
    complexity: 'Standard',
    numArtisans: '2-3 Artisans',
    materialsProvided: 'Artisan Procures Special Materials',
    expertise: 'Senior Craftsman',
    offeredBudget: 48000,
    budgetRange: '₹30,000 – ₹60,000',
    materials: 'Vegetable Dyes, Mineral Pigments, Gum Arabic, Shell Lime',
    location: 'Tamil Nadu',
    timeline: '4 Months',
    experienceRequired: '8+ Years in traditional Nayaka or Kerala mural preservation',
    description: 'Re-adhesion of flaking tempera pigments and hand-touch consolidation of mythological narrative panels depicting the celestial wedding of Meenakshi and Sundareswarar.',
    referenceImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'OPEN'
  },
  {
    id: 'proj-3',
    templeId: 'temple-ramappa',
    templeName: 'Ramappa Temple (Rudreshwara)',
    templeLocation: 'Mulugu District, Telangana',
    title: 'Hand-Cast Panchaloha Utsava Murti of Nataraja (Kakatiya Style)',
    requiredCraft: 'Bronze casting',
    scale: 'Medium',
    complexity: 'High Precision',
    numArtisans: '1 Solo Master',
    materialsProvided: 'Artisan Procures Special Materials',
    expertise: 'Master Sthapathi',
    offeredBudget: 120000,
    budgetRange: '₹70,000 – ₹1,50,000',
    materials: 'Panchaloha (Copper, Brass, Gold, Silver, Lead alloy via Madhuchishta Vidhana)',
    location: 'Telangana',
    timeline: '3 Months',
    experienceRequired: '12+ Years in Lost Wax (Cire Perdue) bronze casting',
    description: 'Commissioning a sacred portable Utsava icon adhering to the Agamas with flowing Kakatiya hair ornaments, intricate prabhavali, and dynamic posture.',
    referenceImages: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'OPEN'
  },
  {
    id: 'proj-4',
    templeId: 'temple-virupaksha',
    templeName: 'Virupaksha Temple',
    templeLocation: 'Hampi, Karnataka',
    title: 'East Gopuram Hand-Carved Teakwood Maha Dvara Doors',
    requiredCraft: 'Wood carving',
    scale: 'Large',
    complexity: 'Complex',
    numArtisans: '4-10 Team',
    materialsProvided: 'Temple Provides All',
    expertise: 'Master Sthapathi',
    offeredBudget: 150000,
    budgetRange: '₹90,000 – ₹2,00,000+',
    materials: 'Seasoned Burma Teak, Hand-forged Brass Studs (Kavali)',
    location: 'Karnataka',
    timeline: '5 Months',
    experienceRequired: '10+ Years in temple door relief carving',
    description: 'Creation of twin 18-foot temple threshold doors intricately carved with the Ashta Dikpalas, floral arabesques, and protective guardian lintels.',
    referenceImages: [
      'https://images.unsplash.com/photo-1609137144822-793675f63d09?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'OPEN'
  },
  {
    id: 'proj-5',
    templeId: 'temple-lepakshi',
    templeName: 'Veerabhadra Temple (Lepakshi)',
    templeLocation: 'Lepakshi, Andhra Pradesh',
    title: 'Mukha Mandapa Hanging Pillar Stone Micro-Fissure Consolidation',
    requiredCraft: 'Heritage restoration',
    scale: 'Medium',
    complexity: 'High Precision',
    numArtisans: '2-3 Artisans',
    materialsProvided: 'Shared Procurement',
    expertise: 'Master Sthapathi',
    offeredBudget: 180000,
    budgetRange: '₹1,00,000 – ₹3,00,000',
    materials: 'Natural hydraulic lime, pozzolanic stone dust, stone dowels',
    location: 'Andhra Pradesh',
    timeline: '3 Months',
    experienceRequired: '15+ Years in structural monolithic heritage stabilization',
    description: 'Structural stabilization of the granite lintels surrounding the world-famous suspended pillar to prevent seismic and thermal stress cracks.',
    referenceImages: [
      'https://images.unsplash.com/photo-1628170281699-28c0b6b27e8a?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'OPEN'
  },
  {
    id: 'proj-6',
    templeId: 'temple-meenakshi',
    templeName: 'Sri Meenakshi Sundareswarar Temple',
    templeLocation: 'Madurai, Tamil Nadu',
    title: 'Chokkanatha Sanctum Hand-Engraved Repoussé Silver Kavacham',
    requiredCraft: 'Metalwork',
    scale: 'Medium',
    complexity: 'Complex',
    numArtisans: '2-3 Artisans',
    materialsProvided: 'Temple Provides All',
    expertise: 'Senior Craftsman',
    offeredBudget: 75000,
    budgetRange: '₹45,000 – ₹1,00,000',
    materials: 'Fine Silver (.999), Chased Repoussé detailing',
    location: 'Tamil Nadu',
    timeline: '2 Months',
    experienceRequired: '7+ Years in sacred metal repoussé and engraving',
    description: 'Chasing and repoussé ornamentation of traditional silver armor for the sacred sanctum threshold featuring Bilva leaf and Kamadhenu motifs.',
    referenceImages: [
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'OPEN'
  },
  {
    id: 'proj-7',
    templeId: 'temple-brihadeeswarar',
    templeName: 'Brihadeeswarar Temple',
    templeLocation: 'Thanjavur, Tamil Nadu',
    title: 'Traditional Stucco (Sudhai) Viman Sculptural Restoration',
    requiredCraft: 'Traditional architecture',
    scale: 'Medium',
    complexity: 'Standard',
    numArtisans: '2-3 Artisans',
    materialsProvided: 'Shared Procurement',
    expertise: 'Senior Craftsman',
    offeredBudget: 220000,
    budgetRange: '₹1,20,000 – ₹3,50,000',
    materials: 'Eggshell lime, jaggery water, Kadukkai (myrobalan) fermented mortar',
    location: 'Tamil Nadu',
    timeline: '4 Months',
    experienceRequired: '10+ Years in Sudhai sculpturing (organic lime plaster)',
    description: 'Gentle restoration of weathered plaster celestial deities on the lower tiers of the southern gopuram using ancient Ayurvedic mortar formulations.',
    referenceImages: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'OPEN'
  },
  {
    id: 'proj-8',
    templeId: 'temple-ramappa',
    templeName: 'Ramappa Temple (Rudreshwara)',
    templeLocation: 'Mulugu District, Telangana',
    title: 'Upapitha Basalt Carved Elephant Frieze Conservation',
    requiredCraft: 'Traditional stone carving',
    scale: 'Small',
    complexity: 'Complex',
    numArtisans: '1 Solo Master',
    materialsProvided: 'Temple Provides All',
    expertise: 'Senior Craftsman',
    offeredBudget: 42000,
    budgetRange: '₹25,000 – ₹50,000',
    materials: 'Black Basalt, Diamond-tipped fine rasps, Stone consolidants',
    location: 'Telangana',
    timeline: '3 Months',
    experienceRequired: '8+ Years in hard volcanic stone carving',
    description: 'Cleaning micro-biological patina and hand-refining fractured ears and tusks on the base plinth elephant procession according to Kakatiya Silpa norms.',
    referenceImages: [
      'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'OPEN'
  }
];

export const DEMO_ARTISANS = [
  {
    id: 'artisan-1',
    name: 'Shilpi K. Ramanathan Sthapathi',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    region: 'Tamil Nadu',
    city: 'Mahabalipuram',
    craft: 'Traditional stone carving',
    yearsOfExperience: 24,
    specialization: 'Chola & Pallava Granite Shilpa Shastra Sculpture',
    bio: 'Descendant of seven generations of temple stone sculptors from Mahabalipuram. Master in hand-chiseled granites, vimana reliefs, and sanctum dvarapalas according to Manasara texts.',
    portfolio: [
      'Sri Ranganathaswamy Temple Northern Pavilion Restoration',
      'Monolithic Nandi Sculpture, Tiruvannamalai',
      'Carved Granite Pillars for Vaduvur Ramar Temple'
    ],
    previousProjects: [
      'Tirupati Balaji Outer Stone Tier (2018)',
      'Thanjavur Peruvudaiyar Parivara Shrine Masonry (2021)'
    ],
    skills: ['Granite Carving', 'Shilpa Shastra', 'Architectural Draftsmanship', 'Hand Chiseling'],
    languages: ['Tamil', 'Telugu', 'English'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.9,
    completedTempleWorks: 18
  },
  {
    id: 'artisan-2',
    name: 'Master Suresh Kumar Mohapatra',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    region: 'Odisha',
    city: 'Raghurajpur',
    craft: 'Mural painting',
    yearsOfExperience: 19,
    specialization: 'Traditional Pattachitra & Temple Fresco Restoration',
    bio: 'Preserver of natural mineral pigment artistry from the heritage village of Raghurajpur. Expert in grinding conch-shell white, lampblack, hingula red, and haritala yellow for sacred temple walls.',
    portfolio: [
      'Jagannath Temple Puri Gundicha Mandap Restorations',
      'Biraja Temple Ceiling Fresco Natural Dye Touch-up',
      'Traditional Ramayana Pattachitra Murals'
    ],
    previousProjects: [
      'Konark Sun Temple Heritage Museum Interpretive Murals (2019)',
      'Mukteshvara Temple Painted Ceilings (2022)'
    ],
    skills: ['Natural Pigment Preparation', 'Pattachitra', 'Fresco Consolidation', 'Calligraphy'],
    languages: ['Odia', 'Hindi', 'Bengali'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.8,
    completedTempleWorks: 14
  },
  {
    id: 'artisan-3',
    name: 'Acharya Shankara Sthapathi',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    region: 'Tamil Nadu',
    city: 'Swamimalai',
    craft: 'Bronze casting',
    yearsOfExperience: 28,
    specialization: 'Lost Wax (Madhuchishta Vidhana) Panchaloha Sacred Castings',
    bio: 'National Award-winning master bronze caster hailing from Swamimalai on the banks of the Kaveri. Follows the rigorous proportional geometry of the Dhyana Shlokas for Nataraja and Somaskanda idols.',
    portfolio: [
      '6-Foot Panchaloha Dancing Shiva for Kanchipuram Shrine',
      'Ashta Lakshmi Solid Bronze Murti Set',
      'Chola-Era Replicas for National Cultural Exhibits'
    ],
    previousProjects: [
      'Madurai Meenakshi Amman Temple Processional Icons (2017)',
      'Singapore Mariamman Temple Bronze Sanctum Idols (2023)'
    ],
    skills: ['Panchaloha Casting', 'Lost Wax Technique', 'Iconometry', 'Chasing & Patination'],
    languages: ['Tamil', 'Sanskrit', 'English'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 5.0,
    completedTempleWorks: 31
  },
  {
    id: 'artisan-4',
    name: 'Babu Rao Vishwakarma',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    region: 'Telangana',
    city: 'Alampur & Hyderabad',
    craft: 'Traditional stone carving',
    yearsOfExperience: 16,
    specialization: 'Kakatiya & Chalukya Basalt & Red Sandstone Carvings',
    bio: 'Specialist in the delicate filigree-like stone lace of the Deccan. Expert in working with dense black dolerite and sandstone for temple mandapas and stepped wells.',
    portfolio: [
      'Alampur Navabrahma Temple Stone Arch Restorations',
      'Warangal Fort Kakatiya Torana Reconstruction Support',
      'Bhongir Rock-Cut Temple Relief Panel'
    ],
    previousProjects: [
      'Ramappa Temple Surroundings Conservation (2020)',
      'Kaleshwaram Mukteswara Temple Pillar Repair (2023)'
    ],
    skills: ['Basalt Sculpting', 'Kakatiya Geometry', 'Relief Carving', 'Heritage Masonry'],
    languages: ['Telugu', 'Hindi', 'Urdu'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.7,
    completedTempleWorks: 12
  },
  {
    id: 'artisan-5',
    name: 'Narayana Acharya',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    region: 'Karnataka',
    city: 'Karkala',
    craft: 'Wood carving',
    yearsOfExperience: 22,
    specialization: 'Teakwood Temple Car (Ratha) & Maha Dvara Door Sculpting',
    bio: 'Master wood sculptor specializing in sacred temple chariots (Rathas) and heavy sanctum doors. Uses age-old seasoning methods with neem and mustard oils to resist tropical humidity and insects.',
    portfolio: [
      'Udupi Sri Krishna Temple Ratha Replacement Wood Panels',
      'Subrahmanya Temple Teakwood Dvara Carvings',
      'Carved Yakshagana Wooden Masks for Temple Festivals'
    ],
    previousProjects: [
      'Kollur Mookambika Wooden Mandapa Ceilings (2018)',
      'Hampi Bazaar Heritage Chariot Conservation (2022)'
    ],
    skills: ['Seasoned Teak Carving', 'Chariot Construction', 'Ratha Reliefs', 'Joinery'],
    languages: ['Kannada', 'Tulu', 'Konkani', 'English'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.9,
    completedTempleWorks: 22
  },
  {
    id: 'artisan-6',
    name: 'Radhika K. Varma',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    region: 'Kerala',
    city: 'Thrissur',
    craft: 'Mural painting',
    yearsOfExperience: 14,
    specialization: 'Kerala Panchavarna Traditional Temple Murals',
    bio: 'Trained at the Guruvayur Devaswom Institute of Mural Painting. Dedicated to the five sacred Panchavarna tones (red, yellow, green, black, white) drawn from laterite earth, clay, and leaves.',
    portfolio: [
      'Vadakkunnathan Temple Surrounding Wall Consolidations',
      'Mattancherry Palace Mural Conservation Assistance',
      'Padmanabhaswamy Temple Corridor Narrative Reconstructions'
    ],
    previousProjects: [
      'Guruvayur Sree Krishna Temple Chuttambalam Frescoes (2021)',
      'Chottanikkara Temple sanctum outer panels (2024)'
    ],
    skills: ['Panchavarna Murals', 'Ayurvedic Vegetable Pigments', 'Lime Plaster Grounds'],
    languages: ['Malayalam', 'Tamil', 'English'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.9,
    completedTempleWorks: 11
  },
  {
    id: 'artisan-7',
    name: 'Pandit Govindram Sompura',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    region: 'Rajasthan',
    city: 'Dhrangadhra & Udaipur',
    craft: 'Traditional architecture',
    yearsOfExperience: 27,
    specialization: 'Nagara & Maru-Gurjara Temple Architecture & Sthapatya',
    bio: 'From the esteemed Sompura clan of traditional Indian temple architects. Experienced in structural sandstone interlocking joints without steel rebar according to Shilpa Dipika.',
    portfolio: [
      'Ranakpur Jain Temple Intricate Marble Bracket Restorations',
      'Dilwara Temple Carved Ceiling Conservation Consulting',
      'New Maru-Gurjara Mandir Construction, Jodhpur'
    ],
    previousProjects: [
      'Somnath Temple Perimeter Pavilion (2016)',
      'Akshardham Heritage Carving Supervision (2019)'
    ],
    skills: ['Nagara Architecture', 'Marble Carving', 'Dry-Joint Masonry', 'Vastu Shastra'],
    languages: ['Gujarati', 'Hindi', 'Rajasthani', 'English'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 5.0,
    completedTempleWorks: 26
  },
  {
    id: 'artisan-8',
    name: 'M. Venkatachalapathi',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
    region: 'Tamil Nadu',
    city: 'Kumbakonam',
    craft: 'Metalwork',
    yearsOfExperience: 20,
    specialization: 'Temple Brass & Silver Kavacham, Lamps (Kuthuvilakku)',
    bio: 'Heritage metalsmith specializing in deep-drawn bronze lamps, ceremonial temple bells, and gold-leaf repoussé crown ornaments for deity statues across South India.',
    portfolio: [
      'Tirunageswaram Temple Grand Brass Deepa Stambha (14 feet)',
      'Sarangapani Temple Silver Chariot Plating',
      'Chidambaram Nataraja Temple Brass Cladding'
    ],
    previousProjects: [
      'Palani Murugan Temple Golden Peacock Mount (2019)',
      'Rameswaram Temple Sanctum Bell Castings (2022)'
    ],
    skills: ['Chasing', 'Repoussé', 'Brass Casting', 'Gold & Silver Leafing'],
    languages: ['Tamil', 'Telugu'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.8,
    completedTempleWorks: 19
  },
  {
    id: 'artisan-9',
    name: 'Dr. C. S. Shivananda',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    region: 'Andhra Pradesh',
    city: 'Lepakshi & Vijayawada',
    craft: 'Heritage restoration',
    yearsOfExperience: 21,
    specialization: 'Monolithic Granite Stabilization & Chemical De-salination',
    bio: 'Conservation scientist and stone master. Works on micro-fracture injection using hydraulic non-staining lime grouts and botanical poultices to extract destructive salt deposits from ancient temple stone.',
    portfolio: [
      'Lepakshi Monolithic Nandi Surface De-salination',
      'Undavalli Caves Sandstone Consolidation',
      'Amaravati Stupa Architectural Fragment Preservations'
    ],
    previousProjects: [
      'Simhachalam Temple Outer Enclosure Masonry (2018)',
      'Sri Kalahasti Temple Gopuram Crack Grouting (2023)'
    ],
    skills: ['Structural Grouting', 'Non-destructive Testing', 'Petrological Analysis'],
    languages: ['Telugu', 'English', 'Hindi'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.9,
    completedTempleWorks: 17
  },
  {
    id: 'artisan-10',
    name: 'Ustad Mohammed Yusuf & Sons',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    region: 'Rajasthan',
    city: 'Jaipur',
    craft: 'Traditional painting',
    yearsOfExperience: 23,
    specialization: 'Miniature Fresco & Thikri Glass Inlay (Sheesh Mahal Craft)',
    bio: 'Master practitioners of convex Belgian mirror glass inlay (Thikri) embedded in white lime plaster. Commissioned for royal palaces and historic temple pavilions across Rajasthan and Gujarat.',
    portfolio: [
      'Amber Fort Sheesh Mahal Restoration Advisory',
      'Udaipur City Palace Glass Peacocks Cleaning Support',
      'Jagdish Temple Jaipur Decorative Stucco Accents'
    ],
    previousProjects: [
      'Samode Palace Mirror Ceilings (2017)',
      'Nathdwara Haveli Decorative Glass Panels (2022)'
    ],
    skills: ['Thikri Mirror Inlay', 'Pure Gold Foil Work', 'Lime Stucco Modeling'],
    languages: ['Hindi', 'Rajasthani', 'Urdu', 'English'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.9,
    completedTempleWorks: 15
  },
  {
    id: 'artisan-11',
    name: 'Subramanian Gurukkal',
    image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80',
    region: 'Tamil Nadu',
    city: 'Karaikudi (Chettinad)',
    craft: 'Traditional architecture',
    yearsOfExperience: 18,
    specialization: 'Eggshell Lime Plaster (Chettinad Vellai) & Sudhai Work',
    bio: 'Preserves the legendary mirror-shine lime plaster crafted with egg whites, sea-shell lime, and river sand. Cool to the touch and enduring for centuries in tropical coastal shrines.',
    portfolio: [
      'Chettinad Clan Temple Courtyard Plaster Restorations',
      'Kunnakkudi Murugan Temple Sudhai Viman Figures',
      'Pillayarpatti Ganesha Temple Polished Lime Floors'
    ],
    previousProjects: [
      'Tirumayam Cave Temple Surroundings (2019)',
      'Avudaiyarkovil Temple Mantapa Floor Conservation (2023)'
    ],
    skills: ['Chettinad Eggshell Lime', 'Traditional Sudhai Stucco', 'Natural Polishing'],
    languages: ['Tamil', 'English'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.7,
    completedTempleWorks: 13
  },
  {
    id: 'artisan-12',
    name: 'K. Balakrishna Sculptors',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    region: 'Karnataka',
    city: 'Halebidu & Belur',
    craft: 'Traditional stone carving',
    yearsOfExperience: 15,
    specialization: 'Hoysala Chloritic Schist (Soapstone) Miniature Reliefs',
    bio: 'Dedicated to reviving the impossibly intricate Hoysala jewelry and lace carving on green-grey soapstone. Capable of carving deep undercuts where rotating bead necklaces are detached from the stone.',
    portfolio: [
      'Belur Chennakeshava Bracket Figure Micro-Cleansing',
      'Halebidu Temple Star-Plinth Fragment Reconstruction',
      'Soapstone Relief Panels for Hoysala Heritage Center'
    ],
    previousProjects: [
      'Somnathpur Keshava Temple Outer Frieze Study (2020)',
      'Arasikere Ishvara Temple Mandapa Preservation (2023)'
    ],
    skills: ['Soapstone Carving', 'Hoysala Undercuts', 'Intricate Jewelry Detailing'],
    languages: ['Kannada', 'English', 'Hindi'],
    verificationStatus: 'VERIFIED_DEMO',
    rating: 4.8,
    completedTempleWorks: 10
  }
];

// Demo TEXT cultural stories (Strictly NO default audio files or fake audio)
export const DEMO_TEXT_CULTURAL_STORIES = [
  {
    id: 'demo-story-1',
    title: 'Grandmother’s Secret Saddulu Rice Recipe during Bathukamma',
    person: 'Satyavati Amma (Eldest Grandmother)',
    place: 'Warangal, Telangana',
    tradition: 'Bathukamma & Navratri Festivities',
    description: 'On the ninth day of Saddula Bathukamma, our grandmother would grind roasted sesame seeds with jaggery on an ancient stone mortar (Rolukavva). She taught us that sharing five distinct seasoned rice preparations with our neighbors honors both the bounty of the harvest and the maternal harmony of our village.',
    preservedBy: 'Kavitha Reddy',
    createdAt: '2026-08-14T10:30:00.000Z',
    formattedDate: 'August 14, 2026',
    isFavorite: false,
    hasAudio: false,
    audioDuration: ''
  },
  {
    id: 'demo-story-2',
    title: 'The Bell Bronze Secret Passed Across Five Generations',
    person: 'Kandasamy Achari (Master Metalsmith)',
    place: 'Nachiar Kovil, Tamil Nadu',
    tradition: 'Lost Wax Bell Casting Tradition',
    description: 'Before pouring molten bronze into the clay and cow-dung mold, my grandfather would place his palm against the baked shell to test its heat purely by touch. He used to whisper: “The metal will sing only if you listen to the temperature of the clay first.”',
    preservedBy: 'Murugan K.',
    createdAt: '2026-08-22T15:45:00.000Z',
    formattedDate: 'August 22, 2026',
    isFavorite: true,
    hasAudio: false,
    audioDuration: ''
  },
  {
    id: 'demo-story-3',
    title: 'Singing Along the Tungabhadra at Sunset during Hampi Utsav',
    person: 'Ramachandra Rao (Classical Vocalist)',
    place: 'Anegundi, Karnataka',
    tradition: 'Haridasa Kirtana & Vijayanagara Heritage',
    description: 'During Karthika Somavaram, our family elders would light terracotta deepams on the boulder steps facing the Virupaksha tower. As the river breeze stirred the temple bells, my uncle would sing Purandara Dasa kirtanas that had echoed in these same corridors five centuries ago.',
    preservedBy: 'Ananya Rao',
    createdAt: '2026-09-02T18:20:00.000Z',
    formattedDate: 'September 2, 2026',
    isFavorite: false,
    hasAudio: false,
    audioDuration: ''
  }
];
