"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";

export function ClientProviders({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
