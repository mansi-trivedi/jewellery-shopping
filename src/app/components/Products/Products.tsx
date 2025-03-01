"use client";

import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "components/ProductCard/ProductCard";
import { Product } from "types/product";
import { getWishList } from "@/app/data/wishlist";
import { useProductContext } from "context/ProductContext";

type ProductsPropTypes = {
  wishlist: boolean;
  products: Product[];
};

const productsPerPage = 20;

const Products: React.FC<ProductsPropTypes> = (props) => {
  const { products } = props;
  const [currentPage] = useState<number>(1);
  const [, setTotalPages] = useState<number>(1);
  const [, setCurrentProducts] = useState<Product[]>([]);
  const { toggleProductsFromWishList, wishListProductsSkuIds } =
    useProductContext();

  useEffect(() => {
    setTotalPages(Math.ceil(products.length / productsPerPage));
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setCurrentProducts(
      products?.slice(indexOfFirstProduct, indexOfLastProduct)
    );
  }, [currentPage, products]);

  /** Effects */
  useEffect(() => {
    const fetchWishlist = async () => {
      const [response] = await getWishList();
      if (response?.success) {
        response?.data?.forEach((product) =>
          toggleProductsFromWishList(product.SKU)
        );
      }
    };
    fetchWishlist();
  }, [toggleProductsFromWishList]);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className="relative pb-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {products?.length ? (
          products.map((product, key) => (
            <ProductCard
              key={key}
              product={product}
              isItemInWishList={wishListProductsSkuIds.has(product.SKU)}
            />
          ))
        ) : (
          <div>No Product</div>
        )}
      </div>
      {/* <Pagination
        onPageClick={() => alert("hello")}
        itemsPerPage={20}
        totalItems={200}
        currentPage={1}
      /> */}
    </div>
  );
};

export default Products;
