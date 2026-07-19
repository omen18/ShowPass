"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceBookingModal, { ServiceItem } from "@/components/shared/ServiceBookingModal";

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Kolkata", "Nagpur", "Surat", "Indore", "Bhopal", "Vadodara", "Kochi"];

interface BusRoute {
  id: number;
  operator: string;
  operatorLogo: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  busType: string;
  totalSeats: number;
  availableSeats: number;
  amenities: string[];
  rating: number;
  reviews: number;
  boardingPoints: string[];
  droppingPoints: string[];
  classes: { name: string; price: number; seatsLeft?: number }[];
  cancellation: string;
}

const mockBuses: BusRoute[] = [
  {
    id: 1, operator: "RedBus Travels", operatorLogo: "🔴",
    from: "Mumbai", to: "Pune", departure: "22:00", arrival: "01:30", duration: "3h 30m",
    busType: "AC Sleeper", totalSeats: 36, availableSeats: 14, rating: 4.5, reviews: 1243,
    amenities: ["WiFi", "Charging Point", "Blanket", "Water Bottle", "Reading Light"],
    boardingPoints: ["Dadar", "Kurla", "Vashi"], droppingPoints: ["Swargate", "Shivajinagar", "Kothrud"],
    classes: [{ name: "Sleeper", price: 499 }, { name: "Semi-Sleeper", price: 349 }],
    cancellation: "Free cancellation up to 2h before departure",
  },
  {
    id: 2, operator: "VRL Travels", operatorLogo: "🟢",
    from: "Bangalore", to: "Chennai", departure: "21:30", arrival: "05:00", duration: "7h 30m",
    busType: "AC Sleeper (2+1)", totalSeats: 27, availableSeats: 6, rating: 4.7, reviews: 2891,
    amenities: ["WiFi", "Charging Point", "Blanket", "Pillow", "Water Bottle", "Entertainment"],
    boardingPoints: ["Majestic", "Silk Board", "Electronic City"], droppingPoints: ["Koyambedu", "Anna Nagar", "T Nagar"],
    classes: [{ name: "2+1 Sleeper", price: 1299 }, { name: "2+2 Sleeper", price: 999 }],
    cancellation: "Free cancellation up to 4h before departure",
  },
  {
    id: 3, operator: "Orange Travels", operatorLogo: "🟠",
    from: "Hyderabad", to: "Bangalore", departure: "20:00", arrival: "04:30", duration: "8h 30m",
    busType: "Volvo Multi-Axle", totalSeats: 40, availableSeats: 22, rating: 4.3, reviews: 876,
    amenities: ["WiFi", "Charging Point", "Blanket", "Water Bottle"],
    boardingPoints: ["MGBS", "Paradise", "LB Nagar"], droppingPoints: ["Majestic", "Silk Board"],
    classes: [{ name: "AC Sleeper", price: 1149 }, { name: "Seater", price: 699 }],
    cancellation: "25% fee if cancelled within 6h",
  },
  {
    id: 4, operator: "SRS Travels", operatorLogo: "🔵",
    from: "Chennai", to: "Coimbatore", departure: "23:00", arrival: "05:30", duration: "6h 30m",
    busType: "AC Sleeper", totalSeats: 36, availableSeats: 18, rating: 4.2, reviews: 654,
    amenities: ["Charging Point", "Blanket", "Water Bottle"],
    boardingPoints: ["CMBT", "Tambaram", "Guindy"], droppingPoints: ["Gandhipuram", "Ukkadam", "RS Puram"],
    classes: [{ name: "Sleeper", price: 849 }, { name: "Semi-Sleeper", price: 649 }],
    cancellation: "Free cancellation up to 3h before departure",
  },
  {
    id: 5, operator: "Neeta Travels", operatorLogo: "🟡",
    from: "Mumbai", to: "Ahmedabad", departure: "20:30", arrival: "04:00", duration: "7h 30m",
    busType: "AC Volvo 9600", totalSeats: 40, availableSeats: 31, rating: 4.6, reviews: 3210,
    amenities: ["WiFi", "Charging Point", "Blanket", "Pillow", "Water Bottle", "Snacks"],
    boardingPoints: ["Borivali", "Andheri", "Dadar"], droppingPoints: ["Kalupur", "Navrangpura", "Paldi"],
    classes: [{ name: "AC Seater", price: 799 }, { name: "AC Sleeper", price: 1099 }],
    cancellation: "Free cancellation up to 2h before departure",
  },
  {
    id: 6, operator: "IntrCity SmartBus", operatorLogo: "🟣",
    from: "Delhi", to: "Jaipur", departure: "06:00", arrival: "11:30", duration: "5h 30m",
    busType: "Luxury Coach", totalSeats: 32, availableSeats: 9, rating: 4.8, reviews: 4521,
    amenities: ["WiFi", "Charging Point", "Blanket", "Water Bottle", "Snacks", "Recliner Seats", "Entertainment"],
    boardingPoints: ["Dhaula Kuan", "Rajiv Chowk", "Sarai Kale Khan"], droppingPoints: ["Sindhi Camp", "MI Road", "Airport"],
    classes: [{ name: "Luxury Seater", price: 1499 }, { name: "Premium Sleeper", price: 1999 }],
    cancellation: "Full refund up to 24h before departure",
  },
  {
    id: 7, operator: "KSRTC", operatorLogo: "🔶",
    from: "Bangalore", to: "Mysore", departure: "07:00", arrival: "10:00", duration: "3h 00m",
    busType: "AC Airavat Club Class", totalSeats: 44, availableSeats: 28, rating: 4.4, reviews: 7823,
    amenities: ["AC", "Charging Point", "Comfortable Seats"],
    boardingPoints: ["Majestic", "Shivajinagar"], droppingPoints: ["Central Bus Stand", "KSRTC Hub"],
    classes: [{ name: "Club Class", price: 399 }, { name: "Ordinary", price: 199 }],
    cancellation: "No cancellation on government buses",
  },
  {
    id: 8, operator: "Patel Travels", operatorLogo: "🔷",
    from: "Ahmedabad", to: "Mumbai", departure: "19:00", arrival: "02:30", duration: "7h 30m",
    busType: "AC 2+1 Sleeper", totalSeats: 27, availableSeats: 3, rating: 4.5, reviews: 1876,
    amenities: ["WiFi", "Charging Point", "Blanket", "Pillow", "Water Bottle"],
    boardingPoints: ["Kalupur", "Iscon Circle"], droppingPoints: ["Dadar", "Borivali", "Andheri"],
    classes: [{ name: "2+1 Sleeper", price: 1099 }, { name: "2+2 Seater", price: 699 }],
    cancellation: "Free cancellation up to 3h before departure",
  },
  {
    id: 9, operator: "Konduskar Travels", operatorLogo: "⚫",
    from: "Pune", to: "Goa", departure: "21:00", arrival: "07:00", duration: "10h 00m",
    busType: "Volvo AC Multi-Axle", totalSeats: 40, availableSeats: 19, rating: 4.3, reviews: 987,
    amenities: ["WiFi", "Charging Point", "Blanket", "Water Bottle"],
    boardingPoints: ["Swargate", "Shivajinagar", "Wakad"], droppingPoints: ["Panaji", "Mapusa", "Calangute"],
    classes: [{ name: "AC Sleeper", price: 1299 }, { name: "Non-AC Sleeper", price: 899 }],
    cancellation: "Free cancellation up to 4h before departure",
  },
  {
    id: 10, operator: "Zingbus", operatorLogo: "⚡",
    from: "Delhi", to: "Chandigarh", departure: "08:00", arrival: "12:30", duration: "4h 30m",
    busType: "Premium Coach", totalSeats: 36, availableSeats: 24, rating: 4.6, reviews: 2341,
    amenities: ["WiFi", "Charging Point", "Recliner Seats", "Water Bottle", "Snacks", "Entertainment"],
    boardingPoints: ["Majnu Ka Tila", "ISBT Kashmere Gate", "Dhaula Kuan"], droppingPoints: ["ISBT 43", "Sector 17"],
    classes: [{ name: "Premium", price: 799 }, { name: "Standard", price: 549 }],
    cancellation: "Full refund up to 12h before departure",
  },
];

const BUS_TYPES = ["All", "AC Sleeper", "Non-AC Sleeper", "AC Seater", "Luxury Coach", "Volvo"];
const AMENITY_FILTERS = ["WiFi", "Charging Point", "Blanket", "Snacks", "Entertainment"];

export default function BusesPage() {
  const [from, setFrom] = useState("Mumbai");
  const [to, setTo] = useState("Pune");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [searched, setSearched] = useState(true);
  const [selectedBusType, setSelectedBusType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("departure");
  const [bookingItem, setBookingItem] = useState<ServiceItem | null>(null);
  const [expandedBus, setExpandedBus] = useState<number | null>(null);

  const swap = () => { setFrom(to); setTo(from); };

  const filtered = useMemo(() => {
    let list = mockBuses.filter((b) => {
      const typeMatch = selectedBusType === "All" || b.busType.toLowerCase().includes(selectedBusType.toLowerCase());
      const priceMatch = b.classes[0].price <= maxPrice;
      const amenityMatch = selectedAmenities.every((a) => b.amenities.includes(a));
      return typeMatch && priceMatch && amenityMatch;
    });
    if (sortBy === "price") list = [...list].sort((a, b) => a.classes[0].price - b.classes[0].price);
    else if (sortBy === "departure") list = [...list].sort((a, b) => a.departure.localeCompare(b.departure));
    else if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "seats") list = [...list].sort((a, b) => b.availableSeats - a.availableSeats);
    return list;
  }, [selectedBusType, maxPrice, selectedAmenities, sortBy]);

  const toggleAmenity = (a: string) =>
    setSelectedAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  const openBooking = (bus: BusRoute, cls: { name: string; price: number }) => {
    setBookingItem({
      type: "bus",
      title: `${bus.operator} — ${bus.from} → ${bus.to}`,
      subtitle: `${bus.busType} · ${bus.departure}–${bus.arrival} · ${bus.duration}`,
      price: cls.price,
      details: {
        "Operator": bus.operator,
        "Route": `${bus.from} → ${bus.to}`,
        "Departure": bus.departure,
        "Arrival": bus.arrival,
        "Duration": bus.duration,
        "Bus Type": `${bus.busType} · ${cls.name}`,
        "Cancellation": bus.cancellation,
        "Amenities": bus.amenities.join(", "),
      },
    });
  };

  const seatColor = (available: number, total: number) => {
    const pct = available / total;
    if (pct > 0.5) return "text-green-600 bg-green-50";
    if (pct > 0.2) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-buses relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #e94560 0%, transparent 50%), radial-gradient(circle at 80% 20%, #533483 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm font-medium mb-4">
              <span>🚌</span><span>Bus Booking</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Travel by <span className="text-[#e94560]">Bus</span></h1>
            <p className="text-white/60">Comfortable, affordable rides across India</p>
          </motion.div>

          {/* Search Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="relative">
                <label className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5 block">From</label>
                <select value={from} onChange={(e) => setFrom(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-white/40 cursor-pointer">
                  {CITIES.map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
                <button onClick={swap} className="absolute right-3 top-8 text-white/60 hover:text-white text-lg transition-colors">⇄</button>
              </div>
              <div>
                <label className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5 block">To</label>
                <select value={to} onChange={(e) => setTo(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-white/40 cursor-pointer">
                  {CITIES.map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5 block">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40" />
              </div>
              <button onClick={() => setSearched(true)}
                className="bg-[#e94560] hover:bg-[#c73652] text-white font-semibold rounded-xl py-3 px-6 transition-all hover:scale-105 active:scale-95">
                Search Buses
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {searched && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Sidebar */}
            <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-64 shrink-0 space-y-5">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-4">Filters</h3>

                {/* Sort */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Sort By</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]/30">
                    <option value="departure">Departure Time</option>
                    <option value="price">Price: Low to High</option>
                    <option value="rating">Top Rated</option>
                    <option value="seats">Most Available</option>
                  </select>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Max Price</label>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>₹0</span><span className="font-semibold text-[#e94560]">₹{maxPrice}</span>
                  </div>
                  <input type="range" min={200} max={2000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)}
                    className="w-full accent-[#e94560]" />
                </div>

                {/* Bus Type */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Bus Type</label>
                  <div className="space-y-2">
                    {BUS_TYPES.map((t) => (
                      <button key={t} onClick={() => setSelectedBusType(t)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${selectedBusType === t ? "bg-[#e94560]/10 text-[#e94560] border border-[#e94560]/30" : "text-gray-600 hover:bg-gray-50"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Amenities</label>
                  <div className="space-y-2">
                    {AMENITY_FILTERS.map((a) => (
                      <label key={a} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={selectedAmenities.includes(a)} onChange={() => toggleAmenity(a)}
                          className="accent-[#e94560] rounded" />
                        <span className="text-sm text-gray-700">{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 text-sm"><span className="font-bold text-gray-900">{filtered.length}</span> buses found</p>
              </div>

              <div className="space-y-4">
                {filtered.map((bus, i) => (
                  <motion.div key={bus.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                    <div className="p-5">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Operator */}
                        <div className="flex items-center gap-3 w-40 shrink-0">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-2xl border border-gray-100">
                            {bus.operatorLogo}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm leading-tight">{bus.operator}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{bus.busType}</p>
                          </div>
                        </div>

                        {/* Route */}
                        <div className="flex-1 flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{bus.departure}</p>
                            <p className="text-sm text-gray-500">{bus.from}</p>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="text-xs text-gray-400 mb-1">{bus.duration}</div>
                            <div className="w-full flex items-center gap-1">
                              <div className="h-px flex-1 bg-gray-200" />
                              <span className="text-base">🚌</span>
                              <div className="h-px flex-1 bg-gray-200" />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{bus.arrival}</p>
                            <p className="text-sm text-gray-500">{bus.to}</p>
                          </div>
                        </div>

                        {/* Seats + Rating */}
                        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                          <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${seatColor(bus.availableSeats, bus.totalSeats)}`}>
                            {bus.availableSeats} seats left
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-sm font-semibold text-gray-900">{bus.rating}</span>
                            <span className="text-xs text-gray-400">({bus.reviews})</span>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {bus.amenities.slice(0, 5).map((a) => (
                          <span key={a} className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-0.5 text-xs text-gray-600">{a}</span>
                        ))}
                        {bus.amenities.length > 5 && (
                          <span className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-0.5 text-xs text-gray-500">+{bus.amenities.length - 5} more</span>
                        )}
                      </div>

                      {/* Classes */}
                      <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-50">
                        {bus.classes.map((cls) => (
                          <button key={cls.name} onClick={() => openBooking(bus, cls)}
                            className="flex items-center gap-2 bg-[#e94560]/5 hover:bg-[#e94560]/10 border border-[#e94560]/20 rounded-xl px-4 py-2.5 transition-all hover:scale-105 active:scale-95 group">
                            <div>
                              <p className="text-xs font-semibold text-[#e94560]">{cls.name}</p>
                              <p className="text-base font-bold text-gray-900">₹{cls.price.toLocaleString()}</p>
                            </div>
                            <span className="text-xs text-[#e94560] opacity-0 group-hover:opacity-100 transition-opacity">Book →</span>
                          </button>
                        ))}
                        <button onClick={() => setExpandedBus(expandedBus === bus.id ? null : bus.id)}
                          className="ml-auto text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
                          {expandedBus === bus.id ? "Less info ▲" : "More info ▼"}
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {expandedBus === bus.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-gray-100 bg-gray-50">
                          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Boarding Points</p>
                              <ul className="space-y-1">{bus.boardingPoints.map((p) => <li key={p} className="text-gray-600 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"/>{ p}</li>)}</ul>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Dropping Points</p>
                              <ul className="space-y-1">{bus.droppingPoints.map((p) => <li key={p} className="text-gray-600 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"/>{p}</li>)}</ul>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Cancellation Policy</p>
                              <p className="text-gray-600">{bus.cancellation}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {filtered.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-5xl mb-3">🚌</div>
                    <p className="font-medium text-lg">No buses match your filters</p>
                    <p className="text-sm mt-1">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {bookingItem && (
        <ServiceBookingModal item={bookingItem} onClose={() => setBookingItem(null)} />
      )}
    </div>
  );
}
