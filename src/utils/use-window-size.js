import { useState, useEffect } from 'react';

export default function useWindowSize() {

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  function updateWindowDimensions() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    window.addEventListener('orientationchange', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
      window.removeEventListener('orientationchange', updateWindowDimensions);
    };
  }, []);

  return { width, height };
}