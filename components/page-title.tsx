import type { CSSProperties, ReactNode } from "react";
import { SectionKicker } from "@/components/section-kicker";

type PageTitleTone = "dark" | "light";
type PageTitleSize = "hero" | "section" | "compact";
type PageTitleMeasure = "narrow" | "medium" | "wide" | "extra-wide";
type PageTitleAlign = "left" | "center";

type PageTitleProps = {
  headingId: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: PageTitleTone;
  as?: "h1" | "h2";
  actions?: ReactNode;
  className?: string;
  size?: PageTitleSize;
  measure?: PageTitleMeasure;
  align?: PageTitleAlign;
};

export function PageTitle({
  headingId,
  eyebrow,
  title,
  description,
  tone = "dark",
  as = "h1",
  actions,
  className = "",
  size = as === "h1" ? "hero" : "section",
  measure = "medium",
  align = "left",
}: PageTitleProps) {
  const Heading = as;
  const colors = tone === "light"
    ? {
        title: "text-[var(--color-warm-white)]",
        body: "text-white/76",
        rule: "bg-[var(--color-orange)]",
      }
    : {
        title: "text-[var(--color-deep-navy)]",
        body: "text-[color:rgba(21,42,64,0.76)]",
        rule: "bg-[var(--color-orange)]",
      };

  return (
    <div
      className={`page-title ${className}`.trim()}
      data-page-title
      data-title-size={size}
      data-title-measure={measure}
      data-title-align={align}
    >
      <SectionKicker tone={tone} delay={70}>
        {eyebrow}
      </SectionKicker>
      <div
        data-reveal-item
        style={{ "--reveal-delay": "130ms" } as CSSProperties}
        className={`page-title-rule mt-6 h-1.5 w-16 rounded-full ${colors.rule}`}
      />
      <Heading
        id={headingId}
        data-reveal-item
        style={{ "--reveal-delay": "190ms" } as CSSProperties}
        className={`page-title-heading editorial-serif mt-8 ${colors.title}`}
      >
        {title}
      </Heading>
      {description ? (
        <div
          data-reveal-item
          style={{ "--reveal-delay": "290ms" } as CSSProperties}
          className={`page-title-description mt-8 max-w-[40rem] text-lg leading-8 ${colors.body}`}
        >
          {description}
        </div>
      ) : null}
      {actions ? (
        <div
          data-reveal-item
          style={{ "--reveal-delay": "380ms" } as CSSProperties}
          className="page-title-actions mt-9 flex flex-wrap gap-3"
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}
