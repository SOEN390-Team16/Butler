import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(`Error: ${error.message}`);
    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.get()}`;
  }
  return config;
});