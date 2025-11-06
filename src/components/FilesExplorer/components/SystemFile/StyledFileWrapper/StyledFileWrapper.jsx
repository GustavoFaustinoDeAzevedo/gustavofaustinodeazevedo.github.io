import styled from 'styled-components';
import Icon from '@/components/ui/GlobalStyles/components/Icon';
import { fileParts } from './fileWrapperStyle';

export const StyledFileWrapper = styled.li`
  ${fileParts({}).wrapper}, &:hover,&:focus {
    background: #0000003a;
  }
`;

export const StyledFileWrapper__Icon = styled(Icon)`
  ${fileParts({}).icon};
  filter: #0000005b;
`;

export const StyledFileWrapper__Text = styled.p`
  ${fileParts({}).text};
  -webkit-line-clamp: ${(props) => props.$lines};
  line-clamp: ${(props) => props.$lines};
`;
