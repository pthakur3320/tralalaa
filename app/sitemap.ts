import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://yourdomain.com", priority: 1 },
    { url: "https://yourdomain.com/locations" },
    { url: "https://yourdomain.com/book" },
    { url: "https://yourdomain.com/vision" },
    { url: "https://yourdomain.com/contact" }
  ];
}
