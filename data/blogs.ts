export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  location: string;
  author: string;
  publishedAt: string;
  readingTime: string;

  seo: {
    title: string;
    description: string;
  };

  content: {
    heading: string;
    paragraphs: string[];
  }[];
};

export const blogs: BlogPost[] = [
  {
    slug: "remote-work-in-jibhi",
    title: "Remote Work in Jibhi: A Complete Guide for Digital Nomads",
    excerpt:
      "Discover why Jibhi is becoming a favorite destination for remote workers seeking nature, focus, and affordability.",
    coverImage: "/images/blogs/jibhi_blog.jpg",
    location: "Jibhi, Himachal Pradesh",
    author: "Remote Work Stays Team",
    publishedAt: "2024-12-05",
    readingTime: "6 min read",

    seo: {
      title: "Remote Work in Jibhi | Digital Nomad Guide",
      description:
        "Planning remote work from Jibhi? Learn about WiFi, stays, costs, lifestyle, and why Jibhi is ideal for long stays.",
    },

    content: [
      {
        heading: "Why Jibhi is perfect for remote work",
        paragraphs: [
          "Jibhi offers a rare combination of calm, connectivity, and cost-efficiency.",
          "Unlike crowded hill stations, Jibhi remains peaceful while still offering reliable internet and essential amenities.",
        ],
      },
      {
        heading: "Internet, power & work setup",
        paragraphs: [
          "Most professional stays in Jibhi now offer fiber WiFi with speeds suitable for video calls.",
          "Power backups are common, making it suitable even for full-time remote roles.",
        ],
      },
      {
        heading: "Cost of living & long stays",
        paragraphs: [
          "Monthly stays in Jibhi are significantly cheaper than metro cities.",
          "Long-stay discounts make it ideal for slow travel and focused work.",
        ],
      },
    ],
  },
];
