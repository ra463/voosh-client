import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://voosh-server-32um.onrender.com",
});

export default axiosInstance;
