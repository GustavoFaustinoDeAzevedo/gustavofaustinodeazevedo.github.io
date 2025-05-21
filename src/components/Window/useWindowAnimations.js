import gsap from 'gsap';


const useWindowAnimations = {

  openWindow: (windowRef, handler = () => { }) => {
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

  minimizeWindow: (windowRef, handler = () => { }, x, y) => {

    if (!windowRef?.current) return;

    if (windowRef.current.classList.contains('minimized')) {
      gsap.killTweensOf(windowRef.current);
      gsap.set(windowRef.current, { clearProps: 'display,opacity,width,height' });
      handler();
      return;
    }

    const { width } = windowRef.current.getBoundingClientRect();

    const tl = gsap.timeline();
    tl.to(windowRef.current, {
      scale: 0.3,
      duration: 0.4,
      ease: 'power2.inOut',
    }).to(windowRef.current, {
      width: 0,
      x: x,
      duration: 0.2,
    }).to(windowRef.current, {
      y: '100vh',
      scale: 0,
      duration: 0.2,
      display: 'none',
      ease: 'power2.inOut',
      onComplete: () => {
        handler();
      },
    });
  },

  restoreWindow: (windowRef, handler = () => { }, x, y, width, height) => {

    if (!windowRef?.current) return;
    return gsap.to(windowRef.current, {
      x: x,
      y: y,
      width: width,
      height: height,

      scale: 1,
      opacity: 1,
      display: 'flex',
      duration: 0.4,
      ease: 'expo.inOut',
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

export default useWindowAnimations;
