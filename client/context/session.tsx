import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import profileHandler, { Profile } from '@/pages/api/auth/profile';

interface SessionContextType {
  isLoggedIn: boolean;
  userRole: string;
  userId: number | null;
  setIsLoggedIn: (value: boolean) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string>(String);

  const setProfile = async () => {
    try {
      const data = await profileHandler();
      setUserRole(data.role);
      setUserId(data.id);
    } catch (error) {
      console.error('Failed to get data from profile', error);
    }
  };

  useEffect(() => {
    const token = getCookie('token');
    setIsLoggedIn(!!token); // make sure its a boolean
    setProfile();
  }, []);

  return (
    <SessionContext.Provider value={{ isLoggedIn, userRole, userId, setIsLoggedIn }}>
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
