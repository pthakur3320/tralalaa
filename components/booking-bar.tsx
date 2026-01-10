"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { properties } from "@/data/properties";

/**
 * Returns today's date in YYYY-MM-DD format
 * Used to prevent past date selection
 */
function todayISO() {
  return new Date().toISOString().split("T")[0];
}

/**
 * BookingBar
 *
 * Purpose:
 * - Primary conversion component on homepage
 * - Collects minimal intent (location + dates)
 * - Redirects user into booking flow
 */
export default function BookingBar() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      location: "",
      arrival: "",
      departure: "",
    },
  });

  const router = useRouter();

  const arrival = watch("arrival");
  const location = watch("location");

  /**
   * LOCATION LIST (single source of truth)
   * Prevents hardcoded values and mismatch
   */
  const locations = useMemo(() => {
    return Array.from(
      new Set(properties.map((p) => p.location))
    );
  }, []);

  /**
   * DATE SAFETY LOGIC
   * - Departure must always be AFTER arrival
   */
  useEffect(() => {
    if (!arrival) return;

    const departure = watch("departure");
    if (departure && departure <= arrival) {
      setValue("departure", "");
    }
  }, [arrival, setValue, watch]);

  /**
   * FORM SUBMIT
   * Redirects user into booking flow
   */
  function onSubmit(data: any) {
    const params = new URLSearchParams({
      location: data.location,
      arrival: data.arrival,
      departure: data.departure,
    });

    router.push(`/book/select?${params.toString()}`);
  }

  const isDisabled = !formState.isValid;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      role="search"
      aria-label="Search available stays"
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
        <label className="sr-only">Location</label>
        <select
          {...register("location", { required: true })}
          className="booking-input"
        >
          <option value="" disabled>
            Select location
          </option>

          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* ARRIVAL */}
      <div className="flex-1">
        <label className="sr-only">Arrival date</label>
        <input
          {...register("arrival", { required: true })}
          type="date"
          min={todayISO()}
          className="booking-input"
        />
      </div>

      {/* DEPARTURE */}
      <div className="flex-1">
        <label className="sr-only">Departure date</label>
        <input
          {...register("departure", { required: true })}
          type="date"
          min={arrival || todayISO()}
          className="booking-input"
        />
      </div>

      {/* CTA */}
      <div className="flex">
        <button
          type="submit"
          disabled={isDisabled}
          className="
            h-12
            whitespace-nowrap
            rounded-xl
            px-8
            text-sm font-medium
            text-white
            transition
            bg-slate-900
            hover:bg-slate-800
            disabled:bg-slate-400
            disabled:cursor-not-allowed
          "
        >
          Check availability
        </button>
      </div>
    </form>
  );
}
