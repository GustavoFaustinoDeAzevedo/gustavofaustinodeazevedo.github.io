import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'language',
  initialState: {
    language: 'ENG',
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
