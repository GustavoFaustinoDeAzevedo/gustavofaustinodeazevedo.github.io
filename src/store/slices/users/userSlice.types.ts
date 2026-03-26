import { FileNode } from '../file';
import { SettingsSliceState } from '../settings';
import { WindowSliceState } from '../window';

export interface User {
  id: number;
  name: string | { eng: string; por: string };
  config: {
    apps: string[];
    roles: string[];
    store: {
      window: WindowSliceState;
      settings: SettingsSliceState;
      userFolders: FileNode[];
      appsConfig: Record<string, any>;
    };
  };
}

export interface UsersExtraState {
  currentUserId: number;
  currentUser: User | null;
  loading: boolean;
}
