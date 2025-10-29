import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SettingsState,
  Language,
  BackgroundPayload,
} from './settingsSlice.types';
import { useIsMobile } from '@/shared';
import updateStateIfDefined from '@/store/utils/updateStateIfDefined';

const navigatorLanguage =
  (typeof navigator !== 'undefined' && navigator.language) || 'en-US';

const defaultLanguage: Language = navigatorLanguage.startsWith('pt')
  ? 'por'
  : 'eng';

const defaultBackgroundColor = '#013232';

const defaultBackgroundColorContrast = '#ffffff';
const defaultFilterPreset = 'original';
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

const defaultFilter = {
  preset: defaultFilterPreset,
  values: defaultFilterValues,
};

const defaultEffect = {
  active: 'linear',
  mirrored: true,
  angle: 45,
};

const checkIsMobile = (): boolean => {
  const screenCheck: boolean = window.matchMedia('(max-width: 768px)').matches;
  const userAgentCheck: boolean =
    /android|iphone|ipad|ipod|blackberry|windows phone/i.test(
      navigator.userAgent
    );
  return screenCheck || userAgentCheck;
};
const isMobile = checkIsMobile();

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

export const desktopBackgroundInitialImage =
  'images/Wallpapers/pexels-rpnickson-2559941.jpg'; // `https://picsum.photos/${viewportWidth}/${viewportHeight}`;

const initialState: SettingsState = {
  language: defaultLanguage,
  isMobile: isMobile,
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
  },
});

export const { changeLanguage, changeBackground, changeDoubleCkick } =
  settingsSlice.actions;
export default settingsSlice.reducer;
