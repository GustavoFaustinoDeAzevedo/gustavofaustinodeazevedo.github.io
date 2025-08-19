import { Language } from '@/store/slices/settingsSlice';
import { Choice, HandleChangeBackground } from './changeBackground.data.types';

export type BackgroundDisplay = 'image' | 'color';

export interface ChangeBackgroundProps {
  handleChangeBackground: (value: HandleChangeBackground) => void;
  handleUpdateWindowContent: (content: string) => void;
  language: Language;
  content?: {};
  backgroundImage?: string;
  desktopBackgroundColor?: string;
  defaultDesktopColor?: string;
  displayChoicesContent?: Choice;
  backgroundDisplay?: string;
  colorTitle?: string;
}

export interface UseDisplayChoicesContentProps {
  backgroundDisplay: BackgroundDisplay;
  language: Language;
}
