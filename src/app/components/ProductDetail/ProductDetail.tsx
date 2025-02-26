"use client";

import React, { FC, useCallback } from "react";
import Link from "next/link";
import ImageSlider from "components/ImageSlider/ImageSlider";
import Quantity from "components/Quantity/Quantity";
import Rating from "components/Rating/Ratings";
import Review from "components/Review/Review";
import { addToCart } from "@/app/data/cart";
import { Product } from "@/app/types/productType";
import toast from "react-hot-toast";

type ProductDetailPropTypes = {
  product: Product;
};

const ProductDetail: FC<ProductDetailPropTypes> = (props) => {
  const { product } = props;
  const { SKU, description, price, productId } = product ?? {};

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
      <div className="my-4 flex flex-col md:flex-row w-full justify-center lg:my-8">
        <div className="flex">
          <ImageSlider />
        </div>
        <div className="mx-4 flex">
          <div className="my-3">
            <h1 className="my-2 text-2xl font-bold">{description}</h1>
            <div className="flex flex-row">
              <Rating isEditable={false} rating={4} />
              <p className="text-darkBlue mx-2 font-semibold">0 review</p>
            </div>
            <p className="text-xl font-semibold my-3">Rs. {price}</p>
            <div className="my-2 text-lg w-32">
              <p className="text-darkBlue">Quantity</p>
              <Quantity />
            </div>
            <div className="w-full flex flex-col my-3">
              <button
                className="border-lightBlue border-2 hover:bg-darkBlue hover:text-white my-1 py-2 font-semibold rounded-md"
                onClick={handleOnAddToCart}
              >
                Add To Cart
              </button>
              <button className="bg-lightBlue text-white hover:bg-darkBlue my-1 py-2 font-semibold rounded-md">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="border border-gray-300 my-1 mx-4" />
      <Review isReviewPage={false} />
      <Link href={`/product/${SKU}/Reviews`}>
        <p className="m-2 text-lightBlue font-semibold underline hover:text-darkBlue my-2 mx-5 mb-5">
          See All reviews
        </p>
      </Link>
      <hr className="border border-gray-300 my-2 mx-4" />
      {/* <SimilarProduct /> */}
    </>
  );
};

export default ProductDetail;
