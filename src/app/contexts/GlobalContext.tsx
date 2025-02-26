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

type GlobalContextProviderPropTypes = {
  children: ReactNode;
};

type GlobalContextType = {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  handleLoginModalToggle: () => void;
  handleRegisterModalToggle: () => void;
};

const DEFAULT_VALUE: GlobalContextType = {
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  handleLoginModalToggle: () => null,
  handleRegisterModalToggle: () => null,
};

const GlobalContext = createContext(DEFAULT_VALUE);

const GlobalContextProvider: FC<GlobalContextProviderPropTypes> = ({
  children,
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  const handleLoginModalToggle = useCallback(() => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen((prev) => !prev);
  }, []);

  const handleRegisterModalToggle = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen((prev) => !prev);
  }, []);

  /**
   * add your context values and handlers here
   */
  const providerValue: GlobalContextType = useMemo(
    () => ({
      isLoginModalOpen,
      isRegisterModalOpen,
      handleLoginModalToggle,
      handleRegisterModalToggle,
    }),
    [
      isLoginModalOpen,
      isRegisterModalOpen,
      handleLoginModalToggle,
      handleRegisterModalToggle,
    ] // update dependency as per requirement
  );

  return (
    <GlobalContext.Provider value={providerValue}>
      {children}
    </GlobalContext.Provider>
  );
};

// Context Hook
const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within GlobalContextProvider"
    );
  }
  return context;
};

export { useGlobalContext, GlobalContextProvider };
export type { GlobalContextType };
