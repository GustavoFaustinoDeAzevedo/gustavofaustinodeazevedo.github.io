import { useEffect, useState } from 'react';

function useBackgroundImageLoad(imageUrl: string, fallbackUrl: string, timeoutMs = 5000) {
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  useEffect(() => {
    let didTimeout = false;
    const timeout = setTimeout(() => {
      didTimeout = true;
      const fallbackImg = new Image();
      fallbackImg.src = fallbackUrl;
      fallbackImg.onload = () => setLoadedUrl(fallbackUrl);
      fallbackImg.onerror = () => setLoadedUrl(null);
    }, timeoutMs);

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      if (!didTimeout) {
        clearTimeout(timeout);
        setLoadedUrl(imageUrl);
      }
    };

    img.onerror = () => {
      if (!didTimeout) {
        clearTimeout(timeout);
        const fallbackImg = new Image();
        fallbackImg.src = fallbackUrl;
        fallbackImg.onload = () => setLoadedUrl(fallbackUrl);
        fallbackImg.onerror = () => setLoadedUrl(null);
      }
    };

    return () => clearTimeout(timeout);
  }, [imageUrl, fallbackUrl, timeoutMs]);

  return loadedUrl;
}

export default useBackgroundImageLoad;
