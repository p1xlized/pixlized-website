/**
 * Memoization utilities for Cloudflare deployment
 * Uses WeakMap for automatic garbage collection
 */

/**
 * Simple memoization cache using WeakMap
 * Keys can be any object, values are cached results
 */
const cache = new WeakMap<object, unknown>()

/**
 * Memoize a function with a single argument
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function memoize<T extends object, R>(fn: (arg: T) => R): (arg: T) => R {
  return (arg: T) => {
    if (!cache.has(arg)) {
      cache.set(arg, fn(arg))
    }
    return cache.get(arg) as R
  }
}

/**
 * Memoize a function with string key
 * Useful for database queries where the key is a SQL string
 */
const stringCache = new Map<string, unknown>()

export function memoizeWithKey<R>(fn: () => R, key: string): R {
  if (!stringCache.has(key)) {
    stringCache.set(key, fn())
  }
  return stringCache.get(key) as R
}

/**
 * Clear all caches (useful for development)
 */
export function clearAllCaches(): void {
  // WeakMap doesn't have a clear method, but we can create a new one
  // For string cache, we can clear it
  stringCache.clear()
}

/**
 * Memoize database query results
 * Uses SQL query string as cache key
 */
export function memoizedQuery<T>(key: string, fn: () => T): T {
  return memoizeWithKey(fn, `db:${key}`)
}
