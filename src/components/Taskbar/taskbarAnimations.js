import gsap from "gsap";

export const minimize = (windowRef, handler) => {
  if (!windowRef.current) return;

  gsap.to(windowRef.current, {
    scale: 0.9,
    opacity: 0,
    duration: 0.2,
    ease: 'power2.inOut',
    onComplete: handler,
  });
};

export const restore = (windowRef, handler) => {
  if (!windowRef.current) return;

  gsap.set(windowRef.current, { scale: 0.9, opacity: 0 });


  handler;
  gsap.to(windowRef.current, {
    scale: 1,
    opacity: 1,
    duration: 0.2,
    ease: 'power2.out',
  });
};