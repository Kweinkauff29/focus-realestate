"use client";

import { useEffect, useRef, useState } from "react";

export function AreaChart({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateSize = () => {
      const width = Math.max(280, Math.floor(frame.clientWidth));
      const height = Math.round(width * 0.75);
      setSize((current) => current.width === width && current.height === height ? current : { width, height });
    };
    const animationFrame = window.requestAnimationFrame(updateSize);
    const observer = new ResizeObserver(updateSize);
    observer.observe(frame);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  const baseSrc = src.split("?")[0];
  const chartSrc = size.width ? `${baseSrc}?w=${size.width}&h=${size.height}` : "";

  return (
    <div className="area-stat-frame" ref={frameRef}>
      {chartSrc ? <iframe src={chartSrc} title={title} loading="lazy" /> : <span className="area-stat-loading">Loading market graph…</span>}
    </div>
  );
}
