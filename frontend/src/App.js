import React, { useState } from 'react';
import './App.css';
import InputPanel from './components/InputPanel';
import SimulationCanvas from './components/SimulationCanvas';
import ControlPanel from './components/ControlPanel';

function App() {
  const [physicsData, setPhysicsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProblemSubmit = async (problemText) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: problemText })
      });

      if (!response.ok) {
        throw new Error('Failed to parse problem');
      }

      const data = await response.json();
      setPhysicsData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleParameterChange = (key, value) => {
    setPhysicsData(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🚀 AI Physics Simulator</h1>
        <p>Convert word problems into interactive simulations</p>
      </header>

      <div className="main-container">
        <div className="left-panel">
          <InputPanel 
            onSubmit={handleProblemSubmit}
            isLoading={isLoading}
            error={error}
          />
          
          {physicsData && (
            <ControlPanel 
              data={physicsData}
              onChange={handleParameterChange}
            />
          )}
        </div>

        <div className="right-panel">
          <SimulationCanvas physicsData={physicsData} />
        </div>
      </div>
    </div>
  );
}

export default App;
