import type { Metadata } from "next";
import "@/styles.css";
import { ClientProviders } from "@/components/ClientProviders";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: {
    default: "Kalki Fragrances - The Art of Fragrance",
    template: "%s - Kalki Fragrances",
  },
  description:
    "Sacred extractions for the modern devotee. Five signature extraits inspired by Indian ritual, brass-pressed florals, and Mysore sandalwood.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
          <MobileBottomNav />
        </ClientProviders>
      </body>
    </html>
  );
}
