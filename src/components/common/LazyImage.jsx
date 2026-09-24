import React, { useState } from 'react';

/**
 * LazyImage component with native browser lazy loading, async decoding,
 * skeleton pulse loader, and graceful error fallback.
 */
export default function LazyImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  fallbackSrc = '/cleanwalk_hero.png',
  style = {},
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const finalSrc = hasError ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton Pulse Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-800/60 animate-pulse rounded-[inherit] z-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
        </div>
      )}

      <img
        src={finalSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`${className} transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={style}
        {...props}
      />
    </div>
  );
}
