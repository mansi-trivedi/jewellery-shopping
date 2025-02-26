"use client";

import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "components/ProductCard/ProductCard";
import Pagination from "components/Pagination/Pagination";
import { Product } from "@/app/types/productType";

type ProductsPropTypes = {
  wishlist: boolean;
  products: Product[];
};

const productsPerPage = 20;

const Products: React.FC<ProductsPropTypes> = ({ wishlist, products }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [, setCurrentProducts] = useState<Product[]>([]);

  useEffect(() => {
    setTotalPages(Math.ceil(products.length / productsPerPage));
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setCurrentProducts(
      products?.slice(indexOfFirstProduct, indexOfLastProduct)
    );
  }, [currentPage, products]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="container px-4 py-1 max-w-none">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {products?.length ? (
            products.map((product, key) => (
              <ProductCard
                key={key}
                image={product.images}
                price={String(product.price)}
                name={product.name}
                wishlist={wishlist}
                sku={product.SKU}
                productId={product.productId}
              />
            ))
          ) : (
            <div>No Product</div>
          )}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Products;
