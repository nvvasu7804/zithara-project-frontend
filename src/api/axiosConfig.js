const baseURL = "https://zithara-project-backend.onrender.com" || "http://localhost:5001/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
