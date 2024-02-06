import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface InstanceConfig {
  baseURL: string;
  timeout: number;
}

const instance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3333/api/',
  timeout: 15000,
});

export default instance;

export const imageUrl = 'http://127.0.0.1:3333/storage';

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

const responseError = (error: AxiosError): Promise<never> => {
  return Promise.reject(error);
};

interface Requests {
  get: <T>(url: string, config?: { headers?: Record<string, string> }) => Promise<T>;
  post: <T>(url: string, body: any, config?: { headers?: Record<string, string> }) => Promise<T>;
  put: <T>(url: string, body: any, config?: { headers?: Record<string, string> }) => Promise<T>;
  delete: <T>(url: string, config?: { headers?: Record<string, string> }) => Promise<T>;
}

export const requests: Requests = {
  get: <T>(url: string, config?: { headers?: Record<string, string> }) =>
    instance.get<T>(url, config).then(responseBody).catch(responseError),
  post: <T>(url: string, body: any, config?: { headers?: Record<string, string> }) =>
    instance.post<T>(url, body, config).then(responseBody).catch(responseError),
  put: <T>(url: string, body: any, config?: { headers?: Record<string, string> }) =>
    instance.put<T>(url, body, config).then(responseBody).catch(responseError),
  delete: <T>(url: string, config?: { headers?: Record<string, string> }) =>
    instance.delete<T>(url, config).then(responseBody).catch(responseError),
};
