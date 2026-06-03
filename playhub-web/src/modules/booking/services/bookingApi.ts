import axiosClient from '../../../config/axios';

export const bookingApi = {
  create: async (bookingData: any) => {
    return axiosClient.post('/bookings', bookingData);
  },
  
  getHistory: async () => {
    return axiosClient.get('/bookings/history');
  },
  
  getOwnerSchedule: async () => {
    return axiosClient.get('/owner/bookings');
  },
  
  updateStatus: async (id: string, status: string) => {
    return axiosClient.patch(`/owner/bookings/${id}`, { status });
  },
};
