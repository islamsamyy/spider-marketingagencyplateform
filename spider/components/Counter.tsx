'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  end?: number;
  to?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function Counter({
  end,
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1800,
  className = '',
}: CounterProps) {
  const targetValue = end ?? to ?? 0;
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const updateCount = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(easeOut * targetValue);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(targetValue);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <span ref={counterRef} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
