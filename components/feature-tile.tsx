import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { FeatureTileData } from "@/lib/feature-tiles";

type FeatureTileProps = {
  tile: FeatureTileData;
};

export function FeatureTile({ tile }: FeatureTileProps) {
  const Icon = tile.icon;

  return (
    <Link
      href={tile.href}
      aria-label={tile.ariaLabel}
      className="feature-tile group relative isolate flex min-h-[260px] flex-col items-center justify-center overflow-hidden px-6 py-10 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-inset sm:min-h-[290px] lg:min-h-[410px]"
      style={
        {
          backgroundColor: tile.surface,
        } satisfies CSSProperties
      }
    >
      <Image
        src={tile.imageSrc}
        alt=""
        fill
        aria-hidden="true"
        loading={tile.eager ? "eager" : "lazy"}
        sizes="(min-width: 1024px) 25vw, 100vw"
        className="feature-tile-image object-cover"
      />
      <div
        aria-hidden="true"
        className="feature-tile-tint absolute inset-0"
        style={{ backgroundColor: tile.tint }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(7,27,44,0)_0%,rgba(7,27,44,0.15)_100%)]"
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="feature-tile-icon flex h-24 w-28 items-center justify-center">
          <Icon
            strokeWidth={1.65}
            className="h-[82px] w-[82px] text-[var(--color-deep-navy)] lg:h-[90px] lg:w-[90px]"
          />
        </div>

        <div className="h-1 w-12 rounded-full bg-[var(--color-orange)]" />

        <span className="max-w-[11ch] text-[1.55rem] leading-[1] font-semibold tracking-[-0.025em] text-[var(--color-deep-navy)] lg:text-[1.7rem]">
          {tile.title}
        </span>
      </div>
    </Link>
  );
}
