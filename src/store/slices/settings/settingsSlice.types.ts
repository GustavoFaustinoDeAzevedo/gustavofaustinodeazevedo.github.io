// Linguagens suportadas
export type Language = 'eng' | 'por';

// Formato do payload das configurações de tema para alteração de fundo
export interface BackgroundPayload {
  desktopBackgroundColor?: string;
  desktopBackgroundColorContrast?: string;
  desktopBackgroundEffect?: EffectValues;
  desktopBackgroundFilter?: FilterValues;
  desktopBackgroundImage?: string;
  isBackgroundImage?: boolean;
}

export type FilterValues = {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  saturate: number;
  sepia: number;
};

export type EffectValue = {
  linear: number;
  radial: number;
  conic: number;
};

export type EffectValues = {
  active: string;
  gradient: EffectValue;
};

//interface de estado para o slice de configurações
export interface SettingsState {
  language: Language;
  desktopBackgroundDefaultColor: string;
  desktopBackgroundColor: string;
  desktopBackgroundColorContrast: string;
  desktopBackgroundEffect: EffectValues;
  desktopBackgroundFilter: FilterValues;
  desktopBackgroundImage: string;
  isBackgroundImage: boolean;
  isDoubleClick: boolean;
}
