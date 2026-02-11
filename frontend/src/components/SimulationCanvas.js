import React, { useEffect, useRef } from 'react';
import './SimulationCanvas.css';

function SimulationCanvas({ physicsData }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef({ time: 0, trajectory: [] });

  useEffect(() => {
    if (!physicsData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const scale = 5; // pixels per meter
    const groundY = canvas.height - 50;
    
    stateRef.current = { time: 0, trajectory: [] };

    const animate = () => {
      const { initial_velocity, angle, gravity, initial_height } = physicsData;
      const angleRad = (angle * Math.PI) / 180;
      const vx = initial_velocity * Math.cos(angleRad);
      const vy = initial_velocity * Math.sin(angleRad);
      
      const t = stateRef.current.time;
      
      // Physics equations
      const x = vx * t;
      const y = initial_height + vy * t - 0.5 * gravity * t * t;
      
      // Convert to canvas coordinates
      const canvasX = 50 + x * scale;
      const canvasY = groundY - y * scale;
      
      // Clear canvas
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw ground
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();
      
      // Draw trajectory
      if (y >= 0) {
        stateRef.current.trajectory.push({ x: canvasX, y: canvasY });
      }
      
      ctx.strokeStyle = '#667eea';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      stateRef.current.trajectory.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw object
      if (y >= 0 && canvasX < canvas.width) {
        ctx.fillStyle = '#764ba2';
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw velocity vector
        const vxCurrent = vx;
        const vyCurrent = vy - gravity * t;
        const vectorScale = 3;
        
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(canvasX + vxCurrent * vectorScale, canvasY - vyCurrent * vectorScale);
        ctx.stroke();
        
        // Arrow head
        const arrowX = canvasX + vxCurrent * vectorScale;
        const arrowY = canvasY - vyCurrent * vectorScale;
        const arrowAngle = Math.atan2(-vyCurrent, vxCurrent);
        
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - 10 * Math.cos(arrowAngle - Math.PI / 6), arrowY + 10 * Math.sin(arrowAngle - Math.PI / 6));
        ctx.lineTo(arrowX - 10 * Math.cos(arrowAngle + Math.PI / 6), arrowY + 10 * Math.sin(arrowAngle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
        
        // Draw labels
        ctx.fillStyle = '#333';
        ctx.font = '14px sans-serif';
        ctx.fillText(`Height: ${y.toFixed(1)} m`, 10, 30);
        ctx.fillText(`Distance: ${x.toFixed(1)} m`, 10, 50);
        ctx.fillText(`Time: ${t.toFixed(2)} s`, 10, 70);
        ctx.fillText(`Velocity: ${Math.sqrt(vxCurrent**2 + vyCurrent**2).toFixed(1)} m/s`, 10, 90);
        
        stateRef.current.time += 0.02;
      } else {
        // Reset animation
        setTimeout(() => {
          stateRef.current = { time: 0, trajectory: [] };
        }, 1000);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [physicsData]);

  return (
    <div className="simulation-canvas">
      {!physicsData ? (
        <div className="placeholder">
          <div className="placeholder-icon">📊</div>
          <h3>No Simulation Yet</h3>
          <p>Enter a physics problem to generate a simulation</p>
        </div>
      ) : (
        <canvas ref={canvasRef} />
      )}
    </div>
  );
}

export default SimulationCanvas;
