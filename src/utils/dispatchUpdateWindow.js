import { useDispatch } from 'react-redux';
import { moveWindow, resizeWindow, updateWindowTitleIcon, toggleWindowState, updateWindowContent } from './windowSlice';

/**
 * Dispatches updates dynamically to the correct Redux reducer.
 *
 * @param {Function} dispatch - Redux dispatch function.
 * @param {Object} payload - Update payload containing `id` and update properties.
 */
const dispatchUpdateWindow = (dispatch, { id, ...updates }) => {
  if (!id) {
    console.error('Window ID is required for update.');
    return;
  }

  if (updates.x !== undefined || updates.y !== undefined) {
    dispatch(moveWindow({ id, x: updates.x, y: updates.y }));
  }

  if (updates.width !== undefined || updates.height !== undefined) {
    dispatch(resizeWindow({ id, width: updates.width, height: updates.height }));
  }

  if (updates.title !== undefined || updates.icon !== undefined) {
    dispatch(updateWindowTitleIcon({ id, title: updates.title, icon: updates.icon }));
  }

  if (updates.minimized !== undefined || updates.maximized !== undefined ||
    updates.requestingClose !== undefined || updates.requestingMinimize !== undefined ||
    updates.requestingMaximize !== undefined) {
    dispatch(toggleWindowState({ id, ...updates }));
  }

  if (updates.content !== undefined) {
    dispatch(updateWindowContent({ id, content: updates.content }));
  }

};

export default dispatchUpdateWindow
