import styled from 'styled-components';
import {
  fileWrapperStyle,
  fileWrapperStyle__text,
  fileWrapperStyle__icon,
} from './fileWrapperStyle';
import Icon from '../../../../ui/GlobalStyles/components/Icon';

export const StyledFileWrapper = styled.div`
  ${fileWrapperStyle}, &:hover,&:focus {
    background-color: ${(props) => props.backgroundColorContrast + '33'};
  }
`;

export const StyledFileWrapper__Icon = styled(Icon)`
  ${fileWrapperStyle__icon};
  filter: ${(props) => props.backgroundColorContrast};
`;
export const StyledFileWrapper__Text = styled.p`
  ${fileWrapperStyle__text};
  color: ${(props) => props.backgroundColorContrast};
`;
