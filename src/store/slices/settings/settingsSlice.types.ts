// Linguagens suportadas
export type Language = 'eng' | 'por';

// Formato do payload das configurações de tema para alteração de fundo
export interface BackgroundPayload {
  backgroundColor?: string;
  backgroundColorContrast?: string;
  backgroundEffect?: string;
  backgroundImage?: string;
  isBackgroundImage?: boolean;
}

//interface de estado para o slice de configurações
export interface SettingsState {
  language: Language;
  desktopBackgroundColor: string;
  desktopBackgroundColorContrast: string;
  desktopBackgroundEffect: string;
  desktopBackgroundImage: string;
  isBackgroundImage?: boolean;
  isDoubleClick?: boolean;
}
