import type { ReactNode } from "react";
import {
  ScrollReveal,
  type RevealVariant,
} from "@/components/scroll-reveal";

type EditorialSectionProps = {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  id?: string;
  replay?: boolean;
  variant?: RevealVariant;
};

export function EditorialSection({
  children,
  className = "",
  labelledBy,
  id,
  replay = false,
  variant = "rise",
}: EditorialSectionProps) {
  return (
    <ScrollReveal replay={replay} variant={variant}>
      <section
        id={id}
        aria-labelledby={labelledBy}
        className={`editorial-section ${className}`.trim()}
      >
        {children}
      </section>
    </ScrollReveal>
  );
}
