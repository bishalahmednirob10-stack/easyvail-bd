"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collections/namaji", label: "Namaji" },
  { href: "/collections/gola", label: "Gola" },
  { href: "/collections/iqra", label: "Iqra" },
];

export default function Header() {
  const { itemCount, setCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#fdfbf7]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            className="p-2 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="EasyVail BD logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm uppercase tracking-widest text-stone-600 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-stone-900">
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-700 text-xs text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-stone-200 py-3 text-sm uppercase tracking-widest text-stone-600 lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 transition hover:text-stone-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
