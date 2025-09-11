import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DesktopBackgroundStyled from './DesktopBackgroundStyled/DesktopBackgroundStyled';

interface DesktopBackgroundProps {
  className?: string;
}

const DesktopBackground: FC<DesktopBackgroundProps> = ({ className }) => {
  const backgroundColor = useSelector(
    (state: RootState) => state.settings.desktopBackgroundColor
  );
  const backgroundImage = useSelector(
    (state: RootState) => state.settings.desktopBackgroundImage
  );
  const isBackgroundImage = useSelector(
    (state: RootState) => state.settings.isBackgroundImage
  );

  return (
    <DesktopBackgroundStyled
      $isBackgroundImage={isBackgroundImage}
      $backgroundColor={backgroundColor}
      $backgroundImage={backgroundImage}
      className={className || 'desktop-background'}
    />
  );
};

export default DesktopBackground;
