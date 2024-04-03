//import React, { useEffect } from "react";
//import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
//import "swiper/swiper-bundle.css";

// Register Swiper custom elements
register();

const Carousel = () => {
  return (
    <div className="">
      <swiper-container
        slides-per-view="1"
        speed="500"
        loop="true"
        css-mode="true"
      >
        <swiper-slide>
          <img src="/src/assets/fresh.jpg" alt="" className="image" />
        </swiper-slide>
        <swiper-slide>
          <img src="/src/assets/lake.jpg" alt="" className="image" />
        </swiper-slide>
        <swiper-slide>
          <img src="/src/assets/mountain.jpg" alt="" className="image" />
        </swiper-slide>
        ...
      </swiper-container>
    </div>
  );
};

export { Carousel };
