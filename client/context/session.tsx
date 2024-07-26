import { getCurUser } from '@/pages/api/auth/login';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    const user = getCurUser();
    setIsLoggedIn(!!user);
  }, []);

  return <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextType => useContext(SessionContext);
