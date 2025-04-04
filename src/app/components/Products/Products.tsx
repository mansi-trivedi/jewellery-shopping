"use client";

import React from "react";
import { useState } from "react";
import ProductCard from "components/ProductCard/ProductCard";
import { Product } from "types/product";
import { useProductContext } from "context/ProductContext";
import Pagination from "../Pagination/Pagination";
import { productsPerPage } from "@/pages";
import { getAllProduct } from "@/app/data/product";
import toast from "react-hot-toast";

type ProductsPropTypes = {
  wishlist: boolean;
  products: Product[] | [];
  totalProducts: number;
  currentPage?: number | null | undefined;
};

const Products: React.FC<ProductsPropTypes> = (props) => {
  const { products, currentPage: current = 0, totalProducts } = props;
  const [currentPage, setCurrentPage] = useState<number>(current as number);
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const { wishListProductsSkuIds } = useProductContext();

  const handlePageChange = async (pageNumber: number) => {
    const [response, err] = await getAllProduct(productsPerPage, pageNumber);
    setCurrentProducts(response?.data?.products ?? []);
    if (err) {
      toast.error("Not able to fetch products");
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative pb-10">
      {currentProducts?.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {currentProducts.map((product, key) => (
            <ProductCard
              key={key}
              product={product}
              isItemInWishList={wishListProductsSkuIds.has(product.SKU)}
            />
          ))}
        </div>
      ) : (
        <div className="text-lg text-darkBlue text-center py-4 font-semiboldS">
          No Product Found
        </div>
      )}
      <Pagination
        onPageClick={handlePageChange}
        itemsPerPage={productsPerPage}
        totalItems={totalProducts}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Products;
