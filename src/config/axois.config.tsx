import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://travel-backend-brown.vercel.app/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = secureLocalStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      console.error("b", error);
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401 error and not already refreshing
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        const response = await axiosInstance.post("/users/refreshtoken");
        const newToken = response.data.data.accessToken;

        secureLocalStorage.setItem("accessToken", newToken);

        // Update token for original request
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Process queued requests
        processQueue(null, newToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Logout on refresh failure
        processQueue(refreshError);
        secureLocalStorage.removeItem("accessToken");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } else if (error.response?.status === 401 && isRefreshing) {
      toast.error(
        <Link to="/signin">
          you are not logged in please click here to log in
        </Link>,
        {
          duration: 3000,
        }
      );
    }

    // If already refreshing, queue the request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          console.error("a", err);
          return Promise.reject(err);
        });
    }

    // For non-401 errors
    toast.error(error.response?.data?.message || "An error occurred");
    return Promise.reject(error);
  }
);

export interface AxiosError {
  response?: {
    status: number;
    statusText: string;
    data?: any; // Adjust the type if you know the structure of the response data
  };
  message: string;
}

export default axiosInstance;
