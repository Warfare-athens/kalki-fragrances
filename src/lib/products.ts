import pShakti from "@/assets/p-shakti.jpg";
import pGanga from "@/assets/p-ganga.jpg";
import pSudarshan from "@/assets/p-sudarshan.jpg";
import pMaduban from "@/assets/p-maduban.jpg";
import pNandi from "@/assets/p-nandi.jpg";

export type Product = {
  slug: string;
  number: string;
  name: string;
  notes: string;
  price: number;
  priceLabel: string;
  tint: string;
  swatch: string;
  label: string;
  img: string;
  tagline: string;
  description: string;
  pyramid: { tier: string; line: string }[];
  inspiration: string;
  isCombo?: boolean;
};

export const products: Product[] = [
  {
    slug: "shakti-wildfire",
    number: "No. 01",
    name: "Shakti Wildfire",
    notes: "Saffron, Marigold, Burnt Wood",
    price: 799,
    priceLabel: "₹799",
    tint: "bg-orange-500/5 group-hover:bg-orange-500/10",
    swatch: "bg-orange-500/15",
    label: "Fire",
    img: pShakti.src,
    tagline: "The dance of the awakened flame.",
    description:
      "An extrait built like an aarti at dusk: saffron threads bloom over crushed marigold, then collapse into the steady ember of burnt cedar and resinous birch. Worn close to the pulse, it smells of brass lamps left burning in stone alcoves.",
    pyramid: [
      { tier: "Top", line: "Saffron Threads, Bitter Orange" },
      { tier: "Heart", line: "Marigold Petals, Pink Pepper" },
      { tier: "Base", line: "Burnt Cedar, Birch Tar, Amber" },
    ],
    inspiration: "Composed in homage to the courtyard fires of Banaras.",
  },
  {
    slug: "ganga-nectar",
    number: "No. 02",
    name: "Ganga Nectar",
    notes: "Cool Water, Moss, Vetiver",
    price: 799,
    priceLabel: "₹799",
    tint: "bg-blue-500/5 group-hover:bg-blue-500/10",
    swatch: "bg-blue-500/15",
    label: "River",
    img: pGanga.src,
    tagline: "A current of silver and stone.",
    description:
      "Cool, almost mineral: the scent of cupped river water rising off limestone ghats at dawn. Wet moss, smoked vetiver and a thread of white lotus settle into something quiet, ancient and clean.",
    pyramid: [
      { tier: "Top", line: "Aldehydic Cool Water, Bergamot" },
      { tier: "Heart", line: "White Lotus, Wet Moss" },
      { tier: "Base", line: "Smoked Vetiver, River Stone" },
    ],
    inspiration: "An olfactive portrait of the Dashashwamedh Ghat at first light.",
  },
  {
    slug: "sudarshan-halo",
    number: "No. 03",
    name: "Sudarshan Halo",
    notes: "Turmeric, Sandalwood, Amber",
    price: 799,
    priceLabel: "₹799",
    tint: "bg-yellow-500/5 group-hover:bg-yellow-500/10",
    swatch: "bg-yellow-500/15",
    label: "Sun",
    img: pSudarshan.src,
    tagline: "Light, made wearable.",
    description:
      "Our most concentrated extrait. Old-growth Mysore sandalwood is cut with raw turmeric and warm amber to create a golden, almost luminous skin scent. Lingers for twelve hours, evolves for two.",
    pyramid: [
      { tier: "Top", line: "Fresh Turmeric Root, Cardamom" },
      { tier: "Heart", line: "Saffron Cream, Beeswax" },
      { tier: "Base", line: "Mysore Sandalwood, Soft Amber" },
    ],
    inspiration: "A salute to the Sudarshan Chakra and the discipline of light.",
  },
  {
    slug: "maduban-bloom",
    number: "No. 04",
    name: "Maduban Bloom",
    notes: "Jasmine, Tuberose, Honey",
    price: 799,
    priceLabel: "₹799",
    tint: "bg-pink-500/5 group-hover:bg-pink-500/10",
    swatch: "bg-pink-500/15",
    label: "Bloom",
    img: pMaduban.src,
    tagline: "An orchard at midnight.",
    description:
      "A heady, narcotic white-floral built around night-blooming jasmine sambac and tuberose absolute. A drop of raw honey and creamy benzoin keep it sensual rather than sweet.",
    pyramid: [
      { tier: "Top", line: "Neroli, Green Mango Leaf" },
      { tier: "Heart", line: "Jasmine Sambac, Tuberose Absolute" },
      { tier: "Base", line: "Raw Honey, Benzoin, Musk" },
    ],
    inspiration: "Inspired by the Maduban grove, where Krishna is said to have walked at night.",
  },
  {
    slug: "nandi-velar",
    number: "No. 05",
    name: "Nandi Velar",
    notes: "Damp Earth, Cedar, Patchouli",
    price: 799,
    priceLabel: "₹799",
    tint: "bg-emerald-500/5 group-hover:bg-emerald-500/10",
    swatch: "bg-emerald-500/15",
    label: "Earth",
    img: pNandi.src,
    tagline: "The weight of the patient bull.",
    description:
      "Grounded, smoky, deeply masculine. Wet petrichor opens into aged patchouli and dry cedar, with a final shadow of leather and oud. Built to sit close to the chest and stay there.",
    pyramid: [
      { tier: "Top", line: "Petrichor, Black Pepper" },
      { tier: "Heart", line: "Aged Patchouli, Dry Cedar" },
      { tier: "Base", line: "Smoked Leather, Trace Oud" },
    ],
    inspiration: "Named for Nandi, the still bull who waits at every Shiva temple.",
  },
  {
    slug: "shakti-ganga-combo",
    number: "Combo No. 01",
    name: "Shakti Wildfire & Ganga Nectar Perfume Combo (2 x 30 ml)",
    notes: "Saffron, Marigold, Vetiver",
    price: 1499,
    priceLabel: "₹1,499",
    tint: "bg-orange-500/5 group-hover:bg-orange-500/10",
    swatch: "bg-orange-500/15",
    label: "Combo",
    img: pShakti.src,
    tagline: "Fire and water, united.",
    description: "A dual-vessel pairing featuring our two most requested extraits. Shakti Wildfire blooms with courtyard fire and marigold, while Ganga Nectar paths cool aldehydic waters and river stone.",
    pyramid: [
      { tier: "Shakti", line: "Saffron, Marigold, Burnt Cedar" },
      { tier: "Ganga", line: "Cool Water, Wet Moss, Vetiver" }
    ],
    inspiration: "A dual offering of Varanasi's dawn and dusk rituals.",
    isCombo: true,
  },
  {
    slug: "nandi-maduban-combo",
    number: "Combo No. 02",
    name: "Nandi Velar & Madhubani Bloom Perfume Combo (2 x 30 ml)",
    notes: "Damp Earth, Jasmine, Honey",
    price: 1499,
    priceLabel: "₹1,499",
    tint: "bg-emerald-500/5 group-hover:bg-emerald-500/10",
    swatch: "bg-emerald-500/15",
    label: "Combo",
    img: pNandi.src,
    tagline: "Earth and night blooms.",
    description: "A pairing of heavy earth and nocturnal sweetness. Nandi Velar brings dry patchouli and wet petrichor, while Maduban Bloom matches it with night-blooming jasmine and raw honey.",
    pyramid: [
      { tier: "Nandi", line: "Petrichor, Cedarwood, Patchouli" },
      { tier: "Maduban", line: "Neroli, Tuberose, Raw Honey" }
    ],
    inspiration: "Earthly grounding meets celestial flower gardens.",
    isCombo: true,
  },
  {
    slug: "sudarshan-ganga-combo",
    number: "Combo No. 03",
    name: "Sudarshan Halo & Ganga Nectar Perfume Combo (2 x 30 ml)",
    notes: "Sandalwood, Cool Water, Amber",
    price: 1499,
    priceLabel: "₹1,499",
    tint: "bg-yellow-500/5 group-hover:bg-yellow-500/10",
    swatch: "bg-yellow-500/15",
    label: "Combo",
    img: pSudarshan.src,
    tagline: "Luminous sun and silver currents.",
    description: "The pairing of golden sandalwood and mineral waters. Sudarshan Halo brings warm Mysore sandalwood and turmeric, while Ganga Nectar cuts through with clean white lotus and wet moss.",
    pyramid: [
      { tier: "Sudarshan", line: "Turmeric, Beeswax, Mysore Sandalwood" },
      { tier: "Ganga", line: "Aldehydic Cool Water, Wet Moss, Vetiver" }
    ],
    inspiration: "Inspired by the dual forces of light and water.",
    isCombo: true,
  },
  {
    slug: "sudarshan-nandi-combo",
    number: "Combo No. 04",
    name: "Sudarshan Halo & Nandi Velar Perfume Combo (2 x 30 ml)",
    notes: "Turmeric, Sandalwood, Patchouli",
    price: 1499,
    priceLabel: "₹1,499",
    tint: "bg-yellow-500/5 group-hover:bg-yellow-500/10",
    swatch: "bg-yellow-500/15",
    label: "Combo",
    img: pSudarshan.src,
    tagline: "Grounded light.",
    description: "Golden sun meets patient earth. Our most concentrated sandalwood skin scent paired with the deep patchouli, petrichor, and trace oud of Nandi Velar.",
    pyramid: [
      { tier: "Sudarshan", line: "Turmeric, Saffron, Sandalwood" },
      { tier: "Nandi", line: "Petrichor, Dry Cedar, Oud" }
    ],
    inspiration: "Sacred ash and glowing halo, aligned in a single chest.",
    isCombo: true,
  },
  {
    slug: "shakti-maduban-combo",
    number: "Combo No. 05",
    name: "Shakti Wildfire & Madhuban Bloom Perfume Combo (2 x 30 ml)",
    notes: "Saffron, Jasmine, Honey",
    price: 1499,
    priceLabel: "₹1,499",
    tint: "bg-orange-500/5 group-hover:bg-orange-500/10",
    swatch: "bg-orange-500/15",
    label: "Combo",
    img: pShakti.src,
    tagline: "Wildfire and midnight flowers.",
    description: "Flame and honey. Shakti Wildfire's saffron and burnt cedar coupled with Maduban Bloom's night-blooming jasmine and warm benzoin.",
    pyramid: [
      { tier: "Shakti", line: "Saffron, Marigold, Burnt Wood" },
      { tier: "Maduban", line: "Jasmine, Tuberose, Honey" }
    ],
    inspiration: "A night-blooming orchard meets the temple fire courtyard.",
    isCombo: true,
  },
  {
    slug: "panch-tatva-discovery-set",
    number: "Set No. 01",
    name: "Panch Tatva Discovery Set 10 ml x 5 | Long Lasting Perfume Set for Men & Women",
    notes: "Five Elements: Fire, River, Sun, Bloom, Earth",
    price: 999,
    priceLabel: "₹999",
    tint: "bg-stone-500/5 group-hover:bg-stone-500/10",
    swatch: "bg-stone-500/15",
    label: "Set",
    img: pGanga.src,
    tagline: "The complete scent wardrobe.",
    description: "Our five signature extraits compiled in 10ml travel-ready vessels. Explore Shakti Wildfire, Ganga Nectar, Sudarshan Halo, Maduban Bloom, and Nandi Velar in one unified presentation box.",
    pyramid: [
      { tier: "Vessels", line: "5 &times; 10ml Concentrated Extrait" },
      { tier: "Duration", line: "8-12 hours skin-time each" },
      { tier: "Vibe", line: "Ritual olfaction on the move" }
    ],
    inspiration: "A tribute to the Panch Tatva — the five elements of cosmic order.",
    isCombo: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
