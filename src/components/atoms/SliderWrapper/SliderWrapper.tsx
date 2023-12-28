import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type SliderProps = {
  arrows: boolean;
  dots: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  swipeToSlide: boolean;
  focusOnSelect: boolean;
  centerMode: boolean;
  centerPadding: number;
  children?: React.ReactNode;
};

const SliderWrapper: React.FC<SliderProps> = ({
  arrows,
  dots,
  autoplay,
  autoplaySpeed,
  speed,
  slidesToShow,
  slidesToScroll,
  swipeToSlide,
  focusOnSelect,
  centerMode,
  centerPadding,
  children,
}) => {
  const sliderSettings = {
    className: 'slider',
    arrows: arrows,
    dots: dots,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    speed: speed,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    swipeToSlide: swipeToSlide,
    focusOnSelect: focusOnSelect,
    centerMode: centerMode,
    centerPadding: `${centerPadding}px`,
  };

  return (
    <>
      <Slider {...sliderSettings}>{children}</Slider>
    </>
  );
};

export default SliderWrapper;
