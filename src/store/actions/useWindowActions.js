// src/hooks/useWindowActions.js
import { useDispatch } from 'react-redux';
import { openWindow, closeWindow, focusWindow, updateWindow, resetFocus } from '../slices/windowSlice';

const useWindowActions = () => {
  const dispatch = useDispatch();

  const handleUpdateWindow = (windowData) => {
    dispatch(updateWindow(windowData));
  };

  const handleOpenWindow = (windowData) => {
    const data = typeof windowData === 'string' ? JSON.parse(windowData) : windowData;
    const { windowId, title, icon, src, children, isUnique, type, nodeDepth } = data;
    dispatch(openWindow({ windowId, title, icon, src, children, isUnique, type, nodeDepth }));
  };

  const handleFocusWindow = (windowId) => {
    dispatch(focusWindow(windowId));
  };

  const handleCloseWindow = (windowId) => {
    dispatch(closeWindow(windowId));
  };

  const handleResetFocus = () => {
    dispatch(resetFocus());
  };

  return { handleOpenWindow, handleCloseWindow, handleFocusWindow, handleResetFocus, handleUpdateWindow };
};

export default useWindowActions;
