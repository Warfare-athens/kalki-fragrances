"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { useCart } from "@/lib/cart";
import { products, type Product } from "@/lib/products";

export function ProductPage({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const galleryImages = [
    product.img,
    ...products.filter((p) => p.slug !== product.slug && !p.isCombo).map((p) => p.img)
  ].slice(0, 5);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const sizePrices = {
    "30ml": 399,
    "50ml": 799,
    "100ml": 1199,
  };

  const isCombo = !!product.isCombo;
  const [selectedSize, setSelectedSize] = useState<"30ml" | "50ml" | "100ml">("50ml");

  const currentPrice = isCombo ? product.price : sizePrices[selectedSize];
  const currentPriceLabel = isCombo ? product.priceLabel : `₹${currentPrice}`;
  const currentSizeLabel = isCombo
    ? product.slug.includes("discovery")
      ? "10ml x 5"
      : "2 x 30 ml"
    : selectedSize;

  const handleAdd = () => {
    const itemSlug = isCombo ? product.slug : `${product.slug}-${selectedSize}`;
    const itemName = isCombo ? product.name : `${product.name} (${selectedSize})`;
    add(
      {
        slug: itemSlug,
        name: itemName,
        price: currentPrice,
        priceLabel: currentPriceLabel,
        img: product.img,
        size: currentSizeLabel,
      },
      1,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen pb-24 md:pb-0">
      <SiteNav />

      <div className="max-w-7xl mx-auto px-6 pt-4 md:pt-6">
        <Link
          href="/#collection"
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5] shrink-0" />
          <span>Back to the Collection</span>
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-4 pb-12 lg:pt-6 lg:pb-20 flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex flex-col lg:flex-row gap-4 animate-fade-up shrink-0">
          {/* Side Thumbnails Column */}
          <div className="flex flex-row lg:flex-col gap-2 order-2 lg:order-1 justify-center lg:justify-start lg:w-[60px] shrink-0">
            {galleryImages.map((imgSrc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px] relative rounded-sm overflow-hidden outline outline-1 -outline-offset-1 outline-black/5 transition-all ${
                  activeIndex === idx
                    ? "ring-2 ring-foreground opacity-100 scale-95"
                    : "opacity-60 hover:opacity-90"
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={imgSrc}
                  alt={`${product.name} gallery image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 pointer-events-none ${activeIndex === idx ? "" : product.tint}`} />
              </button>
            ))}
          </div>

          {/* Main Hero Image Container */}
          <div className="w-full aspect-square lg:w-[500px] lg:h-[500px] relative rounded-sm overflow-hidden bg-stone-100 order-1 lg:order-2 shrink-0">
            <Image
              src={galleryImages[activeIndex]}
              alt={`${product.name} main view`}
              fill
              priority
              className="object-cover transition-all duration-700 ease-in-out outline outline-1 -outline-offset-1 outline-black/5"
            />
            <div className={`absolute inset-0 pointer-events-none ${product.tint}`} />
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur px-4 py-2 font-mono text-[10px] uppercase tracking-widest z-10">
              {product.number} - {product.label}
            </div>
          </div>
        </div>

        <div className="flex-1 animate-fade-up [animation-delay:120ms]">
          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-6 block">
            {product.number} - Extrait de Parfum
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl italic leading-[0.95] mb-4">
            {product.name}
          </h1>
          <p className="font-display text-base md:text-lg italic text-muted-foreground mb-8">
            {product.tagline}
          </p>
          <p className="text-[13px] leading-relaxed text-foreground/80 mb-10">
            {product.description}
          </p>

          <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-border">
            <span className="font-mono text-xl">{currentPriceLabel}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {currentSizeLabel} - Extrait
            </span>
          </div>

          {!isCombo && (
            <div className="mb-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent mb-3 block">
                Select Size
              </span>
              <div className="flex gap-2">
                {(["30ml", "50ml", "100ml"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`flex-1 py-3 border font-mono text-[11px] transition-all rounded-sm cursor-pointer ${
                      selectedSize === sz
                        ? "border-foreground bg-foreground text-background font-semibold"
                        : "border-border hover:border-foreground/50 text-foreground/80"
                    }`}
                  >
                    {sz} - ₹{sizePrices[sz]}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <button
              onClick={handleAdd}
              className="w-full py-5 bg-foreground text-background font-sans text-[11px] uppercase tracking-[0.25em] hover:bg-accent transition-colors font-medium cursor-pointer"
            >
              {added ? "Added to vessel" : "Add to cart"}
            </button>
          </div>

          <Link
            href="/cart"
            className="block text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors py-2 mb-8"
          >
            View cart
          </Link>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border mb-10">
            {product.pyramid.map((t) => (
              <div key={t.tier} className="bg-background p-4">
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent mb-2">
                  {t.tier}
                </dt>
                <dd className="font-display text-sm italic leading-snug">{t.line}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 font-display italic text-sm text-muted-foreground border-l-2 border-accent/40 pl-4">
            {product.inspiration}
          </p>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="font-display text-3xl italic">Continue the ritual</h2>
            <Link
              href="/#collection"
              className="font-mono text-[10px] uppercase tracking-widest hover:text-accent transition-colors"
            >
              All five
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {related.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group bg-background p-4">
                <div className="relative mb-4 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={500}
                    height={700}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className={`absolute inset-0 pointer-events-none ${p.tint}`} />
                </div>
                <h3 className="font-display text-xs sm:text-xs md:text-[13px] lg:text-[13px] xl:text-sm mb-1 min-h-[32px] md:min-h-[36px] xl:min-h-[40px] line-clamp-2 leading-snug tracking-tight">{p.name}</h3>
                <span className="font-mono text-[11px] text-muted-foreground">{p.priceLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
