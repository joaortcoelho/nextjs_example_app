import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import profileHandler, { Profile } from '@/pages/api/auth/profile';

interface SessionContextType {
  isLoggedIn: boolean;
  userRole: string;
  userId: number | null;
  setLogin: (values: any) => void;
  setLogout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string>(String);

  const setLogin = async () => {
    try {
      const data = await profileHandler();
      setIsLoggedIn(true);
      setUserRole(data.role);
      setUserId(data.id);

      setCookie('username', data.username);
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  const setLogout = async () => {
    try {
      setIsLoggedIn(false);
      setUserId(null);
      setUserRole('null');
      deleteCookie('token');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <SessionContext.Provider value={{ isLoggedIn, userRole, userId, setLogin, setLogout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('Invalid session!');
  }
  return context;
};
