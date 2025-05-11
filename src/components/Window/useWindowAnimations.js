import gsap from 'gsap';


const useWindowAnimations = {

  openWindow: (windowRef, handler = () => { }) => {
    if (!windowRef?.current) return;
    gsap.fromTo(windowRef.current, { scale: 0.8, opacity: 0 }, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
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

  maximizeWindow: (windowRef, handler = () => { }, x, y, width, height) => {

    if (!windowRef?.current) return;
    return gsap.to(windowRef.current, {
      x: x || 0,
      y: y || 0,
      width: width || '100vw',
      height: height || '100vh',
      duration: 0.35,
      ease: 'expo.inOut',
      onComplete: () => {
        handler();
      },
    });
  },

  minimizeWindow: (windowRef, handler = () => { }, x, y) => {

    if (!windowRef?.current) return;

    if (windowRef.current.classList.contains('minimized')) {
      gsap.killTweensOf(windowRef.current);
      gsap.set(windowRef.current, { clearProps: 'display,opacity,width,height' });
      handler();
      return;
    }

    const width = windowRef.current.getBoundingClientRect();

    gsap.set(windowRef.current, {
      minWidth: 0,
      minHeight: 0,

    })
    gsap.to(windowRef.current, {
      scale: 0.8,
      duration: 0.25,
      opacity: 0.8,
      // x: x,
      ease: 'power4.inOut',
    })

    gsap.to(windowRef.current, {
      x: x,
      y: '100vh',
      opacity: 0,
      scale: 0.2,
      width: 0,
      height: 0,
      duration: 0.4,
      display: 'none',
      ease: 'power2.inOut',
      onComplete: () => {
        handler();
      },
    })


  },

  // restoreWindow: (windowRef, handler = () => {
  //   windowRef.current.classList.remove('minimized');
  //   gsap.killTweensOf(windowRef.current);
  //   gsap.set(windowRef.current, { clearProps: 'all' });
  // })
}

export default useWindowAnimations;
