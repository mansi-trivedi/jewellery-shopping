import { getProductByCategoryId } from "@/app/data/product";
import React, { FC, useEffect, useState } from "react";
import { Product } from "types/product";
import ProductCard from "../ProductCard/ProductCard";
import { useProductContext } from "@/app/contexts/ProductContext";
import Carousel from "../ui/Carousel/Carousel";

type SimilarProductDetailPropTypes = {
  categoryId: string;
};

const SimilarProduct: FC<SimilarProductDetailPropTypes> = ({ categoryId }) => {
  const [similarProducts, setSimilarProduct] = useState<Product[]>([]);
  const { wishListProductsSkuIds } = useProductContext();

  useEffect(() => {
    (async () => {
      const [productResp, productErr] = await getProductByCategoryId(
        categoryId
      );
      if (productErr) {
        return;
      }
      if (productResp?.success) {
        setSimilarProduct(productResp?.data?.products ?? []);
      }
    })();
  }, [categoryId]);

  if (!similarProducts?.length) {
    return;
  }

  return (
    <div className="relative">
      <h2 className="text-lg font-bold text-darkBlue mb-4">
        You May Also Like
      </h2>
      <div className="">
        <Carousel itemsPerSlide={4}>
          {[...similarProducts, ...similarProducts, ...similarProducts]?.map(
            (product, key) => (
              <ProductCard
                key={key}
                product={product}
                isItemInWishList={wishListProductsSkuIds.has(product.SKU)}
              />
            )
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default SimilarProduct;
