import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FiGithub, FiMail, FiLinkedin, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import GradientOrb from '../components/GradientOrb'
import { personalInfo, socialLinks } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1]

/* ── social icon map ───────────────────────────────────────────────────────── */
const S_ICON = {
  whatsapp: { el: FaWhatsapp, color: '#25D366' },
}

/* ══════════════════════════════════════════════════════════════════════════════
   PARTICLE BURST — fires on form submit
══════════════════════════════════════════════════════════════════════════════ */
function ParticleBurst({ trigger }) {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    angle: (i / 22) * 360,
    dist:  60 + Math.random() * 80,
    size:  3 + Math.random() * 5,
    color: ['#06B6D4','#818CF8','#A855F7','#EC4899'][i % 4],
  }))

  return (
    <AnimatePresence>
      {trigger && particles.map(p => {
        const rad = (p.angle * Math.PI) / 180
        return (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: Math.cos(rad) * p.dist,
              y: Math.sin(rad) * p.dist,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: p.id * 0.015 }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: p.size, height: p.size, borderRadius: '50%',
              background: p.color, pointerEvents: 'none',
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        )
      })}
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   TERMINAL INPUT — each field looks like a terminal prompt line
══════════════════════════════════════════════════════════════════════════════ */
function TerminalField({ prompt, type = 'text', value, onChange, placeholder, multiline, icon }) {
  const [focused, setFocused] = useState(false)

  const shared = {
    background:  'transparent',
    border:      'none',
    outline:     'none',
    color:       '#E2E8F0',
    fontFamily:  "'Outfit', monospace",
    fontSize:    '0.9rem',
    flex:        1,
    resize:      'none',
    padding:     '0',
    caretColor:  '#06B6D4',
  }

  return (
    <motion.div
      animate={focused
        ? { borderColor: 'rgba(6,182,212,0.6)',  boxShadow: '0 0 0 1px rgba(6,182,212,0.2), 0 0 20px rgba(6,182,212,0.1)' }
        : { borderColor: 'rgba(255,255,255,0.08)', boxShadow: 'none' }
      }
      transition={{ duration: 0.2 }}
      style={{
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: multiline ? 'flex-start' : 'center',
        gap: '10px',
      }}
    >
      {/* prompt symbol */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <span style={{
          color: focused ? '#06B6D4' : '#334155',
          fontSize: '0.75rem', fontFamily: 'monospace',
          transition: 'color 0.2s', lineHeight: 1,
        }}>
          {icon}
        </span>
        <span style={{
          color: focused ? '#A855F7' : '#1e3a5f',
          fontSize: '0.8rem', fontFamily: 'monospace',
          fontWeight: 700, transition: 'color 0.2s',
        }}>
          {prompt}
        </span>
        <span style={{ color: '#06B6D4', fontFamily: 'monospace', fontSize: '0.8rem' }}>›</span>
      </div>

      {multiline
        ? <textarea
            rows={4}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...shared, lineHeight: 1.6 }}
          />
        : <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={shared}
          />
      }

      {/* blinking cursor when focused */}
      {focused && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ color: '#06B6D4', fontSize: '0.9rem', flexShrink: 0, lineHeight: 1 }}
        >▋</motion.span>
      )}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   HOLOGRAPHIC INFO CARD (left side)
══════════════════════════════════════════════════════════════════════════════ */
function HoloCard({ inView }) {
  const [hov, setHov] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setTilt({ x: (py - 0.5) * -14, y: (px - 0.5) * 14 })
  }

  const contactItems = [
    { icon: <FiMail size={18}/>,     label: 'Email',    value: 'madihaNoor@email.com', href: 'mailto:madihaNoor@email.com' },
    { icon: <FiLinkedin size={18}/>, label: 'LinkedIn', value: 'linkedin.com/in/madiha', href: '#' },
    { icon: <FiGithub size={18}/>,   label: 'GitHub',   value: 'github.com/madiha',     href: '#' },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        position: 'relative',
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
        borderRadius: '24px',
        padding: '3px',
        background: hov
          ? 'linear-gradient(135deg,#06B6D4,#6366F1,#A855F7)'
          : 'linear-gradient(135deg,rgba(6,182,212,0.4),rgba(168,85,247,0.3))',
        boxShadow: hov
          ? '0 30px 80px rgba(0,0,0,0.5), 0 0 50px rgba(6,182,212,0.2)'
          : '0 8px 40px rgba(0,0,0,0.4)',
        height: '100%',
      }}
    >
      {/* inner */}
      <div style={{
        borderRadius: '22px',
        background: 'rgba(5,11,20,0.92)',
        backdropFilter: 'blur(20px)',
        padding: '40px 36px',
        height: '100%',
        display: 'flex', flexDirection: 'column', gap: '32px',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* holographic shimmer overlay */}
        <motion.div
          animate={{ x: ['-100%','200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
          style={{
            position: 'absolute', top: 0, left: 0, width: '40%', height: '100%',
            background: 'linear-gradient(105deg,transparent 30%,rgba(6,182,212,0.06) 50%,transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        {/* top: status */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <motion.span
              animate={{ scale: [1,1.5,1], opacity: [1,0.3,1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#22C55E', boxShadow:'0 0 10px #22C55E', display:'block' }}
            />
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:'0.8rem', color:'#22C55E', fontWeight:600, letterSpacing:'0.1em' }}>
              AVAILABLE FOR WORK
            </span>
          </div>

          <h3 style={{
            fontFamily:"'Outfit',sans-serif", fontWeight:800,
            fontSize:'1.6rem', color:'#fff', margin:'0 0 8px',
            lineHeight: 1.2,
          }}>
            Let's build<br/>
            <span style={{
              background:'linear-gradient(90deg,#06B6D4,#A855F7)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>
              something great
            </span>
          </h3>
          <p style={{ color:'#475569', fontFamily:"'Outfit',sans-serif", fontSize:'0.875rem', margin:0, lineHeight:1.7 }}>
            I respond within 24 hours. Drop a message and let's turn your idea into reality.
          </p>
        </div>

        {/* contact items */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px', position:'relative', zIndex:1 }}>
          {contactItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              initial={{ opacity:0, x:-20 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ delay: 0.4 + i*0.1, ease }}
              whileHover={{ x: 4 }}
              style={{
                display:'flex', alignItems:'center', gap:'14px',
                padding:'12px 16px', borderRadius:'12px',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.06)',
                textDecoration:'none', transition:'all 0.25s ease',
                color:'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(6,182,212,0.08)'; e.currentTarget.style.borderColor='rgba(6,182,212,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.06)' }}
            >
              <div style={{
                width:'36px', height:'36px', borderRadius:'10px', flexShrink:0,
                background:'linear-gradient(135deg,rgba(6,182,212,0.2),rgba(168,85,247,0.2))',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#06B6D4',
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:'0.7rem', color:'#475569', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:'0.85rem', color:'#94A3B8', marginTop:'2px' }}>
                  {item.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* whatsapp button */}
        <div style={{ position:'relative', zIndex:1, marginTop:'auto' }}>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:'0.72rem', color:'#334155', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'12px', fontWeight:600 }}>
            Chat with me
          </p>
          <WhatsAppBtn />
        </div>

      </div>
    </motion.div>
  )
}

function SocialBtn({ href, icon, color, label }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width:'38px', height:'38px', borderRadius:'50%', display:'flex',
        alignItems:'center', justifyContent:'center', textDecoration:'none',
        background: hov ? `${color}22` : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hov ? color+'66' : 'rgba(255,255,255,0.08)'}`,
        color: hov ? color : '#475569',
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov ? `0 6px 20px ${color}44` : 'none',
        transition:'all 0.25s ease',
      }}
    >{icon}</a>
  )
}

/* ── WhatsApp CTA button ─────────────────────────────────────────────────── */
function WhatsAppBtn() {
  const [hov, setHov] = useState(false)
  return (
    <motion.a
      href="https://wa.me/923283974835"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '12px',
        padding:        '13px 24px',
        borderRadius:   '14px',
        background:     hov
          ? 'linear-gradient(135deg,#25D366,#128C7E)'
          : 'rgba(37,211,102,0.1)',
        border:         `1px solid ${hov ? 'transparent' : 'rgba(37,211,102,0.35)'}`,
        color:          hov ? '#fff' : '#25D366',
        textDecoration: 'none',
        fontFamily:     "'Outfit',sans-serif",
        fontWeight:     700,
        fontSize:       '0.9rem',
        boxShadow:      hov
          ? '0 0 28px rgba(37,211,102,0.55), 0 0 56px rgba(37,211,102,0.25)'
          : '0 0 14px rgba(37,211,102,0.15)',
        transition:     'all 0.3s ease',
        width:          '100%',
        justifyContent: 'center',
      }}
    >
      {/* pulsing dot */}
      <motion.span
        animate={{ scale:[1,1.5,1], opacity:[1,0.4,1] }}
        transition={{ duration:1.8, repeat:Infinity }}
        style={{
          width:'8px', height:'8px', borderRadius:'50%',
          background: hov ? '#fff' : '#25D366',
          boxShadow: `0 0 8px ${hov ? '#ffffff' : '#25D366'}`,
          display:'block', flexShrink:0,
        }}
      />
      <FaWhatsapp size={20} />
      Chat on WhatsApp
    </motion.a>
  )
}
/* ══════════════════════════════════════════════════════════════════════════════
   TERMINAL FORM (right side)
══════════════════════════════════════════════════════════════════════════════ */
function TerminalForm({ inView }) {
  const [form, setForm]       = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus]   = useState('idle')  // idle | sending | sent | error
  const [burst, setBurst]     = useState(false)
  const [cmdLog, setCmdLog]   = useState([])
  const btnRef = useRef(null)

  // fake submission
  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')
    setCmdLog(l => [...l, `> Connecting to madihanoor.dev...`])

    setTimeout(() => setCmdLog(l => [...l, `> Encrypting payload...`]),   600)
    setTimeout(() => setCmdLog(l => [...l, `> Sending message...`]),      1200)
    setTimeout(() => {
      setCmdLog(l => [...l, `> ✓ Message delivered successfully!`])
      setStatus('sent')
      setBurst(true)
      setTimeout(() => setBurst(false), 1000)
    }, 2200)
  }

  const upd = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <motion.div
      initial={{ opacity:0, x:60 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.8, ease, delay:0.15 }}
      style={{
        borderRadius:'24px', padding:'3px',
        background:'linear-gradient(135deg,rgba(99,102,241,0.4),rgba(168,85,247,0.3))',
        boxShadow:'0 8px 40px rgba(0,0,0,0.4)',
        height:'100%',
      }}
    >
      <div style={{
        borderRadius:'22px', background:'rgba(5,11,20,0.92)',
        backdropFilter:'blur(20px)', height:'100%',
        display:'flex', flexDirection:'column', overflow:'hidden',
      }}>

        {/* ── terminal top bar ─────────────────────────────────────────── */}
        <div style={{
          padding:'12px 20px', background:'rgba(0,0,0,0.3)',
          borderBottom:'1px solid rgba(255,255,255,0.06)',
          display:'flex', alignItems:'center', gap:'12px',
        }}>
          <div style={{ display:'flex', gap:'6px' }}>
            {['#EF4444','#F59E0B','#22C55E'].map(c => (
              <span key={c} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c, display:'block' }} />
            ))}
          </div>
          <span style={{ fontFamily:'monospace', fontSize:'12px', color:'#475569', flex:1, textAlign:'center' }}>
            madiha@portfolio:~/contact
          </span>
          <motion.span
            animate={{ opacity:[1,0.3,1] }}
            transition={{ duration:2, repeat:Infinity }}
            style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#22C55E', boxShadow:'0 0 6px #22C55E', display:'block' }}
          />
        </div>

        {/* ── form body ─────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} style={{ padding:'28px', display:'flex', flexDirection:'column', gap:'14px', flex:1 }}>

          {/* intro line */}
          <motion.div
            initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
            transition={{ delay:0.4 }}
            style={{ fontFamily:'monospace', fontSize:'12px', color:'#334155', marginBottom:'4px' }}
          >
            <span style={{ color:'#A855F7' }}>~/contact</span>
            <span style={{ color:'#475569' }}> $ </span>
            <span style={{ color:'#06B6D4' }}>send-message</span>
            <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration:1, repeat:Infinity }}
              style={{ color:'#06B6D4', marginLeft:'2px' }}>▋</motion.span>
          </motion.div>

          <TerminalField
            prompt="name"
            icon={<FiUser size={13}/>}
            value={form.name}
            onChange={upd('name')}
            placeholder="Your name"
          />
          <TerminalField
            prompt="email"
            type="email"
            icon={<FiMail size={13}/>}
            value={form.email}
            onChange={upd('email')}
            placeholder="your@email.com"
          />
          <TerminalField
            prompt="subject"
            icon={<FiMessageSquare size={13}/>}
            value={form.subject}
            onChange={upd('subject')}
            placeholder="What's this about?"
          />
          <TerminalField
            prompt="message"
            icon={<FiMessageSquare size={13}/>}
            value={form.message}
            onChange={upd('message')}
            placeholder="Your message..."
            multiline
          />

          {/* command log */}
          <AnimatePresence>
            {cmdLog.length > 0 && (
              <motion.div
                initial={{ opacity:0, height:0 }}
                animate={{ opacity:1, height:'auto' }}
                style={{
                  fontFamily:'monospace', fontSize:'11px',
                  background:'rgba(0,0,0,0.3)', borderRadius:'8px',
                  padding:'10px 14px', display:'flex', flexDirection:'column', gap:'4px',
                  border:'1px solid rgba(255,255,255,0.05)',
                }}
              >
                {cmdLog.map((line, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity:0, x:-10 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ duration:0.3 }}
                    style={{ color: line.includes('✓') ? '#22C55E' : '#475569' }}
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* submit button */}
          <div style={{ position:'relative', marginTop:'4px' }}>
            <ParticleBurst trigger={burst} />

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity:0, scale:0.9 }}
                  animate={{ opacity:1, scale:1 }}
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                    padding:'14px', borderRadius:'12px',
                    background:'linear-gradient(135deg,rgba(34,197,94,0.15),rgba(6,182,212,0.1))',
                    border:'1px solid rgba(34,197,94,0.3)',
                    color:'#22C55E', fontFamily:"'Outfit',sans-serif",
                    fontWeight:700, fontSize:'0.9rem',
                  }}
                >
                  <motion.span animate={{ rotate:[0,360] }} transition={{ duration:0.6 }}>✓</motion.span>
                  Message sent! I'll reply within 24h.
                </motion.div>
              ) : (
                <motion.button
                  key="send"
                  ref={btnRef}
                  type="submit"
                  whileHover={{ scale:1.02 }}
                  whileTap={{ scale:0.97 }}
                  disabled={status === 'sending'}
                  style={{
                    width:'100%', padding:'14px', borderRadius:'12px', border:'none',
                    background: status === 'sending'
                      ? 'rgba(6,182,212,0.2)'
                      : 'linear-gradient(135deg,#06B6D4,#6366F1,#A855F7)',
                    color:'#fff', fontFamily:"'Outfit',sans-serif",
                    fontWeight:700, fontSize:'0.9rem', cursor: status==='sending' ? 'wait' : 'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                    boxShadow: status !== 'sending'
                      ? '0 0 24px rgba(6,182,212,0.35), 0 0 48px rgba(168,85,247,0.2)' : 'none',
                    transition:'box-shadow 0.3s',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.span
                        animate={{ rotate:360 }}
                        transition={{ duration:1, repeat:Infinity, ease:'linear' }}
                        style={{ display:'inline-block' }}
                      >⟳</motion.span>
                      Sending…
                    </>
                  ) : (
                    <>
                      <FiSend size={16}/> Send Message
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </form>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════════════════════════ */
export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, amount:0.15 })

  return (
    <section
      id="contact"
      ref={ref}
      style={{ position:'relative', width:'100%', padding:'100px 0 120px', overflow:'hidden' }}
    >
      <GradientOrb color="rgba(6,182,212,0.7)"  size={500} top="-50px"  left="-80px"  opacity={0.12} delay={0}   />
      <GradientOrb color="rgba(168,85,247,0.7)" size={420} bottom="-50px" right="-80px" opacity={0.11} delay={2} />

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 60px', position:'relative', zIndex:1 }}>

        {/* ── header ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7, ease }}
          style={{ textAlign:'center', marginBottom:'64px' }}
        >
          <div style={{ marginBottom:'16px' }}>
            <span style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'6px 18px', borderRadius:'999px',
              border:'1px solid rgba(6,182,212,0.35)', background:'rgba(6,182,212,0.07)',
              color:'#67E8F9', fontSize:'13px', fontWeight:600,
              fontFamily:"'Outfit',sans-serif", letterSpacing:'0.08em', textTransform:'uppercase',
            }}>
              <span style={{
                width:'6px', height:'6px', borderRadius:'50%',
                background:'#06B6D4', boxShadow:'0 0 6px #06B6D4',
                animation:'pulse 2s ease-in-out infinite',
              }}/>
              Get In Touch
            </span>
          </div>

          <h2 style={{
            fontFamily:"'Outfit',sans-serif", fontWeight:800,
            fontSize:'clamp(2.2rem,4.5vw,3.4rem)', color:'#ffffff',
            margin:'0 0 12px', lineHeight:1.15,
          }}>
            Contact{' '}
            <span style={{
              background:'linear-gradient(90deg,#06B6D4,#818CF8,#A855F7)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>Me</span>
          </h2>
          <p style={{ color:'#475569', fontFamily:"'Outfit',sans-serif", fontSize:'1rem', margin:0 }}>
            Have a project, collab, or just want to say hi? I'm all ears.
          </p>
        </motion.div>

        {/* ── two-column: holo card | terminal form ─────────────────────── */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1.3fr',
          gap:'32px', alignItems:'stretch',
        }}
          className="contact-layout"
        >
          <HoloCard  inView={inView} />
          <TerminalForm inView={inView} />
        </div>

      </div>

      <style>{`
        .contact-layout { }
        @media (max-width:800px) {
          .contact-layout { grid-template-columns:1fr !important; }
        }
        input::placeholder, textarea::placeholder { color:#1e3a5f; }
      `}</style>
    </section>
  )
}
