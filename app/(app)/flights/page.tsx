"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane, MapPin, Calendar, Users, ArrowRight,
  ArrowLeftRight, Search, ChevronDown, Star, Clock,
  Zap, Filter, SortAsc,
} from "lucide-react";
import ServiceBookingModal, { ServiceItem } from "@/components/shared/ServiceBookingModal";

// ── Mock data ────────────────────────────────────────────────────────────────

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Goa", "Jaipur", "Ahmedabad"];

interface Flight {
  id: string;
  airline: string;
  logo: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  stops: number;
  price: number;
  cabin: "Economy" | "Business" | "First";
  seatsLeft: number;
  rating: number;
}

const AIRLINES = [
  { name: "IndiGo",     color: "#003B95", bg: "bg-[#003B95]" },
  { name: "Air India",  color: "#D11F44", bg: "bg-[#D11F44]" },
  { name: "SpiceJet",   color: "#F04E23", bg: "bg-[#F04E23]" },
  { name: "Vistara",    color: "#4B0082", bg: "bg-[#4B0082]" },
  { name: "AirAsia",    color: "#CC0001", bg: "bg-[#CC0001]" },
  { name: "Akasa Air",  color: "#F97316", bg: "bg-[#F97316]" },
];

function gen(id: string, airline: string, from: string, to: string, dep: string, arr: string, dur: string, stops: number, price: number, seatsLeft: number): Flight {
  return { id, airline, logo: airline.slice(0, 2).toUpperCase(), from, to, dep, arr, duration: dur, stops, price, cabin: "Economy", seatsLeft, rating: parseFloat((3.8 + Math.random() * 1.1).toFixed(1)) };
}

const FLIGHTS: Flight[] = [
  gen("FL001", "IndiGo",    "Mumbai",    "Delhi",     "06:15", "08:30", "2h 15m", 0, 3499,  12),
  gen("FL002", "Air India", "Mumbai",    "Delhi",     "08:00", "10:25", "2h 25m", 0, 4299,  5),
  gen("FL003", "SpiceJet",  "Mumbai",    "Delhi",     "10:40", "13:05", "2h 25m", 0, 2999,  23),
  gen("FL004", "Vistara",   "Mumbai",    "Delhi",     "14:30", "16:50", "2h 20m", 0, 5199,  8),
  gen("FL005", "Akasa Air", "Mumbai",    "Delhi",     "17:15", "19:35", "2h 20m", 0, 2799,  30),
  gen("FL006", "IndiGo",    "Delhi",     "Bangalore", "07:20", "09:45", "2h 25m", 0, 3699,  18),
  gen("FL007", "AirAsia",   "Delhi",     "Bangalore", "11:00", "13:30", "2h 30m", 0, 2499,  6),
  gen("FL008", "Air India", "Delhi",     "Bangalore", "15:45", "18:15", "2h 30m", 0, 4599,  3),
  gen("FL009", "IndiGo",    "Mumbai",    "Goa",       "08:30", "09:45", "1h 15m", 0, 2199,  14),
  gen("FL010", "SpiceJet",  "Mumbai",    "Goa",       "12:15", "13:30", "1h 15m", 0, 1899,  20),
  gen("FL011", "Vistara",   "Mumbai",    "Goa",       "06:50", "08:05", "1h 15m", 0, 3299,  7),
  gen("FL012", "IndiGo",    "Bangalore", "Chennai",   "07:10", "08:20", "1h 10m", 0, 1499,  25),
  gen("FL013", "Air India", "Chennai",   "Mumbai",    "09:00", "11:30", "2h 30m", 0, 3899,  9),
  gen("FL014", "IndiGo",    "Hyderabad", "Mumbai",    "06:45", "08:30", "1h 45m", 0, 2699,  16),
  gen("FL015", "Akasa Air", "Delhi",     "Goa",       "10:30", "13:00", "2h 30m", 1, 3199,  11),
  gen("FL016", "SpiceJet",  "Kolkata",   "Delhi",     "07:00", "09:30", "2h 30m", 0, 3299,  4),
  gen("FL017", "IndiGo",    "Mumbai",    "Hyderabad", "07:55", "09:30", "1h 35m", 0, 2499,  19),
  gen("FL018", "Vistara",   "Delhi",     "Mumbai",    "19:00", "21:20", "2h 20m", 0, 4999,  2),
  gen("FL019", "AirAsia",   "Pune",      "Delhi",     "06:30", "09:10", "2h 40m", 0, 2299,  27),
  gen("FL020", "Air India", "Mumbai",    "Jaipur",    "08:15", "10:05", "1h 50m", 0, 3199,  8),
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function FlightsPage() {
  const [from, setFrom] = useState("Mumbai");
  const [to, setTo] = useState("Delhi");
  const [date, setDate] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [pax, setPax] = useState(1);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure">("price");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [airlineFilter, setAirlineFilter] = useState<string[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<ServiceItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  function swap() { const t = from; setFrom(to); setTo(t); }

  const results = useMemo(() => {
    if (!searched) return [];
    return FLIGHTS
      .filter((f) => {
        if (f.from !== from || f.to !== to) return false;
        if (f.price > maxPrice) return false;
        if (airlineFilter.length > 0 && !airlineFilter.includes(f.airline)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "departure") return a.dep.localeCompare(b.dep);
        return a.duration.localeCompare(b.duration);
      });
  }, [searched, from, to, maxPrice, airlineFilter, sortBy]);

  function bookFlight(f: Flight) {
    setSelectedFlight({
      type: "flight",
      title: `${f.airline} — ${f.from} → ${f.to}`,
      subtitle: `${f.dep} → ${f.arr} · ${f.duration} · ${f.stops === 0 ? "Non-stop" : `${f.stops} stop`}`,
      price: f.price,
      details: {
        "Airline": f.airline,
        "Route": `${f.from} → ${f.to}`,
        "Departure": f.dep,
        "Arrival": f.arr,
        "Duration": f.duration,
        "Stops": f.stops === 0 ? "Non-stop" : `${f.stops} stop`,
        "Class": f.cabin,
        "Date": new Date(date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
      },
    });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <div className="hero-flights py-12 px-5 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent-light)] mb-2">BOOK FLIGHTS</p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-8">
            Fly Anywhere in India
          </h1>

          {/* Search form */}
          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr_auto_auto_auto]">
              {/* From */}
              <div className="relative">
                <Plane size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 rotate-45" />
                <select value={from} onChange={(e) => setFrom(e.target.value)}
                  className="w-full rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none appearance-none backdrop-blur-sm">
                  {CITIES.map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
              </div>

              {/* Swap */}
              <button onClick={swap} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition-colors">
                <ArrowLeftRight size={15} />
              </button>

              {/* To */}
              <div className="relative">
                <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <select value={to} onChange={(e) => setTo(e.target.value)}
                  className="w-full rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none appearance-none backdrop-blur-sm">
                  {CITIES.filter((c) => c !== from).map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
              </div>

              {/* Date */}
              <div className="relative">
                <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none backdrop-blur-sm" />
              </div>

              {/* Pax */}
              <div className="relative">
                <Users size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <select value={pax} onChange={(e) => setPax(Number(e.target.value))}
                  className="w-full rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none appearance-none backdrop-blur-sm">
                  {[1,2,3,4,5,6].map((n) => <option key={n} value={n} className="text-black">{n} Passenger{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>

              {/* Search */}
              <button onClick={() => setSearched(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--accent-strong)] transition-colors shadow-lg shadow-[var(--accent)]/30">
                <Search size={15} /> Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        {!searched ? (
          <div className="py-20 text-center">
            <Plane size={48} className="mx-auto mb-4 text-[var(--border)] -rotate-45" />
            <p className="text-[var(--text-muted)] text-lg font-medium">Search flights to get started</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Best fares across 6 airlines</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters sidebar */}
            <aside className={`lg:w-56 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-5 space-y-5 sticky top-24">
                <p className="font-bold text-sm text-[var(--accent-dark)]">Filters</p>

                <div>
                  <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-widest">Max Price</p>
                  <input type="range" min={1000} max={15000} step={500} value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[var(--accent)]" />
                  <p className="text-sm font-bold text-[var(--accent)] mt-1">₹{maxPrice.toLocaleString("en-IN")}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-widest">Airlines</p>
                  <div className="space-y-2">
                    {AIRLINES.map((a) => (
                      <label key={a.name} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={airlineFilter.includes(a.name)}
                          onChange={(e) => setAirlineFilter(e.target.checked ? [...airlineFilter, a.name] : airlineFilter.filter((x) => x !== a.name))}
                          className="rounded accent-[var(--accent)]" />
                        <span className="text-sm text-[var(--text-secondary)]">{a.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1 space-y-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-[var(--text-secondary)]">
                  <span className="font-bold text-[var(--accent-dark)]">{results.length}</span> flights found · {from} → {to}
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowFilters((v) => !v)} className="lg:hidden flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                    <Filter size={12} /> Filters
                  </button>
                  <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2">
                    <SortAsc size={12} className="text-[var(--text-muted)]" />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="text-xs font-semibold text-[var(--accent-dark)] outline-none bg-transparent">
                      <option value="price">Price</option>
                      <option value="duration">Duration</option>
                      <option value="departure">Departure</option>
                    </select>
                  </div>
                </div>
              </div>

              {results.length === 0 ? (
                <div className="rounded-2xl border border-[var(--border)] bg-white p-12 text-center">
                  <Plane size={40} className="mx-auto mb-3 text-[var(--border)] -rotate-45" />
                  <p className="text-[var(--text-muted)]">No flights found for this route. Try different cities.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {results.map((f, i) => (
                    <motion.div key={f.id}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="rounded-2xl border border-[var(--border)] bg-white p-5 hover:shadow-[0_8px_32px_rgba(18,123,163,0.1)] transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Airline */}
                        <div className="flex items-center gap-3 sm:w-28 shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-primary)] text-[11px] font-extrabold text-[var(--accent-dark)]">
                            {f.logo}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[var(--accent-dark)]">{f.airline}</p>
                            <p className="text-[10px] text-[var(--text-muted)]">{f.cabin}</p>
                          </div>
                        </div>

                        {/* Route */}
                        <div className="flex flex-1 items-center gap-3">
                          <div className="text-center">
                            <p className="text-xl font-extrabold text-[var(--accent-dark)]">{f.dep}</p>
                            <p className="text-[11px] text-[var(--text-muted)]">{f.from}</p>
                          </div>
                          <div className="flex flex-1 flex-col items-center gap-1">
                            <p className="text-[10px] text-[var(--text-muted)]">{f.duration}</p>
                            <div className="flex w-full items-center gap-1">
                              <div className="h-px flex-1 bg-[var(--border)]" />
                              {f.stops === 0 ? (
                                <span className="text-[9px] font-bold text-green-600 bg-green-50 rounded-full px-1.5 py-0.5">Direct</span>
                              ) : (
                                <span className="text-[9px] font-bold text-amber-600 bg-amber-50 rounded-full px-1.5 py-0.5">{f.stops} stop</span>
                              )}
                              <div className="h-px flex-1 bg-[var(--border)]" />
                            </div>
                            <p className="text-[10px] text-[var(--text-muted)]">{f.from.slice(0, 3).toUpperCase()} → {f.to.slice(0, 3).toUpperCase()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xl font-extrabold text-[var(--accent-dark)]">{f.arr}</p>
                            <p className="text-[11px] text-[var(--text-muted)]">{f.to}</p>
                          </div>
                        </div>

                        {/* Price + CTA */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 sm:w-32 shrink-0">
                          <div className="sm:text-right">
                            <p className="text-xl font-extrabold text-[var(--accent)]">₹{f.price.toLocaleString("en-IN")}</p>
                            <p className="text-[10px] text-[var(--text-muted)]">/person</p>
                          </div>
                          <div className="sm:text-right space-y-1">
                            <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                              <Star size={9} className="text-yellow-400 fill-yellow-400" />
                              {f.rating} · {f.seatsLeft} seats left
                            </div>
                            <motion.button
                              onClick={() => bookFlight(f)}
                              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                              className="flex items-center gap-1 rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-bold text-white hover:bg-[var(--accent-strong)] transition-colors"
                            >
                              Book <ArrowRight size={11} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        )}
      </div>

      <ServiceBookingModal item={selectedFlight} onClose={() => setSelectedFlight(null)} />
    </div>
  );
}
