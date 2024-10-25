import axiosInstance from '../axiosInstance';

export const login = async (userData: any) => {
  try {
    const response = await axiosInstance.get(`/user`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axiosInstance.post('/createUser', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

