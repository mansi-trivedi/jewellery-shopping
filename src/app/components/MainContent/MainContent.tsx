"use client";

import React, { useState } from "react";
import { LuListFilter } from "react-icons/lu";
import Products from "../Products/Products";
import FilterModal from "components/FilterModal/FilterModal";
import Sort from "components/Sort/Sort";
import { Product } from "@/app/types/productType";

type ProductProps = {
  products: Product[];
};

const MainContent: React.FC<ProductProps> = ({ products }) => {
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);

  const handleFilterModal = () => {
    setFilterModalOpen(!filterModalOpen);
  };
  return (
    <>
      <div className="p-4 flex w-full justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleFilterModal}
        >
          <LuListFilter size={20} color="#001e38" />
          <span className="px-2 text-darkBlue">
            Filter{" "}
            <span className="lg:hidden xl:hidden 2xl:hidden 3xl:hidden">
              and Sort
            </span>
          </span>
        </div>
        <FilterModal
          filterModalOpen={filterModalOpen}
          handleFilterModal={handleFilterModal}
        />
        <div className="hidden lg:block xl:block 2xl:block 3xl:block">
          <Sort />
        </div>
      </div>
      <div>
        <Products wishlist={false} products={products} />
      </div>
    </>
  );
};

export default MainContent;
