import { RefObject } from 'react';
import gsap from 'gsap';

export interface Animations {
  openWindow: (ref: RefObject<HTMLElement>, w: number, h: number) => void;
  maximizeWindow: (ref: RefObject<HTMLElement>, cb: () => void) => void;
  restoreWindow: (
    ref: RefObject<HTMLElement>,
    cb: () => void,
    x: number,
    y: number,
    w: number,
    h: number
  ) => void;
  minimizeWindow: (
    ref: RefObject<HTMLElement>,
    cb: () => void,
    delay: number
  ) => void;
  closeWindow: (ref: RefObject<HTMLElement>, cb: () => void) => void;
}

const windowAnimations: Animations = {
  openWindow: (ref, w, h) => {
    gsap.fromTo(
      ref.current!,
      { autoAlpha: 0, scale: 0.8 },
      { duration: 0.4, autoAlpha: 1, scale: 1, width: w, height: h }
    );
  },

  maximizeWindow: (ref, cb) => {
    gsap.to(ref.current!, {
      duration: 0.3,
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      onComplete: cb,
    });
  },

  restoreWindow: (ref, cb, x, y, w, h) => {
    gsap.to(ref.current!, {
      duration: 0.3,
      x,
      y,
      width: w,
      height: h,
      onComplete: cb,
    });
  },

  minimizeWindow: (ref, cb, delay) => {
    gsap.to(ref.current!, {
      duration: 0.3,
      y: window.innerHeight + 50,
      delay,
      onComplete: cb,
    });
  },

  closeWindow: (ref, cb) => {
    gsap.to(ref.current!, {
      duration: 0.2,
      autoAlpha: 0,
      onComplete: cb,
    });
  },
};

export default windowAnimations;
