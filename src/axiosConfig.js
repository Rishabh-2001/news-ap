import axios from "axios";
const BASE_URL=process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(function (config) {
  if (typeof localStorage !== "undefined") {
    const user = localStorage.getItem("currentUser");
    const token= JSON.parse(user)?.token;
    // console.log("USERSSS", user);
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
  }
  config.headers.set("ngrok-skip-browser-warning", true);
  config.headers.set("Access-Control-Allow-Origin", "*");
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      // localStorage.clear();
      
      window.location = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
