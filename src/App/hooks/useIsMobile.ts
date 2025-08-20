import { useLayoutEffect, useState } from 'react';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useLayoutEffect(() => {
    const check = (): void => {
      const screenCheck: boolean = window.matchMedia('(max-width: 768px)').matches;
      const userAgentCheck: boolean =
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
