import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const useWindowTimeline = (ref, index) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!ref?.current) return;
    const x = index * 50 + 80;

    timelineRef.current = gsap.timeline({ paused: true })
      .set(ref.current, { minWidth: 0, minHeight: 0 })
      .to(ref.current, {
        scale: 0.8,
        opacity: 0.8,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .to(ref.current, {
        x, y: '100vh',
        opacity: 0,
        scale: 0.2,
        width: 0,
        height: 0,
        display: 'none',
        duration: 0.4,
        ease: 'power2.inOut',
      });
  }, [ref, index]);

  return timelineRef;
};

export default useWindowTimeline;
