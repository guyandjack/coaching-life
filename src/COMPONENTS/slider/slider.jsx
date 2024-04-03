/* eslint-disable react/prop-types */
//composant SimpleSlider

//import React from "react";
import Slider from "react-slick";

//import du style du slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../style/CSS/slider.css";

//Import du contenu a afficher
import { slideContent } from "../../DATA/slideContent.js";

//import des icons
//import { AiOutlineRight } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

//declaration des fonction-component
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className={"arrow arrow-next"} onClick={onClick}>
      <BiChevronRight />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className={"arrow arrow-prev"} onClick={onClick}>
      <BiChevronLeft />
    </div>
  );
}

function CustomDot() {
  return <li className="slider-state"></li>;
}

function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slide",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div>
        <ul className="dot-list">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div>
        <CustomDot />
      </div>
    ),
  };
  return (
    <div className="main-container-slider">
      <Slider {...settings}>
        <div>
          <div className="container-slide-content">
            <h3 className="slide-title">
              {slideContent.coachingLife.titleFirst}
            </h3>
            <h4 className="slide-title title-second">
              {slideContent.coachingLife.titleSecond}
            </h4>

            <p className="slide-content">{slideContent.coachingLife.content}</p>
          </div>
        </div>
        <div>
          <div className="container-slide-content">
            <h3 className="slide-title">
              {slideContent.coachingJob.titleFirst}
            </h3>
            <h4 className="slide-title title-second">
              {slideContent.coachingJob.titleSecond}
            </h4>

            <p className="slide-content">{slideContent.coachingJob.content}</p>
          </div>
        </div>
        <div>
          <div className="container-slide-content">
            <h3 className="slide-title">
              {slideContent.coachingCompagny.titleFirst}
            </h3>
            <h4 className="slide-title title-second">
              {slideContent.coachingCompagny.titleSecond}
            </h4>

            <p className="slide-content">
              {slideContent.coachingCompagny.content}
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export { SimpleSlider };
