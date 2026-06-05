import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        let start = 0;
        const end = parseFloat(value);
        const duration = 1500;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { start = end; clearInterval(timer); }
          setDisplay(start);
        }, 16);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{Number.isInteger(display) ? Math.floor(display) : display.toFixed(1)}{suffix}</span>;
}
