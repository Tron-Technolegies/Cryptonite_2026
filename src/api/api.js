import axios from "axios";

const forceLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  window.dispatchEvent(new Event("auth-change"));

  window.location.replace("/login");
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

//  REQUEST: attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE: handle expired auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      forceLogout();
    }

    return Promise.reject(error);
  },
);

export default api;
