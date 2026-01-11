/**
 * SINGLE SOURCE OF TRUTH FOR PROPERTIES
 *
 * Rules:
 * - No pricing logic outside pricing.ts
 * - UI, SEO, booking, and content read from here
 * - Pages should NEVER hardcode descriptions
 */

export type PricingTier = {
  id: "short" | "weekly" | "monthly";
  label: string;
  minNights: number;
  pricePerDay: number;
  gstPercent: number;
  maxGuests: number;
  extraGuestPrice: number;
};

export type Property = {
  slug: string;
  name: string;
  location: string;
  roomCapacity: number;

  images: {
    cover: string;
    gallery: string[]; // ALWAYS present
  };

  seo: {
    title: string;
    description: string;
  };

  content: {
    about: string;
    idealFor: string[];
  };

  amenities: string[];
  highlights: string[];

  policies: {
    cancellation: string;
    houseRules: string[];
  };

  pricing: PricingTier[];
};

/* ================= DATA ================= */

export const properties: Property[] = [
  {
    slug: "jibhi-sunshine-cafe",
    name: "Jibhi Sunshine Cafe",
    location: "Jibhi",
    roomCapacity: 2,

    images: {
      cover: "/images/properties/jibhi/cover.avif",
      gallery: [
        "/images/properties/jibhi/1.avif",
        "/images/properties/jibhi/2.avif",
        "/images/properties/jibhi/3.webp",
        "/images/properties/jibhi/4.webp",
        "/images/properties/jibhi/6.webp",
        "/images/properties/jibhi/5.webp",
      ],
    },

    seo: {
      title: "Jibhi Sunshine Cafe | Remote Work Stay in Jibhi",
      description:
        "Remote-work friendly stay in Jibhi with high-speed WiFi, power backup, mountain views, and long-stay discounts.",
    },

    content: {
      about:
        "Jibhi Sunshine Cafe is a peaceful mountain stay designed for remote professionals. With reliable high-speed Wi-Fi, power backup, and serene surroundings, it’s ideal for focused work, long stays, and slow living in nature.",
      idealFor: [
        "Remote professionals",
        "Long stays",
        "Solo travelers",
        "Couples",
      ],
    },

    amenities: [
      "High-speed WiFi",
      "Power Backup",
      "Dedicated Workspace",
      "Mountain View",
      "Fully Equipped Kitchen",
    ],

    highlights: [
      "Quiet & nature-focused",
      "Long-stay discounts available",
      "Designed for remote work",
    ],

    policies: {
      cancellation: "Free cancellation up to 7 days before check-in",
      houseRules: [
        "No smoking inside rooms",
        "Quiet hours after 10 PM",
        "No parties or events",
      ],
    },

    pricing: [
      {
        id: "short",
        label: "Short stay",
        minNights: 1,
        pricePerDay: 1500,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 1500,
      },
      {
        id: "weekly",
        label: "Weekly stay",
        minNights: 7,
        pricePerDay: 1100,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 300,
      },
      {
        id: "monthly",
        label: "Monthly stay",
        minNights: 31,
        pricePerDay: 800,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 200,
      },
    ],
  },

  {
    slug: "the-martins-manali",
    name: "The Martins – Manali",
    location: "Manali",
    roomCapacity: 2,

    images: {
      cover: "/images/properties/nagar/cover.avif",
      gallery: [], // ✅ FIXED
    },

    seo: {
      title: "The Martins Manali | Remote Work Stay in Manali",
      description:
        "Comfortable remote work stay in Manali with WiFi, power backup, and long-stay discounts.",
    },

    content: {
      about:
        "The Martins is a comfortable and centrally located stay in Manali, suitable for professionals who want modern amenities with mountain surroundings.",
      idealFor: ["Remote workers", "Long stays", "Workations"],
    },

    amenities: [
      "High-speed WiFi",
      "Power Backup",
      "Dedicated Workspace",
      "Heating",
    ],

    highlights: [
      "Central Manali location",
      "Reliable connectivity",
      "Comfort-focused rooms",
    ],

    policies: {
      cancellation: "Free cancellation up to 7 days before check-in",
      houseRules: [
        "No smoking inside rooms",
        "No loud music after 10 PM",
      ],
    },

    pricing: [
      {
        id: "short",
        label: "Short stay",
        minNights: 1,
        pricePerDay: 5000,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 4000,
      },
      {
        id: "weekly",
        label: "Weekly stay",
        minNights: 7,
        pricePerDay: 4000,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 3000,
      },
      {
        id: "monthly",
        label: "Monthly stay",
        minNights: 31,
        pricePerDay: 3000,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 2000,
      },
    ],
  },

  {
    slug: "nagar-mountain-loft-xl",
    name: "Nagar Mountain Loft XL",
    location: "Nagar",
    roomCapacity: 2,

    images: {
      cover: "/images/properties/nagar/cover.avif",
      gallery: [], // ✅ FIXED
    },

    seo: {
      title: "Nagar Mountain Loft XL | Long Stay in Tirthan Valley",
      description:
        "Spacious mountain loft with WiFi, power backup, balcony, and discounted long-term stays.",
    },

    content: {
      about:
        "A spacious mountain loft in Nagar, perfect for extended stays. Designed for comfort, productivity, and breathtaking valley views.",
      idealFor: ["Couples", "Extended stays", "Small teams"],
    },

    amenities: [
      "High-speed WiFi",
      "Power Backup",
      "Extra Workspace",
      "Balcony",
      "Mountain View",
    ],

    highlights: [
      "Spacious layout",
      "Best for long stays",
      "Private balcony",
    ],

    policies: {
      cancellation: "Free cancellation up to 7 days before check-in",
      houseRules: ["No parties", "Quiet hours after 10 PM"],
    },

    pricing: [
      {
        id: "short",
        label: "Short stay",
        minNights: 1,
        pricePerDay: 1900,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 500,
      },
      {
        id: "weekly",
        label: "Weekly stay",
        minNights: 7,
        pricePerDay: 1300,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 400,
      },
      {
        id: "monthly",
        label: "Monthly stay",
        minNights: 31,
        pricePerDay: 950,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 300,
      },
    ],
  },

  {
    slug: "jibhi-tree-house",
    name: "Jibhi Tree House",
    location: "Jibhi",
    roomCapacity: 2,

    images: {
      cover: "/images/properties/jibhi/cover.avif",
      gallery: [
        "/images/properties/jibhi/1.avif",
        "/images/properties/jibhi/2.avif",
      ],
    },

    seo: {
      title: "Jibhi Tree House | Remote Work Stay in Jibhi",
      description:
        "Remote-work friendly tree house stay in Jibhi with WiFi, power backup, and mountain views.",
    },

    content: {
      about:
        "A unique tree house experience in Jibhi, blending nature, comfort, and productivity for remote professionals.",
      idealFor: [
        "Remote professionals",
        "Couples",
        "Nature lovers",
      ],
    },

    amenities: [
      "High-speed WiFi",
      "Power Backup",
      "Dedicated Workspace",
      "Mountain View",
    ],

    highlights: [
      "Tree house experience",
      "Nature immersion",
      "Work-friendly setup",
    ],

    policies: {
      cancellation: "Free cancellation up to 1 day before check-in",
      houseRules: [
        "No smoking inside rooms",
        "Quiet hours after 10 PM",
        "No parties or events",
      ],
    },

    pricing: [
      {
        id: "short",
        label: "Short stay",
        minNights: 1,
        pricePerDay: 1600,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 1600,
      },
      {
        id: "weekly",
        label: "Weekly stay",
        minNights: 7,
        pricePerDay: 1200,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 400,
      },
      {
        id: "monthly",
        label: "Monthly stay",
        minNights: 31,
        pricePerDay: 900,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 300,
      },
    ],
  },
];
