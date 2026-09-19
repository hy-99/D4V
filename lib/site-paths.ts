export function normalizeBasePath(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";

  if (!trimmed || trimmed === "/") {
    return "";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  return withLeadingSlash.replace(/\/+$/, "");
}

export const siteBasePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH,
);

export function withBasePath(path: string): string {
  if (!siteBasePath || !path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  if (path === siteBasePath || path.startsWith(`${siteBasePath}/`)) {
    return path;
  }

  return `${siteBasePath}${path}`;
}
