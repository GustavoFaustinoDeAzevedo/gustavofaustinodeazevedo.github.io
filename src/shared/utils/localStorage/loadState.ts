import { RootState } from '@/store';

const loadState = (): (() => RootState) | undefined => {
  try {
    const serialized = localStorage.getItem('reduxState');
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
};

export default loadState;
