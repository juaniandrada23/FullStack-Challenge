import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_CONFIG } from "../config/api.config";

class HttpService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.code === "ECONNABORTED" ||
          error.message === "Network Error" ||
          error.toString().includes("ERR_CONNECTION")
        ) {
          return Promise.reject(
            new Error("No se pudo conectar con el servidor."),
          );
        }

        const status = error?.response?.status;
        const apiMessage =
          error?.response?.data?.message || error?.response?.data?.error;

        if (status) {
          const friendly =
            apiMessage || `Error del servidor (código ${status}).`;
          return Promise.reject(new Error(friendly));
        }

        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const httpService = new HttpService();
