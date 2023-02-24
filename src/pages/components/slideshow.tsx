import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = () => {
  //Array of Images
  const images = [
    "./img/Frame 15.png",
    "./img/Frame 16.png",
    "./img/Frame 17.png",
    "./img/Frame 18.png",
    "./img/Frame 19.png",
  ];

  //These are custom properties for zoom effect while slide-show
  const zoomInProperties = {
    indicators: true,
    scale: 1.2,
    duration: 2000,
    transitionDuration: 3000,
    infinite: true,
    prevArrow: (
      <div
        style={{ width: "1px", marginRight: "-30px", cursor: "pointer" }}
        className="opacity-75"
      ></div>
    ),
    nextArrow: (
      <div
        style={{ width: "1px", marginLeft: "-30px", cursor: "pointer" }}
      ></div>
    ),
  };
  return (
    <div className="m-5">
      <Slide {...zoomInProperties}>
        {images.map((each, index) => (
          <div key={index} className="flex justify-center w-full h-full">
            <img
              className="w-11/12 object-cover rounded-lg shadow-xl"
              src={each}
            />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
