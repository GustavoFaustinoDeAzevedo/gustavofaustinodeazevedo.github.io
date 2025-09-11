import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Options {
  ref: React.RefObject<HTMLElement | null>;
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

  const effect = () => {
    const element = ref.current;
    if (!element || !trigger) {
      debug && console.log('[useAnimationSafe] skipped');
      return;
    }

    debug && console.log('[useAnimationSafe] start');
    onStart?.();
    const tween = animation(element);
    tweenRef.current = tween ?? null;

    if (tween?.eventCallback && onComplete) {
      tween.eventCallback('onComplete', onComplete);
    }

    return () => {
      debug && console.log('[useAnimationSafe] cleanup');
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  };

  useEffect(effect, [trigger, ...dependencies]);
}
