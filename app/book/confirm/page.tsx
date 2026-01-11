"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { properties } from "@/data/properties";
import { calculatePrice, daysBetween } from "@/lib/pricing";
import BookingForm from "@/components/booking-form";
import { formatINR } from "@/lib/format";

export default function BookingConfirmPage() {
  const params = useSearchParams();

  const slug = params.get("property") ?? "";
  const arrival = params.get("arrival") ?? "";
  const departure = params.get("departure") ?? "";
  const guests = Number(params.get("guests") ?? 1);

  const property = properties.find(p => p.slug === slug);
  if (!property) return null;

  const nights = daysBetween(arrival, departure);
  const pricing = calculatePrice(property, nights, guests);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* HEADER */}
      <header className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Final step
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          You’re almost booked
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Review your stay details and send a booking request
        </p>
      </header>

      {/* STEP INDICATOR (outside header to avoid hydration issues) */}
      <StepIndicator />

      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 items-start">
        {/* BOOKING SUMMARY */}
        <div className="rounded-2xl border bg-white p-6 lg:p-8">
          <h2 className="text-lg font-semibold mb-5">
            Booking summary
          </h2>

          {/* PROPERTY */}
          <div className="flex gap-4 mb-5">
            <div className="relative h-20 w-28 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={property.images.cover}
                alt={property.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-900 leading-snug">
                {property.name}
              </p>
              <p className="text-sm text-slate-500">
                {property.location}, Himachal Pradesh
              </p>
            </div>
          </div>

          {/* DATES + EDIT */}
          <div className="rounded-lg bg-slate-50 p-4 text-sm mb-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500">Dates</p>
                <p className="font-medium">
                  {arrival} → {departure}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {guests} guests · {nights} nights
                </p>
              </div>

              <a
                href={`/book/select?location=${property.location}&arrival=${arrival}&departure=${departure}&guests=${guests}`}
                className="text-xs font-medium text-slate-900 underline hover:text-slate-700"
              >
                Edit
              </a>
            </div>
          </div>

          {/* PRICE */}
          {pricing && (
            <div className="border-t pt-5">
              <p className="text-xs text-slate-500 mb-1">
                Starting from
              </p>

              <div className="flex items-baseline gap-3">
                {pricing.savings > 0 && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{formatINR(pricing.originalTotal)}
                  </span>
                )}

                <span className="text-2xl font-semibold text-slate-900">
                  ₹{formatINR(pricing.discountedTotal)}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                ₹{formatINR(pricing.perNight)} / night · taxes included
              </p>

              {pricing.savings > 0 && (
                <p className="mt-1 text-xs text-green-600">
                  You save ₹{formatINR(pricing.savings)} on this stay
                </p>
              )}
            </div>
          )}

          {/* TRUST */}
          <div className="mt-6 text-xs text-slate-500 space-y-1">
            <p>✓ No payment required now</p>
            <p>✓ Availability confirmed by host</p>
            <p>✓ Response within 24 hours</p>
          </div>
        </div>

        {/* FORM */}
        <div className="rounded-2xl border bg-white p-6 lg:p-8">
          <h2 className="text-lg font-semibold mb-4">
            Your details
          </h2>

          <BookingForm
            context={{
              propertySlug: property.slug,
              propertyName: property.name,
              location: property.location,
              arrival,
              departure,
              guests,
              nights,
            }}
          />
        </div>
      </section>
    </main>
  );
}

/* ================= STEP INDICATOR ================= */

function StepIndicator() {
  return (
    <div className="flex justify-center items-center gap-4">
      <Step number={1} label="Search" />
      <Divider />
      <Step number={2} label="Select" />
      <Divider />
      <Step number={3} label="Request" active />
    </div>
  );
}

function Step({
  number,
  label,
  active,
}: {
  number: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
          ${
            active
              ? "bg-slate-900 text-white"
              : "border border-slate-300 text-slate-400"
          }`}
      >
        {number}
      </div>
      <span
        className={`text-[11px] ${
          active ? "text-slate-900 font-medium" : "text-slate-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="w-10 h-px bg-slate-300" />;
}
