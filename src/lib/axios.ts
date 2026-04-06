import axios from "axios"
import { createClient } from "./supabase";

const supabase = createClient()

export const axiosInstance = axios.create({
    baseURL: "https://ikengineering.co.nz/api",
    withCredentials: true
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const token = session?.access_token

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error("Error getting token:", error)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// Add a request interceptor
// axiosInstance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

// Add a response interceptor
// axiosInstance.interceptors.response.use(function onFulfilled(response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function onRejected(error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - maybe token expired")

      // optional: redirect to login
      // window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)
