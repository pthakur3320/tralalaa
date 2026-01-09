import { properties } from "@/data/properties";
import { notFound } from "next/navigation";

export default function PropertyDetails({
  params,
}: {
  params: { slug: string };
}) {
  const property = properties.find((p) => p.slug === params.slug);
  if (!property) return notFound();

  return (
    <section className="detail">
      <h1>{property.name}</h1>
      <p>{property.location}</p>
      <ul>
        {property.amenities.map(a => (
    <li key={a}>{a}</li>
  ))}
      </ul>
    </section>
  );
}
