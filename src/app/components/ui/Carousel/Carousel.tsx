import React, { useState, useRef, ReactNode, useEffect } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface CarouselPropsTypes {
  children: ReactNode;
  itemsPerSlide?: number;
  mobileItems?: number; // Items to show on mobile (default: 1)
  tabletItems?: number; // Items to show on tablet (default: 2)
  desktopItems?: number; // Items to show on desktop (default: 4)
}

const slideGap = "space-x-4";

const Carousel: React.FC<CarouselPropsTypes> = ({
  children,
  mobileItems = 1,
  tabletItems = 2,
  desktopItems = 4,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children);
  const totalSlides = Math.ceil(childrenArray.length / itemsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(mobileItems);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(tabletItems);
      } else {
        setItemsPerSlide(desktopItems);
      }
      setCurrentIndex(0); // Reset index on resize
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileItems, tabletItems, desktopItems]);

  const goToPrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
    setCurrentIndex((prevIndex) => Math.min(totalSlides - 1, prevIndex + 1));
  };

  const gapValue = slideGap.match(/space-x-(\d+)/)?.[1]
    ? parseInt(slideGap.match(/space-x-(\d+)/)![1], 10) / 4 // Assuming base spacing is 4 (1rem)
    : 0;

  return (
    <div className="relative overflow-hidden">
      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory scroll-smooth overflow-x-auto pb-10 scrollbar-hide"
        style={{
          width: "100%", // Ensure the container takes full width
        }}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`flex-shrink-0 w-full snap-start ${
              itemsPerSlide > 1 ? "flex space-x-4" : ""
            }`}
            style={{
              width: "100%",
            }}
          >
            {childrenArray
              .slice(
                slideIndex * itemsPerSlide,
                (slideIndex + 1) * itemsPerSlide
              )
              .map((child, index) => (
                <div
                  key={`child-${slideIndex}-${index}`}
                  className={`bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 ${
                    itemsPerSlide === 1 ? "w-full" : ``
                  }`}
                  style={{
                    width:
                      itemsPerSlide > 1
                        ? `calc(${100 / itemsPerSlide}% - ${
                            (gapValue * (itemsPerSlide - 1)) / itemsPerSlide
                          }rem)`
                        : "100%",
                  }}
                >
                  {child}
                </div>
              ))}
          </div>
        ))}
      </div>

      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full shadow-md p-2 cursor-pointer z-10 ${
              currentIndex === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <FaArrowCircleLeft size={30} className="fill-darkGreen" />
          </button>
          <button
            onClick={goToNext}
            className={`absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full shadow-md p-2 cursor-pointer z-10 ${
              currentIndex === totalSlides - 1
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            <FaArrowCircleRight size={30} className="fill-darkGreen" />
          </button>

          {/* Optional: Pagination dots */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                aria-label="test"
                type="button"
                key={index}
                className={`rounded-full w-3 h-3 ${
                  currentIndex === index ? "bg-darkGreen" : "bg-gray-300"
                } cursor-pointer`}
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollLeft =
                      carouselRef.current.offsetWidth * index;
                  }
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
