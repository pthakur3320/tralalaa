import { properties } from "@/data/properties";
import PropertyCard from "@/components/property-card";

export const metadata = {
  title: "Locations | Remote Work Stays"
};

export default function Locations() {
  return (
    <section className="grid">
      {properties.map(p => (
        <PropertyCard key={p.slug} property={p} />
      ))}
    </section>
  );
}
