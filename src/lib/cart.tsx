"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  priceLabel: string;
  price: number;
  img: string;
  qty: number;
  size?: string;
};

export type CouponDetails = {
  type: "percent" | "fixed";
  value: number;
  label: string;
};

export const COUPONS: Record<string, CouponDetails> = {
  "KALKI10": { type: "percent", value: 10, label: "10% Off" },
  "DEVOTEE20": { type: "percent", value: 20, label: "20% Off" },
  "WELCOME500": { type: "fixed", value: 500, label: "₹500 Off" },
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  couponCode: string | null;
  couponLabel: string | null;
  discount: number;
  applyCoupon: (code: string) => { success: boolean; error?: string };
  removeCoupon: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kalki.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      
      const savedCoupon = localStorage.getItem("kalki.coupon.v1");
      if (savedCoupon && COUPONS[savedCoupon.toUpperCase()]) {
        setCouponCode(savedCoupon.toUpperCase());
      }
    } catch {
      /* Ignore invalid saved states. */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Ignore storage failures. */
    }
  }, [items, hydrated]);

  const applyCoupon = useCallback((code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (COUPONS[cleanCode]) {
      setCouponCode(cleanCode);
      try {
        localStorage.setItem("kalki.coupon.v1", cleanCode);
      } catch {}
      return { success: true };
    }
    return { success: false, error: "Invalid code" };
  }, []);

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
    try {
      localStorage.removeItem("kalki.coupon.v1");
    } catch {}
  }, []);

  const add = useCallback<CartContextValue["add"]>((item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);
      if (existing) {
        return prev.map((p) => (p.slug === item.slug ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => p.slug !== slug)
        : prev.map((p) => (p.slug === slug ? { ...p, qty } : p)),
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setCouponCode(null);
    try {
      localStorage.removeItem("kalki.coupon.v1");
    } catch {}
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);

    const coupon = couponCode ? COUPONS[couponCode] : null;
    const discount = coupon
      ? coupon.type === "percent"
        ? Math.round(subtotal * (coupon.value / 100))
        : coupon.value
      : 0;

    return {
      items,
      count,
      subtotal,
      couponCode,
      couponLabel: coupon?.label || null,
      discount,
      applyCoupon,
      removeCoupon,
      add,
      remove,
      setQty,
      clear,
    };
  }, [items, couponCode, applyCoupon, removeCoupon, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
