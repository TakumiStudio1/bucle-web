import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: brand.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: brand.colors.cream,
    theme_color: brand.colors.grape,
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
