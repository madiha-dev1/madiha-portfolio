import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import GradientOrb from '../components/GradientOrb'
import { projects } from '../data/projects'

/* ─── tiny helpers ─────────────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1]

function Tag({ children, color }) {
  return (
    <span style={{
      padding: '3px 10px', borderRadius: '999px',
      background: `linear-gradient(135deg,${color[0]}22,${color[1]}22)`,
      border: `1px solid ${color[0]}44`,
      color: color[0], fontSize: '11px', fontWeight: 600,
      fontFamily: "'Outfit',sans-serif", letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  )
}

/* ─── big browser-style mockup window ─────────────────────────────────────── */
function MockupWindow({ project }) {
  return (
    <div style={{
      width: '100%', borderRadius: '16px', overflow: 'hidden',
      background: '#0A1628',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
    }}>
      {/* browser chrome bar */}
      <div style={{
        padding: '10px 16px', background: '#0D1F35',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        {/* traffic lights */}
        <div style={{ display:'flex', gap:'6px' }}>
          {['#EF4444','#F59E0B','#22C55E'].map(c => (
            <span key={c} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c, display:'block' }} />
          ))}
        </div>
        {/* fake URL bar */}
        <div style={{
          flex:1, height:'22px', borderRadius:'6px',
          background:'rgba(255,255,255,0.05)',
          display:'flex', alignItems:'center', paddingLeft:'10px',
          gap:'6px',
        }}>
          <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22C55E', boxShadow:'0 0 6px #22C55E' }} />
          <span style={{ color:'#475569', fontSize:'11px', fontFamily:"'Outfit',sans-serif" }}>
            madihanoor.dev/{project.title.toLowerCase().replace(/\s+/g,'-')}
          </span>
        </div>
      </div>

      {/* "screen" content */}
      <div style={{
        aspectRatio: '16/9', position:'relative', overflow:'hidden',
        background: `linear-gradient(135deg, ${project.color[0]}18 0%, #050B14 50%, ${project.color[1]}14 100%)`,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        {/* grid lines inside mockup */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),' +
            'linear-gradient(90deg,rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize:'30px 30px',
        }} />

        {/* giant emoji as placeholder art */}
        <motion.div
          key={project.id}
          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
          animate={{ scale: 1,   opacity: 1, rotate: 0   }}
          exit={{   scale: 0.5,  opacity: 0, rotate: 15  }}
          transition={{ duration: 0.5, ease }}
          style={{ fontSize:'clamp(5rem,12vw,9rem)', lineHeight:1, filter:'drop-shadow(0 0 40px rgba(6,182,212,0.4))' }}
        >
          {project.mockEmoji}
        </motion.div>

        {/* animated gradient glow in screen */}
        <motion.div
          key={`glow-${project.id}`}
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:0.6 }}
          style={{
            position:'absolute', inset:0, pointerEvents:'none',
            background: `radial-gradient(ellipse 60% 60% at 50% 50%,
              ${project.color[0]}20 0%, transparent 70%)`,
          }}
        />

        {/* floating tech pills inside screen */}
        <div style={{
          position:'absolute', bottom:'16px', left:0, right:0,
          display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap', padding:'0 20px',
        }}>
          {project.tech.map((t,i) => (
            <motion.span
              key={t}
              initial={{ y:20, opacity:0 }}
              animate={{ y:0,  opacity:1 }}
              transition={{ delay: 0.3 + i*0.07, ease }}
              style={{
                padding:'4px 12px', borderRadius:'999px',
                background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
                border:'1px solid rgba(255,255,255,0.1)',
                color:'#94A3B8', fontSize:'11px', fontWeight:500,
                fontFamily:"'Outfit',sans-serif",
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── project list row ─────────────────────────────────────────────────────── */
function ProjectRow({ project, isActive, onClick, index }) {
  const [hov, setHov] = useState(false)
  const active = isActive || hov

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity:0, x:40 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.5, delay: index*0.1, ease }}
      style={{
        all:'unset', cursor:'pointer', display:'block', width:'100%',
        padding:'20px 24px', borderRadius:'16px',
        background: isActive
          ? `linear-gradient(135deg,${project.color[0]}18,${project.color[1]}12)`
          : hov ? 'rgba(255,255,255,0.03)' : 'transparent',
        border: `1px solid ${isActive
          ? project.color[0]+'55'
          : hov ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
        transition:'all 0.25s ease',
        position:'relative', overflow:'hidden',
        boxShadow: isActive ? `0 0 30px ${project.color[0]}20` : 'none',
      }}
    >
      {/* active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="activeBar"
          style={{
            position:'absolute', left:0, top:0, bottom:0, width:'3px',
            background:`linear-gradient(to bottom,${project.color[0]},${project.color[1]})`,
            borderRadius:'0 2px 2px 0',
          }}
        />
      )}

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px' }}>
        <div style={{ flex:1, minWidth:0 }}>
          {/* number + year */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px' }}>
            <span style={{
              fontFamily:"'Outfit',sans-serif", fontWeight:800,
              fontSize:'0.75rem', letterSpacing:'0.1em',
              color: isActive ? project.color[0] : '#334155',
              transition:'color 0.25s',
            }}>
              {String(index+1).padStart(2,'0')}
            </span>
            <span style={{
              height:'1px', flex:1,
              background: isActive
                ? `linear-gradient(90deg,${project.color[0]},transparent)`
                : 'rgba(255,255,255,0.06)',
              transition:'background 0.3s',
            }} />
            <span style={{ color:'#334155', fontSize:'11px', fontFamily:"'Outfit',sans-serif" }}>
              {project.year}
            </span>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' }}>
            <span style={{
              fontFamily:"'Outfit',sans-serif", fontWeight:700,
              fontSize:'1rem', color: active ? '#F1F5F9' : '#64748B',
              transition:'color 0.25s',
            }}>
              {project.title}
            </span>
            <Tag color={project.color}>{project.tag}</Tag>
          </div>
        </div>

        {/* arrow */}
        <motion.div
          animate={{ x: active ? 0 : -6, opacity: active ? 1 : 0.3 }}
          transition={{ duration:0.25 }}
          style={{ color: project.color[0], flexShrink:0 }}
        >
          <FiArrowRight size={18} />
        </motion.div>
      </div>
    </motion.button>
  )
}

/* ─── main section ─────────────────────────────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState(0)
  const current = projects[active]
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once:true, amount:0.15 })

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ position:'relative', width:'100%', padding:'100px 0 120px', overflow:'hidden' }}
    >
      {/* bg orbs */}
      <GradientOrb color="rgba(99,102,241,0.7)"  size={500} top="0"    left="-100px" opacity={0.12} delay={0} />
      <GradientOrb color="rgba(168,85,247,0.7)"  size={400} bottom="0" right="-80px" opacity={0.11} delay={2} />

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 60px', position:'relative', zIndex:1 }}>

        {/* ── header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7, ease }}
          style={{ marginBottom:'64px' }}
        >
          {/* pill */}
          <div style={{ marginBottom:'16px' }}>
            <span style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'6px 18px', borderRadius:'999px',
              border:'1px solid rgba(6,182,212,0.35)',
              background:'rgba(6,182,212,0.07)',
              color:'#67E8F9', fontSize:'13px', fontWeight:600,
              fontFamily:"'Outfit',sans-serif", letterSpacing:'0.08em', textTransform:'uppercase',
            }}>
              <span style={{
                width:'6px',height:'6px',borderRadius:'50%',
                background:'#06B6D4',boxShadow:'0 0 6px #06B6D4',
                animation:'pulse 2s ease-in-out infinite',
              }}/>
              My Work
            </span>
          </div>

          <h2 style={{
            fontFamily:"'Outfit',sans-serif", fontWeight:800,
            fontSize:'clamp(2.2rem,4.5vw,3.4rem)', color:'#ffffff',
            margin:'0 0 12px', lineHeight:1.15,
          }}>
            Featured{' '}
            <span style={{
              background:'linear-gradient(90deg,#06B6D4,#818CF8,#A855F7)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>Projects</span>
          </h2>

          <p style={{ color:'#475569', fontFamily:"'Outfit',sans-serif", fontSize:'1rem', margin:0 }}>
            Click any project to explore it in full detail.
          </p>
        </motion.div>

        {/* ── main layout: mockup LEFT | list RIGHT ───────────────────────── */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'1.15fr 0.85fr',
          gap:'48px', alignItems:'start',
        }}
          className="projects-layout"
        >

          {/* ── LEFT: big live preview ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity:0, x:-50 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.8, ease, delay:0.2 }}
          >
            {/* mockup */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity:0, y:24, scale:0.97 }}
                animate={{ opacity:1, y:0,  scale:1    }}
                exit={{   opacity:0, y:-16, scale:0.97 }}
                transition={{ duration:0.45, ease }}
              >
                <MockupWindow project={current} />
              </motion.div>
            </AnimatePresence>

            {/* description + links below mockup */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${current.id}`}
                initial={{ opacity:0, y:12 }}
                animate={{ opacity:1, y:0  }}
                exit={{   opacity:0, y:-8  }}
                transition={{ duration:0.4, ease, delay:0.1 }}
                style={{ marginTop:'28px' }}
              >
                <p style={{
                  color:'#94A3B8', fontFamily:"'Outfit',sans-serif",
                  fontSize:'0.95rem', lineHeight:1.8, margin:'0 0 20px',
                  borderLeft:`2px solid ${current.color[0]}66`, paddingLeft:'16px',
                }}>
                  {current.desc}
                </p>

                <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
                  <LinkBtn href={current.live} color={current.color} icon={<FiExternalLink size={15}/>} label="Live Preview" filled />
                  <LinkBtn href={current.github} color={current.color} icon={<FiGithub size={15}/>} label="View Code" />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: project list ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity:0, x:50 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.8, ease, delay:0.3 }}
            style={{ display:'flex', flexDirection:'column', gap:'8px' }}
          >
            {/* count header */}
            <div style={{
              display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px', paddingLeft:'24px',
            }}>
              <span style={{
                fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:'0.75rem',
                color:'#334155', letterSpacing:'0.12em', textTransform:'uppercase',
              }}>
                Projects
              </span>
              <span style={{
                padding:'2px 10px', borderRadius:'999px',
                background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.25)',
                color:'#06B6D4', fontSize:'11px', fontWeight:700, fontFamily:"'Outfit',sans-serif",
              }}>
                {projects.length}
              </span>
            </div>

            {projects.map((p, i) => (
              <ProjectRow
                key={p.id}
                project={p}
                index={i}
                isActive={active === i}
                onClick={() => setActive(i)}
              />
            ))}

            {/* progress dots */}
            <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginTop:'20px' }}>
              {projects.map((p,i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  whileHover={{ scale:1.3 }}
                  whileTap={{ scale:0.9 }}
                  style={{
                    all:'unset', cursor:'pointer',
                    width: active===i ? '24px' : '8px',
                    height:'8px', borderRadius:'999px',
                    background: active===i
                      ? `linear-gradient(90deg,${p.color[0]},${p.color[1]})`
                      : 'rgba(255,255,255,0.15)',
                    transition:'all 0.3s ease',
                    boxShadow: active===i ? `0 0 10px ${p.color[0]}88` : 'none',
                  }}
                />
              ))}
            </div>
          </motion.div>

        </div>{/* end grid */}

        {/* ── bottom CTA ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, delay:0.2, ease }}
          style={{ marginTop:'80px', textAlign:'center' }}
        >
          <p style={{
            color:'#334155', fontFamily:"'Outfit',sans-serif",
            fontSize:'0.9rem', marginBottom:'16px', letterSpacing:'0.05em',
          }}>
            Want to see more?
          </p>
          <a
            href="#"
            style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'12px 32px', borderRadius:'999px',
              border:'1px solid rgba(6,182,212,0.35)',
              background:'rgba(6,182,212,0.07)',
              color:'#67E8F9', fontFamily:"'Outfit',sans-serif",
              fontWeight:600, fontSize:'0.9rem', textDecoration:'none',
              transition:'all 0.3s ease',
            }}
            onMouseEnter={e=>{
              e.currentTarget.style.background='rgba(6,182,212,0.15)'
              e.currentTarget.style.boxShadow='0 0 24px rgba(6,182,212,0.3)'
            }}
            onMouseLeave={e=>{
              e.currentTarget.style.background='rgba(6,182,212,0.07)'
              e.currentTarget.style.boxShadow='none'
            }}
          >
            <FiGithub size={16}/> View All on GitHub
          </a>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .projects-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ── small link button ────────────────────────────────────────────────────── */
function LinkBtn({ href, color, icon, label, filled }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:'inline-flex', alignItems:'center', gap:'7px',
        padding:'10px 22px', borderRadius:'999px',
        background: filled
          ? (hov ? `linear-gradient(135deg,${color[0]},${color[1]})` : `linear-gradient(135deg,${color[0]}cc,${color[1]}cc)`)
          : (hov ? 'rgba(255,255,255,0.07)' : 'transparent'),
        border:`1px solid ${filled ? 'transparent' : 'rgba(255,255,255,0.12)'}`,
        color: filled ? '#fff' : (hov ? '#F1F5F9' : '#64748B'),
        fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.85rem',
        textDecoration:'none',
        boxShadow: filled && hov ? `0 0 24px ${color[0]}66` : 'none',
        transition:'all 0.25s ease',
      }}
    >
      {icon}{label}
    </a>
  )
}


