'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ScrollAwareProps {
  children: (isScrolled: boolean) => ReactNode;
  threshold?: number;
}

export function ScrollAware({ children, threshold = 50 }: ScrollAwareProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return <>{children(isScrolled)}</>;
}
