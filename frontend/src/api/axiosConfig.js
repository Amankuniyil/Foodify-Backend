import axios from "axios";
import store from "../Redux/store";
import {
  setAccessToken,
  setRefreshToken,
  setTokenExpiry,
  clearUser,
} from "../Redux/store";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const dispatch = store.dispatch;
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios interceptor for request
api.interceptors.request.use(
  (config) => {
    // Check if access token is available in the Redux store
    const accessToken = store.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor for response errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized error, possibly due to an expired access token
      const refreshToken = store.getState().refreshToken;
      if (refreshToken) {
        try {
          // Send a request to refresh the access token
          const response = await api.post("/token/refresh/", {
            refresh: refreshToken,
          });

          if (response.status === 200) {
            const newAccessToken = response.data.access;
            const newTokenExpiry = response.data.token_expiry;

            // Update access token and token expiry in Redux and local storage
            dispatch(setAccessToken(newAccessToken));
            localStorage.setItem("accessToken", newAccessToken);
            dispatch(setTokenExpiry(newTokenExpiry));
            localStorage.setItem("tokenExpiry", newTokenExpiry);

            // Retry the original request with the new access token
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios.request(error.config);
          } else {
            dispatch(clearUser());
            toast.error('Authentication Token expired. Please login!');
          }
        } catch (refreshError) {
          dispatch(clearUser());
        }
      } else {
        dispatch(clearUser());
      }
    }
    return Promise.reject(error);
  }
);

export default api;



