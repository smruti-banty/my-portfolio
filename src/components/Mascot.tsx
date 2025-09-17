"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

type MascotProps = {
  sections?: number;
  autoplay?: boolean;
  delayBeforeStart?: number;
  delayBetween?: number;
  scrollOnMove?: boolean;
};

export default function Mascot({
  sections = 3,
  autoplay = true,
  delayBeforeStart = 700,
  delayBetween = 900,
  scrollOnMove = true,
}: MascotProps) {
  // Guard: prevent double-mount across the entire window (helps HMR/dev & accidental double renders)
  if (typeof window !== "undefined") {
    // @ts-ignore - attaching small global flag
    if ((window as any).__mascotMounted) {
      // If already mounted, render nothing
      return null;
    }
    // mark mounted (we'll clear on unmount below)
    // but don't set until after first render to avoid SSR mismatch - we'll set in useEffect
  }

  const controls = useAnimation();
  const stoppedRef = useRef(false);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // set the global flag in useEffect (safe client-only)
  useEffect(() => {
    // @ts-ignore
    (window as any).__mascotMounted = true;
    return () => {
      // clear on unmount so HMR/dev can remount later
      // @ts-ignore
      (window as any).__mascotMounted = false;
    };
  }, []);

  const calcX = (idx: number) => {
    const max = Math.max(1, sections - 1);
    const fraction = max === 0 ? 0 : idx / max;
    const mapped = fraction * 0.8 - 0.4;
    return `${mapped * 100}vw`;
  };

  const moveToSection = async (idx: number) => {
    if (stoppedRef.current) return;
    const x = calcX(idx);
    await controls.start({
      x,
      transition: { type: "spring", stiffness: 140, damping: 16, mass: 0.55 },
    });
    if (stoppedRef.current) return;
    await controls.start({
      y: ["0%", "-12%", "0%"],
      transition: { duration: 0.55, ease: "easeOut" },
    });
  };

  const scrollToSection = (idx: number) => {
    if (!scrollOnMove) return;
    try {
      const ids = ["home", "skills", "experience"]; // adjust if you change sections
      const id = ids[idx] ?? null;
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {}
  };

  useEffect(() => {
    if (reducedMotion) {
      controls.set({ opacity: 1, x: calcX(0), y: "0%" });
      return;
    }

    let cancelled = false;
    const startTour = async () => {
      await controls.start({ opacity: 1, x: "-40vw", y: "0%", transition: { duration: 0.01 } });
      await new Promise((r) => setTimeout(r, delayBeforeStart));
      if (cancelled || stoppedRef.current) return;
      await moveToSection(0);
      if (scrollOnMove) scrollToSection(0);
      for (let i = 1; i < sections; i++) {
        if (cancelled || stoppedRef.current) break;
        await new Promise((r) => setTimeout(r, delayBetween));
        if (cancelled || stoppedRef.current) break;
        await moveToSection(i);
        if (scrollOnMove) scrollToSection(i);
      }
    };

    if (autoplay) startTour();

    const stopOnUser = () => {
      stoppedRef.current = true;
      cancelled = true;
    };
    window.addEventListener("wheel", stopOnUser, { passive: true });
    window.addEventListener("touchstart", stopOnUser, { passive: true });
    window.addEventListener("keydown", stopOnUser);
    window.addEventListener("click", stopOnUser);

    const onManualMove = (e: Event) => {
      if (stoppedRef.current) return;
      const ce = e as CustomEvent<{ sectionIndex: number }>;
      const idx = Math.max(0, Math.min(ce?.detail?.sectionIndex ?? 0, sections - 1));
      moveToSection(idx);
      if (scrollOnMove) scrollToSection(idx);
    };
    window.addEventListener("mascotMove", onManualMove as EventListener);

    return () => {
      cancelled = true;
      stoppedRef.current = true;
      window.removeEventListener("wheel", stopOnUser);
      window.removeEventListener("touchstart", stopOnUser);
      window.removeEventListener("keydown", stopOnUser);
      window.removeEventListener("click", stopOnUser);
      window.removeEventListener("mascotMove", onManualMove as EventListener);
    };
  }, [controls, sections, autoplay, delayBeforeStart, delayBetween, scrollOnMove, reducedMotion]);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, x: "-40vw", y: "0%" }}
      animate={controls}
      style={{
        position: "fixed",
        bottom: 44,
        left: "50%",
        translate: "-50% 0",
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform",
      }}
      className="w-24 h-24 md:w-28 md:h-28"
    >
      {/* SVG mascot */}
      <svg viewBox="0 0 120 120" className="w-full h-full" role="presentation" aria-hidden>
        <defs>
          <linearGradient id="m-g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#5AB2FF" />
            <stop offset="1" stopColor="#4FD1C5" />
          </linearGradient>
          <filter id="m-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgba(0,0,0,0.45)" />
          </filter>
        </defs>

        <ellipse cx="60" cy="100" rx="26" ry="7" fill="rgba(0,0,0,0.36)" />

        <g transform="translate(20,12)" filter="url(#m-shadow)">
          <rect x="8" y="24" rx="10" ry="10" width="64" height="60" fill="#0B1226" stroke="url(#m-g)" strokeWidth="2" />
          <rect x="18" y="6" rx="7" ry="7" width="44" height="28" fill="#E6F7FF" />
          <circle cx="30" cy="18" r="3.5" fill="#071029" />
          <circle cx="50" cy="18" r="3.5" fill="#071029" />
          <rect x="34" y="24" width="12" height="3.5" rx="1" fill="#5AB2FF" />
          <line x1="44" y1="6" x2="48" y2="-6" stroke="url(#m-g)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="48" cy="-6" r="3.2" fill="url(#m-g)" />
        </g>
      </svg>
    </motion.div>
  );
}
