"use client";
import { getProductByCategoryId } from "@/app/data/product";
import React, { FC, useEffect, useState } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { Product } from "types/product";
import ProductCard from "../ProductCard/ProductCard";
import { useProductContext } from "@/app/contexts/ProductContext";

type SimilarProductDetailPropTypes = {
  categoryId: string;
};

const SimilarProduct: FC<SimilarProductDetailPropTypes> = ({ categoryId }) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [productsPerView, setProductsPerView] = useState<number>(3);
  const [similarProducts, setSimilarProduct] = useState<Product[]>([]);
  const { wishListProductsSkuIds } = useProductContext();

  useEffect(() => {
    (async () => {
      const [productResp, productErr] = await getProductByCategoryId(
        categoryId
      );
      if (productErr) {
        return;
      }
      if (productResp?.success) {
        setSimilarProduct(productResp?.data?.products ?? []);
      }
    })();
  }, [categoryId]);

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

  if (!similarProducts?.length) {
    return;
  }

  return (
    <div className="relative">
      <h2 className="text-lg font-bold text-darkBlue mb-4">
        You May Also Like
      </h2>
      <div className="">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 3xl:grid-cols-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6 3xl:gap-6 gap-3">
          {similarProducts
            ?.slice(startIndex, startIndex + productsPerView)
            ?.map((product, key) => (
              <ProductCard
                key={key}
                product={product}
                isItemInWishList={wishListProductsSkuIds.has(product.SKU)}
              />
            ))}
        </div>
        <div className="flex w-full justify-end gap-2 py-3">
          {startIndex !== 0 && (
            <button
              onClick={prevImages}
              className="bg-darkGreen border-2 border-darkGreen hover:bg-transparent p-2 text-white rounded-full [&>svg]:hover:fill-darkGreen"
            >
              <BsArrowLeft size={20} />
            </button>
          )}
          <button
            onClick={nextImages}
            className="bg-darkGreen hover:bg-transparent p-2 text-white rounded-full border-2 border-darkGreen [&>svg]:hover:fill-darkGreen"
          >
            <BsArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;
