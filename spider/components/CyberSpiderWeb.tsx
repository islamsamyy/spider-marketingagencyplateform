'use client';

import React, { useEffect, useRef } from 'react';

interface CyberSpiderWebProps {
  className?: string;
  opacity?: number;
  interactive?: boolean;
  fixed?: boolean;
}

export default function CyberSpiderWeb({
  className = "fixed inset-0 w-full h-full pointer-events-none z-0",
  opacity = 0.85,
  interactive = true,
  fixed = true,
}: CyberSpiderWebProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      targetX: null as number | null,
      targetY: null as number | null,
      radius: 200,
      pulses: [] as Array<{
        x: number;
        y: number;
        r: number;
        maxR: number;
        opacity: number;
      }>,
    };

    interface NodePoint {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseColor: string;
      glowColor: string;
      phase: number;
      isBeacon?: boolean;
    }

    let nodes: NodePoint[] = [];

    const resizeCanvas = () => {
      if (fixed) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      } else {
        const parent = canvas.parentElement;
        width = canvas.width = parent ? parent.offsetWidth || window.innerWidth : window.innerWidth;
        height = canvas.height = parent ? parent.offsetHeight || window.innerHeight : window.innerHeight;
      }
      createNodes();
    };

    const createNodes = () => {
      nodes = [];
      // Generous count of nodes for a dense, alive cyber network
      const count = Math.min(Math.floor((width * height) / 11000), 105);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          size: Math.random() * 2.2 + 1.2,
          baseColor: Math.random() > 0.35 ? '#ff003c' : '#ff2a55',
          glowColor: 'rgba(255, 0, 60, 0.6)',
          phase: Math.random() * Math.PI * 2,
          isBeacon: i % 14 === 0,
        });
      }
    };

    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;

      if (fixed) {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
      } else {
        const parent = canvas.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
      }

      if (mouse.x === null || mouse.y === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }

      // Emit radar ripple pulse on mouse drag
      if (Math.random() < 0.18 && mouse.x !== null && mouse.y !== null) {
        mouse.pulses.push({
          x: mouse.x,
          y: mouse.y,
          r: 8,
          maxR: 110,
          opacity: 0.75,
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    // Autonomous periodic sonar beacon emitter (keeps canvas full alive even without mouse)
    let beaconTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      if (mouse.targetX !== null && mouse.targetY !== null) {
        if (mouse.x === null || mouse.y === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.18;
          mouse.y += (mouse.targetY - mouse.y) * 0.18;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      beaconTimer++;
      if (beaconTimer % 110 === 0) {
        const beacons = nodes.filter((n) => n.isBeacon);
        if (beacons.length > 0) {
          const b = beacons[Math.floor(Math.random() * beacons.length)];
          mouse.pulses.push({
            x: b.x,
            y: b.y,
            r: 4,
            maxR: 130,
            opacity: 0.5,
          });
        }
      }

      // Update & render radar pulses
      for (let i = mouse.pulses.length - 1; i >= 0; i--) {
        const p = mouse.pulses[i];
        p.r += 2.2;
        p.opacity -= 0.016;

        if (p.opacity <= 0 || p.r >= p.maxR) {
          mouse.pulses.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 0, 60, ${p.opacity * opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Secondary faint echo ring
        if (p.r > 20) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 80, 110, ${p.opacity * 0.4 * opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Render Mouse Halo & Crosshair Reticle if active
      if (mouse.x !== null && mouse.y !== null) {
        const mx = mouse.x;
        const my = mouse.y;

        // Radial cyber gradient halo
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, mouse.radius);
        grad.addColorStop(0, `rgba(255, 0, 60, ${0.28 * opacity})`);
        grad.addColorStop(0.35, `rgba(255, 0, 60, ${0.1 * opacity})`);
        grad.addColorStop(1, 'rgba(255, 0, 60, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mx, my, mouse.radius, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair reticle
        ctx.save();
        ctx.strokeStyle = `rgba(255, 42, 85, ${0.45 * opacity})`;
        ctx.lineWidth = 1;

        // Reticle ring
        ctx.beginPath();
        ctx.arc(mx, my, 22, 0, Math.PI * 2);
        ctx.stroke();

        // 4 Cardinal tick marks
        const tickLen = 6;
        ctx.beginPath();
        ctx.moveTo(mx - 22 - tickLen, my);
        ctx.lineTo(mx - 22, my);
        ctx.moveTo(mx + 22, my);
        ctx.lineTo(mx + 22 + tickLen, my);
        ctx.moveTo(mx, my - 22 - tickLen);
        ctx.lineTo(mx, my - 22);
        ctx.moveTo(mx, my + 22);
        ctx.lineTo(mx, my + 22 + tickLen);
        ctx.stroke();

        // Center pinpoint
        ctx.fillStyle = '#ff003c';
        ctx.beginPath();
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Update Node positions & bounce on boundaries
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;
        node.phase += 0.025;

        if (node.x < 0) {
          node.x = 0;
          node.vx *= -1;
        } else if (node.x > width) {
          node.x = width;
          node.vx *= -1;
        }

        if (node.y < 0) {
          node.y = 0;
          node.vy *= -1;
        } else if (node.y > height) {
          node.y = height;
          node.vy *= -1;
        }

        // Elastic magnetic pull toward mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 0.04;
            node.x += dx * force;
            node.y += dy * force;
          }
        }
      }

      // Draw Laser Web Connections (Spider Network)
      const maxDist = 145;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.38 * opacity;
            ctx.strokeStyle = `rgba(255, 0, 60, ${lineAlpha})`;
            ctx.lineWidth = lineAlpha > 0.2 ? 1 : 0.65;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Connect node to cursor if in range
        if (mouse.x !== null && mouse.y !== null) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * 0.7 * opacity;
            ctx.strokeStyle = `rgba(255, 42, 85, ${lineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes with Neon Pulsing Glow
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(node.phase) * 0.4 + 1;
        const currentSize = node.size * pulse;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 60, ${0.18 * opacity * pulse})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = node.baseColor;
        ctx.shadowColor = '#ff003c';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [opacity, interactive, fixed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
      }}
    />
  );
}
