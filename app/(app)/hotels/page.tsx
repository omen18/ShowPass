"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, MapPin, Calendar, Users, Search,
  Star, Wifi, Waves, Dumbbell, UtensilsCrossed,
  Car, Coffee, Heart, ArrowRight, Filter, SortAsc,
} from "lucide-react";
import ServiceBookingModal, { ServiceItem } from "@/components/shared/ServiceBookingModal";

interface Hotel {
  id: string;
  name: string;
  city: string;
  area: string;
  type: "Hotel" | "Resort" | "Boutique" | "Villa" | "Hostel";
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  amenities: string[];
  tags: string[];
  image: string;
  roomsLeft: number;
}

const AMENITY_ICONS: Record<string, React.ElementType> = {
  "WiFi": Wifi, "Pool": Waves, "Gym": Dumbbell,
  "Restaurant": UtensilsCrossed, "Parking": Car, "Breakfast": Coffee,
};

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur", "Chennai", "Hyderabad", "Shimla", "Manali", "Udaipur"];

const HOTELS: Hotel[] = [
  { id: "H001", name: "The Grand Hyatt", city: "Mumbai", area: "Bandra West", type: "Hotel", rating: 4.8, reviews: 3241, price: 12500, originalPrice: 16000, amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking"], tags: ["Luxury", "Business"], image: "seed/101", roomsLeft: 4 },
  { id: "H002", name: "Taj Mahal Palace", city: "Mumbai", area: "Colaba", type: "Hotel", rating: 4.9, reviews: 5820, price: 28000, originalPrice: 35000, amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking", "Breakfast"], tags: ["Iconic", "Heritage"], image: "seed/102", roomsLeft: 2 },
  { id: "H003", name: "Zostel Mumbai", city: "Mumbai", area: "Andheri", type: "Hostel", rating: 4.2, reviews: 890, price: 750, originalPrice: 1000, amenities: ["WiFi", "Breakfast"], tags: ["Budget", "Social"], image: "seed/103", roomsLeft: 18 },
  { id: "H004", name: "The Leela Palace", city: "Delhi", area: "Chanakyapuri", type: "Hotel", rating: 4.9, reviews: 4120, price: 22000, originalPrice: 28000, amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking"], tags: ["Luxury", "Heritage"], image: "seed/104", roomsLeft: 3 },
  { id: "H005", name: "Taj Rambagh Palace", city: "Jaipur", area: "Bhawani Singh Rd", type: "Resort", rating: 4.9, reviews: 2890, price: 35000, originalPrice: 42000, amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking", "Breakfast"], tags: ["Royal", "Heritage", "Pool"], image: "seed/105", roomsLeft: 2 },
  { id: "H006", name: "COMO The Treasury", city: "Goa", area: "North Goa", type: "Resort", rating: 4.7, reviews: 1560, price: 18000, originalPrice: 22000, amenities: ["WiFi", "Pool", "Restaurant", "Breakfast"], tags: ["Beachside", "Spa"], image: "seed/106", roomsLeft: 6 },
  { id: "H007", name: "OYO Townhouse 42", city: "Bangalore", area: "Koramangala", type: "Boutique", rating: 3.9, reviews: 420, price: 1800, originalPrice: 2200, amenities: ["WiFi", "Parking"], tags: ["Budget", "Clean"], image: "seed/107", roomsLeft: 12 },
  { id: "H008", name: "Wildflower Hall", city: "Shimla", area: "Mashobra", type: "Resort", rating: 4.8, reviews: 980, price: 25000, originalPrice: 30000, amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Breakfast"], tags: ["Mountain", "Spa", "Luxury"], image: "seed/108", roomsLeft: 3 },
  { id: "H009", name: "The Paul", city: "Bangalore", area: "Indiranagar", type: "Hotel", rating: 4.5, reviews: 1200, price: 6500, originalPrice: 8000, amenities: ["WiFi", "Pool", "Restaurant", "Parking"], tags: ["Boutique", "Art"], image: "seed/109", roomsLeft: 7 },
  { id: "H010", name: "Dune Eco Village", city: "Goa", area: "Auroville", type: "Villa", rating: 4.6, reviews: 560, price: 5500, originalPrice: 7000, amenities: ["WiFi", "Breakfast", "Pool"], tags: ["Eco", "Quiet", "Nature"], image: "seed/110", roomsLeft: 5 },
  { id: "H011", name: "The Devburaha", city: "Manali", area: "Old Manali", type: "Boutique", rating: 4.7, reviews: 340, price: 4200, originalPrice: 5500, amenities: ["WiFi", "Breakfast", "Restaurant"], tags: ["Cosy", "Mountain View"], image: "seed/111", roomsLeft: 4 },
  { id: "H012", name: "Udaivilas", city: "Udaipur", area: "Lake Pichola", type: "Resort", rating: 4.9, reviews: 2100, price: 45000, originalPrice: 55000, amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking", "Breakfast"], tags: ["Royal", "Lake View", "Luxury"], image: "seed/112", roomsLeft: 1 },
  { id: "H013", name: "Hilton Chennai", city: "Chennai", area: "OMR", type: "Hotel", rating: 4.5, reviews: 1800, price: 7800, originalPrice: 9500, amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking"], tags: ["Business", "City"], image: "seed/113", roomsLeft: 9 },
  { id: "H014", name: "ITC Mughal", city: "Jaipur", area: "Fatehabad Rd", type: "Hotel", rating: 4.7, reviews: 2200, price: 14000, originalPrice: 18000, amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking", "Breakfast"], tags: ["Mughal", "Heritage", "Pool"], image: "seed/114", roomsLeft: 5 },
  { id: "H015", name: "Zostel Manali", city: "Manali", area: "Vashisht", type: "Hostel", rating: 4.4, reviews: 620, price: 600, originalPrice: 800, amenities: ["WiFi", "Breakfast"], tags: ["Budget", "Backpacker", "Mountain"], image: "seed/115", roomsLeft: 22 },
  { id: "H016", name: "Hyatt Regency Hyderabad", city: "Hyderabad", area: "Banjara Hills", type: "Hotel", rating: 4.6, reviews: 2450, price: 9500, originalPrice: 12000, amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking"], tags: ["Business", "Luxury"], image: "seed/116", roomsLeft: 6 },
];

export default function HotelsPage() {
  const [city, setCity] = useState("Mumbai");
  const [checkIn, setCheckIn] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [checkOut, setCheckOut] = useState(() => new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10));
  const [guests, setGuests] = useState(2);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "popular">("rating");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [bookingItem, setBookingItem] = useState<ServiceItem | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const nights = Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));

  const results = useMemo(() => {
    if (!searched) return [];
    return HOTELS
      .filter((h) => {
        if (h.city !== city) return false;
        if (h.price > maxPrice) return false;
        if (typeFilter.length > 0 && !typeFilter.includes(h.type)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviews - a.reviews;
      });
  }, [searched, city, maxPrice, typeFilter, sortBy]);

  function bookHotel(hotel: Hotel) {
    setBookingItem({
      type: "hotel",
      title: hotel.name,
      subtitle: `${hotel.area}, ${hotel.city} · ${nights} night${nights > 1 ? "s" : ""}`,
      price: hotel.price * nights,
      details: {
        "Hotel": hotel.name,
        "Location": `${hotel.area}, ${hotel.city}`,
        "Type": hotel.type,
        "Check-in": new Date(checkIn).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
        "Check-out": new Date(checkOut).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
        "Guests": `${guests} guest${guests > 1 ? "s" : ""}`,
        "Nights": `${nights} night${nights > 1 ? "s" : ""}`,
        "Rate": `₹${hotel.price.toLocaleString("en-IN")}/night`,
        "Rating": `${hotel.rating} ★ (${hotel.reviews.toLocaleString("en-IN")} reviews)`,
      },
    });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <div className="hero-hotels py-12 px-5 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-amber-300 mb-2">BOOK HOTELS</p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-8">
            Stays That Feel Like Home
          </h1>

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto_auto_auto]">
              <div className="relative">
                <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <select value={city} onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none appearance-none backdrop-blur-sm">
                  {CITIES.map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
                </select>
              </div>
              <div className="relative">
                <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                  className="rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none backdrop-blur-sm" />
              </div>
              <div className="relative">
                <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                  className="rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none backdrop-blur-sm" />
              </div>
              <div className="relative">
                <Users size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                  className="rounded-2xl bg-white/15 border border-white/20 py-3 pl-9 pr-3 text-sm text-white outline-none appearance-none backdrop-blur-sm">
                  {[1,2,3,4,5,6].map((n) => <option key={n} value={n} className="text-black">{n} Guest{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
              <button onClick={() => setSearched(true)}
                className="flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-3 text-sm font-bold text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/30">
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
            <Building2 size={48} className="mx-auto mb-4 text-[var(--border)]" />
            <p className="text-[var(--text-muted)] text-lg font-medium">Search hotels to discover amazing stays</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Hotels, resorts, villas and more across India</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <aside className="lg:w-56 shrink-0">
              <div className="rounded-2xl border border-[var(--border)] bg-white p-5 space-y-5 sticky top-24">
                <p className="font-bold text-sm text-[var(--accent-dark)]">Filters</p>

                <div>
                  <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-widest">Max Price / Night</p>
                  <input type="range" min={500} max={50000} step={500} value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-amber-500" />
                  <p className="text-sm font-bold text-amber-600 mt-1">₹{maxPrice.toLocaleString("en-IN")}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-widest">Property Type</p>
                  {["Hotel", "Resort", "Villa", "Boutique", "Hostel"].map((type) => (
                    <label key={type} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input type="checkbox" checked={typeFilter.includes(type)}
                        onChange={(e) => setTypeFilter(e.target.checked ? [...typeFilter, type] : typeFilter.filter((x) => x !== type))}
                        className="rounded accent-amber-500" />
                      <span className="text-sm text-[var(--text-secondary)]">{type}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-widest">Sort By</p>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full rounded-xl border border-gray-200 py-2 px-3 text-sm outline-none focus:border-amber-500">
                    <option value="rating">Top Rated</option>
                    <option value="price">Price: Low to High</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Cards */}
            <div className="flex-1">
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                <span className="font-bold text-[var(--accent-dark)]">{results.length}</span> properties in {city}
                {nights > 0 && <span> · {nights} night{nights > 1 ? "s" : ""}</span>}
              </p>

              {results.length === 0 ? (
                <div className="rounded-2xl border border-[var(--border)] bg-white p-12 text-center">
                  <Building2 size={40} className="mx-auto mb-3 text-[var(--border)]" />
                  <p className="text-[var(--text-muted)]">No properties found. Adjust your filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {results.map((hotel, i) => (
                      <motion.div key={hotel.id}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden flex flex-col sm:flex-row hover:shadow-[0_8px_32px_rgba(18,123,163,0.1)] transition-shadow"
                      >
                        {/* Image */}
                        <div className="relative sm:w-56 h-48 sm:h-auto shrink-0 overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200">
                          <img
                            src={`https://picsum.photos/${hotel.image}/400/300`}
                            alt={hotel.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <button
                            onClick={() => setWishlist((w) => { const n = new Set(w); n.has(hotel.id) ? n.delete(hotel.id) : n.add(hotel.id); return n; })}
                            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow hover:scale-110 transition-transform"
                          >
                            <Heart size={14} className={wishlist.has(hotel.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                          </button>
                          {hotel.originalPrice > hotel.price && (
                            <div className="absolute bottom-3 left-3 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">
                              {Math.round((1 - hotel.price / hotel.originalPrice) * 100)}% off
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
                                  {hotel.type}
                                </span>
                                {hotel.tags.slice(0, 2).map((t) => (
                                  <span key={t} className="text-[10px] text-[var(--text-muted)] bg-gray-50 rounded-full px-2 py-0.5">{t}</span>
                                ))}
                              </div>
                              <h3 className="font-bold text-[var(--accent-dark)] text-base">{hotel.name}</h3>
                              <p className="flex items-center gap-1 text-xs text-[var(--text-muted)] mt-0.5">
                                <MapPin size={10} /> {hotel.area}, {hotel.city}
                              </p>
                            </div>
                            <div className="shrink-0 text-right">
                              <div className="flex items-center gap-1 justify-end">
                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                <span className="font-bold text-[var(--accent-dark)] text-sm">{hotel.rating}</span>
                              </div>
                              <p className="text-[10px] text-[var(--text-muted)]">{hotel.reviews.toLocaleString("en-IN")} reviews</p>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {hotel.amenities.slice(0, 4).map((a) => {
                              const Icon = AMENITY_ICONS[a];
                              return (
                                <span key={a} className="flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-[10px] text-[var(--text-secondary)]">
                                  {Icon && <Icon size={9} />} {a}
                                </span>
                              );
                            })}
                          </div>

                          {/* Price + CTA */}
                          <div className="mt-auto pt-4 flex items-end justify-between">
                            <div>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-extrabold text-[var(--accent-dark)]">₹{hotel.price.toLocaleString("en-IN")}</span>
                                {hotel.originalPrice > hotel.price && (
                                  <span className="text-xs text-[var(--text-muted)] line-through">₹{hotel.originalPrice.toLocaleString("en-IN")}</span>
                                )}
                              </div>
                              <p className="text-[11px] text-[var(--text-muted)]">per night · {hotel.roomsLeft} room{hotel.roomsLeft !== 1 ? "s" : ""} left</p>
                            </div>
                            <motion.button
                              onClick={() => bookHotel(hotel)}
                              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-600 transition-colors"
                            >
                              Book Now <ArrowRight size={12} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ServiceBookingModal item={bookingItem} onClose={() => setBookingItem(null)} />
    </div>
  );
}
