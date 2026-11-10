/**
 * Button
 * variant="filled"  → gradient background (Hire Me)
 * variant="outline" → transparent with gradient border + glow on hover
 */
export default function Button({ children, variant = "filled", href, onClick, className = "" }) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";

  const filled =
    "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white " +
    "hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6),0_0_50px_rgba(139,92,246,0.4)]";

  const outline =
    "border border-cyan-500/60 text-cyan-300 bg-transparent " +
    "hover:border-cyan-400 hover:text-white hover:scale-105 " +
    "hover:shadow-[0_0_20px_rgba(6,182,212,0.4),0_0_40px_rgba(139,92,246,0.3)]";

  const cls = `${base} ${variant === "filled" ? filled : outline} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
