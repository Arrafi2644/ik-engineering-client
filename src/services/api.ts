import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ApiResponse, ContactFormData, JobApplicationData } from "@/types";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Use relative URL in production (when served from same domain)
    // Use full URL in development
    const baseURL = import.meta.env.PROD
      ? "" // Relative to current domain in production
      : "https://ikengineering.co.nz"; // Full URL for development

    this.axiosInstance = axios.create({
      baseURL,
      timeout: 30000, // 30 seconds
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      }
    );
  }

  // Contact form submission
  async submitContactForm(formData: ContactFormData): Promise<ApiResponse> {
    const submitData = new FormData();

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          submitData.append(key, value);
        } else {
          submitData.append(key, String(value));
        }
      }
    });

    const response = await this.axiosInstance.post<ApiResponse>(
      "/api/contact",
      submitData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;
  }

  // Job application submission
  async submitJobApplication(
    formData: JobApplicationData
  ): Promise<ApiResponse> {
    const submitData = new FormData();

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          submitData.append(key, value);
        } else {
          submitData.append(key, String(value));
        }
      }
    });

    const response = await this.axiosInstance.post<ApiResponse>(
      "/api/application",
      submitData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
