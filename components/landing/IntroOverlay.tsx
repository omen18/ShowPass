"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(SplitText);

const SESSION_KEY = "showpass_intro_seen";

const SERVICES = ["Movies", "Hotels", "Trains", "Flights", "Food", "Stays", "Explore"];

function ShowPassLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="96" height="96" viewBox="0 0 96 96" fill="none">
      <ellipse cx="48" cy="52" rx="38" ry="26" fill="rgba(18,123,163,0.2)" />
      <rect x="8" y="22" width="80" height="52" rx="12"
        fill="rgba(18,123,163,0.12)" stroke="rgba(53,168,214,0.7)" strokeWidth="1.5" />
      <circle cx="8"  cy="48" r="9" fill="#050e1a" stroke="rgba(53,168,214,0.45)" strokeWidth="1.5" />
      <circle cx="88" cy="48" r="9" fill="#050e1a" stroke="rgba(53,168,214,0.45)" strokeWidth="1.5" />
      <line x1="30" y1="22" x2="30" y2="74" stroke="rgba(53,168,214,0.4)" strokeWidth="1.5" strokeDasharray="4 5" />
      <circle cx="19" cy="48" r="4" fill="rgba(53,168,214,0.6)" />
      {/* S mark */}
      <text x="52" y="55" textAnchor="middle" fontSize="20" fontWeight="800" fill="rgba(53,168,214,0.9)" fontFamily="sans-serif">S</text>
    </svg>
  );
}

export default function IntroOverlay() {
  const [visible,  setVisible]  = useState(false);
  const [exiting,  setExiting]  = useState(false);
  const [gone,     setGone]     = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);

  const titleRef   = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof sessionStorage === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) { setTimeout(() => setGone(true), 0); return; }
    setTimeout(() => setVisible(true), 0);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setServiceIndex((i) => (i + 1) % SERVICES.length);
    }, 700);
    return () => clearInterval(interval);
  }, [visible]);

  useEffect(() => {
    if (!visible || !titleRef.current || !contentRef.current) return;
    const split = new SplitText(titleRef.current, { type: "chars" });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(split.chars, {
      yPercent: 110,
      opacity: 0,
      rotateX: -60,
      transformOrigin: "50% 100%",
      stagger: 0.035,
      duration: 0.9,
      delay: 0.3,
    });
    tl.eventCallback("onComplete", () => split.revert());
    return () => { tl.kill(); split.revert(); };
  }, [visible]);

  function handleContinue() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setExiting(true);
    setTimeout(() => setGone(true), 1200);
  }

  if (gone) return null;
  if (!visible) return null;

  return (
    <AnimatePresence>
      {!gone && (
        <div className="fixed inset-0 z-[9990] overflow-hidden">
          {/* Content layer */}
          <motion.div
            ref={contentRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
            animate={exiting ? { opacity: 0, scale: 0.94, y: -24 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Ambient orbs */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full blur-[120px]"
              style={{ background: "radial-gradient(circle, rgba(18,123,163,0.3) 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full blur-[100px]"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute left-[30%] top-[20%] h-[300px] w-[300px] rounded-full blur-[80px]"
              style={{ background: "radial-gradient(circle, rgba(53,168,214,0.12) 0%, transparent 70%)" }} />

            {/* Grid pattern */}
            <div className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />

            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 280, damping: 18 }}
              className="relative mb-6"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[rgba(18,123,163,0.18)]"
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <ShowPassLogo />
            </motion.div>

            {/* Brand name */}
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                className="font-display text-[clamp(48px,8vw,96px)] font-extrabold leading-none tracking-tight text-white"
              >
                ShowPass
              </h1>
            </div>

            {/* Animated service name */}
            <div className="mt-3 h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={serviceIndex}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-center font-mono text-[14px] tracking-[0.22em] text-[rgba(53,168,214,0.85)]"
                >
                  {SERVICES[serviceIndex].toUpperCase()}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-5 max-w-[400px] text-center font-mono text-[12px] tracking-[0.18em] text-[rgba(255,255,255,0.3)]"
            >
              INDIA&apos;S #1 MULTI-SERVICE BOOKING PLATFORM
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
              className="mt-8 h-px w-24 origin-left bg-gradient-to-r from-[var(--accent)] to-transparent"
            />

            {/* Services pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {SERVICES.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.07, type: "spring", stiffness: 400, damping: 20 }}
                  className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-3 py-1 text-[11px] text-[rgba(255,255,255,0.55)]"
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>

            {/* Continue button */}
            <motion.button
              onClick={handleContinue}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, type: "spring", stiffness: 280, damping: 22 }}
              whileHover={{ scale: 1.06, boxShadow: "0 0 0 6px rgba(18,123,163,0.2), 0 20px 60px rgba(18,123,163,0.5)" }}
              whileTap={{ scale: 0.96 }}
              className="group relative mt-10 flex items-center gap-3 overflow-hidden rounded-2xl border border-[rgba(53,168,214,0.4)] bg-[rgba(18,123,163,0.18)] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Sparkles size={16} className="text-[var(--accent-light)]" />
              <span>Enter ShowPass</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </motion.button>

            {/* Footer hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="absolute bottom-8 font-mono text-[11px] tracking-[0.2em] text-[rgba(255,255,255,0.18)]"
            >
              SHOWPASS · INDIA&apos;S SUPER BOOKING APP · 2026
            </motion.p>
          </motion.div>

          {/* Top curtain */}
          <motion.div
            className="absolute inset-x-0 top-0 z-0 h-1/2 bg-[#050e1a]"
            animate={exiting ? { y: "-102%" } : { y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Bottom curtain */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-[#050e1a]"
            animate={exiting ? { y: "102%" } : { y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
