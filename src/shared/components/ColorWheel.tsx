import { useEffect, useRef } from 'react';

const ColorWheel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center;

    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * (Math.PI / 180);
      const endAngle = angle * (Math.PI / 180);

      const gradient = ctx.createRadialGradient(
        center,
        center,
        0,
        center,
        center,
        radius
      );
      const hue = angle;
      gradient.addColorStop(0, `hsl(${hue}, 0%, 100%)`);
      gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // marcador central
    ctx.beginPath();
    ctx.arc(center, center, 6, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{ borderRadius: '50%' }}
    />
  );
};

export default ColorWheel;
