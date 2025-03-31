import { focusWindow, openWindow } from '../actions/windowActions';

const openWindowHandler = (target) => {
  const { state, id, dispatch } = target;
  const lowerCaseId = id?.toLowerCase();

  if (dispatch && lowerCaseId) {
    if (Array.isArray(state.opened) && !state.opened.includes(lowerCaseId)) {
      openWindow(dispatch, lowerCaseId);
      focusWindow(dispatch, lowerCaseId);
    }
  }
};

export const contextMenuData = [
  {
    targetContextId: 'default',
    actions: [
      {
        label: 'View',
        icon: 'view',
        handler: (target) => {},
      },
      { label: 'Sort By', icon: 'sort', handler: () => {} },
      {
        label: 'Refresh',
        icon: 'refresh',
        handler: () => {
          window.location.reload();
        },
      },
      { separator: true },
      { label: 'New', icon: 'plus-circle', handler: () => {} },
      { separator: true },
      {
        label: 'Change Background',
        icon: 'color-picker',
        handler: (target) => {
          openWindowHandler(target);
        },
      },
    ],
  },
  {
    targetContextId: 'desktop-icon',
    actions: [
      {
        label: 'View',
        icon: 'view',
        handler: (target) => {
          openWindowHandler(target);
        },
      },
      { label: 'Sort By', icon: 'sort', handler: () => {} },
      {
        label: 'Refresh',
        icon: 'refresh',
        handler: () => {
          window.location.reload();
        },
      },
      { separator: true },
      { label: 'New', icon: 'plus-circle', handler: () => {} },
      { separator: true },
      {
        label: 'Change Background',
        icon: 'color-picker',
        handler: () => {
          const color = prompt('Enter a color (name or hex):', '#ffffff');
          if (color) {
            document.body.style.backgroundColor = color;
          }
        },
      },
    ],
  },
  {
    targetContextId: 'desktop',
    actions: [
      {
        label: 'View',
        icon: 'view',
        handler: (target) => {},
      },
      { label: 'Sort By', icon: 'sort', handler: () => {} },
      {
        label: 'Refresh',
        icon: 'refresh',
        handler: () => {
          window.location.reload();
        },
      },
      { separator: true },
      { label: 'New', icon: 'plus-circle', handler: () => {} },
      { separator: true },
      {
        label: 'Change Background',
        icon: 'color-picker',
        handler: (target) => {
          openWindowHandler(target);
        },
      },
    ],
  },
];
// { id: 'window', title: 'Projects', icon: 'icon projects' },
// { id: 'icon', title: 'Skills', icon: 'icon skills' },
// { id: 'taskbar', title: 'Contact', icon: 'icon contact' }
