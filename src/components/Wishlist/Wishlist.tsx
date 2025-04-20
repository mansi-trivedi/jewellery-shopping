import React, { useEffect, useState } from "react";
import Products from "../Products/Products";
import { getWishList } from "@/app/data/wishlist";
import toast from "react-hot-toast";
import { useProductContext } from "context/ProductContext";
import { ProductAPIProps } from "types/product";

const Wishlist = () => {
  const [products, setProducts] = useState<Array<ProductAPIProps["product"]>>(
    []
  );
  const { addProductToWishList } = useProductContext();

  useEffect(() => {
    async function fetchData() {
      const [response] = await getWishList();
      if (!response?.success) {
        toast.error(
          "Not able to fetch wish list items at this moment. Please try again later"
        );
        return null;
      }
      response?.data?.forEach((product) =>
        addProductToWishList(product?.SKU ?? "")
      );
      setProducts(response?.data ?? []);
    }
    fetchData();
  }, [addProductToWishList]);

  return (
    <div className="py-10">
      <div className="flex content-center justify-between">
        <h1 className="text-xl font-bold text-darkBlue">My Wishlist</h1>
      </div>
      <div className="my-4">
        <Products products={products} />
      </div>
    </div>
  );
};

export default Wishlist;
