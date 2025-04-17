import ProductDetail from "@/app/components/ProductDetail/ProductDetail";
import { useProductContext } from "@/app/contexts/ProductContext";
import { getProductBySku } from "@/app/data/product";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import React, { FC } from "react";
import { ProductAPIProps } from "types/product";

const ProductDetailPage: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { data: productData } = props;
  const { wishListProductsSkuIds } = useProductContext();
  return (
    <ProductDetail
      product={productData}
      isItemInWishList={wishListProductsSkuIds.has(productData?.SKU ?? "")}
    />
  );
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
}) satisfies GetServerSideProps<
  ProductAPIProps["getProductWithSkuOrIdResponse"]
>;

export default ProductDetailPage;
export { getServerSideProps };
