import { FaGithub, FaLinkedin } from "react-icons/fa";
import { socialLinks } from "../data/portfolio";

const iconMap = {
  github:   <FaGithub size={22} />,
  linkedin: <FaLinkedin size={22} />,
};

/**
 * SocialIcons
 * Row of social icon links with hover glow.
 */
export default function SocialIcons() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="
            text-slate-400 hover:text-cyan-400
            transition-all duration-300
            hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]
            hover:scale-110
          "
        >
          {iconMap[s.icon]}
        </a>
      ))}
    </div>
  );
}
