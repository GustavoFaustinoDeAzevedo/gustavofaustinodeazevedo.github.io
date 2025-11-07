import styled from 'styled-components';
import Icon from '@/components/ui/GlobalStyles/components/Icon';
import { fileParts } from './fileWrapperStyle';

export const StyledFileWrapper = styled.li`
  ${(props) => fileParts(props).wrapper}
`;

export const StyledFileWrapper__Icon = styled(Icon)`
  ${(props) => fileParts(props).icon};
`;

export const StyledFileWrapper__Text = styled.p`
  ${(props) => fileParts(props).text};
`;
