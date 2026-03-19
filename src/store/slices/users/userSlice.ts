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
    entities: placeholderUsers,
    currentUserId: 0,
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

export const { addUser, updateUser, removeUser, setCurrentUserId } =
  usersSlice.actions;
export default usersSlice.reducer;
