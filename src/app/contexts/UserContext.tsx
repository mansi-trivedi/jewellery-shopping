"use client";

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import Cookies from "js-cookie";

type UserProviderPropTypes = {
  children: ReactNode;
};

type UserContextType = {
  isUserLoggedIn: () => void;
};

const DEFAULT_VALUE: UserContextType = {
  isUserLoggedIn: () => null,
};

const UserContext = createContext(DEFAULT_VALUE);

const UserProvider: FC<UserProviderPropTypes> = ({ children }) => {
  const isUserLoggedIn = useCallback(() => {
    const token = Cookies.get("token") || null;
    if (token) {
      return true;
    } else {
      return false;
    }
  }, []);

  /**
   * add your context values and handlers here
   */
  const providerValue: UserContextType = useMemo(
    () => ({
      isUserLoggedIn,
    }),
    [isUserLoggedIn] // update dependency as per requirement
  );

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

// Context Hook
const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
};

export { useUserContext, UserProvider };
export type { UserContextType };
