import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DesktopBackgroundStyled from './DesktopBackgroundStyled/DesktopBackgroundStyled';

interface DesktopBackgroundProps {
  className?: string;
}

const DesktopBackground: FC<DesktopBackgroundProps> = ({ className }) => {
  const {
    desktopBackgroundColor,
    desktopBackgroundImage,
    desktopBackgroundEffect,
    desktopBackgroundFilter,
    isBackgroundImage,
  } = useSelector((state: RootState) => state.settings);

  return (
    <DesktopBackgroundStyled
      $isBackgroundImage={isBackgroundImage}
      $backgroundColor={desktopBackgroundColor}
      $backgroundImage={desktopBackgroundImage}
      $filters={desktopBackgroundFilter}
      $effect={desktopBackgroundEffect}
      className={className || 'desktop-background'}
    />
  );
};

export default DesktopBackground;
