"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  motion, MotionValue,
  useMotionValue, useScroll, useSpring, useTransform,
} from "framer-motion";
import {
  Calendar, ChevronDown, MapPin, Play,
  Film, Building2, Train, Plane, Utensils, Home, Map,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils/formatDate";

gsap.registerPlugin(SplitText);

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Goa",
];

const SERVICES = [
  { icon: Film,      label: "Movies",  href: "/events",  cls: "badge-movies"  },
  { icon: Building2, label: "Hotels",  href: "/hotels",  cls: "badge-hotels"  },
  { icon: Train,     label: "Trains",  href: "/trains",  cls: "badge-trains"  },
  { icon: Plane,     label: "Flights", href: "/flights", cls: "badge-flights" },
  { icon: Utensils,  label: "Food",    href: "/food",    cls: "badge-food"    },
  { icon: Home,      label: "Stays",   href: "/stays",   cls: "badge-stays"   },
  { icon: Map,       label: "Explore", href: "/explore", cls: "badge-explore" },
];

/* ── Floating card types ── */

interface EventData { kind: "event"; category: string; isToday?: boolean; name: string; venue: string; date: string; seatsLeft: number; }
interface HotelData { kind: "hotel"; name: string; location: string; rating: number; reviews: number; price: number; amenities: string[]; roomsLeft: number; }
interface FlightData { kind: "flight"; airline: string; from: string; to: string; dep: string; arr: string; duration: string; price: number; cabin: string; }

type CardData = EventData | HotelData | FlightData;

interface FloatingCardProps { data: CardData; top: number; right: number; rotate: number; y: MotionValue<number>; }

function FloatingCard({ data, top, right, rotate, y }: FloatingCardProps) {
  const baseRX = useMotionValue(0);
  const baseRY = useMotionValue(0);
  const rX = useSpring(baseRX, { stiffness: 300, damping: 24 });
  const rY = useSpring(baseRY, { stiffness: 300, damping: 24 });

  return (
    <motion.article
      className="absolute w-[272px] rounded-[20px] border border-[rgba(255,255,255,0.09)] bg-[rgba(5,14,26,0.78)] p-5 text-white backdrop-blur-xl"
      style={{ top, right, y, rotate, rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.035, borderColor: "rgba(18,123,163,0.55)", boxShadow: "0 24px 64px rgba(0,0,0,0.55)", transition: { type: "spring", stiffness: 300, damping: 22 } }}
      onMouseMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        baseRY.set((e.clientX - (b.left + b.width / 2)) * 0.02);
        baseRX.set(-(e.clientY - (b.top + b.height / 2)) * 0.02);
      }}
      onMouseLeave={() => { baseRX.set(0); baseRY.set(0); }}
    >
      {data.kind === "event" && (
        <>
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-[rgba(18,123,163,0.22)] px-2.5 py-1 text-[11px] font-semibold text-[var(--accent-light)]">{data.category}</span>
            {data.isToday && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Live
              </span>
            )}
          </div>
          <h3 className="mb-3 text-[15px] font-semibold">{data.name}</h3>
          <div className="space-y-1.5 text-xs text-[rgba(255,255,255,0.5)]">
            <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{data.venue}</p>
            <p className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{formatDate(data.date)}</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className={`text-xs font-medium ${data.seatsLeft < 10 ? "text-amber-400" : "text-emerald-400"}`}>{data.seatsLeft} seats left</p>
            <button type="button" onClick={() => window.location.assign("/events")} className="text-xs font-semibold text-[var(--accent-light)] hover:text-white transition-colors">Book →</button>
          </div>
        </>
      )}

      {data.kind === "hotel" && (
        <>
          <div className="mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-amber-400" />
            <span className="font-mono text-[10px] tracking-widest text-amber-400/80">HOTEL</span>
          </div>
          <h3 className="mb-1 text-[15px] font-semibold">{data.name}</h3>
          <p className="mb-2 flex items-center gap-1 text-xs text-[rgba(255,255,255,0.45)]"><MapPin className="h-3 w-3" />{data.location}</p>
          <div className="mb-3 flex items-center gap-1.5">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">{data.rating}</span>
            <span className="text-[11px] text-[rgba(255,255,255,0.35)]">({data.reviews.toLocaleString("en-IN")} reviews)</span>
          </div>
          <div className="mb-4 flex flex-wrap gap-1">
            {data.amenities.map((a) => <span key={a} className="rounded-full border border-[rgba(255,255,255,0.1)] px-2 py-0.5 text-[10px] text-[rgba(255,255,255,0.45)]">{a}</span>)}
          </div>
          <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-3">
            <div>
              <p className="text-base font-bold">₹{data.price.toLocaleString("en-IN")}</p>
              <p className="text-[10px] text-[rgba(255,255,255,0.35)]">per night</p>
            </div>
            <button type="button" onClick={() => window.location.assign("/hotels")} className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors">{data.roomsLeft} left →</button>
          </div>
        </>
      )}

      {data.kind === "flight" && (
        <>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-[var(--accent-light)]" />
              <span className="font-mono text-[10px] tracking-widest text-[var(--accent-light)]/80">FLIGHT</span>
            </div>
            <span className="text-xs font-bold text-white">{data.airline}</span>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div className="text-center">
              <p className="text-xl font-extrabold">{data.dep}</p>
              <p className="text-xs text-[rgba(255,255,255,0.45)]">{data.from}</p>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1">
              <p className="text-[10px] text-[rgba(255,255,255,0.3)]">{data.duration}</p>
              <div className="flex w-full items-center gap-1">
                <div className="h-[1px] flex-1 bg-[rgba(255,255,255,0.12)]" />
                <Plane className="h-3 w-3 rotate-90 text-[var(--accent-light)]" />
                <div className="h-[1px] flex-1 bg-[rgba(255,255,255,0.12)]" />
              </div>
              <p className="text-[10px] text-[rgba(255,255,255,0.3)]">Non-stop</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold">{data.arr}</p>
              <p className="text-xs text-[rgba(255,255,255,0.45)]">{data.to}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-3">
            <div>
              <p className="text-base font-bold">₹{data.price.toLocaleString("en-IN")}</p>
              <p className="text-[10px] text-[rgba(255,255,255,0.35)]">{data.cabin}</p>
            </div>
            <button type="button" onClick={() => window.location.assign("/flights")} className="text-xs font-semibold text-[var(--accent-light)] hover:text-white transition-colors">Book →</button>
          </div>
        </>
      )}
    </motion.article>
  );
}

const lerp = (s: number, e: number, a: number) => s + (e - s) * a;

export default function HeroSection() {
  const router = useRouter();
  const [videoOpen, setVideoOpen] = useState(false);
  const [city, setCity] = useState("");

  const { scrollYProgress } = useScroll();
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const headlineRef    = useRef<HTMLHeadingElement | null>(null);
  const preheadingRef  = useRef<HTMLDivElement | null>(null);
  const sublineRef     = useRef<HTMLParagraphElement | null>(null);
  const ctaRef         = useRef<HTMLDivElement | null>(null);
  const indicatorRef   = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!headlineRef.current || !preheadingRef.current) return;
    const split = new SplitText(headlineRef.current, { type: "chars" });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(preheadingRef.current, { x: -26, opacity: 0, duration: 0.55 })
      .from(split.chars, { yPercent: 120, opacity: 0, rotateX: -60, transformOrigin: "50% 100%", stagger: 0.016, duration: 0.95 }, 0.12);
    tl.eventCallback("onComplete", () => split.revert());
    return () => { tl.kill(); split.revert(); };
  }, []);

  useEffect(() => {
    if (!indicatorRef.current) return;
    const tw = gsap.to(indicatorRef.current, { y: 10, duration: 1.2, ease: "power1.inOut", yoyo: true, repeat: -1 });
    return () => { tw.kill(); };
  }, []);

  const btnRX = useMotionValue(0);
  const btnRY = useMotionValue(0);
  const btnX  = useSpring(btnRX, { stiffness: 260, damping: 22, mass: 0.45 });
  const btnY  = useSpring(btnRY, { stiffness: 260, damping: 22, mass: 0.45 });

  const cards = useMemo<FloatingCardProps[]>(() => [
    {
      data: { kind: "event", category: "Music", isToday: true, name: "AR Rahman Live Concert", venue: "MMRDA Grounds, Mumbai", date: "2026-05-05", seatsLeft: 8 },
      top: 10, right: -10, rotate: -3, y: card1Y,
    },
    {
      data: { kind: "hotel", name: "The Grand Hyatt", location: "Bandra, Mumbai", rating: 4.8, reviews: 3241, price: 12500, amenities: ["WiFi", "Pool", "Spa", "Gym"], roomsLeft: 4 },
      top: 155, right: 45, rotate: 2, y: card2Y,
    },
    {
      data: { kind: "flight", airline: "IndiGo", from: "DEL", to: "BOM", dep: "06:15", arr: "08:30", duration: "2h 15m", price: 3499, cabin: "Economy" },
      top: 310, right: 95, rotate: -1.5, y: card3Y,
    },
  ], [card1Y, card2Y, card3Y]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden hero-dark pt-24 text-white">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-[120px] -top-[220px] h-[750px] w-[750px] animate-float rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(18,123,163,0.28) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-[180px] right-[15%] h-[550px] w-[550px] animate-float rounded-full blur-[80px]"
        style={{ animationDuration: "10s", animationDirection: "reverse", background: "radial-gradient(circle, rgba(53,168,214,0.16) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute left-[38%] top-[35%] h-[320px] w-[320px] animate-float rounded-full blur-[60px]"
        style={{ animationDuration: "7s", animationDelay: "2s", background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)" }} />

      {/* Grid overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

      <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1400px] grid-cols-12 px-5 pb-20 sm:px-8">
        {/* ── Left: copy ── */}
        <div className="col-span-12 flex items-center py-12 lg:col-span-7 lg:py-0">
          <div className="space-y-6">
            {/* Pre-heading */}
            <div ref={preheadingRef} className="flex items-center gap-3">
              <span className="h-[2px] w-6 rounded bg-[var(--accent-light)]" />
              <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--accent-light)]">INDIA&apos;S #1 MULTI-SERVICE PLATFORM</p>
            </div>

            {/* City selector */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
              className="flex w-fit items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-4 py-2 backdrop-blur-sm"
            >
              <MapPin className="h-4 w-4 text-[var(--accent-light)]" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="cursor-pointer bg-transparent text-sm font-medium text-white outline-none"
              >
                <option value="">Select your city</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-[rgba(255,255,255,0.4)]" />
            </motion.div>

            {/* Headline */}
            <h1 ref={headlineRef} className="font-display leading-[0.94] tracking-[-0.03em]">
              <span className="block text-[clamp(48px,7vw,90px)] font-extrabold text-white">Book Movies,</span>
              <span className="block text-[clamp(56px,8vw,108px)] font-extrabold italic text-gradient-blue">
                Hotels &amp;
              </span>
              <span className="block text-[clamp(48px,7vw,90px)] font-extrabold text-white">so much more.</span>
            </h1>

            {/* Subtitle */}
            <p ref={sublineRef} className="max-w-[480px] text-[clamp(15px,1.8vw,18px)] leading-[1.65] text-[rgba(255,255,255,0.6)]">
              Movies, trains, flights, hotels, food, stays and city experiences — every booking in one place.
            </p>

            {/* Service pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.href}
                    type="button"
                    onClick={() => router.push(s.href)}
                    className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all duration-200 hover:scale-105 ${s.cls}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {s.label}
                  </button>
                );
              })}
            </motion.div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <motion.div
                style={{ x: btnX, y: btnY }}
                onMouseMove={(e) => {
                  const b = e.currentTarget.getBoundingClientRect();
                  btnRX.set(lerp(btnRX.get(), (e.clientX - (b.left + b.width / 2)) * 0.22, 0.3));
                  btnRY.set(lerp(btnRY.get(), (e.clientY - (b.top + b.height / 2)) * 0.22, 0.3));
                }}
                onMouseLeave={() => { btnRX.set(0); btnRY.set(0); }}
              >
                <Button
                  onClick={() => router.push("/events")}
                  className="relative h-[52px] overflow-hidden rounded-xl bg-[var(--accent)] px-8 text-base font-semibold text-white shadow-[0_0_32px_rgba(18,123,163,0.5)] hover:bg-[var(--accent-strong)]"
                >
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] bg-[length:200%_100%] animate-shimmer" />
                  <span className="relative">Explore All</span>
                </Button>
              </motion.div>

              <Button
                variant="ghost"
                onClick={() => setVideoOpen(true)}
                className="h-[52px] rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.06)] px-6 text-base font-medium text-white backdrop-blur-sm hover:bg-[rgba(255,255,255,0.12)]"
              >
                <Play className="h-4 w-4 animate-pulse text-[var(--accent-light)]" />
                Watch Demo
              </Button>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 text-[12px] text-[rgba(255,255,255,0.38)]">
              <span>✓ 5M+ Bookings Made</span>
              <span className="h-1 w-1 rounded-full bg-[rgba(255,255,255,0.2)]" />
              <span>✓ 100+ Cities Covered</span>
              <span className="h-1 w-1 rounded-full bg-[rgba(255,255,255,0.2)]" />
              <span>✓ Safe &amp; Secure Payments</span>
            </div>
          </div>
        </div>

        {/* ── Right: floating cards ── */}
        <div className="relative col-span-12 hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end">
          <div className="relative h-[640px] w-full max-w-[560px]">
            {cards.map((c) => (
              <FloatingCard key={`${c.data.kind}-${c.top}`} {...c} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div ref={indicatorRef} className="flex flex-col items-center gap-1.5">
          <ChevronDown className="h-5 w-5 text-[rgba(255,255,255,0.35)]" />
          <p className="font-mono text-xs text-[rgba(255,255,255,0.25)]">Scroll to explore</p>
        </div>
      </div>

      <Modal isOpen={videoOpen} onClose={() => setVideoOpen(false)} title="ShowPass Demo">
        <div className="space-y-4 text-sm text-[var(--text-secondary)]">
          <p>Your one-stop platform for movies, hotels, flights, trains, food, stays and city experiences.</p>
          <Button onClick={() => router.push("/events")} className="w-full bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]">
            Start Booking
          </Button>
        </div>
      </Modal>
    </section>
  );
}
