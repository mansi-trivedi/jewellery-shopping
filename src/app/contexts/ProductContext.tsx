"use client";

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ProductProviderPropTypes = {
  children: ReactNode;
};

type ProductContextType = {
  wishListProductsSkuIds: Set<string>;
  toggleProductsFromWishList: (productSkuId: string) => void;
};

const DEFAULT_VALUE: ProductContextType = {
  wishListProductsSkuIds: new Set<string>(),
  toggleProductsFromWishList: () => null,
};

const ProductContext = createContext(DEFAULT_VALUE);

const ProductProvider: FC<ProductProviderPropTypes> = ({ children }) => {
  const [wishListProductsSkuIds, setWishListProductsSkuIds] = useState<
    typeof DEFAULT_VALUE.wishListProductsSkuIds
  >(DEFAULT_VALUE.wishListProductsSkuIds);

  /** Handlers */

  /** Adds and remove product from wishlist state */
  const toggleProductsFromWishList = useCallback((productSkuId: string) => {
    setWishListProductsSkuIds((prev) => {
      const _wishListProductsSkuIds = new Set(prev);
      if (_wishListProductsSkuIds.delete(productSkuId)) {
        return _wishListProductsSkuIds;
      }
      _wishListProductsSkuIds.add(productSkuId);
      return _wishListProductsSkuIds;
    });
  }, []);

  /**
   * add your context values and handlers here
   */
  const providerValue: ProductContextType = useMemo(
    () => ({
      wishListProductsSkuIds,
      toggleProductsFromWishList,
    }),
    [wishListProductsSkuIds, toggleProductsFromWishList] // update dependency as per requirement
  );

  return (
    <ProductContext.Provider value={providerValue}>
      {children}
    </ProductContext.Provider>
  );
};

// Context Hook
const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
};

export { useProductContext, ProductProvider };
export type { ProductContextType };
