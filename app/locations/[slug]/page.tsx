"use client";

import Script from "next/script";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import { useState } from "react";
import { properties } from "@/data/properties";
import { calculatePrice, daysBetween } from "@/lib/pricing";
import { formatINR } from "@/lib/format";

/* ================= PAGE ================= */

export default function PropertyDetails({
  params,
}: {
  params: { slug: string };
}) {
  const property = properties.find(p => p.slug === params.slug);
  if (!property) return notFound();

  const searchParams = useSearchParams();

  /* URL PARAMS = SOURCE OF TRUTH */
  const urlArrival = searchParams.get("arrival") ?? "";
  const urlDeparture = searchParams.get("departure") ?? "";
  const urlGuests = Number(searchParams.get("guests") ?? 1);

  const [arrival, setArrival] = useState(urlArrival);
  const [departure, setDeparture] = useState(urlDeparture);
  const [guests, setGuests] = useState(urlGuests);

  const nights = daysBetween(arrival, departure);
  const pricing = calculatePrice(property, nights, guests);

  /* ---------- SEO SCHEMA ---------- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: property.name,
    description: property.seo.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "IN",
    },
    amenityFeature: property.amenities.map(a => ({
      "@type": "LocationFeatureSpecification",
      name: a,
    })),
  };

  function todayISO() {
    return new Date().toISOString().split("T")[0];
  }

  return (
    <>
      <Script
        id="hotel-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* ================= TITLE ================= */}
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {property.name}
          </h1>
          <p className="mt-1 text-slate-600">
            📍 {property.location}, Himachal Pradesh
          </p>
        </header>

        {/* ================= IMAGE GALLERY ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          <div className="relative h-[420px] md:col-span-2 rounded-xl overflow-hidden">
            <Image
              src={property.images.cover}
              alt={property.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="hidden md:grid gap-3">
            {(property.images.gallery ?? []).slice(0, 2).map((img, i) => (
              <div
                key={i}
                className="relative h-[205px] rounded-xl overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${property.name} image ${i + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ================= CONTENT + BOOKING ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          {/* ---------- LEFT CONTENT ---------- */}
          <div>
            {/* ABOUT */}
            <h2 className="text-xl font-semibold mb-3">
              About this stay
            </h2>

            <p className="text-slate-600 mb-6">
              {property.content.about}
            </p>

            {/* IDEAL FOR */}
            {property.content.idealFor.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  Ideal for
                </h3>
                <ul className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 mb-8">
                  {property.content.idealFor.map(i => (
                    <li key={i}>✓ {i}</li>
                  ))}
                </ul>
              </>
            )}

            {/* AMENITIES */}
            <h3 className="text-lg font-semibold mb-3">
              Amenities
            </h3>

            <ul className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 mb-8">
              {property.amenities.map(a => (
                <li key={a}>✓ {a}</li>
              ))}
            </ul>

            {/* HIGHLIGHTS */}
            {property.highlights.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  Why you’ll love this stay
                </h3>

                <ul className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 mb-8">
                  {property.highlights.map(h => (
                    <li key={h}>✓ {h}</li>
                  ))}
                </ul>
              </>
            )}

            {/* POLICIES */}
            <h3 className="text-lg font-semibold mb-3">
              Policies
            </h3>

            <ul className="text-sm text-slate-600 space-y-1">
              <li>• {property.policies.cancellation}</li>
              {property.policies.houseRules.map(r => (
                <li key={r}>• {r}</li>
              ))}
            </ul>
          </div>

          {/* ---------- DESKTOP BOOKING ---------- */}
          <aside className="hidden lg:block sticky top-24 h-fit">
            <BookingCard
              property={property}
              arrival={arrival}
              departure={departure}
              guests={guests}
              setArrival={setArrival}
              setDeparture={setDeparture}
              setGuests={setGuests}
              pricing={pricing}
            />
          </aside>
        </section>
      </main>

      {/* ================= MOBILE STICKY ================= */}
      <MobileStickyBar pricing={pricing} />
    </>
  );
}

/* ================= BOOKING CARD ================= */

function BookingCard({
  property,
  arrival,
  departure,
  guests,
  setArrival,
  setDeparture,
  setGuests,
  pricing,
}: any) {
  function todayISO() {
    return new Date().toISOString().split("T")[0];
  }

  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm">
      <p className="text-sm text-slate-500 mb-1">Price</p>

      {pricing ? (
        <>
          <div className="flex items-baseline gap-3">
            {pricing.originalTotal > pricing.discountedTotal && (
              <span className="text-sm text-slate-400 line-through">
                ₹{formatINR(pricing.originalTotal)}
              </span>
            )}

            <span className="text-2xl font-semibold">
              ₹{formatINR(pricing.discountedTotal)}
            </span>
          </div>

          <p className="text-sm text-slate-500">
            ₹{formatINR(pricing.perNight)} / night · {pricing.nights} nights
          </p>

          {pricing.savings > 0 && (
            <p className="text-xs text-green-600 mt-1">
              You save ₹{formatINR(pricing.savings)}
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-slate-500">
          Select dates to see price
        </p>
      )}

      <div className="mt-4 space-y-3">
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
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <input
          type="date"
          min={arrival || todayISO()}
          value={departure}
          onChange={e => setDeparture(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <div className="flex justify-between items-center border rounded-lg px-3 py-2">
          <span className="text-sm">Guests</span>
          <div className="flex gap-3 items-center">
            <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
            <span>{guests}</span>
            <button onClick={() => setGuests(guests + 1)}>+</button>
          </div>
        </div>
      </div>

      <a
        href={`/book/select?location=${property.location}&arrival=${arrival}&departure=${departure}&guests=${guests}`}
        className="block mt-6 w-full text-center bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600"
      >
        Reserve
      </a>

      <p className="mt-3 text-xs text-center text-slate-500">
        You won’t be charged yet
      </p>
    </div>
  );
}

/* ================= MOBILE STICKY ================= */

function MobileStickyBar({ pricing }: any) {
  if (!pricing) return null;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t p-4 flex justify-between items-center">
      <div>
        <p className="text-sm font-semibold">
          ₹{formatINR(pricing.discountedTotal)}
        </p>
        <p className="text-xs text-slate-500">
          ₹{formatINR(pricing.perNight)} / night
        </p>
      </div>

      <a
        href="#"
        className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium"
      >
        Reserve
      </a>
    </div>
  );
}
