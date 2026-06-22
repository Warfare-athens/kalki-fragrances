import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/ProductPage";
import { getProduct, products } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.tagline} ${product.description.slice(0, 120)}`,
    openGraph: {
      title: `${product.name} - Kalki Fragrances`,
      description: product.tagline,
      images: [product.img],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductPage product={product} />;
}
