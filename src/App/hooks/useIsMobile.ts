import { useLayoutEffect, useState } from 'react';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useLayoutEffect(() => {
    const check = (): void => {
      const screenCheck: boolean =
        window.matchMedia('(max-width: 768px)').matches;
      console.log('screenCheck', screenCheck);
      const userAgentCheck: boolean =
        /android|iphone|ipad|ipod|blackberry|windows phone/i.test(
          navigator.userAgent
        );
      console.log('userAgentCheck', userAgentCheck);
      setIsMobile(screenCheck || userAgentCheck);
    };

    check();
  }, []);

  console.log('isMobile', isMobile);
  return isMobile;
};

export default useIsMobile;
