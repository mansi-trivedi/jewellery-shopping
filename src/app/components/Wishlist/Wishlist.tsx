"use client";
import React, { useEffect, useState } from "react";
import Products from "../Products/Products";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { getWishList } from "@/app/data/wishlist";
import { Product } from "@/app/types/productType";

const Wishlist = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getWishList();
      if (!response?.success) {
        return null;
      }
      setProducts(response?.data ?? []);
    }
    fetchData();
  }, []);

  return (
    <div className="px-4 py-1">
      <div className="flex content-center justify-between m-4">
        <h1 className="text-xl font-bold text-darkBlue">My Wishlist ❤️</h1>
        <RxCross2 size={20} onClick={() => router.back()} />
      </div>
      <hr className="border border-gray-300 my-1" />
      <div className="my-4">
        <Products wishlist={true} products={products} />
      </div>
    </div>
  );
};

export default Wishlist;
