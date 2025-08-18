import { Choice } from './changeBackground.data.types';

export type HandleChangeBackground = {
  backgroundImage: string;
};

type Language = 'por' | 'eng';

type BackgroundDisplay = 'image' | 'color';

export interface BackgroundControlProps {
  handleChangeBackground: (value: HandleChangeBackground) => void;
  handleUpdateWindowContent: (content: string) => void;
  language: Language;
  backgroundImage?: string;
  desktopBackgroundColor?: string;
  defaultDesktopColor?: string;
  displayChoicesContent: Choice;
  backgroundDisplay?: BackgroundDisplay;
  colorTitle?: string;
}
