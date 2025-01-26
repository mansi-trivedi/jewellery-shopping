import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { products } from "@/constants/products";

const Products = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 20;

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="container px-4 py-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 gap-6">
          {currentProducts.map((product, key) => (
            <ProductCard
              key={key}
              image={product.image}
              price={String(product.price)}
              description={product.description}
            />
          ))}
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
