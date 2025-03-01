import ProductDetail from "@/app/components/ProductDetail/ProductDetail";
import { getProductBySku } from "@/app/data/product";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import React, { FC } from "react";
import { ProductAPIServerSidePropsTypes } from "types/product";

const ProductDetailPage: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { data } = props;
  const productData = data?.products?.[0] ?? null;
  return <ProductDetail product={productData} />;
};

const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const skuId = query["sku"] as string;
  const [response] = await getProductBySku(skuId);
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

export default ProductDetailPage;
export { getServerSideProps };
