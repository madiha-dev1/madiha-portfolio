import { motion } from 'framer-motion'
import TypingText  from '../components/TypingText'
import Button      from '../components/Button'
import { personalInfo } from '../data/portfolio'
import heroPhoto from '../assets/hero.png'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, ease: 'easeOut', delay },
})

const fadeFromRight = {
  initial:    { opacity: 0, x: 60 },
  animate:    { opacity: 1, x: 0  },
  transition: { duration: 0.8, ease: 'easeOut', delay: 0.15 },
}

const fadeFromLeft = {
  initial:    { opacity: 0, x: -60 },
  animate:    { opacity: 1, x: 0   },
  transition: { duration: 0.85, ease: 'easeOut', delay: 0.25 },
}

const gradientText = {
  background:           'linear-gradient(90deg, #06B6D4 0%, #818CF8 55%, #A855F7 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor:  'transparent',
  backgroundClip:       'text',
}

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position:       'relative',
        minHeight:      '100vh',
        width:          '100%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        overflow:       'hidden',
        paddingTop:     '80px',
        paddingBottom:  '80px',
      }}
    >
      <div style={{ width:'100%', maxWidth:'1100px', margin:'0 auto', padding:'60px 60px' }}>

        {/* ── row: photo LEFT  |  text RIGHT ────────────────────────────── */}
        <div style={{
          display:        'flex',
          flexDirection:  'row',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            '60px',
          flexWrap:       'wrap',
        }}>

          {/* ══════════════ LEFT — photo ══════════════ */}
          <motion.div
            {...fadeFromLeft}
            style={{ flex:'0 0 auto', display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            <div style={{ position:'relative' }}>
              {/* glow blob */}
              <div style={{
                position:'absolute', inset:'-20px', borderRadius:'50%',
                background:'radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(6,182,212,0.3) 55%, transparent 100%)',
                filter:'blur(40px)', zIndex:0, opacity:0.65,
              }} />

              {/* photo circle */}
              <div
                className="animate-float glow-pulse"
                style={{
                  width:'clamp(240px, 28vw, 380px)', height:'clamp(240px, 28vw, 380px)',
                  borderRadius:'50%', overflow:'hidden',
                  border:'2px solid rgba(168,85,247,0.45)',
                  position:'relative', zIndex:1,
                }}
              >
                <img
                  src={heroPhoto}
                  alt={`${personalInfo.fullName} photo`}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  loading="eager"
                />
              </div>

              {/* spinning dots */}
              <motion.span
                animate={{ rotate:360 }}
                transition={{ duration:10, repeat:Infinity, ease:'linear' }}
                style={{
                  position:'absolute', top:'-10px', right:'-10px',
                  width:'26px', height:'26px', borderRadius:'50%',
                  background:'linear-gradient(135deg,#06B6D4,#A855F7)',
                  opacity:0.85, zIndex:2,
                }}
              />
              <motion.span
                animate={{ rotate:-360 }}
                transition={{ duration:15, repeat:Infinity, ease:'linear' }}
                style={{
                  position:'absolute', bottom:'-10px', left:'-10px',
                  width:'16px', height:'16px', borderRadius:'50%',
                  background:'linear-gradient(135deg,#A855F7,#06B6D4)',
                  opacity:0.65, zIndex:2,
                }}
              />
            </div>
          </motion.div>

          {/* ══════════════ RIGHT — all text, everything LEFT-aligned ══════════════ */}
          <motion.div
            {...fadeFromRight}
            style={{
              flex:          '1 1 420px',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'flex-start',
              textAlign:     'left',
              gap:           '22px',
              minWidth:      0,
              paddingLeft:   '40px',   /* push text away from photo */
            }}
          >
            {/* badge */}
            <motion.div {...fadeUp(0.2)}>
              <span style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                padding:'6px 16px', borderRadius:'999px',
                border:'1px solid rgba(6,182,212,0.35)',
                background:'rgba(6,182,212,0.07)',
                color:'#67E8F9', fontSize:'13px', fontWeight:500, letterSpacing:'0.02em',
              }}>
                <span style={{
                  width:'8px', height:'8px', borderRadius:'50%',
                  background:'#06B6D4', boxShadow:'0 0 6px #06B6D4',
                  animation:'pulse 2s ease-in-out infinite', flexShrink:0,
                }} />
                Available for projects
              </span>
            </motion.div>

            {/* heading */}
            <motion.h1 {...fadeUp(0.3)} style={{
              fontSize:'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight:800,
              lineHeight:1.15, color:'#ffffff',
              fontFamily:"'Outfit', sans-serif", margin:0,
            }}>
              Hello, I&rsquo;m{' '}
              <span style={gradientText}>{personalInfo.name}</span>
            </motion.h1>

            {/* typing text — left-aligned, grows left→right */}
            <motion.div {...fadeUp(0.42)}
              style={{ height:'40px', display:'flex', alignItems:'center', justifyContent:'flex-start' }}
            >
              <TypingText />
            </motion.div>

            {/* paragraph — border LEFT */}
            <motion.p {...fadeUp(0.52)} style={{
              color:'#94A3B8', fontSize:'1rem', lineHeight:1.85,
              maxWidth:'460px', margin:0, fontWeight:400,
              borderLeft:'2px solid rgba(6,182,212,0.4)',
              paddingLeft:'16px',
            }}>
              {personalInfo.tagline}
            </motion.p>

            {/* buttons — start from left */}
            <motion.div {...fadeUp(0.62)} style={{
              display:'flex', flexWrap:'wrap', gap:'16px',
              alignItems:'center', justifyContent:'flex-start',
              marginTop:'4px',
            }}>
              <Button variant="filled"  href={personalInfo.hireMail}>Hire Me</Button>
              <Button variant="outline" href={personalInfo.resumeUrl} download>Download Resume</Button>
            </motion.div>

          </motion.div>
          {/* end text column */}

        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:1.8, duration:0.8 }}
        style={{
          position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:'6px',
          pointerEvents:'none',
        }}
        aria-hidden="true"
      >
        <span style={{ fontSize:'10px', color:'#475569', letterSpacing:'0.2em', textTransform:'uppercase' }}>
          scroll
        </span>
        <motion.div
          animate={{ y:[0,9,0] }}
          transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}
          style={{ width:'1px', height:'30px', background:'linear-gradient(to bottom, rgba(6,182,212,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
