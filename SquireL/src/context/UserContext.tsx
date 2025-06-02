import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/types/navigationTypes'; // make sure this import is correct

// Define the shape of the context
interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  signOut: () => void;
  isLoading: boolean;
  checkIfSignedIn: () => Promise<boolean>;
}

// Create the context with an initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  type NavigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  const signOut = async () => {
    setUserId(null);
    if (Platform.OS === 'web') {
      localStorage.removeItem('access_token');
    } else if (Platform.OS === 'ios' || Platform.OS === 'android') {
      await SecureStore.deleteItemAsync('access_token');
    }
    navigation.navigate('Welcome');
  };

  const checkIfSignedIn = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      let token: string | null = null;
      if (Platform.OS === 'web') {
        token = localStorage.getItem('access_token');
      } else if (Platform.OS === 'ios' || Platform.OS === 'android') {
        token = await SecureStore.getItemAsync('access_token');
      }
      if (token) {
        const decodedToken = jwtDecode(token);
        if (
          decodedToken.exp != undefined &&
          decodedToken.exp > Date.now() / 1000 &&
          decodedToken.sub
        ) {
          setUserId(decodedToken.sub);
          setIsLoading(false);
          return true;
        }
        setIsLoading(false);
        return false;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.log('Error checking if sign In:', error);
      setIsLoading(false);
      return false;
    }
  };

  const contextValue = useMemo(
    () => ({
      userId,
      setUserId,
      signOut,
      isLoading,
      checkIfSignedIn,
    }),
    [userId, isLoading],
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
