
const STATIC_STARS = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  dur: Math.random() * 4 + 2,
  delay: Math.random() * 5,
}));

export default function StarField() {
  return (
    <div className="stars-layer">
      {STATIC_STARS.map(s => (
        <div key={s.id} className="star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          '--dur': `${s.dur}s`, '--delay': `${s.delay}s`,
        }} />
      ))}
    </div>
  );
}

