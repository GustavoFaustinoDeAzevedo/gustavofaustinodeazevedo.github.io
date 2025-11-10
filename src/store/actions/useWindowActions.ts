import { useDispatch } from 'react-redux';
import {
  openWindow,
  closeWindow,
  generalFocus,
  updateWindow,
  resetFocus,
} from '../slices/window/windowSlice';
import { WindowNode } from '../slices/window/windowSlice.types';

export type WindowData = WindowNode & Record<string, unknown>;

const useWindowActions = () => {
  const dispatch = useDispatch();

  const handleUpdateWindow = (windowData: WindowData) => {
    dispatch(updateWindow(windowData));
  };

  const handleOpenWindow = (windowData: WindowData) => {
    dispatch(openWindow(windowData));
  };

  const handleCloseWindow = (windowId: string) => {
    dispatch(closeWindow(windowId));
  };

  const handleGeneralFocus = (windowId: string) => {
    dispatch(generalFocus(windowId));
  };

  const handleResetFocus = (windowId: string) => {
    dispatch(resetFocus(windowId));
  };

  return {
    handleOpenWindow,
    handleCloseWindow,
    handleGeneralFocus,
    handleResetFocus,
    handleUpdateWindow,
  };
};

export default useWindowActions;
