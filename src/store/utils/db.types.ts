import { FileNode } from '../slices/file';
import { SettingsSliceState } from '../slices/settings';
import { WindowSliceState } from '../slices/window';

export default interface User {
  id: number;
  name: string;

  config: {
    apps: string[];
    permission: string;
    folders: string[];
    store: {
      window: WindowSliceState;
      settings: SettingsSliceState;
      userFolders: FileNode[];
      appsConfig: Record<string, any>;
    };
  };
}
