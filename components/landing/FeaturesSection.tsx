"use client";

import { motion } from "framer-motion";
import { ArrowRight, Film, Building2, Train, Plane, Utensils, Home, Map } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: Film,
    title: "Movies & Live Events",
    description: "From blockbuster premieres to sold-out concerts and live sports — browse thousands of events, pick your exact seat, and get your e-ticket instantly.",
    badge: "badge-movies",
    href: "/events",
  },
  {
    icon: Building2,
    title: "Hotels & Resorts",
    description: "Compare top-rated hotels across India with live availability. Best price guarantee, instant confirmation, and free cancellation on select properties.",
    badge: "badge-hotels",
    href: "/hotels",
  },
  {
    icon: Train,
    title: "Train Booking",
    description: "Search trains across every class — SL, 3A, 2A, 1A and more. Check availability, track your PNR, and book in seconds without the IRCTC queue.",
    badge: "badge-trains",
    href: "/trains",
  },
  {
    icon: Plane,
    title: "Flights & Airlines",
    description: "Hunt down the lowest fares on 500+ routes. One-way, round-trip, or multi-city — compare across all major airlines and book in one tap.",
    badge: "badge-flights",
    href: "/flights",
  },
  {
    icon: Utensils,
    title: "Food & Dining",
    description: "Order from 10,000+ restaurants or book a table at the finest dining spots in your city. Track your delivery live, down to the last turn.",
    badge: "badge-food",
    href: "/food",
  },
  {
    icon: Home,
    title: "Stays & Airbnb",
    description: "Discover beachside villas, heritage havelis, mountain retreats and city apartments. Unique stays for every mood, budget, and group size.",
    badge: "badge-stays",
    href: "/stays",
  },
  {
    icon: Map,
    title: "City Explore & Tours",
    description: "Unlock the best of every city — curated day-trip itineraries, guided heritage walks, thrilling adventure activities, and local experiences you won't find elsewhere.",
    badge: "badge-explore",
    href: "/explore",
  },
];

export default function FeaturesSection() {
  const router = useRouter();

  return (
    <section id="features" className="relative bg-[var(--bg-secondary)] px-5 py-24 text-[var(--text-primary)] sm:px-8">
      <svg className="absolute -top-[79px] left-0 h-20 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path d="M0,80 C360,0 1080,80 1440,0 L1440,80 Z" fill="#050e1a" />
      </svg>

      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10">
        {/* Sticky sidebar */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-[100px]">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent)]">WHY SHOWPASS</p>

            <h2 className="mt-4 max-w-[480px] font-display text-[clamp(40px,4.4vw,50px)] font-bold leading-[1.06] text-[var(--accent-dark)]">
              Everything you
              <br />
              love to book,
              <br />
              in one app.
            </h2>

            <p className="mt-5 max-w-[320px] text-[16px] leading-[1.7] text-[var(--text-secondary)]">
              7 services. Millions of options. One beautifully simple experience.
            </p>

            <motion.button
              type="button"
              onClick={() => router.push("/events")}
              className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--accent)]"
              whileHover="hovered"
            >
              <span>Browse All Services</span>
              <motion.span
                variants={{ hovered: { x: 6 }, initial: { x: 0 } }}
                initial="initial"
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </div>
        </aside>

        {/* Feature cards */}
        <div className="col-span-12 space-y-5 lg:col-span-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                onClick={() => router.push(f.href)}
                className="group cursor-pointer rounded-[20px] border border-[var(--border)] bg-[rgba(255,255,255,0.72)] p-7 transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[8px_8px_20px_#c8dfea,-8px_-8px_20px_#ffffff]"
              >
                <div className="flex items-start gap-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${f.badge}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[18px] font-semibold text-[var(--accent-dark)]">{f.title}</h3>
                      <ArrowRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </div>
                    <p className="mt-2.5 text-[14.5px] leading-[1.7] text-[var(--text-secondary)]">{f.description}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
