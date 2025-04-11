import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import ImageSlider from "components/ImageSlider/ImageSlider";
import Rating from "components/Rating/Ratings";
import Review from "components/Review";
import { addToCart } from "@/app/data/cart";
import { Product } from "@/app/types/productType";
import toast from "react-hot-toast";
import Button from "../ui/Button/Button";
import FullWidthContainer from "components/FullWidthContainer/FullWidthContainer";
import { FaCircle } from "react-icons/fa";
import Collapse from "../ui/Collapse/Collapse";
import { DETAILS } from "@/app/constants/products";
import { fetchProductImages } from "@/app/utils/imageUtils";
import { addToWishlist, removeItemFromWishList } from "@/app/data/wishlist";
import { ServerResponseType } from "types/global";
import { FiHeart } from "react-icons/fi";
import { useProductContext } from "@/app/contexts/ProductContext";
import SimilarProduct from "../SimilarProduct/SimilarProduct";
import { getProductAvgReview } from "@/app/data/review";
import { useUserContext } from "@/app/contexts/UserContext";
import { useRouter } from "next/router";

type ProductDetailPropTypes = {
  product: Product | null;
  isItemInWishList?: boolean;
};

type AvgReviewPropTypes = {
  avgReview: number;
  totalReviews: number;
};

const ProductDetail: FC<ProductDetailPropTypes> = (props) => {
  const { product, isItemInWishList = false } = props;
  const {
    description,
    price,
    productId = "",
    name,
    SKU = "",
    images,
    categoryId = "",
  } = product ?? {};
  const { toggleProductsFromWishList } = useProductContext();
  const [avgReviews, setAvgReview] = useState<AvgReviewPropTypes>();
  const { isLoggedIn } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const [addressResp] = await getProductAvgReview(SKU);
      console.log("addressResp?.data", addressResp?.data?.[0]);
      if (addressResp?.success) {
        setAvgReview(addressResp?.data?.[0]);
      }
    })();
  }, [SKU]);

  const imageSlides = useMemo(() => {
    if (!images) {
      return [];
    }
    return fetchProductImages(images);
  }, [images]);

  const handleOnAddToCart = useCallback(async () => {
    const [atcResp, atcErr] = await addToCart(productId);
    if (atcErr) {
      toast.error("Something went wrong, Please try again later");
      return;
    }
    toast.success(atcResp?.message ?? "");
  }, [productId]);

  const handleWishList = useCallback(async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to add products to your wishlist");
      router.push("/login");
      return;
    }
    toggleProductsFromWishList(SKU ?? "");
    let response: ServerResponseType<"">;
    if (isItemInWishList) {
      [response] = await removeItemFromWishList(productId);
    } else {
      [response] = await addToWishlist(productId);
    }
    if (response?.success) {
      toast.success(response?.message ?? "");
    } else {
      toast.error("Something went wrong. Please try again");
      toggleProductsFromWishList(SKU ?? "");
    }
  }, [
    isLoggedIn,
    toggleProductsFromWishList,
    SKU,
    isItemInWishList,
    router,
    productId,
  ]);

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
                <Rating
                  isEditable={false}
                  rating={avgReviews?.avgReview ?? 0}
                />
                <p className="font-semibold capitalize">
                  {avgReviews?.totalReviews ?? 0} reviews
                </p>
              </div>
              <div className="flex">
                <h1 className="font-semibold text-blackShade text-fluid-body-2 leading-fluid-body-2">
                  {name}
                </h1>
                <button
                  type="button"
                  onClick={handleWishList}
                  aria-label="add to wish list"
                  className="px-3"
                >
                  <FiHeart
                    className={`w-5 h-5 text-darkGreen
                             ${
                               isItemInWishList
                                 ? "fill-darkGreen"
                                 : "fill-offWhite"
                             } 
                             hover:fill-darkGreen`}
                  />
                </button>
              </div>
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
      <hr className="border border-gray-200 my-2" />
      <Review isReviewPage={false} sku={SKU} />
      <hr className="border border-gray-200 my-2" />
      <div className="my-5">
        <SimilarProduct categoryId={categoryId} />
      </div>
    </>
  );
};

export default ProductDetail;
