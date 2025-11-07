//file variants = default | smallDefault | largeDefault | horizontal | vertical | verticalSmall | verticalLarge | horizontalSmall | horizontalLarge | onlyIcon | onlyText
export interface StylesConfig {
  $direction?: 'vertical' | 'horizontal';
  $size?: string;
  $fontSize?: string;
  $fontFamily?: string;
  $fontWeight?: string;
  $iconSize?: string;
  $color?: string;
  $backgroundColor?: { default: string; hover: string };
  $borderRadius?: string;
  $togglers?: {
    enableFilter: boolean;
    enableShadow: boolean;
    enableBorder: boolean;
    enableTextShadow: boolean;
    enableBorderRadius: boolean;
    enableTransform: boolean;
    enableSmoothTransition: boolean;
  };
}

export const fileParts = ({
  $direction,
  $size,
  $fontSize,
  $fontFamily,
  $fontWeight,
  $iconSize,
  $color,
  $backgroundColor,
  $borderRadius,
  $togglers, // = {
}: StylesConfig) => {
  return {
    wrapper: {
      padding: $direction === 'horizontal' ? '0.5rem 1rem' : '0.4rem 0',
      width: $direction === 'horizontal' ? '100%' : $size,
      height: $direction === 'horizontal' ? '' : $size,
      display: 'flex',
      flexDirection: $direction === 'horizontal' ? 'row' : 'column',
      justifyContent:
        $direction === 'horizontal' ? 'flex-start' : 'space-between',
      alignItems: 'center',
      gap: $direction === 'horizontal' ? '1rem' : '0',
      cursor: 'var(--cursor-pointer)',
      background: $backgroundColor?.default,
      lineHeight: '1.2',
      filter: $togglers?.enableFilter && 'brightness(1)',
      borderRadius: $borderRadius || '0.5rem',
      transition:
        $togglers?.enableSmoothTransition &&
        'backdrop-filter 0.3s ease-in-out, color 0.2s ease-in-out, background 0.3s ease-in-out, text-shadow 0.2s ease-in-out, transform 0.3s ease, filter 0.3s ease',
      pointerEvents: 'initial',
      backdropFilter: $togglers?.enableFilter && 'blur(0px)',

      '&:hover, &:focus': {
        transition: $togglers?.enableSmoothTransition && 'all 0.3s',
        background: $backgroundColor?.hover,
        backdropFilter: $togglers?.enableFilter && 'blur(8px)',

        '&>*': {
          transform: $togglers?.enableTransform && 'translateY(-10px)',
          filter:
            $togglers?.enableFilter &&
            `brightness(1.2) ${
              $togglers.enableShadow && 'drop-shadow(0px 10px 2px #0000008a)'
            }`,
          // backgroundColor: 'rgba(var(--color-rgb-desktop-bg-contrast), 0.2)',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserDrag: 'none',
          WebkitAppRegion: 'no-drag',
          backgroundColor: 'transparent',
        },
      },
    },

    icon: {
      flexShrink: 0,
      width: $iconSize,
      height: $iconSize,
      display: 'inline-block',
      fontSize: $iconSize,
      marginBottom:
        $direction === 'vertical' &&
        Number($fontSize?.replace(/\D/g, '')) / 2 + 'rem',
      backgroundColor: 'transparent',
      filter:
        $togglers?.enableFilter &&
        `brightness(1) ${
          $togglers.enableShadow &&
          'drop-shadow(0px 0px 1px #000000ff)  drop-shadow(0px 0px 1px #000000ff)'
        }`,
      transition:
        $togglers?.enableSmoothTransition &&
        'background-color 0.3s ease-in-out, transform 0.3s ease,filter 0.3s ease',
    },

    text: {
      flexGrow: 1,
      fontWeight: $fontWeight,
      fontFamily: $fontFamily,
      color: $color,
      borderRadius: '8px',
      textAlign: $direction === 'horizontal' ? 'left' : 'center',
      display: $direction === 'horizontal' ? 'inline-block' : '-webkit-box',
      WebkitBoxOrient: $direction === 'horizontal' ? 'horizontal' : 'vertical',
      webkitTextStroke: $togglers?.enableTextShadow && '2px black',
      wrap: $direction === 'horizontal' ? 'nowrap' : 'break-word',
      wordWrap: $direction === 'horizontal' ? 'nowrap' : 'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 2,
      lineClamp: 2,
      fontSize: $fontSize,
      filter:
        $togglers?.enableFilter &&
        `brightness(1) ${
          $togglers.enableShadow &&
          'drop-shadow(0px 0px 1px #000000ff)  drop-shadow(0px 0px 1px #000000ff)'
        }`,
      WebkitUserSelect: 'none',
      userSelect: 'none',
      transition:
        $togglers?.enableSmoothTransition &&
        'color 0.3s ease-in-out, background-color 0.3s ease-in-out, transform 0.3s ease, filter 0.3s ease',
    },
  };
};
