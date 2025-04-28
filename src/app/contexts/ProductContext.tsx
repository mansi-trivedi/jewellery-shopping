"use client";

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { getWishList } from "@/app/data/wishlist";
import { ProductAPIProps } from "types/product";
import { useRouter } from "next/router";
import { useUserContext } from "./UserContext";

type ProductProviderPropTypes = {
  children: ReactNode;
};

type Products = Array<ProductAPIProps["product"]>;

type ProductContextType = {
  wishListProductsSkuIds: Set<string>;
  toggleProductsFromWishList: (productSkuId: string) => void;
  addProductToWishList: (productSkuId: string) => void;
  RemoveProductFromWishList: (productSkuId: string) => void;
  products: Products;
  setProducts: (products: Products) => void;
  setSearchedTerm: (searchTerm: string) => void;
  searchedTerm: string;
};

const DEFAULT_VALUE: ProductContextType = {
  wishListProductsSkuIds: new Set<string>(),
  toggleProductsFromWishList: () => null,
  addProductToWishList: () => null,
  RemoveProductFromWishList: () => null,
  products: [],
  setProducts: () => null,
  setSearchedTerm: () => null,
  searchedTerm: "",
};

const ProductContext = createContext(DEFAULT_VALUE);

const ProductProvider: FC<ProductProviderPropTypes> = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useUserContext();
  const [wishListProductsSkuIds, setWishListProductsSkuIds] = useState<
    ProductContextType["wishListProductsSkuIds"]
  >(DEFAULT_VALUE.wishListProductsSkuIds);
  const [products, setProducts] = useState<ProductContextType["products"]>(
    DEFAULT_VALUE.products
  );
  const [searchedTerm, setSearchedTerm] = useState<
    ProductContextType["searchedTerm"]
  >(router.query?.search_term as string);

  /** Handlers */

  /** Adds product to wishlist */
  const addProductToWishList = useCallback((productSkuId: string) => {
    setWishListProductsSkuIds((prev) => {
      const _wishListProductsSkuIds = new Set(prev);
      _wishListProductsSkuIds.add(productSkuId);
      return _wishListProductsSkuIds;
    });
  }, []);

  /** Removes product from wishlist */
  const RemoveProductFromWishList = useCallback((productSkuId: string) => {
    setWishListProductsSkuIds((prev) => {
      const _wishListProductsSkuIds = new Set(prev);
      if (_wishListProductsSkuIds.delete(productSkuId)) {
        return _wishListProductsSkuIds;
      }
      return _wishListProductsSkuIds;
    });
  }, []);

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

  /** Effects */

  /** Gets and Sets the initial wish list products codes */
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const [response] = await getWishList();
        if (response?.success) {
          response?.data?.forEach((product) =>
            addProductToWishList(product?.SKU ?? "")
          );
        }
      })();
    } else {
      setWishListProductsSkuIds(new Set());
    }
  }, [addProductToWishList, isLoggedIn]);

  /**
   * add your context values and handlers here
   */
  const providerValue: ProductContextType = useMemo(
    () => ({
      wishListProductsSkuIds,
      toggleProductsFromWishList,
      addProductToWishList,
      RemoveProductFromWishList,
      products,
      setProducts: (products) => setProducts(products),
      setSearchedTerm: (searchTerm) => setSearchedTerm(searchTerm),
      searchedTerm,
    }),
    [
      wishListProductsSkuIds,
      toggleProductsFromWishList,
      addProductToWishList,
      RemoveProductFromWishList,
      products,
      searchedTerm,
    ] // update dependency as per requirement
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
