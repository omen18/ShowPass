"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("no-cursor");

    let rafId: number;
    let mx = -300, my = -300;
    let rx = -300, ry = -300;
    let gx = -300, gy = -300;
    // smoothed velocity for stretch
    let svx = 0, svy = 0;
    let hovered = false;
    let pressing = false;

    function onMove(e: MouseEvent) { mx = e.clientX; my = e.clientY; }

    function onOver(e: MouseEvent) {
      const t = e.target as Element;
      if (t.closest("button,a,input,textarea,select,[role='button'],[data-cursor]"))
        hovered = true;
    }
    function onOut(e: MouseEvent) {
      const t = e.target as Element;
      if (t.closest("button,a,input,textarea,select,[role='button'],[data-cursor]"))
        hovered = false;
    }
    function onDown() { pressing = true; }
    function onUp()   { pressing = false; }

    function tick() {
      // Raw velocity this frame
      const vx = (mx - rx) * 0.12;
      const vy = (my - ry) * 0.12;

      // Smooth velocity for stretch (low-pass filter)
      svx += (vx - svx) * 0.25;
      svy += (vy - svy) * 0.25;

      rx += vx;
      ry += vy;

      // Glow lags much more
      gx += (mx - gx) * 0.055;
      gy += (my - gy) * 0.055;

      const speed  = Math.sqrt(svx * svx + svy * svy);
      const angle  = Math.atan2(svy, svx) * (180 / Math.PI);

      // Stretch ring along movement direction — clamp to feel natural
      const stretchX = hovered ? 1 : Math.min(1 + speed * 0.045, 1.7);
      const stretchY = hovered ? 1 : Math.max(1 / stretchX, 0.55);

      const dot  = dotRef.current;
      const ring = ringRef.current;
      const glow = glowRef.current;

      if (dot) {
        const dotScale = pressing ? 0.35 : 1;
        const glowRadius = pressing ? 4 : 5 + speed * 0.6;
        dot.style.transform = `translate(${mx - 5}px,${my - 5}px) scale(${dotScale})`;
        dot.style.boxShadow = `0 0 ${glowRadius}px 1px rgba(18,123,163,0.85), 0 0 ${glowRadius * 2.5}px rgba(18,123,163,0.3)`;
      }

      if (ring) {
        const size   = hovered ? 52 : 36;
        const offset = size / 2;
        const ringScale = pressing ? 0.75 : 1;

        ring.style.transformOrigin = "center center";
        ring.style.transform = `translate(${rx - offset}px,${ry - offset}px) rotate(${angle}deg) scaleX(${stretchX * ringScale}) scaleY(${stretchY * ringScale})`;
        ring.style.width  = `${size}px`;
        ring.style.height = `${size}px`;

        const opacity = 0.45 + Math.min(speed * 0.025, 0.45);
        ring.style.borderColor = hovered
          ? `rgba(18,123,163,0.95)`
          : `rgba(18,123,163,${opacity})`;
        ring.style.backgroundColor = hovered
          ? "rgba(18,123,163,0.1)"
          : pressing
          ? "rgba(18,123,163,0.06)"
          : "transparent";
        // second ring glow on hover
        ring.style.boxShadow = hovered
          ? "0 0 12px rgba(18,123,163,0.35), inset 0 0 8px rgba(18,123,163,0.15)"
          : speed > 2
          ? `0 0 ${speed * 1.2}px rgba(18,123,163,0.2)`
          : "none";
      }

      if (glow) {
        const gs = 90 + speed * 3;
        glow.style.transform = `translate(${gx - gs / 2}px,${gy - gs / 2}px)`;
        glow.style.width  = `${gs}px`;
        glow.style.height = `${gs}px`;
        const glowOpacity = hovered ? 0.18 : Math.min(0.07 + speed * 0.004, 0.14);
        glow.style.opacity = String(glowOpacity);
      }

      rafId = requestAnimationFrame(tick);
    }

    document.addEventListener("mousemove", onMove,  { passive: true });
    document.addEventListener("mouseover", onOver,  { passive: true });
    document.addEventListener("mouseout",  onOut,   { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);
    tick();

    return () => {
      document.body.classList.remove("no-cursor");
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
    };
  }, []);

  return (
    <>
      {/* Ambient glow blob — slowest, blurred */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          width: 90,
          height: 90,
          background:
            "radial-gradient(circle, rgba(18,123,163,0.55) 0%, rgba(18,123,163,0.15) 40%, transparent 70%)",
          willChange: "transform, width, height, opacity",
          filter: "blur(12px)",
          transition: "opacity 0.5s ease",
        }}
      />
      {/* Ring — lags + stretches + rotates */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border-2"
        style={{
          width: 36,
          height: 36,
          borderColor: "rgba(18,123,163,0.45)",
          willChange: "transform, width, height, box-shadow",
          transition:
            "width 0.28s cubic-bezier(0.34,1.56,0.64,1), height 0.28s cubic-bezier(0.34,1.56,0.64,1), border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease, transform 0s",
        }}
      />
      {/* Dot — snaps instantly with dynamic glow */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] h-[10px] w-[10px] rounded-full bg-[var(--accent)]"
        style={{
          willChange: "transform, box-shadow",
          transition: "transform 0.05s ease, box-shadow 0.08s ease",
        }}
      />
    </>
  );
}
