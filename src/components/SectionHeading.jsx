/**
 * SectionHeading
 * Reusable heading for every section.
 * Shows a small gradient line above, then the title with last word in gradient.
 */
export default function SectionHeading({ title, align = 'left' }) {
  const words = title.trim().split(' ')
  const last  = words.pop()
  const rest  = words.join(' ')

  return (
    <div style={{ textAlign: align }}>
      {/* accent line */}
      <div style={{
        width: '50px', height: '3px', borderRadius: '99px', marginBottom: '18px',
        background: 'linear-gradient(90deg,#06B6D4,#A855F7)',
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0,
      }} />

      <h2 style={{
        fontSize:   'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800,
        fontFamily: "'Outfit', sans-serif",
        color:      '#ffffff',
        margin:     0,
        lineHeight: 1.15,
      }}>
        {rest && <span>{rest} </span>}
        <span style={{
          background:           'linear-gradient(90deg,#06B6D4,#818CF8,#A855F7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          backgroundClip:       'text',
        }}>
          {last}
        </span>
      </h2>
    </div>
  )
}
