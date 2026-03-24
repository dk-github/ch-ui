/**
 * Base path utility for subpath deployments.
 *
 * The Go server injects window.__CH_UI_BASE_PATH__ into index.html
 * when the BASE_PATH env var is set (e.g. BASE_PATH=/ch-ui).
 */

declare global {
  interface Window {
    __CH_UI_BASE_PATH__?: string
  }
}

/** Returns the base path without trailing slash (empty string for root). */
export function getBasePath(): string {
  const base = window.__CH_UI_BASE_PATH__ ?? ''
  return base.endsWith('/') ? base.slice(0, -1) : base
}

/** Prepends the base path to an absolute path. */
export function withBasePath(path: string): string {
  const base = getBasePath()
  if (!base) return path
  return base + path
}

/** Strips the base path prefix from a pathname. */
export function stripBasePath(pathname: string): string {
  const base = getBasePath()
  if (!base) return pathname
  if (pathname.startsWith(base)) {
    const stripped = pathname.slice(base.length)
    return stripped.startsWith('/') ? stripped : '/' + stripped
  }
  return pathname
}
