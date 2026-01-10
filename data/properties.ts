/**
 * SINGLE SOURCE OF TRUTH FOR ALL PROPERTIES
 *
 * Rules:
 * - NO pricing logic outside this file
 * - Cards show only "starting price"
 * - Booking flow calculates totals
 * - SEO, UI, and logic read from same data
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
  image: string;

  seo: {
    title: string;
    description: string;
  };

  amenities: string[];
  benefits: string[];

  pricing: PricingTier[];
};

export const properties: Property[] = [
  {
    slug: "jibhi-sunshine-cafe",
    name: "Jibhi Sunshine Cafe",
    location: "Jibhi",
    roomCapacity: 2,

    image: "/images/properties/jibhi.webp",

    seo: {
      title: "Jibhi Sunshine Cafe | Remote Work Stay in Jibhi",
      description:
        "Work remotely from Jibhi with high-speed WiFi, power backup, mountain views, and long-term stay discounts.",
    },

    amenities: [
      "High-speed WiFi",
      "Power Backup",
      "Dedicated Workspace",
      "Mountain View",
      "Fully Equipped Kitchen",
    ],

    benefits: [
      "Ideal for remote work",
      "Long stay friendly",
      "Quiet & nature-focused",
    ],

    pricing: [
      {
        id: "short",
        label: "Short stay",
        minNights: 1,
        pricePerDay: 1500,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 400,
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
    slug: "nagar-mountain-loft-xl",
    name: "Nagar Mountain Loft XL",
    location: "Nagar",
    roomCapacity: 2,

    image: "/images/properties/nagar.avif",

    seo: {
      title: "Nagar Mountain Loft XL | Long Stay in Tirthan Valley",
      description:
        "Spacious mountain loft in Tirthan with WiFi, power backup, balcony, and discounted long-term stays.",
    },

    amenities: [
      "High-speed WiFi",
      "Power Backup",
      "Extra Workspace",
      "Balcony",
      "Mountain View",
    ],

    benefits: [
      "More space",
      "Best for extended stays",
      "Great for couples or small teams",
    ],

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
    slug: "Tree Remote Stay",
    name: "Tree Mountain Stay",
    location: "Jibhi",
    roomCapacity: 2,

    image: "/images/properties/nagar.avif",

    seo: {
      title: "Jibhi Mountain Stay | Long Stay in Jibhi",
      description:
        "Spacious mountain loft in Jibhi tree house with WiFi, power backup, balcony, and discounted long-term stays.",
    },

    amenities: [
      "High-speed WiFi",
      "Power Backup",
      "Extra Workspace",
      "Balcony",
      "Mountain View",
    ],

    benefits: [
      "More space",
      "Best for extended stays",
      "Great for couples or small teams",
    ],

    pricing: [
      {
        id: "short",
        label: "Short stay",
        minNights: 1,
        pricePerDay: 3000,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 2000,
      },
      {
        id: "weekly",
        label: "Weekly stay",
        minNights: 7,
        pricePerDay: 2500,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 1500,
      },
      {
        id: "monthly",
        label: "Monthly stay",
        minNights: 31,
        pricePerDay: 2000,
        gstPercent: 5,
        maxGuests: 2,
        extraGuestPrice: 1000,
      },
    ],
  },
];
