"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reconciliation", label: "Reconciliation" },
  { href: "/manager", label: "Manager" },
  { href: "/analytics", label: "Analytics" },
];

export default function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#131313] flex items-center justify-between px-6">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="text-2xl font-black text-primary tracking-tighter font-headline"
      >
        ST6
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-headline tracking-tighter uppercase font-bold transition-colors duration-200 ${
              pathname === link.href
                ? "text-primary-container"
                : "text-on-surface opacity-80 hover:text-primary-container"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-primary text-on-primary px-5 py-2 font-headline font-bold tracking-tighter uppercase active:scale-95 transition-transform">
          LET&apos;S TALK
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#131313] border-b border-surface-container-highest flex flex-col px-6 py-4 gap-4 md:hidden z-50">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-headline tracking-tighter uppercase font-bold transition-colors ${
                pathname === link.href
                  ? "text-primary-container"
                  : "text-on-surface opacity-80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
