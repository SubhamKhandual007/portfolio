import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sparkles, Minus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundManager } from '../utils/audio';

// ── Groq API Config ─────────────────────────────────────────────────
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// ── Sayraa System Prompt ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Sayraa, the personal AI assistant for Subham Khandual's portfolio website. You are friendly, warm, intelligent, and highly knowledgeable.

Your primary mission is to analyze and answer queries about Subham Khandual's RESUME, projects, tech stack, tools, professional experience, education, key achievements, certifications, and contact info.
Do NOT answer unrelated off-topic questions (weather, general politics, sports, entertainment, complex math, etc.). For off-topic queries, politely redirect the user back to Subham's portfolio and resume.

LANGUAGE RULE (CRITICAL): Detect the user's language and respond in the SAME language:
- English → respond in English
- Hinglish (Hindi + English mix) → respond in Hinglish
- Odia (ଓଡ଼ିଆ) → respond in Odia
- Hindi (हिंदी) → respond in Hindi
- Any other language → mirror that language

Keep answers clear, well-structured, warm, and helpful (use bullet points or emojis when listing details).

━━━ SUBHAM KHANDUAL — COMPLETE RESUME & PORTFOLIO KNOWLEDGE BASE ━━━

📄 RESUME SUMMARY / OVERVIEW
Subham Khandual is a Full-Stack MERN & AI Developer based in Bhubaneswar, Odisha, India. Currently pursuing B.Tech in Computer Science & Engineering (2023–2027) at GIFT Autonomous. He specializes in engineering high-impact web platforms, real-time safety & healthcare hubs, multilingual voice AI tools, and scalable backend architectures.

👤 PERSONAL & CONTACT INFO
- Full Name: Subham Khandual
- Current Role: Full-Stack Developer & AI Systems Engineer (Student)
- Location: Bhubaneswar, Odisha, India
- Email: subhamkhandual215@gmail.com
- Phone / WhatsApp: +91 7894047169 (wa.me/917894047169)
- LinkedIn: https://linkedin.com/in/subham-khandual
- GitHub: https://github.com/subham-khandual
- Instagram: @subham_khandual

🎓 EDUCATION & ACADEMIC FOUNDATION
- Degree: Bachelor of Technology (B.Tech) in Computer Science & Engineering
- Institution: Gandhi Institute for Technology (GIFT Autonomous), Bhubaneswar, Odisha
- Timeline: 2023 – 2027 (Ongoing)
- Core Subjects: Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Operating Systems (OS), Computer Networks (CN), Software Engineering.

💼 PROFESSIONAL EXPERIENCE & INTERNSHIPS
1. AI / ML Developer Intern — Central Tool Room & Training Centre (CTTC), Bhubaneswar
   - Timeline: May 2025 – July 2025
   - Key Work: Built end-to-end Machine Learning pipelines using Python, Scikit-learn, and Pandas. Worked on data preprocessing, feature engineering, model evaluation, and computer vision / predictive analytics models for healthcare & agriculture.

2. Core Java Developer Intern — Central Tool Room & Training Centre (CTTC), Bhubaneswar
   - Timeline: July 2024
   - Key Work: Mastered Object-Oriented Programming (OOP), multi-threading, collection framework, and exception handling in Java. Built database-driven desktop applications using JDBC and MySQL.

🛠️ SKILLS, TOOLS & TECH STACK
- Frontend Development: React.js (95%), HTML5 (95%), CSS3 (90%), JavaScript ES6+ (92%), Tailwind CSS (90%), Three.js, Vite.
- Backend & APIs: Node.js (88%), Express.js (90%), Python (85%), Flask, RESTful APIs.
- Database & Cloud: MongoDB (85%), MySQL (82%), Firebase Firestore (85%).
- Programming Languages: Java (88%), Python (85%), C Language (80%), JavaScript (92%).
- Developer Tools & Platforms: Git (90%), GitHub (92%), VS Code (95%), Postman (88%), Vercel, Progressive Web Apps (PWA).

🚀 FEATURED PROJECTS (4 Major Applications)
1. Suraksha Setu (AI Smart Tourist Safety Platform) [Full-Stack MERN + AI]
   - Description: Tourist security ecosystem with real-time safety alerts, emergency SOS, QR digital IDs, and centralized command dashboard.
   - Key Capabilities: 1-tap SOS alerts to police & contacts, live hazard mapping, digital QR tourist ID, integrated AI assistant.
   - Tech Tools: React, Node.js, Express.js, MongoDB, TypeScript, AI Chatbot.

2. Swasthya Setu (Comprehensive Healthcare Platform) [Full-Stack MERN + AI]
   - Description: Complete medical service hub offering rapid first aid response, blood bank tracking, instant doctor consultations, and AI chat.
   - Key Capabilities: Integrated Sayraa Healthcare Chatbot for instant diagnosis, real-time blood bank locator, instant doctor consultation booking, emergency first-aid & hospital finder.
   - Tech Tools: React, Node.js, Express.js, MongoDB, Sayraa AI Chatbot, Tailwind CSS.

3. Sayraa AI PPT Generator (Automated AI Presentation Platform) [AI Tool]
   - Description: AI-powered presentation tool creating structured PowerPoint slides from topic prompts using Gemini & Groq models.
   - Key Capabilities: Fast slide generation, automated formatting & speaker notes, custom layout themes, instant .pptx file export.
   - Tech Tools: Python, Flask, Gemini AI, Groq AI, Bootstrap.

4. Sayraa AI Health Care Assistant (Multilingual Voice AI Health Companion) [AI Tool]
   - Description: Voice-enabled healthcare companion providing accessible medical guidance in Odia, Hindi, and English.
   - Key Capabilities: Multilingual voice recognition (Odia, Hindi, English), Groq LLM fast medical advice, PWA installable mobile support, cloud chat sync.
   - Tech Tools: React, Groq LLM, Firebase, PWA, Web Speech API, Tailwind CSS.

🏆 CERTIFICATIONS & ACADEMIC CREDENTIALS
1. AI & Machine Learning Certification — CTTC Bhubaneswar (2025)
2. Core Java Application Development Certification — CTTC Bhubaneswar (2024)
3. NPTEL Certification: Programming in Java — IIT Kharagpur (Score: 55%) (2024)
4. NPTEL Certification: Industry 4.0 & Industrial Internet of Things (IIoT) — IIT Kharagpur (Score: 67%) (2025)
5. NPTEL Certification: Privacy and Security in Online Social Media — IIIT Hyderabad (Score: 54%) (2025)

🌟 KEY ACHIEVEMENTS & METRICS
- 15+ Full-Stack Web & AI Projects Completed
- 25+ Open-Source Repositories on GitHub
- 5+ Industry & NPTEL Certifications
- 10+ Hackathons & Coding Competitions
- 500+ Solved Algorithmic & DSA Problems (LeetCode, CodeChef, NPTEL)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

// ── Fallback Rule-Based (if Groq API fails) ──────────────────────────
const getFallbackResponse = (q) => {
  if (q.includes('resume') || q.includes('cv') || q.includes('summary') || q.includes('overview') || q.includes('profile'))
    return "📄 **Subham Khandual's Resume Summary:**\n• B.Tech CS Student (2023–2027) at GIFT Autonomous, Bhubaneswar.\n• Full-Stack MERN & AI Developer with 2 CTTC internships (AI/ML & Core Java).\n• Creator of 15+ projects including Suraksha Setu & Swasthya Setu.\n• Tech Stack: React, Node.js, MongoDB, Java, Python, Tailwind, Firebase, Git.\n• 500+ coding problems solved & 5+ certifications!";

  if (q.includes('experience') || q.includes('intern') || q.includes('cttc') || q.includes('work') || q.includes('job'))
    return "💼 **Subham's Professional Experience:**\n1. **AI / ML Intern** at CTTC Bhubaneswar (May–July 2025): Developed Python ML pipelines, computer vision models & data preprocessing.\n2. **Core Java Intern** at CTTC Bhubaneswar (July 2024): Built database-driven desktop applications using Java OOP, JDBC, and MySQL.";

  if (q.includes('education') || q.includes('college') || q.includes('btech') || q.includes('gift') || q.includes('degree') || q.includes('study'))
    return "🎓 **Education:**\n• **B.Tech in Computer Science & Engineering** (2023 – 2027)\n• GIFT Autonomous College, Bhubaneswar, Odisha\n• Core Coursework: DSA, DBMS, Operating Systems, Computer Networks, Machine Learning.";

  if (q.includes('achievement') || q.includes('metric') || q.includes('stats') || q.includes('problem') || q.includes('hackathon'))
    return "🏆 **Key Achievements:**\n• 15+ Completed Web & AI Projects\n• 25+ Open-Source Repositories on GitHub\n• 500+ Solved Algorithmic Problems (DSA)\n• 10+ Hackathons & Coding Contests\n• 5+ Verified Certifications (CTTC & NPTEL)";

  if (q.includes('certificate') || q.includes('nptel') || q.includes('score'))
    return "📜 **Certifications:**\n• CTTC AI & Machine Learning (2025)\n• CTTC Core Java Application Development (2024)\n• NPTEL Programming in Java - IIT Kharagpur (Score: 55%)\n• NPTEL Industry 4.0 & IIoT - IIT Kharagpur (Score: 67%)\n• NPTEL Social Media Security - IIIT Hyderabad (Score: 54%)";

  if (q.includes('skill') || q.includes('tool') || q.includes('stack') || q.includes('react') || q.includes('node') || q.includes('java') || q.includes('python'))
    return "🛠️ **Tools & Tech Stack:**\n• **Frontend:** React.js, Tailwind CSS, HTML5, CSS3, JavaScript, Three.js\n• **Backend:** Node.js, Express.js, Python, Flask, REST APIs\n• **Databases:** MongoDB, MySQL, Firebase Firestore\n• **Tools:** Git, GitHub, VS Code, Postman, Vercel, PWA";

  if (q.includes('project') || q.includes('swasthya') || q.includes('suraksha') || q.includes('sayraa') || q.includes('ppt') || q.includes('health'))
    return "🚀 **Subham's 4 Major Projects:**\n1. **Suraksha Setu:** AI Tourist Safety platform with Emergency SOS & QR Tourist IDs.\n2. **Swasthya Setu:** Comprehensive healthcare hub featuring **Sayraa Healthcare Chatbot**, doctor booking & blood bank locator.\n3. **Sayraa AI PPT Generator:** AI PowerPoint slide generator powered by Groq & Gemini AI.\n4. **Sayraa AI Health Care Assistant:** Multilingual Voice AI health companion (Odia, Hindi, English).";

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone') || q.includes('whatsapp') || q.includes('linkedin') || q.includes('github'))
    return "📧 **Contact Subham:**\n• Email: subhamkhandual215@gmail.com\n• Phone / WhatsApp: +91 7894047169\n• LinkedIn: linkedin.com/in/subham-khandual\n• GitHub: github.com/subham-khandual";

  return "Namaste! 🙏 I'm Sayraa, Subham's AI Assistant. Ask me anything about Subham's Resume — including his Projects, Tools, Education, Internships, Certifications, and Key Achievements!";
};

// ── Component ─────────────────────────────────────────────────────────
const AiChatbot = () => {
  const { isChatbotOpen, setIsChatbotOpen, soundEnabled } = usePortfolio();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! 🙏 Mein hun Sayraa, Subham ki AI assistant. Mein aapki kya madad kar sakti hun? Aap mujhse Subham ke projects, skills, education ya contact ke baare mein pooch sakte hain — English, Hinglish ya Odia (ଓଡ଼ିଆ) mein!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isChatbotOpen) {
      setMessages([
        {
          sender: 'bot',
          text: "Namaste! 🙏 Mein hun Sayraa, Subham ki AI assistant. Mein aapki kya madad kar sakti hun? Aap mujhse Subham ke projects, skills, education ya contact ke baare mein pooch sakte hain — English, Hinglish ya Odia (ଓଡ଼ିଆ) mein!",
        },
      ]);
      setInput('');
      setIsTyping(false);
    }
  }, [isChatbotOpen]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Floating Launcher Button when chatbot is closed
  if (!isChatbotOpen) {
    return (
      <motion.button
        onClick={() => {
          if (soundEnabled) soundManager.playClickSound();
          setIsChatbotOpen(true);
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open Sayraa AI Assistant"
        title="Chat with Sayraa AI"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          backgroundColor: '#0b0f19',
          border: '2px solid #00f0ff',
          boxShadow: '0 0 25px rgba(0, 240, 255, 0.45), 0 10px 30px rgba(0,0,0,0.6)',
          cursor: 'pointer',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src="/chatbot_avatar.png"
          alt="Sayraa AI Avatar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
        />
        {/* Glowing online pulse indicator */}
        <span
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '13px',
            height: '13px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            border: '2px solid #0b0f19',
            boxShadow: '0 0 8px #10b981',
          }}
        />
      </motion.button>
    );
  }

  // ── Groq API Call ──────────────────────────────────────────────────
  const callGroqAPI = async (userMessage, conversationHistory) => {
    const groqMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory
        .filter(m => m.sender !== 'bot' || conversationHistory.indexOf(m) > 0)
        .slice(-8) // last 8 messages for context window
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
      { role: 'user', content: userMessage },
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: groqMessages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  };

  // ── Handle Send ────────────────────────────────────────────────────
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    if (soundEnabled) soundManager.playClickSound();

    const userText = input.trim();
    const updatedMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await callGroqAPI(userText, updatedMessages);
      setMessages(prev => [...prev, { sender: 'bot', text: reply || getFallbackResponse(userText.toLowerCase()) }]);
      if (soundEnabled) soundManager.playHoverSound();
    } catch (err) {
      console.error('Sayraa Groq API error:', err);
      // Graceful fallback to rule-based
      const fallback = getFallbackResponse(userText.toLowerCase());
      setMessages(prev => [...prev, { sender: 'bot', text: fallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '90%',
          maxWidth: '390px',
          height: '540px',
          backgroundColor: '#0b0f19',
          backgroundImage: 'linear-gradient(rgba(7, 11, 20, 0.82), rgba(7, 11, 20, 0.88)), url("/chat_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          borderRadius: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 999999,
          boxShadow: '0 15px 40px rgba(0, 240, 255, 0.25), 0 0 0 1px rgba(0,240,255,0.1)',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '0.85rem 1rem',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(139, 92, 246, 0.15))',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0,240,255,0.3), rgba(139,92,246,0.3))',
                border: '1.5px solid #00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 0 12px rgba(0, 240, 255, 0.35)',
              }}
            >
              <img
                src="/chatbot_avatar.png"
                alt="Sayraa AI Avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.98rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem', margin: 0 }}>
                Sayraa <Sparkles size={13} color="#00f0ff" />
              </h4>
              <span style={{ color: '#10b981', fontSize: '0.72rem' }}>● Online — Subham's AI Assistant</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setIsChatbotOpen(false)}
              title="Minimize Chat"
              style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              <Minus size={18} />
            </button>
            <button
              onClick={() => setIsChatbotOpen(false)}
              title="Close Chat"
              style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          onWheel={(e) => e.stopPropagation()}
          style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-start' }}
            >
              {msg.sender === 'bot' && (
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '1px solid #00f0ff',
                    overflow: 'hidden',
                    flexShrink: 0,
                    marginRight: '8px',
                    marginTop: '2px',
                    boxShadow: '0 0 6px rgba(0, 240, 255, 0.3)',
                  }}
                >
                  <img
                    src="/chatbot_avatar.png"
                    alt="Sayraa AI"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  maxWidth: '84%',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.sender === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                  background: msg.sender === 'user'
                    ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                    : 'rgba(17, 24, 39, 0.85)',
                  border: msg.sender === 'user' ? 'none' : '1px solid rgba(0, 240, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.6rem', color: '#00f0ff', fontSize: '0.82rem' }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '1px solid #00f0ff',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/chatbot_avatar.png"
                  alt="Sayraa AI"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                  }}
                />
              </div>
              <span>Sayraa soch rahi hai</span>
              <span style={{ letterSpacing: '2px' }}>...</span>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Questions (shown only on first message) */}
        {messages.length === 1 && (
          <div style={{ padding: '0 1rem 0.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {["Projects dikhao", "Skills kya hai?", "Contact karo"].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                }}
                style={{
                  background: 'rgba(0,240,255,0.07)',
                  border: '1px solid rgba(0,240,255,0.25)',
                  borderRadius: '20px',
                  color: '#00f0ff',
                  fontSize: '0.72rem',
                  padding: '0.3rem 0.7rem',
                  cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '0.75rem',
            backgroundColor: '#030712',
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            placeholder="Sayraa se kuch bhi poocho..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            style={{
              flex: 1,
              backgroundColor: '#0b0f19',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              padding: '0.6rem 1rem',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: "'Outfit', sans-serif",
              opacity: isTyping ? 0.6 : 1,
            }}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            style={{
              background: isTyping ? 'rgba(0,240,255,0.3)' : '#00f0ff',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#030712',
              cursor: isTyping ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <Send size={15} />
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiChatbot;

