"use client";

import React, { useEffect, useState } from "react";
import Products from "../Products/Products";
import { getWishList } from "@/app/data/wishlist";
import { Product } from "@/app/types/productType";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [response] = await getWishList();
      if (!response?.success) {
        toast.error(
          "Not able to fetch wish list items at this moment. Please try again later"
        );
        return null;
      }
      setProducts(response?.data ?? []);
    }
    fetchData();
  }, []);

  return (
    <div className="py-10">
      <div className="flex content-center justify-between">
        <h1 className="text-xl font-bold text-darkBlue">My Wishlist</h1>
      </div>
      <div className="my-4">
        <Products wishlist={true} products={products} />
      </div>
    </div>
  );
};

export default Wishlist;
