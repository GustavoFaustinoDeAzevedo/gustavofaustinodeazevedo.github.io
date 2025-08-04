import styled from 'styled-components';

interface DesktopBackgroundProps {
  $isBackgroundImage?: boolean;
  $backgroundImage?: string;
  $backgroundColor?: string;
}

const DesktopBackgroundStyled = styled.div<DesktopBackgroundProps>`
  background-image: ${(props) =>
    props.$isBackgroundImage && props.$backgroundImage
      ? `url(${props.$backgroundImage})`
      : 'none'};
  background-color: ${(props) => props.$backgroundColor};
`;

export default DesktopBackgroundStyled;
