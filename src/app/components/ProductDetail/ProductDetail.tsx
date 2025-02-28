"use client";

import React, { FC, useCallback } from "react";
import ImageSlider from "components/ImageSlider/ImageSlider";
import Rating from "components/Rating/Ratings";
import Review from "components/Review/Review";
import { addToCart } from "@/app/data/cart";
import { Product } from "@/app/types/productType";
import toast from "react-hot-toast";
import Button from "../ui/Button/Button";

type ProductDetailPropTypes = {
  product: Product | null;
};

const ProductDetail: FC<ProductDetailPropTypes> = (props) => {
  const { product } = props;
  const { description, price, productId = "", name, SKU } = product ?? {};
  // const [similarProducts, setSimilarProducts] = useState<Product>([]);

  const handleOnAddToCart = useCallback(async () => {
    const response = await addToCart(productId);
    if (response.success) {
      toast.success(response.message ?? "", {});
      return;
    }
    toast.error("Something went wrong, Please try again later");
  }, [productId]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-[40%_60%] py-4 lg:py-8 gap-8">
          <div>
            <ImageSlider />
          </div>
          <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex items-center gap-2">
              <Rating isEditable={false} rating={4} />
              <p className="font-semibold capitalize">0 reviews</p>
            </div>
            <h1 className="font-semibold text-blackShade text-fluid-body-2 leading-fluid-body-2">
              {name}
            </h1>
            <p className="text-fluid-body-6 leading-fluid-body-6">
              {description}
            </p>
            <p className="font-semibold text-fluid-body-5 leading-fluid-body-5">
              Rs. {price}
            </p>
            {/* <div className="w-32">
              <p className="text-fluid-micro-guided leading-fluid-micro-guided mb-3 font-medium">
                Quantity
              </p>
              <Quantity />
            </div> */}
            <div className="w-full flex gap-2">
              <Button
                className="flex-1 flex-shrink-0"
                onClick={handleOnAddToCart}
              >
                Add To Cart
              </Button>

              <Button
                className="flex-1 flex-shrink-0"
                onClick={() => alert("hello")}
                outline
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Review isReviewPage={false} sku={SKU} />
      {/* <SimilarProduct /> */}
    </>
  );
};

export default ProductDetail;
