"use client";

import React, { useState, useCallback, FC } from "react";
import { LuListFilter } from "react-icons/lu";
import Products from "../Products/Products";
import FilterModal from "components/FilterModal/FilterModal";
import Sort from "components/Sort/Sort";
import { Product } from "@/app/types/productType";

type ProductProps = {
  products: Product[];
};

const MainContent: FC<ProductProps> = ({ products }) => {
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);

  const handleFilterModal = useCallback(() => {
    setFilterModalOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex w-full justify-between py-2 my-4 border">
        <div className="flex items-center">
          <button
            onClick={handleFilterModal}
            type="button"
            aria-label="open filter modal"
            className="inline-flex items-center gap-2"
          >
            <LuListFilter size={20} color="#001e38" />
            <span className=" text-darkBlue text-fluid-micro-guided leading-fluid-micro-guided">
              Filter{" "}
              <span className="lg:hidden xl:hidden 2xl:hidden 3xl:hidden">
                and Sort
              </span>
            </span>
          </button>
        </div>
        <FilterModal
          filterModalOpen={filterModalOpen}
          handleFilterModal={handleFilterModal}
        />
        <div className="hidden lg:flex lg:items-center">
          <Sort />
        </div>
      </div>
      <div>
        <Products wishlist={false} products={products} />
      </div>
    </div>
  );
};

export default MainContent;
