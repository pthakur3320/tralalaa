"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PropertyCard({ property }: { property: any }) {
  const images = [
    property.images.cover,
    ...(property.images.gallery ?? []),
  ];

  const [index, setIndex] = useState(0);

  const startingPrice =
    property.pricing?.[0]?.pricePerDay ?? null;

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));
  }

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
      {/* ================= IMAGE CAROUSEL ================= */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={images[index]}
          alt={`${property.name} image ${index + 1}`}
          fill
          className="object-cover transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* ARROWS (desktop hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="
                absolute left-2 top-1/2 -translate-y-1/2
                hidden group-hover:flex
                h-8 w-8 items-center justify-center
                rounded-full bg-white/90 text-black
                shadow hover:scale-105 transition
              "
            >
              ‹
            </button>

            <button
              onClick={next}
              aria-label="Next image"
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                hidden group-hover:flex
                h-8 w-8 items-center justify-center
                rounded-full bg-white/90 text-black
                shadow hover:scale-105 transition
              "
            >
              ›
            </button>
          </>
        )}

        {/* DOTS */}
        {images.length > 1 && (
          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition
                  ${i === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-slate-900 leading-snug">
          {property.name}
        </h3>

        {/* LOCATION */}
        <p className="mt-1 text-sm text-slate-600 flex items-center gap-1">
          📍 {property.location}
        </p>

        {/* AMENITIES (lightweight, Airbnb style) */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {property.amenities.slice(0, 3).map((a: string) => (
            <span
              key={a}
              className="rounded-full bg-slate-100 px-3 py-1"
            >
              {a}
            </span>
          ))}
        </div>

        {/* PRICE */}
        {startingPrice && (
          <div className="mt-4 flex items-baseline gap-1">
          <p className="text-sm text-slate-600 mt-3">
            Starting from{" "}
            <span className="text-base font-semibold text-slate-900">
              ₹{startingPrice.toLocaleString()}
            </span>
            <span className="text-sm text-slate-500">/ night</span></p>
          </div>
        )}

        {/* FOOTER */}
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
