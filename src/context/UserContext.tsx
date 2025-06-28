import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axiosInstance from '../utils/axiosInstance';

// Define the shape of the context
interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  signOut: () => void;
  isLoading: boolean;
  isSignedIn: boolean;
  checkIfSignedIn: () => Promise<boolean>;
}

// Create the context with an initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkIfSignedIn = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const authResponse = await axiosInstance.get('/auth/me');
      const userId = authResponse.data.userId;
      setUserId(userId);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log('Error checking if sign In:', error);
      setIsLoading(false);
      setUserId(null);
      return false;
    }
  }, [setUserId, setIsLoading]);

  const signOut = useCallback(async () => {
    try {
      await axiosInstance.post('/auth/signout');
    } catch (error) {
      console.log(error);
    }
    setUserId(null);
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      try {
        await SecureStore.deleteItemAsync('access_token');
      } catch (error) {
        console.warn('Failed to clear local storage', error);
      }
    }
  }, [setUserId]);

  useEffect(() => {
    const bootstrapAuth = async () => {
      setIsLoading(true);
      await checkIfSignedIn();
      setIsLoading(false);
    };
    bootstrapAuth();
  }, [checkIfSignedIn]);

  const contextValue = useMemo(
    () => ({
      userId,
      setUserId,
      signOut,
      isLoading,
      checkIfSignedIn,
      isSignedIn: userId !== null,
    }),
    [userId, setUserId, signOut, isLoading, checkIfSignedIn],
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Custom hook to use the context safely
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
