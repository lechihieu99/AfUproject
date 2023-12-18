import axios from 'axios'
import { API_HOST } from '../../constants/Pathname';

export const headersData = {
  'Content-type': 'application/json',
  "ngrok-skip-browser-warning": "69420"
}

const axiosApi = axios.create({
  baseURL: API_HOST
});

// Add a response interceptor
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('accessToken')

      // try {
      //   const refreshToken = localStorage.getItem('refreshToken');
      //   const response = await axios.post(`${API_HOST}/refresh`, { refreshToken: refreshToken });
      //   const { accessToken } = response.data;

      //   localStorage.setItem('accessToken', accessToken);

      //   // Retry the original request with the new token
      //   originalRequest.headers.Authorization = accessToken;
      //   return axios(originalRequest);
      // } catch (error) {
      //   // Handle refresh token error or redirect to login
      // }
    }

    return Promise.reject(error);
  }
);


export default axiosApi;