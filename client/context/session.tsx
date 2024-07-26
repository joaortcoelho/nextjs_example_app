import { getCurUser } from '@/pages/api/auth/login';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SessionContextType {
  isLoggedIn: boolean;
  rememberUser: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setRemember: (value: boolean) => void;
}

const SessionContext = createContext<SessionContextType>({
  isLoggedIn: false,
  rememberUser: false,
  setIsLoggedIn: () => {},
  setRemember: () => {},
});

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rememberUser, setRemember] = useState(false);

  useEffect(() => {
    const user = getCurUser();
    setIsLoggedIn(!!user);
  }, []);

  return (
    <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn, rememberUser, setRemember }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => useContext(SessionContext);
