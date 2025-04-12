import gsap from 'gsap';



const useWindowAnimations = (windowRef, onMaximize) => {
  const openWindow = () => {
    if (!windowRef.current) return;
    gsap.set(windowRef.current, { scale: 0.8, opacity: 0 });
    gsap.to(windowRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const closeWindow = (handler) => {
    if (!windowRef.current) return;
    gsap.to(windowRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.inOut',
      onComplete: handler,
    });
  };

  const maximizeWindow = () => {
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    const clone = windowRef.current.cloneNode(true);

    Object.assign(clone.style, {
      position: 'fixed',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: '0',
      opacity: '1',
      pointerEvents: 'none',
      zIndex: '9999',
    });

    document.body.appendChild(clone);

    gsap.to(clone, {
      x: -rect.left,
      y: -rect.top,
      width: '100vw',
      height: '100vh',
      scale: 1,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        document.body.removeChild(clone);
        windowRef.current.classList.add('maximized');
        onMaximize();
      },
    });
  };

  return { openWindow, closeWindow, maximizeWindow };
};

export default useWindowAnimations;
