"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MobileMenu } from "@/components/mobile-menu";
import { navigationItems } from "@/lib/navigation";
import { withBasePath } from "@/lib/site-paths";

type HeaderProps = {
  activeHref?: string;
  tone?: "hero" | "light";
};

export function Header({ activeHref, tone = "hero" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const shouldRestoreFocusRef = useRef(false);
  const isLight = tone === "light";

  const closeMenu = (restoreFocus = false) => {
    shouldRestoreFocusRef.current = restoreFocus;
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      if (shouldRestoreFocusRef.current) {
        requestAnimationFrame(() => {
          menuButtonRef.current?.focus();
        });
      }

      shouldRestoreFocusRef.current = false;
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const backgroundRegions = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer"),
    ].filter((region): region is HTMLElement => region !== null);
    const previousInertStates = backgroundRegions.map((region) => region.inert);

    document.body.style.overflow = "hidden";
    backgroundRegions.forEach((region) => {
      region.inert = true;
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      backgroundRegions.forEach((region, index) => {
        region.inert = previousInertStates[index];
      });
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        shouldRestoreFocusRef.current = true;
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        data-site-header
        data-active-page={activeHref?.replace(/^\//, "")}
        className={`site-header absolute inset-x-0 top-0 z-50 h-24 ${
          isMenuOpen ? "bg-[color:rgba(7,27,44,0.78)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between gap-6 px-6 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span
              data-header-brand-logo
              className="relative block h-[56px] w-[56px] overflow-hidden rounded-full md:h-[72px] md:w-[72px]"
            >
              <Image
                src={withBasePath("/images/d4v-logo-exact.png")}
                alt="D4V Bay Area logo"
                fill
                loading="eager"
                sizes="(min-width: 768px) 72px, 56px"
                className="scale-[1.08] object-cover"
              />
            </span>

            <span
              className={`flex items-baseline gap-2.5 ${
                isLight ? "text-[var(--color-deep-navy)]" : "text-[var(--color-warm-white)]"
              }`}
            >
              <span
                data-header-brand-d4v
                className="condensed-display text-[1.85rem] font-medium uppercase tracking-[0.035em] text-[var(--color-orange)] sm:text-[2rem]"
              >
                D4V
              </span>
              <span
                data-header-brand-place
                className={`condensed-display text-[1.85rem] font-medium tracking-[0.025em] sm:text-[2rem] ${
                  isLight ? "text-[var(--color-deep-navy)]" : "text-[color:rgba(255,253,249,0.96)]"
                }`}
              >
                Bay Area
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-4 text-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                  isLight
                    ? "text-[color:rgba(21,42,64,0.88)] hover:text-[var(--color-deep-navy)]"
                    : "text-[color:rgba(255,253,249,0.94)] hover:text-white"
                } ${
                  activeHref === item.href
                    ? "relative after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:bg-[#2866dd]"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/get-help"
              aria-current={activeHref === "/get-help" ? "page" : undefined}
              className={`ml-2 inline-flex min-h-11 items-center rounded-xl bg-[var(--color-orange)] px-6 text-lg font-semibold text-[var(--color-warm-white)] transition-colors duration-200 hover:bg-[#da6c17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(7,27,44,0.78)] ${
                activeHref === "/get-help"
                  ? "ring-2 ring-white/80 ring-offset-2 ring-offset-transparent"
                  : ""
              }`}
            >
              Get Help
            </Link>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMenu}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full backdrop-blur-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:hidden ${
              isLight
                ? "border border-[color:rgba(11,45,74,0.18)] bg-[color:rgba(11,45,74,0.05)] text-[var(--color-deep-navy)] hover:bg-[color:rgba(11,45,74,0.1)]"
                : "border border-white/15 bg-[color:rgba(255,253,249,0.08)] text-[var(--color-warm-white)] hover:bg-[color:rgba(255,253,249,0.15)]"
            }`}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <MobileMenu
        activeHref={activeHref}
        isOpen={isMenuOpen}
        onClose={closeMenu}
        navigationItems={navigationItems}
        accent="orange"
      />
    </>
  );
}
