import ScrollReveal from '../components/ScrollReveal'

const gradientText = {
  background: 'linear-gradient(90deg, #06B6D4, #818CF8, #A855F7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

/**
 * PlaceholderSection
 * Temporary skeleton for About / Services / Projects / Skills / Contact.
 * Replace each one with its real component — keep the ScrollReveal wrapper.
 */
export default function PlaceholderSection({ id, label }) {
  return (
    <section
      id={id}
      style={{
        minHeight:      '100vh',
        width:          '100%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '80px 60px',
      }}
    >
      <ScrollReveal direction="up" duration={0.8}>
        <div style={{ textAlign: 'center' }}>
          {/* Section line above */}
          <div style={{
            width: '60px', height: '3px', borderRadius: '99px',
            background: 'linear-gradient(90deg,#06B6D4,#A855F7)',
            margin: '0 auto 24px',
          }} />

          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 800,
            fontFamily: "'Outfit',sans-serif", margin: 0, ...gradientText }}>
            {label}
          </h2>

          <p style={{ color:'#475569', marginTop:'12px', fontSize:'1rem' }}>
            Coming soon…
          </p>
        </div>
      </ScrollReveal>
    </section>
  )
}
