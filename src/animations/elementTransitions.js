import gsap from 'gsap';

const toggleOpenMenuAnimation = (ref, visible) => {
  if (ref.current) {
    if (visible) {
      gsap.fromTo(
        ref.current,
        { y: 0, opacity: 1 },
        { y: '100%', opacity: 0, duration: 0.1, ease: 'power1.out' }
      );
    } else {
      // Animation to "slide in" upwards
      gsap.set(ref.current, {
        display: 'block',
        y: '100%',
        opacity: 0,
      });

      gsap.to(ref.current, {
        y: 0,
        opacity: 1,
        duration: 0.1,
        ease: 'power1.in',
      });
    }
  }
};
export default toggleOpenMenuAnimation;