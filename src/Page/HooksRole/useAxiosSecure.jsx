import { useEffect, use } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_Server_localhost,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logout, Loading } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Loading && user) {
      const requestInterceptor = axiosInstance.interceptors.request.use(
        async (config) => {
          const token = await user.getIdToken(); 
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        }
      );

      const responseInterceptor = axiosInstance.interceptors.response.use(
        res => res,
        err => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logout();
            navigate("/login");
          }
          return Promise.reject(err);
        }
      );

      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, Loading, logout, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
