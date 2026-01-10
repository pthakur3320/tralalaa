"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { properties } from "@/data/properties";
import { calculatePrice, daysBetween } from "@/lib/pricing";
import { formatINR } from "@/lib/format";


/* ================= PAGE ================= */

export default function BookingSelect({ searchParams }: any) {
  const [location, setLocation] = useState(searchParams.location ?? "");
  const [arrival, setArrival] = useState(searchParams.arrival ?? "");
  const [departure, setDeparture] = useState(searchParams.departure ?? "");
  const [guests, setGuests] = useState(1);

  const locations = useMemo(
    () => Array.from(new Set(properties.map(p => p.location))),
    []
  );

  const nights = useMemo(
    () => daysBetween(arrival, departure),
    [arrival, departure]
  );

  const filteredProperties = properties.filter(
    p => p.location === location
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* HEADER */}
      <header className="mb-6 text-center">
        <p className="text-xs tracking-[0.25em] text-slate-400 uppercase">
          Book your stay
        </p>
        <StepIndicator />
        <h1 className="mt-2 text-xl font-medium">
          Select your stay
        </h1>
      </header>

      {/* SEARCH BAR */}
      {/* SEARCH BAR */}
<section className="sticky top-0 z-10 bg-white border rounded-full px-4 py-2 mb-6 shadow-sm">
  <div className="flex flex-wrap items-center gap-4 text-sm">

    {/* DATES */}
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 uppercase">Dates</span>
      <input
        type="date"
        value={arrival}
        onChange={e => {
          setArrival(e.target.value);
          if (departure && e.target.value >= departure) {
            setDeparture("");
          }
        }}
        className="border-none p-0 text-sm focus:ring-0"
      />
      <span className="text-slate-400">–</span>
      <input
        type="date"
        value={departure}
        onChange={e => setDeparture(e.target.value)}
        className="border-none p-0 text-sm focus:ring-0"
      />
    </div>

    <div className="h-5 w-px bg-slate-200" />

    {/* LOCATION */}
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 uppercase">Location</span>
      <select
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="border-none p-0 text-sm focus:ring-0"
      >
        <option value="" disabled>Select</option>
        {locations.map(loc => (
          <option key={loc}>{loc}</option>
        ))}
      </select>
    </div>

    <div className="h-5 w-px bg-slate-200" />

    {/* GUESTS */}
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 uppercase">Guests</span>
      <GuestButton onClick={() => setGuests(Math.max(1, guests - 1))}>−</GuestButton>
      <span className="text-sm">{guests}</span>
      <GuestButton onClick={() => setGuests(guests + 1)}>+</GuestButton>
    </div>

    {/* NIGHTS (INLINE, NOT A BLOCK) */}
    {nights > 0 && (
      <span className="ml-auto text-xs text-slate-500">
        {nights} nights
      </span>
    )}
  </div>
</section>


      {/* RESULTS */}
      <section className="space-y-4">
        {filteredProperties.map(property => {
          const pricing = calculatePrice(property, nights, guests);

          return (
            <article
              key={property.slug}
              className="border rounded-xl bg-white hover:shadow-sm transition"
            >
              <div className="flex gap-4 p-4">
                {/* IMAGE */}
                <div className="relative w-36 h-28 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={property.images.cover}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <h2 className="text-sm font-semibold">
                    <a
                      href={`/locations/${property.slug}?arrival=${arrival}&departure=${departure}&guests=${guests}`}
                      className="hover:underline"
                    >
                      {property.name}
                    </a>
                  </h2>

                  {pricing && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {pricing.roomsRequired} room · {pricing.beds} bed
                    </p>
                  )}

                  {/* KEY AMENITIES ONLY */}
                  <p className="mt-1 text-xs text-slate-600">
                    ✓ Wi-Fi · ✓ Workspace · ✓ Power backup
                  </p>
                </div>

                {/* PRICE + CTA */}
                <div className="text-right flex flex-col justify-between">
                  {pricing && (
                    <>
                      <div>
                        {pricing.originalTotal > pricing.discountedTotal && (
                          <p className="text-xs text-slate-400 line-through">
                            ₹{pricing.originalTotal.toLocaleString()}
                          </p>
                        )}

                        <p className="text-lg font-semibold">
                          ₹{formatINR(pricing.discountedTotal)}

                        </p>

                        <p className="text-xs text-slate-500">
                          ₹{pricing.perNight.toLocaleString()} / night
                        </p>

                        {pricing.savings > 0 && (
                          <p className="text-xs text-green-600">
                            Save ₹{pricing.savings.toLocaleString()}
                          </p>
                        )}
                      </div>

                      <div className="mt-2 flex gap-2 justify-end">
                        <a
                          href={`/locations/${property.slug}?arrival=${arrival}&departure=${departure}&guests=${guests}`}
                          className="px-3 py-1.5 text-xs rounded-md border hover:bg-slate-100"
                        >
                          View details
                        </a>

                        <a
                          href={`/locations/${property.slug}?arrival=${arrival}&departure=${departure}&guests=${guests}`}
                          className="px-3 py-1.5 text-xs rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                          Book stay
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

/* ================= UI HELPERS ================= */

function SummaryBlock({ label, children }: any) {
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      {children}
    </div>
  );
}

function GuestButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="h-7 w-7 rounded-full border text-sm hover:bg-slate-100"
    >
      {children}
    </button>
  );
}

function StepIndicator() {
  return (
    <div className="flex justify-center items-center gap-3 mt-1">
      <Step number={1} />
      <Divider />
      <Step number={2} active />
      <Divider />
      <Step number={3} />
    </div>
  );
}

function Step({ number, active }: any) {
  return (
    <div
      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs
      ${active ? "bg-slate-900 text-white" : "border text-slate-400"}`}
    >
      {number}
    </div>
  );
}

function Divider() {
  return <div className="w-6 h-px bg-slate-300" />;
}
