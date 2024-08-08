import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import profileHandler from '@/pages/api/auth/profile';
import { message } from 'antd';

interface SessionContextType {
  isLoggedIn: boolean;
  userRole: string;
  userId: number | null;
  username: string;
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
  const [username, setUsername] = useState<string>(String);

  const setProfile = async () => {
    if (getCookie('token')) {
      const profile = await profileHandler();
      setUserRole(profile.role);
      setUserId(profile.id);
      setUsername(profile.username);
    } else {
      console.error('Cannot set Profile without token');
    }
  };

  // Login handler
  const setLogin = async (values: any) => {
    try {
      const loginHandler = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          username: values.username,
          password: values.password,
        },
        body: JSON.stringify({}),
      });
      const data = await loginHandler.json();
      if (data.success) {
        setCookie('token', data.token, { maxAge: 60 * 60 * 24, secure: true, path: '/', sameSite: 'strict' });
        setCookie('username', values.username, { maxAge: 60 * 60 * 24 });

        if (values.remember === true) {
          setCookie('rememberMe', 'true', { maxAge: 60 * 60 * 24 });
        } else {
          setCookie('rememberMe', 'false', { maxAge: 60 * 60 * 24 });
        }

        setIsLoggedIn(true);
        setProfile();
      } else {
        // handle login failure
        console.error(data.error);
        message.error('Autenticação inválida. Por favor verifique o seu nome de utilizador e a sua palavra-passe.');
      }
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  // Logout handler
  const setLogout = async () => {
    try {
      setIsLoggedIn(false);
      setUserId(null);
      setUserRole('');
      setUsername('');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  // keep user loggedIn on new Session if he didnt loggedOut
  useEffect(() => {
    if (getCookie('token') !== null) {
      // keep user loggedIn on new Session if he didnt loggedOut
      setIsLoggedIn(true);
      setProfile();
    } else {
      // if user didnt loggedIn set to false
      setIsLoggedIn(false);
    }
  }, [userId, userRole]);

  return (
    <SessionContext.Provider value={{ isLoggedIn, userRole, userId, username, setLogin, setLogout }}>
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
