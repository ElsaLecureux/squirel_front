import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface UserContextType {
    userId: string | null;
    setUserId: (id: string | null) => void;
    signOut: () => void;
}

// Create the context with an initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
  
    const signOut = () => {
        setUserId(null);
    };

    return (
        <UserContext.Provider value={{ userId, setUserId, signOut }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the context safely
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

