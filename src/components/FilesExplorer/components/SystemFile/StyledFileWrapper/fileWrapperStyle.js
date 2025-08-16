import { transform } from "typescript";

export const fileWrapperStyle = {
  padding: '0.4rem 0',
  width: '6rem',
  height: '6rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'var(--cursor-pointer)',
  lineHeight: '1.2',
  filter: 'brightness(1)',
  borderRadius: '0.5rem',
  transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out, text-shadow 0.2s ease-in-out, transform 0.4s ease, filter 0.5s ease',
  pointerEvents: 'initial',


  '&:hover, &:focus': {
    transition: 'all 0.2s',
    transform: 'scale(1.1)',
    filter: 'brightness(1.1) drop-shadow(0px 8px 2px #00000064)',
    background: 'rgba(0, 0, 0, 0.2)',
    textShadow: '0px 0px 15px rgba(var(--c-rgb-desktop-bg-contrast))',
    // backgroundColor: 'rgba(var(--c-rgb-desktop-bg-contrast), 0.2)',

    WebkitUserSelect: 'none',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserDrag: 'none',
    WebkitAppRegion: 'no-drag',
  },
};

export const fileWrapperStyle__text = {
  width: '5rem',
  fontWeight: '900',

  color: 'var(--c-text)',
  borderRadius: '8px',
  textAlign: 'center',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  webkitTextStroke: '2px black',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  lineClamp: 2,
  wordWrap: 'break-word',
  fontSize: '0.8rem',
  background: 'rgba(0, 0, 0, 0.4)',
  // textShadow: 'var(--s-text-outline)',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  transition: 'color 0.3s ease-in-out',

};

export const fileWrapperStyle__icon = {
  fontSize: '2rem',
  marginBottom: '0.5rem',
  backgroundColor: 'transparent',
  // filter: 'drop-shadow(2px 2px 0px #00000068)',
  transition: 'background-color 0.3s ease-in-out',
}