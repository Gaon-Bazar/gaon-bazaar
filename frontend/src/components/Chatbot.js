import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Chatbot.css';

function Chatbot() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState('');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.language = 'hi-IN'; // Hindi-India
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechStatus('🎙️ सुन रहा हूँ...');
    };

    recognition.onresult = (event) => {
      let transcript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      // Only update on final result
      if (event.results[event.results.length - 1].isFinal) {
        setInput(transcript.trim());
        setSpeechStatus('✅ सुना गया');
        setTimeout(() => setSpeechStatus(''), 1500);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setSpeechStatus('');
      if (event.error === 'not-allowed') {
        setSpeechStatus('⚠️ माइक की अनुमति दें');
      }
    };

    recognitionRef.current = recognition;
  }, []);

  // Handle microphone button click
  const handleMicClick = () => {
    if (!recognitionRef.current) {
      setSpeechStatus('⚠️ वॉइस सपोर्ट नहीं है');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMsg = "नमस्ते! मैं गाँव बाज़ार सहायक हूँ। मुझसे सरकारी योजनाओं के बारे में पूछें। 🌾";
      
      setMessages([{
        type: 'bot',
        text: welcomeMsg,
        timestamp: new Date()
      }]);
    }
  }, []);

  // Scheme information database
  const schemeData = {
    // About Gaon Bazar
    gaon_bazar: {
      hi: "गाँव बाज़ार एक डिजिटल मार्केटप्लेस है जो किसानों को सीधे खरीदारों से जोड़ता है। यहाँ:\n✓ किसान अपनी फसल बेच सकते हैं\n✓ खरीदार ताजी उपज खरीद सकते हैं\n✓ कोई बिचौलिया नहीं\n✓ उचित मूल्य की गारंटी\n✓ हिंदी/अंग्रेजी दोनों में काम करता है"
    },
    farmer_features: {
      hi: "किसान के लिए सुविधाएँ:\n🎤 आवाज में फसल जोड़ें - 'मेरे पास 50 किलो टमाटर है' बोलें\n💰 AI मूल्य सुझाव - तुरंत सही दाम मिलेगा\n🌡️ गुणवत्ता जांच - तापमान/नमी से ताजगी स्कोर\n✅ बाज़ार में तुरंत लिस्ट हो जाएगा\n📊 अपनी सभी फसलें देखें"
    },
    buyer_features: {
      hi: "खरीदार के लिए सुविधाएँ:\n🛒 ताजी उपज ब्राउज़ करें\n🔍 फसल, श्रेणी, स्थान से खोजें\n📦 कार्ट में जोड़ें (मात्रा चेक)\n✅ आसान चेकआउट प्रक्रिया\n🌟 गुणवत्ता बैज देखें\n💳 सुरक्षित ऑर्डर कन्फर्मेशन"
    },
    voice_input: {
      hi: "आवाज से फसल कैसे जोड़ें:\n1️⃣ किसान डैशबोर्ड पर जाएं\n2️⃣ 'फसल जोड़ें' टैब क्लिक करें\n3️⃣ 🎤 माइक बटन दबाएं\n4️⃣ बोलें: 'मेरे पास 20 किलो प्याज है'\n5️⃣ सिस्टम अपने आप फसल और मात्रा निकाल लेगा\n\nहिंदी, अंग्रेजी, हिंग्लिश सब काम करता है!"
    },
    marketplace: {
      hi: "बाज़ार में खरीदारी कैसे करें:\n1️⃣ खरीदार डैशबोर्ड खोलें\n2️⃣ फसलें ब्राउज़ करें (गेहूं, चावल, सब्जी)\n3️⃣ मात्रा चुनें और कार्ट में जोड़ें\n4️⃣ कार्ट देखें और ऑर्डर कन्फर्म करें\n5️⃣ 2-3 दिन में डिलीवरी\n\nसभी उपज गुणवत्ता जांची हुई!"
    },
    ai_pricing: {
      hi: "AI मूल्य भविष्यवाणी कैसे काम करती है:\n💡 किसान जब फसल जोड़ते हैं तो सिस्टम:\n✓ बाजार डेटा देखता है\n✓ फसल की मांग चेक करता है\n✓ मौसम और क्षेत्र देखता है\n✓ न्यूनतम-अधिकतम मूल्य बताता है\n✓ उचित दाम की गारंटी देता है\n\nयह किसानों को सही मूल्य दिलाता है!"
    },
    quality_check: {
      hi: "गुणवत्ता सत्यापन:\n🌡️ तापमान जांच (22-25°C ideal)\n💧 नमी परीक्षण (50-70% ideal)\n📊 ताजगी स्कोर (0-100)\n🌿 Fresh/Good/Fair बैज\n\nउच्च स्कोर = ताजा उपज\nकम स्कोर = जल्दी बेचें\n\nयह खरीदारों को विश्वास दिलाता है!"
    },
    pmkisan: {
      hi: "PM-KISAN ₹6000/वर्ष 3 किस्तों में सीधे किसान के बैंक खाते में देता है। सभी भूमिधारक किसान पात्र हैं। आवेदन करें: pmkisan.gov.in"
    },
    fasal_bima: {
      hi: "प्रधानमंत्री फसल बीमा योजना (PMFBY) फसल बीमा प्रदान करती है। प्रीमियम: खरीफ के लिए 2%, रबी के लिए 1.5%। प्राकृतिक आपदाओं को कवर करता है। बैंकों/CSCs के माध्यम से आवेदन करें।"
    },
    kisan_credit: {
      hi: "किसान क्रेडिट कार्ड (KCC) 4% ब्याज पर ₹3 लाख तक का क्रेडिट प्रदान करता है। बीज, उर्वरक, उपकरण के लिए उपयोग करें। भूमि दस्तावेजों के साथ अपने बैंक में आवेदन करें।"
    },
    msp: {
      hi: "न्यूनतम समर्थन मूल्य (MSP) गेहूं, चावल, दालों सहित 23 फसलों के लिए उचित मूल्य सुनिश्चित करता है। सरकार मंडियों और FCI के माध्यम से MSP पर खरीदती है।"
    },
    soil_card: {
      hi: "मृदा स्वास्थ्य कार्ड आपकी मिट्टी की पोषक स्थिति देता है। सरकारी प्रयोगशालाओं में निःशुल्क परीक्षण। उर्वरक उपयोग को अनुकूलित करने और लागत कम करने में मदद करता है। निकटतम कृषि विज्ञान केंद्र पर जाएं।"
    },
    subsidy: {
      hi: "सब्सिडी उपलब्ध है: बीज (50%), उर्वरक (50% तक), ड्रिप सिंचाई (90%), कृषि उपकरण (40-50%)। कृषि विभाग के माध्यम से आवेदन करें।"
    }
  };

  // Pattern matching for user queries
  const getResponse = (userInput) => {
    const input = userInput.toLowerCase();
    // Always respond in Hindi
    const lang = 'hi';

    // Gaon Bazar queries
    if (input.match(/gaon.*bazar|गाँव.*बाज़ार|kya.*hai|क्या.*है|about|के.*बारे.*में|platform|प्लेटफॉर्म/)) {
      return schemeData.gaon_bazar[lang];
    }

    // Farmer features queries
    if (input.match(/farmer.*feature|किसान.*सुविधा|farmer.*kya|किसान.*क्या.*कर|farmer.*dashboard|किसान.*डैशबोर्ड/)) {
      return schemeData.farmer_features[lang];
    }

    // Buyer/Marketplace features
    if (input.match(/buyer.*feature|खरीदार.*सुविधा|marketplace|बाज़ार|kharidari|खरीदारी|kaise.*kharide|कैसे.*खरीदें/)) {
      return schemeData.marketplace[lang];
    }

    // Voice input queries
    if (input.match(/voice|आवाज|mic|माइक|bolke|बोलकर|kaise.*bole|कैसे.*बोलें|voice.*input|आवाज.*इनपुट/)) {
      return schemeData.voice_input[lang];
    }

    // AI Pricing queries
    if (input.match(/ai.*price|price.*prediction|मूल्य.*भविष्यवाणी|price.*kaise|दाम.*कैसे|fair.*price|उचित.*मूल्य/)) {
      return schemeData.ai_pricing[lang];
    }

    // Quality check queries
    if (input.match(/quality.*check|गुणवत्ता.*जांच|freshness|ताजगी|temperature|तापमान|humidity|नमी/)) {
      return schemeData.quality_check[lang];
    }

    // PM-KISAN queries
    if (input.match(/pm.*kisan|पीएम.*किसान|pradhan.*mantri.*kisan|किसान.*सम्मान|6000|छह.*हजार/)) {
      return schemeData.pmkisan[lang];
    }
    
    // Crop Insurance queries
    if (input.match(/bima|बीमा|insurance|fasal.*bima|फसल.*बीमा|crop.*insurance|pmfby/)) {
      return schemeData.fasal_bima[lang];
    }
    
    // Kisan Credit Card queries
    if (input.match(/credit.*card|kcc|किसान.*क्रेडिट|loan|ऋण|कर्ज/)) {
      return schemeData.kisan_credit[lang];
    }
    
    // MSP queries
    if (input.match(/msp|minimum.*support|न्यूनतम.*समर्थन|समर्थन.*मूल्य|support.*price/)) {
      return schemeData.msp[lang];
    }
    
    // Soil Health Card queries
    if (input.match(/soil.*card|मृदा.*कार्ड|मिट्टी.*कार्ड|soil.*health|मिट्टी.*जांच/)) {
      return schemeData.soil_card[lang];
    }
    
    // Subsidy queries
    if (input.match(/subsidy|सब्सिडी|सहायता|grant|अनुदान|seed|fertilizer|बीज|उर्वरक/)) {
      return schemeData.subsidy[lang];
    }

    // General scheme list
    if (input.match(/scheme|योजना|yojana|सरकारी.*योजना|all.*scheme|सभी.*योजना/)) {
      return "मुख्य योजनाएं:\n✓ PM-KISAN (₹6000/वर्ष)\n✓ फसल बीमा योजना\n✓ किसान क्रेडिट कार्ड\n✓ MSP (न्यूनतम समर्थन मूल्य)\n✓ मृदा स्वास्थ्य कार्ड\n✓ बीज/उर्वरक सब्सिडी\n\nकिसी भी योजना के बारे में पूछें!";
    }

    // Help queries
    if (input.match(/help|मदद|kaise|कैसे|how/)) {
      return "मैं इन चीजों में मदद कर सकता हूं:\n\n📱 गाँव बाज़ार:\n• प्लेटफॉर्म की जानकारी\n• किसान सुविधाएँ\n• बाज़ार में खरीदारी\n• आवाज से फसल जोड़ना\n• AI मूल्य भविष्यवाणी\n• गुणवत्ता जांच\n\n🏛️ सरकारी योजनाएं:\n• PM-KISAN\n• फसल बीमा\n• किसान क्रेडिट कार्ड\n• MSP\n• मृदा कार्ड\n• सब्सिडी\n\nकोई भी सवाल पूछें!";
    }

    // Default response
    return "मुझे माफ़ करें, मैं समझ नहीं पाया। कृपया पूछें:\n\n🌾 गाँव बाज़ार के बारे में:\n• 'गाँव बाज़ार क्या है?'\n• 'किसान कैसे फसल बेचें?'\n• 'बाज़ार में कैसे खरीदें?'\n• 'आवाज से कैसे जोड़ें?'\n\n🏛️ सरकारी योजनाएं:\n• PM-KISAN\n• फसल बीमा\n• किसान क्रेडिट कार्ड\n• सभी योजनाएं\n\nया 'मदद' टाइप करें";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Get bot response
    const botResponse = getResponse(input);
    setTimeout(() => {
      const botMessage = {
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickQuestions = [
    "गाँव बाज़ार क्या है?",
    "किसान कैसे फसल बेचें?",
    "बाज़ार में कैसे खरीदें?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={i18n.language === 'hi' ? "किसान सहायक" : "Farmer Assistant"}
      >
        {isOpen ? '✕' : '👨‍🌾'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <span className="chatbot-icon">👨‍🌾</span>
              <div>
                <h3>{i18n.language === 'hi' ? 'किसान सहायक' : 'Farmer Assistant'}</h3>
                <p className="chatbot-status">
                  {i18n.language === 'hi' ? 'ऑनलाइन - सरकारी योजनाएं' : 'Online - Govt Schemes'}
                </p>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                <div className="message-content">
                  {msg.text}
                </div>
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="chatbot-quick-questions">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                className="quick-question-btn"
                onClick={() => {
                  setInput(q);
                  setTimeout(() => handleSend(), 100);
                }}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="अपना सवाल पूछें या 🎤 दबाएं..."
            />
            <button 
              onClick={handleMicClick}
              className={`btn-voice ${isListening ? 'listening' : ''}`}
              title={isListening ? 'सुनना बंद करें' : 'बोलकर पूछें'}
            >
              {isListening ? '🛑' : '🎤'}
            </button>
            <button onClick={handleSend} disabled={!input.trim()}>
              भेजें 📤
            </button>
          </div>
          
          {/* Voice Status */}
          {speechStatus && (
            <div className="chatbot-voice-status">
              {speechStatus}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Chatbot;
