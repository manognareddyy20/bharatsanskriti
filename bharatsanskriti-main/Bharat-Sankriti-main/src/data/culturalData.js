// ============================================================
// BHARAT SANSKRITI - CULTURAL DATA ARCHIVE
// 3 States × 5 Features × 3 Cultural Items = 45 Authentic Items
// Pattern: DISCOVER → LEARN → PRESERVE
// ============================================================

export const FEATURE_DEFINITIONS = [
  {
    id: 'festivals',
    icon: '🌸',
    title: 'Festivals & Traditions',
    shortTitle: 'Festivals',
    description: 'Discover festivals, rituals, celebrations, and traditions passed through generations.',
  },
  {
    id: 'arts',
    icon: '🎨',
    title: 'Arts & Crafts',
    shortTitle: 'Arts & Crafts',
    description: 'Explore traditional paintings, handicrafts, textiles, and artistic traditions.',
  },
  {
    id: 'dance',
    icon: '💃',
    title: 'Dance & Music',
    shortTitle: 'Dance & Music',
    description: 'Learn about classical and folk dances, music, performers, and cultural expressions.',
  },
  {
    id: 'cuisine',
    icon: '🍛',
    title: 'Cuisine',
    shortTitle: 'Cuisine',
    description: 'Discover traditional foods, ingredients, recipes, and the stories behind regional cuisine.',
  },
  {
    id: 'heritage-places',
    icon: '🏛️',
    title: 'Heritage Places',
    shortTitle: 'Heritage Places',
    description: 'Explore historic monuments, ancient temples, royal palaces, and architectural marvels.',
  },
];

export const CULTURAL_DATABASE = {
  // ============================================================
  // 1. TELANGANA
  // ============================================================
  telangana: {
    id: 'telangana',
    name: 'Telangana',
    tagline: 'Land of Kakatiya Glory, Deccan Syntheses & Vibrant Folk Traditions',
    features: {
      festivals: [
        {
          id: 'bathukamma',
          name: 'Bathukamma',
          category: 'Festivals & Traditions',
          tagline: 'The Floral Festival Celebrating Nature and Divine Motherhood',
          shortIntro: 'Bathukamma is Telangana’s grand nine-day floral festival celebrated during Navratri by women who arrange seasonal wildflowers in conical concentric layers to venerate Goddess Gauri.',
          discover: {
            origin: 'Centuries-old folk tradition deeply rooted in agrarian Deccan life and the celebration of native flora.',
            highlights: [
              'Conical floral sculptures made of native medicinal flowers like Gunugu, Tangedu, and Banthi',
              'Celebrated exclusively during the monsoon retreat (Bhadrapada Amavasya to Durgashtami)',
              'Evening village gatherings where women dance in rhythmic concentric circles singing ancestral ballads',
              'Immersion (Nimajjanam) in local lakes, naturally purifying water bodies through medicinal petals'
            ],
            culturalContext: 'Bathukamma embodies the harmonious relationship between Deccan communities and nature, honoring the feminine life-giving force and native ecology.'
          },
          learn: {
            history: 'Historical legends trace Bathukamma back to the Chola and Kakatiya periods. One cherished oral legend tells of King Dharmangada and Queen Satyavati who prayed to Goddess Lakshmi for a child; when blessed with a daughter who survived many trials, sages blessed her with "Bathukamma" (May you live, Mother!). Another Kakatiya account links it to warrior queens leading community regeneration after wartime hardships.',
            significance: 'Unlike rituals requiring priestly mediation, Bathukamma is purely a community folk festival led by women. It represents social solidarity, ecological awareness, and gratitude to nature for sustaining life after the monsoon.',
            traditions: [
              'Gathering wild medicinal flowers across Telangana fields: Gunugu (Celosia), Tangedu (Cassia auriculata), Gummadi (pumpkin flowers), and Katla.',
              'Crafting the Bathukamma layer by layer on a circular brass plate (Taambalam), topped with a turmeric idol of Gouramma.',
              'Lighting a deepam atop the floral pinnacle and performing evening aarti.',
              'Singing traditional Bathukamma folk songs recounting stories of valor, family bonds, and mythological legends.',
              'Sharing "Saddula Bathukamma" prasad—five varieties of flavored rice and sesame-sugar sweets—among neighbors.'
            ],
            howPracticed: 'For nine days, from Engili Pula Bathukamma to the grand Saddula Bathukamma, courtyards are cleaned with cow dung and adorned with muggulu. Women dress in traditional silk Langa Voni and sarees, gather at village squares or temple courtyards at dusk, clap rhythmically around their floral creations, and carry them upon their heads to the nearest lake at sunset.',
            interestingFacts: [
              'The Tangedu flower used extensively in Bathukamma is also the official State Flower of Telangana.',
              'Ecologists note that immersing Bathukamma flowers actually cleanses village water reservoirs because species like Tangedu possess natural antimicrobial and anti-fungal properties.',
              'In 2016, a Guinness World Record was set in Hyderabad when 9,292 women participated in the grandest simultaneous Bathukamma dance.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about Bathukamma in your family—childhood flower-picking memories, a special melody sung by elders, or how you celebrate away from home.',
            memoryIdeas: [
              'How your grandmother or mother selected and stacked the wild flowers',
              'A traditional Bathukamma folk song verse passed down your generations',
              'The taste and making of Saddulu (sesame, tamarind, and coconut rice)'
            ]
          }
        },
        {
          id: 'bonalu',
          name: 'Bonalu',
          category: 'Festivals & Traditions',
          tagline: 'The Divine Thanksgiving to Mother Goddess Mahankali',
          shortIntro: 'Bonalu is an exuberant Hindu folk festival celebrated in Hyderabad and Secunderabad, offering cooked rice in earthen pots to Goddess Mahankali for protection against diseases.',
          discover: {
            origin: 'Originated in 1813 in the twin cities of Hyderabad-Secunderabad during a severe cholera outbreak.',
            highlights: [
              'Women carrying decorated earthen pots (Bonam) balanced on their heads topped with neem leaves and oil lamps',
              'Fierce and spirited Pothuraju performers dancing with whips as divine protectors',
              'The Oracle ceremony (Rangam) predicting the city and agricultural welfare for the coming year',
              'Procession of Goddess Mahankali atop a caparisoned elephant through old Hyderabad'
            ],
            culturalContext: 'Bonalu reflects the indigenous mother-goddess worship (Gramadevata) of Telangana, emphasizing maternal protection, community health, and resilience.'
          },
          learn: {
            history: 'In 1813, plague devastated Hyderabad and Secunderabad. A military battalion stationed in Ujjain prayed to Mahankali at the Mahakaleshwar temple, vowing to build a temple and offer annual thanksgiving "Bonam" (Bhojanam / meal) if the city was saved. When the epidemic ceased, the Sri Ujjaini Mahakali Temple was built, and the annual offering began.',
            significance: 'Bonalu honors the mother goddess in her seven forms: Dokkalamma, Poleramma, Pochamma, Yellamma, Nookalamma, Peddamma, and Ankalamma. It symbolizes community health, gratitude, and warding off pestilence.',
            traditions: [
              'Cooking "Bonam"—rice with milk, jaggery, and onions—in an earthen pot painted with white and vermilion stripes.',
              'Topping the pot with neem leaves, turmeric, and a lit earthen lamp (Jyoti).',
              'Women balancing the lit pot gracefully on their heads, walking to the temple accompanied by resonant dappu drums.',
              'Pothuraju, the brother of the Goddess, clad in a red dhoti and turmeric body paint, dancing aggressively with a hemp whip to clear evil spirits.',
              'Rangam: A woman medium stands on an earthen pot and enters a divine trance to foretell community fortunes.'
            ],
            howPracticed: 'Celebrated across consecutive Sundays of the Ashada month (July-August) starting at Golconda Fort, progressing to Ujjaini Mahakali in Secunderabad, and culminating at the historic Lal Darwaza temple in Old City Hyderabad.',
            interestingFacts: [
              'The word "Bonam" is derived from the Sanskrit word "Bhojanam", signifying a loving meal offered to the mother.',
              'Neem leaves used to cap the Bonam pot were historically chosen for their proven natural antiviral and antibacterial properties during monsoon outbreaks.',
              'Bonalu was declared the official State Festival of Telangana in 2014 following the state’s formation.'
            ]
          },
          preserve: {
            promptText: 'Preserve your family’s Bonalu traditions—memories of carrying the Bonam, listening to the Rangam oracle, or family recipes for the sacred offering.',
            memoryIdeas: [
              'Balancing your first Bonam pot on your head as an adolescent',
              'The thunderous rhythm of the Dappu drums at Lal Darwaza or Golconda',
              'How your neighborhood prepared the Thottelu (paper shrines)'
            ]
          }
        },
        {
          id: 'sammakka-sarakka-jathara',
          name: 'Sammakka Sarakka Jathara',
          category: 'Festivals & Traditions',
          tagline: 'Medaram Jathara: Asia’s Largest Tribal Gathering',
          shortIntro: 'Held biennially in the dense forests of Medaram, this tribal fair commemorates the historic rebellion of Koya tribal mother-daughter deities against unjust Kakatiya taxation during a severe drought.',
          discover: {
            origin: 'Dates back to the 12th century in the Dandakaranya forests of Mulugu district.',
            highlights: [
              'Over 10 to 12 million pilgrims congregate in the forest, second in scale in India only to the Kumbh Mela',
              'No anthropomorphic idol; deities are venerated as sacred bamboo poles smeared with vermilion and forest honey',
              'Devotees offer "Bangaram" (jaggery) equal to their body weight to the deities',
              'Conducted with complete autonomy by hereditary Koya tribal priests (Vaddes)'
            ],
            culturalContext: 'Medaram Jathara is a monumental testament to indigenous tribal resistance, environmental sanctity, and maternal reverence free of caste hierarchies.'
          },
          learn: {
            history: 'In the 12th century, drought struck the Koya kingdom of Pagididda Raju, a feudatory of the Kakatiya king Prataparudra. Unable to pay tributes while his people starved, Raju refused to pay royal taxes. In the battle that ensued by the river Jampanna Vagu, tribal warriors fought valiantly. Sammakka and her daughter Saralamma (Sarakka) joined the battlefield. Fatally wounded, Sammakka disappeared into the Chilakalagutta hillocks, leaving behind only a sacred casket of turmeric (Kumkum bharani).',
            significance: 'The Jathara honors freedom, social justice, and the supreme sacrifice of women leaders who defended their land, forest resources, and community dignity.',
            traditions: [
              'Poyalu ritual: Koya priests invoke ancestral spirits in the forest and bring the sacred bamboo pole of Saralamma from Kannepalli to Medaram.',
              'Bringing Sammakka from the Chilakalagutta hill with high state honors and forest drum rolls.',
              'Holy dip in Jampanna Vagu, the stream named after the martyred tribal prince Jampanna.',
              'Offering "Thulabharam" of pure jaggery (Bangaram) matching one’s exact body weight.'
            ],
            howPracticed: 'Held over four days in the Magha month (February) once every two years. Millions set up temporary campsites under the mahua and teak trees of the Medaram forest, cooking community feasts and singing Koya ballads.',
            interestingFacts: [
              'Medaram Jathara is recognized as the largest congregation of tribal peoples in the entire continent of Asia.',
              'The fair strictly prohibits animal sacrifices at the central altar, preserving the solemn sanctity of the forest grove.',
              'Devotees take home the offered jaggery as sacred medicine and store it as a divine talisman throughout the year.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about your pilgrimage to Medaram, camping under the stars, or hearing the legend of Sammakka from elders.',
            memoryIdeas: [
              'Your journey through the Mulugu forests to reach the sacred bamboo platforms',
              'Weighing yourself against jaggery (Bangaram) with your family',
              'Stories of tribal bravery passed down through your village'
            ]
          }
        }
      ],
      arts: [
        {
          id: 'cheriyal-scroll-paintings',
          name: 'Cheriyal Scroll Paintings',
          category: 'Arts & Crafts',
          tagline: 'Centuries-Old Narrative Art on Khadi Canvas',
          shortIntro: 'Cheriyal Scroll Painting is a stylized version of Nakashi art, depicting continuous episodic narratives from Indian epics and folk legends on khadi cloth scrolls prepared with tamarind seed paste.',
          discover: {
            origin: 'Flourished in Cheriyal village of Siddipet district, Telangana, over 400 years ago.',
            highlights: [
              'Historically measured 30 to 45 feet in length with over 50 narrative panels',
              'Painted using 100% natural stone pigments, lamp black, and tree gums',
              'Accompanied traveling village storytellers (balladeers) singing oral histories',
              'Holder of the Geographical Indication (GI) tag since 2007'
            ],
            culturalContext: 'Cheriyal scrolls served as dynamic visual aids for rural bardic communities, acting as the cinema and illustrated literature of ancient Telangana.'
          },
          learn: {
            history: 'The art belongs to the Nakashi artisan community who migrated through the Deccan plateau. Traveling balladeer castes like Dakkali, Kaki Padagala, and Gauda Jetis commissioned scrolls to accompany their storytelling performances. As they unrolled each panel, they sang songs explaining the genealogies and heroism of specific rural communities.',
            significance: 'Cheriyal scrolls preserve folk renditions of the Ramayana and Mahabharata blended seamlessly with local Telangana folklore, agrarian motifs, and village life.',
            traditions: [
              'Canvas preparation: Handspun khadi cloth treated with a paste of tamarind seeds, chalk powder (white mud), gum, and tree resins.',
              'Colors: Derived from natural stones (inglikam for red, zard for yellow), lamp soot for black, conch shell powder for white, and indigo for blue.',
              'Characteristic style: Strong red background, expressive fish-shaped eyes, distinctive profile faces, and intricate floral decorative borders.'
            ],
            howPracticed: 'While epic 40-foot scrolls are now preserved in museums, master artisans in Cheriyal and Hyderabad still create smaller narrative panels, festive masks made of coconut shells and sawdust, and mythological wall art.',
            interestingFacts: [
              'Traditional Cheriyal scroll masks are made from a lightweight paste of sawdust and tamarind seed paste shaped over clay moulds.',
              'Only a handful of master families in Telangana still carry the unbroken lineage of authentic Cheriyal scroll painting.',
              'The bold red background characteristic of Cheriyal art is traditionally created from cinnabar stone pigment.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of seeing a Cheriyal scroll performance, meeting a master artisan, or owning a piece of Cheriyal art.',
            memoryIdeas: [
              'A traveling bard performance witnessed in your ancestral village',
              'Visiting an artisan workshop in Cheriyal or Siddipet',
              'The story depicted on a family heirloom scroll'
            ]
          }
        },
        {
          id: 'nirmal-toys-and-paintings',
          name: 'Nirmal Toys & Paintings',
          category: 'Arts & Crafts',
          tagline: 'Lacquered Softwood Wonders and Gold-Dusted Paintings',
          shortIntro: 'Originating in the 14th century in Nirmal town, this craft produces delicately sculpted lightweight softwood toys and rich paintings finished with herbal lacquer and golden herbal dyes.',
          discover: {
            origin: 'Crafted in Nirmal town in northern Telangana since the Kakatiya and Nizam eras.',
            highlights: [
              'Sculpted from indigenous "Poniki" softwood (Wrightia tinctoria), prized for its feather-light weight',
              'Coated with "Lappam" herbal putty for silk-like smooth canvas surfaces',
              'Rich gold floral borders and Mughal-influenced court portraits',
              'GI-tagged craft embodying 400 years of Deccan artistic synthesis'
            ],
            culturalContext: 'Nirmal art bridges courtly refinement and pastoral folk realism, famous for its lifelike depictions of Indian fruits, birds, and Kangra-style miniatures.'
          },
          learn: {
            history: 'In the 17th century, the local chieftain Nimma Naidu patronized a guild of woodcarvers known as the "Naqqash". Later, the Nizams of Hyderabad were so enamored by their craftsmanship during a royal visit that they patronized the craft extensively, commissioning grand furniture and miniature paintings decorated with natural herbal gold.',
            significance: 'The craft is renowned for its organic durability and non-toxic herbal colors, celebrating Deccan biodiversity and classical Indian aesthetics.',
            traditions: [
              'Harvesting mature Poniki softwood, seasoned for months to prevent insect damage.',
              'Precision wood carving using specialized gouges and chisels into birds, fruit platters, and animals.',
              'Applying Lappam (tamarind seed powder, sawdust, and clay) to seal grain lines.',
              'Painting with natural decoctions and applying natural lac varnish for the famous glossy sheen.'
            ],
            howPracticed: 'The Nirmal Toy and Arts Industrial Cooperative Society continues to support artisan families who craft both the classic lifelike fruit baskets and intricate gold-leaf wall panels.',
            interestingFacts: [
              'The dazzling golden hue in antique Nirmal paintings was traditionally extracted from a wild herbal herb juice that turns golden upon oxidation.',
              'Poniki wood is so light that an entire intricate fruit basket weighs less than a single apple.',
              'Lady Hydari in the 1950s helped revive Nirmal art globally by promoting it among international dignitaries.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of a childhood Nirmal toy, a wedding gift fruit basket, or visiting Nirmal town in northern Telangana.',
            memoryIdeas: [
              'The beloved wooden parrot or fruit basket displayed in your childhood living room',
              'Meeting a Naqqash artisan carving Poniki wood in their courtyard',
              'The vibrant herbal scent of a freshly lacquered Nirmal wall plate'
            ]
          }
        },
        {
          id: 'pembarthi-metal-craft',
          name: 'Pembarthi Metal Craft',
          category: 'Arts & Crafts',
          tagline: 'Exquisite Sheet Metal Repoussé and Brass Artistry',
          shortIntro: 'Pembarthi in Jangaon district is world-renowned for its intricate sheet metal repoussé work in brass and bronze, adorning temple vahanas, royal throne backdrops, and sacred vessels.',
          discover: {
            origin: 'Emerged during the 12th-century Kakatiya dynasty in Pembarthi village.',
            highlights: [
              'Sheet metal repoussé and chasing technique creating embossed three-dimensional reliefs',
              'Historically embellished Kakatiya temple doorways, kalashams, and chariot panels',
              'Transitioned during the Nizams into royal betel boxes (paandans), huqqa bases, and chandeliers',
              'GI-certified heritage craft practiced by hereditary Vishwakarma metalworkers'
            ],
            culturalContext: 'Pembarthi craftsmanship symbolizes the metallurgical mastery of ancient Telangana, blending sacred Saivite temple iconography with refined Deccan Islamic filigree.'
          },
          learn: {
            history: 'During the Kakatiya golden age, Pembarthi artisans crafted the metal revetments for temples across Warangal and Palampet. With the decline of the dynasty, artisans adapted their skills under the Asaf Jahi rulers to produce royal utility vessels, betel leaf boxes, and decorative screens without losing their sacred sheet-metal techniques.',
            significance: 'The craft requires tremendous mathematical precision, metallurgical temperance, and artistic stamina to hand-chisel micro-details into malleable brass sheets.',
            traditions: [
              'Fixing brass sheets onto a bed of melted tree pitch (lac and brick dust) that provides flexible support during hammering.',
              'Sketching complex geometrical and mythological outlines freehand with a scriber.',
              'Using dozens of specialized chisels (tonkas) and light wooden mallets to emboss figures from the reverse side.',
              'Buffing and acid-washing with tamarind water to achieve the gleaming antique golden sheen.'
            ],
            howPracticed: 'Artisan families in Pembarthi village continue to handcraft temple shields (kavachas), ornamental lamps, door plaques, and contemporary cultural wall sculptures.',
            interestingFacts: [
              'The brass sheets are heated repeatedly to anneal them, preventing fractures while the artisan hammers from both sides.',
              'The tree-resin pitch bed used under the sheet melts easily when heated and can be reused infinitely.',
              'Pembarthi metal shields adorn the sacred sanctums of famous temples including Yadagirigutta and Tirupati.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about a brass Pembarthi lamp in your home temple, a wedding paandan, or your visit to a brass workshop.',
            memoryIdeas: [
              'The rhythmic metallic tap-tap sound of chisels echoing through Pembarthi streets',
              'A family heirloom brass kalasham or wall plaque passed down through generations',
              'The joy of polishing sacred brass vessels before Diwali or Ugadi'
            ]
          }
        }
      ],
      dance: [
        {
          id: 'perini-sivatandavam',
          name: 'Perini Sivatandavam',
          category: 'Dance & Music',
          tagline: 'The Kakatiya Warrior Dance of Lord Shiva',
          shortIntro: 'Perini Sivatandavam is an ancient martial dance form of Telangana that originated during the Kakatiya dynasty, performed by male warriors before entering the battlefield to invoke divine energy.',
          discover: {
            origin: '12th-century Kakatiya era; immortalized in the stone sculptures of Ramappa Temple.',
            highlights: [
              'Fast-paced vigorous footwork set to resonant mridangam, conch shells, and bells',
              'Performed historically to eradicate fear of death among soldiers before battle',
              'Revived in the 20th century by legendary dance scholar Dr. Nataraja Ramakrishna',
              'Telangana’s quintessential classical warrior dance legacy'
            ],
            culturalContext: 'Perini evokes the virile, cosmic energy of Nataraja (Tandavam), connecting spiritual surrender with heroic valor.'
          },
          learn: {
            history: 'Documented extensively in the 13th-century Sanskrit treatise "Nrtta Ratnavali" by Kakatiya army commander Jayapa Senani. The dance flourished under King Ganapati Deva and Queen Rudrama Devi. After the fall of the Kakatiyas, the dance faded until Dr. Nataraja Ramakrishna painstakingly reconstructed it in the 1970s by decoding the bracket dance sculptures (Madanikas) of Ramappa Temple.',
            significance: 'Perini is both a sadhana (spiritual discipline) and an energetic psychophysical preparation for battle, invoking the five primal elements (Pancha Bhootas).',
            traditions: [
              'Performers traditionally don anklet bells weighing up to two kilograms on each leg.',
              'Rhythmic chanting of "Gharjana" syllables alongside vigorous jumps and dynamic pirouettes.',
              'Begins with the invocation of Lord Shiva and Lord Ganesha before escalating into frenzied rhythmic footwork.',
              'Pure Nritta (abstract technical dance) without romantic or dramatic facial expressions.'
            ],
            howPracticed: 'Taught in classical academies across Warangal and Hyderabad; performed widely during Shivaratri at Thousand Pillar Temple and Kakatiya Heritage Festivals.',
            interestingFacts: [
              'Perini dancers train their breath control to execute lightning-fast foot cycles while maintaining continuous rhythmic cries.',
              'Every basic pose of Perini can still be matched directly with the 800-year-old black basalt dance sculptures at Ramappa Temple.',
              'A slower, lyrical counterpart called "Perini Lasyam" was also reconstructed for female dancers.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of watching a live Perini performance, seeing the Ramappa stone dancers, or learning this martial dance.',
            memoryIdeas: [
              'The goosebumps felt when the conch shell and battle drums opened a Perini recital',
              'Standing before the sculpted dancing figures of Ramappa Temple',
              'A conversation with a performer about the intense physical stamina required'
            ]
          }
        },
        {
          id: 'oggu-katha',
          name: 'Oggu Katha',
          category: 'Dance & Music',
          tagline: 'Vibrant Musical Storytelling of Pastoral Folk Deities',
          shortIntro: 'Oggu Katha is a traditional folk theatre and ballad singing tradition of the Kuruma and Golla shepherd communities of Telangana, dedicated to the worship of Lord Mallanna (Beerappa).',
          discover: {
            origin: 'Ancient pastoral oral tradition of northern and central Telangana.',
            highlights: [
              'Anchored by the "Oggu"—a small brass or bronze hourglass drum (damaruka)',
              'Dramatizes the heroic mythological exploits of Lord Mallanna and Goddess Medhalamma',
              'Ensemble consists of the lead narrator, comic commentator, and percussionists',
              'Performed overnight in rural temple courtyards with fire tricks and acrobatics'
            ],
            culturalContext: 'Oggu Katha preserves the sacred lore, humor, and social wisdom of pastoral communities, serving as an oral encyclopedia of rural Telangana life.'
          },
          learn: {
            history: 'Named after the Oggu damaruka, this art was traditionally performed by hereditary priests of Lord Shiva known as Oggus. Legendary artists like Chukka Sattaiah brought Oggu Katha to national and international prominence, preserving thousands of poetic verses memorized entirely through oral transmission.',
            significance: 'It bridges community worship, moral education, and high-energy rural entertainment through powerful Telangana dialect dialogues and comic interludes.',
            traditions: [
              'The lead narrator wears large silver anklets, a red turban, and a colorful angavastram.',
              'Playing the resonant "Jaggu" brass cymbals and "Talam" alongside the rapid beat of the Oggu drum.',
              'Storyteller seamlessly shifts between singing poetic couplets, dramatic monologues, and humorous banter with the chorus.',
              'Includes rituals like walking on live embers and carrying brass pots filled with burning camphor.'
            ],
            howPracticed: 'Performed during annual Mallanna Jatharas across Komuravelli, Ainavilli, and Vemulawada, drawing thousands of devotees to night-long performances.',
            interestingFacts: [
              'Chukka Sattaiah, the doyen of Oggu Katha, performed in over ten countries and received the Sangeet Natak Akademi Award.',
              'The entire performance of the Mallanna story spans three full consecutive nights without a written script.',
              'The narrator often performs acrobatic somersaults while maintaining uninterrupted vocal rhythms.'
            ]
          },
          preserve: {
            promptText: 'Preserve an oral memory of attending an all-night Oggu Katha at a village fair, the sound of the Oggu drum, or village deities.',
            memoryIdeas: [
              'The crackle of village campfires as the Oggu narrator began the midnight tale',
              'Laughter at the comic narrator’s witty Telangana idioms',
              'The reverence of the Komuravelli Mallanna pilgrimage with your grandparents'
            ]
          }
        },
        {
          id: 'kommu-koya-dance',
          name: 'Kommu Koya Dance',
          category: 'Dance & Music',
          tagline: 'Bison-Horn Rhythm Dance of the Godavari Hill Tribes',
          shortIntro: 'Kommu Koya is a high-energy indigenous rhythm dance of the Koya tribal communities residing in the Bhadradri Kothagudem and Godavari valley forests, featuring magnificent bison-horn headdresses.',
          discover: {
            origin: 'Native tribal dance of the Koya community along the Godavari river basin.',
            highlights: [
              'Male dancers wear ornate headgear made of wild bison horns and cowrie shells',
              'Long cylindrical wooden drums (Dolu) beaten in pulsating syncopated rhythms',
              'Women link arms in serpentine chains behind the drummers, matching complex foot steps',
              'Performed during harvest celebrations, weddings, and forest deity invocations'
            ],
            culturalContext: 'Kommu Koya reflects the tribal ethos of deep harmony with forest ecology, animal spirits, and communal solidarity.'
          },
          learn: {
            history: 'The Koya tribe considers the wild bison (Indian Gaur) a symbol of untamed strength, perseverance, and ancestral grace. In ancient times, horns naturally shed or preserved from hunts were woven into sacred headpieces. The dance served to celebrate successful harvests and invoke the blessings of forest spirits for clan well-being.',
            significance: 'The dance has no spectators; every member of the village joins the rotating dance circle, underscoring absolute egalitarianism in tribal life.',
            traditions: [
              'Artisans meticulously craft the "Kommu" headdress using natural horns, peacock feathers, and hand-strung cowrie shells.',
              'Men strap the heavy Dolu drums across their shoulders, leaning forward in a warrior crouch.',
              'Women form concentric rings called "Kelikoori", moving in wave-like ripples with subtle heel-and-toe footwork.',
              'The dance tempo accelerates progressively over hours, concluding with jubilant community calls.'
            ],
            howPracticed: 'Actively performed across tribal hamlets in Bhadrachalam, Eturunagaram, and Mulugu during festive seasons and at the Medaram Jathara.',
            interestingFacts: [
              'Modern Koya headgear uses ethically sourced or handcrafted wooden replicas of bison horns to protect wildlife.',
              'The drumming patterns mimic the calls of forest creatures—from the running deer to thunder before the monsoon.',
              'During the dance, performers drink fresh Mahua flower brew to sustain energy through the night.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about witnessing the Kommu Koya dance near the Godavari river, hearing tribal drums, or visiting Bhadrachalam.',
            memoryIdeas: [
              'The sight of peacock feathers and curved horns swaying rhythmically against the bonfire',
              'The deep resonant thrum of the long Dolu drum vibrating through the earth',
              'A lesson in community and harmony learned from the Koya people'
            ]
          }
        }
      ],
      cuisine: [
        {
          id: 'hyderabadi-biryani',
          name: 'Hyderabadi Dum Biryani',
          category: 'Cuisine',
          tagline: 'The World-Renowned Royal Jewel of Deccan Gastronomy',
          shortIntro: 'Hyderabadi Biryani is a world-celebrated masterpiece of culinary heritage blending Nizami royal court techniques with fiery Telangana spices, slow-cooked in a sealed handi using the "Dum" method.',
          discover: {
            origin: 'Perfected in the royal kitchens of the Asaf Jahi Nizams of Hyderabad during the 18th century.',
            highlights: [
              'The "Kachchi Akhni" technique where marinated raw meat and semi-cooked basmati rice are cooked together',
              'Sealed with dough and slow-cooked over smoldering coals (Dum Pukht)',
              'Infused with royal spices: shahi jeera, potli masala, rose water, and pure Kashmiri saffron',
              'Served traditionally with Mirchi ka Salan and tangy Dahi ki Chutney'
            ],
            culturalContext: 'Hyderabadi Biryani is the ultimate culinary symbol of Hyderabad’s cosmopolitan Ganga-Jamuni Tehzeeb, uniting royal refinement with regional Deccan zest.'
          },
          learn: {
            history: 'While biryani arrived with Mughal armies, Hyderabad’s master chefs (Khansamas) transformed it uniquely. They married the subtle Persian aromatic layering with bold local spices like green chillies, coriander, mint, and sour curd, inventing the demanding "Kachchi" method where meat is not precooked.',
            significance: 'Cooking biryani is an artisanal craft requiring intuition for steam pressure, spice balance, and grain tenderness.',
            traditions: [
              'Marinating tender meat overnight in hung curd, raw papaya paste, ginger-garlic, fried onions (birista), and ground spices.',
              'Parboiling aged long-grain Basmati rice to exactly 70% tenderness with whole aromatic spices.',
              'Layering rice over meat in a heavy copper handi (Deg), drizzling pure ghee, saffron milk, and fried onions.',
              'Sealing the rim with wheat flour dough and slow-cooking over glowing charcoal embers.'
            ],
            howPracticed: 'An indispensable centerpiece of Hyderabadi weddings, Eid festivities, Sunday family reunions, and historic Irani cafes across the Old City.',
            interestingFacts: [
              'Legend holds that the royal chefs of the First Nizam created nearly 50 varieties of biryani, including versions with quail, venison, and fish.',
              'The Nizams employed specialized "Deg-chi" cooks who could judge the exact readiness of the meat merely by listening to the sizzle inside the sealed pot.',
              'Hyderabadi Biryani was awarded UNESCO Creative City of Gastronomy recognition in 2019.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of your family’s biryani secret, a memorable wedding feast in Hyderabad, or making dum biryani with loved ones.',
            memoryIdeas: [
              'The magical moment of breaking the dough seal and inhaling that first cloud of saffron steam',
              'A secret family ingredient passed down from your grandmother',
              'Visiting iconic eateries near Charminar or Paradise with friends'
            ]
          }
        },
        {
          id: 'sarva-pindi',
          name: 'Sarva Pindi',
          category: 'Cuisine',
          tagline: 'Crispy, Savory Rice-Flour Flatbread with Peanuts and Chana Dal',
          shortIntro: 'Sarva Pindi is a quintessential rustic delicacy of rural Telangana—a crispy, savory pancake made of rice flour kneaded with roasted peanuts, chana dal, sesame seeds, curry leaves, and green chillies.',
          discover: {
            origin: 'Ancestral rustic breakfast and evening snack of agrarian Telangana villages.',
            highlights: [
              'Cooked in a traditional circular brass pan called a "Sarva"',
              'Pressed paper-thin by hand with characteristic holes pierced to ensure even crispness',
              'Packed with protein-rich lentils, roasted peanuts, and fragrant sesame seeds',
              'Traditionally prepared on wood-fire stoves for a distinct smoky aroma'
            ],
            culturalContext: 'Sarva Pindi embodies the honest culinary genius of Telangana farm households, utilizing simple pantry staples to create an intensely flavorful, nutritious snack.'
          },
          learn: {
            history: 'The name combines "Sarva" (a deep circular vessel) and "Pindi" (flour). In rural Telangana, farmers returning from long hours in paddy and cotton fields needed a hearty, long-lasting snack. Women developed Sarva Pindi by pressing seasoned rice dough directly onto cool brass pans and slow-roasting them over charcoal.',
            significance: 'It is a celebration of Telangana’s primary agrarian produce: new harvest rice, sesame seeds (til), and field-fresh curry leaves.',
            traditions: [
              'Soaking chana dal and roasting peanuts until fragrant and crunchy.',
              'Kneading soft rice flour with chopped onions, green chillies, ginger, cumin, sesame, and fresh coriander.',
              'Greasing a heavy brass or cast-iron pan with peanut oil.',
              'Pressing the dough thinly across the entire base with fingertips, punching 5 to 7 small holes.',
              'Pouring drops of oil into each hole, covering with a lid, and slow-crisping until golden brown.'
            ],
            howPracticed: 'Enjoyed across Telangana households for breakfast or evening tea, often accompanied by fresh butter, ginger pickle, or spicy tomato chutney.',
            interestingFacts: [
              'In northern Telangana districts like Karimnagar and Warangal, it is also known affectionately as "Ginna Pappa".',
              'The distinct holes poked into the dough are an ingenious thermodynamic design to circulate hot oil and steam evenly.',
              'Traditional families maintain dedicated seasoned iron pans that are never washed with soap, preserving decades of flavor memory.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about your mother or grandmother making Sarva Pindi, the sizzle in the pan, or rainy evening teatimes.',
            memoryIdeas: [
              'Watching fingertips swiftly press dough into the heavy round pan',
              'Fighting with siblings for the extra-crispy browned bottom crust',
              'Enjoying hot Sarva Pindi on a rainy afternoon with steaming spiced tea'
            ]
          }
        },
        {
          id: 'sakinalu',
          name: 'Sakinalu',
          category: 'Cuisine',
          tagline: 'Concentric Festive Sesame and Rice-Flour Spirals',
          shortIntro: 'Sakinalu is an iconic traditional crispy snack of Telangana prepared exclusively during the Makara Sankranti festival, made by expertly piping concentric circles of sesame and rice dough by hand on white cotton cloth.',
          discover: {
            origin: 'Centuries-old festival culinary tradition unique to Telangana region.',
            highlights: [
              'Hand-piped into delicate concentric circular spirals without any mechanical press or mould',
              'Made with newly harvested wet rice flour, sesame seeds, and carom seeds (ajwain)',
              'Exclusively deep-fried in peanut or sesame oil until pale golden and ultra-crisp',
              'A mandatory auspicious gift offered by brides to their in-laws during Sankranti'
            ],
            culturalContext: 'Making Sakinalu is a collaborative community ritual where all the women of a neighborhood gather to roll spirals, singing and sharing festive cheer.'
          },
          learn: {
            history: 'Sakinalu has been mentioned in medieval Telugu poetry dating back to the Kakatiya period. Its name is believed to stem from "Chakkinalu" (meaning concentric circular shapes). Symbolizing the sun’s northward journey during Uttarayan, the circular spirals mirror solar energy and life cycles.',
            significance: 'Sesame and ajwain are warming winter foods essential for health during the chilly Sankranti season, while newly harvested rice celebrates agricultural prosperity.',
            traditions: [
              'Pounding freshly harvested wet rice in wooden pestles into fine, silky flour.',
              'Mixing with generous quantities of white sesame seeds, ajwain (vaamu), and salt.',
              'Spreading large clean white cotton dhoti cloths across the courtyard floor.',
              'Women sitting together, taking small portions of wet dough between thumb and fingers, and swiftly rolling concentric rings directly onto the fabric.',
              'Letting spirals dry for an hour before gently lifting and deep frying in batches.'
            ],
            howPracticed: 'Prepared in every Telangana home in the days preceding Sankranti, stored in large airtight brass tins, and gifted to visiting relatives and daughters.',
            interestingFacts: [
              'Experienced rural women can hand-pipe a 5-ring perfect circular spiral in under three seconds flat.',
              'Because Sakinalu contains no spices like chilli powder or garlic, it retains a pure, nutty sesame flavor that stays fresh for months.',
              'In Telangana wedding rituals, a basket of "Patti Sakinalu" is an essential auspicious custom called "Sare".'
            ]
          },
          preserve: {
            promptText: 'Preserve a memory of making Sakinalu with your elders, sitting around the white cloth, or stealing warm spirals from the kitchen.',
            memoryIdeas: [
              'Trying and failing as a child to roll perfect concentric rings without breaking them',
              'The nutty aroma of hot sesame seeds sizzling in the festive frying kadai',
              'Packing tins of Sakinalu to take back to hostel or abroad after festival holidays'
            ]
          }
        }
      ],
      'heritage-places': [
        {
          id: 'ramappa-temple',
          name: 'Ramappa Temple (Rudreshwara)',
          category: 'Heritage Places',
          tagline: 'UNESCO World Heritage Site of Floating Bricks and Sculpted Grace',
          shortIntro: 'Ramappa Temple, built in 1213 CE under the Kakatiya Empire in Palampet, is a marvel of medieval engineering famous for its lightweight floating bricks, sandbox foundation, and breathtaking black basalt dance sculptures.',
          discover: {
            origin: 'Commissioned in 1213 CE by Kakatiya General Recharla Rudra during the reign of King Ganapati Deva.',
            highlights: [
              'Inscribed as a UNESCO World Heritage Site in 2021',
              'The only temple in India named after its chief architect and sculptor, Ramappa',
              'Superstructure constructed with porous "floating bricks" that float on water to reduce weight',
              'Earthquake-resistant design utilizing revolutionary 13th-century sandbox technology'
            ],
            culturalContext: 'Ramappa Temple stands as the pinnacle of Kakatiya temple architecture, celebrated by Venetian traveler Marco Polo as the "brightest star in the galaxy of medieval temples".'
          },
          learn: {
            history: 'Construction spanned over 40 years under the visionary artisan Ramappa. When the Kakatiya kingdom was targeted by invasions and severe earthquakes that flattened surrounding monuments, Ramappa Temple remained structurally intact because its sandbox foundation absorbed seismic shocks.',
            significance: 'The temple is dedicated to Rudreshwara (Lord Shiva) and showcases masterly synthesis between spiritual sanctity, engineering innovation, and classical dance documentation.',
            traditions: [
              'The sanctum houses a massive Shivalinga resting on a starry six-foot platform.',
              'Twelve life-sized black basalt bracket figures (Madanikas) depicting celestial dancers, archers, and drummers with incredible fluid anatomical detail.',
              'Monolithic Nandi bull statue positioned at the entrance, carved so that its eyes appear to follow the devotee from any angle.',
              'Pillars carved with micro-sculptures so delicate that a fine thread can be passed through the jewelry of the sculpted figures.'
            ],
            howPracticed: 'Pilgrims and art connoisseurs visit year-round; the temple hosts major classical dance recitals during Maha Shivaratri and the annual Kakatiya Festival.',
            interestingFacts: [
              'Modern scientists analyzing the bricks found they have a density of only 0.8 to 0.9 g/cm³, meaning they are lighter than water and genuinely float.',
              'The sandbox foundation consists of a pit filled with a mixture of river sand, jaggery, karakkaya (myrobalan), and lime that dissipates earthquake vibrations.',
              'The exquisite postures of the temple dancers served as the visual blueprint for reviving Perini Sivatandavam in the 20th century.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of visiting Ramappa Temple, touching the floating bricks, or admiring the polished bracket dancers.',
            memoryIdeas: [
              'The feeling of awe standing beneath the 800-year-old carved ceiling',
              'Looking into the eyes of the monolithic Nandi bull from different directions',
              'The tranquil reflection of the temple in the adjacent ancient Ramappa lake'
            ]
          }
        },
        {
          id: 'golconda-fort',
          name: 'Golconda Fort',
          category: 'Heritage Places',
          tagline: 'Acoustic Architectural Marvel and Legendary Diamond Bastion',
          shortIntro: 'Golconda Fort is an awe-inspiring fortified citadel on the outskirts of Hyderabad, celebrated worldwide for its ingenious acoustic engineering, royal palaces, and historic status as the trade capital of the world’s most legendary diamonds.',
          discover: {
            origin: 'Originally a mud fort under Kakatiyas (1143 CE); massively expanded by the Qutb Shahi dynasty (1518–1687 CE).',
            highlights: [
              'World-famous acoustic marvel: A single handclap at Fateh Darwaza can be heard clearly a kilometer away at the Bala Hissar hilltop pavilion',
              'Historic center of the Golconda diamond mines, source of the Koh-i-Noor, Hope, and Daria-i-Noor diamonds',
              'Eight massive gateways, 87 semi-circular bastions, and double-walled granite defense systems',
              'Sophisticated medieval Persian clay-pipe water ventilation and air-cooling system'
            ],
            culturalContext: 'Golconda embodies the cosmopolitan military and architectural grandeur of the Deccan, witnessing the rise of Telugu literature, Deccani Urdu, and Indo-Persian courtly culture.'
          },
          learn: {
            history: 'According to legend, a shepherd boy discovered an idol on the rocky hillock, leading the Kakatiya king to build a mud fort ("Golla Konda" or Shepherd’s Hill). The Qutb Shahis turned it into an impregnable granite citadel. It famously resisted the Mughal emperor Aurangzeb’s siege for nine months in 1687 until betrayed from within.',
            significance: 'Beyond military fortifications, it was a flourishing cultural metropolis where poets, merchants, jewelers, and Sufi saints lived side by side.',
            traditions: [
              'Climbing the 380 stone steps past royal armories, mortuary baths, and royal courtyards to reach the Bala Hissar darbar hall.',
              'Testing the acoustic communication system across the outer gates.',
              'Visiting the Ramadasu Bandikhana, where the saint-composer Bhakta Ramadasu carved figures of Rama, Sita, and Hanuman on the cell walls during his imprisonment.',
              'Viewing the panoramic sunset across Hyderabad city from the highest bastion.'
            ],
            howPracticed: 'Open daily to travelers from around the world; features an evocative evening Sound & Light show narrating the dramatic chronicle of the Qutb Shahi kings.',
            interestingFacts: [
              'The acoustic system was not merely an echo trick, but a critical security alarm designed to warn royalty of surprise enemy infiltrations.',
              'The Koh-i-Noor diamond (105.6 carats) and the Hope Diamond both passed through Golconda’s historic gem vaults.',
              'A secret escape tunnel is rumored to run from the heart of Golconda Fort all the way to Charminar.'
            ]
          },
          preserve: {
            promptText: 'Preserve a personal memory of exploring Golconda Fort, clapping under the dome, or gazing out over Hyderabad at sunset.',
            memoryIdeas: [
              'Clapping at Fateh Darwaza while your family waited at the hilltop to listen',
              'Visiting the small stone cell where Bhakta Ramadasu composed his immortal kirtanas',
              'Walking through the moonlit ruins during the evening light and sound show'
            ]
          }
        },
        {
          id: 'warangal-fort-thousand-pillar',
          name: 'Warangal Fort & Thousand Pillar Temple',
          category: 'Heritage Places',
          tagline: 'Kakatiya Rock-Cut Mastery and the Iconic Keerthi Thoranas',
          shortIntro: 'Warangal Fort and the Thousand Pillar Temple in Hanamkonda showcase the zenith of Kakatiya stone masonry, featuring the majestic four-pillared ornamental arch (Kakatiya Thoranam) that serves as the official emblem of Telangana.',
          discover: {
            origin: 'Constructed under Kakatiya kings Rudradeva, Ganapati Deva, and Queen Rudrama Devi between 1163 and 1260 CE.',
            highlights: [
              'The magnificent Keerthi Thoranas—monolithic royal gateways carved with swans, creepers, and lotus medallions',
              'Thousand Pillar Temple (Rudreswara) featuring a star-shaped Trikuta shrine dedicated to Shiva, Vishnu, and Surya',
              'Intricately carved round pillars polished to a mirror-like sheen in black dolerite',
              'Concentrically fortified city with earthen, stone, and water moats'
            ],
            culturalContext: 'Warangal (Orugallu - "One Single Rock") was the epicentre of Telugu cultural sovereignty and heroic defense under Queen Rudrama Devi.'
          },
          learn: {
            history: 'King Rudradeva built the Thousand Pillar Temple in 1163 CE to commemorate his victories. The city was protected by three concentric rings of walls spanning several miles. Even after catastrophic bombardments during the Delhi Sultanate invasions in the 14th century, the colossal stone thoranas stood steadfast, enduring as eternal symbols of Telugu resilience.',
            significance: 'The ruins represent one of the most sophisticated examples of pre-modern military planning and stone iconography in peninsular India.',
            traditions: [
              'Worship at the active Shiva shrine within the Thousand Pillar Temple.',
              'Walking among the open-air archaeological park of Warangal Fort, surrounded by colossal relief sculptures.',
              'Studying the interlocking stone technology that allowed massive lintels to balance without mortar.',
              'Attending the annual Kakatiya Festival featuring classical performances before the illuminated Keerthi Thoranas.'
            ],
            howPracticed: 'A living pilgrimage and cultural center; local families gather on lawns around the ancient monuments, and weddings frequently use the Kakatiya arch motif as their stage backdrop.',
            interestingFacts: [
              'The four Keerthi Thoranas were so iconic and deeply revered that the Government of Telangana adopted the gateway as the state’s central emblem.',
              'None of the 1,000 pillars in the Hanamkonda temple obstruct the view of the sanctum from any point in the main hall.',
              'The monolithic Nandi at the Thousand Pillar Temple was carved out of a single black basalt rock and polished with herbal oils.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of visiting Warangal, standing beneath the great Kakatiya Thoranam, or exploring the Thousand Pillar Temple.',
            memoryIdeas: [
              'Seeing the iconic Telangana emblem in real life for the first time',
              'Touching the glass-smooth polished black pillars in Hanamkonda',
              'Stories told by your grandparents about the brave warrior queen Rudrama Devi'
            ]
          }
        }
      ]
    }
  },

  // ============================================================
  // 2. ANDHRA PRADESH
  // ============================================================
  'andhra-pradesh': {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    tagline: 'Land of Amaravati Buddhism, Classical Kuchipudi & Sacred Coastal Traditions',
    features: {
      festivals: [
        {
          id: 'makara-sankranti-ap',
          name: 'Makara Sankranti (Pedda Panduga)',
          category: 'Festivals & Traditions',
          tagline: 'Four Days of Harvest Prosperity, Bhogi Bonfires & Colorful Muggulu',
          shortIntro: 'Celebrated as "Pedda Panduga" (The Big Festival), Sankranti in Andhra Pradesh spans four vibrant days (Bhogi, Makara Sankranti, Kanuma, Mukkanuma) celebrating agricultural harvest, cattle, and ancestral blessings.',
          discover: {
            origin: 'Ancient Vedic and agrarian festival celebrating the Sun god’s transition into Makara rasi (Capricorn).',
            highlights: [
              'Dawn Bhogi bonfires where discarded household items are burnt to usher in new beginnings',
              'Courtyards adorned with gigantic geometric rice-flour Muggulu topped with cow-dung Gobbemmalu',
              'Haridasu singers balancing copper akshaya patras on their heads chanting hymns at daybreak',
              'Gangireddula melam—decorated sacred bulls dancing to traditional nadaswaram tunes'
            ],
            culturalContext: 'Sankranti is the emotional heartbeat of Andhra village culture, reuniting families across generations in their ancestral homes.'
          },
          learn: {
            history: 'Sankranti is documented across millennia of Telugu literature as the festival of the harvest god. The arrival of freshly threshed paddy, sugarcane, and sesame seeds into village granaries prompted days of unrestrained thanksgiving, charity, and culinary abundance.',
            significance: 'It honors the Pancha Bhootas (elements), the Sun (Surya), working cattle (Gomatha), and the generational continuum of farming families.',
            traditions: [
              'Bhogi: Pre-dawn bonfires, Bhogi pallu showering on children with jujube fruits, sugarcane, and coins for prosperity.',
              'Sankranti Day: Cooking Pongali with new rice and jaggery in brass pots until it boils over, symbolizing overflowing abundance.',
              'Kanuma: Honoring livestock and plough bulls with turmeric, flower garlands, and special treats.',
              'Welcoming the Haridasu, who sings songs of Lord Krishna without bending or requesting alms.'
            ],
            howPracticed: 'Towns empty out as millions travel to coastal and Rayalaseema villages. Courtyards become colorful open-air art galleries of rice-powder muggulu, while skies fill with kites.',
            interestingFacts: [
              'The Haridasu never speaks during his rounds; he only sings the name of Govinda while gracefully playing the Chipla cymbals.',
              'The Gobbemmalu (cow dung balls decorated with turmeric, vermilion, and marigolds) are dried after the festival to fuel stove fires.',
              'Ariselu (crispy-chewy rice and jaggery cakes deep-fried with sesame) are made in large quantities to gift to every visiting relative.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of returning to your Andhra ancestral village for Sankranti, drawing muggulu, or the morning Bhogi bonfire.',
            memoryIdeas: [
              'Waking up before dawn to gather wood for the crackling Bhogi bonfire',
              'Watching your grandmother draw intricate Chukkala Muggulu across the entire street',
              'The sound of the Haridasu’s tambura and the bell-clad Gangireddu bull at your doorstep'
            ]
          }
        },
        {
          id: 'ugadi-ap',
          name: 'Ugadi',
          category: 'Festivals & Traditions',
          tagline: 'Telugu New Year Celebrating the Six Tastes of Life',
          shortIntro: 'Ugadi marks the first day of the Chaitra month and the beginning of the Telugu New Year, symbolized by the tasting of "Ugadi Pachadi"—a dish blending six distinct flavors representing life’s varied emotions.',
          discover: {
            origin: 'Calculated according to the Luni-Solar calendar (Shalivahana Shaka) originating over two millennia ago.',
            highlights: [
              'Partaking of Ugadi Pachadi containing sweet, sour, bitter, tangy, salty, and spicy ingredients',
              'Decorating door lintels with fresh green mango leaves (Toranams) to usher in positive vitality',
              'Panchanga Sravanam: Gathering in the evening to hear astrologers read predictions for the year',
              'Kavi Sammelanam: Gathering of poets reciting new verse in celebration of literature'
            ],
            culturalContext: 'Ugadi reminds every individual that life is an inevitable tapestry of sorrow, joy, fear, surprise, and anger, each to be embraced with philosophical equanimity.'
          },
          learn: {
            history: 'According to legend, Lord Brahma commenced the creation of the cosmos on this auspicious day (Yuga-Aadi, the beginning of an era). It coincided historically with the crowning of King Shalivahana in the Deccan.',
            significance: 'The core philosophical teaching is encoded into the Shadruchulu (six tastes): Sweet (happiness), Bitter (sorrow), Sour (caution), Salty (fear), Tangy (surprise), and Spicy (anger).',
            traditions: [
              'Dawn oil bath (Abhyangana Snanam) followed by wearing new clothes (Kotha Battalu).',
              'Preparing Ugadi Pachadi with neem flowers (bitter), jaggery (sweet), raw mango (tangy), tamarind (sour), green chilli/pepper (spicy), and salt.',
              'Stringing fresh green mango leaves and marigolds across house entrances.',
              'Reading the Panchangam to understand weather forecasts for farming, rainfall, and planetary transits.'
            ],
            howPracticed: 'Observed across every home in Andhra Pradesh with festive vegetarian meals featuring Bobbatlu (Puran Poli) and Pulihora, followed by community temple gatherings.',
            interestingFacts: [
              'In classical Sanskrit drama and Telugu royal courts, poets who composed the finest Ugadi verse were honored with royal gold bracelets (Kankanam).',
              'Raw tender green mangoes appear on trees precisely around Ugadi, making it the seasonal harbinger of summer bounty.',
              'The Telugu calendar operates on a 60-year cyclical naming system (Samvatsara), each year carrying a distinct philosophical moniker.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of tasting Ugadi Pachadi, the anticipation of hearing your Rasi predictions, or making Bobbatlu at home.',
            memoryIdeas: [
              'Your grandmother handing you the first spoonful of bitter-sweet Ugadi Pachadi',
              'Stringing fresh, resinous mango leaves above your family front door',
              'Sitting in the temple courtyard during the evening Panchanga Sravanam'
            ]
          }
        },
        {
          id: 'tirupati-brahmotsavam',
          name: 'Tirupati Brahmotsavam',
          category: 'Festivals & Traditions',
          tagline: 'Grand Nine-Day Celestial Vahana Sevas of Lord Venkateswara',
          shortIntro: 'The Srivari Annual Brahmotsavam is the premier festival of the sacred Tirumala hill temple, where Lord Venkateswara is taken in grand royal processions upon nine magnificent celestial vehicles (vahanas).',
          discover: {
            origin: 'Tradition attributes its initiation to Lord Brahma himself on the Tirumala hills.',
            highlights: [
              'Nine days of grand morning and evening processions along the four Mada streets of Tirumala',
              'Garuda Seva: Over half a million pilgrims assemble under the full moon to witness the Lord on his golden eagle vehicle',
              'Processions on Sesha Vahana, Hanumantha Vahana, Rathotsavam (Chariot), and Chakra Snanam',
              'Adornment of the Lord with the legendary Makarakanti and historic Sahasranama gold garlands'
            ],
            culturalContext: 'Tirumala Brahmotsavam is the zenith of South Indian Vaishnava devotional culture, drawing millions from across the globe in ecstatic surrender.'
          },
          learn: {
            history: 'Inscriptional evidence at Tirumala shows that the Pallava queen Samavai consecrated bronze idols and funded festival celebrations as early as 966 CE. The Cholas, Pandyas, Vijayanagara emperor Sri Krishnadevaraya, and the Mysore royal family all contributed jeweled vahanas and gold endowments to expand these celebrations.',
            significance: 'Each vahana carries profound allegorical meaning—Sesha Vahana symbolizes service and vigilance, while Garuda Vahana represents knowledge and transcendental devotion.',
            traditions: [
              'Dwajarohanam: Hoisting the sacred Garuda flag on the golden mast to invite all the 33 crore celestial beings to the festival.',
              'Daily processions accompanied by Vedic chanting guilds, Panchavadyam orchestras, and classical dancers.',
              'Garuda Seva: The high point on the fifth evening, where Lord Malayappa Swami is draped in the sacred Andal garland brought from Srivilliputhur.',
              'Chakra Snanam: Final day ritual where the holy Sudarshana Chakra disc is given a sacred bath in the Swami Pushkarini lake.'
            ],
            howPracticed: 'Held during the Navratri season (September-October) atop the Seven Hills, transforming Tirumala into an ethereal city of lights, floral arches, and devotional chants of "Govinda! Govinda!".',
            interestingFacts: [
              'The flower garlands (Vana Malas) used during Garuda Seva travel hundreds of kilometers under continuous cooling from Andal’s temple in Srivilliputhur.',
              'Tirumala’s kitchen (Potu) prepares over 300,000 sacred GI-tagged Tirupati Laddoos daily during the Brahmotsavam week.',
              'Emperor Sri Krishnadevaraya visited Tirumala seven times, showering the Lord with golden coins and diamond crowns during festivals.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of your pilgrimage to Tirupati during Brahmotsavam, witnessing the Garuda Seva, or climbing the Seven Hills on foot.',
            memoryIdeas: [
              'The ocean of devotees chanting "Govinda" as the golden Garuda Vahana emerged into view',
              'Climbing the Alipiri or Srivari Mettu stone steps on barefoot with your family',
              'Sharing the warm, aromatic Tirupati Laddoo prasad with your loved ones'
            ]
          }
        }
      ],
      arts: [
        {
          id: 'kalamkari-art',
          name: 'Kalamkari Art',
          category: 'Arts & Crafts',
          tagline: 'Natural Vegetable-Dyed Mythological Paintings on Cotton',
          shortIntro: 'Kalamkari is an ancient Indian textile art form originating in Srikalahasti and Machilipatnam, created using a bamboo pen (Kalam) and 100% natural organic dyes derived from plants, roots, and minerals.',
          discover: {
            origin: 'Flourished since the Vijayanagara era; Srikalahasti (freehand mythological) and Machilipatnam (block-printed).',
            highlights: [
              'Drawn entirely with a sharpened bamboo reed pen fitted with a wool reservoir',
              '23-stage laborious natural processing involving cow milk, buffalo dung, myrobalan, and alum',
              'Colors created from madder root (red), indigo leaves (blue), pomegranate peel (yellow), and iron jaggery rust (black)',
              'Depicts grand narrative epics: Ramayana, Mahabharata, tree of life, and celestial temple hangings'
            ],
            culturalContext: 'Srikalahasti Kalamkari served as visual scripture in temple sanctums, telling stories to devotees through vivid organic tapestries.'
          },
          learn: {
            history: 'Kalamkari ("Kalam" - pen, "Kari" - craftsmanship) was patronized by temple priests and Vijayanagara emperors to drape temple walls. Later, European traders in the 17th century fell in love with Machilipatnam Kalamkari chintz, sparking a worldwide trade that transformed global fashion history.',
            significance: 'It is one of the most environmentally sustainable textile crafts on earth, using zero synthetic chemicals and relying on running river water for dye fixing.',
            traditions: [
              'Bleaching raw cotton cloth in cow dung solution and river currents, followed by soaking in buffalo milk to prevent dye bleeding.',
              'Sketching freehand mythological figures using burnt tamarind charcoal twigs.',
              'Outlining with "Kasim" (fermented jaggery, scrap iron, and palm wine water).',
              'Filling red with alum mordant boiled in madder root water; painting yellow using dried pomegranate rinds.',
              'Washing repeatedly in the Swarnamukhi river whose mineral composition gives the dyes their permanent vibrancy.'
            ],
            howPracticed: 'Practiced by generational guilds in Srikalahasti near Tirupati and Pedana near Machilipatnam, producing saris, dupattas, wall hangings, and contemporary home decor.',
            interestingFacts: [
              'Milk from water buffaloes is an essential ingredient; its natural fat content prevents the vegetable dye from feathering on cotton threads.',
              'Authentic Srikalahasti Kalamkari requires over 20 days to complete a single narrative panel.',
              'Both Srikalahasti and Machilipatnam hold distinct Geographical Indication (GI) tags acknowledging their unique techniques.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of a cherished Kalamkari saree, visiting the workshops in Srikalahasti, or learning the bamboo pen technique.',
            memoryIdeas: [
              'The earthy, herbal aroma of a genuine vegetable-dyed Kalamkari dupatta',
              'Watching an artisan in Srikalahasti draw delicate eyes of Goddess Saraswati with a bamboo pen',
              'The story of an heirloom Kalamkari wall tapestry hanging in your family home'
            ]
          }
        },
        {
          id: 'kondapalli-toys',
          name: 'Kondapalli Toys',
          category: 'Arts & Crafts',
          tagline: 'Handcrafted Softwood Figures Depicting Rural and Mythological Lore',
          shortIntro: 'Crafted in Kondapalli village near Vijayawada, these charming 400-year-old wooden toys are carved from lightweight "Tella Poniki" wood, famous for depicting rural village occupations, dancers, and the Dashavatara.',
          discover: {
            origin: 'Crafted in Kondapalli, NTR district; traced back to migrant artisans from Rajasthan during the 16th century.',
            highlights: [
              'Hand-carved from Tella Poniki softwood found in the Kondapalli forest reserve',
              'Joined using "Makku"—a strong paste of tamarind seed powder and sawdust',
              'Painted traditionally with natural vegetable dyes and oil colors',
              'Iconic creations include the "Aata Bomma" (dancing doll), village farmers, and wedding palanquins'
            ],
            culturalContext: 'Kondapalli toys are an indispensable part of the "Bommala Koluvu" (doll arrangement) displayed in South Indian homes during Navratri and Sankranti.'
          },
          learn: {
            history: 'The artisans belong to the Arya Kshatriya community who claim descent from Muktharishi, a sage blessed by Lord Shiva with skill in arts and crafts. Patronized by the Reddy kings and Vijayanagara rulers, these artisans settled in Kondapalli village beneath the historic Kondapalli Fort.',
            significance: 'The toys celebrate the simple dignity of Indian agrarian life—potters, milkmaids, weavers, and farmers—alongside revered mythological deities.',
            traditions: [
              'Harvesting Tella Poniki wood, renowned for its soft texture that allows smooth carving without splitting.',
              'Individual limbs and components carved separately and glued using Makku paste.',
              'Smooth sanding followed by coating with lime paste primer.',
              'Intricate brushwork using fine squirrel hair brushes to paint lively expressions.'
            ],
            howPracticed: 'Sustained by artisan cooperatives in "Kondapalli Bommala Colony", creating heirloom sets for festive collectors, gift mementos, and export.',
            interestingFacts: [
              'The Kondapalli dancing doll has a weighted rounded base that always bobs back upright whenever pushed, symbolizing human resilience.',
              'The wood used has natural thermal insulation properties and does not attract woodboring insects.',
              'Every Andhra wedding traditionally gifted a Kondapalli bride-groom set to the newlywed couple as an auspicious blessing.'
            ]
          },
          preserve: {
            promptText: 'Preserve a memory of your childhood Kondapalli toys, arranging the Bommala Koluvu during Navratri, or visiting Kondapalli village.',
            memoryIdeas: [
              'Unwrapping fragile wooden Kondapalli dolls from old newspapers every Dasara',
              'The fascination of watching the bobblehead dancing doll sway continuously on the shelf',
              'Visiting the artisan street in Kondapalli beneath the historic hill fort'
            ]
          }
        },
        {
          id: 'etikoppaka-lacquer-toys',
          name: 'Etikoppaka Lacquer Toys',
          category: 'Arts & Crafts',
          tagline: 'Eco-Friendly Organic Lacquer Turned-Wood Heritage Toys',
          shortIntro: 'Hailing from Etikoppaka village on the banks of the Varaha river in Anakapalli district, these smooth, rounded wooden toys are turned on hand lathes and colored with non-toxic lacquer derived from wild seeds and natural bark.',
          discover: {
            origin: 'Practiced for over two centuries along the Varaha River in Visakhapatnam region.',
            highlights: [
              'Turned on wood lathes from soft "Ankudu" wood (Wrightia tinctoria)',
              'Finished exclusively with non-toxic natural lacquer colored with seeds, bark, and roots',
              'Polished to a lustrous glossy sheen using dry mogali (screw pine) leaves',
              '100% safe, chemical-free children’s toys with rounded child-safe contours'
            ],
            culturalContext: 'Etikoppaka toys represent an extraordinary green revolution in traditional craft, returning to 100% natural forest-based dyes.'
          },
          learn: {
            history: 'Historically known as "Laccapu Bommalu", artisans produced household containers, vermilion boxes, and toys. In the late 20th century, master artisan C.V. Raju spearheaded a historic revival by abandoning synthetic dyes and researching ancient recipes for natural tree-based lacquer dyes.',
            significance: 'Etikoppaka is celebrated worldwide as a pioneering model of eco-friendly, sustainable craftsmanship safe for infants and the environment.',
            traditions: [
              'Turning seasoned Ankudu wood on an electric or pedal-powered lathe using specialized gouges.',
              'Melting natural button lac (secreted by kerria lacca insects) with natural dyes: turmeric for yellow, ratanjyot for red, and indigo for blue.',
              'Applying the colored lacquer stick directly onto the spinning wooden piece; frictional heat melts the lacquer onto the wood.',
              'Buffing the spinning piece with a dried screw-pine leaf to generate a mirror-like organic glaze.'
            ],
            howPracticed: 'Generational woodturners in Etikoppaka craft baby rattles, spinning tops (bambaralu), jewelry boxes, and decorative candle holders.',
            interestingFacts: [
              'Because only non-toxic vegetable dyes are used, Etikoppaka rattles are completely safe for teething babies who put toys in their mouths.',
              'The craft received the Geographical Indication (GI) tag in 2017 for its unique use of natural resin lacquers.',
              'No sandpaper or chemical varnishes are ever used; the entire polish is achieved purely by the friction of screw-pine leaves.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about an Etikoppaka wooden spinning top, a traditional kumkum bharani, or introducing wooden toys to your children.',
            memoryIdeas: [
              'The smooth, cool wooden feel of an Etikoppaka rattle given to a newborn in the family',
              'Spinning an amber and emerald wooden top on the courtyard floor',
              'The pride of supporting organic, sustainable village artisans'
            ]
          }
        }
      ],
      dance: [
        {
          id: 'kuchipudi',
          name: 'Kuchipudi',
          category: 'Dance & Music',
          tagline: 'Classical Dance-Drama of Andhra Born from Sacred Village Traditions',
          shortIntro: 'Kuchipudi is one of the eight major classical dance forms of India, originating in the village of Kuchipudi in Krishna district, distinguished by its vibrant theatrical storytelling, sparkling eye movements, and rhythmic brass-plate footwork (Tarangam).',
          discover: {
            origin: 'Originated in Kuchipudi village, Krishna district; codified by the saint Siddhendra Yogi in the 14th-15th century.',
            highlights: [
              'Seamless integration of pure dance (Nritta), expressive mime (Abhinaya), and spoken vocal dialogue (Vachika)',
              'Tarangam: Dancing with lightning footwork while balancing on the sharp edges of a brass plate, often with a pot of water on the head',
              'Historically performed exclusively by Brahmin male troupes known as "Bhagavathulu"',
              'Signature dance-drama: "Bhama Kalapam" depicting Satyabhama’s love and proud jealousy'
            ],
            culturalContext: 'Kuchipudi is the quintessential classical emblem of Andhra pride, blending temple devotion with lively theatrical drama.'
          },
          learn: {
            history: 'The sage Siddhendra Yogi envisioned Kuchipudi as a path of divine union (Madhura Bhakti), composing the masterpiece Bhama Kalapam. In 1502, a Kuchipudi troupe performed before the king of Vijayanagara, exposing the corruption of a local governor through their art. In the 20th century, legendary gurus like Vempati Chinna Satyam modernized and expanded Kuchipudi globally.',
            significance: 'Unlike purely solo dances, Kuchipudi retains deep theatrical roots where performers sing, speak, and emote character roles directly to the audience.',
            traditions: [
              'Purvaranga: Elaborate stage sanctification with incense, sprinkling of holy water, and the entry of the Sutradhara with a flagstaff.',
              'Patra Pravesha Daruvu: Each character enters behind a portable handheld curtain, introducing their identity through song and dance.',
              'Tarangam: Climax where the dancer steps onto the raised rim of a heavy brass plate, matching intricate rhythmic cycles (Jatis).',
              'Costumes: Draped in kanchipuram silk sarees with pleated front fans, temple jewelry, and fragrant mogra flower garlands.'
            ],
            howPracticed: 'Taught worldwide; celebrated at the annual Kuchipudi Dance Festival in its ancestral village and in premier cultural academies.',
            interestingFacts: [
              'In 2012 and 2016, thousands of dancers gathered in Vijayawada to set Guinness World Records for the largest Kuchipudi dance ensemble.',
              'The Nawab of Golconda, Abul Hasan Tana Shah, was so enchanted by a Kuchipudi performance in 1678 that he gifted the entire village of Kuchipudi to the artist families as a tax-free endowment.',
              'Siddhendra Yogi made every young boy of the village take a vow to perform the role of Satyabhama at least once in his life.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of learning Kuchipudi, watching a dancer execute the Tarangam on a brass plate, or attending a village performance.',
            memoryIdeas: [
              'The rhythmic click of anklet bells against the brass plate during a Tarangam',
              'Your first Arangetram or dance lesson wearing the pleated practice saree',
              'The mesmerizing facial abhinaya of a dancer enacting Satyabhama’s proud letter to Krishna'
            ]
          }
        },
        {
          id: 'carnatic-music-ap',
          name: 'Carnatic Classical & Vaggeyakara Tradition',
          category: 'Dance & Music',
          tagline: 'Devotional Heritage of Saint Annamacharya and Tyagaraja',
          shortIntro: 'Andhra Pradesh is the fertile cradle of Carnatic classical music, home to the immortal Vaggeyakaras (saint-composers who wrote both lyrical poetry and melodic structure) including Tallapaka Annamacharya, Tyagaraja, and Bhakta Ramadasu.',
          discover: {
            origin: 'Flourished across the Telugu heartland from Tirumala to the Godavari basin between the 15th and 19th centuries.',
            highlights: [
              'Annamacharya composed 32,000 immortal Sankirtanas praising Lord Venkateswara on copper plates',
              'Saint Tyagaraja composed immortal Pancharatna Kritis in melodious, lyrical Telugu',
              'The Telugu language is known as the "Italian of the East" for its musical vowel endings ideal for classical music',
              'Accompanied by the mridangam, veena, tambura, and ghatam'
            ],
            culturalContext: 'Carnatic music in Andhra is not merely performance art, but a sacred contemplative sadhana linking human breath to the divine cosmos.'
          },
          learn: {
            history: 'Tallapaka Annamacharya (1408–1503) pioneered the Pada-kavita format (Pallavi and Charanams) at Tirumala, dividing songs into spiritual (Adhyatma) and romantic (Sringara) compositions. Saint Tyagaraja (1767–1847), although born in Tamil Nadu, wrote his peerless compositions in pristine Telugu, transforming Carnatic classical music forever.',
            significance: 'Telugu’s unique linguistic structure—where every word naturally concludes with a musical vowel sound (A, I, U, E, O)—made it the preferred language of South Indian classical composers.',
            traditions: [
              'Dawn Suprabhatam and Ekanta Seva rituals set to Annamacharya’s sacred compositions.',
              'Tyagaraja Aradhana celebrations along river banks where hundreds of musicians sit together to render the Pancharatna Kritis.',
              'The rigorous Guru-Shishya parampara transmitting complex Raga alapanas, Neraval, and Kalpanaswarams orally.',
              'Kshetrayya’s Padams exploring the spiritual depths of divine love and surrender.'
            ],
            howPracticed: 'Sung daily in temples, music sabhas in Tirupati, Vijayawada, and Visakhapatnam, and practiced by millions of students across South India.',
            interestingFacts: [
              'Annamacharya’s 32,000 songs were engraved on copper plates and safely hidden in a stone vault (Sankirtana Bhandagaram) inside the Tirumala temple for over 400 years until discovered in the 20th century.',
              'M.S. Subbulakshmi’s recordings of Annamacharya kirtanas became the devotional soundtrack of millions of South Indian mornings.',
              'Saint Tyagaraja declined royal wealth from the King of Tanjore, composing the famous song "Nidhi Chala Sukhama" (Does wealth bring true joy, or devotion to Rama?).'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of learning a Carnatic kriti, listening to Annamacharya songs at dawn, or attending a music sabha with your family.',
            memoryIdeas: [
              'The peaceful dawn sound of "Brahmam Okkate" playing in your childhood home',
              'Practicing Sarali Varisais on the harmonium or tambura with your music guru',
              'Attending an evening kutcheri in a temple courtyard illuminated by oil lamps'
            ]
          }
        },
        {
          id: 'tappeta-gullu',
          name: 'Tappeta Gullu',
          category: 'Dance & Music',
          tagline: 'Acrobatic Devotional Drum Dance of the Coastal Yadavas',
          shortIntro: 'Tappeta Gullu is a spellbinding folk drum dance native to Srikakulam and Vizianagaram districts, performed by Yadava men who strap circular brass drums to their chests while executing breathtaking acrobatic formations.',
          discover: {
            origin: 'Rooted in the coastal villages of north-coastal Andhra Pradesh.',
            highlights: [
              'Performers tie circular brass drums (Gullu) directly across their chests using cloth cords',
              'Beating the chest drums in rapid syncopated rhythms while performing human pyramids and backbends',
              'Sung in praise of Lord Krishna and local village rain deities',
              'Energetic, thunderous vocal chants accompanying fast-paced footwork'
            ],
            culturalContext: 'Tappeta Gullu reflects the vigor, communal camaraderie, and pastoral devotion of coastal Andhra’s pastoral communities.'
          },
          learn: {
            history: 'Originally performed by shepherds and cowherds (Yadavas) to pray for rain during drought and celebrate good harvests. Over centuries, the performance absorbed elements of martial arts, gymnastic formations, and mythological storytelling about Lord Krishna’s childhood in Gokula.',
            significance: 'It combines devotional ecstasy with extraordinary athletic endurance, requiring years of physical training and rhythmic discipline.',
            traditions: [
              'A troupe typically consists of 15 to 20 male dancers dressed in colorful dhotis, jingling anklets, and embroidered vests.',
              'The circular brass drums are tuned by heating or adjusting tension before the performance.',
              'Dancers form circles, leap several feet into the air, drop to their knees without missing a beat, and climb onto each other’s shoulders.',
              'Songs alternate between high-pitched devotional invocations and playful folk riddles.'
            ],
            howPracticed: 'A star attraction at village fairs, temple car festivals (Rathotsavams), and state cultural festivals in Visakhapatnam and Srikakulam.',
            interestingFacts: [
              'Because the drum is tied directly against the ribcage, the vibration of the drum resonates through the performer’s own body as they sing.',
              'Dancers perform barefoot on rough village stone or sand without losing balance during multi-tiered human towers.',
              'It is traditionally believed that the thunderous sound of the Tappeta Gullu drums invokes rain clouds in the summer heat.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of seeing the high-energy Tappeta Gullu dance at a village festival, hearing the brass chest drums, or meeting rural performers.',
            memoryIdeas: [
              'The astonishing sight of dancers forming human pyramids while furiously drumming',
              'The metallic ringing of the Gullu drums echoing across village fields at night',
              'The boundless energy and joy of coastal Andhra’s folk traditions'
            ]
          }
        }
      ],
      cuisine: [
        {
          id: 'pootharekulu',
          name: 'Pootharekulu (Paper Sweets)',
          category: 'Cuisine',
          tagline: 'Atreyapuram’s Paper-Thin Rice Wafers Rolled with Jaggery and Ghee',
          shortIntro: 'Pootharekulu ("coated sheet sweet") is an extraordinary confectionery hailing exclusively from Atreyapuram village in Konaseema, crafted from gossamer paper-thin rice starch sheets rolled around jaggery, pure ghee, and nuts.',
          discover: {
            origin: 'Originated in Atreyapuram, Konaseema district, on the banks of the Godavari River.',
            highlights: [
              'Sheets are made from "Jaya" rice batter poured delicately over an inverted, heated earthen pot',
              'Each edible sheet is as thin as butter paper and translucent like silk',
              'Generously drizzled with melted village cow ghee and stuffed with jaggery or dry fruits',
              'Holds the Geographical Indication (GI) tag for its unique cottage industry legacy'
            ],
            culturalContext: 'Pootharekulu is the sweet crowning glory of Godavari hospitality, gifted at every royal wedding, housewarming, and festive gathering.'
          },
          learn: {
            history: 'Women in Atreyapuram perfected this craft over three centuries. Legend recounts that a village woman experimenting with leftover rice starch poured the liquid on an inverted pot used for steaming. When it peeled off like edible silk, she wrapped it around country jaggery, giving birth to this culinary marvel.',
            significance: 'Today, almost the entire economy of Atreyapuram village revolves around this cottage craft, empowering hundreds of women self-help groups.',
            traditions: [
              'Soaking special coarse Jaya rice for days, grinding into a watery translucent starch batter.',
              'Heating an inverted earthen pot (Kunda) over a smokeless fire fueled by coconut husks.',
              'Dipping a thin cotton cloth into the batter and swiftly smearing it across the hot pot surface; in two seconds, the wafer peels away effortlessly.',
              'Layering multiple paper sheets, brushing with warm golden ghee, sprinkling powdered jaggery and crushed pistachios, and folding into neat rolls.'
            ],
            howPracticed: 'Shipped from Atreyapuram across India and exported worldwide; a staple sweet presented to guests during Godavari festive banquets.',
            interestingFacts: [
              'Making the paper-thin sheet requires such precise temperature control that even a slight breeze can tear the delicate wafer.',
              'The sweet literally melts on the tongue in seconds because the rice paper contains almost zero gluten.',
              'Atreyapuram women produce millions of rolls annually, making it one of India’s most successful women-led GI craft clusters.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of tasting authentic Atreyapuram Pootharekulu, seeing the pot-baking process, or receiving a box from Konaseema.',
            memoryIdeas: [
              'The delicate crackle and instant melt of warm ghee and jaggery on your tongue',
              'Driving through the lush coconut groves of Konaseema to buy fresh Pootharekulu',
              'Sharing a box brought back by relatives from Godavari district'
            ]
          }
        },
        {
          id: 'gongura-pachadi',
          name: 'Gongura Pachadi',
          category: 'Cuisine',
          tagline: 'The Tangy Royal Signature Sorrel-Leaf Chutney of Andhra',
          shortIntro: 'Revered as "Andhra Shakha Bramha", Gongura (red sorrel leaf) Pachadi is the quintessential culinary identity of Andhra Pradesh—a fiery, tangy chutney pounded with red chillies, garlic, and cold-pressed sesame oil.',
          discover: {
            origin: 'Ancient culinary staple of Andhra Pradesh, particularly celebrated in Guntur and Tenali.',
            highlights: [
              'Made from native sour Gongura leaves (Hibiscus sabdariffa) grown in the mineral-rich black soils of Guntur',
              'Slow-cooked with sun-dried Guntur red chillies, fenugreek, coriander seeds, and garlic pods',
              'Tempered with mustard seeds, curry leaves, and generous measures of unrefined sesame (til) oil',
              'Enjoyed mixed into steaming hot rice with a dollop of pure homemade ghee and sliced raw onions'
            ],
            culturalContext: 'Gongura is more than food; it is an emotional cultural touchstone for Telugu people everywhere, celebrated as the king of leafy greens.'
          },
          learn: {
            history: 'Mentioned in Kakatiya and Vijayanagara inscriptions as an essential royal and commoner staple. Historical texts note that soldiers carried pots of Gongura pickle during long military campaigns because its natural acids and oil seal made it impervious to spoilage for months.',
            significance: 'Rich in iron, vitamin C, and antioxidants, it provides essential nutrition in the hot Deccan climate.',
            traditions: [
              'Harvesting red-stemmed Gongura (Erra Gongura), which possesses superior sourness compared to green-stemmed varieties.',
              'Drying washed leaves under shade to ensure not a single drop of water remains.',
              'Slow-wilting the leaves in oil until tender and dark olive-green.',
              'Pounding in a traditional stone mortar (Rolu and Rokali) with roasted dry red chillies, roasted methi powder, and crushed garlic.',
              'Storing in glazed ceramic jars (Jaadilu) where the flavors mature and deepen over weeks.'
            ],
            howPracticed: 'An indispensable feature of traditional Andhra meals, served on fresh banana leaves at weddings, festivals, and every humble family lunch.',
            interestingFacts: [
              'Telugu literature lovingly refers to Gongura as "Andhra Matha" (Mother of Andhra) because it sustained populations through droughts.',
              'Guntur red chillies paired with Gongura create the iconic spicy-sour flavor balance considered the gold standard of Telugu gastronomy.',
              'Eating hot Gongura rice with a bite of raw sweet onion is considered the ultimate gastronomic comfort food across Andhra Pradesh.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of your mother’s Gongura pickle making ritual, the ceramic jar on the kitchen shelf, or eating it with ghee and rice.',
            memoryIdeas: [
              'The aroma of garlic and mustard tempering hitting hot oil in your grandmother’s kitchen',
              'The first bite of hot rice, melted ghee, and tangy Gongura pachadi on a banana leaf',
              'Carrying a sealed jar of homemade Gongura abroad to hostel or university'
            ]
          }
        },
        {
          id: 'andhra-chepala-pulusu',
          name: 'Andhra Chepala Pulusu',
          category: 'Cuisine',
          tagline: 'Spicy Tamarind-Infused Coastal Fish Stew Cooked in Clay Pots',
          shortIntro: 'Chepala Pulusu is a legendary coastal Andhra fish curry slow-simmered in a rich, tangy tamarind reduction with roasted cumin-fenugreek paste and Guntur chillies inside an earthen clay pot (Matti Kundalu).',
          discover: {
            origin: 'Native to coastal Andhra districts (Nellore, Krishna, Godavari, and Visakhapatnam).',
            highlights: [
              'Cooked with fresh river or sea catch: Korameenu (Murrel), Vanjaram (Kingfish), or Rohu',
              'Cooked in a traditional wide-mouthed clay pot (Matti Chattilu)',
              'Simmered with old aged dark tamarind pulp, shallots, and fragrant methi-jeera spice paste',
              'Famous for tasting significantly more delicious on the second day (Masi Pulusu)'
            ],
            culturalContext: 'Chepala Pulusu reflects the deep maritime and deltaic culinary traditions of Andhra’s 974-kilometer coastline.'
          },
          learn: {
            history: 'Fisherfolk communities along the Bay of Bengal developed the pulusu technique as an ingenious method of preservation. The high concentration of tamarind acid, turmeric, and mustard oil allowed the fish curry to remain fresh and safe to eat for days without refrigeration.',
            significance: 'Nellore Chepala Pulusu has achieved legendary gastronomic status across South India, celebrated for its complex layers of tangy, spicy, and earthy flavors.',
            traditions: [
              'Using Korameenu (snakehead murrel) or fresh coastal river fish cleaned thoroughly with sea salt and turmeric.',
              'Extracting thick dark pulp from aged tamarind.',
              'Sautéing onions, green chillies, and ginger-garlic in peanut oil inside a seasoned clay pot.',
              'Pouring the tamarind reduction, adding fish steaks gently, and gently swirling the pot using cloth handles (never stirring with a spoon to avoid breaking the fish).',
              'Simmering on low fire until fragrant red oil separates and floats on the surface.'
            ],
            howPracticed: 'Cooked on weekends and family celebrations across coastal towns; traditional restaurants in Nellore draw food pilgrims from Chennai and Hyderabad.',
            interestingFacts: [
              'True culinary connoisseurs always eat Chepala Pulusu the morning after it is cooked, as the fish absorbs the tamarind and spice essence overnight.',
              'Clay pots used for cooking pulusu are seasoned for months; the porous earthenware breathes and imparts a distinct rustic mineral flavor.',
              'Fenugreek seeds (methi) roasted and ground into the curry counteract the heat of the Guntur chillies and provide cooling balance.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about a memorable coastal fish curry feast, a family recipe cooked in a clay pot, or visiting the Andhra coast.',
            memoryIdeas: [
              'The unmistakable earthy aroma wafting from a clay pot bubbling on the stove',
              'Your family arguing over who gets the prized fish head piece at the dinner table',
              'The rich taste of day-old Chepala Pulusu with hot rice on a Sunday afternoon'
            ]
          }
        }
      ],
      'heritage-places': [
        {
          id: 'lepakshi-temple',
          name: 'Lepakshi Veerabhadra Temple',
          category: 'Heritage Places',
          tagline: 'Hanging Pillar, Monolithic Nandi & Vijayanagara Mural Marvels',
          shortIntro: 'Constructed in 1538 CE in Sri Sathya Sai district, Lepakshi is a triumph of Vijayanagara architecture and art, world-renowned for its gravity-defying Hanging Pillar, massive monolithic Nandi, and the largest fresco painting in Asia.',
          discover: {
            origin: 'Built in 1538 CE by royal brothers Virupanna and Veeranna during the reign of Vijayanagara king Achyuta Deva Raya.',
            highlights: [
              'The mysterious Hanging Pillar that does not touch the ground, allowing paper or cloth to pass beneath it',
              'Colossal monolithic Nandi bull carved out of a single granite hillock, measuring 27 feet in length',
              'Spectacular ceiling frescoes depicting scenes from the Mahabharata and Ramayana using natural mineral pigments',
              'The seven-hooded granite Nagalinga coiled majestically over a black Shivalinga'
            ],
            culturalContext: 'According to Ramayana lore, Lepakshi is where the bird king Jatayu fell while battling Ravana; Lord Rama uttered the compassionate words "Le, Pakshi" (Rise, bird), lending the town its immortal name.'
          },
          learn: {
            history: 'Treasury officer Virupanna utilized royal funds to erect this sublime temple dedicated to Lord Veerabhadra. When rivals falsely accused him of embezzling funds without royal sanction, the heartbroken Virupanna reputedly plucked out his own eyes and hurled them against the temple wall—red marks that remain visible to this day.',
            significance: 'Lepakshi represents the grand synthesis of Vijayanagara rock-cut engineering, intricate ceiling murals, and mythological devotion.',
            traditions: [
              'Passing a thin cloth beneath the Hanging Pillar to verify its weightless suspension.',
              'Admiring the open-air Kalyana Mandapam (marriage hall of Shiva and Parvati) adorned with 38 sculpted pillars depicting gods and sages.',
              'Viewing the giant mysterious footprint in stone, reputed to be the footprint of Goddess Sita.',
              'Circumambulating the monolithic Nagalinga situated in the outer courtyard.'
            ],
            howPracticed: 'An active place of worship and a premier archaeological treasure; visited by thousands of historians, pilgrims, and international travelers.',
            interestingFacts: [
              'During the British colonial period, an engineer named Hamilton attempted to dislodge the hanging pillar to uncover its secret, causing the entire temple roof to shift, proving it anchors the structure.',
              'The monolithic Nandi is positioned nearly 200 meters away from the temple, yet its gaze aligns directly with the Shivalinga inside the sanctum.',
              'The massive ceiling fresco of Veerabhadra on the mandapam ceiling covers 50 square meters and is recognized as the largest fresco in peninsular India.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of your visit to Lepakshi, passing a cloth under the hanging pillar, or standing before the giant Nandi.',
            memoryIdeas: [
              'The sheer disbelief of watching a folded scarf glide smoothly under a solid stone pillar',
              'Gazing up at the gigantic seven-hooded serpent protecting the Shivalinga',
              'The quiet majesty of the monolithic Nandi bull resting against the rural landscape'
            ]
          }
        },
        {
          id: 'undavalli-caves',
          name: 'Undavalli Caves',
          category: 'Heritage Places',
          tagline: 'Monolithic 4th-Century Rock-Cut Wonder with Reclining Vishnu',
          shortIntro: 'Perched on the banks of the Krishna River near Vijayawada, Undavalli Caves are a monumental four-storey monolithic rock-cut cave complex carved out of a solid sandstone hillside during the 4th to 5th centuries CE.',
          discover: {
            origin: 'Excavated between 420 and 620 CE under the Vishnukundina dynasty, with early Buddhist cave foundations.',
            highlights: [
              'Massive four-tiered rock-cut monastery carved directly from the top down into a single sandstone hill',
              'A colossal 5-meter monolithic sculpture of Lord Vishnu in Anantasayana (reclining) posture on the third floor',
              'Unique architectural blend of early Buddhist vihara layout and classical Hindu iconography',
              'Panoramic views of the green Krishna river floodplains from the upper pillared verandas'
            ],
            culturalContext: 'Undavalli reflects the peaceful syncretism of early Andhra history, where Buddhist monastic retreats harmoniously transitioned into thriving Vedic shrines.'
          },
          learn: {
            history: 'Originally excavated by Buddhist monks who traveled along the trade route connecting Amaravati and the eastern coast. Later, the rulers of the Vishnukundina dynasty converted and expanded the caves into a temple dedicated to Lord Padmanabha (Vishnu), sculpting intricate friezes of lions, elephants, and mythological legends.',
            significance: 'It is one of the earliest and most accomplished examples of monolithic rock-cut cave architecture in peninsular India, pre-dating many famous Deccan monuments.',
            traditions: [
              'Ascending the hand-chiseled stone stairways connecting the four monumental tiers.',
              'Viewing the grand hall supported by massive square rock pillars carved with lotus medallions.',
              'Studying the Anantasayana Vishnu carved out of a single block of sandstone, sheltered by the hoods of serpent Adisesha.',
              'Observing the ancient water harvesting channels cut into the rock to drain monsoon rainwater.'
            ],
            howPracticed: 'Maintained as a protected national monument by the Archaeological Survey of India (ASI); a popular destination for heritage walks and photography.',
            interestingFacts: [
              'Unlike temples built by assembling stone blocks, rock-cut architecture like Undavalli was carved by removing thousands of tons of rock from top to bottom.',
              'The cave complex served as a resting stop for ancient merchants and Buddhist scholars traveling along the river Krishna.',
              'The cool micro-climate inside the deep stone halls remains comfortable even during peak Andhra summer heat.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of climbing the Undavalli stone steps, gazing at the reclining Vishnu, or the view across the Krishna River.',
            memoryIdeas: [
              'The awe of realizing the entire four-storey temple was carved from a single living hillside',
              'The peaceful silence inside the cool third-tier chamber before the reclining Vishnu',
              'Looking out over the emerald green Krishna river plains from the ancient carved balconies'
            ]
          }
        },
        {
          id: 'amaravati-stupa',
          name: 'Amaravati Stupa & Dhyana Buddha',
          category: 'Heritage Places',
          tagline: 'Ancient Buddhist Mahachaitya and Serene 125-Foot Dhyana Buddha',
          shortIntro: 'Amaravati on the banks of the Krishna River is one of the most sacred Buddhist heritage sites in the world, home to the ancient 2,000-year-old Great Stupa (Mahachaitya) and the majestic 125-foot Dhyana Buddha statue.',
          discover: {
            origin: 'Established in the 3rd century BCE under Emperor Ashoka; flourished under the Satavahana dynasty.',
            highlights: [
              'Ancient Mahachaitya adorned with the famous "Amaravati School of Art" limestone relief carvings',
              'Colossal 125-foot Dhyana Buddha statue seated in serene meditation atop an eight-pillared lotus hall',
              'Museum housing original 2,000-year-old marble-like limestone medallions and relics of Gautama Buddha',
              'Visited by Chinese pilgrim Xuanzang (Hiuen Tsang) in 640 CE, who described its glorious monasteries'
            ],
            culturalContext: 'Amaravati was the supreme center of Theravada and Mahayana Buddhism in South India, inspiring Buddhist art and architecture across Sri Lanka, Java, and Southeast Asia.'
          },
          learn: {
            history: 'Emperor Ashoka erected a pillar and laid the stupa’s foundation. Under the Satavahana rulers (especially Gautamiputra Satakarni) and Ikshvakus, master artisans carved hundreds of white limestone panels depicting the Jataka tales, life of Buddha, and vibrant court life, creating the world-renowned "Amaravati Art Style".',
            significance: 'It symbolizes peace, intellectual enlightenment, and Andhra’s historic role as a beacon of global Buddhist philosophy.',
            traditions: [
              'Circumambulating the sacred stupa pradakshina path along the Krishna river bank.',
              'Visiting the Dhyana Buddha complex, housing a museum of Buddhist sculptures inside its base.',
              'Studying the ancient Brahmi script inscriptions recording donations by merchants, nuns, and artisans.',
              'Meditation under the sacred Bodhi tree planted near the riverbank.'
            ],
            howPracticed: 'An international pilgrimage destination for Buddhists from Japan, Thailand, Sri Lanka, and Tibet; host to international Buddhist conclaves and Kalachakra initiations.',
            interestingFacts: [
              'The Dalai Lama conducted the prestigious Kalachakra initiation ceremony at Amaravati in 2006, attended by over 100,000 monks from around the globe.',
              'The Amaravati art style is characterized by slender, elongated human figures full of dynamic movement and profound spiritual serenity.',
              'Masterpieces of Amaravati limestone sculptures are treasured in museums across the world, including the British Museum in London.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of visiting the serene Dhyana Buddha at Amaravati, meditating by the Krishna River, or exploring Buddhist history.',
            memoryIdeas: [
              'The serene calm of standing beneath the monumental 125-foot Dhyana Buddha against the sunset sky',
              'Examining the 2,000-year-old carved limestone panels at the Amaravati heritage museum',
              'A moment of deep peace sitting along the quiet banks of the sacred Krishna river'
            ]
          }
        }
      ]
    }
  },

  // ============================================================
  // 3. RAJASTHAN
  // ============================================================
  rajasthan: {
    id: 'rajasthan',
    name: 'Rajasthan',
    tagline: 'Land of Royal Forts, Vibrant Thar Desert Melodies & Heroic Chivalry',
    features: {
      festivals: [
        {
          id: 'pushkar-camel-fair',
          name: 'Pushkar Camel Fair (Pushkar Mela)',
          category: 'Festivals & Traditions',
          tagline: 'Ancient Holy Lake Pilgrimage and Vibrant Desert Livestock Spectacle',
          shortIntro: 'Held every November on the edge of the Thar Desert around holy Lake Pushkar, this world-renowned festival blends a sacred Hindu pilgrimage to the rare Brahma Temple with one of the planet’s largest camel and livestock trading spectacles.',
          discover: {
            origin: 'Ancient pilgrimage coinciding with the full moon of Kartik Poornima (October-November).',
            highlights: [
              'Over 50,000 camels, horses, and cattle gathered across rolling golden desert dunes',
              'Camels sheared, painted, decorated with colorful woolen tassels, and paraded in beauty pageants',
              'Thousands of sadhus and pilgrims taking holy dips in the 52 sacred ghats of Pushkar Lake',
              'Vibrant desert competitions: longest moustache, turban-tying, and rural wrestling matches'
            ],
            culturalContext: 'Pushkar Mela is an extraordinary explosion of desert nomad culture, rural trade, sacred spiritualism, and Rajasthani hospitality.'
          },
          learn: {
            history: 'According to Hindu mythology, Lord Brahma dropped a lotus petal (Pushpa) to the earth, creating the holy lake to perform a yajna. It is one of the very few places on earth with an active temple dedicated to Brahma. Over centuries, pastoral desert tribes like the Rabaris gathered here to trade camels while fulfilling their religious pilgrimage.',
            significance: 'It symbolizes the enduring resilience and vibrant spirit of desert pastoral communities who transform the arid landscape into a riot of color and music.',
            traditions: [
              'Holy dip (Maha Snan) at dawn in the sacred Pushkar Lake under the Kartik full moon.',
              'Rabari and Raika pastoralists camping across the sand dunes with their camel caravans under starlit skies.',
              'Decorating camels with "Gorbandh" (intricate hand-knitted beadwork and shell necklaces).',
              'Evening Maha Aarti at the Pushkar ghats with hundreds of floating oil lamps (Deepdan) illuminating the water.'
            ],
            howPracticed: 'Spans seven unforgettable days; the desert dunes transform into a vibrant tent city with folk music troupes, Ferris wheels, and bustling bazaars.',
            interestingFacts: [
              'The Pushkar Camel Fair features an official "Camel Beauty Contest" where judges assess camel haircuts, gait, and decorative jewelry.',
              'Pushkar Lake is surrounded by 52 bathing ghats and over 400 milk-white temples.',
              'Local legend says that taking a dip in Pushkar Lake on Kartik Poornima washes away the sins of a hundred lifetimes.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of your journey to Pushkar, watching the camel races, the evening lake aarti, or camping in the dunes.',
            memoryIdeas: [
              'The silhouettes of hundreds of camels against a blazing orange desert sunset',
              'Listening to the haunting strains of a Ravanahatha violin played around a dune bonfire',
              'Releasing a floating leaf lamp into the serene waters of Pushkar Lake during the full moon'
            ]
          }
        },
        {
          id: 'teej-festival',
          name: 'Teej Festival (Haryali & Kajari Teej)',
          category: 'Festivals & Traditions',
          tagline: 'Monsoon Celebration of Love, Swings & Royal Processions',
          shortIntro: 'Teej is one of Rajasthan’s most joyous festivals, celebrating the arrival of the monsoon rains, the greening of the desert landscape, and the divine union of Goddess Parvati (Teej Mata) with Lord Shiva.',
          discover: {
            origin: 'Ancient agrarian and spiritual festival celebrated during the Shravana and Bhadrapada months (July-August).',
            highlights: [
              'Women dress in vibrant green leheriya sarees and adorn their hands with intricate mehndi designs',
              'Decorative flower-laden swings (jhulas) hung from banyan and neem trees in courtyards',
              'Grand royal procession of Teej Mata through the streets of Jaipur featuring caparisoned elephants and folk artists',
              'Special festive sweet "Ghevar" prepared and shared among families'
            ],
            culturalContext: 'Teej honors nature’s rejuvenation after the scorching desert summer and celebrates marital devotion, sisterhood, and festive joy.'
          },
          learn: {
            history: 'Mythology relates that Goddess Parvati underwent 108 penances to win Lord Shiva as her consort. Their sacred reunion on this day blessed the earth with life-giving monsoon clouds. In royal Jaipur, the Kachwaha Maharajas elevated Teej into a state festival, leading public processions from the City Palace.',
            significance: 'It provides a cherished occasion for married women to visit their maternal homes, receive gifts (Sinjara), and celebrate womanhood through music and dance.',
            traditions: [
              'Sinjara: Mothers-in-law and parents gift new clothes, leheriya dupattas, bangles, and sweets to young brides.',
              'Applying intricate Rajasthani floral mehndi patterns on hands and feet.',
              'Singing traditional monsoon folk songs while swinging high on decorated rope swings.',
              'The gilded palanquin of Teej Mata carried by royal guards through Jaipur’s Tripolia Bazaar to Talkatora lake.'
            ],
            howPracticed: 'Celebrated enthusiastically across Jaipur, Bundi, and Jodhpur with colorful street processions, folk dances like Ghoomar, and community feasts.',
            interestingFacts: [
              'The palanquin of Teej Mata in Jaipur leaves the City Palace only twice a year—once during Teej and once during Gangaur.',
              'Traditional multi-colored striped "Leheriya" tie-dye fabric is worn exclusively during Teej to symbolize monsoon water waves.',
              'Bundi is famous for its Kajari Teej, which includes a monumental two-week cultural fair with wrestling and folk concerts.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about celebrating Teej with your family, swinging beneath the monsoon trees, or watching the Jaipur royal procession.',
            memoryIdeas: [
              'The fragrance of fresh mehndi drying on hands while singing Teej songs with cousins',
              'The taste of rich, syrup-soaked Malai Ghevar bought especially for the festival',
              'Watching the golden palanquin of Teej Mata pass through the pink gates of Jaipur'
            ]
          }
        },
        {
          id: 'desert-festival-jaisalmer',
          name: 'Desert Festival of Jaisalmer',
          category: 'Festivals & Traditions',
          tagline: 'Sam Sand Dunes Extravaganza of Folk Ballads and Desert Pride',
          shortIntro: 'Held every February amidst the golden sand dunes of the Thar Desert in Jaisalmer, the Desert Festival is an exhilarating three-day celebration of Rajasthan’s rich cultural legacy, folk arts, camel polo, and traditional music under the full moon.',
          discover: {
            origin: 'Inaugurated to showcase the ancient living traditions of the Thar desert to the world.',
            highlights: [
              'Held in the Sam Sand Dunes with the glowing yellow sandstone Jaisalmer Fort as the dramatic backdrop',
              'Performances by world-renowned Kalbelia dancers, Ghoomar troupes, and Manganiyar musicians',
              'Quirky and spirited contests: Mr. Desert, turban-tying competitions, and camel decoration pageants',
              'Camel gymnastics, camel polo matches, and thrilling desert safaris under the starlit sky'
            ],
            culturalContext: 'The festival is a passionate celebration of life in the arid desert, proving that art, music, and joy flourish even in the harshest climates.'
          },
          learn: {
            history: 'The festival traces its spiritual roots to a legend involving Lord Krishna, who told the Pandava prince Arjuna that a descendant of the Yaduvanshi clan would establish a kingdom on the Trikuta Hill. In 1156 CE, Rawal Jaisal fulfilled this prophecy by founding Jaisalmer. The festival commemorates this royal foundation and the desert people’s unbreakable pride.',
            significance: 'It preserves ancient desert oral poetry, rare folk musical instruments, and traditional equestrian and camel sports.',
            traditions: [
              'Begins with the Shobha Yatra procession from Jaisalmer Fort to the Shahid Poonam Singh Stadium.',
              'Singing haunting Rajasthani ballads like "Kesariya Balam" welcoming travelers to the desert.',
              'Performances of the fire dance by the Jasnathi sect, dancing barefoot on burning charcoal beds.',
              'Full moon night concert on the open dunes of Sam with soulful desert tunes echoing across the sands.'
            ],
            howPracticed: 'Organized annually in February; attracts travelers, photographers, and desert nomads who assemble around bonfires across the golden sands.',
            interestingFacts: [
              'The "Mr. Desert" contest judges not muscular physique, but the authenticity of traditional Rajput attire, royal demeanor, and the majesty of the contestant’s moustache.',
              'Jaisalmer Fort, known as "Sonar Qila" (Golden Fort), is one of the very few living forts in the world where one-fourth of the old city’s population still resides.',
              'The Jasnathi fire dancers enter a deep trance chanting "Fateh Fateh" as they dance effortlessly atop glowing embers without burning their feet.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about visiting Jaisalmer, sitting on the Sam sand dunes at night, or listening to desert folk singers.',
            memoryIdeas: [
              'The golden glow of Jaisalmer Fort rising like a mirage out of the desert horizon',
              'The haunting desert notes of the Kamaicha instrument played under a starry desert sky',
              'Riding a decorated camel across the rippling wind-swept sand dunes of Sam'
            ]
          }
        }
      ],
      arts: [
        {
          id: 'blue-pottery-jaipur',
          name: 'Blue Pottery of Jaipur',
          category: 'Arts & Crafts',
          tagline: 'Turquoise-Glazed Ceramics Crafted Without Clay',
          shortIntro: 'Jaipur Blue Pottery is a world-renowned decorative ceramic craft distinctive for its eye-catching turquoise and cobalt blue hues and, uniquely among pottery traditions, for being made without any natural clay.',
          discover: {
            origin: 'Turko-Persian origin; introduced to Jaipur in the 19th century by Maharaja Sawai Ram Singh II.',
            highlights: [
              '100% clay-free: made from a dough of quartz powder, powdered glass, Fuller’s earth (Multani mitti), gum, and water',
              'Signature colors derived from cobalt oxide (deep blue) and copper oxide (vibrant turquoise green)',
              'Semi-translucent porcelain-like finish adorned with Persian flora, birds, and geometric motifs',
              'Low-fire technique fired only once in traditional kilns'
            ],
            culturalContext: 'Blue Pottery represents Jaipur’s royal cosmopolitanism, blending Persian elegance with indigenous Rajasthani floral painting.'
          },
          learn: {
            history: 'During a kite-flying festival, Maharaja Sawai Ram Singh II observed two potters whose glass-coated kite strings repeatedly severed the royal kites. Fascinated by their secret formula, the Maharaja sent them to Delhi to study the imperial Persian glazing craft, then established a pottery academy in Jaipur. Revived in the 1960s by master artist Kripal Singh Shekhawat.',
            significance: 'Because it is made without clay, Blue Pottery does not develop cracks easily and is impervious to moisture, making it ideal for decorative tiles and tableware.',
            traditions: [
              'Grinding quartz stone, glass fragments, and borax into a delicate fine powder.',
              'Kneading into a dough using katira gond (natural tree gum) and shaping inside open plaster moulds.',
              'Sanding with river pebbles and applying a smooth surface slip.',
              'Hand-painting intricate Persian flowers, peacocks, and arabesques using squirrel hair brushes.',
              'Glazing with a mixture of powdered glass and borax, and firing inside wood kilns at 800°C.'
            ],
            howPracticed: 'Sustained by master workshops in Jaipur and surrounding craft villages like Kot Jewar, producing bowls, vases, coasters, and architectural wall tiles.',
            interestingFacts: [
              'Because no clay is used in the composition, every piece must be pressed by hand into plaster moulds; it cannot be thrown on a standard potter’s wheel.',
              'Padma Shri Kripal Singh Shekhawat revolutionized the craft by introducing 25 new mineral colors beyond the traditional cobalt and turquoise.',
              'The craft holds the Geographical Indication (GI) tag protecting Jaipur’s authentic production methods.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about a Blue Pottery vase in your home, visiting a workshop in Jaipur, or learning the craft.',
            memoryIdeas: [
              'The stunning contrast of turquoise glaze shining in an old Jaipur bazaar shop',
              'Watching an artisan paint gossamer-thin cobalt flower petals with a squirrel-hair brush',
              'The cool, glass-smooth texture of an authentic handmade Blue Pottery coaster'
            ]
          }
        },
        {
          id: 'kathputli-puppetry',
          name: 'Kathputli String Puppetry',
          category: 'Arts & Crafts',
          tagline: 'Ancient Storytelling Puppetry of the Bhat Nomad Community',
          shortIntro: 'Kathputli ("wood-doll") is an ancient traditional string-puppet theatre of Rajasthan, performed by the itinerant Bhat community who carve lightweight mango-wood puppets and manipulate them with strings to recount legendary tales of chivalry and folk romance.',
          discover: {
            origin: 'Practiced for over a millennium across the Marwar region by the agricultural Bhat community.',
            highlights: [
              'Carved from soft mango wood (Kath) and dressed in vibrant sequined Rajasthani textiles (Putli)',
              'Manipulated using simple looped strings wound around the puppeteer’s fingers',
              'The puppeteer produces characteristic whistling voices using a bamboo reed instrument called the "Boli"',
              'Accompanied by a female singer playing the dholak who translates the puppet’s squeaks into poetic song'
            ],
            culturalContext: 'Kathputli served as the traveling news agency and moral moral theater of medieval Rajasthan, keeping alive the legends of kings, lovers, and folk heroes.'
          },
          learn: {
            history: 'Historical records date Kathputli back to the reign of legendary King Vikramaditya of Ujjain, whose 32 court puppets were celebrated in story cycles. Later, Bhat puppeteers were patronized by royal Rajput clans to sing genealogies of chivalric heroes like Amar Singh Rathore and Prithviraj Chauhan.',
            significance: 'It is a masterly synthesis of woodcarving, costume tailoring, vocal mimicry, and theatrical puppetry operating without complex stage machinery.',
            traditions: [
              'Carving the puppet head and torso from a single block of seasoned mango wood.',
              'Painting large stylized almond eyes, twirled moustaches for male characters, and traditional bindi for women.',
              'Stitching colorful flared skirts (ghagras) made of bright gota-patti and bandhani fabrics.',
              'Attaching strings to the head, hands, and back, connected directly to the puppeteer’s fingers without wooden control crosses.'
            ],
            howPracticed: 'Performed in village squares, heritage palace hotels, and cultural centers like Bharatiya Lok Kala Mandal in Udaipur.',
            interestingFacts: [
              'Traditional Kathputli puppets have no legs; their fluid movements are created by the swirling pleats of their long fabric skirts.',
              'The unique whistling squeak of the puppets is made using the "Boli"—two thin bamboo slats holding a rubber or reed diaphragm placed in the performer’s mouth.',
              'An experienced puppeteer can make a puppet somersault, dance, juggle swords, and bow with just two strings.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of watching a Kathputli puppet show, being mesmerized by the Boli whistle, or buying a puppet at a fair.',
            memoryIdeas: [
              'The high-pitched comical whistle of the puppet followed by the rhythmic slap of the dholak',
              'Watching the wooden puppet dancer swirl her miniature sequined skirt with astonishing speed',
              'A pair of traditional Kathputli puppets hanging by the doorway in your home'
            ]
          }
        },
        {
          id: 'bagru-sanganeri-block-print',
          name: 'Bagru & Sanganeri Block Printing',
          category: 'Arts & Crafts',
          tagline: 'Centuries-Old Wooden Block Natural Textile Printing',
          shortIntro: 'Originating in the craft villages of Sanganer and Bagru near Jaipur, this world-renowned textile art uses hand-carved teakwood blocks to imprint intricate floral and geometric motifs onto pure cotton fabrics using natural mud-resist (Dabu) and vegetable dyes.',
          discover: {
            origin: 'Practiced by the Chippa community in Sanganer and Bagru for over 400 years.',
            highlights: [
              'Intricate patterns carved by hand onto seasoned teak and sheesham wood blocks (Bunta)',
              'Bagru utilizes the rare "Dabu" mud-resist technique and dark natural mineral shades (indigo, alizarin, harda)',
              'Sanganeri is famous for delicate floral butis on pristine white or pastel backgrounds',
              'Washed in the local rivers and sun-bleached on open sandy riverbanks'
            ],
            culturalContext: 'Hand-block printing represents the harmony between the artisan’s steady rhythm, forest woodcraft, and natural botanical chemistry.'
          },
          learn: {
            history: 'Patronized by the royal families of Amber and Jaipur, the Chippa community migrated from Gujarat and settled along the Sanjaria and Dravyavati rivers. The special mineral properties of the local river water gave the vegetable dyes a deep, permanent richness unmatched anywhere else.',
            significance: 'It is a benchmark of sustainable slow-fashion, celebrated worldwide for its organic dyes, zero chemical runoff, and artisanal human touch.',
            traditions: [
              'Block carving (Kharodi): Master woodcarvers chisel complex floral motifs into teak blocks, drilling small relief holes for air escape.',
              'Dabu mud preparation: Black clay, lime, and gum beaten into a smooth resist paste applied with wooden blocks.',
              'Rhythmic hand printing: The printer aligns the block by eye, striking it firmly with the fist to transfer the dye.',
              'Dipping fabrics into deep underground indigo fermentation vats to produce rich natural blues.'
            ],
            howPracticed: 'Flourishing in Bagru and Sanganer cooperatives, producing iconic dupattas, sarees, quilts (Jaipuri Razai), and modern ethical fashion.',
            interestingFacts: [
              'A single hand-block printed bedspread may require up to 2,000 individual manual block impressions aligned with flawless visual precision.',
              'Dabu mud printing creates a distinct cracked, marble-like texture where indigo dye seeps through tiny fractures in the dry mud resist.',
              'Both Sanganeri and Bagru hand-block printing hold individual Geographical Indication (GI) tags acknowledging their distinct heritage.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of a beloved Jaipuri block-printed quilt, visiting the dye vats in Bagru, or wearing a Sanganeri kurta.',
            memoryIdeas: [
              'The rhythmic "thump-thump" sound of wooden blocks hitting cotton cloth in an open workshop',
              'The earthy indigo smell of an authentic hand-dyed Dabu fabric freshly washed in the sun',
              'The snug, lightweight warmth of a traditional Jaipuri cotton quilt in winter'
            ]
          }
        }
      ],
      dance: [
        {
          id: 'ghoomar',
          name: 'Ghoomar',
          category: 'Dance & Music',
          tagline: 'Graceful Swirling Folk Dance of Royal Rajput Women',
          shortIntro: 'Ghoomar is the signature folk dance of Rajasthan, characterized by graceful pirouettes, elegant hand gestures, and the mesmerizing swirling motion of voluminous flared ghagras worn by Rajput women celebrating festive milestones.',
          discover: {
            origin: 'Originally developed by the indigenous Bhil tribe to venerate Goddess Saraswati; later adopted by royal Rajput courts.',
            highlights: [
              'Named after the Hindi word "Ghoomna" (swirling or spinning in circles)',
              'Dancers wear heavy traditional 80-kali flared skirts, kanchli blouses, and sheer odhnis with face veils',
              'Synchronized clapping, finger clicking, and graceful swaying pirouettes set to traditional dholak beats',
              'Ranked internationally among the world’s top traditional classical folk dances'
            ],
            culturalContext: 'Ghoomar is an expression of royal elegance, feminine grace, and celebratory auspiciousness in Rajasthani society.'
          },
          learn: {
            history: 'While originating as a ritual dance among the Bhils, the Rajput kings embraced Ghoomar for royal ladies inside palace zenanas (women’s quarters). It became a rite of passage for a newly married bride entering her husband’s home, performing Ghoomar to symbolize her auspicious arrival and blessing for the household.',
            significance: 'Unlike fast modern dance, Ghoomar emphasizes measured dignity, modest beauty, and sweeping circular rhythm.',
            traditions: [
              'Dancers cover their faces with a transparent veil (Ghoonghat), directing all attention to the grace of the body’s movements.',
              'The footwork is based on the "Kaharwa" rhythm cycle of eight beats, executed in smooth gliding steps.',
              'Singing traditional songs like "Mhari Ghoomar Chhe Nakhrali" and "Gorbandh Nakhralo".',
              'The flared ghagra fans out in a complete 360-degree colorful circle as the dancer spins gracefully.'
            ],
            howPracticed: 'An essential highlight of royal weddings, Gangaur, Teej, and Diwali; performed both in royal palaces and in village courtyards.',
            interestingFacts: [
              'A traditional Ghoomar ghagra can use up to 80 panels (Kalis) of silk and brocade, weighing over 10 to 15 kilograms.',
              'The dancer maintains perfect balance while spinning without feeling dizzy by fixing their gaze gently on a single horizon point.',
              'In 2013, CNN Travel ranked Ghoomar fourth in its list of the world’s top 10 most mesmerizing traditional dances.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of learning Ghoomar for a wedding, the feeling of swirling in a flared ghagra, or watching a royal recital.',
            memoryIdeas: [
              'The dazzling kaleidoscope of colors as women in flared lehengas spun in unison',
              'Practicing the eight-beat footwork with aunts and sisters before a family wedding',
              'The resonant clink of glass bangles matching the rhythm of the village dholak'
            ]
          }
        },
        {
          id: 'kalbelia-dance',
          name: 'Kalbelia Dance',
          category: 'Dance & Music',
          tagline: 'UNESCO Intangible Cultural Heritage Serpent Dance of the Desert',
          shortIntro: 'Kalbelia is a sensuous, breathtaking folk dance performed by the nomadic snake-charmer community of Rajasthan, famous for serpentine undulations, acrobatic backbends, and dazzling black embroidered ghagras.',
          discover: {
            origin: 'Ancestral folk dance of the nomadic Kalbelia snake-charmer tribe of the Thar Desert.',
            highlights: [
              'Inscribed on the UNESCO Representative List of Intangible Cultural Heritage in 2010',
              'Movements mimic the fluid, mesmerizing sways and lightning strikes of a cobra',
              'Performers wear black swirling skirts heavily embroidered with silver ribbons and mirrors',
              'Accompanied by the "Been" (pungi)—the traditional wooden wind instrument of snake charmers'
            ],
            culturalContext: 'Kalbelia embodies the nomadic tribe’s intimate bond with desert wildlife, transforming their snake-handling heritage into an internationally acclaimed art form.'
          },
          learn: {
            history: 'When the Wildlife Protection Act of 1972 banned snake handling, the Kalbelia tribe faced an economic and cultural crisis. Legendary dancer Gulabo Sapera led an artistic renaissance by translating the movements of the cobra into a theatrical dance form, bringing Kalbelia from humble desert sands to the world’s most prestigious stages.',
            significance: 'The dance celebrates freedom, survival, and improvisational mastery; there is no written choreography, and songs are composed extemporaneously.',
            traditions: [
              'Men play the Been (wind instrument), Dafli, Khanjari (tambourine), and Dholak, accelerating tempo continuously.',
              'Women enter dressed in black flowing skirts that swirl like an unfurling serpent hood.',
              'Acrobatic feats: picking up coins and rings with their eyelids or mouth while bending backwards in full arches.',
              'Spontaneous poetic lyrics reflecting desert folklore, migration, and romance.'
            ],
            howPracticed: 'Celebrated at desert cultural festivals, palace heritage shows in Jodhpur and Pushkar, and performed internationally.',
            interestingFacts: [
              'Gulabo Sapera, who was buried alive at birth due to prevailing female infanticide traditions and saved by her aunt, became a global legend and was awarded the Padma Shri.',
              'The black color of the Kalbelia costume is traditionally chosen to resemble the black skin of the desert cobra.',
              'The Been instrument produces a continuous drone sound because the musician uses circular breathing—inhaling through the nose while blowing air stored in the cheeks.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of watching a live Kalbelia performance around a desert bonfire, hearing the Been instrument, or meeting Kalbelia artists.',
            memoryIdeas: [
              'The electrifying moment when the Been player accelerated the tempo and the dancer spun like a cyclone',
              'The mesmerizing sight of silver mirrors glittering on black skirts against the campfire',
              'The sheer athleticism of the dancer picking up a needle with her eyelids while executing a backbend'
            ]
          }
        },
        {
          id: 'manganiyar-langa-music',
          name: 'Manganiyar & Langa Folk Music',
          category: 'Dance & Music',
          tagline: 'Haunting Desert Melodies on Kamaicha, Khartal & Sarangi',
          shortIntro: 'The Manganiyars and Langas are hereditary Muslim musician communities of the Thar Desert in Jaisalmer and Barmer, celebrated for their extraordinary vocal virtuosity, complex rhythmic improvisations, and rare bowed instruments.',
          discover: {
            origin: 'Centuries-old oral musical lineages preserved across the desert districts of western Rajasthan.',
            highlights: [
              'The "Kamaicha"—an ancient bowed string instrument carved from a single piece of mango wood with a goatskin resonator',
              'Lightning-fast wooden castanets ("Khartal") played with astonishing finger dexterity',
              'Immortal desert ballads like "Kesariya Balam" and songs chronicling Rajput patrons and Sufi saints',
              'Complex microtonal singing spanning over three octaves'
            ],
            culturalContext: 'Manganiyar and Langa music is a shining testament to India’s syncretic desert heritage, where Muslim musicians have served as hereditary court bards to Hindu Rajput patrons for generations.'
          },
          learn: {
            history: 'Patronized by feudal Rajput chieftains (Jajmans), the musicians performed at births, weddings, and war departures. Their vast repertoire was transmitted purely through oral tradition across forty unbroken generations, preserving rare ragas that have disappeared from classical urban repertoires.',
            significance: 'Their music captures the profound soul of the Thar Desert—the loneliness of the dunes, the agony of separation, and the ecstasy of monsoon rain.',
            traditions: [
              'The lead singer commands the melody accompanied by the Sindhi Sarangi or Kamaicha.',
              'The Khartal player uses two pairs of sheesham wood clappers in each hand, producing polyrhythmic beats that rival Spanish castanets.',
              'Improvising intricate taans and vocal embellishments (murkis) with effortless breath stamina.',
              'Singing Sufi poetry by Bulleh Shah, Kabir, and Meerabai alongside ancient Marwari court ballads.'
            ],
            howPracticed: 'Sought after at international music festivals worldwide, at the Rajasthan International Folk Festival (RIFF) at Mehrangarh Fort, and in village baitaks.',
            interestingFacts: [
              'The Kamaicha is one of the oldest bowed instruments in human history, considered a direct ancestor of the modern violin.',
              'Master Khartal player Bundu Khan could play the wooden clappers so swiftly that the clicks merged into a continuous rolling sound like galloping horses.',
              'Ustad Sultan Khan, who popularized the Rajasthani Sarangi globally, hailed from this venerable desert musical lineage.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of listening to desert musicians under the starry sky, the sound of the Kamaicha, or a song that stayed in your soul.',
            memoryIdeas: [
              'Sitting in the courtyard of Mehrangarh Fort at dawn listening to the morning raag on Sarangi',
              'The goosebumps when the high-pitched desert voice sang the opening notes of "Kesariya Balam"',
              'Watching the Khartal player’s fingers fly with lightning speed in a village performance'
            ]
          }
        }
      ],
      cuisine: [
        {
          id: 'dal-baati-churma',
          name: 'Dal Baati Churma',
          category: 'Cuisine',
          tagline: 'Iconic Royal Trio of Baked Wheat Balls, Five-Lentil Curry & Sweet Churma',
          shortIntro: 'Dal Baati Churma is the definitive culinary signature of Rajasthan—a harmonious feast comprising hard round wheat balls baked in dung or clay ovens (Baati), fiery five-lentil curry (Panchmel Dal), and sweet crushed wheat dessert laden with pure desi ghee (Churma).',
          discover: {
            origin: 'Originated during the 8th-century Rajput wars of Mewar under founder Rawal Bappa.',
            highlights: [
              'Baati: Dense whole-wheat dough balls traditionally baked on dried cow-dung or charcoal embers until charred and crackled',
              'Dunked entirely in warm melted desi ghee before serving',
              'Panchmel Dal: Wholesome curry prepared with five lentils (moong, chana, toor, urad, masoor) tempered with cloves, hing, and ghee',
              'Churma: Deep-fried baatis crushed into fine sweet crumble with sugar/jaggery, cardamom, and dry fruits'
            ],
            culturalContext: 'Dal Baati Churma reflects the ingenuity of desert warrior culture, where food needed to be nutritious, long-lasting, and cookable with minimal water in camp conditions.'
          },
          learn: {
            history: 'During wartime in Mewar, Rajput soldiers rolled whole-wheat dough into small balls and buried them under desert sand beneath campfires before departing for battle. Upon returning at sunset, the baked baatis were dug up, broken open, and dipped in fresh ghee. Later, royal chefs refined the dish by pairing it with Panchmel Dal and inventing the sweet Churma.',
            significance: 'It is a balanced nutritional masterpiece providing high carbohydrates, protein, and healthy fats suited for desert survival and endurance.',
            traditions: [
              'Kneading coarse whole-wheat flour with ajwain, salt, and generous ghee (moyen).',
              'Shaping into smooth round balls and baking over slow cow-dung coals (Kanda) or tandoor ovens until crusts crack open.',
              'Cracking open the hot baati with the palm and submerging it in a bowl of pure melted ghee.',
              'Pouring spicy Panchmel Dal over the soaked baati and pairing with sweet cardamom-infused Churma and garlic chutney.'
            ],
            howPracticed: 'The crowning feast of Rajasthani weddings, Sunday family get-togethers, and desert picnics (Goth) across the state.',
            interestingFacts: [
              'Because baatis are baked with minimal moisture and soaked in ghee, they could be preserved by desert travelers for up to a week without refrigeration.',
              'Authentic Rajasthani homes prepare several varieties of Churma: Besan Churma, Gulab Churma, and Bajra Churma in winter.',
              'The authentic test of a well-baked baati is that its crust must crack naturally on its own, showing that the core is cooked thoroughly.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story about a family Dal Baati feast, baking baatis on charcoal in the village, or your favorite memory of this meal.',
            memoryIdeas: [
              'Cracking open a steaming hot baati and watching it soak up a ladle of golden desi ghee',
              'Sitting on the floor in traditional Rajasthani Pangat style sharing a festive feast',
              'The unforgettable contrast between fiery garlic chutney, spicy dal, and sweet cardamom churma'
            ]
          }
        },
        {
          id: 'ker-sangri',
          name: 'Ker Sangri',
          category: 'Cuisine',
          tagline: 'Arid Desert Delicacy Cooked with Wild Caper Berries and Desert Beans',
          shortIntro: 'Ker Sangri is an extraordinary authentic desert delicacy prepared from wild, thorny desert flora—tart Ker berries (Capparis decidua) and slender Sangri beans (Prosopis cineraria / Khejri tree)—cooked with dry red chillies, amchur, and raisins.',
          discover: {
            origin: 'Born from desert survival wisdom during famines in the arid Thar Desert region.',
            highlights: [
              'Made from wild Ker berries and tender Sangri pods harvested from the sacred Khejri tree',
              'Sundried and stored for months; soaked in buttermilk before cooking to soften and remove bitterness',
              'Cooked with whole Guntur/Mathania chillies, mustard oil, cumin, dry mango powder, and sweet raisins',
              'Packed with dense minerals, protein, and dietary fiber requiring zero fresh irrigation'
            ],
            culturalContext: 'Ker Sangri is a profound symbol of the Bishnoi and desert communities’ veneration of the Khejri tree and their ability to extract royal gastronomy from wild desert flora.'
          },
          learn: {
            history: 'During severe droughts when all cultivated crops withered in the Thar Desert, the resilient Khejri trees and Ker bushes continued to thrive. Desert communities harvested these wild berries and pods, discovering that when dried and preserved, they sustained human life through famines. Over centuries, royal Marwari kitchens transformed this survival food into a sophisticated royal banquet specialty.',
            significance: 'It is a celebration of ecological adaptation and biodiversity, requiring no fertilizers, pesticides, or agricultural irrigation.',
            traditions: [
              'Hand-harvesting tender green Sangri pods in May and Ker berries in summer.',
              'Boiling in salted buttermilk or water to tame the natural astringency.',
              'Sun-drying on clean cotton sheets on rooftop terraces for storage throughout the year.',
              'Slow-cooking in pungent mustard oil with Mathania dry red chillies, coriander, amchur, and a hint of jaggery and raisins to balance tartness.'
            ],
            howPracticed: 'A prized delicacy served at Rajasthani royal weddings and traditional thalis, often eaten with Bajra (millet) rotis.',
            interestingFacts: [
              'The Khejri tree that yields Sangri is the state tree of Rajasthan and is so sacred that in 1730, 363 Bishnois sacrificed their lives to protect them in the historic Khejarli massacre.',
              'Ker Sangri costs more per kilogram than many imported gourmet ingredients due to the laborious manual harvesting of wild thorny bushes.',
              'Because of its natural preservation in mustard oil and dry spices, travelers could carry Ker Sangri for days without it spoiling.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of tasting authentic Ker Sangri, visiting a Marwari kitchen, or learning how desert families forage these wild ingredients.',
            memoryIdeas: [
              'The unique sweet-sour-spicy burst of a plump Ker berry in a Marwari wedding thali',
              'Listening to an elder explain how the Khejri tree sustained generations during droughts',
              'Enjoying warm bajra roti topped with white butter alongside savory Ker Sangri'
            ]
          }
        },
        {
          id: 'ghevar',
          name: 'Ghevar',
          category: 'Cuisine',
          tagline: 'Honeycomb-Textured Royal Sweet Soaked in Fragrant Saffron Syrup and Rabdi',
          shortIntro: 'Ghevar is a regal Rajasthani disc-shaped sweet featuring an exquisite porous honeycomb texture, prepared from an emulsion of refined flour and ghee, deep-fried to golden perfection and bathed in saffron sugar syrup, topped with thick Rabdi, pistachios, and silver leaf.',
          discover: {
            origin: 'Originated in Jaipur and royal kitchens of Rajasthan; central to Teej and Raksha Bandhan festivities.',
            highlights: [
              'Characteristic porous honeycomb network created by the thermodynamic reaction of ice-cold batter hitting smoking hot ghee',
              'Deep-fried inside specialized circular brass moulds until crisp and golden',
              'Immersed in fragrant saffron-infused rose sugar syrup',
              'Topped with luscious thickened condensed milk (Rabdi), slivered almonds, pistachios, and pure silver vark'
            ],
            culturalContext: 'Ghevar is the sweet crown of monsoon celebrations in Rajasthan, sent by families as an auspicious blessing of sweetness and prosperity.'
          },
          learn: {
            history: 'The unique moisture-rich air of the monsoon (Shravan) month is essential for Ghevar preparation, preventing the delicate honeycomb batter from drying prematurely during frying. In royal Jaipur, the Maharaja’s confectioners competed annually to present the grandest Ghevar to the royal family during the Teej festival.',
            significance: 'According to Ayurveda, the combination of ghee, milk, and saffron in Ghevar provides cooling nourishment to balance the body’s Pitta during the monsoon season.',
            traditions: [
              'Whipping pure ghee with ice cubes by hand until it turns into a smooth, fluffy white cream.',
              'Slowly adding flour and ice-cold water to create a silky, flowing batter.',
              'Pouring the batter in a paper-thin stream into the center of bubbling hot ghee inside a deep circular mould; the batter explodes into a porous mesh.',
              'Lifting the fragile honeycomb disc with a wooden skewer, draining excess ghee, and submerging in warm saffron syrup.',
              'Decorating with creamy Rabdi and crushed dry fruits.'
            ],
            howPracticed: 'Confectionery shops across Jaipur, Jodhpur, and Udaipur overflow with towering displays of Ghevar during July and August.',
            interestingFacts: [
              'Jaipur’s historic sweet shops produce Ghevar variations including Malai Ghevar, Paneer Ghevar, and sugar-free Mawa Ghevar.',
              'The secret to Ghevar’s honeycomb pores is purely physical: the extreme temperature difference between ice-cold batter and boiling ghee creates instant steam channels.',
              'A traditional Teej "Sinjara" gift basket sent to a bride’s family is considered incomplete without a large box of fresh Malai Ghevar.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of enjoying festive Ghevar during Teej or Rakhi, visiting an iconic Jaipur mithai shop, or family sweet traditions.',
            memoryIdeas: [
              'The juicy, rich crunch of sweet saffron syrup bursting from the honeycomb lattice',
              'The excitement of bringing home the annual box of Malai Ghevar during monsoon season',
              'Watching the master sweetmaker skillfully pour cold batter into bubbling cauldrons of ghee'
            ]
          }
        }
      ],
      'heritage-places': [
        {
          id: 'amber-fort-palace',
          name: 'Amber Palace & Fort',
          category: 'Heritage Places',
          tagline: 'Hilltop Rajput Majesty and the Dazzling Sheesh Mahal Mirror Palace',
          shortIntro: 'Perched high on the rugged Cheel ka Teela hill overlooking Maota Lake, Amber Fort is a UNESCO World Heritage monument constructed in red sandstone and white marble, renowned for its formidable battlements and the breathtaking Sheesh Mahal (Palace of Mirrors).',
          discover: {
            origin: 'Constructed by Raja Man Singh I in 1592 CE; expanded by Mirza Raja Jai Singh and Sawai Jai Singh.',
            highlights: [
              'UNESCO World Heritage Site as part of the Hill Forts of Rajasthan',
              'Sheesh Mahal: Inlaid with thousands of concave convex Belgian mirrors that illuminate the entire hall with a single candle flame',
              'Ganesh Pol: Monumental gateway decorated with exquisite vegetable-dye frescoes and latticed marble screens (Jharokhas)',
              'Dramatic reflections in the calm waters of Maota Lake and the terraced Kesar Kyari saffron garden below'
            ],
            culturalContext: 'Amber Palace represents the pinnacle of Rajput-Mughal architectural synthesis, combining fierce military impregnability with romantic palatial luxury.'
          },
          learn: {
            history: 'Amber was the ancient capital of the Kachwaha Rajputs before Maharaja Sawai Jai Singh II founded Jaipur in the plains in 1727. Raja Man Singh, a prominent general in Emperor Akbar’s court, infused the fortress with both Rajput valor and imperial architectural refinements.',
            significance: 'The fort features an ingenious medieval water-lifting system that lifted water from Maota Lake across several tiers into royal fountains and rooftop gardens.',
            traditions: [
              'Ascending the fort ramparts past the Suraj Pol (Sun Gate) into the grand Jaleb Chowk courtyard.',
              'Worship at the historic Shila Devi temple near the entrance, housing a black stone idol of Kali brought by Raja Man Singh from Bengal.',
              'Entering the Sheesh Mahal to witness the mirror reflections resembling a star-filled midnight galaxy.',
              'Viewing the panoramic valley through the carved marble Jharokha screens where royal ladies watched court proceedings in privacy.'
            ],
            howPracticed: 'One of the most visited heritage sites in India; features nightly light and sound shows and classical music recitals in the Diwan-e-Aam.',
            interestingFacts: [
              'The concave mirrors in the Sheesh Mahal were imported from Belgium in the 17th century and set into plaster with gold foil backing.',
              'Amber Fort is connected to the hilltop Jaigarh Fort by secret underground fortified passages designed for royal evacuation in wartime.',
              'The acoustic design of the private royal quarters allowed whispers near water conduits to be heard only in designated chambers.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of exploring Amber Fort, lighting a candle in the Sheesh Mahal, or gazing down at Maota Lake.',
            memoryIdeas: [
              'The dazzling illusion of thousands of stars dancing across the mirrors in the Sheesh Mahal',
              'Standing on the ramparts feeling the cool wind blow across the rugged Aravalli hills',
              'Walking through the monumental Ganesh Pol admiring 400-year-old painted frescoes'
            ]
          }
        },
        {
          id: 'mehrangarh-fort-jodhpur',
          name: 'Mehrangarh Fort of Jodhpur',
          category: 'Heritage Places',
          tagline: 'Colossal Cliff-Perched Fortress Towering over the Blue City',
          shortIntro: 'Mehrangarh ("Fort of the Sun") is one of India’s largest and most imposing hill forts, rising 400 feet above the blue city of Jodhpur atop a sheer vertical cliff, renowned for its impenetrable red sandstone ramparts, intricate latticed jharokhas, and royal museum.',
          discover: {
            origin: 'Founded in 1459 CE by Rao Jodha, the 15th Rathore ruler of Marwar.',
            highlights: [
              'Perched on a 122-meter cliff offering dizzying views over the blue rooftops of old Jodhpur',
              'Seven colossal gates, including Jai Pol (Victory Gate) and Fateh Pol, bearing battle scars of cannonball strikes',
              'Sheesh Mahal, Phool Mahal (Palace of Flowers), and Moti Mahal featuring pure gold leaf ceilings and stained-glass windows',
              'One of the world’s finest royal museums housing palanquins, elephant howdahs, miniature paintings, and royal armories'
            ],
            culturalContext: 'Mehrangarh is the proud, beating heart of Marwar chivalry, praised by author Rudyard Kipling as "a palace that might have been built by Titans and colored by the morning sun".'
          },
          learn: {
            history: 'Rao Jodha laid the foundation in 1459 on the rocky hill called Bhakurcheeria. The fort was besieged numerous times by Mughal, Maratha, and Jaipur armies, but its colossal 120-foot-high walls never fell to direct assault. Cannonball indentations from 1807 battles remain preserved on the fort’s outer gates.',
            significance: 'It stands as a sublime monument to Rajput fortification genius, stone filigree carving, and centuries of royal Rathore patronage of arts.',
            traditions: [
              'Walking past the palm impressions (sati marks) near Loha Pol commemorating royal queens.',
              'Viewing the legendary cannon "Kilkila" and "Shambhuban" positioned on the windy upper ramparts.',
              'Listening to Rajasthani folk musicians seated in the palace courtyards singing ballads of warrior heroes.',
              'Visiting the Chamunda Devi temple located at the southern tip of the fort ramparts.'
            ],
            howPracticed: 'Meticulously preserved by the Mehrangarh Museum Trust; host to the international Rajasthan International Folk Festival (RIFF) and World Sacred Spirit Festival.',
            interestingFacts: [
              'The royal museum houses the historic solid silver elephant howdah (throne) presented to Maharaja Jaswant Singh I by Mughal Emperor Shah Jahan.',
              'The sheer cliffs beneath the fort are designated a National Geological Monument known as the Malani Igneous Suite Contact.',
              'Mehrangarh’s dramatic architecture served as the filming location for Hollywood epics including The Dark Knight Rises.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of gazing down at the blue city from Mehrangarh ramparts, touching the cannonball scars, or listening to courtyard folk singers.',
            memoryIdeas: [
              'The breathtaking panorama of sea-blue houses stretching out into the desert below the giant walls',
              'The haunting melody of the Sarangi echoing through the red stone courtyards of the fort',
              'Walking through the opulent Phool Mahal with its ceiling glowing with 80 kilograms of pure gold leaf'
            ]
          }
        },
        {
          id: 'city-palace-lake-pichola',
          name: 'City Palace & Lake Pichola (Udaipur)',
          category: 'Heritage Places',
          tagline: 'Romantic Lakeside Palace Complex Reflecting Mewar Royal Splendour',
          shortIntro: 'Erected over 400 years on the eastern banks of picturesque Lake Pichola, the Udaipur City Palace is Rajasthan’s largest palace complex—a dazzling agglomeration of granite and marble pavilions, hanging gardens, mirror mosaic courtyards, and tranquil lake vistas.',
          discover: {
            origin: 'Founded in 1559 CE by Maharana Udai Singh II when shifting the Mewar capital from Chittorgarh to Udaipur.',
            highlights: [
              'Rajasthan’s largest palace complex, measuring 244 meters in length and 30.4 meters in height',
              'Mor Chowk (Peacock Courtyard) adorned with 5,000 brilliant glass mosaic tiles depicting dancing peacocks',
              'Badi Mahal: A high-altitude garden courtyard built atop a 27-meter natural rock pillar with swimming pools',
              'Sweeping vistas of the ethereal white Lake Palace (Jag Niwas) floating upon the blue waters of Lake Pichola'
            ],
            culturalContext: 'Udaipur City Palace is the enduring symbol of Mewar’s legendary independence, poetic beauty, and unbroken royal lineage dating back 76 generations.'
          },
          learn: {
            history: 'Built progressively by 22 successive Maharanas over four centuries, the palace maintained an extraordinary architectural harmony despite combining Rajasthani, Mughal, and European design elements. The fortress-like exterior with towering blank ramparts concealed within it ethereal courtyards of mirrors, colored glass, and rooftop gardens.',
            significance: 'Unlike other Rajput dynasties that yielded to imperial courts, the Maharanas of Mewar (including the heroic Maharana Pratap) fiercely guarded their sovereignty, reflected in the sun emblem of the Suryavanshi kings displayed throughout the palace.',
            traditions: [
              'Entering through the colossal Triple Gate (Tripolia) where Maharanas were once weighed against gold distributed to the poor.',
              'Viewing the crystal gallery in Fateh Prakash Palace, the world’s single largest private collection of crystal furniture.',
              'Taking a boat cruise at twilight across Lake Pichola past the illuminated ghats and Jagmandir island.',
              'Visiting the Sun Balcony (Surya Gokhada) where the Maharana showed himself to his subjects each morning before breaking his fast.'
            ],
            howPracticed: 'An active royal residence and world-class living museum maintained by the Maharana of Mewar Charitable Foundation; host to royal celebrations and cultural galas.',
            interestingFacts: [
              'The 5,000 glass pieces in the Mor Chowk peacocks are made of colored glass imported from Belgium, shaped individually by hand into three-dimensional relief.',
              'Because the palace was constructed on a ridge over rocky terrain, the gardens of the Badi Mahal are situated on the palace roof yet planted in real earth resting on solid bedrock.',
              'The palace was designed with intentionally narrow doorways and spiral staircases to prevent armed enemy troops from charging in large groups.'
            ]
          },
          preserve: {
            promptText: 'Preserve a story of sailing on Lake Pichola, seeing the sparkling peacocks of Mor Chowk, or walking the royal halls of Udaipur.',
            memoryIdeas: [
              'The reflection of the illuminated white marble palaces dancing on the dark water of Lake Pichola',
              'The radiant colors of the glass-mosaic peacocks sparkling in the morning sunlight at Mor Chowk',
              'The serene romantic atmosphere of Udaipur at sunset looking out towards the Aravalli hills'
            ]
          }
        }
      ]
    }
  }
};

// Helper function to get cultural items by state and feature
export function getCulturalItems(stateId, featureId) {
  const stateData = CULTURAL_DATABASE[stateId];
  if (!stateData || !stateData.features[featureId]) {
    return [];
  }
  return stateData.features[featureId];
}

// Helper function to get a specific cultural item
export function getCulturalItemDetail(stateId, featureId, itemId) {
  const items = getCulturalItems(stateId, featureId);
  return items.find((item) => item.id === itemId) || null;
}

// Helper function to get all items across all states and features (flat array of 45 items)
export function getAllCulturalItems() {
  const allItems = [];
  Object.keys(CULTURAL_DATABASE).forEach((stateKey) => {
    const state = CULTURAL_DATABASE[stateKey];
    Object.keys(state.features).forEach((featureKey) => {
      const items = state.features[featureKey];
      items.forEach((item) => {
        allItems.push({
          ...item,
          stateId: state.id,
          stateName: state.name,
          featureId: featureKey,
        });
      });
    });
  });
  return allItems;
}
