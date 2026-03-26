import { useDispatch } from 'react-redux';
import {
  addUser,
  // loadUsers,
  setCurrentUser,
  setCurrentUserId,
  removeUser,
  updateUser,
} from '../slices/users/userSlice';
import User from '../utils/db.types';

const useUserActions = () => {
  const dispatch = useDispatch();

  const handleNewUser = (payload: User) => {
    dispatch(addUser(payload));
  };

  const handleCurrentUserId = (payload: number) => {
    dispatch(setCurrentUserId(payload));
  };

  const handleCurrentUser = (payload: number) => {
    dispatch(setCurrentUser(payload));
  };

  const handleUpdateUser = (payload: User) => {
    dispatch(updateUser({ id: payload.id, changes: payload }));
  };

  const handleRemoveUser = (id: number) => {
    dispatch(removeUser(id));
  };

  return {
    handleNewUser,
    handleCurrentUser,
    handleUpdateUser,
    handleRemoveUser,
    handleCurrentUserId,
  };
};

export default useUserActions;
