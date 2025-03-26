import { useReducer, useRef } from "react";
import { desktopReducer, initialState } from "../reducers/desktopReducer";

export function useDesktop() {
  const [state, dispatch] = useReducer(desktopReducer, initialState);
  const desktopRef = useRef(null);

  return { state, dispatch, desktopRef };
}
