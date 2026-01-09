"use client";

import Link from "next/link";

export default function MobileMenu({ close }: { close: () => void }) {
  return (
    <div className="mobile-menu">
      <Link href="/vision" onClick={close}>Our Vision</Link>
      <Link href="/locations" onClick={close}>Locations</Link>
      <Link href="/partner" onClick={close}>Partner</Link>
      <Link href="/contact" onClick={close}>Contact</Link>
    </div>
  );
}
