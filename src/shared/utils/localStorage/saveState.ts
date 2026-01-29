import { RootState } from '@/store';

const saveState = (state: RootState) => {
  const isDataPersistent = state.settings?.isDataPersistent;
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem('isDataPersistent', isDataPersistent.toString());
    localStorage.setItem('reduxState', serialized);
  } catch (err) {
    console.error('Not possible to serialize redux state', err);
  }
};

export default saveState;
