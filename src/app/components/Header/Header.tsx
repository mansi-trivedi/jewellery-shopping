"use client";
import React, { useCallback, useState } from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { PiUserFill } from "react-icons/pi";
import Search from "components/Search/Search";
import SearchModal from "components/Search/SearchModal";
import NavigationModal from "components/Navigation/NavigationModal";
import Link from "next/link";
import { useUserContext } from "context/UserContext";
import { performUserLogout } from "@/app/data/user";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
// import { Product } from "@/types/productType";

const Header = () => {
  const { isLoggedIn, handleUserLoggedInState } = useUserContext();
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [navigationModalOpen, setNavigationModalOpen] =
    useState<boolean>(false);
  const router = useRouter();

  const handleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  const handleNavigationModal = () => {
    setNavigationModalOpen(!navigationModalOpen);
  };

  const handleUserLogout = useCallback(async () => {
    const [response, error] = await performUserLogout();
    if (error) {
      toast.error("Something went wrong, Please try again later");
      return;
    }
    if (response?.success) {
      handleUserLoggedInState(false);
      toast.success("Successfully logout");
      router.push("/");
    }
  }, [handleUserLoggedInState, router]);

  return (
    <>
      <header className="py-4 flex items-center justify-between">
        <div className="container mx-auto max-w-none flex items-center flex-wrap justify-between">
          {/* Logo */}
          <div className="text-xl font-bold">Brand Logo</div>

          <div className="hidden lg:block w-[400px]">
            <Search />
          </div>

          <div className="flex space-x-6 text-gray-500">
            <FiSearch
              size={24}
              className="cursor-pointer lg:hidden xl:hidden 2xl:hidden 3xl:hidden hover:text-orange hover:fill-orange"
              onClick={handleSearchModal}
            />

            {isLoggedIn ? (
              <button type="button" onClick={handleUserLogout}>
                <PiUserFill size={24} className="hover:fill-darkGreen" />
              </button>
            ) : (
              <Link href="/login">
                <FiUser size={24} className="hover:fill-darkGreen" />
              </Link>
            )}

            <Link href="/wishlist">
              <FiHeart size={24} className="hover:fill-darkGreen" />
            </Link>

            <Link href="/cart">
              <FiShoppingCart size={24} className="hover:fill-darkGreen" />
            </Link>

            <FiMenu
              size={24}
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
