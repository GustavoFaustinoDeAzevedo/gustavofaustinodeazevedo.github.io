import { useMemo } from 'react';
import DesktopIcon from '../components/DesktopIcon';
import { getDesktopIconProps } from '../utils/desktopIconsProps';

export const useDesktopIconsList = ({ desktopIconsData, state, dispatch }) => {
  return useMemo(
    () =>
      desktopIconsData.map(({ id, title, icon }, index) => (
        <DesktopIcon
          key={`desktop-icon-${id}-${index}`}
          {...getDesktopIconProps(state, dispatch, id, title, icon)}
        />
      )),
    [desktopIconsData, state, dispatch]
  );
};
