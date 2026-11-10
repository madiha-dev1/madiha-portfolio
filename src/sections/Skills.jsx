import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss,
  SiBootstrap, SiWordpress, SiShopify, SiNodedotjs,
  SiGit, SiFigma,
} from 'react-icons/si'
import { TbBrandCSharp }  from 'react-icons/tb'
import { MdAutoAwesome }  from 'react-icons/md'
import { VscCode }        from 'react-icons/vsc'
import GradientOrb from '../components/GradientOrb'
import { skillCategories } from '../data/skills'

/* ── icon map ───────────────────────────────────────────────────────────────── */
const ICON = {
  html:      SiHtml5,
  css:       SiCss,
  js:        SiJavascript,
  react:     SiReact,
  tailwind:  SiTailwindcss,
  bootstrap: SiBootstrap,
  csharp:    TbBrandCSharp,
  wordpress: SiWordpress,
  shopify:   SiShopify,
  node:      SiNodedotjs,
  git:       SiGit,
  figma:     SiFigma,
  vscode:    VscCode,
  ai:        MdAutoAwesome,
}

const ease = [0.22, 1, 0.36, 1]

/* ══════════════════════════════════════════════════════════════════════════════
   SKILL CARD — big icon + animated level bar + floating glow
══════════════════════════════════════════════════════════════════════════════ */
function SkillCard({ skill, index, inView }) {
  const [hov, setHov] = useState(false)
  const Icon = ICON[skill.icon] || MdAutoAwesome
  const barRef = useRef(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:      'relative',
        borderRadius:  '20px',
        padding:       '2px',
        background:    hov
          ? `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`
          : 'linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))',
        boxShadow:     hov
          ? `0 12px 40px rgba(0,0,0,0.4), 0 0 30px ${skill.color}44`
          : '0 4px 20px rgba(0,0,0,0.3)',
        transform:     hov ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
        transition:    'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
        cursor:        'default',
      }}
    >
      <div style={{
        borderRadius:   '18px',
        padding:        '22px 18px',
        background:     'rgba(8,15,28,0.85)',
        backdropFilter: 'blur(12px)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            '12px',
        position:       'relative',
        overflow:       'hidden',
      }}>

        {/* glow blob behind icon */}
        <div style={{
          position:   'absolute', top: '-20px', left: '50%',
          transform:  'translateX(-50%)',
          width:      '80px', height: '80px', borderRadius: '50%',
          background: skill.color,
          filter:     'blur(30px)',
          opacity:    hov ? 0.35 : 0.12,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }} />

        {/* icon */}
        <motion.div
          animate={hov ? { rotate: [0, -8, 8, 0], scale: 1.15 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize:   '2.2rem',
            color:      hov ? skill.color : '#64748B',
            transition: 'color 0.3s',
            filter:     hov ? `drop-shadow(0 0 10px ${skill.color}99)` : 'none',
            zIndex:     1,
          }}
        >
          <Icon />
        </motion.div>

        {/* name */}
        <span style={{
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 700, fontSize: '0.82rem',
          color:      hov ? '#F1F5F9' : '#94A3B8',
          transition: 'color 0.3s',
          textAlign:  'center', zIndex: 1,
        }}>
          {skill.name}
        </span>

        {/* level bar */}
        <div style={{
          width: '100%', height: '4px', borderRadius: '99px',
          background: 'rgba(255,255,255,0.07)', overflow: 'hidden', zIndex: 1,
        }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={inView ? { width: `${skill.level}%` } : { width: '0%' }}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.05, ease: 'easeOut' }}
            style={{
              height: '100%', borderRadius: '99px',
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
              boxShadow: `0 0 8px ${skill.color}66`,
            }}
          />
        </div>

        {/* level % */}
        <span style={{
          fontFamily: "'Outfit',sans-serif", fontWeight: 700,
          fontSize: '0.72rem', color: hov ? skill.color : '#334155',
          transition: 'color 0.3s', zIndex: 1,
        }}>
          {skill.level}%
        </span>

      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   CATEGORY PANEL — tab header + grid of skill cards
══════════════════════════════════════════════════════════════════════════════ */
function CategoryPanel({ cat, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
        gap: '14px',
        marginTop: '32px',
      }}>
        {cat.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
        ))}
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   FLOATING SKILL BUBBLES (decorative constellation in background)
══════════════════════════════════════════════════════════════════════════════ */
function ConstellationBg() {
  const allIcons = Object.entries(ICON)
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      overflow: 'hidden', zIndex: 0,
    }}>
      {allIcons.map(([key, Ic], i) => {
        const positions = [
          { top:'8%',  left:'4%'  }, { top:'15%', left:'92%' },
          { top:'70%', left:'3%'  }, { top:'78%', left:'89%' },
          { top:'40%', left:'1%'  }, { top:'45%', left:'96%' },
          { top:'88%', left:'20%' }, { top:'85%', left:'75%' },
          { top:'5%',  left:'50%' }, { top:'92%', left:'48%' },
          { top:'25%', left:'7%'  }, { top:'60%', left:'94%' },
          { top:'30%', left:'88%' }, { top:'55%', left:'5%'  },
        ]
        const pos = positions[i % positions.length]
        return (
          <motion.div
            key={key}
            animate={{ y: [0, -12, 0], opacity: [0.07, 0.14, 0.07] }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
            style={{
              position: 'absolute',
              ...pos,
              fontSize: '1.5rem',
              color: '#ffffff',
              filter: 'blur(0.5px)',
            }}
          >
            <Ic />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   OVERALL PROFICIENCY RING (circular SVG progress per category)
══════════════════════════════════════════════════════════════════════════════ */
function ProficiencyRing({ cat, inView, isActive, onClick }) {
  const avg = Math.round(cat.skills.reduce((s, k) => s + k.level, 0) / cat.skills.length)
  const r = 36, circ = 2 * Math.PI * r
  const [hov, setHov] = useState(false)

  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        all: 'unset', cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '10px',
        padding: '20px 24px', borderRadius: '18px',
        background: isActive
          ? `linear-gradient(135deg,${cat.color}22,${cat.color}11)`
          : hov ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: `1px solid ${isActive ? cat.color + '55' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.3s ease',
        boxShadow: isActive ? `0 0 24px ${cat.color}30` : 'none',
        flex: '1 1 160px',
      }}
    >
      {/* SVG ring */}
      <div style={{ position: 'relative', width: '88px', height: '88px' }}>
        <svg width="88" height="88" style={{ transform: 'rotate(-90deg)' }}>
          {/* track */}
          <circle cx="44" cy="44" r={r}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          {/* progress */}
          <motion.circle
            cx="44" cy="44" r={r}
            fill="none" stroke={cat.color} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView
              ? { strokeDashoffset: circ - (circ * avg) / 100 }
              : { strokeDashoffset: circ }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.5 }}
            style={{ filter: `drop-shadow(0 0 6px ${cat.color}88)` }}
          />
        </svg>
        {/* centre text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Outfit',sans-serif", fontWeight: 800,
            fontSize: '1.1rem', color: cat.color,
            lineHeight: 1,
          }}>
            {avg}%
          </span>
        </div>
      </div>

      <span style={{
        fontFamily: "'Outfit',sans-serif", fontWeight: 700,
        fontSize: '0.85rem',
        color: isActive ? cat.color : '#64748B',
        transition: 'color 0.3s',
        textAlign: 'center',
      }}>
        {cat.label}
      </span>

      {/* active dot */}
      {isActive && (
        <motion.div
          layoutId="catDot"
          style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: cat.color,
            boxShadow: `0 0 8px ${cat.color}`,
          }}
        />
      )}
    </motion.button>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════════════════════════ */
export default function Skills() {
  const [activeTab, setActiveTab] = useState(0)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const activeCat = skillCategories[activeTab]

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        position: 'relative', width: '100%',
        padding: '100px 0 120px', overflow: 'hidden',
      }}
    >
      {/* floating icon constellation bg */}
      <ConstellationBg />

      {/* orbs */}
      <GradientOrb color="rgba(6,182,212,0.7)"  size={450} top="0"     right="-60px" opacity={0.11} delay={0}   />
      <GradientOrb color="rgba(168,85,247,0.7)" size={380} bottom="0"  left="-60px"  opacity={0.10} delay={2}   />
      <GradientOrb color="rgba(99,102,241,0.7)" size={300} top="40%"   left="40%"    opacity={0.08} delay={1.5} />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 60px', position: 'relative', zIndex: 1,
      }}>

        {/* ── header ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          {/* pill */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 18px', borderRadius: '999px',
              border: '1px solid rgba(6,182,212,0.35)',
              background: 'rgba(6,182,212,0.07)',
              color: '#67E8F9', fontSize: '13px', fontWeight: 600,
              fontFamily: "'Outfit',sans-serif", letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#06B6D4', boxShadow: '0 0 6px #06B6D4',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              Tech Stack
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Outfit',sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', color: '#ffffff',
            margin: '0 0 12px', lineHeight: 1.15,
          }}>
            My{' '}
            <span style={{
              background: 'linear-gradient(90deg,#06B6D4,#818CF8,#A855F7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Skills
            </span>
          </h2>
          <p style={{ color: '#475569', fontFamily: "'Outfit',sans-serif", fontSize: '1rem', margin: 0 }}>
            Technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* ── proficiency rings row (category switcher) ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          style={{
            display: 'flex', gap: '16px', flexWrap: 'wrap',
            justifyContent: 'center', marginBottom: '12px',
          }}
        >
          {skillCategories.map((cat, i) => (
            <ProficiencyRing
              key={cat.id}
              cat={cat}
              inView={inView}
              isActive={activeTab === i}
              onClick={() => setActiveTab(i)}
            />
          ))}
        </motion.div>

        {/* animated separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeInOut' }}
          style={{
            height: '1px', width: '100%', transformOrigin: 'left',
            background: `linear-gradient(90deg,transparent,${activeCat.color}55,transparent)`,
            margin: '8px 0 0',
          }}
        />

        {/* ── skill cards grid (switches by tab) ───────────────────────── */}
        <AnimatePresence mode="wait">
          <CategoryPanel
            key={activeCat.id}
            cat={activeCat}
            inView={inView}
          />
        </AnimatePresence>

        {/* ── bottom "currently learning" banner ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          style={{
            marginTop: '64px',
            borderRadius: '20px', padding: '2px',
            background: 'linear-gradient(135deg,rgba(6,182,212,0.5),rgba(99,102,241,0.5),rgba(168,85,247,0.5))',
          }}
        >
          <div style={{
            borderRadius: '18px', padding: '28px 36px',
            background: 'rgba(8,15,28,0.88)', backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', gap: '20px',
            flexWrap: 'wrap',
          }}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: '2rem', flexShrink: 0 }}
            >
              🚀
            </motion.div>
            <div>
              <p style={{
                fontFamily: "'Outfit',sans-serif", fontWeight: 700,
                fontSize: '1rem', color: '#F1F5F9', margin: '0 0 4px',
              }}>
                Currently exploring
              </p>
              <p style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: '0.875rem', color: '#64748B', margin: 0,
              }}>
                Machine Learning · Robotics · Three.js · Next.js
              </p>
            </div>

            {/* live indicator */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#22C55E', boxShadow: '0 0 8px #22C55E',
                  display: 'block',
                }}
              />
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: '0.8rem',
                color: '#22C55E', fontWeight: 600,
              }}>
                Always Learning
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
