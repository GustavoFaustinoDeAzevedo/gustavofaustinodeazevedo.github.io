import styled from 'styled-components';
import {
  fileWrapperStyle,
  fileWrapperStyle__text,
  fileWrapperStyle__icon,
} from './fileWrapperStyle';
import Icon from '@/components/ui/GlobalStyles/components/Icon';

export const StyledFileWrapper = styled.li`
  ${fileWrapperStyle}, &:hover,&:focus {
    background: #0000003a;
  }
`;

export const StyledFileWrapper__Icon = styled(Icon)`
  ${fileWrapperStyle__icon};
  filter: #0000005B;
`;

export const StyledFileWrapper__Text = styled.p`
  ${fileWrapperStyle__text};
  -webkit-line-clamp: ${(props) => props.$lines};
  line-clamp: ${(props) => props.$lines};
`;
