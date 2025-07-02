import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { URL_BACKEND_SQUIREL } from '@env';

const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

const API_URL = URL_BACKEND_SQUIREL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: !isMobile,
});

axiosInstance.interceptors.request.use(async (config) => {
  if (isMobile) {
    const token = await SecureStore.getItemAsync('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
