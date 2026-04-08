import React, { useState, useEffect } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallbackSrc?: string;
}

export const SafeImage = ({ 
  src, 
  alt, 
  className, 
  fallbackSrc = "https://placehold.co/400x400/e2e8f0/64748b?text=Product+Image",
  loading = "lazy",
  ...props 
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    if (!isError) {
      setImgSrc(fallbackSrc);
      setIsError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden flex items-center justify-center bg-gray-50 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-irshop-teal rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 w-full h-full object-contain`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};
