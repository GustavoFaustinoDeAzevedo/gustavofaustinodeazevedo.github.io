const saveState = (state: unknown) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem('reduxState', serialized);
  } catch (err) {
    console.error('Not possible to serialize redux state', err);
  }
};

export default saveState;
