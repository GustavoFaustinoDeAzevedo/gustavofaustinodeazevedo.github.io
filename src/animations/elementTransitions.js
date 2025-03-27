import gsap from 'gsap';

const toggleOpenMenuAnimation = (ref, visible) => {
  if (ref.current) {
    if (visible) {
      gsap.fromTo(
        ref.current,
        { y: 0, opacity: 1 },
        { y: '100%', opacity: 0, duration: 0.2, ease: 'power2.inOut' }
      );
    } else {
      // Animation to "slide in" upwards
      gsap.set(ref.current, {
        display: 'flex',
        y: '100%',
        opacity: 0,
      });

      gsap.to(ref.current, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }
};
export default toggleOpenMenuAnimation;