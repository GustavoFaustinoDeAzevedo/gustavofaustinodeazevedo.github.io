import { useRef } from 'react';

const useSeed = (prefix = 'seed') => {
  const seed = useRef(
    `${prefix}-${Math.random().toString(36).substring(2, 8)}`
  );
  return seed.current;
};

export default useSeed;
