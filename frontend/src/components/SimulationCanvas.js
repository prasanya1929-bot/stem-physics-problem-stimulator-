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
      
      // Clear canvas with dark background
      ctx.fillStyle = '#0F0F0F';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw ground with gradient
      const groundGradient = ctx.createLinearGradient(0, groundY - 2, 0, groundY + 2);
      groundGradient.addColorStop(0, 'rgba(79, 70, 229, 0.3)');
      groundGradient.addColorStop(1, 'rgba(139, 92, 246, 0.3)');
      ctx.strokeStyle = groundGradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();
      
      // Draw ground shadow
      ctx.fillStyle = 'rgba(79, 70, 229, 0.05)';
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      
      // Draw trajectory with gradient
      if (y >= 0) {
        stateRef.current.trajectory.push({ x: canvasX, y: canvasY });
      }
      
      const trajectoryGradient = ctx.createLinearGradient(
        stateRef.current.trajectory[0]?.x || canvasX, 
        stateRef.current.trajectory[0]?.y || canvasY,
        canvasX, 
        canvasY
      );
      trajectoryGradient.addColorStop(0, 'rgba(79, 70, 229, 0.3)');
      trajectoryGradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');
      
      ctx.strokeStyle = trajectoryGradient;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 4]);
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(79, 70, 229, 0.5)';
      ctx.beginPath();
      stateRef.current.trajectory.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
      
      // Draw object with glow effect
      if (y >= 0 && canvasX < canvas.width) {
        // Outer glow
        const glowGradient = ctx.createRadialGradient(canvasX, canvasY, 0, canvasX, canvasY, 30);
        glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
        glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Main object with gradient
        const objectGradient = ctx.createRadialGradient(canvasX - 4, canvasY - 4, 0, canvasX, canvasY, 14);
        objectGradient.addColorStop(0, '#8B5CF6');
        objectGradient.addColorStop(1, '#4F46E5');
        ctx.fillStyle = objectGradient;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(139, 92, 246, 0.8)';
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Draw velocity vector with gradient
        const vxCurrent = vx;
        const vyCurrent = vy - gravity * t;
        const vectorScale = 3;
        
        const vectorGradient = ctx.createLinearGradient(
          canvasX, canvasY,
          canvasX + vxCurrent * vectorScale, canvasY - vyCurrent * vectorScale
        );
        vectorGradient.addColorStop(0, '#EF4444');
        vectorGradient.addColorStop(1, '#F97316');
        
        ctx.strokeStyle = vectorGradient;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(canvasX + vxCurrent * vectorScale, canvasY - vyCurrent * vectorScale);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Arrow head with glow
        const arrowX = canvasX + vxCurrent * vectorScale;
        const arrowY = canvasY - vyCurrent * vectorScale;
        const arrowAngle = Math.atan2(-vyCurrent, vxCurrent);
        
        ctx.fillStyle = '#EF4444';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - 12 * Math.cos(arrowAngle - Math.PI / 6), arrowY + 12 * Math.sin(arrowAngle - Math.PI / 6));
        ctx.lineTo(arrowX - 12 * Math.cos(arrowAngle + Math.PI / 6), arrowY + 12 * Math.sin(arrowAngle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Draw labels with modern styling
        ctx.fillStyle = 'rgba(30, 30, 30, 0.8)';
        ctx.fillRect(10, 10, 200, 110);
        
        ctx.strokeStyle = 'rgba(79, 70, 229, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(10, 10, 200, 110);
        
        ctx.fillStyle = '#E5E5E5';
        ctx.font = 'bold 15px Inter, sans-serif';
        ctx.fillText(`Height: ${y.toFixed(1)} m`, 20, 35);
        ctx.fillText(`Distance: ${x.toFixed(1)} m`, 20, 58);
        ctx.fillText(`Time: ${t.toFixed(2)} s`, 20, 81);
        ctx.fillText(`Velocity: ${Math.sqrt(vxCurrent**2 + vyCurrent**2).toFixed(1)} m/s`, 20, 104);
        
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
