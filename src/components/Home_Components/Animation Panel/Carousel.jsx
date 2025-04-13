import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className="carousel-container-Big">
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="slide">
          <div className="banner">
            <div className="text-content">
              <h2>Up to 10% off Voucher</h2>
              <a href="#" className="shop-now">Shop Now →</a>
            </div>
            <img src="https://dashboard.codeparrot.ai/api/image/Z8dpFdMaYryy9hsO/frame-93.png" alt="Intel Core i5" />
          </div>
        </div>
        <div className="slide">
          <div className="banner">
            <div className="text-content">
              <h2>Exclusive Deals on Processors</h2>
              <a href="#" className="shop-now">Shop Now →</a>
            </div>
            <img src="https://dashboard.codeparrot.ai/api/image/Z8dpFdMaYryy9hsO/frame-93.png" alt="Intel Core i5" />
          </div>
        </div>
      </Slider>
    </div>
    </div>
  );
};

export default Carousel;