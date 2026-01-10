import { Property, PricingTier } from "@/data/properties";

/* ================= DATE UTILS ================= */

export function daysBetween(start?: string, end?: string) {
  if (!start || !end) return 0;

  const s = new Date(start);
  const e = new Date(end);

  if (isNaN(s.getTime()) || isNaN(e.getTime())) return 0;

  return Math.max(
    0,
    Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
  );
}

/* ================= PRICING HELPERS ================= */

function selectPricingTier(pricing: PricingTier[], nights: number) {
  return pricing
    .slice()
    .sort((a, b) => b.minNights - a.minNights)
    .find(t => nights >= t.minNights);
}

/* ================= MAIN PRICING ================= */

export function calculatePrice(
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

  /* ---------- ORIGINAL (NO DISCOUNT) ---------- */
  const originalSubtotal =
    property.pricing[0].pricePerDay * nights * roomsRequired;

  const originalGst = Math.round(
    (originalSubtotal * tier.gstPercent) / 100
  );

  const originalTotal = originalSubtotal + originalGst;

  /* ---------- DISCOUNTED (TIER BASED) ---------- */
  const discountedSubtotal =
    tier.pricePerDay * nights * roomsRequired;

  const discountedGst = Math.round(
    (discountedSubtotal * tier.gstPercent) / 100
  );

  const discountedTotal = discountedSubtotal + discountedGst;

  const savings = Math.max(
    0,
    originalTotal - discountedTotal
  );

  const perNight = Math.round(
    discountedTotal / nights
  );

  return {
    roomsRequired,
    beds,
    nights,
    originalTotal,
    discountedTotal,
    savings,
    perNight,
  };
}
