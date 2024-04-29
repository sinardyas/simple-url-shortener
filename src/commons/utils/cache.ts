import cache from "../libs/cache";

class Cache<T> {
  protected ttl: number | null;
  public key: string;
  public cached: T | null;

  constructor(key: string, options?: { ttl?: number }) {
    this.ttl = options ? options.ttl ?? null : null;
    this.key = key;
    this.cached = null;
  }

  async set(value: T) {
    await cache.set(this.key, typeof value === "string" ? value : JSON.stringify(value));
    if (this.ttl) return await cache.expire(this.key, this.ttl);

    return;
  }

  async get() {
    const data = await cache.get(this.key);
    if (data) {
      this.cached = JSON.parse(data) as T;
    }
    return this.cached;
  }
}

export default Cache;
