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
  transition: 'backdrop-filter 0.3s ease-in-out, color 0.2s ease-in-out, background 0.3s ease-in-out, text-shadow 0.2s ease-in-out, transform 0.3s ease, filter 0.3s ease',
  pointerEvents: 'initial',
  backdropFilter: 'blur(0px)',


  '&:hover, &:focus': {
    transition: 'all 0.3s',
    background: 'rgba(0, 0, 0, 0.43)',
    backdropFilter: 'blur(2px)',

    '&>*': {
      transform: 'translateY(-10px)',
      filter: 'brightness(1.2) drop-shadow(0px 10px 2px #0000008a)',
      // backgroundColor: 'rgba(var(--c-rgb-desktop-bg-contrast), 0.2)',
      WebkitUserSelect: 'none',
      userSelect: 'none',
      WebkitTouchCallout: 'none',
      WebkitUserDrag: 'none',
      WebkitAppRegion: 'no-drag',
      backgroundColor: 'transparent',
    }
  },
};

export const fileWrapperStyle__text = {
  display: 'inline-block',
  // width: '5rem',
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
  // background: 'rgba(0, 0, 0, 0.4)',
  // textShadow: 'var(--s-text-outline)',
  filter: 'brightness(1) drop-shadow(0px 0px 1px #000000ff)  drop-shadow(0px 0px 1px #000000ff)',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  transition: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out, transform 0.3s ease, filter 0.3s ease',

};

export const fileWrapperStyle__icon = {
  display: 'inline-block',
  fontSize: '2rem',
  marginBottom: '0.5rem',
  backgroundColor: 'transparent',
  filter: 'brightness(1) drop-shadow(0px 0px 1px #000000ff)  drop-shadow(0px 0px 1px #000000ff)',
  transition: 'background-color 0.3s ease-in-out, transform 0.3s ease,filter 0.3s ease',
}