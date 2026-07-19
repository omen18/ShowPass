"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EVENTS = [
  { id: 14, title: "Arijit Singh — Aashiqui Live", category: "Concert", date: "Jun 15", city: "Delhi", price: 1999, badge: "HOT", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80", color: "from-rose-600 to-pink-700" },
  { id: 18, title: "Coldplay — Music of the Spheres", category: "Concert", date: "Nov 22", city: "Kolkata", price: 4999, badge: "TRENDING", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80", color: "from-yellow-500 to-amber-600" },
  { id: 19, title: "IPL 2026 Final", category: "Sports", date: "May 25", city: "Kolkata", price: 1200, badge: "FEW LEFT", img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80", color: "from-blue-600 to-indigo-700" },
  { id: 8,  title: "Avengers: Doomsday", category: "Movie", date: "May 8", city: "Nationwide", price: 450, badge: "NOW SHOWING", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80", color: "from-red-600 to-rose-700" },
  { id: 15, title: "Diljit Dosanjh — Dil-Luminati", category: "Concert", date: "Jul 4", city: "Hyderabad", price: 2499, badge: "HOT", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80", color: "from-purple-600 to-violet-700" },
  { id: 33, title: "Sunburn Festival 2026", category: "Festival", date: "Dec 27", city: "Goa", price: 2999, badge: "EARLY BIRD", img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80", color: "from-orange-500 to-red-600" },
  { id: 26, title: "Kapil Sharma — Live", category: "Comedy", date: "Jun 1", city: "Delhi", price: 799, badge: "NEW", img: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&q=80", color: "from-green-500 to-emerald-600" },
  { id: 17, title: "Martin Garrix India Tour", category: "EDM", date: "Oct 15", city: "Mumbai", price: 3499, badge: "TRENDING", img: "https://images.unsplash.com/photo-1571266028243-a3b20fd4c6b5?w=400&q=80", color: "from-cyan-500 to-blue-600" },
];

const CATEGORIES = ["All", "Concert", "Movie", "Sports", "Festival", "Comedy", "EDM"];

const BADGE_STYLES: Record<string, string> = {
  "HOT": "bg-red-500 text-white",
  "TRENDING": "bg-orange-500 text-white",
  "FEW LEFT": "bg-amber-500 text-white",
  "NOW SHOWING": "bg-green-600 text-white",
  "EARLY BIRD": "bg-blue-500 text-white",
  "NEW": "bg-purple-500 text-white",
};

export default function EventsShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = activeCategory === "All" ? EVENTS : EVENTS.filter((e) => e.category === activeCategory);

  return (
    <section ref={ref} className="py-20 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest text-accent uppercase mb-3 border border-accent/30 rounded-full px-4 py-1.5 bg-accent/10">
            🎭 Events &amp; Entertainment
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            What&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-500">Happening</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Concerts, movies, sports, comedy shows &amp; festivals — book your spot today
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          className="flex gap-2 justify-center flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? "bg-accent text-white shadow-lg shadow-accent/30" : "bg-white/5 text-gray-400 border border-white/10 hover:border-accent/40 hover:text-white"}`}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((event, i) => (
            <motion.div key={event.id}
              initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.15 + i * 0.06 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] bg-gray-900">
              {/* Poster */}
              <img src={event.img} alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

              {/* Badge */}
              <div className="absolute top-3 left-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${BADGE_STYLES[event.badge] ?? "bg-gray-700 text-white"}`}>
                  {event.badge}
                </span>
              </div>

              {/* Category */}
              <div className="absolute top-3 right-3">
                <span className="text-xs font-semibold bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-md border border-white/10">
                  {event.category}
                </span>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-gray-300 mb-1">{event.date} · {event.city}</p>
                <h3 className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2">{event.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold text-sm">₹{event.price.toLocaleString()}<span className="text-gray-400 text-xs font-normal"> onwards</span></span>
                  <Link href="/events" className="text-xs bg-accent/90 hover:bg-accent text-white px-3 py-1 rounded-lg font-semibold transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                    Book →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          className="text-center mt-10">
          <Link href="/events"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 text-white px-8 py-3 rounded-xl font-semibold transition-all group">
            View All Events
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
