"use client";

import Link from "next/link";
import Image from "next/image";

export default function PropertyCard({ property }: any) {
  return (
    <Link
      href={`/locations/${property.slug}`}
      className="
        group block overflow-hidden rounded-xl border bg-white
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">{property.name}</h3>

        <p className="mt-2 text-slate-600 flex items-center gap-1">
          📍 {property.location}
        </p>

        <div className="mt-4 flex gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            ⚡ {property.wifi}
          </span>
          {property.power && (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              🔌 Power Backup
            </span>
          )}
        </div>

        <div className="mt-6 text-sm font-medium text-slate-900">
          View details →
        </div>
      </div>
    </Link>
  );
}
