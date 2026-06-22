"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";

export function SiteNav() {
  const { count } = useCart();
  const pathname = usePathname();
  const hideAnnouncement = pathname?.startsWith("/cart") || pathname?.startsWith("/checkout");
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <>
      {!hideAnnouncement && (
        <div className="bg-foreground text-background text-[10px] font-mono uppercase tracking-[0.3em] py-2 overflow-hidden whitespace-nowrap relative flex justify-start md:justify-center">
          <div className="md:hidden flex select-none w-max">
            <div className="animate-marquee shrink-0 whitespace-nowrap">
              Live Now - Complimentary Shipping on Orders Above ₹2,000 &nbsp;&nbsp;&bull;&nbsp;&nbsp; Live Now - Complimentary Shipping on Orders Above ₹2,000 &nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;
            </div>
            <div className="animate-marquee shrink-0 whitespace-nowrap">
              Live Now - Complimentary Shipping on Orders Above ₹2,000 &nbsp;&nbsp;&bull;&nbsp;&nbsp; Live Now - Complimentary Shipping on Orders Above ₹2,000 &nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div className="hidden md:block text-center">
            Live Now - Complimentary Shipping on Orders Above ₹2,000
          </div>
        </div>
      )}
      <nav 
        className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border"
        onMouseLeave={() => setIsShopOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 flex items-center justify-between relative min-h-[64px]">
          {/* Left-hand side: Shop section with hover dropdown */}
          <div 
            className="z-10 hidden md:block"
            onMouseEnter={() => setIsShopOpen(true)}
          >
            <button className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground font-bold hover:text-accent transition-colors flex items-center gap-1 cursor-pointer">
              <span>Shop</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isShopOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
          
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-10 md:h-12 w-auto whitespace-nowrap"
          >
            <Logo className="h-10 md:h-12 w-auto" />
          </Link>
          
          <div className="flex justify-end gap-4 md:gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground ml-auto z-10 items-center">
            <Link
              href="/#collection"
              className={`hover:text-foreground transition-colors hidden sm:inline ${
                pathname === "/" ? "text-accent font-medium" : ""
              }`}
            >
              Collection
            </Link>
            <Link
              href="/heritage"
              className={`hover:text-foreground transition-colors hidden sm:inline ${
                pathname === "/heritage" ? "text-accent font-medium" : ""
              }`}
            >
              Heritage
            </Link>
            <Link
              href="/#story"
              className="hover:text-foreground transition-colors hidden sm:inline"
            >
              Story
            </Link>
            
            {/* Account Icon next to Cart Icon */}
            <Link
              href="/account"
              className={`hover:text-foreground transition-colors relative hidden md:flex items-center justify-center p-1 ${
                pathname === "/account" ? "text-accent" : ""
              }`}
              aria-label="Account"
            >
              <User className="h-5 w-5 stroke-[1.5]" />
            </Link>

            <Link
              href="/cart"
              className={`hover:text-foreground transition-colors relative flex items-center justify-center p-1 ${
                pathname === "/cart" ? "text-accent" : ""
              }`}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-foreground text-background font-sans text-[8px] h-3.5 min-w-[14px] px-1 rounded-full flex items-center justify-center font-bold leading-none">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Shop Dropdown Menu */}
        {isShopOpen && (
          <div 
            className="absolute top-full left-0 right-0 border-b border-border bg-background/95 backdrop-blur-md shadow-xl w-full z-40 animate-fade-up border-t"
            onMouseEnter={() => setIsShopOpen(true)}
          >
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {/* Column 1: Offers & Combos (Left) */}
              <div>
                <h5 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-6 font-semibold">
                  Offers & Sets
                </h5>
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block mb-2">Combos</span>
                    <ul className="space-y-2.5 font-sans text-xs">
                      <li>
                        <Link href="/product/panch-tatva-discovery-set" className="hover:text-accent transition-colors block font-medium">
                          Panch Tatva Discovery Set <span className="text-muted-foreground font-normal">(5 &times; 10ml)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/shakti-ganga-combo" className="hover:text-accent transition-colors block font-medium">
                          Shakti & Ganga Combo <span className="text-muted-foreground font-normal">(2 &times; 30ml)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/sudarshan-nandi-combo" className="hover:text-accent transition-colors block font-medium">
                          Sudarshan & Nandi Combo <span className="text-muted-foreground font-normal">(2 &times; 30ml)</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block mb-2">Active Offers</span>
                    <ul className="space-y-2.5 font-sans text-xs">
                      <li>
                        <div className="flex justify-between items-baseline">
                          <span className="font-mono text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 font-semibold">WELCOME500</span>
                          <span className="text-[11px] text-muted-foreground">Flat ₹500 Off</span>
                        </div>
                      </li>
                      <li>
                        <div className="flex justify-between items-baseline">
                          <span className="font-mono text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 font-semibold">DEVOTEE20</span>
                          <span className="text-[11px] text-muted-foreground">20% Off above ₹4k</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Column 2: Signature Five (Center) */}
              <div>
                <h5 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-6 font-semibold">
                  The Signature Five
                </h5>
                <ul className="space-y-3 font-sans text-xs">
                  <li>
                    <Link href="/product/shakti-wildfire" className="hover:text-accent transition-colors block font-medium">
                      No. 01 Shakti Wildfire <span className="text-muted-foreground font-normal ml-1">· Saffron & Marigold</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/product/ganga-nectar" className="hover:text-accent transition-colors block font-medium">
                      No. 02 Ganga Nectar <span className="text-muted-foreground font-normal ml-1">· Cool Water & Lotus</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/product/sudarshan-halo" className="hover:text-accent transition-colors block font-medium">
                      No. 03 Sudarshan Halo <span className="text-muted-foreground font-normal ml-1">· Sandalwood & Turmeric</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/product/maduban-bloom" className="hover:text-accent transition-colors block font-medium">
                      No. 04 Maduban Bloom <span className="text-muted-foreground font-normal ml-1">· Jasmine & Tuberose</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/product/nandi-velar" className="hover:text-accent transition-colors block font-medium">
                      No. 05 Nandi Velar <span className="text-muted-foreground font-normal ml-1">· Damp Earth & Patchouli</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Atelier Story (Right) */}
              <div>
                <h5 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-6 font-semibold">
                  Atelier Story
                </h5>
                <ul className="space-y-3 font-sans text-xs mb-6">
                  <li>
                    <Link href="/heritage" className="hover:text-accent transition-colors block font-medium">
                      Our Heritage & Craftsmanship
                    </Link>
                  </li>
                  <li>
                    <Link href="/#story" className="hover:text-accent transition-colors block font-medium">
                      Varanasi Atelier Story
                    </Link>
                  </li>
                </ul>
                <p className="font-display text-[15px] italic text-muted-foreground leading-relaxed border-t border-border pt-4">
                  "We do not just create scents; we preserve the tactile memory of a ritual."
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
