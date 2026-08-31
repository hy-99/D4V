"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent } from "react";
import type { NavigationItem } from "@/lib/navigation";

type MobileMenuProps = {
  activeHref?: string;
  accent?: "blue" | "orange";
  isOpen: boolean;
  onClose: (restoreFocus?: boolean) => void;
  navigationItems: NavigationItem[];
};

export function MobileMenu({
  activeHref,
  accent = "orange",
  isOpen,
  onClose,
  navigationItems,
}: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const keepFocusInDialog = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={() => onClose(true)}
        className="absolute inset-0 bg-[color:rgba(7,27,44,0.42)] backdrop-blur-[2px]"
      />

      <div
        ref={dialogRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        onKeyDown={keepFocusInDialog}
        className="absolute inset-x-4 top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-[1.75rem] border border-white/10 bg-[color:rgba(7,27,44,0.96)] p-6 shadow-[0_24px_70px_rgba(7,27,44,0.28)]"
      >
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => onClose(true)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 text-[var(--color-warm-white)] transition-colors duration-200 hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <nav aria-label="Mobile primary" className="flex flex-col gap-2">
          {navigationItems.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              onClick={() => onClose(false)}
              className={`inline-flex min-h-12 items-center rounded-2xl px-4 text-[1.35rem] font-semibold text-[var(--color-warm-white)] transition-colors duration-200 hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(7,27,44,0.96)] ${
                activeHref === item.href ? "bg-white/10" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/get-help"
            aria-current={activeHref === "/get-help" ? "page" : undefined}
            onClick={() => onClose(false)}
            className={`mt-3 inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-[1.1rem] font-semibold text-[var(--color-warm-white)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(7,27,44,0.96)] ${accent === "blue" ? "bg-[#2866dd] hover:bg-[#1f54bc]" : "bg-[var(--color-orange)] hover:bg-[#da6c17]"}`}
          >
            Get Help
          </Link>
        </nav>
      </div>
    </div>
  );
}
