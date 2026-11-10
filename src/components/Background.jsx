/**
 * Background
 * Full-page dark gradient + subtle grid overlay.
 * Wrap the entire app in this component so every section shares the same look.
 */
export default function Background({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      {/* ── Layer 1: base gradient ────────────────────────────────────────── */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg, #050B14 0%, #0B1F3A 45%, #0F1B3D 65%, #1A0B2E 85%, #130824 100%)",
        }}
      />

      {/* ── Layer 2: radial colour glows ─────────────────────────────────── */}
      <div
        className="fixed inset-0 -z-19 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 40%, rgba(6,182,212,0.08) 0%, transparent 70%)," +
            "radial-gradient(ellipse 60% 55% at 80% 30%, rgba(139,92,246,0.10) 0%, transparent 70%)," +
            "radial-gradient(ellipse 50% 40% at 50% 80%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Layer 3: grid lines ───────────────────────────────────────────── */}
      <div
        className="fixed inset-0 -z-18 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Layer 4: radial fade to blend grid edges ─────────────────────── */}
      <div
        className="fixed inset-0 -z-17 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,11,20,0.85) 100%)",
        }}
      />

      {/* Page content */}
      {children}
    </div>
  );
}
