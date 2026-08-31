import type { CSSProperties, ReactNode } from "react";

type SectionKickerProps = {
  children: ReactNode;
  tone?: "dark" | "light";
  number?: string;
  delay?: number;
  className?: string;
};

export function SectionKicker({
  children,
  tone = "dark",
  number,
  delay = 0,
  className = "",
}: SectionKickerProps) {
  return (
    <p
      data-section-kicker
      data-kicker-tone={tone}
      data-reveal-item
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`section-kicker ${className}`.trim()}
    >
      <span className="section-kicker-mark" aria-hidden="true" />
      {number ? <span className="section-kicker-number">{number}</span> : null}
      <span>{children}</span>
    </p>
  );
}
