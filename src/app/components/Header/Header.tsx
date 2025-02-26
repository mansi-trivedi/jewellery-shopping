"use client";
import React, { useState } from "react";
import { FiHeart, FiShoppingCart, FiMenu, FiSearch } from "react-icons/fi";
import Search from "components/Search/Search";
import SearchModal from "components/Search/SearchModal";
import NavigationModal from "components/Navigation/NavigationModal";
import Link from "next/link";
// import { Product } from "@/types/productType";

const Header = () => {
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [navigationModalOpen, setNavigationModalOpen] =
    useState<boolean>(false);

  const handleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  const handleNavigationModal = () => {
    setNavigationModalOpen(!navigationModalOpen);
  };

  return (
    <>
      <header className="px-4 py-4 flex items-center justify-between">
        <div className="container mx-auto flex items-center flex-wrap justify-between">
          {/* Logo */}
          <div className="text-xl font-bold">Company Logo</div>

          <div className="hidden lg:block xl:block 2xl:block 3xl:block w-[400px]">
            <Search />
          </div>

          <div className="flex space-x-4 text-gray-500">
            <FiSearch
              size={16}
              className="cursor-pointer lg:hidden xl:hidden 2xl:hidden 3xl:hidden hover:text-orange hover:fill-orange"
              onClick={handleSearchModal}
            />

            <Link href="/wishlist">
              <FiHeart
                size={16}
                className="cursor-pointer hover:text-orange hover:fill-orange"
              />
            </Link>

            <Link href="/cart">
              <FiShoppingCart
                size={16}
                className="cursor-pointer hover:text-orange hover:fill-orange"
              />
            </Link>

            <FiMenu
              size={16}
              className="cursor-pointer lg:hidden xl:hidden 2xl:hidden 3xl:hidden hover:text-orange hover:fill-orange"
              onClick={handleNavigationModal}
            />
          </div>
        </div>
        <SearchModal
          searchModalOpen={searchModalOpen}
          handleSearchModal={handleSearchModal}
        />
        <NavigationModal
          navigationModalOpen={navigationModalOpen}
          handleNavigationModal={handleNavigationModal}
        />
      </header>
    </>
  );
};

export default Header;
