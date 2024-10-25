import axiosInstance from '../axiosInstance';

export const fetch = async () => {
  try {
    const response = await axiosInstance.get(`/routes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const create = async (RouteData: any) => {
  try {
    const response = await axiosInstance.post('/createRoute', RouteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

