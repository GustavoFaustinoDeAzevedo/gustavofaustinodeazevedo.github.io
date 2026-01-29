import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SettingsSliceState,
  Language,
  BackgroundPayload,
  EffectValues,
  FilterValues,
} from './settingsSlice.types';
import { useIsMobile } from '@/shared';
import updateStateIfDefined from '@/store/utils/updateStateIfDefined';

const navigatorLanguage =
  (typeof navigator !== 'undefined' && navigator.language) || 'en-US';

const defaultLanguage: Language = navigatorLanguage.startsWith('pt')
  ? 'por'
  : 'eng';

const defaultBackgroundColor = '#13538A';

const defaultBackgroundColorContrast = '#ffffff';
const defaultFilterPreset = 'default';

const defaultCustomFilterValues = {
  brightness: 0.9,
  contrast: 1,
  saturation: 0.9,
  grayscale: 0,
  hue: 0,
  blur: 1,
  invert: 0,
  sepia: 0,
};
const defaultFilterValues = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  grayscale: 0,
  hue: 0,
  blur: 0,
  invert: 0,
  sepia: 0,
};

const defaultFilter: FilterValues = {
  preset: defaultFilterPreset,
  custom: defaultCustomFilterValues,
  values: defaultFilterValues,
};

const defaultEffect: EffectValues = {
  active: 'linear',
  mirrored: true,
  inverted: true,
  angle: 0,
};

const checkIsMobile = (): boolean => {
  const screenCheck: boolean = window.matchMedia('(max-width: 768px)').matches;
  const userAgentCheck: boolean =
    /android|iphone|ipad|ipod|blackberry|windows phone/i.test(
      navigator.userAgent,
    );
  return screenCheck || userAgentCheck;
};
const isMobile = checkIsMobile();

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

export const desktopBackgroundInitialImage =
  'images/Wallpapers/winluk06-tree-6147402.jpg'; // `https://picsum.photos/${viewportWidth}/${viewportHeight}`;

const initialState: SettingsSliceState = {
  language: defaultLanguage,
  isMobile: isMobile,
  isDataPersistent: true,
  desktopBackgroundDefaultColor: defaultBackgroundColor,
  desktopBackgroundColor: defaultBackgroundColor,
  desktopBackgroundColorContrast: defaultBackgroundColorContrast,
  desktopBackgroundFilter: defaultFilter,
  desktopBackgroundEffect: defaultEffect,
  desktopBackgroundImage: desktopBackgroundInitialImage, //'/images/netti_Nu_Nu-cat-6342145_640.jpg',
  isBackgroundImage: true,
  isDoubleClick: true,
};

// Criação do slice
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    changeBackground: (state, action: PayloadAction<BackgroundPayload>) => {
      const {
        desktopBackgroundColor,
        desktopBackgroundColorContrast,
        desktopBackgroundEffect,
        desktopBackgroundImage,
        desktopBackgroundFilter,
        isBackgroundImage,
      } = action.payload;

      Object.assign(state, {
        ...(desktopBackgroundColor !== undefined && {
          desktopBackgroundColor: desktopBackgroundColor,
        }),
        ...(desktopBackgroundColorContrast !== undefined && {
          desktopBackgroundColorContrast: desktopBackgroundColorContrast,
        }),
        ...(desktopBackgroundEffect !== undefined && {
          desktopBackgroundEffect: desktopBackgroundEffect,
        }),
        ...(desktopBackgroundImage !== undefined && {
          desktopBackgroundImage: desktopBackgroundImage,
        }),
        ...(isBackgroundImage !== undefined && {
          isBackgroundImage: isBackgroundImage,
        }),
        ...(desktopBackgroundFilter !== undefined && {
          desktopBackgroundFilter: desktopBackgroundFilter,
        }),
      });
    },

    changeDoubleCkick: (state, action: PayloadAction<boolean>) => {
      state.isDoubleClick = action.payload;
    },
    changePersistentData: (state, action: PayloadAction<boolean>) => {
      state.isDataPersistent = action.payload;
    },
  },
});

export const { changeLanguage, changeBackground, changeDoubleCkick,changePersistentData } =
  settingsSlice.actions;
export default settingsSlice.reducer;
