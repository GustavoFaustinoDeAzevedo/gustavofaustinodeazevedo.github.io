import useWindowActions from './useWindowActions';
import useContextMenuActions from './useContextMenuActions';
import useFilesActions from './useFilesActions';
import useSettingsActions from './useSettingsActions';

/**
 * Aggregates all custom hooks that dispatch Redux actions.
 */
export interface StoreActions {
  useWindowActions: typeof useWindowActions;
  useContextMenuActions: typeof useContextMenuActions;
  useFilesActions: typeof useFilesActions;
  useSettingsActions: typeof useSettingsActions;
}

const actions: StoreActions = {
  useWindowActions,
  useContextMenuActions,
  useFilesActions,
  useSettingsActions,
};

export default actions;
