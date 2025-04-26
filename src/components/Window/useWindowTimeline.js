import gsap from 'gsap';
import { useEffect, useRef } from 'react';


const useWindowTimeline = (windowRef, index) => {
  if (!windowRef || typeof windowRef.current === 'undefined') {
    console.error('Invalid windowRef passed to useWindowTimeline. Ensure it is a valid ref object.');
    return null;
  }
  const timeline = useRef(null);

  useEffect(() => {
    if (!windowRef.current) return;

    timeline.current = gsap.timeline({ paused: true });

    timeline.current.addLabel('show', 0)
      .fromTo(
        windowRef.current,
        { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        'show'
      ).addLabel('showEnd', '+=0.1');

    timeline.current.addLabel('maximize', 'showEnd+=0.5')
      .to(
        windowRef.current,
        { width: '100vw', height: '100vh', duration: 0.5, ease: 'power2.inOut' },
        'maximize'
      ).addLabel('maximizeEnd', '+=0.1');


    timeline.current.addLabel('minimize', 'maximizeEnd+=0.5')
      .set(windowRef.current, { minWidth: 0, minHeight: 0 }, 'minimize')
      .to(windowRef.current, {
        scale: 0.8,
        opacity: 0.8,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .to(windowRef.current, {
        x: index * 50 + 80,
        y: '100vh',
        opacity: 0,
        scale: 0.2,
        width: 0,
        height: 0,
        display: 'none',
        duration: 0.4,
        ease: 'power2.inOut',
      }).addLabel('minimizeEnd', '+=0.25');

    timeline.current.addLabel('restore', 'minimizeEnd+=0.5')
      .to(
        windowRef.current,
        { width: '400px', height: '300px', duration: 0.5, ease: 'power2.inOut' },
        'restore'
      ).addLabel('restoreEnd', '+=0.1');;

    timeline.current.addLabel('close', 'restoreEnd+=0.5')
      .to(
        windowRef.current,
        { autoAlpha: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' },
        'close'
      ).addLabel('closeEnd', '+=0.1');
  }, []);

  return timeline;
};

export default useWindowTimeline;