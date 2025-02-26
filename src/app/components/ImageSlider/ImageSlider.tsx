import React, { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images: string[] = [
  "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/earring.jpg",
  "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/ring.jpg",
  "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/bracelet.jpg",
  "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/necklace.jpg",
];

const ImageSlider = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // Always show the first image
  const [currentIndex, setCurrentIndex] = useState(0); // Track slider position

  // Navigate to the previous image in the slider
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to the next image in the slider
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full bg-cover bg-center shadow-md">
        <div className="imageBlock w-full relative overflow-hidden before:content-[''] before:block before:pt-[calc(50%*16/9)]">
          <Image
            src={selectedImage}
            alt="Selected"
            fill={true}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Slider with Arrow Navigation */}
      <div className="flex items-center space-x-2 w-full justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 focus:outline-none"
        >
          <FaChevronLeft />
        </button>

        {/* Image Thumbnails */}
        <div className="flex space-x-1">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-20 h-20 bg-cover bg-center rounded-lg shadow-md cursor-pointer ${
                currentIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => {
                setSelectedImage(image);
                setCurrentIndex(index);
              }}
            ></div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 focus:outline-none"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
