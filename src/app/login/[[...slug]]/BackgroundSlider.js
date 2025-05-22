"use client";
import React, { useState, useEffect } from "react";
import bg from "../../../../public/images/login.jpg";

const BackgroundSlider = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch images from the API
    fetch("https://mypcp.us/v/1/react/login/slider")
      .then((response) => response.json())
      .then((data) => {
        const sliderImages = data.sliderimage.map((item) => item.SliderImage);
        setImages(sliderImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <>
      <div className="relative w-full h-full">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          ))
        ) : (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-100"
            style={{
              backgroundImage: `url(${bg.src})`,
            }}
          />
        )}
        {/* pagination */}
        <div className="flex absolute inset-0 justify-center items-end pb-5">
          {images.map((item, index) => (
            <div
              key={index}
              className={`h-2 w-2 m-1 hover:bg-gray-300 cursor-pointer ${
                index === currentSlide ? "bg-gray-100" : "bg-gray-600"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BackgroundSlider;
