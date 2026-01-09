export const properties = [
  {
    slug: "jibhi-sunshine-cafe",
    name: "Jibhi Sunshine cafe",
    location: "Jibhi",
    image: "/images/properties/jibhi.webp",

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
        label: "Stay < 7 days",
        pricePerDay: 1500,
        gst: 5,
        maxGuests: 2,
        extraGuestPrice: 400, // per guest per day
      },
      {
        label: "7 days ≤ Stay < 31 days",
        pricePerDay: 1100,
        gst: 5,
        maxGuests: 2,
        extraGuestPrice: 300,
      },
      {
        label: "Stay ≥ 31 days",
        pricePerDay: 800,
        gst: 5,
        maxGuests: 2,
        extraGuestPrice: 200,
      },
    ],
  },

  {
    slug: "nagar-mountain-loft-xl",
    name: "Nagar Mountain Loft XL",
    location: "Tirthan",
    image: "/images/properties/nagar.avif",

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
      "Great for couples / teams",
    ],

    pricing: [
      {
        label: "Stay < 7 days",
        pricePerDay: 1800,
        gst: 5,
        maxGuests: 2,
        extraGuestPrice: 500,
      },
      {
        label: "7 days ≤ Stay < 31 days",
        pricePerDay: 1300,
        gst: 5,
        maxGuests: 2,
        extraGuestPrice: 400,
      },
      {
        label: "Stay ≥ 31 days",
        pricePerDay: 950,
        gst: 5,
        maxGuests: 2,
        extraGuestPrice: 300,
      },
    ],
  },
];
