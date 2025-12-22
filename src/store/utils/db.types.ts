import { FileSliceState } from '../slices/file';
import { SettingsSliceState } from '../slices/settings';
import { WindowSliceState } from '../slices/window';

export default interface User {
  id: number;
  name: string;
  config: {
    window: WindowSliceState;
    settings: SettingsSliceState;
    file: FileSliceState;
  };
}
