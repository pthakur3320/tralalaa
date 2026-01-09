"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { properties } from "@/data/properties";

/* ---------------- UTILS ---------------- */

function daysBetween(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const diff = e.getTime() - s.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

/* ---------------- PAGE ---------------- */

export default function BookingSelect({
  searchParams,
}: {
  searchParams: {
    location?: string;
    arrival?: string;
    departure?: string;
  };
}) {
  const [location, setLocation] = useState(searchParams.location ?? "");
  const [arrival, setArrival] = useState(searchParams.arrival ?? todayISO());
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
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* HEADER */}
      <header className="text-center mb-10">
        <p className="text-xs tracking-[0.25em] text-slate-400 mb-2">
          BOOK YOUR STAY
        </p>

        <StepIndicator />

        <h1 className="mt-4 text-2xl font-light">
          Select Your Room & Rate
        </h1>
      </header>

      {/* SUMMARY */}
      <section className="mb-10 rounded-xl border bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          {/* DATES */}
          <SummaryBlock label="Arrival – Departure">
            <div className="flex gap-2">
              <input
                type="date"
                min={todayISO()}
                value={arrival}
                onChange={e => {
                  setArrival(e.target.value);
                  if (departure && e.target.value >= departure) {
                    setDeparture("");
                  }
                }}
                className="summary-input"
              />
              <input
                type="date"
                min={arrival}
                value={departure}
                onChange={e => setDeparture(e.target.value)}
                className="summary-input"
              />
            </div>
          </SummaryBlock>

          {/* LOCATION */}
          <SummaryBlock label="Location">
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="summary-input"
            >
              <option value="" disabled>
                Select
              </option>
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </SummaryBlock>

          {/* GUESTS */}
          <SummaryBlock label="Guests">
            <div className="flex items-center justify-center gap-3">
              <GuestButton onClick={() => setGuests(Math.max(1, guests - 1))}>−</GuestButton>
              <span className="text-sm font-medium">
                {guests} Person{guests > 1 ? "s" : ""}
              </span>
              <GuestButton onClick={() => setGuests(guests + 1)}>+</GuestButton>
            </div>
          </SummaryBlock>

          {/* INFO */}
          <SummaryBlock label="Nights">
            <p className="text-sm font-medium">
              {nights || "-"}
            </p>
          </SummaryBlock>
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="space-y-10">
        {filteredProperties.map(property => (
          <PropertyCard
            key={property.slug}
            property={property}
            guests={guests}
            nights={nights}
          />
        ))}

        {!filteredProperties.length && (
          <p className="text-center text-slate-500 py-8">
            No properties available for this location.
          </p>
        )}
      </section>
    </main>
  );
}

/* ---------------- PROPERTY ---------------- */

function PropertyCard({ property, guests, nights }: any) {
  const plan =
    nights < 7
      ? property.pricing[0]
      : nights < 31
      ? property.pricing[1]
      : property.pricing[2];

  const perDay =
    plan.pricePerDay +
    Math.max(0, guests - 1) * plan.extraGuestPrice;

  const subtotal = perDay * nights;
  const total = Math.round(subtotal + (subtotal * plan.gst) / 100);

  return (
    <article className="grid md:grid-cols-[260px_1fr] gap-5 rounded-xl border bg-white overflow-hidden">
      <div className="relative h-52 md:h-full">
        <Image src={property.image} alt={property.name} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">
          {property.name}
        </h3>

        <ul className="grid grid-cols-2 gap-y-1 text-sm text-slate-600 mb-4">
          {property.amenities.map((a: string) => (
            <li key={a}>✓ {a}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.benefits.map((b: string) => (
            <span key={b} className="bg-slate-100 px-3 py-1 text-xs rounded-full">
              {b}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-slate-500">
              ₹{perDay} / day × {nights || "-"} nights
            </p>
            <p className="text-lg font-semibold">
              ₹{nights ? total : "-"}
            </p>
          </div>

          <button
            disabled={!nights}
            className="px-5 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 disabled:opacity-50"
          >
            ADD
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------------- UI ---------------- */

function SummaryBlock({ label, children }: any) {
  return (
    <div className="text-center">
      <p className="mb-1 text-[11px] tracking-widest text-slate-400 uppercase">
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
      className="h-8 w-8 rounded-full border text-sm hover:bg-slate-100"
    >
      {children}
    </button>
  );
}

function StepIndicator() {
  return (
    <div className="flex justify-center items-center gap-4">
      <Step number={1} />
      <Divider />
      <Step number={2} active />
      <Divider />
      <Step number={3} />
    </div>
  );
}

function Step({ number, active }: { number: number; active?: boolean }) {
  return (
    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
      ${active ? "bg-slate-900 text-white" : "border text-slate-400"}`}>
      {number}
    </div>
  );
}

function Divider() {
  return <div className="w-10 h-px bg-slate-300" />;
}
