/**
 * Utility functions for normalizing store domains and slugs
 */

/**
 * Normalizes a domain/store parameter for consistent database lookups
 * - Converts to lowercase
 * - Removes http/https protocols
 * - Removes www prefix
 * - Removes trailing slashes
 * - Replaces special characters with hyphens for slug generation
 */
export function normalizeDomain(input: string): string {
  return input
    .toLowerCase()
    .replace(/^(https?:\/\/)?(www\.)?/, "") // Remove protocol and www
    .replace(/\/+$/, "") // Remove trailing slashes
    .trim()
}

/**
 * Generates a URL-friendly slug from a domain
 * Used for store_slug field lookups
 */
export function generateStoreSlug(domain: string): string {
  return normalizeDomain(domain)
    .replace(/[^a-z0-9]+/g, "-") // Replace special chars with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
}

/**
 * Returns all possible variations of a store parameter for database lookups
 * Ensures backwards compatibility with existing data
 */
export function getStoreVariations(storeParam: string): {
  original: string
  normalized: string
  slug: string
} {
  const original = storeParam
  const normalized = normalizeDomain(storeParam)
  const slug = generateStoreSlug(storeParam)

  return {
    original,
    normalized,
    slug,
  }
}
