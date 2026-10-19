import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function useTypewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseTime = 1800,
}: UseTypewriterOptions): { text: string; isTyping: boolean } {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || words.length === 0) {
      return;
    }

    const currentWord = words[index] ?? '';

    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, words, typingSpeed, deletingSpeed, pauseTime, prefersReducedMotion]);

  if (prefersReducedMotion || words.length === 0) {
    return {
      text: words[0] ?? '',
      isTyping: false,
    };
  }

  const currentWord = words[index] ?? '';
  return {
    text: currentWord.substring(0, subIndex),
    isTyping: true,
  };
}
