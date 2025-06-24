import styled from 'styled-components';
import {
  fileWrapperStyle,
  fileWrapperStyle__text,
  fileWrapperStyle__icon,
} from './fileWrapperStyle';
import Icon from '../../../../ui/GlobalStyles/components/Icon';

export const StyledFileWrapper = styled.div(fileWrapperStyle);
export const StyledFileWrapper__Icon = styled(Icon)(fileWrapperStyle__icon);
export const StyledFileWrapper__Text = styled.p(fileWrapperStyle__text);
