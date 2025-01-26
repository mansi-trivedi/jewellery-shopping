"use client";

import React, { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { LuListFilter } from "react-icons/lu";
import Dropdown from "./Dropdown";
import Products from "./Products";
import FilterModal from "./FilterModal";

const MainContent = () => {
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
          <div className="flex items-center cursor-pointer">
            <BiSortAlt2 size={20} color="#001e38" />
            <span className="text-darkBlue">Sort By:</span>
            <Dropdown />
          </div>
        </div>
      </div>
      <div>
        <Products />
      </div>
    </>
  );
};

export default MainContent;
