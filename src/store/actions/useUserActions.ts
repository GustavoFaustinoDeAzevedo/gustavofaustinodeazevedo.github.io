import { useDispatch } from 'react-redux';
import {
  addUser,
  loadUsers,
  removeUser,
  updateUser,
} from '../slices/user/userSlice';
import User from '../utils/db.types';

const useUserActions = () => {
  const dispatch = useDispatch();

  const handleNewUser = (payload: User) => {
    dispatch(addUser(payload));
  };

  const handleLoadUsers = (payload: User[]) => {
    dispatch(loadUsers(payload));
  };

  const handleUpdateUser = (payload: User) => {
    dispatch(updateUser(payload));
  };

  const handleRemoveUser = (id: number) => {
    dispatch(removeUser(id));
  };

  return { handleNewUser, handleLoadUsers, handleUpdateUser, handleRemoveUser };
};

export default useUserActions;
