import { useReducer, useRef } from "react";
import { windowReducer, initialState } from "../reducers/windowReducer";

export function useDesktop() {
  const [state, dispatch] = useReducer(windowReducer, initialState);
  const desktopRef = useRef(null);

  return { state, dispatch, desktopRef };
}
