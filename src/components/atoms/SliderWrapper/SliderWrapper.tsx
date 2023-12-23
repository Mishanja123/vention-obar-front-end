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
  adaptiveHeight: boolean;
  variableWidth: boolean;
};

const SliderWrapper: React.FC<SliderProps> = ({
  arrows,
  dots,
  autoplay,
  autoplaySpeed,
  speed,
  slidesToShow,
  slidesToScroll,
  adaptiveHeight,
  variableWidth,
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
    adaptiveHeight: adaptiveHeight,
    variableWidth: variableWidth,
  };

  return <Slider {...sliderSettings}></Slider>;
};

export default SliderWrapper;
