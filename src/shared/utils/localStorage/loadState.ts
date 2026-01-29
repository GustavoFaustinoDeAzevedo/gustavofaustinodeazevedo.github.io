import { RootState } from '@/store';

const loadState = (): [() => RootState, boolean] | undefined => {
  try {
    const serialized = localStorage.getItem('reduxState');
    const isDataPersistent =
      localStorage.getItem('isDataPersistent') === 'true';

    console.log('isDataPersistent', isDataPersistent);
    if (serialized === null || isDataPersistent === null) return undefined;
    return [JSON.parse(serialized), isDataPersistent];
  } catch (err) {
    return undefined;
  }
};

export default loadState;
