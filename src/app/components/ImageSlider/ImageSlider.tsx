/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState, useEffect, useRef, FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageSliderPropsTypes = {
  images: string[];
  interval?: number; // In milliseconds, default 3000
};

const ImageSlider: FC<ImageSliderPropsTypes> = (props) => {
  const { images, interval = 3000 } = props;
  const [currentIndex, setCurrentIndex] = useState(0); // Track slider position
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Navigate to the previous image in the slider
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Navigate to the next image in the slider
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  /** Effects */

  /** Auto animate the slides */
  useEffect(() => {
    if (interval > 0) {
      timerRef.current = setInterval(nextSlide, interval);
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [interval, images.length, nextSlide]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="w-full bg-cover shadow-md flex transition-transform duration-500 ease-[cubic-bezier(0.65, 0.05, 0.36, 1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images?.map((image, idx) => {
          return (
            <div className="imageBlock w-full flex-shrink-0" key={idx}>
              <img
                src={image}
                alt="Selected"
                className="w-full h-full object-cover block"
              />
            </div>
          );
        })}
      </div>

      {/* Slider with Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute top-0 bottom-0 px-4 bg-transparent focus:outline-none"
      >
        <FaChevronLeft className="fill-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-0 bottom-0 right-0 px-4 bg-transparent focus:outline-none"
      >
        <FaChevronRight className="fill-white" size={24} />
      </button>
    </div>
  );
};

export default ImageSlider;
