
import { useState } from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'
import GradientOrb from '../components/GradientOrb'
import { services, personalInfo } from '../data/portfolio'

/* Word-by-word reveal */
function WordReveal({ text, gradient = false, delay = 0 }) {
  const words = text.split(' ')

  return (
    <span
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '0.3em',
        overflow: 'hidden'
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ y: '110%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={
            gradient
              ? {
                  background:
                    'linear-gradient(90deg,#06B6D4,#818CF8,#A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block'
                }
              : { display: 'inline-block' }
          }
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

/* Main Services Section */
export default function Services() {
  return (
    <section
      id="services"
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 0 120px',
        overflow: 'hidden'
      }}
    >
      {/* Background orbs */}
      <GradientOrb
        color="rgba(6,182,212,0.7)"
        size={500}
        top="-80px"
        left="-100px"
        opacity={0.13}
        delay={0}
      />

      <GradientOrb
        color="rgba(168,85,247,0.7)"
        size={450}
        top="200px"
        right="-80px"
        opacity={0.12}
        delay={1.5}
      />

      <GradientOrb
        color="rgba(99,102,241,0.7)"
        size={380}
        bottom="0px"
        left="30%"
        opacity={0.10}
        delay={3}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 60px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '999px',
                border: '1px solid rgba(6,182,212,0.35)',
                background: 'rgba(6,182,212,0.07)',
                color: '#67E8F9',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: "'Outfit',sans-serif",
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#06B6D4',
                  boxShadow: '0 0 6px #06B6D4',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
              What I Do
            </span>
          </motion.div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.2rem,4.5vw,3.4rem)',
              lineHeight: 1.15,
              color: '#ffffff',
              margin: '0 0 16px'
            }}
          >
            <WordReveal text="My" delay={0.1} />
            {' '}
            <WordReveal text="Services" gradient delay={0.2} />
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.45 }}
            style={{
              color: '#64748B',
              fontSize: '1rem',
              fontFamily: "'Outfit',sans-serif",
              margin: 0
            }}
          >
            I turn ideas into fast, beautiful and responsive websites.
          </motion.p>

          {/* Animated Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.5,
              ease: 'easeInOut'
            }}
            style={{
              width: '120px',
              height: '2px',
              margin: '24px auto 0',
              transformOrigin: 'left',
              background:
                'linear-gradient(90deg,#06B6D4,#A855F7)',
              borderRadius: '99px',
              boxShadow: '0 0 10px rgba(6,182,212,0.5)'
            }}
          />
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((svc, i) => (
            <ServiceCard
              key={svc.id ?? svc.title}
              service={svc}
              index={i}
              offsetDown={i % 3 === 1}
            />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            marginTop: '90px',
            borderRadius: '24px',
            padding: '3px',
            background:
              'linear-gradient(135deg,rgba(6,182,212,0.6),rgba(99,102,241,0.6),rgba(168,85,247,0.6))',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
          }}
        >
          <div
            style={{
              borderRadius: '22px',
              padding: '52px 48px',
              background: 'rgba(8,15,28,0.85)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '28px'
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.4rem,2.5vw,2rem)',
                  color: '#F1F5F9',
                  margin: '0 0 8px'
                }}
              >
                Have a project in mind?
              </h3>

              <p
                style={{
                  color: '#64748B',
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: '1rem',
                  margin: 0
                }}
              >
                Let's build something amazing together.
              </p>
            </div>

            <HireMeBtn href={personalInfo.hireMail} />
          </div>
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 580px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          #services {
            padding: 70px 0 80px !important;
          }

          #services > div {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
    </section>
  )
}

/* Hire Me Button */
function HireMeBtn({ href }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.a
      href={href?.startsWith('mailto:') ? href : `mailto:${href || ''}`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 36px',
        borderRadius: '999px',
        background:
          'linear-gradient(135deg,#06B6D4,#6366F1,#A855F7)',
        color: '#fff',
        fontFamily: "'Outfit',sans-serif",
        fontWeight: 700,
        fontSize: '0.95rem',
        textDecoration: 'none',
        boxShadow: hov
          ? '0 0 36px rgba(6,182,212,0.75), 0 0 72px rgba(168,85,247,0.5)'
          : '0 0 20px rgba(6,182,212,0.35)',
        transition: 'box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0
      }}
    >
      <motion.span
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '999px',
          border: '2px solid rgba(6,182,212,0.5)',
          pointerEvents: 'none'
        }}
      />

      <span style={{ position: 'relative', zIndex: 1 }}>✦</span>
      <span style={{ position: 'relative', zIndex: 1 }}>Hire Me</span>
    </motion.a>
  )
}
