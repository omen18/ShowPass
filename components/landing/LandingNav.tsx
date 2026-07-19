"use client";

import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Film, Building2, Train, Plane, Utensils, Home, Map } from "lucide-react";

import Button from "@/components/ui/Button";

const sectionLinks = [
  { label: "Features", id: "features" },
  { label: "Services", id: "how-it-works" },
  { label: "Events", id: "events" },
];

const SERVICE_NAV = [
  { icon: Film,      label: "Movies & Events", href: "/events" },
  { icon: Building2, label: "Hotels",           href: "/hotels" },
  { icon: Train,     label: "Trains",           href: "/trains" },
  { icon: Plane,     label: "Flights",          href: "/flights" },
  { icon: Utensils,  label: "Food",             href: "/food" },
  { icon: Home,      label: "Stays",            href: "/stays" },
  { icon: Map,       label: "Explore",          href: "/explore" },
];

const mobileLinks = [
  ...sectionLinks,
  { label: "Sign In", href: "/auth/login" },
  { label: "Book Now", href: "/events" },
];

const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

export default function LandingNav() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [serviceBarVisible, setServiceBarVisible] = useState(false);

  const { scrollY } = useScroll();
  const barBg      = useTransform(scrollY, [0, 80], ["rgba(5,14,26,0)", "rgba(5,14,26,0.88)"]);
  const blurValue  = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(20px)"]);
  const borderBot  = useTransform(scrollY, [0, 80], ["rgba(18,123,163,0)", "rgba(18,123,163,0.2)"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
    setServiceBarVisible(latest > 40);
  });

  const topLineRef    = useRef<HTMLSpanElement | null>(null);
  const middleLineRef = useRef<HTMLSpanElement | null>(null);
  const bottomLineRef = useRef<HTMLSpanElement | null>(null);
  const mobileOverlayRef = useRef<HTMLDivElement | null>(null);
  const mobileLinkRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const top    = topLineRef.current;
    const middle = middleLineRef.current;
    const bottom = bottomLineRef.current;
    const overlay = mobileOverlayRef.current;
    const links  = mobileLinkRefs.current.filter(Boolean) as HTMLButtonElement[];

    if (!top || !middle || !bottom || !overlay) return;

    const tl = gsap.timeline({ defaults: { duration: 0.35, ease: "power2.out" } });

    if (isMobileOpen) {
      gsap.set(overlay, { pointerEvents: "auto" });
      tl.to(top,    { y: 7,  rotate:  45 }, 0)
        .to(middle, { opacity: 0 },           0)
        .to(bottom, { y: -7, rotate: -45 },   0)
        .to(overlay, { clipPath: "circle(150% at calc(100% - 34px) 34px)", duration: 0.5, ease: "power2.inOut" }, 0)
        .fromTo(links, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: "power3.out" }, 0.12);
    } else {
      tl.to(top,    { y: 0, rotate: 0 },  0)
        .to(middle, { opacity: 1 },         0)
        .to(bottom, { y: 0, rotate: 0 },   0)
        .to(overlay, { clipPath: "circle(0% at calc(100% - 34px) 34px)", duration: 0.5, ease: "power2.inOut", onComplete: () => gsap.set(overlay, { pointerEvents: "none" }) }, 0);
    }
    return () => { tl.kill(); };
  }, [isMobileOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileOpen(false);
  };

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.4 });

  return (
    <>
      {/* Main nav bar */}
      <motion.nav
        className="fixed inset-x-0 top-0 z-50 border-b"
        style={{
          backgroundColor: barBg,
          borderBottomColor: borderBot,
          backdropFilter: blurValue,
          WebkitBackdropFilter: blurValue,
        }}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] shadow-[0_0_16px_rgba(18,123,163,0.5)]">
              <span className="font-display text-[13px] font-extrabold text-white">SP</span>
            </div>
            <span className={`font-display text-[17px] font-bold tracking-[0.01em] transition-colors duration-300 ${isScrolled ? "text-white" : "text-white"}`}>
              Show<span className="text-[var(--accent-light)]">Pass</span>
            </span>
          </Link>

          {/* Desktop section links */}
          <div className="hidden items-center gap-7 md:flex">
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="group relative text-sm font-medium text-[rgba(255,255,255,0.7)] transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[var(--accent-light)] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/auth/login"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.15)] px-5 text-sm font-medium text-white transition-all duration-200 hover:border-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.08)]"
            >
              Sign In
            </Link>

            <motion.div
              style={{ x, y }}
              onMouseMove={(e) => {
                const b = e.currentTarget.getBoundingClientRect();
                rawX.set(lerp(rawX.get(), (e.clientX - (b.left + b.width / 2)) * 0.2, 0.32));
                rawY.set(lerp(rawY.get(), (e.clientY - (b.top + b.height / 2)) * 0.2, 0.32));
              }}
              onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
            >
              <Button
                className="h-10 rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(18,123,163,0.45)] hover:bg-[var(--accent-strong)]"
                onClick={() => router.push("/events")}
              >
                Book Now
              </Button>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle navigation"
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] md:hidden"
            onClick={() => setIsMobileOpen((o) => !o)}
          >
            <span ref={topLineRef}    className="h-[2px] w-5 rounded bg-white" />
            <span ref={middleLineRef} className="h-[2px] w-5 rounded bg-white" />
            <span ref={bottomLineRef} className="h-[2px] w-5 rounded bg-white" />
          </button>
        </div>

        {/* Service tabs row — appears on scroll */}
        <motion.div
          animate={{ opacity: serviceBarVisible ? 1 : 0, height: serviceBarVisible ? "auto" : 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden border-t border-[rgba(18,123,163,0.15)]"
        >
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-2 sm:px-8">
            {SERVICE_NAV.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-[rgba(255,255,255,0.6)] transition-all hover:bg-[rgba(255,255,255,0.07)] hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {s.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile overlay */}
      <div
        ref={mobileOverlayRef}
        className="fixed inset-0 z-40 flex items-center justify-center bg-[#050e1a] md:hidden"
        style={{ clipPath: "circle(0% at calc(100% - 34px) 34px)", pointerEvents: "none" }}
        onClick={(e) => { if (e.target === e.currentTarget) setIsMobileOpen(false); }}
      >
        <div className="flex w-full flex-col items-center gap-8 px-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]">
              <span className="font-display text-[14px] font-extrabold text-white">SP</span>
            </div>
            <span className="font-display text-2xl font-bold text-white">
              Show<span className="text-[var(--accent-light)]">Pass</span>
            </span>
          </div>
          {mobileLinks.map((link, i) => {
            const onClick = () => {
              if ("id" in link) { scrollToSection(link.id); return; }
              router.push(link.href);
              setIsMobileOpen(false);
            };
            return (
              <button
                key={`${link.label}-${i}`}
                ref={(el) => { mobileLinkRefs.current[i] = el; }}
                type="button"
                className="text-2xl font-display font-bold tracking-wide text-white hover:text-[var(--accent-light)] transition-colors"
                onClick={onClick}
              >
                {link.label}
              </button>
            );
          })}
          {/* Service grid in mobile */}
          <div className="mt-4 grid grid-cols-4 gap-3 w-full max-w-xs">
            {SERVICE_NAV.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.href}
                  type="button"
                  onClick={() => { router.push(s.href); setIsMobileOpen(false); }}
                  className="flex flex-col items-center gap-1 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-3 text-[10px] text-[rgba(255,255,255,0.6)]"
                >
                  <Icon className="h-5 w-5 text-[var(--accent-light)]" />
                  {s.label.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
