import MainContent from "@/app/components/MainContent/MainContent";
import { getAllProduct } from "@/app/data/product";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FC } from "react";
import { ProductAPIServerSidePropsTypes } from "types/product";

const Homepage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { data } = props;
  const products = data?.products ?? [];
  return <MainContent products={products} />;
};

const getServerSideProps = (async () => {
  const response = await getAllProduct();
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
