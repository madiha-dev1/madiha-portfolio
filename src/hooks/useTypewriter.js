
import { useState, useEffect } from "react";

export function useTypewriter({
  texts = [],
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseTime = 1500,
}) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    if (!texts.length) return;

    const currentText = texts[loopIndex % texts.length] ?? "";
    let timeout;

    if (!isDeleting) {
      if (displayText === currentText) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(
            currentText.slice(0, displayText.length + 1)
          );
        }, typingSpeed);
      }
    } else {
      if (displayText.length === 0) {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    texts,
    displayText,
    isDeleting,
    loopIndex,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return displayText;
}
