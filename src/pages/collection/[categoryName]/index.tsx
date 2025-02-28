import MainContent from "@/app/components/MainContent/MainContent";
import { getProductsByCategory } from "@/app/data/product";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { FC } from "react";
import { ProductAPIServerSidePropsTypes } from "types/product";

const Collection: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { data } = props;
  const products = data?.products ?? [];

  if (!products?.length) {
    return (
      <div className="py-8">
        <h1 className="text-blackShade capitalize text-fluid-h4">
          Category product not found
        </h1>
      </div>
    );
  }

  return <MainContent products={products} />;
};

const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const categoryName = query["categoryName"] as string;
  const [resp] = await getProductsByCategory(categoryName);
  const { success, data, error, message, status } = resp ?? {};
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

export default Collection;
export { getServerSideProps };
