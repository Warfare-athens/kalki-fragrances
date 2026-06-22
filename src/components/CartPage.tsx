"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronDown } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { formatINR, useCart } from "@/lib/cart";

export function CartPage() {
  const {
    items,
    subtotal,
    setQty,
    remove,
    clear,
    couponCode,
    couponLabel,
    discount,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 250;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col pb-20 md:pb-0">
      <SiteNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-2 md:pt-12 md:pb-6 w-full flex justify-between items-end">
        <div>
          <Link
            href="/#collection"
            className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5 w-fit mb-1.5 md:mb-4"
          >
            <ArrowLeft className="h-3 w-3 stroke-[2.5] shrink-0" />
            <span>Back</span>
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl italic">Your cart</h1>
        </div>
        <Link
          href="/"
          className="p-1 hover:text-accent transition-colors text-muted-foreground self-end mb-1 md:mb-3"
          aria-label="Close cart"
        >
          <X className="h-5 w-5 stroke-[1.5]" />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="text-center max-w-sm">
            <p className="font-display italic text-2xl mb-6 leading-snug">
              The vessel is empty. The altar awaits its offering.
            </p>
            <Link
              href="/#collection"
              className="inline-block px-8 py-4 bg-foreground text-background font-sans text-[10px] uppercase tracking-[0.25em] hover:bg-accent transition-colors"
            >
              Explore the Signature Five
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 md:pb-24 w-full grid lg:grid-cols-[1fr_360px] gap-6 md:gap-12">
          <ul className="divide-y divide-border border-y border-border">
            {items.map((it) => (
              <li key={it.slug} className="py-3 sm:py-6 flex gap-3.5 sm:gap-5">
                <Link href={`/product/${it.slug.replace(/-(30ml|50ml|100ml)$/, "")}`} className="shrink-0">
                  <Image
                    src={it.img}
                    alt={it.name}
                    width={180}
                    height={240}
                    className="w-16 h-20 sm:w-24 sm:h-32 object-cover rounded-sm outline outline-1 -outline-offset-1 outline-black/5"
                  />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <Link
                      href={`/product/${it.slug.replace(/-(30ml|50ml|100ml)$/, "")}`}
                      className="font-display text-sm sm:text-lg md:text-xl italic hover:text-accent transition-colors leading-snug"
                    >
                      {it.name}
                    </Link>
                    <span className="font-mono text-xs sm:text-sm whitespace-nowrap font-medium">
                      {formatINR(it.price * it.qty)}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-muted-foreground mb-auto">
                    {it.size || "50ml"} - Extrait - {it.priceLabel} each
                  </span>
                  <div className="flex justify-between items-center mt-2 sm:mt-4">
                    <div className="flex items-center border border-foreground/30">
                      <button
                        aria-label="Decrease"
                        onClick={() => setQty(it.slug, it.qty - 1)}
                        className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-foreground hover:text-background transition-colors text-xs sm:text-sm flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-5 sm:w-8 text-center font-mono text-[10px] sm:text-xs">{it.qty}</span>
                      <button
                        aria-label="Increase"
                        onClick={() => setQty(it.slug, it.qty + 1)}
                        className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-foreground hover:text-background transition-colors text-xs sm:text-sm flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(it.slug)}
                      className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 lg:sticky lg:top-28 h-fit">
            {/* Coupon Code Section */}
            <div className="border border-border bg-stone-50 divide-y divide-border rounded-sm">
              <div className="p-3 sm:p-4">
                {!couponCode ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!couponInput.trim()) return;
                      const res = applyCoupon(couponInput);
                      if (res.success) {
                        setCouponInput("");
                        setCouponError("");
                      } else {
                        setCouponError(res.error || "Invalid coupon");
                      }
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      className="flex-1 bg-transparent px-2 py-1 text-xs outline-none uppercase font-mono tracking-wider placeholder-stone-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1 border border-foreground/30 hover:bg-foreground hover:text-background transition-colors font-mono text-[9px] uppercase tracking-wider cursor-pointer font-medium"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex justify-between items-center bg-stone-100 px-3 py-1.5 text-xs font-mono">
                    <span className="text-muted-foreground uppercase text-[9px] tracking-wide">
                      Active: <strong className="text-foreground">{couponCode}</strong> ({couponLabel})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-accent hover:text-foreground font-mono text-[9px] uppercase tracking-widest font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-[10px] text-red-500 mt-1.5 font-mono">{couponError}</p>
                )}
              </div>

              {/* Available Coupons */}
              <div className="p-3 sm:p-4 flex justify-between items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground">KALKI10</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-sans leading-relaxed">
                    10% off on all signature fragrances.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const res = applyCoupon("KALKI10");
                    if (res.success) {
                      setCouponError("");
                    }
                  }}
                  disabled={couponCode === "KALKI10"}
                  className="px-4 py-1 border border-foreground/30 hover:bg-foreground hover:text-background transition-colors font-mono text-[9px] uppercase tracking-wider disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground cursor-pointer font-medium shrink-0"
                >
                  {couponCode === "KALKI10" ? "Applied" : "Apply"}
                </button>
              </div>

              <div className="p-3 sm:p-4 flex justify-between items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground">DEVOTEE20</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-sans leading-relaxed">
                    Exclusive 20% off for brand devotees.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const res = applyCoupon("DEVOTEE20");
                    if (res.success) {
                      setCouponError("");
                    }
                  }}
                  disabled={couponCode === "DEVOTEE20"}
                  className="px-4 py-1 border border-foreground/30 hover:bg-foreground hover:text-background transition-colors font-mono text-[9px] uppercase tracking-wider disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground cursor-pointer font-medium shrink-0"
                >
                  {couponCode === "DEVOTEE20" ? "Applied" : "Apply"}
                </button>
              </div>

              <div className="p-3 sm:p-4 flex justify-between items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground">WELCOME500</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-sans leading-relaxed">
                    Flat ₹500 off on your current order.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const res = applyCoupon("WELCOME500");
                    if (res.success) {
                      setCouponError("");
                    }
                  }}
                  disabled={couponCode === "WELCOME500"}
                  className="px-4 py-1 border border-foreground/30 hover:bg-foreground hover:text-background transition-colors font-mono text-[9px] uppercase tracking-wider disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground cursor-pointer font-medium shrink-0"
                >
                  {couponCode === "WELCOME500" ? "Applied" : "Apply"}
                </button>
              </div>
            </div>

            {/* Billing & Checkout Section */}
            <aside className="bg-stone-50 p-4 sm:p-6 md:p-8">
              <div className="pb-4">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex justify-between items-center w-full font-display text-base sm:text-lg italic text-left cursor-pointer group"
                >
                  <span className="flex items-center gap-1.5 group-hover:text-accent transition-colors">
                    Total
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 shrink-0 text-muted-foreground group-hover:text-accent ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                  <span className="font-mono text-lg sm:text-xl">{formatINR(total)}</span>
                </button>

                {expanded && (
                  <dl className="mt-3 space-y-2.5 text-xs sm:text-[13px] border-t border-border/50 pt-3 animate-fade-up">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Subtotal</dt>
                      <dd className="font-mono">{formatINR(subtotal)}</dd>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-accent font-semibold">
                        <dt>Discount ({couponCode})</dt>
                        <dd className="font-mono">-{formatINR(discount)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Shipping</dt>
                      <dd className="font-mono">
                        {shipping === 0 ? "Complimentary" : formatINR(shipping)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <dt>Other duties & taxes</dt>
                      <dd className="font-mono">₹0</dd>
                    </div>
                  </dl>
                )}
              </div>

              <Link
                href="/checkout"
                className="block text-center w-full py-3 md:py-4 bg-foreground text-background font-sans text-[10px] uppercase tracking-[0.25em] hover:bg-accent transition-colors mb-2 border-t border-border pt-4 mt-2"
              >
                Proceed to checkout
              </Link>

              <button
                onClick={clear}
                className="w-full mt-3 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors border-t border-border/30 pt-3"
              >
                Empty the vessel
              </button>
            </aside>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
