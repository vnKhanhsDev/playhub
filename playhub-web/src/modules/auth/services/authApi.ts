import axiosClient from '../../../config/axios';
import type { AuthResponse } from '../types';

export const authApi = {
  login: async (credentials: Record<string, string>): Promise<AuthResponse> => {
    return axiosClient.post('/auth/login', credentials);
  },
  
  register: async (userData: Record<string, string>): Promise<AuthResponse> => {
    return axiosClient.post('/auth/register', userData);
  },
};
