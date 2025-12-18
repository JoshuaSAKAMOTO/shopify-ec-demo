"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import SearchModal from "./SearchModal";

const topLinks = [
  { label: "INDIA", href: "/" },
  { label: "CONTACT US", href: "/contact" },
  { label: "VIRTUAL APPOINTMENT", href: "/appointment" },
];

const navLinks = [
  { label: "CRYSTALS", href: "/collections/crystals" },
  { label: "MEDITATION CUSHIONS", href: "/collections/meditation-cushions" },
  { label: "WELLNESS PRODUCT", href: "/collections/wellness" },
  { label: "MEDITATION PRODUCT", href: "/collections/meditation" },
  { label: "PLANTS & HERBS", href: "/collections/plants-herbs" },
  { label: "GET INSPIRED", href: "/inspiration" },
  { label: "YOGA", href: "/collections/yoga" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, openCart } = useCart();

  return (
    <header className="w-full bg-background">
      {/* Top Bar */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left Links */}
          <div className="hidden md:flex items-center gap-6">
            {topLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs tracking-wide text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo (centered on mobile) */}
          <Link href="/" className="md:absolute md:left-1/2 md:-translate-x-1/2">
            <h1 className="font-heading text-2xl md:text-3xl text-accent tracking-wide">
              Mediation Craft
            </h1>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button aria-label="Wishlist" className="p-1 hover:text-accent transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            {/* Account */}
            <button aria-label="Account" className="p-1 hover:text-accent transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>

            {/* Cart */}
            <button
              aria-label="Cart"
              className="p-1 hover:text-accent transition-colors relative"
              onClick={openCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {cart && cart.totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              aria-label="Menu"
              className="p-1 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="hidden md:block border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <ul className="flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm tracking-wide text-foreground hover:text-accent transition-colors link-underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Search */}
            <li>
              <button
                aria-label="Search"
                className="p-1 hover:text-accent transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-border">
          <div className="px-4 py-4 space-y-4">
            {/* Top Links */}
            <div className="flex flex-col gap-2 pb-4 border-b border-border">
              {topLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs tracking-wide text-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Nav Links */}
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm tracking-wide text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
