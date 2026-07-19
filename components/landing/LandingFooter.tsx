"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const LINKS = {
  "Discover": [
    { label: "Events", href: "/events" },
    { label: "Movies", href: "/events" },
    { label: "Concerts", href: "/events" },
    { label: "Sports", href: "/events" },
    { label: "Comedy Shows", href: "/events" },
  ],
  "Travel": [
    { label: "Flights", href: "/flights" },
    { label: "Trains", href: "/trains" },
    { label: "Buses", href: "/buses" },
    { label: "Hotels & Stays", href: "/hotels" },
    { label: "City Explorer", href: "/explore" },
  ],
  "Company": [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
  "Support": [
    { label: "Help Center", href: "#" },
    { label: "Cancellation Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const SOCIALS = [
  { icon: "𝕏", href: "#", label: "X (Twitter)" },
  { icon: "in", href: "#", label: "LinkedIn" },
  { icon: "f", href: "#", label: "Facebook" },
  { icon: "▶", href: "#", label: "YouTube" },
  { icon: "📸", href: "#", label: "Instagram" },
];

const PAYMENT_ICONS = ["Visa", "MC", "UPI", "GPay", "PhonePe", "PayTM", "RuPay"];

export default function LandingFooter() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main footer */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">B</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">BookIt</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-5">
              India&apos;s most loved entertainment & travel booking platform. Movies, concerts, flights, trains, buses and hotels — all in one place.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-8 h-8 bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 rounded-lg flex items-center justify-center text-gray-400 hover:text-white text-xs transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} BookIt Technologies Pvt. Ltd. All rights reserved.
          </p>
          {/* Payment icons */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs mr-1">Secure payments via</span>
            {PAYMENT_ICONS.map((icon) => (
              <span key={icon} className="bg-white/5 border border-white/10 rounded-md px-2 py-0.5 text-gray-400 text-xs font-medium">
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
