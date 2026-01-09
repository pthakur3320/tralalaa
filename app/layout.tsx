import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remote Mountain Stays | Work From Nature",
  description:
    "Work remotely from mountains with high-speed WiFi, power backup, and long-term stays.",
  keywords: [
    "remote work stays",
    "work from mountains",
    "digital nomad india",
    "co-living mountains"
  ],
  openGraph: {
    title: "Remote Mountain Stays",
    description: "Premium mountain stays for remote workers.",
    images: ["/images/hero.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
