import { useMemo, useRef } from 'react';
import { desktopIconsData } from '../../data/desktopIconsData';
import { getDesktopIconProps } from '../../utils/desktopIconsProps';
import DesktopIcon from '../DesktopIcon';

const Background = ({ state, dispatch, desktopRef }) => {

  return (
    <div className="desktop"></div>
  );
};

export default Background;
