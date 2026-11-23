/**
 * Prefix internal paths with Astro's configured `base` (e.g. `/ctalab-website`)
 * so every link and static asset works on both GitHub Pages project URLs and
 * custom domains (`base: '/'`).
 */
export function withBase(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

/**
 * Strip the configured `base` prefix from a pathname so active-nav checks
 * compare normalized root-relative routes (e.g. `/research`, `/people`).
 */
export function stripBase(pathname: string): string {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  if (base && pathname.startsWith(base)) {
    const rest = pathname.slice(base.length);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}
