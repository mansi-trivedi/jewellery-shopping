"use client";

import React, { FC, useCallback } from "react";
import ImageSlider from "components/ImageSlider/ImageSlider";
import Rating from "components/Rating/Ratings";
import Review from "components/Review/Review";
import { addToCart } from "@/app/data/cart";
import { Product } from "@/app/types/productType";
import toast from "react-hot-toast";
import Button from "../ui/Button/Button";
import FullWidthContainer from "components/FullWidthContainer/FullWidthContainer";
import { FaCircle } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { IoIosStopwatch } from "react-icons/io";
import { FiPackage } from "react-icons/fi";

type ProductDetailPropTypes = {
  product: Product | null;
};

const ProductDetail: FC<ProductDetailPropTypes> = (props) => {
  const { product } = props;
  const { description, price, productId = "", name, SKU } = product ?? {};
  // const [similarProducts, setSimilarProducts] = useState<Product>([]);

  const handleOnAddToCart = useCallback(async () => {
    const [atcResp, atcErr] = await addToCart(productId);
    if (atcErr) {
      toast.error("Something went wrong, Please try again later");
      return;
    }
    toast.success(atcResp?.message ?? "");
  }, [productId]);

  return (
    <>
      <FullWidthContainer>
        <div className="mx-auto relative overflow-hidden">
          <div className="grid lg:grid-cols-[50%_50%]">
            <div className="relative">
              <ImageSlider />
            </div>
            <div className="container max-w-none flex flex-col gap-2 lg:gap-4 py-10 lg:px-10 2xl:px-24">
              <div className="flex items-center gap-2">
                <Rating isEditable={false} rating={4} />
                <p className="font-semibold capitalize">0 reviews</p>
              </div>
              <h1 className="font-semibold text-blackShade text-fluid-body-2 leading-fluid-body-2">
                {name}
              </h1>
              <p className="text-fluid-body-6 leading-fluid-body-6">
                {description} The Elan Necklace with its elegant design is
                intended to be worn as a daily accessory. Inspired by the Elan
                Ring, this necklace reflects the captivating appeal of the Elan
                Collection and ties any look together with an exquisite
                finishing touch.
              </p>
              <p className="font-semibold text-fluid-body-5 leading-fluid-body-5">
                Rs. {price}
              </p>
              <div className="w-full flex flex-col gap-2">
                <p className="font-semibold">
                  <span className="text-fluid-micro-guided leading-fluid-micro-guided flex items-center gap-2">
                    <FaCircle className="fill-darkGreen" /> In Stock
                  </span>
                </p>
                <Button
                  className="flex-1 flex-shrink-0"
                  onClick={handleOnAddToCart}
                >
                  Add To Cart
                </Button>
              </div>

              <div className="w-full flex gap-2">
                <Button
                  className="flex-1 flex-shrink-0"
                  onClick={() => alert("hello")}
                  outline
                >
                  Buy Now
                </Button>
              </div>

              <div className="options-container px-4 flex justify-between items-center">
                <div className="info-container flex flex-col justify-center items-center">
                  <FaShippingFast size={32} className="fill-darkGreen" />
                  <p className="capitalize font-medium">free shipping</p>
                </div>
                <div className="info-container flex flex-col justify-center items-center">
                  <FiPackage size={32} className="fill-darkGreen" />
                  <p className="capitalize font-medium">free returns</p>
                </div>
                <div className="info-container flex flex-col justify-center items-center">
                  <IoIosStopwatch size={32} className="fill-darkGreen" />
                  <p className="capitalize font-medium">2 years warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullWidthContainer>
      <Review isReviewPage={false} sku={SKU} />
      {/* <SimilarProduct /> */}
    </>
  );
};

export default ProductDetail;
