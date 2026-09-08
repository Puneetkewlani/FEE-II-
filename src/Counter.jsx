import React, { useState } from 'react';
import './Counter.css';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const reset = () => {
    setCount(0);
    setHistory([0]);
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCount(newHistory[newHistory.length - 1]);
    }
  };

  const isPositive = count > 0;
  const isNegative = count < 0;

  return (
    <div className="counter-wrapper">
      <div className="counter-container">
        <div className="header">
          <h1 className="title">Counter</h1>
          <p className="subtitle">Click the buttons to change the value</p>
        </div>

        <div className={`counter-display ${isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'}`}>
          <span className="count-label">Current Count</span>
          <p className="count-value">{count}</p>
          <div className="count-bar">
            <div className="count-bar-fill" style={{ width: `${Math.min(Math.abs(count) * 5, 100)}%` }}></div>
          </div>
        </div>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Max</span>
            <span className="stat-value">{Math.max(...history)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Min</span>
            <span className="stat-value">{Math.min(...history)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Steps</span>
            <span className="stat-value">{history.length - 1}</span>
          </div>
        </div>

        <div className="button-group">
          <button onClick={decrement} className="btn btn-minus" title="Decrease by 1">
            <span className="btn-icon">−</span>
            <span className="btn-text">Decrease</span>
          </button>
          <button onClick={reset} className="btn btn-reset" title="Reset to zero">
            <span className="btn-icon">↺</span>
            <span className="btn-text">Reset</span>
          </button>
          <button onClick={increment} className="btn btn-plus" title="Increase by 1">
            <span className="btn-icon">+</span>
            <span className="btn-text">Increase</span>
          </button>
        </div>

        <button onClick={undo} className="btn btn-secondary" disabled={history.length <= 1} title="Undo last action">
          ↶ Undo
        </button>
      </div>
    </div>
  );
}
