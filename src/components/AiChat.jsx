import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { knowledge, fallbackAnswer, greeting, agentName } from '../data/agentKnowledge'

// ── simple keyword matcher ────────────────────────────────────────────────────
function getAnswer(input) {
  const lower = input.toLowerCase().trim()
  for (const entry of knowledge) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.answer
    }
  }
  return fallbackAnswer
}

// ── render answer with \n as line breaks ─────────────────────────────────────
function MessageText({ text }) {
  return (
    <span style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
      {text}
    </span>
  )
}

// ── typing indicator (three bouncing dots) ────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display:'flex', gap:'5px', alignItems:'center', padding:'4px 2px' }}>
      {[0,1,2].map(i => (
        <motion.span
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          style={{
            width:'7px', height:'7px', borderRadius:'50%',
            background:'linear-gradient(135deg,#06B6D4,#A855F7)',
            display:'block',
          }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AiChat() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([
    { from: 'agent', text: greeting, id: 0 },
  ])
  const [input,    setInput]    = useState('')
  const [typing,   setTyping]   = useState(false)   // agent "thinking" state
  const [unread,   setUnread]   = useState(0)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)
  const msgId      = useRef(1)

  // scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
      setUnread(0)
    }
  }, [open])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return

    // add user message
    setMessages(prev => [...prev, { from: 'user', text, id: msgId.current++ }])
    setInput('')
    setTyping(true)

    // simulate agent thinking delay (800–1400ms)
    const delay = 800 + Math.random() * 600
    setTimeout(() => {
      const answer = getAnswer(text)
      setTyping(false)
      setMessages(prev => [...prev, { from: 'agent', text: answer, id: msgId.current++ }])
      if (!open) setUnread(n => n + 1)
    }, delay)
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // ── suggested quick questions ─────────────────────────────────────────────
  const suggestions = ['Skills', 'Hire her', 'Projects', 'Contact']

  return (
    <>
      {/* ── Floating toggle button ─────────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Toggle AI chat"
        style={{
          position:       'fixed',
          bottom:         '32px',
          right:          '32px',
          zIndex:         9000,
          width:          '58px',
          height:         '58px',
          borderRadius:   '50%',
          border:         'none',
          cursor:         'pointer',
          background:     'linear-gradient(135deg,#06B6D4,#6366F1,#A855F7)',
          boxShadow:      '0 0 24px rgba(6,182,212,0.55), 0 0 48px rgba(168,85,247,0.35)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          color:          '#fff',
          fontSize:       '1.5rem',
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="close"
                initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }}
                exit={{ rotate:90, opacity:0 }} transition={{ duration:0.2 }}
                style={{ lineHeight:1 }}>✕</motion.span>
            : <motion.span key="open"
                initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }}
                exit={{ scale:0.5, opacity:0 }} transition={{ duration:0.2 }}
                style={{ fontSize:'1.4rem' }}>🤖</motion.span>
          }
        </AnimatePresence>

        {/* unread badge */}
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.span
              initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
              style={{
                position:'absolute', top:'-4px', right:'-4px',
                background:'#EF4444', color:'#fff',
                width:'20px', height:'20px', borderRadius:'50%',
                fontSize:'11px', fontWeight:700,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat window ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity:0, y:30, scale:0.95 }}
            animate={{ opacity:1, y:0,  scale:1   }}
            exit={{   opacity:0, y:30, scale:0.95 }}
            transition={{ duration:0.28, ease:'easeOut' }}
            style={{
              position:       'fixed',
              bottom:         '104px',
              right:          '32px',
              zIndex:         8999,
              width:          'min(380px, calc(100vw - 32px))',
              height:         'min(520px, calc(100vh - 140px))',  /* never overflows screen */
              maxHeight:      '520px',
              borderRadius:   '20px',
              overflow:       'hidden',
              display:        'flex',
              flexDirection:  'column',
              border:         '1px solid rgba(6,182,212,0.2)',
              boxShadow:      '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(6,182,212,0.1)',
              background:     '#080F1C',
            }}
          >

            {/* ── Header ──────────────────────────────────────────────────── */}
            <div
              style={{
                padding:        '16px 20px',
                background:     'linear-gradient(135deg,rgba(6,182,212,0.15),rgba(168,85,247,0.15))',
                borderBottom:   '1px solid rgba(255,255,255,0.06)',
                display:        'flex',
                alignItems:     'center',
                gap:            '12px',
                flexShrink:     0,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width:'40px', height:'40px', borderRadius:'50%',
                  background:'linear-gradient(135deg,#06B6D4,#A855F7)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.2rem', flexShrink:0,
                  boxShadow:'0 0 12px rgba(6,182,212,0.5)',
                }}
              >
                🤖
              </div>

              <div>
                <div style={{ color:'#fff', fontWeight:700, fontSize:'0.95rem', fontFamily:"'Outfit',sans-serif" }}>
                  {agentName}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'5px', marginTop:'2px' }}>
                  <motion.span
                    animate={{ opacity:[1,0.3,1] }}
                    transition={{ duration:2, repeat:Infinity }}
                    style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22C55E', display:'block' }}
                  />
                  <span style={{ color:'#94A3B8', fontSize:'11px' }}>Online — always here</span>
                </div>
              </div>
            </div>

            {/* ── Messages area ───────────────────────────────────────────── */}
            <div
              style={{
                flex:       1,
                overflowY:  'auto',
                padding:    '16px',
                display:    'flex',
                flexDirection:'column',
                gap:        '12px',
                scrollbarWidth:'thin',
                scrollbarColor:'rgba(6,182,212,0.3) transparent',
              }}
            >
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity:0, y:10 }}
                  animate={{ opacity:1, y:0  }}
                  transition={{ duration:0.25 }}
                  style={{
                    display:        'flex',
                    justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth:     '82%',
                      padding:      '10px 14px',
                      borderRadius: msg.from === 'user'
                        ? '16px 16px 4px 16px'
                        : '16px 16px 16px 4px',
                      background:   msg.from === 'user'
                        ? 'linear-gradient(135deg,#06B6D4,#6366F1)'
                        : 'rgba(255,255,255,0.06)',
                      border:       msg.from === 'agent'
                        ? '1px solid rgba(255,255,255,0.07)'
                        : 'none',
                      color:        '#E2E8F0',
                      fontSize:     '0.875rem',
                      fontFamily:   "'Outfit',sans-serif",
                      boxShadow:    msg.from === 'user'
                        ? '0 4px 16px rgba(6,182,212,0.25)'
                        : 'none',
                    }}
                  >
                    <MessageText text={msg.text} />
                  </div>
                </motion.div>
              ))}

              {/* typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity:0, y:8 }}
                    animate={{ opacity:1, y:0 }}
                    exit={{   opacity:0 }}
                    style={{ display:'flex', justifyContent:'flex-start' }}
                  >
                    <div style={{
                      padding:'10px 14px',
                      borderRadius:'16px 16px 16px 4px',
                      background:'rgba(255,255,255,0.06)',
                      border:'1px solid rgba(255,255,255,0.07)',
                    }}>
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* ── Quick suggestions ───────────────────────────────────────── */}
            <div
              style={{
                padding:        '8px 16px',
                display:        'flex',
                gap:            '8px',
                flexWrap:       'wrap',
                borderTop:      '1px solid rgba(255,255,255,0.05)',
                flexShrink:     0,
                background:     '#080F1C',
              }}
            >
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { setInput(s); setTimeout(() => sendMessage(), 10) }}
                  onMouseDown={e => {
                    // fire immediately on mousedown for responsiveness
                    e.preventDefault()
                    setMessages(prev => [...prev, { from:'user', text:s, id:msgId.current++ }])
                    setTyping(true)
                    const delay = 800 + Math.random() * 500
                    setTimeout(() => {
                      setTyping(false)
                      setMessages(prev => [...prev, { from:'agent', text:getAnswer(s), id:msgId.current++ }])
                    }, delay)
                  }}
                  style={{
                    padding:      '4px 12px',
                    borderRadius: '999px',
                    border:       '1px solid rgba(6,182,212,0.35)',
                    background:   'rgba(6,182,212,0.07)',
                    color:        '#67E8F9',
                    fontSize:     '11px',
                    fontWeight:   500,
                    cursor:       'pointer',
                    fontFamily:   "'Outfit',sans-serif",
                    transition:   'all 0.2s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* ── Input bar ───────────────────────────────────────────────── */}
            <div
              style={{
                padding:      '12px 16px',
                display:      'flex',
                gap:          '10px',
                alignItems:   'center',
                borderTop:    '1px solid rgba(255,255,255,0.06)',
                background:   '#080F1C',
                flexShrink:   0,
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask me anything…"
                style={{
                  flex:         1,
                  background:   'rgba(255,255,255,0.05)',
                  border:       '1px solid rgba(6,182,212,0.25)',
                  borderRadius: '12px',
                  padding:      '10px 14px',
                  color:        '#E2E8F0',
                  fontSize:     '0.875rem',
                  fontFamily:   "'Outfit',sans-serif",
                  outline:      'none',
                }}
              />
              <motion.button
                onClick={sendMessage}
                whileHover={{ scale:1.08 }}
                whileTap={{ scale:0.92 }}
                disabled={!input.trim()}
                style={{
                  width:          '40px',
                  height:         '40px',
                  borderRadius:   '12px',
                  border:         'none',
                  background:     input.trim()
                    ? 'linear-gradient(135deg,#06B6D4,#A855F7)'
                    : 'rgba(255,255,255,0.07)',
                  color:          input.trim() ? '#fff' : '#475569',
                  cursor:         input.trim() ? 'pointer' : 'default',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontSize:       '1.1rem',
                  flexShrink:     0,
                  transition:     'background 0.2s',
                  boxShadow:      input.trim() ? '0 0 14px rgba(6,182,212,0.4)' : 'none',
                }}
              >
                ➤
              </motion.button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
