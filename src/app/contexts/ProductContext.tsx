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
import { Product } from "types/product";

type ProductProviderPropTypes = {
  children: ReactNode;
};

type ProductContextType = {
  products: Product[];
  setProductsData: () => void;
};

const DEFAULT_VALUE: ProductContextType = {
  products: [],
  setProductsData: () => null,
};

const ProductContext = createContext(DEFAULT_VALUE);

const ProductProvider: FC<ProductProviderPropTypes> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const setProductsData = useCallback(() => {
    setProducts([]);
  }, []);

  /**
   * add your context values and handlers here
   */
  const providerValue: ProductContextType = useMemo(
    () => ({
      products,
      setProductsData,
    }),
    [products, setProductsData] // update dependency as per requirement
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
