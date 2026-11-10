import { useTypewriter } from "../hooks/useTypewriter";
import { typingTexts } from "../data/portfolio";

/**
 * TypingText
 * Displays the cycling typewriter animation with a blinking cursor.
 */
export default function TypingText() {
  const text = useTypewriter({
    texts:         typingTexts,
    typingSpeed:   80,
    deletingSpeed: 45,
    pauseTime:     1500,
  });

  return (
    <span className="inline-flex items-center">
      {/* Typed characters */}
      <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
        {text}
      </span>

      {/* Blinking cursor */}
      <span className="cursor-blink ml-0.5 text-cyan-400 font-light select-none">
        |
      </span>
    </span>
  );
}
