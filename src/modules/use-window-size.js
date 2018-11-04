import { useState, useEffect } from 'react';

const useWindowSize = () => {

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  function updateWindowDimensions() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    }
  }, []);  // we pass empty array as the second param to make this only call on mount and not on any updates

  return {
    width,
    height
  };
}

export default useWindowSize;
