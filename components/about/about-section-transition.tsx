type AboutSectionTransitionProps = {
  variant: "warm-to-blue" | "warm-to-footer";
};

export function AboutSectionTransition({
  variant,
}: AboutSectionTransitionProps) {
  return (
    <div
      className={`about-section-transition about-section-transition--${variant}`}
      data-about-color-morph="true"
      aria-hidden="true"
    />
  );
}
