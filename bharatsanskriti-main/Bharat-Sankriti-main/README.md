# 🕉️ Bharat Sanskriti (భారత సంస్కృతి | भारत संस्कृति)

> **Discover. Learn. Preserve. Serve.**  
> A living heritage and cultural preservation platform empowering communities to safeguard India's traditions, oral histories, and temple ecosystems through multimodal AI and community action.

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini%201.5%20Flash-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Storage](https://img.shields.io/badge/Persistence-IndexedDB%20%2B%20LocalStorage-4CAF50)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

---

## 🌟 Overview

**Bharat Sanskriti** bridges the gap between ancient Indian traditions and modern technology. Unlike static digital museums, Bharat Sanskriti is a participatory, community-driven platform built on four core pillars:

1. **Discover**: Rich hierarchical exploration of India's cultural tapestry across states, festivals, crafts, performing arts, cuisine, and architectural monuments.
2. **Learn**: Deep historical context, artisan techniques, and spiritual-cultural significance.
3. **Preserve**: An oral history archive empowering everyday citizens, elders, and youth to record spoken voice memories permanently stored in browser IndexedDB.
4. **Serve**: The **Heritage Connect & Seva Exchange**, linking devotees and volunteers with historic temples for conservation, crowd management, and traditional craftsmanship.

---

## 🚀 Key Features

### 1. 🧭 Hierarchical Cultural Explorer (Discover & Learn)
* Structured navigation across Indian states (Telangana, Rajasthan, Tamil Nadu) through 5 core cultural pillars:
  * **Festivals & Celebrations** (Bathukamma, Bonalu, Makar Sankranti, Pushkar Camel Fair, etc.)
  * **Handlooms & Crafts** (Pochampally Ikat, Cheriyal Scroll Painting, Blue Pottery, etc.)
  * **Classical & Folk Performing Arts** (Kuchipudi, Perini Sivatandavam, Ghoomar, Bharatanatyam, etc.)
  * **Regional Culinary Heritage** (Hyderabadi Biryani, Sarva Pindi, Dal Baati Churma, Chettinad Cuisine, etc.)
  * **Historic Monuments & Architecture** (Ramappa Temple, Golconda Fort, Hawa Mahal, Brihadeeswarar, etc.)
* 45+ comprehensive cultural dossiers detailing origins, craft methods, and cultural importance.

### 2. 🤖 Ask Bharat: Conversational Cultural AI Guide
* **Multimodal Intelligence**: Ask cultural or general questions via text, voice, or image uploads.
* **Trilingual Support**: Fluent in **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.
* **Dual-Engine Architecture**:
  * Primary: Google Gemini 1.5 Flash via a secure server proxy.
  * Fallback: Local verified deterministic cultural knowledge engine (`culturalKnowledge.js`) ensuring 100% offline availability.
* **Voice-to-Text & Text-to-Speech**: Hands-free conversation using native Web Speech Recognition and Web Speech Synthesis.

### 3. 🎙️ Living Oral History Archive (Preserve)
* **Real In-Browser Microphone Recording**: Record spoken memories and grandmother folklore using the HTML5 `MediaRecorder` API.
* **IndexedDB Binary Storage**: Stores authentic `audio/webm` blobs in `bharat_sanskriti_audio_db`, persisting across page refreshes without localStorage size constraints.
* **AI Story Structuring**: Formats raw voice thoughts into structured archival records.

### 4. 🛕 Heritage Connect & Seva Exchange (Serve)
* **Dual-Role RBAC**:
  * **Devotees & Volunteers**: Browse seva listings at ancient temples, apply with specific skillsets, and track application statuses.
  * **Temple Administrators**: Post seva openings, review applicant profiles, and approve/reject volunteer assignments.
* **Traditional Artisan Directory**: Connects master sthapatis, stone carvers, and weavers with active temple restoration initiatives.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend UI** | React 19, JavaScript ES2022+ |
| **Build & Dev Tooling** | Vite 8, Oxlint |
| **Styling & Design** | Pure Vanilla CSS3 design system with Indian cultural palette |
| **Icons** | Lucide React |
| **AI Integration** | Google Gemini 1.5 Flash + Local Cultural Knowledge Engine |
| **Speech & Audio** | Web Speech API (STT & TTS), MediaStream API |
| **Persistence** | IndexedDB (binary audio Blobs) + LocalStorage (metadata & RBAC) |

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShruthiPakanati/Bharat-Sankriti.git
   cd Bharat-Sankriti
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment (Optional for Gemini AI)**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
   *(Note: If no API key is provided, the platform automatically utilizes its local cultural knowledge engine.)*

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:5173/](http://localhost:5173/)

---

## 🏛️ Project Architecture

```
Bharat-Sankriti/
├── src/
│   ├── components/
│   │   ├── dashboard/        # Devotee and Temple Admin Dashboards
│   │   ├── seva/             # Temple Seva volunteer opportunities & modal flows
│   │   ├── stories/          # Real audio recorder & cultural story cards
│   │   ├── templework/       # Artisan directory & restoration projects
│   │   ├── AskBharat.jsx     # Multimodal conversational AI guide
│   │   ├── CulturalItemDetail.jsx
│   │   ├── FeatureItemsView.jsx
│   │   ├── HeritageConnectHub.jsx
│   │   ├── Navbar.jsx
│   │   └── StateSelector.jsx
│   ├── data/
│   │   ├── culturalData.js       # Complete 45+ cultural items dossier
│   │   ├── culturalKnowledge.js  # Verified multilingual offline knowledge engine
│   │   └── heritageConnectData.js# Verified temples, sevas & artisans
│   ├── services/
│   │   ├── aiService.js           # Secure AI proxy & engine fallback logic
│   │   ├── audioStorageService.js # IndexedDB binary audio storage
│   │   ├── authService.js         # Role-Based Access Control (User / Admin)
│   │   ├── sevaService.js         # Seva listing & application management
│   │   └── storyStorage.js        # Oral history metadata storage
│   ├── App.jsx
│   └── index.css                  # Cultural token design system
├── vite.config.js                 # Vite dev server + API proxy middleware
└── package.json
```

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
