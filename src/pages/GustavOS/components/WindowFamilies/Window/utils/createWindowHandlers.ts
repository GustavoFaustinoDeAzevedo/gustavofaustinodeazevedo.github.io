import { useCallback } from 'react';

type WindowAction =
  | 'isRequestingMinimize'
  | 'isRequestingMaximize'
  | 'isRequestingRestore'
  | 'isRequestingClose'
  | 'isRequestingFocus';

const actions: WindowAction[] = [
  'isRequestingMinimize',
  'isRequestingMaximize',
  'isRequestingRestore',
  'isRequestingClose',
  'isRequestingFocus',
];

const useWindowHandlers = (
  updateWindowState: (params: Record<string, any>) => void,
) => {
  return Object.fromEntries(
    actions.map((action) => [
      action.replace(/^isRequesting/, 'handleRequest'),
      useCallback(
        () => updateWindowState({ [action]: true }),
        [updateWindowState],
      ),
    ]),
  );
};

export default useWindowHandlers;
