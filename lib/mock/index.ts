import {
  Artist,
  Category,
  Discount,
  Event,
  Organizer,
  Review,
  Seat,
  User,
  Venue,
} from "@/types";

export const users: User[] = [
  { user_id: 1, name: "Rahul Sharma",  email: "rahul.sharma@example.com", phone: "+91-9000000001", password: "hashed_password_1" },
  { user_id: 2, name: "Ananya Iyer",   email: "ananya.iyer@example.com",  phone: "+91-9000000002", password: "hashed_password_2" },
  { user_id: 3, name: "Karan Mehta",   email: "karan.mehta@example.com",  phone: "+91-9000000003", password: "hashed_password_3" },
  { user_id: 4, name: "Sneha Reddy",   email: "sneha.reddy@example.com",  phone: "+91-9000000004", password: "hashed_password_4" },
  { user_id: 5, name: "Amit Verma",    email: "amit.verma@example.com",   phone: "+91-9000000005", password: "hashed_password_5" },
  { user_id: 6, name: "Priya Singh",   email: "priya.singh@example.com",  phone: "+91-9000000006", password: "hashed_password_6" },
  { user_id: 7, name: "Arjun Nair",    email: "arjun.nair@example.com",   phone: "+91-9000000007", password: "hashed_password_7" },
];

export const venues: Venue[] = [
  { venue_id: 1,  venue_name: "Grand Cinema Hall",           location: "Chennai",   capacity: 300 },
  { venue_id: 2,  venue_name: "Music Arena",                 location: "Bangalore", capacity: 500 },
  { venue_id: 3,  venue_name: "City Theatre",                location: "Hyderabad", capacity: 200 },
  { venue_id: 4,  venue_name: "Open Ground",                 location: "Mumbai",    capacity: 800 },
  { venue_id: 5,  venue_name: "Convention Center",           location: "Delhi",     capacity: 600 },
  { venue_id: 6,  venue_name: "MMRDA Grounds",               location: "Mumbai",    capacity: 50000 },
  { venue_id: 7,  venue_name: "Jawaharlal Nehru Stadium",    location: "Delhi",     capacity: 75000 },
  { venue_id: 8,  venue_name: "M. Chinnaswamy Stadium",      location: "Bangalore", capacity: 40000 },
  { venue_id: 9,  venue_name: "DY Patil Stadium",            location: "Mumbai",    capacity: 55000 },
  { venue_id: 10, venue_name: "Nehru Indoor Stadium",        location: "Chennai",   capacity: 8000  },
  { venue_id: 11, venue_name: "Rajiv Gandhi Int'l Stadium",  location: "Hyderabad", capacity: 55000 },
  { venue_id: 12, venue_name: "Eden Gardens",                location: "Kolkata",   capacity: 68000 },
  { venue_id: 13, venue_name: "Siri Fort Auditorium",        location: "Delhi",     capacity: 2000  },
  { venue_id: 14, venue_name: "Phoenix Arena",               location: "Bangalore", capacity: 5000  },
  { venue_id: 15, venue_name: "Royal Opera House",           location: "Mumbai",    capacity: 1000  },
  { venue_id: 16, venue_name: "Prithvi Theatre",             location: "Mumbai",    capacity: 200   },
  { venue_id: 17, venue_name: "Goa Beach Amphitheatre",      location: "Goa",       capacity: 30000 },
  { venue_id: 18, venue_name: "Jaipur Open Air Theatre",     location: "Jaipur",    capacity: 5000  },
  { venue_id: 19, venue_name: "Barabati Stadium",            location: "Bhubaneswar", capacity: 45000 },
  { venue_id: 20, venue_name: "HICC Convention Centre",      location: "Hyderabad", capacity: 8000  },
];

export const categories: Category[] = [
  { category_id: 1, category_name: "Movie"        },
  { category_id: 2, category_name: "Music"        },
  { category_id: 3, category_name: "Theatre"      },
  { category_id: 4, category_name: "Comedy"       },
  { category_id: 5, category_name: "Festival"     },
  { category_id: 6, category_name: "Concert"      },
  { category_id: 7, category_name: "Sports"       },
  { category_id: 8, category_name: "Comedy Show"  },
];

export const organizers: Organizer[] = [
  { organizer_id: 1,  name: "CineScope Events",       contact: "+91-8000000101" },
  { organizer_id: 2,  name: "Sonic Live",              contact: "+91-8000000102" },
  { organizer_id: 3,  name: "StageCraft Productions",  contact: "+91-8000000103" },
  { organizer_id: 4,  name: "Laugh Track India",       contact: "+91-8000000104" },
  { organizer_id: 5,  name: "SeasonFest Collective",   contact: "+91-8000000105" },
  { organizer_id: 6,  name: "BCCI Events",             contact: "+91-8000000106" },
  { organizer_id: 7,  name: "BookMyShow Live",         contact: "+91-8000000107" },
  { organizer_id: 8,  name: "Vh1 Supersonic",          contact: "+91-8000000108" },
  { organizer_id: 9,  name: "Comedy Club India",       contact: "+91-8000000109" },
  { organizer_id: 10, name: "Percept Live",            contact: "+91-8000000110" },
];

export const events: Event[] = [
  // ── Original 5 (kept for DB compatibility) ─────────────────────────────────
  { event_id: 1,  event_name: "Avengers Movie Night",      event_date: "2026-07-10", venue_id: 1,  category_id: 1, organizer_id: 1,  admin_id: 1, price: 350  } as Event & { price: number },
  { event_id: 2,  event_name: "AR Rahman Live Concert",    event_date: "2026-05-07", venue_id: 6,  category_id: 6, organizer_id: 2,  admin_id: 1, price: 1499 } as Event & { price: number },
  { event_id: 3,  event_name: "Drama Night",               event_date: "2026-05-22", venue_id: 13, category_id: 3, organizer_id: 3,  admin_id: 1, price: 599  } as Event & { price: number },
  { event_id: 4,  event_name: "Stand-up Comedy Night",     event_date: "2026-06-01", venue_id: 4,  category_id: 8, organizer_id: 4,  admin_id: 1, price: 499  } as Event & { price: number },
  { event_id: 5,  event_name: "Spring Festival",           event_date: "2026-07-15", venue_id: 5,  category_id: 5, organizer_id: 5,  admin_id: 1, price: 799  } as Event & { price: number },

  // ── Movies ──────────────────────────────────────────────────────────────────
  { event_id: 6,  event_name: "Pushpa 2 — The Rule",       event_date: "2026-05-10", venue_id: 1,  category_id: 1, organizer_id: 1,  admin_id: 1, price: 280  } as Event & { price: number },
  { event_id: 7,  event_name: "Kalki 2898 AD",             event_date: "2026-05-15", venue_id: 3,  category_id: 1, organizer_id: 1,  admin_id: 1, price: 320  } as Event & { price: number },
  { event_id: 8,  event_name: "Avengers: Doomsday",        event_date: "2026-05-08", venue_id: 5,  category_id: 1, organizer_id: 7,  admin_id: 1, price: 450  } as Event & { price: number },
  { event_id: 9,  event_name: "Mission Impossible 8",      event_date: "2026-06-28", venue_id: 1,  category_id: 1, organizer_id: 7,  admin_id: 1, price: 380  } as Event & { price: number },
  { event_id: 10, event_name: "Stree 3",                   event_date: "2026-07-04", venue_id: 5,  category_id: 1, organizer_id: 1,  admin_id: 1, price: 260  } as Event & { price: number },
  { event_id: 11, event_name: "Fast & Furious 11",         event_date: "2026-07-28", venue_id: 5,  category_id: 1, organizer_id: 7,  admin_id: 1, price: 300  } as Event & { price: number },
  { event_id: 12, event_name: "KGF Chapter 3",             event_date: "2026-09-05", venue_id: 3,  category_id: 1, organizer_id: 1,  admin_id: 1, price: 350  } as Event & { price: number },
  { event_id: 13, event_name: "RRR 2",                     event_date: "2026-10-02", venue_id: 9,  category_id: 1, organizer_id: 1,  admin_id: 1, price: 400  } as Event & { price: number },

  // ── Concerts / Music ────────────────────────────────────────────────────────
  { event_id: 14, event_name: "Arijit Singh — Aashiqui Live", event_date: "2026-06-15", venue_id: 7,  category_id: 6, organizer_id: 2,  admin_id: 1, price: 1999 } as Event & { price: number },
  { event_id: 15, event_name: "Diljit Dosanjh — Dil-Luminati", event_date: "2026-07-04", venue_id: 9,  category_id: 6, organizer_id: 10, admin_id: 1, price: 2499 } as Event & { price: number },
  { event_id: 16, event_name: "Nucleya Bass Camp 2026",     event_date: "2026-08-20", venue_id: 14, category_id: 2, organizer_id: 8,  admin_id: 1, price: 999  } as Event & { price: number },
  { event_id: 17, event_name: "Martin Garrix India Tour",   event_date: "2026-10-15", venue_id: 6,  category_id: 2, organizer_id: 8,  admin_id: 1, price: 3499 } as Event & { price: number },
  { event_id: 18, event_name: "Coldplay — Music of the Spheres", event_date: "2026-11-22", venue_id: 9, category_id: 6, organizer_id: 10, admin_id: 1, price: 4999 } as Event & { price: number },

  // ── Sports ──────────────────────────────────────────────────────────────────
  { event_id: 19, event_name: "IPL 2026 Final",             event_date: "2026-05-25", venue_id: 9,  category_id: 7, organizer_id: 6,  admin_id: 1, price: 1200 } as Event & { price: number },
  { event_id: 20, event_name: "ISL Final — Mumbai vs ATK",  event_date: "2026-05-12", venue_id: 9,  category_id: 7, organizer_id: 6,  admin_id: 1, price: 600  } as Event & { price: number },
  { event_id: 21, event_name: "India vs England Test Match", event_date: "2026-06-10", venue_id: 12, category_id: 7, organizer_id: 6,  admin_id: 1, price: 500  } as Event & { price: number },
  { event_id: 22, event_name: "IPL Playoff — Game 1",       event_date: "2026-05-18", venue_id: 8,  category_id: 7, organizer_id: 6,  admin_id: 1, price: 800  } as Event & { price: number },
  { event_id: 23, event_name: "Kabaddi World Cup Final",    event_date: "2026-09-15", venue_id: 10, category_id: 7, organizer_id: 6,  admin_id: 1, price: 400  } as Event & { price: number },
  { event_id: 24, event_name: "India vs Australia T20",     event_date: "2026-07-20", venue_id: 8,  category_id: 7, organizer_id: 6,  admin_id: 1, price: 700  } as Event & { price: number },
  { event_id: 25, event_name: "Badminton Premier League Final", event_date: "2026-08-10", venue_id: 10, category_id: 7, organizer_id: 6, admin_id: 1, price: 350 } as Event & { price: number },

  // ── Comedy Shows ─────────────────────────────────────────────────────────────
  { event_id: 26, event_name: "Kapil Sharma — Live",        event_date: "2026-06-01", venue_id: 7,  category_id: 8, organizer_id: 9,  admin_id: 1, price: 799  } as Event & { price: number },
  { event_id: 27, event_name: "Zakir Khan — Haq Se Single 2", event_date: "2026-07-12", venue_id: 14, category_id: 8, organizer_id: 9, admin_id: 1, price: 599 } as Event & { price: number },
  { event_id: 28, event_name: "Biswa Kalyan Rath — Kab Aaoge", event_date: "2026-08-05", venue_id: 4, category_id: 8, organizer_id: 9, admin_id: 1, price: 499 } as Event & { price: number },
  { event_id: 29, event_name: "Comicstaan Live Tour",        event_date: "2026-09-20", venue_id: 3,  category_id: 8, organizer_id: 9,  admin_id: 1, price: 549  } as Event & { price: number },

  // ── Theatre ──────────────────────────────────────────────────────────────────
  { event_id: 30, event_name: "Ramayana — Musical Drama",   event_date: "2026-05-22", venue_id: 13, category_id: 3, organizer_id: 3,  admin_id: 1, price: 799  } as Event & { price: number },
  { event_id: 31, event_name: "Tumhari Amrita",             event_date: "2026-06-10", venue_id: 15, category_id: 3, organizer_id: 3,  admin_id: 1, price: 999  } as Event & { price: number },
  { event_id: 32, event_name: "Prithvi Theatre Festival",   event_date: "2026-09-01", venue_id: 16, category_id: 3, organizer_id: 3,  admin_id: 1, price: 450  } as Event & { price: number },

  // ── Festivals ────────────────────────────────────────────────────────────────
  { event_id: 33, event_name: "Sunburn Festival 2026",      event_date: "2026-12-27", venue_id: 17, category_id: 5, organizer_id: 8,  admin_id: 1, price: 2999 } as Event & { price: number },
  { event_id: 34, event_name: "NH7 Weekender 2026",         event_date: "2026-11-14", venue_id: 14, category_id: 5, organizer_id: 8,  admin_id: 1, price: 1499 } as Event & { price: number },
  { event_id: 35, event_name: "Lollapalooza India 2027",    event_date: "2027-01-17", venue_id: 6,  category_id: 5, organizer_id: 8,  admin_id: 1, price: 3999 } as Event & { price: number },
  { event_id: 36, event_name: "Jaipur Literature Festival",  event_date: "2027-02-01", venue_id: 18, category_id: 5, organizer_id: 5,  admin_id: 1, price: 499  } as Event & { price: number },
  { event_id: 37, event_name: "Kala Ghoda Arts Festival",   event_date: "2027-02-07", venue_id: 4,  category_id: 5, organizer_id: 5,  admin_id: 1, price: 299  } as Event & { price: number },
];

export const seats: Seat[] = [
  { seat_id: 1,  seat_number: "A1", venue_id: 1, status: "available" },
  { seat_id: 2,  seat_number: "A2", venue_id: 1, status: "available" },
  { seat_id: 3,  seat_number: "B1", venue_id: 2, status: "available" },
  { seat_id: 4,  seat_number: "B2", venue_id: 2, status: "available" },
  { seat_id: 5,  seat_number: "C1", venue_id: 3, status: "available" },
  { seat_id: 6,  seat_number: "C2", venue_id: 3, status: "available" },
  { seat_id: 7,  seat_number: "D1", venue_id: 4, status: "available" },
  { seat_id: 8,  seat_number: "D2", venue_id: 4, status: "available" },
  { seat_id: 9,  seat_number: "E1", venue_id: 5, status: "available" },
  { seat_id: 10, seat_number: "E2", venue_id: 5, status: "available" },
];

export const discounts: Discount[] = [
  { discount_id: 1, code: "NEWUSER", percentage: 10, expiry_date: "2026-12-31" },
  { discount_id: 2, code: "FESTIVE", percentage: 20, expiry_date: "2026-12-31" },
  { discount_id: 3, code: "SUMMER",  percentage: 15, expiry_date: "2026-12-31" },
  { discount_id: 4, code: "SPECIAL", percentage: 25, expiry_date: "2026-12-31" },
  { discount_id: 5, code: "VIP",     percentage: 30, expiry_date: "2026-12-31" },
  { discount_id: 6, code: "SHOW10",  percentage: 10, expiry_date: "2027-12-31" },
  { discount_id: 7, code: "FIRST50", percentage: 50, expiry_date: "2026-12-31" },
];

export const artists: Artist[] = [
  { artist_id: 1,  artist_name: "AR Rahman",         genre: "Music"   },
  { artist_id: 2,  artist_name: "Kapil Sharma",       genre: "Comedy"  },
  { artist_id: 3,  artist_name: "Drama Group",        genre: "Theatre" },
  { artist_id: 4,  artist_name: "DJ Snake",           genre: "Music"   },
  { artist_id: 5,  artist_name: "Festival Band",      genre: "Music"   },
  { artist_id: 6,  artist_name: "Arijit Singh",       genre: "Music"   },
  { artist_id: 7,  artist_name: "Diljit Dosanjh",     genre: "Music"   },
  { artist_id: 8,  artist_name: "Nucleya",            genre: "EDM"     },
  { artist_id: 9,  artist_name: "Martin Garrix",      genre: "EDM"     },
  { artist_id: 10, artist_name: "Zakir Khan",         genre: "Comedy"  },
  { artist_id: 11, artist_name: "Biswa Kalyan Rath",  genre: "Comedy"  },
  { artist_id: 12, artist_name: "Coldplay",           genre: "Rock"    },
  { artist_id: 13, artist_name: "Allu Arjun",         genre: "Film"    },
  { artist_id: 14, artist_name: "Prabhas",            genre: "Film"    },
  { artist_id: 15, artist_name: "Rohit Sharma",       genre: "Cricket" },
  { artist_id: 16, artist_name: "Virat Kohli",        genre: "Cricket" },
  { artist_id: 17, artist_name: "SRK",                genre: "Film"    },
];

export const eventArtistMap: Record<number, number[]> = {
  1:  [],
  2:  [1, 4],
  3:  [3],
  4:  [2],
  5:  [5],
  6:  [13],
  7:  [14],
  8:  [],
  9:  [],
  10: [],
  11: [],
  12: [],
  13: [],
  14: [6],
  15: [7],
  16: [8],
  17: [9],
  18: [12],
  19: [15, 16],
  20: [],
  21: [16],
  22: [],
  23: [],
  24: [16],
  25: [],
  26: [2],
  27: [10],
  28: [11],
  29: [],
  30: [3],
  31: [3],
  32: [3],
  33: [4, 5],
  34: [],
  35: [],
  36: [],
  37: [],
};

export const reviews: Review[] = [
  { review_id: 1,  user_id: 1, event_id: 1,  rating: 5, comment: "Absolutely spectacular! The atmosphere was electric and every moment was unforgettable.", user: users[0] },
  { review_id: 2,  user_id: 2, event_id: 1,  rating: 4, comment: "Great experience overall. The venue was well-organised and the show started on time.", user: users[1] },
  { review_id: 3,  user_id: 3, event_id: 1,  rating: 4, comment: "Really enjoyed it. Would definitely attend again next year.", user: users[2] },
  { review_id: 4,  user_id: 1, event_id: 2,  rating: 5, comment: "AR Rahman live is a completely different experience. Goosebumps throughout!", user: users[0] },
  { review_id: 5,  user_id: 4, event_id: 2,  rating: 5, comment: "One of the best concerts I have ever attended. Flawless sound and lighting.", user: users[3] },
  { review_id: 6,  user_id: 2, event_id: 3,  rating: 3, comment: "Good performance but the seating could have been better arranged.", user: users[1] },
  { review_id: 7,  user_id: 5, event_id: 4,  rating: 5, comment: "Kapil Sharma had the entire crowd in splits. Non-stop laughter for two hours!", user: users[4] },
  { review_id: 8,  user_id: 3, event_id: 5,  rating: 4, comment: "Vibrant festival with great food stalls and live performances. Loved it.", user: users[2] },
  { review_id: 9,  user_id: 6, event_id: 14, rating: 5, comment: "Arijit Singh's voice is magical in person. Cried through half the concert.", user: users[5] },
  { review_id: 10, user_id: 7, event_id: 19, rating: 5, comment: "IPL Final — what an atmosphere! Every ball was nail-biting.", user: users[6] },
  { review_id: 11, user_id: 4, event_id: 18, rating: 5, comment: "Coldplay in India — surreal. Yellow was the moment of my life.", user: users[3] },
  { review_id: 12, user_id: 5, event_id: 26, rating: 5, comment: "Kapil is pure genius live. Better than the TV show a thousand times.", user: users[4] },
];
