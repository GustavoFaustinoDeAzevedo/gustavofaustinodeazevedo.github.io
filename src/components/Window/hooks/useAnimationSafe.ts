import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Options {
  ref: React.RefObject<HTMLElement>;
  trigger: boolean;
  animation: (el: HTMLElement) => gsap.core.Tween | void;
  dependencies?: any[];
  onStart?: () => void;
  onComplete?: () => void;
  debug?: boolean;
}

export default function useAnimationSafe({
  ref,
  trigger,
  animation,
  dependencies = [],
  onStart,
  onComplete,
  debug = false,
}: Options) {
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !trigger) {
      debug && console.log('[useAnimationSafe] skipped');
      return;
    }

    debug && console.log('[useAnimationSafe] start');
    onStart?.();
    const tween = animation(el);
    tweenRef.current = tween ?? null;

    if (tween?.eventCallback && onComplete) {
      tween.eventCallback('onComplete', onComplete);
    }

    return () => {
      debug && console.log('[useAnimationSafe] cleanup');
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, ...dependencies]);
}
