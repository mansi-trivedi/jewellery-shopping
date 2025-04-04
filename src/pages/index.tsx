import { getAllProduct } from "@/app/data/product";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FC } from "react";
import { Product, ProductAPIServerSidePropsTypes } from "types/product";
import HeroImage from "components/HeroImage/HeroImage";
import SectionHeading from "@/app/components/SectionHeading/SectionHeading";
import Products from "@/app/components/Products/Products";

export const productsPerPage = 5;

const Homepage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { data } = props;
  const { currentPage, products, totalProducts } = data ?? {};

  return (
    <>
      <HeroImage />
      <SectionHeading
        title="All Products"
        description="a small description about the section"
      />
      <Products
        wishlist={false}
        products={products as Product[]}
        totalProducts={totalProducts as number}
        currentPage={currentPage}
      />
    </>
  );
};

const getServerSideProps = (async () => {
  const [response] = await getAllProduct(productsPerPage, 1);
  const { success, data, error, message, status } = response ?? {};
  return {
    props: {
      success: success ?? false,
      message: message ?? "",
      error: error ?? "",
      data: data ?? null,
      status: status ?? 400,
    },
  };
}) satisfies GetServerSideProps<ProductAPIServerSidePropsTypes>;

export default Homepage;
export { getServerSideProps };
