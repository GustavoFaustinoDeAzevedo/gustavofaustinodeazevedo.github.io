export const contextMenuData = [
  {
    id: 'desktop',
    actions: [
      { label: 'View', icon: 'view', handler: (target) => { } },
      { label: 'Sort By', icon: 'sort', handler: () => { } },
      { separator: true },
      { label: 'New', icon: 'plus-circle', handler: () => { } },
      { separator: true },
      { label: 'Refresh', icon: 'refresh', handler: () => { window.location.reload() } }
    ]
  },
  // { id: 'window', title: 'Projects', icon: 'icon projects' },
  // { id: 'icon', title: 'Skills', icon: 'icon skills' },
  // { id: 'taskbar', title: 'Contact', icon: 'icon contact' }
];
