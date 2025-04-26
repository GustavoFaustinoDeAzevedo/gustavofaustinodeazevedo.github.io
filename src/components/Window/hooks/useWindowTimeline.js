import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const useWindowTimeline = (windowRef, index, timelineRef) => {


  if (!windowRef?.current) return;
  const x = index * 50 + 80;

  timelineRef.current = gsap.timeline({ paused: true })
    .set(windowRef.current, { minWidth: 0, minHeight: 0 })
    .to(windowRef.current, {
      scale: 0.8,
      opacity: 0.8,
      duration: 0.25,
      ease: 'power4.inOut',
    })
    .to(windowRef.current, {
      x, y: '100vh',
      opacity: 0,
      scale: 0.2,
      width: 0,
      height: 0,
      display: 'none',
      duration: 0.4,
      ease: 'power2.inOut',
    });


  return timelineRef.current;
};

export default useWindowTimeline;
