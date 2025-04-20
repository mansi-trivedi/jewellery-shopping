import { FC } from "react";
import Products from "components/Products/Products";
import { getProductsBySearchTerm } from "@/app/data/product";
import { ProductAPIProps } from "types/product";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const SearchPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { data } = props;

  return (
    <div className="wrapper py-10">
      <Products products={data?.products ?? []} />
    </div>
  );
};

const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const [response] = await getProductsBySearchTerm(
    (query?.search_term ?? "") as string
  );
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
  ProductAPIProps["getProductCategoryApiResponse"]
>;

export default SearchPage;
export { getServerSideProps };
