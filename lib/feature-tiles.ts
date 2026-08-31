import type { LucideIcon } from "lucide-react";
import { BookOpen, HeartHandshake, ShieldCheck } from "lucide-react";

export type FeatureTileData = {
  title: string;
  href: string;
  imageSrc: string;
  surface: string;
  tint: string;
  icon: LucideIcon;
  ariaLabel: string;
  eager?: boolean;
};

export const featureTiles: FeatureTileData[] = [
  {
    title: "Scam Workshops",
    href: "/workshops",
    imageSrc: "/images/workshops-placeholder.png",
    surface: "var(--color-pale-blue)",
    tint: "var(--color-pale-blue)",
    icon: ShieldCheck,
    ariaLabel: "Scam Workshops feature page",
    eager: true,
  },
  {
    title: "SeniorSafe",
    href: "/seniorsafe",
    imageSrc: "/images/seniorsafe-placeholder.png",
    surface: "var(--color-pale-peach)",
    tint: "var(--color-pale-peach)",
    icon: HeartHandshake,
    ariaLabel: "SeniorSafe feature page",
  },
  {
    title: "Resources",
    href: "/resources",
    imageSrc: "/images/resources-placeholder.png",
    surface: "var(--color-pale-sage)",
    tint: "var(--color-pale-sage)",
    icon: BookOpen,
    ariaLabel: "Resources feature page",
  },
];
