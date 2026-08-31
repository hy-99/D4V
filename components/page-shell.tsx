import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";

type PageShellProps = {
  activeHref?: string;
  children: ReactNode;
  footerVariant?: "default" | "about";
  footerTone?: "light" | "dark";
  headerTone?: "hero" | "light";
  layout?: string;
};

export function PageShell({
  activeHref,
  children,
  footerVariant = "default",
  footerTone = "light",
  headerTone = "light",
  layout = "inner-page",
}: PageShellProps) {
  return (
    <>
      <Header activeHref={activeHref} tone={headerTone} />
      <main
        id="main-content"
        data-page-entry
        data-page-layout={layout}
        className="overflow-x-clip"
      >
        {children}
      </main>
      <SiteFooter tone={footerTone} variant={footerVariant} />
    </>
  );
}
