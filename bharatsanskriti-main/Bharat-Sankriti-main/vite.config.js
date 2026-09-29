import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function askBharatServerPlugin() {
  return {
    name: 'ask-bharat-api-server',
    configureServer(server) {
      server.middlewares.use('/api/ask-bharat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const env = loadEnv('development', process.cwd(), '');
            const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;

            if (!apiKey || apiKey.trim() === '') {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                fallback: true,
                message: 'No GEMINI_API_KEY configured in server environment'
              }));
              return;
            }

            const { prompt, history = [], image = null, language = 'en' } = JSON.parse(body || '{}');

            const langInstruction = 
              language === 'te' 
                ? "The user has selected Telugu (తెలుగు). Please reply primarily in natural Telugu script, along with clear explanations."
                : language === 'hi'
                ? "The user has selected Hindi (हिन्दी). Please reply primarily in natural Hindi Devanagari script, along with clear explanations."
                : "Reply in fluent, warm, accessible English.";

            const systemInstruction = 
              "You are 'Ask Bharat', an intelligent, conversational cultural AI guide for 'Bharat Sanskriti'.\n" +
              "GUIDELINES:\n" +
              "1. You can answer ANY question naturally, including general knowledge, science, nature, history, and daily topics.\n" +
              "2. When a question has a meaningful connection to India (e.g., silk, spices, turmeric, yoga, cotton, tea, bronze, astronomy, temples, festivals, dance, cuisine), answer the general question first and then seamlessly enrich it with authentic Indian cultural context.\n" +
              "3. If a question has NO meaningful connection to India (e.g. physics of flight, gravity, Python coding, European geography), simply answer it normally and accurately. DO NOT force Indian cultural context.\n" +
              "4. Remember the current conversation context. Understand follow-up questions and pronouns (e.g., if asked 'What is Bathukamma?' followed by 'When is it celebrated?', understand that 'it' refers to Bathukamma).\n" +
              "5. If an image is provided, inspect and describe it accurately with cultural context if applicable.\n" +
              "6. Tone: Warm, respectful, intelligent, and welcoming ('Namaste!').\n" +
              langInstruction;

            const contents = [];

            // Add previous messages from history (up to last 8 turns)
            const recentHistory = history.slice(-8);
            for (const msg of recentHistory) {
              if (msg.sender === 'user') {
                const parts = [];
                if (msg.text) parts.push({ text: msg.text });
                if (msg.image && msg.image.startsWith('data:')) {
                  const [meta, base64] = msg.image.split(',');
                  const mime = meta.split(':')[1]?.split(';')[0] || 'image/jpeg';
                  parts.push({
                    inlineData: {
                      mimeType: mime,
                      data: base64
                    }
                  });
                }
                if (parts.length > 0) contents.push({ role: 'user', parts });
              } else if (msg.sender === 'bot') {
                contents.push({
                  role: 'model',
                  parts: [{ text: msg.text }]
                });
              }
            }

            // Current turn
            const currentParts = [];
            if (prompt) currentParts.push({ text: prompt });
            if (image && image.dataUrl && image.dataUrl.startsWith('data:')) {
              const [meta, base64] = image.dataUrl.split(',');
              const mime = image.type || meta.split(':')[1]?.split(';')[0] || 'image/jpeg';
              currentParts.push({
                inlineData: {
                  mimeType: mime,
                  data: base64
                }
              });
            }

            if (currentParts.length === 0) {
              currentParts.push({ text: 'Hello Ask Bharat' });
            }

            contents.push({
              role: 'user',
              parts: currentParts
            });

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

            const geminiResponse = await fetch(geminiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemInstruction }] },
                contents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 950
                }
              })
            });

            if (!geminiResponse.ok) {
              const errText = await geminiResponse.text();
              console.warn('Gemini API error in server proxy:', geminiResponse.status, errText);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                fallback: true,
                error: `Gemini API returned status ${geminiResponse.status}`
              }));
              return;
            }

            const geminiData = await geminiResponse.json();
            const textResult = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!textResult) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ fallback: true, error: 'Empty output from Gemini API' }));
              return;
            }

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({
              text: textResult,
              fallback: false,
              source: 'gemini-1.5-flash'
            }));
          } catch (err) {
            console.error('Server proxy error:', err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({
              fallback: true,
              error: err.message
            }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    askBharatServerPlugin()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
