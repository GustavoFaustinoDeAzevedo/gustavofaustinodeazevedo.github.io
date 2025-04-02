export const focusWindow = (dispatch, id) => {
  dispatch({
    type: "FOCUS_WINDOW",
    payload: id
  });
};

export const openWindow = (dispatch, id) => {
  dispatch({
    type: "OPEN_WINDOW",
    payload: id
  });
};

export const maximizeWindow = (dispatch, id) => {
  dispatch({
    type: "MAXIMIZE_WINDOW",
    payload: id
  });
};

export const closeWindow = (dispatch, id) => {
  dispatch({
    type: "CLOSE_WINDOW",
    payload: id
  });
};

export const minimizeWindow = (dispatch, id) => {
  dispatch({
    type: "MINIMIZE_WINDOW",
    payload: id
  });
};

export const showContextMenu = (dispatch, x, y, target, element) => {
  dispatch({
    type: "SHOW_CONTEXT_MENU",
    payload: { x, y, target, element }
  });
};

export const hideContextMenu = (dispatch) => {
  dispatch({
    type: "HIDE_CONTEXT_MENU"
  });
};

export const changeLanguage = (dispatch, language) => {
  dispatch({
    type: "CHANGE_LANGUAGE",
    payload: language
  });
};

export const resetFocus = (dispatch) => {
  dispatch({
    type: "RESET_FOCUS",
  });
};

export const addIcon = (dispatch, props) => {
  dispatch({
    type: "ADD_ICON",
    payload: props
  });
};

export const removeIcon = (dispatch, props) => {
  dispatch({
    type: "REMOVE_ICON",
    payload: props
  });
};

export const sortIcons = (dispatch, props) => {
  dispatch({
    type: "SORT_ICONS",
  });
};

