"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import heroShakti from "@/assets/hero-shakti.jpg";
import story from "@/assets/story.jpg";
import heritageImg from "@/assets/heritage.png";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";

export function HomePage() {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleAdd = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const p = products.find((x) => x.slug === slug);
    if (!p) return;
    add({
      slug: p.slug,
      name: p.name,
      price: p.price,
      priceLabel: p.priceLabel,
      img: p.img,
    });
    setJustAdded(slug);
    setTimeout(() => setJustAdded((s) => (s === slug ? null : s)), 1500);
  };

  return (
    <div className="bg-background text-foreground font-sans pb-24 md:pb-0">
      <SiteNav />

      <section className="relative px-3 sm:px-6 pt-6 pb-16 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 z-10 order-2 lg:order-1 animate-fade-up">
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] mb-6 block">
              Ritual Inhalation
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 italic text-balance">
              Crushing temple flowers between brass plates.
            </h1>
            <p className="font-sans text-muted-foreground max-w-sm mb-10 leading-relaxed">
              Sacred extractions for the modern devotee. Five scents formulated to linger like
              incense smoke in a limestone hall.
            </p>
            <Link
              href="/#collection"
              className="inline-block px-8 py-4 bg-foreground text-background font-sans text-[10px] uppercase tracking-[0.25em] hover:bg-accent transition-colors"
            >
              Discover the Essence
            </Link>
          </div>
          <div className="lg:col-span-7 relative order-1 lg:order-2 animate-fade-up [animation-delay:200ms] flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] aspect-square">
              <Link href="/product/shakti-wildfire" className="block w-full h-full">
                <Image
                  src={heroShakti}
                  alt="Shakti Wildfire extrait on sandstone plinth"
                  priority
                  className="w-full h-full object-cover rounded-sm outline outline-1 -outline-offset-1 outline-black/5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="collection" className="px-3 sm:px-6 py-24 border-t border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="font-display text-4xl md:text-5xl italic">The Signature Five</h2>
            <p className="font-mono text-[11px] text-muted-foreground max-w-xs uppercase tracking-tight italic">
              Concentrated Extrait de Parfum - 50ml
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-px bg-transparent sm:bg-border no-scrollbar">
            {products.filter((p) => !p.isCombo).map((p) => (
              <div
                key={p.slug}
                className="bg-background p-3 sm:p-4 group transition-colors shrink-0 w-[76vw] sm:w-auto snap-start sm:shrink block"
              >
                <Link href={`/product/${p.slug}`} className="cursor-pointer block">
                  <div className="relative mb-8 overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={800}
                      height={1024}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div
                      className={`absolute inset-0 pointer-events-none transition-colors ${p.tint}`}
                    />
                    <span className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-widest text-foreground/40 bg-background/70 backdrop-blur px-2 py-0.5">
                      {p.label}
                    </span>
                  </div>
                  <h3 className="font-display text-xl mb-1">{p.name}</h3>
                  <p className="font-sans text-[12px] text-muted-foreground mb-4">{p.notes}</p>
                </Link>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[12px]">{p.priceLabel}</span>
                  <button
                    onClick={handleAdd(p.slug)}
                    className="text-[10px] uppercase tracking-widest font-semibold border-b border-transparent group-hover:border-foreground transition-all pb-px cursor-pointer"
                  >
                    {justAdded === p.slug ? "Added" : "+ Add"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="combos" className="px-3 sm:px-6 py-24 border-t border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="font-display text-4xl md:text-5xl italic">Atelier Combos & Sets</h2>
            <p className="font-mono text-[11px] text-muted-foreground max-w-xs uppercase tracking-tight italic">
              Curated pairings & travel vials
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-px bg-transparent sm:bg-border no-scrollbar">
            {products.filter((p) => p.isCombo).map((p) => (
              <div
                key={p.slug}
                className="bg-background p-3 sm:p-4 group transition-colors shrink-0 w-[76vw] sm:w-auto snap-start sm:shrink block"
              >
                <Link href={`/product/${p.slug}`} className="cursor-pointer block">
                  <div className="relative mb-8 overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={800}
                      height={1024}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div
                      className={`absolute inset-0 pointer-events-none transition-colors ${p.tint}`}
                    />
                    <span className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-widest text-foreground/40 bg-background/70 backdrop-blur px-2 py-0.5">
                      {p.label}
                    </span>
                  </div>
                  <h3 className="font-display text-xs sm:text-xs md:text-[13px] lg:text-[13px] xl:text-sm mb-1 min-h-[32px] md:min-h-[36px] xl:min-h-[40px] line-clamp-2 leading-snug tracking-tight">{p.name}</h3>
                  <p className="font-sans text-[12px] text-muted-foreground mb-4">{p.notes}</p>
                </Link>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[12px]">{p.priceLabel}</span>
                  <button
                    onClick={handleAdd(p.slug)}
                    className="text-[10px] uppercase tracking-widest font-semibold border-b border-transparent group-hover:border-foreground transition-all pb-px cursor-pointer"
                  >
                    {justAdded === p.slug ? "Added" : "+ Add"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-stone-50">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl mb-4 italic">
            The Architecture of Olfaction
          </h2>
          <p className="font-sans text-sm text-muted-foreground">
            A three-tiered narrative of temple mornings.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            [
              "Top Notes",
              "Marigold Petals & Bitter Orange",
              "The immediate strike of a bell; sharp, floral, and fleeting.",
            ],
            [
              "Heart Notes",
              "Warm Brass & Sacred Ash",
              "The lingering resonance; metallic, dusty, and deeply familiar.",
            ],
            [
              "Base Notes",
              "Mysore Sandalwood & Amber",
              "The foundational shadow; creamy, woodsy, and eternal.",
            ],
          ].map(([tier, line, copy]) => (
            <div key={tier} className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-accent mb-6 uppercase tracking-[0.25em]">
                {tier}
              </span>
              <div className="h-px w-20 bg-accent/30 mb-8" />
              <p className="font-display text-2xl text-center italic">{line}</p>
              <p className="mt-4 text-[12px] text-center text-muted-foreground leading-relaxed px-4">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="heritage" className="px-3 sm:px-6 py-24 border-t border-border scroll-mt-24 bg-background">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[3/4]">
              <Image
                src={heritageImg}
                alt="Traditional copper deg bhapka vessels in Kannauj under sunlight beams"
                className="w-full h-full object-cover rounded-sm outline outline-1 -outline-offset-1 outline-black/5"
              />
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl">
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-6 block">
              Heritage & Craftsmanship
            </span>
            <h2 className="font-display text-4xl md:text-5xl italic leading-tight mb-8">
              Reviving authentic Indian perfumery
            </h2>
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
              Kalki is built on the vision of reviving authentic Indian perfumery through real craftsmanship.
              Our fragrances are inspired by the traditional deg bhapka method of Kannauj, ensuring purity,
              depth, and richness without adulteration. We focus on creating long-lasting, high-quality perfumes
              that combine heritage techniques with modern elegance, allowing people to experience true,
              original fragrances.
            </p>
            <div className="h-px w-16 bg-accent/30 mb-8" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="font-display text-2xl md:text-3xl italic text-foreground tracking-wide">
                everyday luxury
              </p>
              <Link
                href="/heritage"
                className="font-mono text-[10px] uppercase tracking-widest border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors w-fit"
              >
                Learn our heritage &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="px-6 py-32 flex flex-col items-center scroll-mt-24">
        <div className="max-w-xl text-center">
          <blockquote className="font-display text-3xl md:text-4xl italic leading-tight mb-12 text-balance">
            "We do not just create scents; we preserve the tactile memory of a ritual. The way brass
            feels against a palm, the way a crushed bloom releases its ghost."
          </blockquote>
          <Image
            src={story}
            alt="Hands holding marigold and jasmine in a brass bowl"
            className="w-full aspect-[21/9] object-cover mb-12 outline outline-1 -outline-offset-1 outline-black/5"
          />
          <Link
            href="/account"
            className="inline-block font-mono text-[10px] uppercase tracking-widest border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
          >
            Join the atelier
          </Link>
        </div>
      </section>

      <section className="px-6 py-24 bg-stone-50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.25em] mb-12 block text-center">
            Devotee Notes
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              [
                "A scent that feels like walking through a temple courtyard at dawn. Visceral and unforgettable.",
                "Anjali R., Mumbai",
              ],
              [
                "Sudarshan Halo has become my daily ritual. The sandalwood is the highest quality I have ever worn.",
                "Marc L., Paris",
              ],
              [
                "Stays on the skin for twelve hours. It evolves from sharp citrus to a deep, earthy warmth.",
                "Vikram S., Delhi",
              ],
            ].map(([q, who]) => (
              <div key={who} className="pb-8 md:pb-0 md:px-10 first:md:pl-0 last:md:pr-0">
                <p className="font-display text-xl italic mb-6 leading-snug">"{q}"</p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {who}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
