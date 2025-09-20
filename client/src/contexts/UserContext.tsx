import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserType } from '../types/user';

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  switchToStudent: () => void;
  switchToAdmin: () => void;
  switchToCandidate: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(UserType.UNAUTHENTICATED);

  const switchToStudent = () => setUserType(UserType.STUDENT);
  const switchToAdmin = () => setUserType(UserType.ADMIN);
  const switchToCandidate = () => setUserType(UserType.CANDIDATE);
  const logout = () => setUserType(UserType.UNAUTHENTICATED);

  const value: UserContextType = {
    userType,
    setUserType,
    switchToStudent,
    switchToAdmin,
    switchToCandidate,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
