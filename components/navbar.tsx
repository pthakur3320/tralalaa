"use client";

import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          RemoteStays
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          ☰
        </button>

        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/vision">Vision</Link>
          <Link href="/locations">Locations</Link>
          <Link href="/partner">Partner</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

      {open && <MobileMenu close={() => setOpen(false)} />}
    </header>
  );
}
