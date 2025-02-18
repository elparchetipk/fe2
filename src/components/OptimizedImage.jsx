// src/components/OptimizedImage.jsx
import React, { useState, useEffect } from 'react';
import { cacheManager } from '../utils/cache';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  placeholder = 'blur' // blur | color | skeleton
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        const cachedImage = await cacheManager.cacheImage(src);
        if (cachedImage && isMounted) {
          setImageSrc(URL.createObjectURL(cachedImage));
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
      // Limpiamos la URL del objeto si existe
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [src]);

  // Renderizamos diferentes tipos de placeholder mientras carga
  if (loading) {
    switch (placeholder) {
      case 'blur':
        return (
          <div
            className={`${className} animate-pulse bg-gray-200 dark:bg-gray-700`}
            style={{ width, height }}
          />
        );
      case 'color':
        return (
          <div
            className={`${className}`}
            style={{
              width,
              height,
              backgroundColor: generateColorFromString(src)
            }}
          />
        );
      case 'skeleton':
        return (
          <div
            className={`${className} animate-pulse`}
            style={{ width, height }}
          >
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        );
    }
  }

  if (error) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-800`}
        style={{ width, height }}
      >
        <span className="text-gray-500">Error al cargar la imagen</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
    />
  );
};

export default React.memo(OptimizedImage);