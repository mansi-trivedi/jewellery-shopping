import React, { useEffect } from "react";
import { useState } from "react";
import ProductCard from "components/ProductCard/ProductCard";
import { Product } from "types/product";
import { useProductContext } from "context/ProductContext";

type ProductsPropTypes = {
  products: Product[] | [];
};

const Products: React.FC<ProductsPropTypes> = (props) => {
  const { products } = props;
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const { wishListProductsSkuIds } = useProductContext();

  useEffect(() => {
    setCurrentProducts(products);
  }, [products]);

  return (
    <div className="relative pb-10">
      {currentProducts?.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {currentProducts.map((product, key) => (
            <ProductCard
              key={key}
              product={product}
              isItemInWishList={wishListProductsSkuIds.has(product.SKU)}
            />
          ))}
        </div>
      ) : (
        <div className="text-lg text-darkBlue text-center py-4 font-semiboldS">
          No Product Found
        </div>
      )}
    </div>
  );
};

export default Products;
