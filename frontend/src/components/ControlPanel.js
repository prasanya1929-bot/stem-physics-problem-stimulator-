import React from 'react';
import './ControlPanel.css';

function ControlPanel({ data, onChange }) {
  return (
    <div className="control-panel">
      <h2>Simulation Parameters</h2>
      
      <div className="param-group">
        <label>Motion Type</label>
        <div className="value">{data.motion_type.replace('_', ' ')}</div>
      </div>

      <div className="param-group">
        <label>Object</label>
        <div className="value">{data.object_name}</div>
      </div>

      <div className="param-group">
        <label>Initial Velocity: {data.initial_velocity.toFixed(1)} m/s</label>
        <input
          type="range"
          min="0"
          max="50"
          step="0.5"
          value={data.initial_velocity}
          onChange={(e) => onChange('initial_velocity', e.target.value)}
        />
      </div>

      <div className="param-group">
        <label>Angle: {data.angle.toFixed(0)}°</label>
        <input
          type="range"
          min="0"
          max="90"
          step="1"
          value={data.angle}
          onChange={(e) => onChange('angle', e.target.value)}
        />
      </div>

      <div className="param-group">
        <label>Gravity: {data.gravity.toFixed(1)} m/s²</label>
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={data.gravity}
          onChange={(e) => onChange('gravity', e.target.value)}
        />
      </div>

      <div className="param-group">
        <label>Initial Height: {data.initial_height.toFixed(1)} m</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={data.initial_height}
          onChange={(e) => onChange('initial_height', e.target.value)}
        />
      </div>
    </div>
  );
}

export default ControlPanel;
