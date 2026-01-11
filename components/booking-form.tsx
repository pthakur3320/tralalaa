"use client";

import { useForm } from "react-hook-form";
import { sendNotification, BookingLead } from "@/lib/notify";

type Props = {
  context?: Partial<BookingLead>;
};

export default function BookingForm({ context }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<BookingLead>({
    defaultValues: context,
  });

  async function onSubmit(data: BookingLead) {
    await sendNotification({
      ...context,
      ...data,
    });
  }

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-xl border bg-green-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-green-700">
          Request received
        </h3>
        <p className="mt-2 text-sm text-green-700">
          We’ll get back to you shortly with availability details.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <input
        {...register("name", { required: true })}
        placeholder="Full name"
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />

      <input
        {...register("email")}
        type="email"
        placeholder="Email address (Optional)"
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />

      <input
        {...register("phone", { required: true })}
        placeholder="Phone"
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />

      <textarea
        {...register("message")}
        placeholder="Anything you'd like us to know?"
        rows={3}
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />

      <button
        disabled={isSubmitting}
        className="w-full rounded-lg bg-red-500 py-3 text-white font-medium hover:bg-red-600 disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send booking request"}
      </button>

      <p className="text-xs text-center text-slate-500">
        No payment required. We’ll confirm availability first.
      </p>
    </form>
  );
}
