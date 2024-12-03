import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HoverSlideshowProps {
  images?: string[];
  width?: number;
  height?: number | 'auto'; // Allow height to be a number or 'auto'
  interval?: number;
  className?: string;
}

const HoverSlideshow: React.FC<HoverSlideshowProps> = ({
  images = [],
  width = 400,
  height = 'auto', // Default to 'auto'
  interval = 1000,
  className = '',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Early return if no images provided
  if (!images || images.length === 0) {
    return (
      <div 
        className={`relative flex items-center justify-center rounded-lg bg-gray-100 shadow-xl ${className}`}
        style={{ width, height }}
      >
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isHovered && images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered, images.length, interval]);

  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      style={{ width, height }}
    >
      <Image
        src={images[currentImageIndex]}
        alt={`Slideshow image ${currentImageIndex + 1}`}
        layout="fill"
        objectFit="cover"
        className="transition-all duration-500"
        priority={true}
        sizes={`(max-width: ${width}px) 100vw, ${width}px`}
      />
      
      {isHovered && images.length > 1 && (
        <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
          {currentImageIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default HoverSlideshow;