import { useLayoutEffect, useState } from 'react';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useLayoutEffect(() => {
    const check = () => {
      const screenCheck = window.matchMedia('(max-width: 768px)').matches;
      const userAgentCheck =
        /android|iphone|ipad|ipod|blackberry|windows phone/i.test(
          navigator.userAgent
        );
      setIsMobile(screenCheck || userAgentCheck);
    };

    check();
  }, []);

  return isMobile;
};

export default useIsMobile;
