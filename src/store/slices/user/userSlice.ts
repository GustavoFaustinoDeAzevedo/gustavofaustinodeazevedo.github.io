import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usersInitialState } from './userSlice.data';

const initialState = {
  users: usersInitialState,
  currentUser: usersInitialState[0],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },

    loadUsers: (state, action) => {
      state.users = action.payload;
    },

    updateUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      state.users[userIndex] = action.payload;
    },

    removeUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload,
      );
      state.users.splice(userIndex, 1);
    },
  },
});

export const { addUser, loadUsers, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
