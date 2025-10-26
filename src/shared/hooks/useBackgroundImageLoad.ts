import { useEffect, useState } from 'react';

function useBackgroundImageLoad(imageUrl: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoaded(true);
  }, [imageUrl]);

  return loaded;
}

export default useBackgroundImageLoad;
