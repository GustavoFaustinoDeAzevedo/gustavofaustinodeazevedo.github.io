import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const rolesAdapter = createEntityAdapter();

const initialState = rolesAdapter.getInitialState({
  entities: {
    admin: {
      name: 'admin',
      permissions: ['READ_FILE', 'WRITE_FILE', 'DELETE_FILE'],
    },
    standard: {
      name: 'standard',
      permissions: ['READ_FILE', 'WRITE_FILE', 'DELETE_FILE'],
    },
    guest: { name: 'guest', permissions: ['READ_FILE'] },
  },
});

const permissionsSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: rolesAdapter.addOne,
    updateRole: rolesAdapter.updateOne,
    removeRole: rolesAdapter.removeOne,
  },
});

export const { addRole, updateRole, removeRole } = permissionsSlice.actions;
export default permissionsSlice.reducer;
