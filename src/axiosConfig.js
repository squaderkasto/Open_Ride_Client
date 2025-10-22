import axios from "axios";

// Create axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Attach token to every request dynamically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
