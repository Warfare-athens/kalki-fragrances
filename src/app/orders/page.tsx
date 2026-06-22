"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { formatINR } from "@/lib/cart";

type OrderItem = {
  name: string;
  qty: number;
  price: number;
  img: string;
  priceLabel: string;
  size?: string;
};

type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Blended" | "Macerated" | "Dispatched";
  shippingDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
};

const sampleSteps = [
  ["Blended", "Your chosen extrait is compounded in small batches."],
  ["Macerated", "The concentrate rests before bottling for fuller projection."],
  ["Dispatched", "Tracking and courier details will live here after database wiring."],
];

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = "Your Orders - Kalki Fragrances";

    // Load URL params
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTargetId(params.get("id"));

      // Load orders from localStorage
      try {
        const raw = localStorage.getItem("kalki.orders.v1");
        if (raw) {
          setOrders(JSON.parse(raw));
        }
      } catch (e) {
        console.error("Failed to load orders from localStorage", e);
      }
      setHydrated(true);
    }
  }, []);

  // Find the order that was just placed or is selected
  const activeOrder = orders.find((o) => o.id === targetId) || orders[0];

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
        <SiteNav />
        <main className="max-w-5xl mx-auto px-6 py-20 flex items-center justify-center">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Opening ledger...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <SiteNav />
      <main className="max-w-5xl mx-auto px-6 py-20">
        {targetId && activeOrder && (
          <div className="mb-12 border border-accent/30 bg-accent/5 p-6 animate-fade-up">
            <span className="font-mono text-[9px] text-accent uppercase tracking-[0.25em] mb-2 block">
              Success
            </span>
            <p className="font-display text-2xl italic mb-2">
              Your ritual has begun. Attar commission is confirmed.
            </p>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Order <span className="font-mono font-medium text-foreground">{activeOrder.id}</span> has
              been received. The master distiller is preparing your maceration notes.
            </p>
          </div>
        )}

        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">The Ledger</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3 italic">Your orders</h1>

        {orders.length === 0 ? (
          <div className="mt-12 grid lg:grid-cols-[1fr_320px] gap-10">
            <section className="border border-border p-10">
              <p className="font-display text-2xl italic">No rituals yet.</p>
              <p className="mt-3 text-sm text-muted-foreground max-w-prose leading-relaxed">
                When you commission an attar, it will appear here with tracking, blending notes, and
                aftercare.
              </p>
              <Link
                href="/#collection"
                className="inline-block mt-8 px-6 py-3 bg-foreground text-background font-sans text-[10px] uppercase tracking-[0.25em] hover:bg-accent transition-colors"
              >
                Browse the Signature Five
              </Link>
            </section>
            <aside className="bg-stone-50 p-8">
              <h2 className="font-display text-2xl italic mb-6">Order cadence</h2>
              <ol className="space-y-6">
                {sampleSteps.map(([title, copy]) => (
                  <li key={title} className="border-l border-accent/40 pl-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      {title}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{copy}</p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        ) : (
          <div className="mt-12 grid lg:grid-cols-[1fr_340px] gap-12">
            <section className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setTargetId(order.id)}
                  className={`border p-6 transition-all cursor-pointer ${
                    activeOrder.id === order.id
                      ? "border-foreground bg-stone-50/20"
                      : "border-border hover:border-foreground/50"
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-baseline gap-2 mb-6 pb-4 border-b border-border">
                    <div>
                      <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-1">
                        Commission ID
                      </span>
                      <span className="font-mono text-sm font-semibold">{order.id}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
                        Date Placed
                      </span>
                      <span className="text-[12px]">{order.date}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
                        Status
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider bg-accent/10 text-accent px-2 py-0.5 font-semibold">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-6">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex gap-4 items-center">
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={48}
                          height={64}
                          className="w-12 h-16 object-cover border border-border"
                        />
                        <div className="flex-1">
                          <p className="font-display italic text-[15px]">{item.name}</p>
                          <p className="font-mono text-[9px] text-muted-foreground">
                            {item.size || "50ml"} &times; {item.qty}
                          </p>
                        </div>
                        <span className="font-mono text-xs">{formatINR(item.price * item.qty)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-baseline pt-4 border-t border-border/60">
                    <span className="font-display text-sm italic">Grand Total</span>
                    <span className="font-mono text-base font-semibold">{formatINR(order.total)}</span>
                  </div>
                </div>
              ))}
            </section>

            <aside className="bg-stone-50 p-8 h-fit lg:sticky lg:top-28">
              <span className="font-mono text-[9px] text-accent uppercase tracking-widest block mb-1">
                Active Tracking
              </span>
              <h2 className="font-display text-2xl italic mb-6">Cadence - {activeOrder.id}</h2>
              <ol className="space-y-6">
                {sampleSteps.map(([title, copy]) => {
                  const isActive =
                    title === "Blended" ||
                    (activeOrder.status === "Macerated" && title === "Macerated") ||
                    (activeOrder.status === "Dispatched" && (title === "Macerated" || title === "Dispatched"));

                  return (
                    <li
                      key={title}
                      className={`border-l-2 pl-5 transition-colors ${
                        isActive ? "border-accent" : "border-border/60"
                      }`}
                    >
                      <p
                        className={`font-mono text-[10px] uppercase tracking-widest ${
                          isActive ? "text-accent font-semibold" : "text-muted-foreground"
                        }`}
                      >
                        {title}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{copy}</p>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 pt-6 border-t border-border/80">
                <h3 className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-3">
                  Shipping Vessel Address
                </h3>
                <address className="not-italic text-xs text-muted-foreground leading-relaxed">
                  <p className="font-medium text-foreground">{activeOrder.shippingDetails.name}</p>
                  <p>{activeOrder.shippingDetails.address}</p>
                  <p>
                    {activeOrder.shippingDetails.city}, {activeOrder.shippingDetails.postalCode}
                  </p>
                  <p>{activeOrder.shippingDetails.state}</p>
                  <p className="mt-2 font-mono text-[10px]">{activeOrder.shippingDetails.phone}</p>
                </address>
              </div>
            </aside>
          </div>
        )}

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 w-fit"
          >
            <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5] shrink-0" />
            <span>Return to the altar</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
