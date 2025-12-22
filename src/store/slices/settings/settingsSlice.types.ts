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

export type Filters = {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hue: number;
  invert: number;
  saturation: number;
  sepia: number;
};

export type FilterValues = {
  preset: string;
  custom: Filters;
  values: Filters;
};

export type EffectValues = {
  active: 'linear' | 'radial' | 'conic' | '' | 'none';
  mirrored: boolean;
  inverted: boolean;
  angle: number;
};

//interface de estado para o slice de configurações
export interface SettingsSliceState {
  language: Language;
  isMobile: boolean;
  desktopBackgroundDefaultColor: string;
  desktopBackgroundColor: string;
  desktopBackgroundColorContrast: string;
  desktopBackgroundEffect: EffectValues;
  desktopBackgroundFilter: FilterValues;
  desktopBackgroundImage: string;
  isBackgroundImage: boolean;
  isDoubleClick: boolean;
}
