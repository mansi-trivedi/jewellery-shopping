import { getAllProduct } from "@/app/data/product";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FC, useState } from "react";
import { ProductAPIProps } from "types/product";
import HeroImage from "components/HeroImage/HeroImage";
import SectionHeading from "@/app/components/SectionHeading/SectionHeading";
import Products from "@/app/components/Products/Products";
import Pagination from "@/app/components/Pagination/Pagination";
import toast from "react-hot-toast";

export const ITEMS_PER_PAGE = 5;

const Homepage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { data } = props;
  const { currentPage: current = 0, products, totalProducts } = data ?? {};
  const [currentProducts, setCurrentProducts] = useState<
    Array<ProductAPIProps["product"]>
  >(products ?? []);
  const [currentPage, setCurrentPage] = useState<number>(current as number);

  const handlePageChange = async (pageNumber: number) => {
    const [response, err] = await getAllProduct(ITEMS_PER_PAGE, pageNumber);
    setCurrentProducts(response?.data?.products ?? []);
    if (err) {
      toast.error("Not able to fetch products");
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <HeroImage />
      <SectionHeading
        title="All Products"
        description="a small description about the section"
      />
      <Products products={currentProducts} />
      <Pagination
        onPageClick={handlePageChange}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={totalProducts as number}
        currentPage={currentPage as number}
      />
    </>
  );
};

const getServerSideProps = (async () => {
  const [response] = await getAllProduct(ITEMS_PER_PAGE, 1);
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
}) satisfies GetServerSideProps<ProductAPIProps["getAllProductApiResponse"]>;

export default Homepage;
export { getServerSideProps };
