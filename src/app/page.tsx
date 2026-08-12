import { Hero } from "@/components/sections/Hero";
import { BucleScrollSequence } from "@/components/brand/BucleScrollSequence";
import { Marquee } from "@/components/ui/Marquee";
import { brand } from "@/config/brand";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Manifesto } from "@/components/sections/Manifesto";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { DonutConfiguratorSection } from "@/components/sections/DonutConfiguratorSection";
import { ComboSection } from "@/components/sections/ComboSection";
import { BrandMosaic } from "@/components/sections/BrandMosaic";
import { LocalDestacado } from "@/components/sections/LocalDestacado";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

const MARQUEE_ITEMS = [
  brand.name,
  "DONUTS + COFFEE",
  "GIRA",
  "MUERDE",
  "REPITE",
  "UNO LLEVA A OTRO",
];

export default function HomePage() {
  return (
    <>
      <BucleScrollSequence />
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <FeaturedProducts />
      <Manifesto />
      <CategoryGrid />
      <DonutConfiguratorSection />
      <ComboSection />
      <BrandMosaic />
      <LocalDestacado />
      <NewsletterSection />
    </>
  );
}
