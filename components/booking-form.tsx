"use client";

import { useForm } from "react-hook-form";
import { sendNotification } from "@/lib/notify";

export default function BookingForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit(sendNotification)}
      className="form"
    >
      <input {...register("name")} placeholder="Name" required />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input {...register("location")} placeholder="Preferred Location" />
      <textarea {...register("message")} placeholder="Message" />
      <button>Submit</button>
    </form>
  );
}
