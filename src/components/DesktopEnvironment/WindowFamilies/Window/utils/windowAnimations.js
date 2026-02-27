import gsap from 'gsap';


const windowAnimations = {

  openWindow: (windowRef, handler = () => { }, isMobile) => {
    if (!windowRef?.current) return;
    gsap.fromTo(windowRef.current, { scale: 0.8, opacity: 0 }, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
      display: 'flex',
      onComplete: () => {
        handler()
      }
    });
  },

  closeWindow: (windowRef, handler = () => { }) => {
    if (!windowRef?.current) return;
    gsap.to(windowRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.inOut',
      onComplete: () => {

        handler()

      }
    });
  },

  maximizeWindow: (windowRef, handler = () => { }) => {

    if (!windowRef?.current) return;
    return gsap.to(windowRef.current, {
      x: 0,
      y: 0,
      width: '100vw',
      height: '100vh',
      duration: 0.35,
      ease: 'expo.inOut',
      onComplete: () => {
        handler();
      },
    });
  },

  minimizeWindow: (windowRef, handler = () => { }, x, y, isMobile = false) => {

    if (!windowRef?.current) return;

    if (windowRef.current.classList.contains('minimized')) {
      gsap.killTweensOf(windowRef.current);
      gsap.set(windowRef.current, { clearProps: 'display,opacity,width,height' });
      handler();
      return;
    }
    const { width, height } = windowRef.current.getBoundingClientRect();

    const screenWidth = window.screen.width;

    const desktopParams = {
      x: x * 55,
      minWidth: '150px',
      width: 0,
      height: 0,
      scale: 0,
      opacity: 0,
      duration: 0.3,
      display: 'none',
      ease: 'expo2.Out',
    }

    const mobileParams = {
      x: 0,
      minWidth: width,
      width: width,
      height: height,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
    }

    const sharedParams = {
      y: '100vh',
      minHeight: '150px',
      display: 'none',
      onComplete: () => {
        handler();
      },
    }


    gsap.to(windowRef.current, {
      ...(isMobile ? mobileParams : desktopParams),
      ...sharedParams,
    });
  },

  restoreWindow: (windowRef, handler = () => { }, x, y, width, height, isMobile = false) => {

    if (!windowRef?.current) return;
    return gsap.to(windowRef.current, {
      x: x,
      y: y,
      width: width,
      height: height,
      scale: 1,
      opacity: 1,
      display: 'flex',
      duration: 0.2,
      ease: isMobile ? 'power2.in' : 'expo2.in',
      onComplete: () => {
        handler();
        gsap.set(windowRef.current, {
          minWidth: 'max-content',
          minHeight: '10%',

        })
      },
    });

  },
}

export default windowAnimations;
