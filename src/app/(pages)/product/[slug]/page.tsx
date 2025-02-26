import Footer from "@/app/components/Footer/Footer";
import ProductDetail from "@/app/components/ProductDetail/ProductDetail";
import { getProductBySku } from "@/app/data/product";
import React from "react";
import { Product } from "types/product";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const data = await getProductBySku(slug);

  if (!data.success) {
    return <p>No product found</p>;
  }

  const product = [] as unknown as Product;

  return (
    <>
      <ProductDetail product={product} />
      <Footer />
    </>
  );
};

export default Page;
