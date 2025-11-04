import styled from 'styled-components';
import {
  fileWrapperStyle,
  fileWrapperStyle__text,
  fileWrapperStyle__icon,
} from './fileWrapperStyle';
import Icon from '@/components/ui/GlobalStyles/components/Icon';

export const StyledFileWrapper = styled.div`
  ${fileWrapperStyle}, &:hover,&:focus {
    background-color: var(--color-light);
  }
`;

export const StyledFileWrapper__Icon = styled(Icon)`
  ${fileWrapperStyle__icon};
  filter: var(--color-light);
`;

export const StyledFileWrapper__Text = styled.p`
  ${fileWrapperStyle__text};
  -webkit-line-clamp: ${(props) => props.$lines};
  line-clamp: ${(props) => props.$lines};
`;
