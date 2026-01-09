import BookingForm from "@/components/booking-form";

export const metadata = {
  title: "Booking Request | Remote Work Stays",
};

export default function BookPage() {
  return (
    <section className="form-wrapper">
      <h1>Booking Request</h1>
      <BookingForm />
    </section>
  );
}
