import axiosClient from '../../../config/axios';

export const courtApi = {
  getAll: async (params?: Record<string, any>) => {
    return axiosClient.get('/courts', { params });
  },
  
  getById: async (id: string) => {
    return axiosClient.get(`/courts/${id}`);
  },
  
  create: async (courtData: any) => {
    return axiosClient.post('/owner/courts', courtData);
  },
  
  update: async (id: string, courtData: any) => {
    return axiosClient.put(`/owner/courts/${id}`, courtData);
  },
  
  delete: async (id: string) => {
    return axiosClient.delete(`/owner/courts/${id}`);
  },
};
