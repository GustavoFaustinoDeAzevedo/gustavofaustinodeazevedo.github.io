import { JSX } from 'react';

interface CarouselProps {
  carouselContent?: JSX.Element[];
  carouselWrapperStyles?: React.CSSProperties;
  carouselClassName?: string;
  carouselItemStyles?: React.CSSProperties;
  carouselItemClassName?: string;
  children?: React.ReactNode[];
}

const Carousel = ({
  carouselContent,
  carouselWrapperStyles,
  carouselClassName,
  carouselItemStyles,
  carouselItemClassName,
  children,
}: CarouselProps) => {
  const contentMapped = (() => {
    if (!carouselContent && !children) return null;
    return (carouselContent ?? children)?.map((item, index) => {
      return (
        <div
          className={carouselItemClassName || 'carousel__item'}
          style={carouselItemStyles || {}}
          key={`carousel-item-${index}`}
        >
          {item}
        </div>
      );
    });
  })();
  return (
    <div
      className={carouselClassName || 'carousel'}
      style={carouselWrapperStyles || {}}
    >
      {contentMapped}
    </div>
  );
};

export default Carousel;
