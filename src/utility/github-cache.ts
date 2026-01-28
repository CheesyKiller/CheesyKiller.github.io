type CacheEntry<T> = {
  value: T;
  fetchedAt: number;
};

export function readCache<T>(key: string): CacheEntry<T> | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CacheEntry<T>;
  } catch {
    return null;
  }
}

export function writeCache<T>(key: string, value: T) {
  const entry: CacheEntry<T> = { value, fetchedAt: Date.now() };
  localStorage.setItem(key, JSON.stringify(entry));
}

export function isFresh(fetchedAt: number, ttlMs: number) {
  return Date.now() - fetchedAt < ttlMs;
}