import { useDispatch } from 'react-redux';
import {
  openWindow,
  closeWindow,
  // focusWindow,
  updateWindow,
  resetFocus,
} from '../slices/window/windowSlice';
import { WindowNode } from '../slices/window/windowSlice.types';

export type WindowData = WindowNode &   Record<string, unknown>;

const useWindowActions = () => {
  const dispatch = useDispatch();

  const handleUpdateWindow = (windowData: WindowData) => {

    dispatch(updateWindow(windowData));
  };

  const handleOpenWindow = (windowData: WindowData) => {
    const data: WindowData =
      typeof windowData === 'string' ? JSON.parse(windowData) : windowData;

    dispatch(openWindow(data));
  };

  // const handleFocusWindow = (windowId: string) => {
  //   dispatch(focusWindow(windowId));
  // };

  const handleCloseWindow = (windowId: string) => {
    dispatch(closeWindow(windowId));
  };

  const handleResetFocus = (windowId: string) => {
    dispatch(resetFocus(windowId));
  };

  return {
    handleOpenWindow,
    handleCloseWindow,
    // handleFocusWindow,
    handleResetFocus,
    handleUpdateWindow,
  };
};

export default useWindowActions;
