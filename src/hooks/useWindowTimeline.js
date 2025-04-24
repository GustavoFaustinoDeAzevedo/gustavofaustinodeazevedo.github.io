export default function useWindowTimeline(ref, index) {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const x = index * 50 + 80;

    timelineRef.current = gsap.timeline({ paused: true })
      .add(() => gsap.set(ref.current, {
        opacity: 1,
        minWidth: 0,
        minHeight: 0,
      }))
      .to(ref.current, {
        scale: 0.8,
        duration: 0.25,
        opacity: 0.8,
        ease: 'power4.inOut',
      })
      .to(ref.current, {
        x, y: '100vh',
        opacity: 0,
        scale: 0.2,
        width: 0,
        height: 0,
        duration: 0.4,
        display: 'none',
        ease: 'power2.inOut',
      });
  }, []);

  return timelineRef;
}
