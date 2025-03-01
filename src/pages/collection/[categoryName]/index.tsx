import HeroImage from "components/HeroImage/HeroImage";
import { getProductsByCategory } from "@/app/data/product";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { FC } from "react";
import { ProductAPIServerSidePropsTypes } from "types/product";
import { StaticImageData } from "next/image";
import Products from "@/app/components/Products/Products";
import SectionHeading from "@/app/components/SectionHeading/SectionHeading";

/** images */
import collectionImg from "@/app/assets/collection-banner-image.jpg";
import earringsImg from "@/app/assets/earrings.jpg";
import necklaceImg from "@/app/assets/necklaces.jpg";
import bangles from "@/app/assets/bangles.jpg";
import bracelet from "@/app/assets/bracelet.jpg";
import anklet from "@/app/assets/anklet.jpg";

type CollectionImgType = {
  earrings: StaticImageData;
  necklaces: StaticImageData;
  bracelets: StaticImageData;
  bangles: StaticImageData;
  rings: StaticImageData;
  anklets: StaticImageData;
};

const COLLECTION_IMG_MAPPING: CollectionImgType = {
  earrings: earringsImg,
  necklaces: necklaceImg,
  bracelets: bracelet,
  bangles: bangles,
  rings: collectionImg,
  anklets: anklet,
} as const;

const Collection: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { data, collectionName } = props;
  const products = data?.products ?? [];
  const collectionImg =
    COLLECTION_IMG_MAPPING[
      (collectionName as keyof CollectionImgType) ?? "earrings"
    ];

  if (!products?.length) {
    return (
      <div className="py-20 text-center max-w-3xl mx-auto">
        <h1
          className="text-blackShade capitalize text-fluid-h5 leading-fluid-h5"
          dangerouslySetInnerHTML={{
            __html: `products with <q>${collectionName}</q> category not found`,
          }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <HeroImage imageURL={collectionImg} />
        <p className="absolute left-0 right-0 bottom-0 z-10 text-white h-full capitalize flex justify-center items-end pb-8 tracking-wider text-fluid-body-1 leading-fluid-body-1 font-medium">
          {collectionName}
        </p>
      </div>
      <SectionHeading
        title={`${collectionName} collection`}
        description={`small description about ${collectionName}`}
      />
      <Products wishlist={false} products={products} />
    </>
  );
};

const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const collectionName = query["categoryName"] as string;
  const [resp] = await getProductsByCategory(collectionName);
  const { success, data, error, message, status } = resp ?? {};
  return {
    props: {
      success: success ?? false,
      message: message ?? "",
      error: error ?? "",
      data: data ?? null,
      status: status ?? 400,
      collectionName: collectionName,
    },
  };
}) satisfies GetServerSideProps<
  ProductAPIServerSidePropsTypes & {
    collectionName: string;
  }
>;

export default Collection;
export { getServerSideProps };
