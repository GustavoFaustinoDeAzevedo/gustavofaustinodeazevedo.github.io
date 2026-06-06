import { RefObject } from 'react';
import gsap from 'gsap';

export interface Animations {
  openWindow: (
    ref: RefObject<HTMLElement>,
    w: number,
    h: number
  ) => gsap.core.Tween;
  maximizeWindow: (
    ref: RefObject<HTMLElement>,
    cb: () => void
  ) => gsap.core.Tween;
  restoreWindow: (
    ref: RefObject<HTMLElement>,
    cb: () => void,
    x: number,
    y: number,
    w: number,
    h: number
  ) => gsap.core.Tween;
  minimizeWindow: (
    ref: RefObject<HTMLElement>,
    cb: () => void,
    delay: number
  ) => gsap.core.Tween;
  closeWindow: (ref: RefObject<HTMLElement>, cb: () => void) => gsap.core.Tween;
}

const windowAnimations: Animations = {
  openWindow: (ref, w, h) =>
    gsap.fromTo(
      ref.current!,
      { autoAlpha: 0, scale: 0.8 },
      {
        duration: 0.4,
        autoAlpha: 1,
        scale: 1,
        width: w,
        height: h,
        ease: 'power2.out',
      }
    ),

  maximizeWindow: (ref, cb) =>
    gsap.to(ref.current!, {
      duration: 0.3,
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      ease: 'power2.inOut',
      onComplete: cb,
    }),

  restoreWindow: (ref, cb, x, y, w, h) =>
    gsap.to(ref.current!, {
      duration: 0.3,
      x,
      y,
      width: w,
      height: h,
      ease: 'power2.out',
      onComplete: cb,
    }),

  minimizeWindow: (ref, cb, delay) =>
    gsap.to(ref.current!, {
      duration: 0.3,
      y: window.innerHeight + 50,
      delay,
      ease: 'power1.in',
      onComplete: cb,
    }),

  closeWindow: (ref, cb) =>
    gsap.to(ref.current!, {
      duration: 0.2,
      autoAlpha: 0,
      scale: 0.95,
      ease: 'back.in(1.7)',
      onComplete: cb,
    }),
};

export default windowAnimations;
