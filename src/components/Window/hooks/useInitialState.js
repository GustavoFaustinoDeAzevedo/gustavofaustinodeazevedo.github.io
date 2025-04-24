import { useRef } from 'react';
import gsap from 'gsap';

export default function useInitialState(ref) {
  const initialState = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const updateInitialState = () => {
    const x = gsap.getProperty(ref.current, 'x');
    const y = gsap.getProperty(ref.current, 'y');
    const { width, height } = ref.current.getBoundingClientRect();
    initialState.current = { x, y, width, height };
  };

  return { initialState: initialState.current, updateInitialState };
}
