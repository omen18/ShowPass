"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const REVIEWS = [
  { name: "Priya Sharma", handle: "@priya_s", avatar: "P", color: "bg-pink-500", rating: 5, text: "Booked Coldplay tickets in under 2 minutes. The interface is so clean — no confusion, no hidden fees. The QR code worked perfectly at the gate!", category: "Concert Booking", verified: true },
  { name: "Rohit Mehta", handle: "@rohitmehta", avatar: "R", color: "bg-blue-500", rating: 5, text: "Planned my entire Goa trip here — flights, hotel, and even a day trip. Everything in one place. The explore guide is genuinely useful!", category: "Travel Planning", verified: true },
  { name: "Ananya K", handle: "@ananya.k", avatar: "A", color: "bg-violet-500", rating: 5, text: "Used FIRST50 promo code and got 50% off my first booking. The payment flow is smooth and I actually feel safe giving my card details.", category: "Movie Booking", verified: true },
  { name: "Vikram Nair", handle: "@vikramnair_", avatar: "V", color: "bg-emerald-500", rating: 5, text: "The IPL ticket booking was insanely fast. Other platforms crashed during the sale but this one handled it perfectly. Booked 4 tickets in seconds.", category: "Sports Ticket", verified: true },
  { name: "Sneha Reddy", handle: "@sneha.red", avatar: "S", color: "bg-amber-500", rating: 4, text: "Love the train booking section — you can see class-wise availability and book directly. So much better than IRCTC. Wish it had real seat selection!", category: "Train Booking", verified: true },
  { name: "Arjun Patel", handle: "@arjunp", avatar: "A", color: "bg-rose-500", rating: 5, text: "Booked a boutique hotel in Udaipur through the stays section. The curated properties are excellent and the price breakdown is transparent.", category: "Hotel Booking", verified: true },
];

const STATS = [
  { value: "2M+", label: "Happy Customers" },
  { value: "4.8★", label: "Average Rating" },
  { value: "50K+", label: "Events Listed" },
  { value: "99.9%", label: "Uptime" },
];

export default function ReviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest text-accent uppercase mb-3 border border-accent/20 rounded-full px-4 py-1.5 bg-accent/5">
            ❤️ Loved by Millions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-500">Are Saying</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Real reviews from real people who booked through our platform
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.15 + i * 0.07 }}
              className="text-center bg-gradient-to-br from-accent/5 to-pink-50 rounded-2xl py-5 px-4 border border-accent/10">
              <div className="text-3xl font-bold text-gray-900 mb-0.5">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <motion.div key={review.name}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.07 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-accent/20 transition-all group">
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={`text-base ${j < review.rating ? "text-amber-400" : "text-gray-200"}`}>★</span>
                ))}
                <span className="ml-2 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">{review.category}</span>
              </div>

              {/* Review text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">"{review.text}"</p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 ${review.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                      {review.verified && (
                        <span className="text-blue-500 text-xs" title="Verified booking">✓</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{review.handle}</p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-accent">Verified ✓</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* App store-style CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
          className="mt-14 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <p className="text-gray-500 text-sm">Trusted by 2 million+ users across India</p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["bg-pink-500", "bg-blue-500", "bg-green-500", "bg-amber-500", "bg-violet-500"].map((c, i) => (
                  <div key={i} className={`w-8 h-8 ${c} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                    {["P", "R", "A", "V", "S"][i]}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
                <span className="text-gray-700 font-bold ml-1">4.8</span>
                <span className="text-gray-400 text-sm">(12,000+ reviews)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
