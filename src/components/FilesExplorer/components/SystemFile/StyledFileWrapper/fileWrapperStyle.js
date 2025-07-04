export const fileWrapperStyle = {
  padding: '0.8rem 0',
  width: '7rem',
  height: '6rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'var(--c-background1)',
  cursor: 'var(--cursor-pointer)',
  lineHeight: '1.2',
  borderRadius: '0.5rem',
  transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out, text-shadow 0.2s ease-in-out',
  pointerEvents: 'initial',

  '&:hover, &:focus': {
    transition: 'all 0.2s',
    textShadow: '0px 0px 15px rgba(var(--c-rgb-desktop-bg-contrast))',
    backgroundColor: 'rgba(var(--c-rgb-desktop-bg-contrast), 0.2)',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserDrag: 'none',
    WebkitAppRegion: 'no-drag',
  },
};

export const fileWrapperStyle__text = {
  width: '5rem',
  textAlign: 'center',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  lineClamp: 2,
  wordWrap: 'break-word',
  fontSize: '0.8rem',
  color: 'rgb(var(--c-rgb-desktop-bg-contrast))',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  transition: 'color 0.3s ease-in-out',
};

export const fileWrapperStyle__icon = {
  fontSize: '2rem',
  marginBottom: '0.5rem',
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s ease-in-out',
}