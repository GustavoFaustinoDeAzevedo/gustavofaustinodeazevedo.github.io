import { RootState } from '@/store';

const loadState = (): [() => RootState, boolean] | [undefined, false] => {
  try {
    const serialized = localStorage.getItem('reduxState');
    const isDataPersistent =
      localStorage.getItem('isDataPersistent') === 'true';

    console.log('isDataPersistent', isDataPersistent);
    if (serialized === null || isDataPersistent === null)
      return [undefined, false];
    return [JSON.parse(serialized), isDataPersistent];
  } catch (err) {
    return [undefined, false];
  }
};

export default loadState;
