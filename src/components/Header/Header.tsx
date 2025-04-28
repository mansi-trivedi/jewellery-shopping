"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const { isLoggedIn, handleUserLoggedInState } = useUserContext();
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [navigationModalOpen, setNavigationModalOpen] =
    useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const handleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  const handleNavigationModal = () => {
    setNavigationModalOpen(!navigationModalOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [router.asPath]);

  return (
    <>
      <header className="py-4 flex items-center justify-between">
        <div className="container mx-auto max-w-none flex items-center flex-wrap justify-between gap-5">
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
              <div className="relative">
                <button type="button" onClick={toggleDropdown}>
                  <PiUserFill size={24} className="hover:fill-darkGreen" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md z-10">
                    <Link
                      href={"/orders"}
                      className="block w-full text-left px-4 py-2 text-sm text-blackShade hover:bg-gray-100 focus:outline-none focus:bg-gray-100 active:bg-gray-200 rounded-t-md rounded-b-md"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleUserLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-blackShade hover:bg-gray-100 focus:outline-none focus:bg-gray-100 active:bg-gray-200 rounded-t-md rounded-b-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
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

            <button onClick={handleNavigationModal} type="button">
              <FiMenu
                size={24}
                className="cursor-pointer lg:hidden xl:hidden 2xl:hidden 3xl:hidden hover:fill-blackShade"
              />
            </button>
          </div>
        </div>
        <SearchModal
          searchModalOpen={searchModalOpen}
          handleSearchModal={handleSearchModal}
        />
        {isMobile ? (
          <NavigationModal
            navigationModalOpen={navigationModalOpen}
            handleNavigationModal={handleNavigationModal}
          />
        ) : null}
      </header>
    </>
  );
};

export default Header;
