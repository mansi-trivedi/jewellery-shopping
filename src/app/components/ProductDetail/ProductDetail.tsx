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
import Collapse from "../ui/Collapse/Collapse";
import { DETAILS } from "@/app/constants/products";

type ProductDetailPropTypes = {
  product: Product | null;
};

const imageSlides: string[] = [
  "https://images.unsplash.com/photo-1722410180644-5955f83ec8b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1722410180644-ff76ef805092?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

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
            <div className="slider-container">
              <ImageSlider images={imageSlides} />
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
              <p className="font-semibold">
                <span className="text-fluid-micro-guided leading-fluid-micro-guided flex items-center gap-2">
                  <FaCircle className="fill-darkGreen" /> In Stock
                </span>
              </p>
              <p className="font-semibold text-fluid-body-5 leading-fluid-body-5">
                Rs. {price}
              </p>

              <div className="information-accordion flex flex-col">
                {DETAILS.map(({ title, description }, idx) => {
                  return (
                    <div
                      key={idx}
                      className="py-4 border-b border-b-blackShade border-opacity-25"
                    >
                      <Collapse title={title}>
                        <p
                          className="py-4"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </Collapse>
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex gap-2 mt-4">
                <Button className="flex-1" onClick={handleOnAddToCart}>
                  Add To Cart
                </Button>
                <Button className="flex-1" onClick={() => alert("hello")}>
                  Buy Now
                </Button>
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
