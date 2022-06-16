import axios from 'axios';

export type httpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const axiosRequest = async (endpoint: string, method: httpMethod, data?: any) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`;

    const response = await axios({
      method,
      url,
      data,
    });
    return response;
  } catch (err) {
    return null;
  }
};
