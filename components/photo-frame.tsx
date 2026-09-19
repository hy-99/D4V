import Image from "next/image";
import type { CSSProperties } from "react";
import type { PagePhoto, PhotoFocalPoint } from "@/lib/page-photos";
import { withBasePath } from "@/lib/site-paths";

type PhotoFrameVariant = "arch" | "landscape" | "portrait" | "wide" | "inset";
type PhotoFrameTone = "blue" | "peach" | "sage" | "cream" | "navy";

type PhotoFrameProps = {
  photo: PagePhoto;
  variant?: PhotoFrameVariant;
  tone?: PhotoFrameTone;
  label?: string;
  caption?: string;
  captionTone?: "dark" | "light";
  primary?: boolean;
  eager?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  delay?: number;
};

const focalClasses: Record<PhotoFocalPoint, string> = {
  center: "object-center",
  left: "object-left",
  right: "object-right",
  top: "object-top",
  bottom: "object-bottom",
  "center-left": "object-[38%_center]",
  "center-right": "object-[68%_center]",
};

export function PhotoFrame({
  photo,
  variant = "landscape",
  tone = "cream",
  label,
  caption,
  captionTone = "dark",
  primary = false,
  eager = false,
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 48vw, 92vw",
  delay = 170,
}: PhotoFrameProps) {
  return (
    <figure
      data-photo-frame={variant}
      data-photo-tone={tone}
      data-primary-photo={primary ? "true" : undefined}
      data-reveal-item
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`photo-frame ${caption ? "photo-frame--captioned" : ""} ${className}`.trim()}
    >
      <div className="photo-frame-media">
        <Image
          src={withBasePath(photo.src)}
          alt={photo.alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes={sizes}
          className={`photo-frame-image object-cover ${focalClasses[photo.focalPoint]} ${imageClassName}`.trim()}
        />
        <span className="photo-frame-wash" aria-hidden="true" />
      </div>
      {label ? (
        <figcaption className="photo-frame-label">
          <span aria-hidden="true" />
          {label}
        </figcaption>
      ) : null}
      {caption ? (
        <figcaption data-caption-tone={captionTone} className="photo-frame-caption">
          <span aria-hidden="true" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
