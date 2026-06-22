"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { useCart } from "@/lib/cart";
import { products, type Product } from "@/lib/products";

const productStories: Record<string, { title: string; content: string }> = {
  "shakti-wildfire": {
    title: "The Hearth of the Altar",
    content: "In the temples of Varanasi, morning begins before the sun. The sound of heavy iron locks sliding open is followed by the first strike of the temple bell. Priests collect marigold flowers that were gathered the night before, pressing them to release their sweet, sap-like juice. Shakti Wildfire captures this tactile ritual: the dry warmth of saffron threads warming in a palm, the rich floral crush of fresh marigold, and the deep, resinous smoke of sacred fires rising to the vaulted limestone ceilings."
  },
  "ganga-nectar": {
    title: "The Path of Still Water",
    content: "At the edge of the river, time slows to a halt. Ganga Nectar is an olfactive portrait of water running over cool stone under the first grey rays of morning. It smells of the rising mist off the water, wet river clay, and white lotus blossoms drifting past the ghats. It is clean, mineral, and calm, anchored by the ancient, smoky depth of vetiver roots that have spent centuries holding the riverbanks together."
  },
  "sudarshan-halo": {
    title: "The Radiance of Sandalwood",
    content: "Formulated to capture the pure essence of light. Sudarshan Halo is built around old-growth Mysore Sandalwood—creamy, warm, and everlasting. We cut the wood with fresh turmeric root and sweet beeswax to create a glowing skin scent that feels warm, radiant, and protective. It is a fragrance that does not shout; it lingers close to the skin like a golden aura."
  },
  "maduban-bloom": {
    title: "The Midnight Orchard",
    content: "Inspired by the mythical Maduban grove, where night-blooming flowers release their heavy, narcotic scents under the cover of darkness. Maduban Bloom is a pairing of wild jasmine sambac and creamy tuberose absolute. It smells of warm night air, crushed green mango leaves, and a drop of dark, unheated forest honey. Sensual, floral, and deep."
  },
  "nandi-velar": {
    title: "The Devoted Earth",
    content: "Named in honor of Nandi, the patient bull who sits at the entrance of Shiva temples. Nandi Velar is grounded, earthly, and still. It opens with the visceral scent of rain falling on hot earth—petrichor—then settles into aged patchouli, dry cedar wood, and a dark shadow of smoked leather and oud. It is a fragrance of quiet strength and eternal patience."
  }
};

const defaultStory = {
  title: "The Atelier Blends",
  content: "A curated collection of our signature extraits. Designed to let you experience the full ritualistic journey of Kalki Fragrances—from the fire of the temple hearths to the cool, quiet currents of the sacred river. Wear them individually, or layer them together to create your own private sanctuary."
};

const mockReviews: Record<string, { rating: number; title: string; content: string; author: string; location: string; date: string }[]> = {
  "shakti-wildfire": [
    { rating: 5, title: "An absolute masterpiece", content: "The saffron is sharp and warm, and the marigold is incredibly realistic. It develops into a beautiful, smoky wood base that stays on my skin for over 10 hours.", author: "Rajesh K.", location: "Delhi", date: "June 12, 2026" },
    { rating: 5, title: "Visceral and evocative", content: "Smells exactly like morning temple prayers. The birch tar gives it a distinct smoky character that gets compliments every time I wear it.", author: "Priya M.", location: "Bangalore", date: "May 28, 2026" },
    { rating: 4, title: "Deep and complex", content: "Very rich. It starts strong with the marigold, but the dry down is where the magic happens. A must-have for incense lovers.", author: "Vikram S.", location: "Mumbai", date: "May 15, 2026" }
  ],
  "ganga-nectar": [
    { rating: 5, title: "Incredibly fresh and unique", content: "This is not your typical aquatic scent. It is cool, mineral, and smells of wet stones and quiet lotus. Extremely calming and clean.", author: "Marc L.", location: "Paris", date: "June 18, 2026" },
    { rating: 5, title: "Like morning mist", content: "Smells like standing on the riverbanks at dawn. The vetiver is clean and earthy, not dirty. Perfect for hot weather.", author: "Amit S.", location: "Kolkata", date: "June 03, 2026" }
  ],
  "sudarshan-halo": [
    { rating: 5, title: "The gold standard of sandalwood", content: "The Mysore Sandalwood here is exceptionally high quality. The touch of turmeric root adds a golden warmth that is addictive.", author: "Anjali R.", location: "Mumbai", date: "June 20, 2026" },
    { rating: 5, title: "Exceptional skin scent", content: "Stays close to the skin but has incredible longevity. It smells warm, creamy, and sacred. Truly beautiful.", author: "Devendra P.", location: "Varanasi", date: "May 30, 2026" }
  ],
  "maduban-bloom": [
    { rating: 5, title: "Intense, beautiful white floral", content: "The jasmine and tuberose are perfectly blended. It has a beautiful honey-like sweetness that is rich but not cloying.", author: "Meera J.", location: "Gurgaon", date: "June 19, 2026" },
    { rating: 5, title: "Smells like a midnight garden", content: "Absolutely gorgeous. Highly sensual and lingering. It smells of real tuberose absolute.", author: "Sophie T.", location: "London", date: "June 10, 2026" }
  ],
  "nandi-velar": [
    { rating: 5, title: "Visceral damp earth scent", content: "The petrichor note is highly authentic. It smells like first rain on parched summer soil, drying down to dry cedar and smooth leather. Grounded and masculine.", author: "Karan B.", location: "Pune", date: "June 14, 2026" },
    { rating: 5, title: "Patience made liquid", content: "Incredible wood and patchouli notes. Very earthy and smoky. Sits close to the skin and stays all day.", author: "Arjun M.", location: "Hyderabad", date: "June 01, 2026" }
  ]
};

const defaultReviews = [
  { rating: 5, title: "Olfactory perfection", content: "The quality of ingredients is immediately apparent. These are highly concentrated, rich extraits that hold their depth for hours.", author: "Aarav N.", location: "Hyderabad", date: "June 14, 2026" },
  { rating: 5, title: "Beautiful presentation", content: "From the heavy glass vessels to the scent profiles, everything feels curated and premium. A true representation of Indian craftsmanship.", author: "Sunita G.", location: "Chennai", date: "May 22, 2026" }
];

export function ProductPage({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  const story = productStories[product.slug] || defaultStory;
  const reviews = mockReviews[product.slug] || defaultReviews;

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

      {/* 1. Story Section */}
      <section className="border-t border-border bg-stone-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center md:text-left grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border border-border bg-background flex items-center justify-center p-6 shadow-sm">
              <span className="font-display italic text-6xl text-accent/30 select-none">
                {product.number.replace(/\D/g, "")}
              </span>
            </div>
          </div>
          <div className="md:col-span-8">
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.25em] mb-4 block">
              The Narrative
            </span>
            <h2 className="font-display text-3xl md:text-4xl italic mb-6">
              {story.title}
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              {story.content}
            </p>
          </div>
        </div>
      </section>

      {/* 2. FAQ Section */}
      <section className="border-t border-border bg-stone-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.25em] mb-4 block">
              Atelier Care
            </span>
            <h2 className="font-display text-3xl md:text-4xl italic">Common Inquiries</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long does the fragrance last on the skin?",
                a: "Our perfumes are formulated as high-concentration Extrait de Parfum, containing between 25% and 30% pure perfume oils. This ensures an exceptional longevity of 8 to 12 hours on the skin, and even longer on fabrics, evolving beautifully throughout the day."
              },
              {
                q: "Are these extraits safe for sensitive skin?",
                a: "Yes. Because Extrait de Parfum has a higher concentration of raw perfume oils and a lower concentration of alcohol, it is less drying and generally much gentler on the skin compared to standard Eau de Parfums or colognes. We also do not use artificial colorants."
              },
              {
                q: "Can I layer different Kalki extraits?",
                a: "Absolutely. The raw, natural ingredients we use (like sandalwood, vetiver, and jasmine) are designed to react dynamically. Layering Ganga Nectar (water) with Shakti Wildfire (fire) or Nandi Velar (earth) creates a highly personal, customized aura."
              },
              {
                q: "How should I store my extrait bottle?",
                a: "To preserve the delicate maceration of natural oils, store your bottle in a cool, dry place away from direct sunlight and sudden temperature fluctuations. Keeping it inside its original box on your shelf is highly recommended."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-border bg-background rounded-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50 transition-colors"
                  >
                    <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-foreground font-medium">
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {/* Collapsible Content */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-40 border-t border-border" : "max-h-0"
                    }`}
                  >
                    <div className="p-5 font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Reviews Section */}
      <section className="border-t border-border py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
            <h2 className="font-display text-3xl italic">Ritual Feedback</h2>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Verified Devotees
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Reviews Summary Stats */}
            <div className="lg:col-span-4 bg-stone-50 p-6 md:p-8 rounded-sm border border-border h-fit">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block mb-2">Overall Rating</span>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-display font-medium">4.9</span>
                <span className="text-sm text-muted-foreground font-mono">/ 5.0</span>
              </div>
              <div className="flex gap-1 mb-6 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current stroke-current" />
                ))}
              </div>
              
              {/* Rating bar indicators */}
              <div className="space-y-2.5">
                {[
                  { star: 5, pct: "92%" },
                  { star: 4, pct: "8%" },
                  { star: 3, pct: "0%" },
                  { star: 2, pct: "0%" },
                  { star: 1, pct: "0%" }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-3 text-xs font-mono">
                    <span className="w-3">{row.star}★</span>
                    <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: row.pct }} />
                    </div>
                    <span className="w-8 text-right text-muted-foreground">{row.pct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-8 divide-y divide-border">
              {reviews.map((rev, index) => (
                <div key={index} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex gap-0.5 text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < rev.rating ? "fill-current stroke-current" : "text-stone-300 stroke-current"}`} 
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] text-muted-foreground">{rev.date}</span>
                  </div>
                  <h4 className="font-display text-lg italic mb-2">{rev.title}</h4>
                  <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                    {rev.content}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="font-semibold text-foreground">{rev.author}</span>
                    <span>•</span>
                    <span>{rev.location}</span>
                    <span>•</span>
                    <span className="text-accent text-[9px] uppercase tracking-wider bg-accent/5 px-2 py-0.5 border border-accent/10 rounded-sm">Verified Devotee</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
