import Cart from "@/app/components/Cart/Cart";
import React from "react";
import { cookies } from "next/headers";

const Page = async () => {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get("authToken");
  return <Cart isAuthenticated={isAuthenticated} />;
};

export default Page;
