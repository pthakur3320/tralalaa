"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * PropertyCard
 * Used on:
 * - Homepage
 * - Locations page
 *
 * Purpose:
 * - Quick discovery
 * - Trust building
 * - SEO-friendly internal linking
 */
export default function PropertyCard({ property }: { property: any }) {
  /**
   * PRICE NORMALIZATION
   * We show ONLY a starting price here.
   * Detailed pricing stays inside booking flow.
   *
   * This avoids:
   * - Different prices on different pages
   * - User confusion
   */
  const startingPrice =
    property.pricing?.[0]?.pricePerDay ?? null;

  return (
    <Link
      href={`/locations/${property.slug}`}
      aria-label={`View details for ${property.name} in ${property.location}`}
      className="
        group block overflow-hidden rounded-xl
        border bg-white
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-slate-900
      "
    >
      {/* IMAGE */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={`${property.name} in ${property.location}`}
          fill
          priority={false}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* IMAGE OVERLAY (SEO safe, UX polish) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-slate-900 leading-snug">
          {property.name}
        </h3>

        {/* LOCATION */}
        <p className="mt-1 text-sm text-slate-600 flex items-center gap-1">
          📍 {property.location}
        </p>

        {/* AMENITIES */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {property.wifi && (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              ⚡ High-speed WiFi
            </span>
          )}

          {property.power && (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              🔌 Power Backup
            </span>
          )}
        </div>

        {/* PRICE */}
        {startingPrice && (
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-sm text-slate-500">From</span>
            <span className="text-base font-semibold text-slate-900">
              ₹{startingPrice.toLocaleString()}
            </span>
            <span className="text-sm text-slate-500">/ night</span>
          </div>
        )}

        {/* TRUST + CTA */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            ✓ No booking fees
          </p>

          <span className="text-sm font-medium text-slate-900 group-hover:underline">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
