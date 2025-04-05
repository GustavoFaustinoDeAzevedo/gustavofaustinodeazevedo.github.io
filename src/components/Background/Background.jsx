import { useMemo, useRef } from 'react';
import { desktopIconsData } from '../../data/desktopIconsData';
import { getDesktopIconProps } from '../../utils/desktopIconsProps';
import DesktopIcon from '../DesktopIcon';

const Background = ({ state, dispatch, desktopRef,onContextMenu }) => {

  return (
    <div className="background" onContextMenu={onContextMenu}></div>
  );
};

export default Background;
