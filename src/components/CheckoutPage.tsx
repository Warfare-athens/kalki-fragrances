"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { formatINR, useCart } from "@/lib/cart";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export function CheckoutPage() {
  const { items, subtotal, clear, couponCode, discount } = useCart();
  const router = useRouter();
  const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 250;
  const total = Math.max(0, subtotal - discount + shipping);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("Uttar Pradesh");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <SiteNav />
      <main className="max-w-6xl mx-auto px-6 pt-4 pb-16 md:py-16 grid lg:grid-cols-[1fr_380px] gap-12">
        <section>
          <h1 className="font-display text-5xl md:text-6xl italic">Checkout</h1>
          <form
            className="mt-8 md:mt-12 grid gap-10"
            onSubmit={(event) => {
              event.preventDefault();
              
              const target = event.currentTarget;
              const fullName = (target.elements.namedItem("fullName") as HTMLInputElement)?.value || "";
              const email = (target.elements.namedItem("email") as HTMLInputElement)?.value || "";
              const phone = (target.elements.namedItem("phone") as HTMLInputElement)?.value || "";
              const address1 = (target.elements.namedItem("address1") as HTMLInputElement)?.value || "";
              const address2 = (target.elements.namedItem("address2") as HTMLInputElement)?.value || "";
              const city = (target.elements.namedItem("city") as HTMLInputElement)?.value || "";
              const postalCode = (target.elements.namedItem("postalCode") as HTMLInputElement)?.value || "";
              const state = (target.elements.namedItem("state") as HTMLInputElement)?.value || "Uttar Pradesh";

              const orderId = "KLK-" + Math.floor(100000 + Math.random() * 900000);
              const newOrder = {
                id: orderId,
                date: new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                }),
                items: items.map(it => ({
                  name: it.name,
                  qty: it.qty,
                  price: it.price,
                  img: it.img,
                  priceLabel: it.priceLabel,
                  size: it.size
                })),
                total: total,
                status: "Blended",
                shippingDetails: {
                  name: fullName,
                  email,
                  phone,
                  address: address2 ? `${address1}, ${address2}` : address1,
                  city,
                  postalCode,
                  state
                }
              };

              try {
                const existingOrdersRaw = localStorage.getItem("kalki.orders.v1");
                const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
                localStorage.setItem("kalki.orders.v1", JSON.stringify([newOrder, ...existingOrders]));
              } catch (e) {
                console.error("Failed to save order to localStorage", e);
              }

              clear();
              router.push(`/orders?id=${orderId}`);
            }}
          >
            <fieldset className="min-w-0 grid gap-6">
              <legend className="font-display text-2xl md:text-3xl italic mb-4">Who shall we anoint?</legend>
              
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-2 text-sm outline-none transition-colors rounded-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-2 text-sm outline-none transition-colors rounded-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Phone <span className="text-accent">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-2 text-sm outline-none transition-colors rounded-none"
                />
              </div>
            </fieldset>

            <fieldset className="min-w-0 grid gap-6">
              <legend className="font-display text-2xl md:text-3xl italic mb-4">Where shall it travel?</legend>
              
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Address Line 1 <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="address1"
                  required
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-2 text-sm outline-none transition-colors rounded-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="address2"
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-2 text-sm outline-none transition-colors rounded-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  City <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-2 text-sm outline-none transition-colors rounded-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full relative" ref={dropdownRef}>
                <label className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  State <span className="text-accent">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full bg-transparent border-b border-border py-2.5 text-sm flex items-center justify-between cursor-pointer focus:border-foreground outline-none text-left rounded-none px-0"
                >
                  <span className={selectedState ? "text-foreground font-medium" : "text-muted-foreground"}>
                    {selectedState || "Select State"}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <input type="hidden" name="state" value={selectedState || ""} readOnly />
                
                {isOpen && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto border border-border bg-background shadow-lg custom-select-list divide-y divide-stone-100">
                    {indianStates.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => {
                          setSelectedState(st);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-sans tracking-wide transition-colors flex items-center justify-between cursor-pointer ${
                          st === selectedState
                            ? "bg-stone-100 text-accent font-medium"
                            : "hover:bg-stone-50 text-foreground"
                        }`}
                      >
                        <span>{st}</span>
                        {st === selectedState && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Pincode <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="postalCode"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  required
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-2 text-sm outline-none transition-colors rounded-none font-mono tracking-[0.25em]"
                />
              </div>
            </fieldset>

            <fieldset className="min-w-0 grid gap-3">
              <legend className="font-display text-2xl italic mb-2">Payment</legend>
              <label className="flex items-center justify-between border border-foreground p-4 text-sm">
                <span>Card / UPI placeholder</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Offline
                </span>
              </label>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Payment processing is intentionally not connected yet. This shell is ready for
                gateway and Drizzle-backed order persistence later.
              </p>
            </fieldset>

            <button
              disabled={items.length === 0}
              className="px-8 py-4 bg-foreground text-background font-sans text-[10px] uppercase tracking-[0.25em] hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Place order
            </button>
          </form>
        </section>

        <aside className="bg-stone-50 p-8 h-fit lg:sticky lg:top-28">
          <h2 className="font-display text-2xl italic mb-6">Order summary</h2>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-display text-xl italic mb-5">Your vessel is empty.</p>
              <Link
                href="/#collection"
                className="font-mono text-[10px] uppercase tracking-widest border-b border-foreground flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5] shrink-0" />
                <span>Return to collection</span>
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-5 mb-8">
                {items.map((item) => (
                  <li key={item.slug} className="flex gap-4">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={72}
                      height={96}
                      className="h-24 w-18 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-display italic text-lg">{item.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Qty {item.qty} {item.size && `• ${item.size}`}
                      </p>
                    </div>
                    <span className="font-mono text-xs">{formatINR(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <dl className="space-y-3 border-t border-border pt-6 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-mono">{formatINR(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-accent">
                    <dt>Discount ({couponCode})</dt>
                    <dd className="font-mono">-{formatINR(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-mono">{shipping ? formatINR(shipping) : "Complimentary"}</dd>
                </div>
                <div className="flex justify-between pt-4 text-lg">
                  <dt className="font-display italic">Total</dt>
                  <dd className="font-mono">{formatINR(total)}</dd>
                </div>
              </dl>
            </>
          )}
        </aside>
      </main>
      <Footer />
    </div>
  );
}
