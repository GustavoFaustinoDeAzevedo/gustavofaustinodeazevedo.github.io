import { focusWindow, openWindow } from "../actions/windowActions";

const openWindowHandler = (target) => {
  const { id, title, icon, handler } = target;
  openWindow(dispatch, id, title, icon);
  focusWindow(dispatch, id);
}

export const contextMenuData = [
  {
    id: 'default',
    actions: [
      { label: 'View', icon: 'view', handler: (target) => { openWindowHandler(target) } },
      { label: 'Sort By', icon: 'sort', handler: () => { } },
      { label: 'Refresh', icon: 'refresh', handler: () => { window.location.reload() } },
      { separator: true },
      { label: 'New', icon: 'plus-circle', handler: () => { } },
      { separator: true },
      {
        label: 'Change Background', icon: 'color-picker', handler: () => {
          const color = prompt("Enter a color (name or hex):", "#ffffff");
          if (color) {
            document.body.style.backgroundColor = color;
          }
        }
      }
    ]
  },
  {
    id: 'desktopIcon',
    actions: [
      { label: 'View', icon: 'view', handler: (target) => { openWindowHandler(target) } },
      { label: 'Sort By', icon: 'sort', handler: () => { } },
      { label: 'Refresh', icon: 'refresh', handler: () => { window.location.reload() } },
      { separator: true },
      { label: 'New', icon: 'plus-circle', handler: () => { } },
      { separator: true },
      {
        label: 'Change Background', icon: 'color-picker', handler: () => {
          const color = prompt("Enter a color (name or hex):", "#ffffff");
          if (color) {
            document.body.style.backgroundColor = color;
          }
        }
      }
    ]
  },
  {
    id: 'desktop',
    actions: [
      { label: 'View', icon: 'view', handler: (target) => { openWindowHandler(target) } },
      { label: 'Sort By', icon: 'sort', handler: () => { } },
      { label: 'Refresh', icon: 'refresh', handler: () => { window.location.reload() } },
      { separator: true },
      { label: 'New', icon: 'plus-circle', handler: () => { } },
      { separator: true },
      {
        label: 'Change Background', icon: 'color-picker', handler: () => {
          const color = prompt("Enter a color (name or hex):", "#ffffff");
          if (color) {
            document.body.style.backgroundColor = color;
          }
        }
      }
    ]
  }
]
  // { id: 'window', title: 'Projects', icon: 'icon projects' },
  // { id: 'icon', title: 'Skills', icon: 'icon skills' },
  // { id: 'taskbar', title: 'Contact', icon: 'icon contact' }
  ;
