"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteNav() {
  const { count } = useCart();
  const pathname = usePathname();
  const hideAnnouncement = pathname?.startsWith("/cart") || pathname?.startsWith("/checkout");

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
      <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 flex items-center justify-between relative min-h-[64px]">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground hidden md:block">
            Varanasi / Grasse
          </div>
          
          <Link
            href="/"
            className="font-display font-light text-2xl md:text-[28px] tracking-tight absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            Kalki <span className="italic font-light">Fragrances</span>
          </Link>
          
          <div className="flex justify-end gap-6 md:gap-8 font-sans text-[11px] uppercase tracking-[0.2em] font-medium ml-auto z-10 items-center">
            <Link
              href="/#collection"
              className="hover:text-accent transition-colors hidden sm:inline"
            >
              Collection
            </Link>
            <Link href="/heritage" className="hover:text-accent transition-colors hidden sm:inline">
              Heritage
            </Link>
            <Link href="/#story" className="hover:text-accent transition-colors hidden sm:inline">
              Story
            </Link>
            <Link href="/cart" className="hover:text-accent transition-colors relative flex items-center justify-center p-1" aria-label="Cart">
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-foreground text-background font-sans text-[8px] h-3.5 min-w-[14px] px-1 rounded-full flex items-center justify-center font-bold leading-none">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
