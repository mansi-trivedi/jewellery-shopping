"use client";

import {
  createContext,
  FC,
  ReactNode,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";

type UserProviderPropTypes = {
  children: ReactNode;
  value: {
    isAuthenticated: boolean;
  };
};

type UserContextType = {
  isLoggedIn: boolean;
  handleUserLoggedInState: (loggedInState: boolean) => void;
};

const DEFAULT_VALUE: UserContextType = {
  isLoggedIn: false,
  handleUserLoggedInState: () => null,
};

const UserContext = createContext(DEFAULT_VALUE);

const UserProvider: FC<UserProviderPropTypes> = ({ children, value }) => {
  const { isAuthenticated } = value;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated);

  const handleUserLoggedInState = useCallback((loggedInState: boolean) => {
    setIsLoggedIn(loggedInState);
  }, []);

  /**
   * add your context values and handlers here
   */
  const providerValue: UserContextType = useMemo(
    () => ({
      isLoggedIn,
      handleUserLoggedInState,
    }),
    [isLoggedIn, handleUserLoggedInState] // update dependency as per requirement
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

export { useUserContext, UserProvider, UserContext };
export type { UserContextType };
