import Cart from "@/app/components/Cart/Cart";
import React, { FC } from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { parseCookies } from "@/app/utils/cookie";

type CartPagePropTypes = {
  isAuthentication: boolean;
};

const CartPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { isAuthentication } = props;
  return <Cart isAuthenticated={isAuthentication} />;
};

const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  let isUserAuthenticated = false;
  const { req } = ctx;
  const cookies = parseCookies(req.headers.cookie || "");
  if (cookies["authToken"]) {
    isUserAuthenticated = true;
  }
  return {
    props: {
      isAuthentication: isUserAuthenticated,
    },
  };
}) satisfies GetServerSideProps<CartPagePropTypes>;

export default CartPage;
export { getServerSideProps };
