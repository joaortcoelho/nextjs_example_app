import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCookie } from 'cookies-next';

interface SessionContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const SessionContext = createContext<SessionContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    setIsLoggedIn(!!token); // make sure its a boolean
  }, []);

  return <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextType => useContext(SessionContext);
