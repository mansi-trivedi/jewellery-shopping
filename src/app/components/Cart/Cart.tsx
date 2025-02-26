"use client";

import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CartItem from "components/Cart/CartItem";
import CartTotal from "components/Cart/CartTotal";
import Login from "components/Login/Login";
import { useGlobalContext } from "context/GlobalContext";
import Register from "components/Register/Register";
import { Product } from "@/app/types/productType";

type CartPropTypes = {
  isAuthenticated: boolean;
};

const Cart: FC<CartPropTypes> = (props) => {
  const { isAuthenticated } = props;
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const {
    handleLoginModalToggle,
    isLoginModalOpen,
    handleRegisterModalToggle,
    isRegisterModalOpen,
  } = useGlobalContext();

  useEffect(() => {
    async function fetchPosts() {
      setProducts([]);
    }
    if (!isAuthenticated) {
      handleLoginModalToggle();
    } else {
      fetchPosts();
    }
  }, [handleLoginModalToggle, isAuthenticated]);

  return (
    <>
      <Login
        loginModalOpen={isLoginModalOpen}
        handleLoginModal={handleLoginModalToggle}
      />
      <Register
        registerModalOpen={isRegisterModalOpen}
        handleRegisterModal={handleRegisterModalToggle}
      />
      <div className="px-4 py-1">
        <div className="flex content-center justify-between m-4">
          <h1 className="text-xl font-bold text-darkBlue">My Cart 🛒</h1>
          <RxCross2
            size={20}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        </div>
        <hr className="border border-gray-300 my-1" />
        <div className="mx-4 ">
          <ul>
            {products.map((product, key) => {
              return (
                <div key={key}>
                  <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <CartItem
                      image={product.images}
                      price={String(product.price)}
                      name={product.name}
                    />
                  </li>
                  <hr className="border border-gray-200 my-1" />
                </div>
              );
            })}
          </ul>
        </div>
        <CartTotal />
        <div className="m-6 mx-4 text-center">
          <button
            type="button"
            className="w-full items-center justify-center rounded-md bg-lightBlue px-6 py-4 text-lg font-semibold text-white hover:bg-darkBlue"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
