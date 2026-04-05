// import axios from "axios";
// import Cookies from "js-cookie";

// export const useAxiosSecure = () => {
//   const axiosInstance = axios.create({
//     baseURL: "/api",
//     withCredentials: true, 
//   });
//   // Request interceptor
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = Cookies.get("accessToken");
//       if (token && config.headers) {
//         config.headers.authorization = token; 
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return axiosInstance;
// };