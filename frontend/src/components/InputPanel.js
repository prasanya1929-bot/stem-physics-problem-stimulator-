import React, { useState } from 'react';
import './InputPanel.css';

const EXAMPLE_PROBLEMS = [
  "A ball is thrown straight up with a velocity of 10 m/s",
  "A rock falls from a height of 50 meters",
  "A projectile is launched at 20 m/s at an angle of 45 degrees"
];

function InputPanel({ onSubmit, isLoading, error }) {
  const [problemText, setProblemText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (problemText.trim()) {
      onSubmit(problemText);
    }
  };

  return (
    <div className="input-panel">
      <h2>Enter Physics Problem</h2>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder="Type a physics problem here..."
          rows="5"
          disabled={isLoading}
        />
        
        <button type="submit" disabled={isLoading || !problemText.trim()}>
          {isLoading ? 'Parsing...' : 'Generate Simulation'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="examples">
        <h3>Try these examples:</h3>
        {EXAMPLE_PROBLEMS.map((example, idx) => (
          <button
            key={idx}
            className="example-btn"
            onClick={() => setProblemText(example)}
            disabled={isLoading}
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}

export default InputPanel;
