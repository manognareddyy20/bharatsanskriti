import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Image as ImageIcon, 
  Mic, 
  MicOff, 
  Volume2, 
  Square, 
  RotateCcw, 
  Sparkles, 
  X,
  Bot,
  User,
  Copy,
  Check,
  Globe
} from 'lucide-react';
import { queryAskBharat } from '../services/aiService';

export default function AskBharat({ onBackClick }) {
  // Selected Language: 'en' (English), 'te' (Telugu), 'hi' (Hindi)
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return sessionStorage.getItem('ask_bharat_lang') || 'en';
  });

  // Welcome Greetings by Language
  const welcomeGreetings = {
    en: "Namaste! 🙏\n\nI'm Ask Bharat, your AI conversational guide to India's culture, traditions, festivals, arts, food, music, and heritage.\n\nYou can ask me any question — cultural, scientific, or general — or upload an image to explore!",
    te: "నమస్తే! 🙏\n\nనేను 'ఆస్క్ భారత్' — భారతదేశ సంస్కృతి, పండుగలు, చేనేత కళలు, దేవాలయాలు మరియు జీవన సంప్రదాయాలకు మీ AI మార్గదర్శిని.\n\nమీరు నన్ను ఏదైనా ప్రశ్న అడగవచ్చు లేదా చిత్రాన్ని అప్‌లోడ్ చేసి తెలుసుకోవచ్చు!",
    hi: "नमस्ते! 🙏\n\nमैं 'आस्क भारत' हूँ — भारत की समृद्ध संस्कृति, त्योहारों, कलाओं, ऐतिहासिक मंदिरों और परंपराओं के लिए आपका AI मार्गदर्शक।\n\nआप मुझसे कोई भी प्रश्न पूछ सकते हैं या किसी चित्र को अपलोड करके उसकी जानकारी प्राप्त कर सकते हैं!"
  };

  const getInitialWelcome = (lang) => ({
    id: `welcome-${lang}`,
    sender: 'bot',
    text: welcomeGreetings[lang] || welcomeGreetings.en,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const [messages, setMessages] = useState([getInitialWelcome(selectedLanguage)]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // { file, dataUrl, name, type }
  const [responseMode, setResponseMode] = useState(() => {
    return sessionStorage.getItem('ask_bharat_response_mode') || 'both'; // 'text' | 'voice' | 'both'
  });
  
  // Voice Input states
  const [isListening, setIsListening] = useState(false);
  const speechSupported = typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  const recognitionRef = useRef(null);

  // Voice Output states
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Suggested questions per language
  const suggestedQuestions = {
    en: [
      "What is Bathukamma?",
      "What is silk?",
      "Tell me about Kuchipudi",
      "Why is Sankranti celebrated?",
      "What makes Ramappa Temple unique?",
      "What is the science behind gravity?"
    ],
    te: [
      "బతుకమ్మ పండుగ విశిష్టత ఏమిటి?",
      "పట్టు (సిల్క్) ప్రాముఖ్యత ఏమిటి?",
      "కూచిపూడి నృత్యం ఎక్కడ పుట్టింది?",
      "రామప్ప గుడి ప్రత్యేకత ఏమిటి?",
      "సంక్రాంతి పండుగను ఎందుకు జరుపుకుంటారు?",
      "తెలంగాణ సాంప్రదాయ వంటకాలు ఏమిటి?"
    ],
    hi: [
      "बथुकम्मा क्या है और इसे क्यों मनाते हैं?",
      "रेशम (सिल्क) का क्या महत्व है?",
      "कुचिपुड़ी नृत्य की क्या विशेषताएं हैं?",
      "रामप्पा मंदिर की तैरने वाली ईंटें क्या हैं?",
      "मकर संक्रांति क्यों मनाई जाती है?",
      "योग की उत्पत्ति और महत्व क्या है?"
    ]
  };

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Persist response mode in sessionStorage
  useEffect(() => {
    sessionStorage.setItem('ask_bharat_response_mode', responseMode);
  }, [responseMode]);

  // Persist language in sessionStorage
  useEffect(() => {
    sessionStorage.setItem('ask_bharat_lang', selectedLanguage);
  }, [selectedLanguage]);

  // Handle language switch
  const handleLanguageChange = (newLang) => {
    if (newLang === selectedLanguage) return;
    setSelectedLanguage(newLang);
    stopSpeaking();

    // If conversation is just the initial welcome, replace it with the new language welcome
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([getInitialWelcome(newLang)]);
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Set recognition language based on active language
      const langCode = selectedLanguage === 'te' ? 'te-IN' : selectedLanguage === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.lang = langCode;

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputText(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert('Microphone permission was denied. Please allow microphone access to use voice input.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedLanguage]);

  // Handle Speech Output (TTS)
  const speakText = (text, msgId) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your current browser.');
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingMsgId === msgId) {
      setSpeakingMsgId(null);
      return;
    }

    // Clean markdown asterisks, hashes, and formatting for natural spoken flow
    const cleanSpeech = text
      .replace(/\*\*/g, '')
      .replace(/•/g, '')
      .replace(/###/g, '')
      .replace(/#/g, '')
      .replace(/🙏/g, 'Namaste')
      .replace(/\n+/g, '. ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick best voice matching selected language
    const voices = window.speechSynthesis.getVoices();
    let matchedVoice = null;

    if (selectedLanguage === 'te') {
      matchedVoice = voices.find(v => v.lang.startsWith('te') || v.name.toLowerCase().includes('telugu'));
    } else if (selectedLanguage === 'hi') {
      matchedVoice = voices.find(v => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi'));
    } else {
      matchedVoice = voices.find(v => v.lang === 'en-IN' || (v.lang.startsWith('en') && v.name.toLowerCase().includes('india')));
    }

    if (!matchedVoice && selectedLanguage === 'en') {
      matchedVoice = voices.find(v => v.lang.startsWith('en'));
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMsgId(null);
  };

  // Toggle Voice Input
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Speech Recognition is not supported by your browser. You can type your question directly.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        const langCode = selectedLanguage === 'te' ? 'te-IN' : selectedLanguage === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.lang = langCode;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  // Handle Image File Selection (JPG, JPEG, PNG, WEBP)
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG, JPEG, PNG, or WEBP image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setSelectedImage({
        file,
        dataUrl: loadEvent.target?.result,
        name: file.name,
        type: file.type
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Remove selected image before sending
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  // Copy message text to clipboard
  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMsgId(id);
      setTimeout(() => setCopiedMsgId(null), 2000);
    }).catch(err => {
      console.warn('Could not copy text: ', err);
    });
  };

  // Send Message Logic
  const handleSendMessage = async (textToSend = null) => {
    const text = (textToSend !== null ? textToSend : inputText).trim();
    const image = selectedImage;

    if (!text && !image) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage = {
      id: userMessageId,
      sender: 'user',
      text: text || (image ? (selectedLanguage === 'te' ? 'ఈ చిత్రంలో ఏముంది?' : selectedLanguage === 'hi' ? 'इस चित्र में क्या दिखाया गया है?' : 'What is shown in this image?') : ''),
      image: image ? image.dataUrl : null,
      imageName: image ? image.name : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);
    setIsThinking(true);

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    try {
      // Query Ask Bharat AI Service with language and full history context
      const aiResponse = await queryAskBharat(userMessage.text, messages, image, selectedLanguage);
      const botMessageId = `bot-${Date.now()}`;
      const botMessage = {
        id: botMessageId,
        sender: 'bot',
        text: aiResponse.text,
        culturalTopic: aiResponse.culturalTopic,
        topicName: aiResponse.topicName,
        source: aiResponse.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);

      // Automatically speak response if responseMode is 'voice' or 'both'
      if (responseMode === 'voice' || responseMode === 'both') {
        speakText(botMessage.text, botMessageId);
      }
    } catch (err) {
      console.error('Error fetching Ask Bharat response:', err);
      const errText = 
        selectedLanguage === 'te'
          ? "క్షమించండి, మీ అభ్యర్థనను పూర్తి చేయడంలో సమస్య ఎదురైంది. దయచేసి భారతదేశ పండుగలు, కళలు, నృత్యాలు లేదా వారసత్వం గురించి మళ్లీ అడగండి!"
          : selectedLanguage === 'hi'
          ? "क्षमा करें, आपके अनुरोध को संसाधित करने में समस्या आई। कृपया भारत के त्योहारों, कला, नृत्य या विरासत के बारे में पुनः पूछें!"
          : "I apologize, I encountered an issue processing your query. Please ask again about India's festivals, crafts, dances, music, or cuisine!";

      const errorMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: errText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  // Clear / Reset Conversation
  const handleClearConversation = () => {
    stopSpeaking();
    setMessages([getInitialWelcome(selectedLanguage)]);
    setInputText('');
    setSelectedImage(null);
  };

  const currentSuggestedList = suggestedQuestions[selectedLanguage] || suggestedQuestions.en;

  return (
    <div className="ask-bharat-page">
      {/* Top Header Bar */}
      <header className="ask-bharat-header">
        <div className="ask-bharat-header-left">
          <button 
            id="btn-back-from-ask-bharat"
            className="btn-back"
            onClick={() => {
              stopSpeaking();
              onBackClick();
            }}
            aria-label="Back to Previous Page"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div className="ask-bharat-branding">
            <div className="ask-bharat-icon-badge">
              <Bot size={22} className="ask-bharat-bot-icon" />
            </div>
            <div>
              <div className="ask-bharat-title-row">
                <h1 className="ask-bharat-title">🤖 Ask Bharat</h1>
                <span className="ask-bharat-badge">Cultural AI</span>
              </div>
              <p className="ask-bharat-subtitle">Your conversational AI guide to India's culture, heritage & beyond.</p>
            </div>
          </div>
        </div>

        <div className="ask-bharat-header-right">
          {/* Language Selector */}
          <div className="language-selector-group" title="Select Chat Language">
            <Globe size={15} className="lang-icon" />
            <div className="lang-pills">
              <button 
                type="button"
                className={`lang-pill ${selectedLanguage === 'en' ? 'lang-pill-active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
              <button 
                type="button"
                className={`lang-pill ${selectedLanguage === 'te' ? 'lang-pill-active' : ''}`}
                onClick={() => handleLanguageChange('te')}
              >
                తెలుగు
              </button>
              <button 
                type="button"
                className={`lang-pill ${selectedLanguage === 'hi' ? 'lang-pill-active' : ''}`}
                onClick={() => handleLanguageChange('hi')}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* New Chat Button */}
          <button 
            className="btn-clear-chat"
            onClick={handleClearConversation}
            title="Start New Conversation"
            type="button"
          >
            <RotateCcw size={15} />
            <span>New Chat</span>
          </button>
        </div>
      </header>

      {/* Main Chat Conversation Stream (Scrollable) */}
      <main className="ask-bharat-chat-area">
        <div className="chat-messages-container">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`chat-message-row ${msg.sender === 'user' ? 'message-row-user' : 'message-row-bot'}`}
            >
              {/* Bot Avatar */}
              {msg.sender === 'bot' && (
                <div className="message-avatar bot-avatar">
                  <Bot size={18} />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`message-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
                {/* Optional Attached Image in User Message */}
                {msg.image && (
                  <div className="message-image-attachment">
                    <img src={msg.image} alt={msg.imageName || 'Attached Indian Cultural Heritage'} />
                    {msg.imageName && <span className="image-filename">{msg.imageName}</span>}
                  </div>
                )}

                {/* Message Text formatted with clean paragraphs */}
                <div className="message-text">
                  {msg.text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Footer of Bubble: Time & Voice/Copy Controls */}
                <div className="message-bubble-footer">
                  <div className="message-footer-left">
                    <span className="message-time">{msg.timestamp}</span>
                    {msg.sender === 'bot' && msg.source === 'gemini-1.5-flash' && (
                      <span className="message-source-tag">Gemini AI</span>
                    )}
                  </div>

                  {msg.sender === 'bot' && (
                    <div className="message-audio-controls">
                      {/* Copy Text Button */}
                      <button 
                        className="btn-copy-msg"
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        title="Copy text"
                        type="button"
                      >
                        {copiedMsgId === msg.id ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                      </button>

                      {/* Text to Speech Control */}
                      {speakingMsgId === msg.id ? (
                        <button 
                          className="btn-audio-control btn-stop-speaking"
                          onClick={stopSpeaking}
                          title="Stop Speaking"
                          type="button"
                        >
                          <Square size={13} />
                          <span>Stop</span>
                        </button>
                      ) : (
                        <button 
                          className="btn-audio-control"
                          onClick={() => speakText(msg.text, msg.id)}
                          title="Listen to Explanation"
                          type="button"
                        >
                          <Volume2 size={13} />
                          <span>Speak</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="message-avatar user-avatar">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {/* Thinking / Loading State */}
          {isThinking && (
            <div className="chat-message-row message-row-bot">
              <div className="message-avatar bot-avatar">
                <Bot size={18} />
              </div>
              <div className="message-bubble bubble-bot bubble-thinking">
                <div className="thinking-indicator">
                  <span className="thinking-dot"></span>
                  <span className="thinking-dot"></span>
                  <span className="thinking-dot"></span>
                </div>
                <span className="thinking-text">
                  {selectedLanguage === 'te' 
                    ? 'ఆస్క్ భారత్ ఆలోచిస్తోంది...' 
                    : selectedLanguage === 'hi' 
                    ? 'आस्क भारत विचार कर रहा है...' 
                    : 'Ask Bharat is thinking...'}
                </span>
              </div>
            </div>
          )}

          {/* Suggested Questions (shown when conversation has only 1 message) */}
          {messages.length === 1 && !isThinking && (
            <div className="suggested-questions-panel">
              <div className="suggested-header">
                <Sparkles size={16} className="suggested-sparkle" />
                <span>
                  {selectedLanguage === 'te' 
                    ? 'సూచించిన ప్రశ్నలు:' 
                    : selectedLanguage === 'hi' 
                    ? 'सुझाए गए प्रश्न:' 
                    : 'Suggested Inquiries:'}
                </span>
              </div>
              <div className="suggested-grid">
                {currentSuggestedList.map((question, index) => (
                  <button 
                    key={index}
                    className="suggested-card"
                    onClick={() => handleSendMessage(question)}
                    type="button"
                  >
                    <span>{question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Control Area (Modern Conversational Experience) */}
      <footer className="ask-bharat-input-bar">
        <div className="input-control-container">
          {/* Selected Image Preview Chip */}
          {selectedImage && (
            <div className="attached-image-preview">
              <img src={selectedImage.dataUrl} alt="Selected Preview" className="preview-thumbnail" />
              <div className="preview-details">
                <span className="preview-name">{selectedImage.name}</span>
                <span className="preview-hint">Image attached • Ask a question or submit</span>
              </div>
              <button 
                className="btn-remove-preview"
                onClick={removeSelectedImage}
                title="Remove Image"
                type="button"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Listening State Banner */}
          {isListening && (
            <div className="listening-status-banner">
              <div className="listening-pulse-dot"></div>
              <span>
                {selectedLanguage === 'te'
                  ? 'వినబడుతోంది... మాట్లాడండి. ఆపడానికి మైక్రోఫోన్ పై నొక్కండి.'
                  : selectedLanguage === 'hi'
                  ? 'सुन रहा हूँ... बोलिए। रोकने के लिए माइक पर क्लिक करें।'
                  : 'Listening... Speak clearly into your microphone. Tap microphone to stop.'}
              </span>
            </div>
          )}

          {/* Response Mode Selector & Primary Input Row */}
          <div className="input-row">
            {/* Hidden File Input */}
            <input 
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />

            {/* Upload Image Button */}
            <button 
              className={`input-action-btn ${selectedImage ? 'active-action-btn' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              title="Upload an image to ask questions about it"
              type="button"
              aria-label="Upload Image"
            >
              <ImageIcon size={19} />
            </button>

            {/* Voice Input Microphone Button */}
            <button 
              className={`input-action-btn ${isListening ? 'listening-action-btn' : ''}`}
              onClick={toggleListening}
              title={isListening ? "Stop listening" : "Voice input (Speak your question)"}
              type="button"
              aria-label="Microphone"
            >
              {isListening ? <MicOff size={19} /> : <Mic size={19} />}
            </button>

            {/* Text Input */}
            <input 
              type="text"
              className="chat-text-input"
              placeholder={
                selectedImage 
                  ? (selectedLanguage === 'te' 
                      ? "ఈ చిత్రం గురించి అడగండి (ఉదా: 'ఇది ఏమిటి?', 'ఎందుకు జరుపుకుంటారు?')..." 
                      : selectedLanguage === 'hi' 
                      ? "इस चित्र के बारे में पूछें (उदा: 'यह क्या है?', 'इसे कैसे मनाते हैं?')..." 
                      : "Ask about this image (e.g. 'What is this?', 'Why is it celebrated?')...")
                  : (selectedLanguage === 'te'
                      ? "భారతీయ పండుగలు, కళలు, దేవాలయాలు లేదా ఏదైనా ప్రశ్న అడగండి..."
                      : selectedLanguage === 'hi'
                      ? "भारतीय त्योहारों, कला, मंदिरों या कोई भी सामान्य प्रश्न पूछें..."
                      : "Ask anything about culture, temples, silk, science, or life...")
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isThinking}
            />

            {/* Response Mode Selector (Text / Voice / Both) */}
            <div className="response-mode-wrapper">
              <label htmlFor="response-mode-select" className="response-mode-label">
                Mode:
              </label>
              <select 
                id="response-mode-select"
                className="response-mode-dropdown"
                value={responseMode}
                onChange={(e) => setResponseMode(e.target.value)}
              >
                <option value="text">Text</option>
                <option value="voice">Voice</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Send Button */}
            <button 
              className="btn-send-message"
              onClick={() => handleSendMessage()}
              disabled={(!inputText.trim() && !selectedImage) || isThinking}
              aria-label="Send Message"
              type="button"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
