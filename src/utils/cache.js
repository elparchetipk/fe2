// src/utils/cache.js
class CacheManager {
  constructor() {
    this.imageCache = new Map();
    this.dataCache = new Map();
    this.metadata = new Map();
  }

  // Caché de imágenes con límite de tiempo
  async cacheImage(url, timeToLive = 3600000) { // 1 hora por defecto
    if (this.imageCache.has(url)) {
      const cached = this.imageCache.get(url);
      if (Date.now() - cached.timestamp < timeToLive) {
        return cached.blob;
      }
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      this.imageCache.set(url, {
        blob,
        timestamp: Date.now()
      });
      return blob;
    } catch (error) {
      console.error('Error caching image:', error);
      return null;
    }
  }

  // Caché de datos con invalidación selectiva
  cacheData(key, data, dependencies = []) {
    this.dataCache.set(key, data);
    this.metadata.set(key, {
      timestamp: Date.now(),
      dependencies
    });
  }

  invalidateCache(dependency) {
    for (const [key, meta] of this.metadata.entries()) {
      if (meta.dependencies.includes(dependency)) {
        this.dataCache.delete(key);
        this.metadata.delete(key);
      }
    }
  }
}

export const cacheManager = new CacheManager();