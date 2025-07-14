import { useDispatch } from 'react-redux';
import {
  openWindow,
  closeWindow,
  focusWindow,
  updateWindow,
  resetFocus,
} from '../slices/windowSlice';

interface WindowChild {
  fileId: string;
  title: string;
}

interface WindowDataBase {
  windowId: string;
  title: string;
  icon?: string;
  src?: string;
  children?: WindowChild[];
  isUnique?: boolean;
  type?: string;
  nodeDepth?: number;
}

type WindowData = WindowDataBase & Record<string, unknown>;

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

  const handleFocusWindow = (windowId: string) => {
    dispatch(focusWindow(windowId));
  };

  const handleCloseWindow = (windowId: string) => {
    dispatch(closeWindow(windowId));
  };

  const handleResetFocus = () => {
    dispatch(resetFocus());
  };

  return {
    handleOpenWindow,
    handleCloseWindow,
    handleFocusWindow,
    handleResetFocus,
    handleUpdateWindow,
  };
};

export default useWindowActions;
