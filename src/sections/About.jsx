import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import StatCard       from '../components/StatCard'
import SocialIcons    from '../components/SocialIcons'
import ScrollReveal   from '../components/ScrollReveal'
import { aboutInfo }  from '../data/portfolio'
import heroPhoto      from '../assets/about.png'   // reuse same photo or swap

/* ── stagger container ───────────────────────────────────────────────────── */
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } },
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        position:       'relative',
        width:          '100%',
        minHeight:      'auto',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '60px 0',
      }}
    >
      <div style={{ width:'100%', maxWidth:'1100px', margin:'0 auto', padding:'0 60px' }}>
        <div style={{
          display:       'flex',
          flexDirection: 'row',
          alignItems:    'center',
          gap:           '80px',
          flexWrap:      'wrap',
        }}>

          {/* ══════════════ LEFT — content ══════════════ */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              flex:          '1 1 420px',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'flex-start',
              gap:           '28px',
              minWidth:      0,
            }}
          >
            {/* heading */}
            <motion.div variants={item}>
              <SectionHeading title="About Me" />
            </motion.div>

            {/* bio */}
            <motion.p variants={item} style={{
              color:      '#94A3B8',
              fontSize:   '1.02rem',
              lineHeight: 1.85,
              maxWidth:   '500px',
              margin:     0,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              borderLeft: '2px solid rgba(6,182,212,0.4)',
              paddingLeft:'16px',
            }}>
              {aboutInfo.bio}
            </motion.p>

            {/* stats row */}
            <motion.div variants={item} style={{
              display:  'flex',
              gap:      '16px',
              flexWrap: 'wrap',
              width:    '100%',
            }}>
              {aboutInfo.stats.map(s => (
                <StatCard key={s.label} number={s.number} suffix={s.suffix} label={s.label} />
              ))}
            </motion.div>

            {/* social icons */}
            <motion.div variants={item}>
              <p style={{
                color:'#64748B', fontSize:'0.8rem', fontWeight:500,
                letterSpacing:'0.1em', textTransform:'uppercase',
                marginBottom:'10px', fontFamily:"'Outfit',sans-serif",
              }}>
                Find me on
              </p>
              <SocialIcons />
            </motion.div>

          </motion.div>

          {/* ══════════════ RIGHT — image (stylish card frame) ══════════════ */}
          <ScrollReveal direction="right" duration={0.9} style={{ flex:'0 0 auto' }}>
            <div style={{ position:'relative', width:'clamp(200px,22vw,260px)' }}>

              {/* ── deep glow blob behind everything ── */}
              <div style={{
                position:'absolute', inset:'-40px',
                background:'radial-gradient(ellipse at 60% 50%, rgba(168,85,247,0.45) 0%, rgba(6,182,212,0.2) 55%, transparent 80%)',
                filter:'blur(55px)', zIndex:0, pointerEvents:'none',
              }} />

              {/* ── main card ── */}
              <motion.div
                className="animate-float"
                style={{
                  position:     'relative',
                  borderRadius: '24px',
                  overflow:     'hidden',
                  zIndex:       1,
                  /* layered border: gradient via outline trick */
                  padding:      '3px',
                  background:   'linear-gradient(135deg,#06B6D4 0%,#6366F1 50%,#A855F7 100%)',
                  boxShadow:    '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(6,182,212,0.2)',
                }}
              >
                {/* inner dark background */}
                <div style={{ borderRadius:'22px', overflow:'hidden', position:'relative', background:'#060D18' }}>

                  {/* photo */}
                  <img
                    src={heroPhoto}
                    alt="Madiha Noor"
                    style={{
                      width:'100%',
                      aspectRatio:'4/5',
                      objectFit:'cover',
                      objectPosition:'top center',
                      display:'block',
                    }}
                    loading="lazy"
                  />

                  {/* subtle scan-line overlay */}
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    backgroundImage:'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
                    borderRadius:'22px',
                  }} />

                  {/* bottom gradient fade */}
                  <div style={{
                    position:'absolute', bottom:0, left:0, right:0,
                    height:'45%',
                    background:'linear-gradient(to top, rgba(6,9,18,0.85) 0%, transparent 100%)',
                    borderRadius:'0 0 22px 22px',
                  }} />

                  {/* name badge at bottom */}
                  <div style={{
                    position:'absolute', bottom:'16px', left:'50%',
                    transform:'translateX(-50%)',
                    display:'inline-flex', alignItems:'center', gap:'8px',
                    padding:'7px 18px', borderRadius:'999px',
                    background:'rgba(6,182,212,0.12)',
                    border:'1px solid rgba(6,182,212,0.4)',
                    backdropFilter:'blur(10px)',
                    whiteSpace:'nowrap',
                  }}>
                    <span style={{
                      width:'7px', height:'7px', borderRadius:'50%',
                      background:'#06B6D4', boxShadow:'0 0 8px #06B6D4',
                      animation:'pulse 2s ease-in-out infinite', flexShrink:0,
                    }} />
                    <span style={{
                      fontFamily:"'Outfit',sans-serif", fontWeight:600,
                      fontSize:'0.8rem', color:'#E2E8F0', letterSpacing:'0.04em',
                    }}>
                      Madiha Noor
                    </span>
                  </div>

                </div>
              </motion.div>

              {/* ── corner accent — top left ── */}
              <div style={{
                position:'absolute', top:'-12px', left:'-12px', zIndex:2,
                width:'36px', height:'36px',
                borderTop:'3px solid #06B6D4', borderLeft:'3px solid #06B6D4',
                borderRadius:'6px 0 0 0',
                filter:'drop-shadow(0 0 6px rgba(6,182,212,0.8))',
              }} />

              {/* ── corner accent — bottom right ── */}
              <div style={{
                position:'absolute', bottom:'-12px', right:'-12px', zIndex:2,
                width:'36px', height:'36px',
                borderBottom:'3px solid #A855F7', borderRight:'3px solid #A855F7',
                borderRadius:'0 0 6px 0',
                filter:'drop-shadow(0 0 6px rgba(168,85,247,0.8))',
              }} />

              {/* ── floating tag — top right ── */}
              <motion.div
                animate={{ y:[0,-6,0] }}
                transition={{ duration:3, repeat:Infinity, ease:'easeInOut', delay:0.5 }}
                style={{
                  position:'absolute', top:'-18px', right:'-18px', zIndex:3,
                  padding:'6px 14px', borderRadius:'10px',
                  background:'linear-gradient(135deg,rgba(99,102,241,0.9),rgba(168,85,247,0.9))',
                  border:'1px solid rgba(168,85,247,0.4)',
                  backdropFilter:'blur(8px)',
                  boxShadow:'0 8px 24px rgba(168,85,247,0.35)',
                  display:'flex', alignItems:'center', gap:'6px',
                }}
              >
                <span style={{ fontSize:'14px' }}>🚀</span>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.75rem', color:'#E2E8F0' }}>
                  Open to Work
                </span>
              </motion.div>

              {/* ── floating tag — bottom left ── */}
              <motion.div
                animate={{ y:[0,6,0] }}
                transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut', delay:1 }}
                style={{
                  position:'absolute', bottom:'-18px', left:'-18px', zIndex:3,
                  padding:'6px 14px', borderRadius:'10px',
                  background:'linear-gradient(135deg,rgba(6,182,212,0.85),rgba(99,102,241,0.85))',
                  border:'1px solid rgba(6,182,212,0.4)',
                  backdropFilter:'blur(8px)',
                  boxShadow:'0 8px 24px rgba(6,182,212,0.3)',
                  display:'flex', alignItems:'center', gap:'6px',
                }}
              >
                <span style={{ fontSize:'14px' }}>💻</span>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.75rem', color:'#E2E8F0' }}>
                  Full Stack Dev
                </span>
              </motion.div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
