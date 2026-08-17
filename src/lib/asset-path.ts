// next/image doesn't automatically prefix `src` with basePath when
// images.unoptimized is true (needed for a static export / GitHub Pages).
// Use this helper for any static file under /public referenced via next/image.
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
