"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function BookingBar() {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      location: "",
      arrival: "",
      departure: "",
    },
  });

  const router = useRouter();
  const arrival = watch("arrival");

  /* 🔒 DATE SAFETY LOGIC */
  useEffect(() => {
    if (!arrival) return;

    const dep = watch("departure");
    if (dep && dep <= arrival) {
      setValue("departure", "");
    }
  }, [arrival, setValue, watch]);

  function onSubmit(data: any) {
    const params = new URLSearchParams({
      location: data.location,
      arrival: data.arrival,
      departure: data.departure,
    });

    router.push(`/book/select?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        mx-auto
        flex w-full max-w-5xl
        flex-col md:flex-row
        items-stretch
        gap-3
        rounded-2xl
        bg-white/90 backdrop-blur
        p-4
        shadow-xl
      "
    >
      {/* LOCATION */}
      <div className="flex-1">
        <select
          {...register("location")}
          className="booking-input"
          required
        >
          <option value="" disabled>
            Select location
          </option>
          <option value="Jibhi">Jibhi</option>
          <option value="Tirthan">Tirthan</option>
        </select>
      </div>

      {/* ARRIVAL */}
      <div className="flex-1">
        <input
          {...register("arrival")}
          type="date"
          min={todayISO()}
          className="booking-input"
          required
        />
      </div>

      {/* DEPARTURE */}
      <div className="flex-1">
        <input
          {...register("departure")}
          type="date"
          min={arrival || todayISO()}
          className="booking-input"
          required
        />
      </div>

      {/* CTA */}
      <div className="flex">
        <button
          type="submit"
          className="
            h-12
            whitespace-nowrap
            rounded-xl
            bg-slate-900
            px-8
            text-sm font-medium
            text-white
            hover:bg-slate-800
            transition
          "
        >
          Book Stay
        </button>
      </div>
    </form>
  );
}
