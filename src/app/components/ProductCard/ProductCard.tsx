"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { addToWishlist } from "@/app/data/wishlist";
import Link from "next/link";

interface ProductCardProps {
  image: string;
  price: string;
  name: string;
  wishlist: boolean;
  sku: string;
  productId: string;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  /** Derived props */

  const {
    image = "https://shop.southindiajewels.com/wp-content/uploads/2024/04/219.a.jpg",
    price,
    name,
    wishlist,
    sku,
    productId,
  } = props;

  /** States */

  const [isWishListed, setIsWishListed] = useState<boolean>(false);

  /** Effects */

  useEffect(() => {
    const fetchWishlist = async () => {
      // if (token) {
      //   const wishlistedProducts = await GetWishlistedProducts();
      //   const wishlistedIds = wishlistedProducts.map(
      //     (product: { productId: string }) => product.productId
      //   );
      //   setWishlistedProductIds(wishlistedIds);
      // }
    };

    fetchWishlist();
  }, []);

  /** Handlers */

  const handleWishList = useCallback(async () => {
    const response = await addToWishlist(productId);
    console.log("data handle", response);
    setIsWishListed((prevState) => !prevState);
  }, [productId]);

  return (
    <Link
      href={{
        pathname: `/product/${sku}`,
      }}
    >
      <div className="relative">
        <div className={`border bg-offWhite`}>
          <div className="imageBlock w-full relative overflow-hidden before:content-[''] before:block before:pt-[calc(50%*16/9)]">
            <Image
              className="w-full rounded-t-lg border object-cover"
              src={image}
              alt="product"
              fill={true}
            />
          </div>

          <div className="p-4">
            <p className="text-fluid-micro-lg leading-fluid-micro-lg text-darkBlue">
              {name}
            </p>
            <p className="font-semibold text-darkBlue text-fluid-micro-lg leading-fluid-micro-lg">{`Rs. ${price}`}</p>
          </div>
          {wishlist && (
            <div className="m-2 bg-slate-200">
              <button
                type="button"
                className="bg-lightBlue text-white px-4 py-2 rounded-md absolute bottom-3"
              >
                Add To Cart
              </button>
            </div>
          )}
        </div>
        <div>
          <FiHeart
            className={`absolute top-3 left-3 w-5 h-5 cursor-pointer 
              text-red-600 ${isWishListed ? "fill-red-600" : "fill-white"} 
              hover:text-red-600 hover:fill-red-600`}
            onClick={handleWishList}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
