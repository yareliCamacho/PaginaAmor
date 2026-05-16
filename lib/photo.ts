/**
 * Convert a stored photo_pathname into a renderable image src.
 * - Seeded sample paths starting with /moments/... are served as static public files.
 * - Anything else is treated as a Vercel Blob private pathname and served through the auth route.
 */
export function photoSrc(pathname: string | null | undefined): string | null {
  if (!pathname) return null
  if (pathname.startsWith("/")) return pathname
  return `/api/file?pathname=${encodeURIComponent(pathname)}`
}
