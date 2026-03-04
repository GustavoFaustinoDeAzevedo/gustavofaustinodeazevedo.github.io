import { WindowMapper } from '@/components';
import { RootState } from '@/store';
import actions from '@/store/actions';
import React from 'react';
import { useSelector } from 'react-redux';

const SystemWindowsList = ({
  bounds,
}: {
  bounds: React.RefObject<HTMLDivElement | null>;
}) => {
  const windowList = useSelector(
    (state: RootState) => state.window.openedWindows,
  );

  const windowActions = actions.useWindowActions();
  // const filesActions = actions.useFilesActions();

  return (
    <WindowMapper
      bounds={bounds}
      windowList={windowList}
      actions={{ windowActions }}
    />
  );
};

export default React.memo(SystemWindowsList);
