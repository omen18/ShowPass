"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Attraction {
  name: string;
  type: string;
  description: string;
  timing: string;
  price: string;
  rating: number;
  tags: string[];
  img: string;
}

interface CityGuide {
  city: string;
  state: string;
  tagline: string;
  description: string;
  heroImg: string;
  bestTime: string;
  weather: string;
  language: string;
  currency: string;
  highlights: string[];
  categories: {
    attractions: Attraction[];
    food: Attraction[];
    nightlife: Attraction[];
    shopping: Attraction[];
    daytrips: Attraction[];
  };
}

const cityGuides: CityGuide[] = [
  {
    city: "Mumbai", state: "Maharashtra", tagline: "The City of Dreams",
    description: "India's financial capital and entertainment hub. A city that never sleeps, blending colonial architecture with ultra-modern skylines, street food with fine dining, and Bollywood glam with everyday hustle.",
    heroImg: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80",
    bestTime: "Nov – Feb", weather: "Tropical", language: "Marathi, Hindi", currency: "INR",
    highlights: ["Marine Drive promenade", "Bollywood film city tours", "Street food at Juhu Beach", "Dharavi slum tour", "CSIA airport art installations"],
    categories: {
      attractions: [
        { name: "Gateway of India", type: "Monument", description: "Iconic arch monument overlooking the Arabian Sea, built in 1924 to commemorate King George V's visit.", timing: "24/7 (outside), 9AM–6PM museum", price: "Free", rating: 4.7, tags: ["Iconic", "Heritage", "Photography"], img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=80" },
        { name: "Elephanta Caves", type: "UNESCO Heritage", description: "Rock-cut temples dedicated to Shiva on a small island, accessible by ferry from Gateway of India.", timing: "9AM–5:30PM (Tue–Sun)", price: "₹40 (Indian) / ₹600 (Foreign)", rating: 4.5, tags: ["UNESCO", "Ancient", "Islands"], img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80" },
        { name: "Chhatrapati Shivaji Maharaj Terminus", type: "Heritage Railway", description: "A masterpiece of Victorian Gothic architecture, this UNESCO site is India's busiest railway station.", timing: "Always open", price: "Free", rating: 4.6, tags: ["UNESCO", "Architecture", "Colonial"], img: "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=400&q=80" },
        { name: "Bandra-Worli Sea Link", type: "Engineering Marvel", description: "A stunning cable-stayed bridge spanning 5.6 km across Mahim Bay, best seen at night.", timing: "24/7", price: "₹75 toll", rating: 4.8, tags: ["Modern", "Photography", "Nightview"], img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&q=80" },
      ],
      food: [
        { name: "Vada Pav at Ashok Vada Pav", type: "Street Food", description: "The original Mumbai street burger — spiced potato fritter in a pav bun. The Ashok stall near Kirti College is legendary.", timing: "7AM–10PM", price: "₹15–25", rating: 4.9, tags: ["Must Try", "Street Food", "Vegetarian"], img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
        { name: "Khao Galli, Mohammed Ali Road", type: "Food Street", description: "Ramzan food street transformed into an all-year delicacy hub. Try Nihari, Seekh Kebab, Malai Khaja.", timing: "6PM–2AM", price: "₹100–500", rating: 4.8, tags: ["Mughlai", "Night Food", "Non-Veg"], img: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&q=80" },
        { name: "Trishna Restaurant", type: "Seafood Fine Dining", description: "Mumbai's most celebrated seafood restaurant, known for butter garlic crab and Koliwada pomfret.", timing: "12:30PM–3PM, 7:30PM–12AM", price: "₹1500–3000/person", rating: 4.6, tags: ["Fine Dining", "Seafood", "Michelin"], img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
      ],
      nightlife: [
        { name: "Marine Drive", type: "Promenade", description: "Mumbai's 'Queen's Necklace' — a 3.6 km C-shaped boulevard by the sea, magical at night with city lights reflecting in the water.", timing: "24/7", price: "Free", rating: 4.9, tags: ["Free", "Romantic", "Night Walk"], img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80" },
        { name: "Toit Brewpub (Lower Parel)", type: "Microbrewery", description: "Award-winning craft brewery with in-house brews like Basmati Blonde and Sun Kissed Wit.", timing: "12PM–1:30AM", price: "₹800–1500/person", rating: 4.5, tags: ["Craft Beer", "Lively", "Date Night"], img: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=400&q=80" },
      ],
      shopping: [
        { name: "Colaba Causeway", type: "Street Market", description: "Iconic shopping street for antiques, leather goods, handicrafts, clothes, and Tibetan jewelry.", timing: "10AM–11PM", price: "Free entry", rating: 4.5, tags: ["Bargain", "Antiques", "Street Market"], img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
        { name: "Palladium Mall", type: "Luxury Mall", description: "South Mumbai's premier luxury destination with international brands, gourmet dining, and a multiplex.", timing: "11AM–10PM", price: "Free entry", rating: 4.4, tags: ["Luxury", "Air-conditioned", "Brands"], img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80" },
      ],
      daytrips: [
        { name: "Lonavala & Khandala", type: "Hill Station", description: "Scenic twin hill stations 83 km from Mumbai with valleys, waterfalls, and the famous chikki candy.", timing: "Year round (best: Monsoon)", price: "₹500–2000 (day trip)", rating: 4.6, tags: ["Nature", "Weekend", "Monsoon"], img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
        { name: "Alibaug Beach", type: "Coastal", description: "A peaceful beach town 2 hours away — reachable by ferry from Gateway of India. Great for water sports.", timing: "Year round", price: "₹200 ferry + ₹200–500 stay", rating: 4.4, tags: ["Beach", "Ferry", "Water Sports"], img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
      ],
    },
  },
  {
    city: "Delhi", state: "NCT of Delhi", tagline: "The Heart of India",
    description: "A city of emperors and democracy — Delhi wears 3,000 years of history alongside modern metros, world-class museums, and India's most diverse food scene.",
    heroImg: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
    bestTime: "Oct – Mar", weather: "Semi-arid", language: "Hindi, Punjabi", currency: "INR",
    highlights: ["Red Fort illuminated at night", "Chandni Chowk chaos & street food", "Hauz Khas Village cafes", "Qutub Minar at sunrise", "Lotus Temple at dusk"],
    categories: {
      attractions: [
        { name: "Red Fort", type: "UNESCO Heritage", description: "Emperor Shah Jahan's 17th-century fortress where India's Prime Minister addresses the nation every Independence Day.", timing: "9AM–6PM (Tue–Sun)", price: "₹35 (Indian) / ₹500 (Foreign)", rating: 4.5, tags: ["UNESCO", "Mughal", "Historical"], img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80" },
        { name: "Qutub Minar", type: "UNESCO Heritage", description: "The world's tallest brick minaret at 73 m, surrounded by the ruins of Quwwat-ul-Islam mosque.", timing: "7AM–5PM", price: "₹35 / ₹550", rating: 4.6, tags: ["UNESCO", "Tallest", "Architecture"], img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" },
        { name: "Humayun's Tomb", type: "UNESCO Heritage", description: "The architectural precursor to the Taj Mahal. Mughal garden tomb of Emperor Humayun in beautifully manicured gardens.", timing: "7AM–6PM", price: "₹40 / ₹600", rating: 4.7, tags: ["UNESCO", "Mughal", "Garden"], img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80" },
        { name: "India Gate", type: "Monument", description: "War memorial for 82,000 soldiers of the undivided Indian Army. Eternal flame burns beneath the arch.", timing: "24/7", price: "Free", rating: 4.7, tags: ["Free", "War Memorial", "Canopy"], img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&q=80" },
      ],
      food: [
        { name: "Paranthe Wali Gali", type: "Food Heritage Lane", description: "A narrow alley in Chandni Chowk serving stuffed paranthas since 1875 — 40+ varieties from rabri to dry fruits.", timing: "8AM–10PM", price: "₹80–200/plate", rating: 4.7, tags: ["Heritage", "Breakfast", "Vegetarian"], img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
        { name: "Karim's, Jama Masjid", type: "Mughlai Restaurant", description: "Delhi's most legendary restaurant since 1913. Try Mutton Burra, Nihari, and their iconic Shahi Korma.", timing: "9AM–11:30PM", price: "₹400–800/person", rating: 4.8, tags: ["Since 1913", "Mughlai", "Non-Veg"], img: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&q=80" },
      ],
      nightlife: [
        { name: "Hauz Khas Village", type: "Trendy Hub", description: "Restored medieval ruins surrounding a lake, now home to Delhi's best boutique restaurants, rooftop bars, and art galleries.", timing: "Shops 11AM–9PM, Restaurants till 1AM", price: "Free entry", rating: 4.5, tags: ["Rooftop", "Lake View", "Art"], img: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=400&q=80" },
        { name: "Connaught Place", type: "Heritage Entertainment", description: "Delhi's iconic circular market hub transforms at night with live music venues, bars, and a young crowd.", timing: "12PM–2AM (nightlife)", price: "Free entry", rating: 4.4, tags: ["Live Music", "Heritage", "Central"], img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80" },
      ],
      shopping: [
        { name: "Chandni Chowk", type: "Historic Market", description: "One of Asia's oldest and biggest markets — silver jewelry, spices, wedding sarees, textiles, electronics, and street food.", timing: "10AM–7PM (Mon–Sat)", price: "Free entry", rating: 4.6, tags: ["Wholesale", "Historic", "Spices"], img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
        { name: "Dilli Haat", type: "Crafts Market", description: "Government-run open-air craft village showcasing artisans from all 29 states. Authentic handicrafts, handlooms, and food.", timing: "10:30AM–10PM", price: "₹30 entry", rating: 4.5, tags: ["Authentic", "Handicrafts", "Cultural"], img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
      ],
      daytrips: [
        { name: "Agra (Taj Mahal)", type: "UNESCO Wonder", description: "The world's greatest monument to love is 3 hours by train. Book Gatimaan Express — arrive by sunrise for magic.", timing: "Sunrise–Sunset (Fri closed)", price: "₹50 + ₹200 ASI (Indian)", rating: 5.0, tags: ["Wonder", "Must Do", "Sunrise"], img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80" },
        { name: "Jaipur (Pink City)", type: "Heritage City", description: "Rajasthan's capital is 5 hours away — Amber Fort, Hawa Mahal, City Palace, and the best rajasthani thali.", timing: "Year round (avoid May–June)", price: "₹500–1500/day", rating: 4.7, tags: ["Pink City", "Heritage", "Overnight"], img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" },
      ],
    },
  },
  {
    city: "Goa", state: "Goa", tagline: "India's Beach Paradise",
    description: "A former Portuguese colony with a distinct Indo-Portuguese culture, Goa offers pristine beaches, ancient churches, spice plantations, legendary nightlife, and some of India's best seafood.",
    heroImg: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    bestTime: "Nov – Feb", weather: "Tropical Monsoon", language: "Konkani, English", currency: "INR",
    highlights: ["Sunset at Calangute Beach", "Cashew feni tasting", "Old Goa churches tour", "Spice plantation visit", "Flea market at Anjuna"],
    categories: {
      attractions: [
        { name: "Basilica of Bom Jesus", type: "UNESCO Heritage", description: "Baroque church housing the mortal remains of St. Francis Xavier. Built in 1605 — Goa's most visited monument.", timing: "9AM–6:30PM", price: "Free", rating: 4.7, tags: ["UNESCO", "Church", "Colonial"], img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=80" },
        { name: "Dudhsagar Waterfalls", type: "Waterfall", description: "India's 5th tallest waterfall (310 m) on the Goa-Karnataka border, best during and after monsoon. Accessible by jeep.", timing: "8AM–5PM (Oct–May)", price: "₹400 jeep + ₹100 entry", rating: 4.8, tags: ["Waterfall", "Nature", "Adventurous"], img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
        { name: "Fort Aguada", type: "Historic Fort", description: "17th-century Portuguese fort at the confluence of Mandovi River and Arabian Sea, offering panoramic views.", timing: "9:30AM–6PM", price: "₹25", rating: 4.5, tags: ["Fort", "Views", "Sunset"], img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
      ],
      food: [
        { name: "Vinayak Family Restaurant", type: "Goan Cuisine", description: "No-frills Panjim restaurant that serves the most authentic Goan fish curry-rice. Prawn rawa fry is a must.", timing: "12PM–3PM, 7PM–10PM", price: "₹300–600/person", rating: 4.9, tags: ["Authentic", "Goan", "Seafood"], img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
        { name: "Britto's, Baga", type: "Beach Shack", description: "Legendary beachfront restaurant since 1980. Cold Kingfisher, Goan sausage, bebinca — the full Goa experience.", timing: "8AM–12AM", price: "₹600–1200/person", rating: 4.5, tags: ["Beach", "Sea View", "Iconic"], img: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&q=80" },
      ],
      nightlife: [
        { name: "Club Cubana, Arpora", type: "Nightclub", description: "Asia's most chic hilltop open-air nightclub, 4 floors carved into a hillside with a pool and 360° views.", timing: "10PM–4AM (Season: Nov–Mar)", price: "₹1000–2000 cover", rating: 4.6, tags: ["Nightclub", "Pool", "Hillside"], img: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=400&q=80" },
        { name: "Anjuna Flea Market (Night)", type: "Market + Music", description: "Wednesday flea market evolves into spontaneous beach bonfires and drum circles after 8PM in season.", timing: "8AM–midnight (Wed)", price: "Free", rating: 4.5, tags: ["Flea Market", "Bonfire", "Hippie"], img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
      ],
      shopping: [
        { name: "Mapusa Market", type: "Local Market", description: "Goa's biggest weekly market every Friday. Local produce, cashews, feni, spices, handicrafts, and fabrics.", timing: "Every Friday, 6AM–4PM", price: "Free entry", rating: 4.6, tags: ["Local", "Cashews", "Spices"], img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
        { name: "Saturday Night Market, Arpora", type: "Night Market", description: "Trendy weekly night market with global food trucks, live music, artisan crafts, and clothes.", timing: "Saturdays 6PM–12AM (Nov–Apr)", price: "Free", rating: 4.5, tags: ["Night Market", "Music", "Food"], img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80" },
      ],
      daytrips: [
        { name: "Hampi, Karnataka", type: "UNESCO Ruins", description: "The magnificent capital of the Vijayanagara Empire — 4 hours from Goa by road, a surreal landscape of boulders and ruins.", timing: "6AM–6PM", price: "₹40 entry", rating: 4.9, tags: ["UNESCO", "Ruins", "Overnight"], img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80" },
      ],
    },
  },
  {
    city: "Jaipur", state: "Rajasthan", tagline: "The Pink City",
    description: "Jaipur, founded in 1727 by Maharaja Jai Singh II, is India's first planned city. The pink-painted old city, grand palaces, desert forts, and vibrant bazaars make it a jewel of Rajputana heritage.",
    heroImg: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80",
    bestTime: "Oct – Feb", weather: "Semi-arid / Desert", language: "Rajasthani, Hindi", currency: "INR",
    highlights: ["Amber Fort elephant ride", "Hawa Mahal sunrise photography", "Blue Pottery workshops", "Camel safari at Pushkar", "Bapu Bazaar night shopping"],
    categories: {
      attractions: [
        { name: "Amber Fort", type: "UNESCO Heritage", description: "Majestic hillside fort-palace with stunning mirror work, elephant stables, and views over Maota Lake. One of India's most magnificent fortresses.", timing: "8AM–5:30PM", price: "₹100 (Indian) / ₹500 (Foreign)", rating: 4.8, tags: ["UNESCO", "Fort", "Elephant"], img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" },
        { name: "Hawa Mahal", type: "Palace", description: "The 'Palace of Winds' — a 5-storey palace with 953 small windows designed so royal women could observe street life unseen.", timing: "9AM–5PM", price: "₹50 / ₹200", rating: 4.7, tags: ["Iconic", "Palace", "Photography"], img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80" },
        { name: "City Palace", type: "Royal Palace", description: "The royal residence of the Maharaja of Jaipur — a complex of courtyards, gardens, and museums. The Mubarak Mahal is architecturally magnificent.", timing: "9:30AM–5PM", price: "₹200 / ₹700", rating: 4.6, tags: ["Palace", "Museum", "Royal"], img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&q=80" },
      ],
      food: [
        { name: "LMB (Laxmi Misthan Bhandar)", type: "Rajasthani Cuisine", description: "Since 1954, LMB serves the definitive Rajasthani thali — Dal Bati Churma, Gatte ki Sabzi, Ker Sangri.", timing: "8AM–11PM", price: "₹400–800/thali", rating: 4.7, tags: ["Since 1954", "Thali", "Vegetarian"], img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
        { name: "Suvarna Mahal, Rambagh Palace", type: "Fine Dining", description: "Dining in a former ballroom of Maharaja's palace. Royal Rajasthani cuisine with live classical music — unforgettable experience.", timing: "7PM–11PM", price: "₹3000–5000/person", rating: 4.9, tags: ["Royal", "Fine Dining", "Heritage"], img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
      ],
      nightlife: [
        { name: "Bapu Bazaar at Night", type: "Night Shopping", description: "Jaipur's oldest market glows with lights after sunset — block prints, blue pottery, lac bangles, and Mojri shoes.", timing: "10AM–10PM", price: "Free", rating: 4.5, tags: ["Shopping", "Lit Up", "Crafts"], img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
        { name: "100% Rock, C-Scheme", type: "Bar & Grill", description: "Jaipur's most popular pub with live music on weekends, a rooftop deck, and generous drinks.", timing: "12PM–12AM", price: "₹600–1200/person", rating: 4.3, tags: ["Live Music", "Rooftop", "Pub"], img: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=400&q=80" },
      ],
      shopping: [
        { name: "Johari Bazaar", type: "Jewellery Market", description: "Asia's most famous jewellery market — Kundan, Meenakari, Polki, and precious stones at wholesale prices.", timing: "10AM–8PM", price: "Free entry", rating: 4.7, tags: ["Jewellery", "Gems", "Wholesale"], img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80" },
      ],
      daytrips: [
        { name: "Pushkar", type: "Holy Town", description: "One of India's oldest and most sacred cities — Brahma temple, sacred lake, and the world's largest camel fair (Nov).", timing: "Year round", price: "₹300–800/day trip", rating: 4.7, tags: ["Pilgrimage", "Camel Fair", "Desert"], img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
      ],
    },
  },
  {
    city: "Bangalore", state: "Karnataka", tagline: "The Garden City & Silicon Valley of India",
    description: "India's tech capital is also its pub capital, home to a vibrant startup ecosystem, craft beer scene, beautiful parks, and a cosmopolitan culture that attracts talent from across the country.",
    heroImg: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&q=80",
    bestTime: "Oct – Feb", weather: "Pleasant Year-Round", language: "Kannada, English", currency: "INR",
    highlights: ["Craft beer pub-crawl on Church Street", "Cubbon Park morning walks", "Nandi Hills sunrise trek", "Lalbagh Flower Show", "Indiranagar food street"],
    categories: {
      attractions: [
        { name: "Bangalore Palace", type: "Royal Palace", description: "Inspired by Windsor Castle, built in 1887 by Chamaraja Wadiyar. Tudor-style architecture with wood carvings and floral motifs.", timing: "10AM–5:30PM", price: "₹230 / ₹460", rating: 4.3, tags: ["Palace", "Royal", "Tudor"], img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80" },
        { name: "Lalbagh Botanical Garden", type: "Park & Garden", description: "200+ year old botanical garden with a 12-acre glass house. Home to over 1,800 plant species and ancient trees.", timing: "6AM–7PM", price: "₹20", rating: 4.6, tags: ["Garden", "Morning Walk", "Historic"], img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80" },
        { name: "ISKCON Temple", type: "Temple", description: "One of the world's largest ISKCON temples — the Rajagopura tower is 60 m tall with intricately carved deities.", timing: "4AM–1PM, 4PM–8:30PM", price: "Free", rating: 4.7, tags: ["Spiritual", "Architecture", "Krishna"], img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80" },
      ],
      food: [
        { name: "MTR (Mavalli Tiffin Room)", type: "South Indian Heritage", description: "Since 1924, MTR serves the gold standard of Bangalore breakfast — Rava Idli (invented here!), Masala Dosa, Filter Coffee.", timing: "6:30AM–11AM, 12:30PM–9PM", price: "₹200–400/person", rating: 4.8, tags: ["Since 1924", "Breakfast", "Iconic"], img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
        { name: "Vidyarthi Bhavan, Gandhi Bazaar", type: "Dosa Joint", description: "Bangalore's most beloved dosa joint since 1943. The Masala Dosa is crispy, buttery, and perfection.", timing: "6:30AM–11:30AM, 2PM–8PM (Mon closed)", price: "₹50–100", rating: 4.9, tags: ["Since 1943", "Dosa", "Heritage"], img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
      ],
      nightlife: [
        { name: "Toit Brewpub, Indiranagar", type: "Microbrewery", description: "Bangalore's most famous craft brewery. Huge outdoor seating, great food, 8 in-house beers — always packed on weekends.", timing: "12PM–11:30PM", price: "₹800–1500/person", rating: 4.6, tags: ["Craft Beer", "Lively", "Famous"], img: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=400&q=80" },
        { name: "Church Street Social", type: "Bar + Cafe", description: "The OG of Bangalore's social scene. Great cocktails, eclectic food menu, live events, and a fantastic ambiance.", timing: "9AM–1AM", price: "₹700–1200/person", rating: 4.4, tags: ["Cocktails", "Events", "Central"], img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
      ],
      shopping: [
        { name: "Commercial Street", type: "Shopping Street", description: "Bangalore's oldest and most diverse shopping street — clothes, accessories, food, electronics, and bargains.", timing: "10AM–9PM", price: "Free entry", rating: 4.5, tags: ["Bargain", "Variety", "Clothes"], img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
        { name: "UB City Mall", type: "Luxury Mall", description: "South India's most premium luxury mall in the United Breweries building. LV, Gucci, Cartier, and a rooftop bar.", timing: "11AM–10PM", price: "Free entry", rating: 4.5, tags: ["Luxury", "Rooftop", "Premium"], img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80" },
      ],
      daytrips: [
        { name: "Nandi Hills", type: "Hill Fort", description: "Ancient fortified hill 60 km from Bangalore — 1478 m above sea level, famous for sunrise views above the clouds.", timing: "6AM–10PM (best before 8AM)", price: "₹5 entry", rating: 4.7, tags: ["Sunrise", "Trekking", "Hill Fort"], img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
        { name: "Mysore", type: "Royal City", description: "The palace city 3 hours away — Mysore Palace (illuminated Sunday nights), Chamundi Hills, and the best Mysore Pak sweets.", timing: "Year round", price: "₹700–1500/day", rating: 4.8, tags: ["Palace", "Royal", "Overnight"], img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" },
      ],
    },
  },
];

const CATEGORY_TABS = [
  { key: "attractions", label: "Attractions", icon: "🏛️" },
  { key: "food", label: "Food & Drink", icon: "🍽️" },
  { key: "nightlife", label: "Nightlife", icon: "🌃" },
  { key: "shopping", label: "Shopping", icon: "🛍️" },
  { key: "daytrips", label: "Day Trips", icon: "🗺️" },
];

export default function ExplorePage() {
  const [selectedCity, setSelectedCity] = useState<CityGuide | null>(null);
  const [activeTab, setActiveTab] = useState("attractions");
  const [search, setSearch] = useState("");

  const filteredCities = cityGuides.filter((c) =>
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase()) ||
    c.tagline.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedCity) {
    const items = selectedCity.categories[activeTab as keyof typeof selectedCity.categories] as Attraction[];
    return (
      <div className="min-h-screen bg-gray-50">
        {/* City Hero */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <Image fill unoptimized src={selectedCity.heroImg} alt={selectedCity.city} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button onClick={() => setSelectedCity(null)}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/30 transition-all flex items-center gap-2">
            ← All Cities
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-white/60 text-sm">{selectedCity.state}</span>
            <h1 className="text-4xl font-bold text-white">{selectedCity.city}</h1>
            <p className="text-white/80 text-lg italic">{selectedCity.tagline}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Quick Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Best Time", value: selectedCity.bestTime, icon: "📅" },
              { label: "Weather", value: selectedCity.weather, icon: "🌤️" },
              { label: "Language", value: selectedCity.language, icon: "💬" },
              { label: "Currency", value: selectedCity.currency, icon: "💰" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                <div className="text-sm font-semibold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="font-bold text-gray-900 mb-2">About {selectedCity.city}</h2>
            <p className="text-gray-600 leading-relaxed">{selectedCity.description}</p>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">✨ Top Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCity.highlights.map((h) => (
                  <span key={h} className="bg-accent/10 text-accent text-sm px-3 py-1 rounded-full border border-accent/20">{h}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {CATEGORY_TABS.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab.key ? "bg-accent text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-accent/40"}`}>
                <span>{tab.icon}</span><span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Attraction Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="wait">
              {items.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                  <div className="relative h-44 overflow-hidden">
                    <Image fill unoptimized src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2.5 py-1 rounded-lg">{item.type}</span>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-amber-400 text-xs">★</span>
                      <span className="text-xs font-bold text-gray-900">{item.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map((tag) => (
                        <span key={tag} className="bg-gray-50 border border-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-50 pt-3">
                      <div className="flex items-center gap-1">
                        <span>🕐</span><span>{item.timing}</span>
                      </div>
                      <div className={`font-semibold ${item.price === "Free" ? "text-green-600" : "text-gray-900"}`}>
                        {item.price}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-explore relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#1a1f2c] to-[#0f2027]" />
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #00b4d8 0%, transparent 50%), radial-gradient(circle at 70% 70%, #7c3aed 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm font-medium mb-5">
              <span>🗺️</span><span>City Explorer</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              Where to <span className="text-[#00b4d8]">Visit</span>
            </h1>
            <p className="text-white/60 text-xl mb-8">Your complete city guide — attractions, food, nightlife, shopping & day trips</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="relative max-w-lg mx-auto">
            <input
              value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a city, state or vibe..."
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/50 text-lg pl-12" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-xl">🔍</span>
          </motion.div>
        </div>
      </div>

      {/* City Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city, i) => (
            <motion.div key={city.city} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedCity(city)}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative h-52 overflow-hidden">
                <Image fill unoptimized src={city.heroImg} alt={city.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/70 text-xs font-medium mb-0.5">{city.state}</p>
                  <h2 className="text-2xl font-bold text-white">{city.city}</h2>
                  <p className="text-white/80 text-sm italic">{city.tagline}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>📅</span><span>Best: {city.bestTime}</span>
                  <span className="mx-1">·</span>
                  <span>🌤️</span><span>{city.weather}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">{city.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {city.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="bg-gray-50 border border-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">{h}</span>
                  ))}
                  {city.highlights.length > 3 && (
                    <span className="bg-gray-50 border border-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-md">+{city.highlights.length - 3} more</span>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {CATEGORY_TABS.slice(0, 4).map((t) => (
                      <span key={t.key} className="text-base" title={t.label}>{t.icon}</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-accent group-hover:gap-2 transition-all flex items-center gap-1">
                    Explore →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-3">🗺️</div>
            <p className="text-lg font-medium">No cities found for &quot;{search}&quot;</p>
            <p className="text-sm mt-1">Try searching for Mumbai, Delhi, Goa, or Jaipur</p>
          </div>
        )}
      </div>
    </div>
  );
}
