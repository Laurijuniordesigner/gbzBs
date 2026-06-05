export default function ProgressBar({ current, goal }) {
  const pct = Math.min((current / goal) * 100, 100);
  const completed = pct >= 100;
  return (
    <div className="progress-container">
      <div className="progress-labels">
        <span className="progress-current">{current.toLocaleString('pt-BR')}</span>
        <span className="progress-goal">META: {goal.toLocaleString('pt-BR')}</span>
      </div>
      <div className="progress-track">
        <div
          className={`progress-fill${completed ? ' completed' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="progress-percent">
        {completed ? '🎉 META ALCANÇADA!' : `${pct.toFixed(0)}% CONCLUÍDO`}
      </div>
    </div>
  );
}
