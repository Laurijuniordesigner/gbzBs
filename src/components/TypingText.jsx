import { useState, useEffect } from 'react';

export default function TypingText({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, done]);

  return (
    <span>
      {displayed}
      {!done && <span className="typing-cursor">|</span>}
    </span>
  );
}
