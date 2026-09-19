import Image from "next/image";
import type { CSSProperties } from "react";
import type { PagePhoto } from "@/lib/page-photos";
import { withBasePath } from "@/lib/site-paths";

export type StoryImageTreatment =
  | "full-bleed"
  | "panorama"
  | "portrait-stack"
  | "contact-sheet"
  | "action-strip"
  | "oval";

type StoryImageProps = {
  photo: PagePhoto;
  treatment: StoryImageTreatment;
  className?: string;
  imageClassName?: string;
  caption?: string;
  eager?: boolean;
  sizes?: string;
  delay?: number;
  reveal?: boolean;
};

const objectPositions: Record<PagePhoto["focalPoint"], string> = {
  center: "center",
  left: "left center",
  right: "right center",
  top: "center top",
  bottom: "center bottom",
  "center-left": "35% center",
  "center-right": "65% center",
};

export function StoryImage({
  photo,
  treatment,
  className = "",
  imageClassName = "",
  caption,
  eager = false,
  sizes = "(min-width: 1024px) 48vw, 92vw",
  delay = 0,
  reveal = true,
}: StoryImageProps) {
  return (
    <figure
      data-story-photo={treatment}
      data-reveal-item={reveal ? true : undefined}
      style={
        reveal
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
      className={`story-image ${className}`.trim()}
    >
      <div className="story-image__media">
        <Image
          src={withBasePath(photo.src)}
          alt={photo.alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes={sizes}
          className={`story-image__photo ${imageClassName}`.trim()}
          style={{ objectPosition: objectPositions[photo.focalPoint] }}
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
