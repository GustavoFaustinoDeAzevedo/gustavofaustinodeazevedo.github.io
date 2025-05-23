import actions from '../store/actions';


const openWindowHandler = (target) => {
  const { id } = target;
  const windowActions = actions.useWindowActions();
  const openWindow = windowActions.handleOpenWindow;
  const focusWindow = windowActions.handleFocusWindow;
  const lowerCaseId = id?.toLowerCase();

  if (dispatch && lowerCaseId) {
    if (Array.isArray(state.opened) && !state.opened.includes(lowerCaseId)) {
      openWindow(lowerCaseId);
      focusWindow(lowerCaseId);
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
        type: 'view-action',
        handler: (target) => {
          openWindowHandler(target);
        },
      },
      {
        label: 'Sort By',
        icon: 'sort',
        type: 'sort',
        handler: () => { },
      },
      {
        label: 'Refresh',
        icon: 'refresh',
        type: 'refresh',
        handler: () => {
          window.location.reload();
        },
      },
      { separator: true },
      {
        label: 'New',
        icon: 'plus-circle',
        type: 'new-item',
        handler: () => { },
      },
      { separator: true },
      {
        label: 'Change Background',
        icon: 'color-picker',
        type: 'change-background',
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
        type: 'view-action',
        handler: (target) => {
          openWindowHandler(target);
        },
      },
      {
        label: 'Sort By',
        icon: 'sort',
        type: 'sort',
        handler: () => { },
      },
      {
        label: 'Refresh',
        icon: 'refresh',
        type: 'refresh',
        handler: () => {
          window.location.reload();
        },
      },
      { separator: true },
      {
        label: 'New',
        icon: 'plus-circle',
        type: 'new-item',
        handler: () => { },
      },
      { separator: true },
      {
        label: 'Change Background',
        icon: 'color-picker',
        type: 'change-background',
        handler: (target) => {
          openWindowHandler(target);
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
        type: 'view-action',
        handler: (target) => { },
      },
      {
        label: 'Sort By',
        icon: 'sort',
        type: 'sort',
        handler: () => { },
      },
      {
        label: 'Refresh',
        icon: 'refresh',
        type: 'refresh',
        handler: () => {
          window.location.reload();
        },
      },
      { separator: true },
      {
        label: 'New',
        icon: 'plus-circle',
        type: 'new-item',
        handler: () => { },
      },
      { separator: true },
      {
        label: 'Change Background',
        icon: 'color-picker',
        type: 'change-background',
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
