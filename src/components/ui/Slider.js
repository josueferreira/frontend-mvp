"use client";
import React from "react";
import { Carousel } from "flowbite-react";

const Slider = ({ images }) => {
  return (
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
      <Carousel indicators={false} slide={false}>
        {Array.isArray(images) &&
          images.map((images, index) => (
            <div key={index}>
              
              <div
                className="bg-cover bg- bg-center w-full h-[100vh]"
                style={{ backgroundImage: `url(${images})` }}
              ></div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;
