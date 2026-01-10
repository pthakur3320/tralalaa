"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { properties, Property, PricingTier } from "@/data/properties";

/* ================= UTILITIES ================= */

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(start?: string, end?: string) {
  if (!start || !end) return 0;

  const s = new Date(start);
  const e = new Date(end);

  if (isNaN(s.getTime()) || isNaN(e.getTime())) return 0;

  return Math.max(
    0,
    Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
  );
}

/**
 * Select pricing tier based on nights
 */
function selectPricingTier(pricing: PricingTier[], nights: number) {
  return pricing
    .slice()
    .sort((a, b) => b.minNights - a.minNights)
    .find(t => nights >= t.minNights);
}

/**
 * Convert tier + nights into USER FRIENDLY LABEL
 */
function getStayLabel(nights: number) {
  if (nights >= 30) return "Monthly stay (best value)";
  if (nights >= 7) return "Weekly long stay";
  return "Short stay";
}

/**
 * SAFE pricing calculation
 */
function calculatePrice(
  property: Property,
  nights: number,
  guests: number
) {
  if (nights <= 0) return null;

  const tier = selectPricingTier(property.pricing, nights);
  if (!tier) return null;

  const roomsRequired = Math.ceil(
    guests / property.roomCapacity
  );

  const beds = roomsRequired; // 1 double bed per room

  const basePrice =
    tier.pricePerDay * nights * roomsRequired;

  const extraGuests = Math.max(
    0,
    guests - tier.maxGuests * roomsRequired
  );

  const extraGuestCost =
    extraGuests * tier.extraGuestPrice * nights;

  const subtotal = basePrice + extraGuestCost;
  const gst = Math.round((subtotal * tier.gstPercent) / 100);
  const total = subtotal + gst;

  return {
    tier,
    roomsRequired,
    beds,
    stayLabel: getStayLabel(nights),
    total,
  };
}

/* ================= PAGE ================= */

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
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* HEADER */}
      <header className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] text-slate-400 mb-2">
          BOOK YOUR STAY
        </p>
        <StepIndicator />
        <h1 className="mt-4 text-2xl font-light">
          Select Your Room & Rate
        </h1>
      </header>

      {/* SUMMARY */}
      <section className="mb-12 rounded-2xl border bg-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                min={arrival || todayISO()}
                value={departure}
                onChange={e => setDeparture(e.target.value)}
                className="summary-input"
              />
            </div>
          </SummaryBlock>

          <SummaryBlock label="Location">
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="summary-input"
            >
              <option value="" disabled>Select</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </SummaryBlock>

          <SummaryBlock label="Guests">
            <div className="flex items-center justify-center gap-3">
              <GuestButton onClick={() => setGuests(Math.max(1, guests - 1))}>−</GuestButton>
              <span>{guests}</span>
              <GuestButton onClick={() => setGuests(guests + 1)}>+</GuestButton>
            </div>
          </SummaryBlock>

          <SummaryBlock label="Nights">
            <p>{nights > 0 ? nights : "—"}</p>
          </SummaryBlock>
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="space-y-12">
        {filteredProperties.map(property => (
          <OfferCard
            key={property.slug}
            property={property}
            nights={nights}
            guests={guests}
          />
        ))}
      </section>
    </main>
  );
}

/* ================= OFFER CARD ================= */

function OfferCard({
  property,
  nights,
  guests,
}: {
  property: Property;
  nights: number;
  guests: number;
}) {
  const pricing = calculatePrice(property, nights, guests);

  return (
    <article className="grid md:grid-cols-[320px_1fr] gap-6 rounded-2xl border bg-white overflow-hidden">
      <div className="relative h-64 md:h-full">
        <Image
          src={property.image}
          alt={`${property.name} in ${property.location}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            {property.name}
          </h2>

          {pricing && (
            <p className="text-sm text-slate-500 mb-3">
              {pricing.roomsRequired} room
              {pricing.roomsRequired > 1 ? "s" : ""} ·
              {" "}{pricing.beds} double bed
              {pricing.beds > 1 ? "s" : ""}
            </p>
          )}

          <ul className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 mb-4">
            {property.amenities.map(a => (
              <li key={a}>✓ {a}</li>
            ))}
          </ul>
        </div>

        {pricing ? (
          <div className="border-t pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500">
                {pricing.stayLabel}
              </p>
              <p className="text-xl font-semibold">
                ₹{pricing.total.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">
                Includes taxes · No booking fees
              </p>
            </div>

            <button className="bg-red-500 text-white px-6 py-2 rounded-lg">
              ADD
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-400 border-t pt-4">
            Select valid dates to view price
          </p>
        )}
      </div>
    </article>
  );
}

/* ================= UI ================= */

function SummaryBlock({ label, children }: any) {
  return (
    <div className="text-center">
      <p className="text-[11px] tracking-widest text-slate-400 uppercase mb-1">
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
      className="h-8 w-8 rounded-full border hover:bg-slate-100"
    >
      {children}
    </button>
  );
}

function StepIndicator() {
  return (
    <div className="flex justify-center gap-4">
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
    <div className={`h-8 w-8 flex items-center justify-center rounded-full text-sm
      ${active ? "bg-slate-900 text-white" : "border text-slate-400"}`}>
      {number}
    </div>
  );
}

function Divider() {
  return <div className="w-10 h-px bg-slate-300" />;
}
