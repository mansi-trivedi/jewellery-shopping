"use client";

import Image from "next/image";
import { useCallback } from "react";
import { FiHeart } from "react-icons/fi";
import { addToWishlist, removeItemFromWishList } from "@/app/data/wishlist";
import Link from "next/link";
import { Product } from "types/product";
import { useProductContext } from "@/app/contexts/ProductContext";
import toast from "react-hot-toast";
import { ServerResponseType } from "types/global";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { addToCart } from "@/app/data/cart";

type ProductCardPropTypes = {
  product: Product;
  isItemInWishList?: boolean;
  shouldShowAddToCart?: boolean;
};

const ProductCard: React.FC<ProductCardPropTypes> = (props) => {
  /** Derived props */
  const { product, isItemInWishList = false } = props;
  const { images: image, price, name, SKU: sku, productId } = product ?? {};

  /** Contexts */
  const { toggleProductsFromWishList } = useProductContext();

  /** Handlers */

  /** Adds and remove items from wishlist */
  const handleWishList = useCallback(async () => {
    toggleProductsFromWishList(sku);
    let response: ServerResponseType<"">;
    if (isItemInWishList) {
      response = await removeItemFromWishList(productId);
    } else {
      response = await addToWishlist(productId);
    }
    if (response.success) {
      toast.success(response?.message ?? "");
    } else {
      toast.error("Something went wrong. Please try after sometime");
      toggleProductsFromWishList(sku);
    }
  }, [productId, sku, toggleProductsFromWishList, isItemInWishList]);

  const handleOnAddToCartBtnClick = useCallback(async () => {
    const [cartResp, cartErr] = await addToCart(productId, 1);
    if (cartErr) {
      toast.error("Something went wrong. Please try after sometime");
      return;
    }
    if (cartResp?.success) {
      toast.success(cartResp?.message || "");
    }
  }, [productId]);

  return (
    <div className="relative shadow-lg flex flex-col bg-offWhite">
      <div className="imageBlock w-full relative overflow-hidden before:content-[''] before:block before:pt-[calc(50%*16/9)]">
        <Image
          className="w-full border object-cover"
          src={image}
          alt="product"
          fill={true}
        />
      </div>

      <div className="product-info-wrapper flex flex-1 items-center justify-between gap-4 p-4">
        <Link
          href={{
            pathname: `/product/${sku}`,
          }}
        >
          <div className="product-information">
            <p className="text-fluid-body-6 leading-fluid-body-6 font-medium font-quickSand text-blackShade">
              {name}
            </p>
            <p className="font-semibold text-fluid-micro-lg-1 leading-fluid-micro-lg-1 font-quickSand text-blackShade">{`Rs. ${price}`}</p>
          </div>
        </Link>

        <div className="action-container flex gap-6">
          <button
            type="button"
            aria-label={`add ${name} to cart`}
            onClick={handleOnAddToCartBtnClick}
          >
            <PiShoppingCartSimpleBold size={24} className="fill-darkGreen" />
          </button>
          <button
            type="button"
            onClick={handleWishList}
            aria-label="add to wish list"
          >
            <FiHeart
              className={`w-6 h-6 
               ${isItemInWishList ? "fill-darkGreen" : "fill-offWhite"} 
               hover:fill-darkGreen`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
