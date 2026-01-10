export function calculateBookingPrice({
  pricePerRoomPerDay,
  rooms,
  nights,
  gst,
}: {
  pricePerRoomPerDay: number;
  rooms: number;
  nights: number;
  gst: number;
}) {
  const subtotal = pricePerRoomPerDay * rooms * nights;

  let discountRate = 0;
  if (nights >= 31) discountRate = 0.2;
  else if (nights >= 7) discountRate = 0.1;

  const discountAmount = Math.round(subtotal * discountRate);
  const discountedSubtotal = subtotal - discountAmount;
  const gstAmount = Math.round((discountedSubtotal * gst) / 100);
  const finalTotal = discountedSubtotal + gstAmount;

  return {
    subtotal,
    discountRate,
    discountAmount,
    discountedSubtotal,
    gstAmount,
    finalTotal,
  };
}
