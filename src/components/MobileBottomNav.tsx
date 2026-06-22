"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ShoppingBag, User, Package } from "lucide-react";
import { useCart } from "@/lib/cart";

type Item = {
  href: "/" | "/#collection" | "/cart" | "/orders" | "/account";
  label: string;
  icon: typeof Home;
  badge?: boolean;
};

const items: Item[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#collection", label: "Shop", icon: Compass },
  { href: "/cart", label: "Cart", icon: ShoppingBag, badge: true },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/account", label: "Account", icon: User },
];

export function MobileBottomNav() {
  const { count } = useCart();
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const Icon = it.icon;
          const active = it.href === "/" ? pathname === "/" : pathname === it.href;

          return (
            <li key={it.label}>
              <Link
                href={it.href}
                className={`relative flex flex-col items-center justify-center gap-1 py-2.5 hover:text-foreground transition-colors ${
                  active ? "text-accent" : "text-muted-foreground"
                }`}
              >
                <span className="relative">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  {it.badge && count > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-foreground text-background text-[9px] font-sans font-bold flex items-center justify-center leading-none">
                      {count}
                    </span>
                  )}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
