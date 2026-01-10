import Script from "next/script";
import { properties } from "@/data/properties";
import { notFound } from "next/navigation";

export default function PropertyDetails({ params }: { params: { slug: string } }) {
  const property = properties.find(p => p.slug === params.slug);
  if (!property) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": property.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressCountry": "IN"
    },
    "amenityFeature": property.amenities.map(a => ({
      "@type": "LocationFeatureSpecification",
      "name": a
    }))
  };

  return (
    <>
      <Script
        id="hotel-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="detail">
        <h1>{property.name}</h1>
        <p>{property.location}</p>
      </section>
    </>
  );
}
