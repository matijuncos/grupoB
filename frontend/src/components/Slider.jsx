import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Slide from './Slide';

const pics = [{
  src: '/assets/sliderImg/slide1.jpg'
}, {
  src: '/assets/sliderImg/slide2.jpg'
}, {
  src: '/assets/sliderImg/slide3.jpg'
}, {
  src: '/assets/sliderImg/slide4.jpg'
}, {
  src: '/assets/sliderImg/slide5.jpg'
}, {
  src: '/assets/sliderImg/slide6.jpg'
}, {
  src: '/assets/sliderImg/slide7.jpg'
}
]

const SlideShow = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false
  };

  return (
    <>
      <div>
        <Slider {...settings}>
          {pics.map(slide => {
            return (
              <Slide slide={slide} />
            )
          })}

        </Slider>
      </div>
    </>
  )
}

export default SlideShow
