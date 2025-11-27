// boot/init.ts
import { useSystemStore } from '../store/systemStore';
import { appsRegistry } from '../registry/apps';
import { FsNode } from '../types/system';

export function boot() {
  const setApps = useSystemStore.setState;
  const setFs = useSystemStore.setState;

  setApps((s) => ({ apps: appsRegistry }));

  const desktop: FsNode = {
    id: 'desktop',
    name: 'Desktop',
    type: 'folder',
    children: [
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

