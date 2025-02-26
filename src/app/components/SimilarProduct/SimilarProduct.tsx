"use client";
import React, { useEffect, useState } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
// import ProductCard from "components/ProductCard/ProductCard";
// import { Product } from "@/app/types/productType";

const SimilarProduct = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [productsPerView, setProductsPerView] = useState(3);
  const [similarProducts] = useState([]);

  useEffect(() => {
    const updateImagesPerView = () => {
      if (window.innerWidth >= 1280) {
        setProductsPerView(6);
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setProductsPerView(5);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setProductsPerView(4);
      } else {
        setProductsPerView(3);
      }
    };
    updateImagesPerView();
    window.addEventListener("resize", updateImagesPerView);
    return () => window.removeEventListener("resize", updateImagesPerView);
  }, []);

  const prevImages = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? similarProducts.length - productsPerView : prevIndex - 1
    );
  };

  const nextImages = () => {
    setStartIndex((prevIndex) =>
      prevIndex + productsPerView >= similarProducts.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="my-4 mx-4">
      <h2 className="text-lg font-bold text-darkBlue my-3">
        You May Also Like
      </h2>
      <div className="">
        {/* <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 3xl:grid-cols-6 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6 3xl:gap-6 gap-3">
          {similarProducts
            .slice(startIndex, startIndex + productsPerView)
            .map((product, key) => (
              <ProductCard
                key={key}
                image={product.images}
                price={String(product.price)}
                name={product.name}
                wishlist={false}
                sku={product.SKU}
                productId={product.productId}
              />
            ))}
        </div> */}
        <div className="flex w-full justify-end gap-2 py-3">
          {startIndex !== 0 && (
            <button
              onClick={prevImages}
              className="bg-lightBlue hover:bg-darkBlue p-2 text-white rounded-full"
            >
              <BsArrowLeft size={20} />
            </button>
          )}
          <button
            onClick={nextImages}
            className="bg-lightBlue hover:bg-darkBlue p-2 text-white rounded-full"
          >
            <BsArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;
