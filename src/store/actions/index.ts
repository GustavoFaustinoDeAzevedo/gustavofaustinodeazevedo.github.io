import useWindowActions from './useWindowActions';
import useContextMenuActions from './useContextMenuActions';
import useFilesActions from './useFilesActions';
import useSettingsActions from './useSettingsActions';
import useUserActions from './useUserActions';

export interface StoreActions {
  useWindowActions: typeof useWindowActions;
  useContextMenuActions: typeof useContextMenuActions;
  useFilesActions: typeof useFilesActions;
  useSettingsActions: typeof useSettingsActions;
  useUserActions: typeof useUserActions;
}

const actions: StoreActions = {
  useWindowActions,
  useContextMenuActions,
  useFilesActions,
  useSettingsActions,
  useUserActions,
};

export default actions;
