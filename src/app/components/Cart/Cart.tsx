"use client";

import React, { FC, useEffect, useState } from "react";

import CartItem from "components/Cart/CartItem";
import CartTotal from "components/Cart/CartTotal";
import { useGlobalContext } from "context/GlobalContext";
import { Product } from "@/app/types/productType";
import Button from "../ui/Button/Button";
import { getCartInternal } from "@/app/data/cart";

type CartPropTypes = {
  isAuthenticated: boolean;
};

const Cart: FC<CartPropTypes> = (props) => {
  const { isAuthenticated } = props;
  const [products, setProducts] = useState<Product[]>([]);

  const { handleLoginModalToggle } = useGlobalContext();

  useEffect(() => {
    async function fetchPosts() {
      await getCartInternal();
      setProducts([]);
    }
    if (!isAuthenticated) {
      handleLoginModalToggle();
    } else {
      fetchPosts();
    }
  }, [handleLoginModalToggle, isAuthenticated]);

  return (
    <div className="grid lg:grid-cols-[70%_30%] py-4 lg:py-8 gap-8">
      <div className="cart-items-container"></div>
      <div className="cart-summary-container">
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
                </div>
              );
            })}
          </ul>
        </div>
        <CartTotal />
        <div className="m-6 mx-4 text-center">
          <Button type="button" className="w-full">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
