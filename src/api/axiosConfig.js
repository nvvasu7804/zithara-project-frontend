const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
