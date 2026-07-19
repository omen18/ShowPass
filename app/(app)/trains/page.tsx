"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Train, MapPin, Calendar, Users, Search, ArrowRight, Clock, Star, Zap } from "lucide-react";
import ServiceBookingModal, { ServiceItem } from "@/components/shared/ServiceBookingModal";

interface TrainRoute {
  id: string;
  name: string;
  number: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  distance: string;
  classes: { code: string; label: string; price: number; available: number }[];
  type: string;
  rating: number;
  runsOn: string;
}

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Lucknow"];

const TRAINS: TrainRoute[] = [
  {
    id: "T001", name: "Rajdhani Express", number: "12951", from: "Mumbai", to: "Delhi",
    dep: "17:00", arr: "08:35", duration: "15h 35m", distance: "1384 km",
    classes: [
      { code: "SL", label: "Sleeper", price: 690, available: 145 },
      { code: "3A", label: "3rd AC", price: 1805, available: 62 },
      { code: "2A", label: "2nd AC", price: 2560, available: 28 },
      { code: "1A", label: "1st AC", price: 4295, available: 10 },
    ],
    type: "Rajdhani", rating: 4.6, runsOn: "Mon, Wed, Fri, Sun",
  },
  {
    id: "T002", name: "Vande Bharat Express", number: "20905", from: "Mumbai", to: "Delhi",
    dep: "06:00", arr: "14:00", duration: "8h 00m", distance: "1384 km",
    classes: [
      { code: "CC", label: "Chair Car", price: 1555, available: 210 },
      { code: "EC", label: "Exec. Chair", price: 2950, available: 52 },
    ],
    type: "Vande Bharat", rating: 4.9, runsOn: "Daily",
  },
  {
    id: "T003", name: "Shatabdi Express", number: "12029", from: "Delhi", to: "Jaipur",
    dep: "06:15", arr: "10:40", duration: "4h 25m", distance: "302 km",
    classes: [
      { code: "CC", label: "Chair Car", price: 720, available: 180 },
      { code: "EC", label: "Exec. Chair", price: 1380, available: 40 },
    ],
    type: "Shatabdi", rating: 4.5, runsOn: "Daily except Wed",
  },
  {
    id: "T004", name: "Chennai Rajdhani", number: "12433", from: "Chennai", to: "Delhi",
    dep: "06:10", arr: "10:10+1", duration: "28h 00m", distance: "2180 km",
    classes: [
      { code: "SL", label: "Sleeper", price: 1080, available: 200 },
      { code: "3A", label: "3rd AC", price: 2870, available: 80 },
      { code: "2A", label: "2nd AC", price: 4095, available: 30 },
      { code: "1A", label: "1st AC", price: 6875, available: 8 },
    ],
    type: "Rajdhani", rating: 4.4, runsOn: "Tue, Fri",
  },
  {
    id: "T005", name: "Howrah Duronto", number: "12259", from: "Kolkata", to: "Delhi",
    dep: "08:05", arr: "07:15+1", duration: "23h 10m", distance: "1441 km",
    classes: [
      { code: "SL", label: "Sleeper", price: 760, available: 300 },
      { code: "3A", label: "3rd AC", price: 1990, available: 120 },
      { code: "2A", label: "2nd AC", price: 2850, available: 45 },
    ],
    type: "Duronto", rating: 4.3, runsOn: "Mon, Thu, Sat",
  },
  {
    id: "T006", name: "Bengaluru Rajdhani", number: "22691", from: "Bangalore", to: "Delhi",
    dep: "20:00", arr: "06:35+2", duration: "34h 35m", distance: "2444 km",
    classes: [
      { code: "3A", label: "3rd AC", price: 3200, available: 90 },
      { code: "2A", label: "2nd AC", price: 4550, available: 35 },
      { code: "1A", label: "1st AC", price: 7650, available: 12 },
    ],
    type: "Rajdhani", rating: 4.5, runsOn: "Daily",
  },
  {
    id: "T007", name: "Deccan Queen", number: "12123", from: "Pune", to: "Mumbai",
    dep: "07:15", arr: "10:25", duration: "3h 10m", distance: "192 km",
    classes: [
      { code: "CC", label: "Chair Car", price: 360, available: 250 },
      { code: "FC", label: "First Class", price: 720, available: 60 },
    ],
    type: "Superfast", rating: 4.7, runsOn: "Daily",
  },
  {
    id: "T008", name: "Hyderabad Express", number: "17031", from: "Hyderabad", to: "Mumbai",
    dep: "16:30", arr: "14:00+1", duration: "21h 30m", distance: "711 km",
    classes: [
      { code: "SL", label: "Sleeper", price: 450, available: 350 },
      { code: "3A", label: "3rd AC", price: 1210, available: 110 },
      { code: "2A", label: "2nd AC", price: 1740, available: 40 },
    ],
    type: "Express", rating: 4.1, runsOn: "Daily",
  },
  {
    id: "T009", name: "Tejas Express", number: "82501", from: "Mumbai", to: "Ahmedabad",
    dep: "06:40", arr: "13:10", duration: "6h 30m", distance: "492 km",
    classes: [
      { code: "CC", label: "Chair Car", price: 1030, available: 180 },
      { code: "EC", label: "Exec. Chair", price: 1840, available: 50 },
    ],
    type: "Tejas", rating: 4.8, runsOn: "Daily except Tue",
  },
  {
    id: "T010", name: "Lucknow Mail", number: "12229", from: "Delhi", to: "Lucknow",
    dep: "22:15", arr: "05:00+1", duration: "6h 45m", distance: "511 km",
    classes: [
      { code: "SL", label: "Sleeper", price: 290, available: 400 },
      { code: "3A", label: "3rd AC", price: 760, available: 140 },
      { code: "2A", label: "2nd AC", price: 1090, available: 55 },
      { code: "1A", label: "1st AC", price: 1840, available: 16 },
    ],
    type: "Mail", rating: 4.0, runsOn: "Daily",
  },
];

const CLASS_COLORS: Record<string, string> = {
  SL: "bg-blue-50 text-blue-700 border-blue-200",
  "3A": "bg-purple-50 text-purple-700 border-purple-200",
  "2A": "bg-amber-50 text-amber-700 border-amber-200",
  "1A": "bg-red-50 text-red-700 border-red-200",
  CC: "bg-green-50 text-green-700 border-green-200",
  EC: "bg-orange-50 text-orange-700 border-orange-200",
  FC: "bg-rose-50 text-rose-700 border-rose-200",
};

const TYPE_COLORS: Record<string, string> = {
  "Rajdhani": "bg-red-500",
  "Vande Bharat": "bg-[var(--accent)]",
  "Shatabdi": "bg-orange-500",
  "Duronto": "bg-purple-600",
  "Tejas": "bg-emerald-600",
  "Superfast": "bg-blue-500",
  "Express": "bg-gray-500",
  "Mail": "bg-gray-600",
};

export default function TrainsPage() {
  const [from, setFrom] = useState("Mumbai");
  const [to, setTo] = useState("Delhi");
  const [date, setDate] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [searched, setSearched] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<TrainRoute | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [bookingItem, setBookingItem] = useState<ServiceItem | null>(null);

  const results = useMemo(() => {
    if (!searched) return [];
    return TRAINS.filter((t) => t.from === from && t.to === to);
  }, [searched, from, to]);

  function bookClass(train: TrainRoute, cls: (typeof train.classes)[0]) {
    setBookingItem({
      type: "train",
      title: `${train.name} (${train.number})`,
      subtitle: `${train.from} → ${train.to} · ${cls.label} (${cls.code})`,
      price: cls.price,
      details: {
        "Train": `${train.name} #${train.number}`,
        "Route": `${train.from} → ${train.to}`,
        "Departure": train.dep,
        "Arrival": train.arr,
        "Duration": train.duration,
        "Distance": train.distance,
        "Class": `${cls.label} (${cls.code})`,
        "Runs On": train.runsOn,
        "Date": new Date(date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
      },
    });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <div className="hero-trains py-12 px-5 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-green-300 mb-2">BOOK TRAINS</p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-8">
            Rail Journeys Across India
          </h1>

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto_auto_auto]">
              <div className="relative">
                <Train size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <select value={from} onChange={(e) => setFrom(e.target.value)}
                  className="w-full rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none appearance-none backdrop-blur-sm">
                  {CITIES.map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
              </div>
              <div className="relative">
                <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <select value={to} onChange={(e) => setTo(e.target.value)}
                  className="w-full rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none appearance-none backdrop-blur-sm">
                  {CITIES.filter((c) => c !== from).map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
              </div>
              <div className="relative">
                <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none backdrop-blur-sm" />
              </div>
              <button onClick={() => setSearched(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30">
                <Search size={15} /> Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 space-y-4">
        {!searched ? (
          <div className="py-20 text-center">
            <Train size={48} className="mx-auto mb-4 text-[var(--border)]" />
            <p className="text-[var(--text-muted)] text-lg font-medium">Search trains to get started</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">IRCTC-style booking with live availability</p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-white p-12 text-center">
            <Train size={40} className="mx-auto mb-3 text-[var(--border)]" />
            <p className="text-[var(--text-muted)]">No trains found for this route.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-bold text-[var(--accent-dark)]">{results.length}</span> trains · {from} → {to}
            </p>
            <AnimatePresence>
              {results.map((train, i) => (
                <motion.div key={train.id}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden"
                >
                  {/* Train header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${TYPE_COLORS[train.type] ?? "bg-gray-400"}`} />
                      <p className="font-bold text-[var(--accent-dark)] text-sm">{train.name}</p>
                      <span className="text-[11px] font-mono text-[var(--text-muted)] bg-gray-50 px-2 py-0.5 rounded-md">#{train.number}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${TYPE_COLORS[train.type] ?? "bg-gray-500"}`}>
                        {train.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      {train.rating}
                    </div>
                  </div>

                  {/* Route info */}
                  <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex flex-1 items-center gap-4">
                      <div>
                        <p className="text-2xl font-extrabold text-[var(--accent-dark)]">{train.dep}</p>
                        <p className="text-xs text-[var(--text-muted)]">{train.from}</p>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                          <Clock size={9} /> {train.duration}
                        </div>
                        <div className="flex items-center gap-1 my-1 w-full">
                          <div className="h-px flex-1 border-t-2 border-dashed border-gray-200" />
                          <Train size={12} className="text-[var(--accent)] shrink-0" />
                          <div className="h-px flex-1 border-t-2 border-dashed border-gray-200" />
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)]">{train.distance}</p>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-[var(--accent-dark)]">{train.arr}</p>
                        <p className="text-xs text-[var(--text-muted)]">{train.to}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] sm:text-right">
                      Runs on: <span className="font-medium">{train.runsOn}</span>
                    </p>
                  </div>

                  {/* Classes */}
                  <div className="border-t border-gray-50 px-5 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">Available Classes</p>
                    <div className="flex flex-wrap gap-2">
                      {train.classes.map((cls) => (
                        <motion.button
                          key={cls.code}
                          onClick={() => bookClass(train, cls)}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className={`rounded-xl border px-4 py-2.5 text-left transition-all ${CLASS_COLORS[cls.code] ?? "bg-gray-50 text-gray-700 border-gray-200"} hover:shadow-sm`}
                        >
                          <p className="text-xs font-extrabold">{cls.code}</p>
                          <p className="text-[10px] mt-0.5">{cls.label}</p>
                          <p className="text-sm font-bold mt-1">₹{cls.price.toLocaleString("en-IN")}</p>
                          <p className="text-[9px] mt-0.5 opacity-70">{cls.available} avail.</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}
      </div>

      <ServiceBookingModal item={bookingItem} onClose={() => setBookingItem(null)} />
    </div>
  );
}
