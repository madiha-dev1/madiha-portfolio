// ─────────────────────────────────────────────────────────────────────────────
// agentKnowledge.js
// All Q&A knowledge for Madiha's AI chat agent.
// Add/edit answers here — no component code needs to change.
// ─────────────────────────────────────────────────────────────────────────────

export const agentName = "Madiha's AI"

export const agentAvatar = "/madiha-avatar.png" // optional, falls back to initials

// Greeting shown when chat opens
export const greeting =
  "Hi! I'm Madiha's AI assistant 👋 Ask me anything about her skills, projects, or how to hire her!"

// ── Knowledge base ────────────────────────────────────────────────────────────
// Each entry has:
//   keywords : string[]  — if user message includes ANY of these (case-insensitive), this answer fires
//   answer   : string    — the response text (supports \n for line breaks)
// Entries are checked top-to-bottom; first match wins.

export const knowledge = [
  {
    keywords: ["hello", "hi", "hey", "salam", "assalam", "yo", "sup"],
    answer:   "Hello! 😊 Great to meet you. I'm Madiha's personal AI. Ask me about her work, skills, or how to get in touch!",
  },
  {
    keywords: ["who are you", "what are you", "tell me about yourself", "introduce"],
    answer:   "I'm an AI assistant built for Madiha Noor's portfolio. I can tell you all about her skills, projects, education, and how to hire her. What would you like to know?",
  },
  {
    keywords: ["madiha", "who is madiha", "about madiha", "tell me about madiha"],
    answer:   "Madiha Noor is a passionate Full Stack Developer and Aptech student with a deep interest in AI/ML and Robotics. She loves turning ideas into clean, functional web experiences — from front-end design to back-end logic. 🚀",
  },
  {
    keywords: ["skill", "skills", "technologies", "tech stack", "know", "expertise", "good at"],
    answer:   "Madiha's skill set includes:\n\n💻 Frontend: React.js, HTML, CSS, Tailwind CSS\n⚙️ Backend: Node.js, Express.js\n🗄️ Database: MongoDB, MySQL\n🤖 Interests: AI/ML, Robotics\n🛠️ Tools: Git, VS Code, Figma",
  },
  {
    keywords: ["project", "projects", "work", "portfolio", "built", "made"],
    answer:   "Madiha has worked on several exciting projects including full-stack web apps, AI-integrated tools, and responsive portfolio sites. Check the Projects section on this page for the full showcase! 🛠️",
  },
  {
    keywords: ["education", "study", "student", "aptech", "degree", "college", "university"],
    answer:   "Madiha is currently studying at Aptech Computer Education, pursuing a diploma in Software Engineering. She's constantly learning and growing in the field of tech! 🎓",
  },
  {
    keywords: ["experience", "years", "how long", "professional"],
    answer:   "Madiha is an emerging developer actively building real-world projects and expanding her professional experience. She brings fresh energy, modern skills, and a strong work ethic to every project.",
  },
  {
    keywords: ["hire", "available", "freelance", "work with", "collaborate", "project together"],
    answer:   "Yes! Madiha is available for freelance projects and collaborations. 🎉\n\nShe's open to:\n• Full-stack web development\n• Frontend (React/Tailwind)\n• AI-integrated web apps\n\nHit the 'Hire Me' button or scroll to the Contact section to reach out!",
  },
  {
    keywords: ["contact", "email", "reach", "get in touch", "message", "whatsapp"],
    answer:   "You can contact Madiha through the Contact section on this page, or use the 'Hire Me' button. She responds quickly! 📩",
  },
  {
    keywords: ["service", "services", "offer", "what do you do", "what can you do"],
    answer:   "Madiha offers:\n\n🌐 Full Stack Web Development\n🎨 UI/UX Design with Tailwind & Figma\n⚛️ React.js Frontend Development\n🔧 Backend APIs with Node & Express\n🤖 AI/ML integration into web apps",
  },
  {
    keywords: ["react", "tailwind", "node", "mongodb", "javascript", "frontend", "backend"],
    answer:   "That's right in Madiha's wheelhouse! She works with React, Tailwind CSS, Node.js, Express, and MongoDB on a daily basis. She's comfortable with both frontend and backend development. 💪",
  },
  {
    keywords: ["ai", "ml", "machine learning", "artificial intelligence", "robotics"],
    answer:   "AI/ML and Robotics are Madiha's biggest passions beyond web dev! She's actively exploring these fields and loves integrating intelligent features into her projects. 🤖✨",
  },
  {
    keywords: ["github", "code", "repository", "open source"],
    answer:   "You can find Madiha's code and open source work on her GitHub profile. Check the social links on this portfolio page! 🐙",
  },
  {
    keywords: ["linkedin", "social", "connect", "network"],
    answer:   "Connect with Madiha on LinkedIn — the link is available in the portfolio's social section. She loves networking with fellow developers and potential collaborators! 🔗",
  },
  {
    keywords: ["location", "where", "city", "country", "based", "from"],
    answer:   "Madiha is based in Pakistan 🇵🇰 and works with clients and teams globally. Remote collaboration is absolutely fine!",
  },
  {
    keywords: ["price", "cost", "rate", "charge", "fee", "budget"],
    answer:   "Madiha's rates depend on the project scope and timeline. Reach out through the Contact section to discuss your project and get a custom quote! 💬",
  },
  {
    keywords: ["language", "speak", "urdu", "english"],
    answer:   "Madiha is fluent in both Urdu 🇵🇰 and English 🇬🇧 — so feel free to chat in either language!",
  },
  {
    keywords: ["fun", "hobby", "hobbies", "interest", "free time"],
    answer:   "Outside of coding, Madiha loves exploring AI research, listening to music 🎧, and leveling up her skills every day. The 'focus, learn, grow' mindset is real! 💜",
  },
  {
    keywords: ["thanks", "thank you", "thankyou", "great", "awesome", "nice", "good", "perfect"],
    answer:   "You're so welcome! 😊 Feel free to ask anything else. I'm always here to help!",
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "cya"],
    answer:   "Goodbye! 👋 It was great chatting. Don't forget to check out Madiha's work and feel free to reach out anytime!",
  },
]

// Fallback when no keyword matches
export const fallbackAnswer =
  "Hmm, I'm not sure about that one! 🤔 Try asking about Madiha's skills, projects, services, or how to hire her. Or scroll to the Contact section to ask her directly!"
