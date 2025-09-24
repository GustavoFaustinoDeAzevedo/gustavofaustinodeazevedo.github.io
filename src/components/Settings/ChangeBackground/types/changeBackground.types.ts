import { Language } from '@/store/slices/settings/settingsSlice.types';
import { Choice, HandleChangeBackground } from './changeBackground.data.types';

export type BackgroundPreviewDisplay = 'image' | 'color';

export interface ChangeBackgroundProps {
  handleChangeBackground: (value: HandleChangeBackground) => void;
  handleUpdateWindowContent: (content: string) => void;
  language: Language;
  content?: {};
  backgroundImage?: string;
  desktopBackgroundColor?: string;
  defaultDesktopColor?: string;
  displayChoicesContent?: Choice;
  backgroundPreviewDisplay?: string;
  colorTitle?: string;
}

export interface UseDisplayChoicesContentProps {
  backgroundPreviewDisplay: BackgroundPreviewDisplay;
  language: Language;
}
