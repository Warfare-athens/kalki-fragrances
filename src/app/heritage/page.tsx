import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import heritageImg from "@/assets/heritage.png";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Our Heritage - Kalki Fragrances",
  description: "Reviving authentic Indian perfumery through traditional Kannauj deg bhapka craftsmanship.",
};

export default function Page() {
  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col pb-24 md:pb-0">
      <SiteNav />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 relative flex justify-center animate-fade-up">
            <div className="relative w-full max-w-[500px] aspect-[3/4]">
              <Image
                src={heritageImg}
                alt="Traditional copper deg bhapka vessels in Kannauj under sunlight beams"
                priority
                fill
                className="object-cover rounded-sm outline outline-1 -outline-offset-1 outline-black/5"
              />
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl animate-fade-up [animation-delay:120ms]">
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-6 block">
              Heritage & Craftsmanship
            </span>
            <h1 className="font-display text-5xl lg:text-6xl italic leading-tight mb-8">
              Reviving authentic Indian perfumery
            </h1>
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
              Kalki is built on the vision of reviving authentic Indian perfumery through real craftsmanship.
              Our fragrances are inspired by the traditional deg bhapka method of Kannauj, ensuring purity,
              depth, and richness without adulteration. We focus on creating long-lasting, high-quality perfumes
              that combine heritage techniques with modern elegance, allowing people to experience true,
              original fragrances.
            </p>
            <div className="h-px w-16 bg-accent/30 mb-8" />
            <p className="font-display text-2xl md:text-3xl italic text-foreground tracking-wide mb-12">
              everyday luxury
            </p>
            <Link
              href="/#collection"
              className="inline-block px-8 py-4 bg-foreground text-background font-sans text-[10px] uppercase tracking-[0.25em] hover:bg-accent transition-colors w-fit"
            >
              Explore the Collection
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
