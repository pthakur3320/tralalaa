import BookingBar from "@/components/booking-bar";
import PropertyCard from "@/components/property-card";
import { properties } from "@/data/properties";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl md:text-6xl font-light leading-tight">
            Work from the Mountains
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            High-speed WiFi, power backup, and long-term stays —
            built for remote professionals.
          </p>

          <div className="mt-10">
            <BookingBar />
          </div>
        </div>
      </section>

      {/* Properties */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-10">
          Available Locations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      </section>
    </>
  );
}
