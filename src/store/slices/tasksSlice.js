import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'processes',
  initialState: {
    ram: 8000,
    threads: 12,
    cores: 6,
    systemProcesses: [],
    userProcesses: [],
    backgroundServices: [],
    highUsageProcesses: [],
    suspendedProcesses: [],
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = settingsSlice.actions;
export default tasksSlice.reducer;
