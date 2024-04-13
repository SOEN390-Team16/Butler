import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unexpected error occurred"

    if (error.response && error.response.data) {
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    }
    toast.error(`Error: ${errorMessage}`);
    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});