import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const getSubdomain = () => {
  try {
    const subdomain = useAuthStore.getState().subdomain;
    return subdomain || localStorage.getItem("subdomain") || "";
  } catch {
    return localStorage.getItem("subdomain");
  }
};

const instance = axios.create({
  baseURL: `https://${getSubdomain()}.ox-sys.com`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  const isDefaultBaseURL =
    !config.baseURL || config.baseURL === instance.defaults.baseURL;

  if (isDefaultBaseURL) {
    const subdomain = getSubdomain();
    if (subdomain) {
      config.baseURL = `https://${subdomain}.ox-sys.com`;
    }
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (error.config?.method?.toLowerCase() === "get") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
