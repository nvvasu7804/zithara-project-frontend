import axios from "axios";

const instance = axios.create({
  baseURL: "https://zithara-project-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
