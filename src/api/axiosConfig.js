
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zithara-project-backend.onrender.com", // or your local/dev endpoint
});

export default axiosInstance;
