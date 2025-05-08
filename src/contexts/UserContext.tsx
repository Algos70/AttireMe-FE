import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from '../utils/cookies';
import { DecodedToken, decodeToken } from '../utils/jwt';

interface UserContextType {
  user: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const idToken = getCookie('id_token');
    if (idToken) {
      const decodedUser = decodeToken(idToken);
      setUser(decodedUser);
    }
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 