import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type SliderProps = {
  children?: React.ReactNode;
};

const SliderWrapper: React.FC<SliderProps> = ({ children }) => {
  const toSkroll5 = useMediaQuery({ minWidth: 1450 });
  const toSkroll4 = useMediaQuery({ minWidth: 1150 });
  const toSkroll3 = useMediaQuery({ minWidth: 900 });
  const toSkroll2 = useMediaQuery({ minWidth: 650 });
  const toSkroll1 = useMediaQuery({ maxWidth: 450 });

  let slidesToShow = 1;

  if (toSkroll5) {
    slidesToShow = 5;
  } else if (toSkroll4) {
    slidesToShow = 4;
  } else if (toSkroll3) {
    slidesToShow = 3;
  } else if (toSkroll2) {
    slidesToShow = 2;
  } else if (toSkroll1) {
    slidesToShow = 1;
  }

  const sliderSettings = {
    className: 'slider',
    arrows: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 500,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...sliderSettings}>{children}</Slider>
    </>
  );
};

export default SliderWrapper;
