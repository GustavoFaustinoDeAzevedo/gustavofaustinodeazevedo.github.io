import { Language } from '@/store/slices/settings/settingsSlice.types';
import { Choice, HandleChangeBackground } from './changeBackground.data.types';

export type BackgroundPreviewDisplay = 'image' | 'color';

export interface ChangeBackgroundProps {
  handleChangeBackgroundState: (key: string, value: string) => void;
  handleUpdateWindowContent: (content: string) => void;
  language: Language;
  content?: {};
  backgroundPreviewImage?: string;
  backgroundPreviewColor?: string;
  defaultDesktopColor?: string;
  displayChoicesContent?: Choice;
  backgroundPreviewDisplay?: string;
  colorTitle?: string;
}

export interface UseDisplayChoicesContentProps {
  backgroundPreviewDisplay: BackgroundPreviewDisplay;
  language: Language;
}
