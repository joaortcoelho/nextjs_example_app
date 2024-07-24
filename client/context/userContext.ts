import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getCurUser } from '../pages/api/auth/user';

interface UserContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (newState: boolean) => void;
}

const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

type ContextProviderProps = {
  children?: ReactNode;
};
/*
export const UserProvider = ({ children }: ContextProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isLogged = getCurUser() ? true : false;
        setIsLoggedIn(isLogged);
    }, [isLoggedIn]);

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};
*/

export const useUser = (): UserContextValue => useContext(UserContext);
