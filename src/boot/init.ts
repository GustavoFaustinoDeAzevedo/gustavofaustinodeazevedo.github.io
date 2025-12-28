// boot/init.ts

import { FileNode } from '@/store/slices/file';

export function boot() {

  setApps((s) => ({ apps: appsRegistry }));

  const desktop: FileNode = {
    id: 'desktop',
    name: 'Desktop',
    type: 'folder',
    content: [
      { id: 'shortcut-notepad', name: 'Notepad', type: 'app-shortcut', targetAppId: 'notepad' },
      { id: 'shortcut-about', name: 'Sobre', type: 'app-shortcut', targetAppId: 'about' },
    ],
  };

  setFs((s) => ({ fsRoot: { ...s.fsRoot, children: [desktop] } }));

  // Carregar estado salvo
  const saved = localStorage.getItem('os-state');
  if (saved) {
    const parsed = JSON.parse(saved);
    useSystemStore.setState(parsed);
  }

  // Auto-save
  useSystemStore.subscribe((state) => {
    localStorage.setItem('os-state', JSON.stringify(state));
  });
}

