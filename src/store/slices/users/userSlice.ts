import { RootState } from '@/store';
import { placeholderUsers } from './userSlice.data';
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  PayloadAction,
  EntityState,
} from '@reduxjs/toolkit';
import { User, UsersExtraState } from './userSlice.types';

const usersAdapter = createEntityAdapter<User>();

const initialState: EntityState<User, number> & UsersExtraState =
  usersAdapter.getInitialState({
    ids: [1, 2, 3],
    entities: placeholderUsers,
    currentUserId: 1,
    currentUser: null,
    loading: false,
  });

export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetchUsers',
  async () => {
    const res = await fetch('/api/users');
    return res.json();
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    updateUser: usersAdapter.updateOne,
    removeUser: usersAdapter.removeOne,
    setCurrentUserId: (state, action: PayloadAction<number>) => {
      state.currentUserId = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<number>) => {
      const user = state.entities[action.payload];
      if (user) {
        state.currentUser = user;
      } else {
        state.currentUser = state.entities[1] ?? undefined;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const usersSelectors = usersAdapter.getSelectors(
  (state: RootState) => state.users,
);

export const { addUser, updateUser, removeUser, setCurrentUserId, setCurrentUser } =
  usersSlice.actions;
export default usersSlice.reducer;
