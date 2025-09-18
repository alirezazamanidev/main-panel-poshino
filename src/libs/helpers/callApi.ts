import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
  ValidationException,
} from '../exceptions';

export const CallApi = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    withCredentials: true,
  });
  axiosInstance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (err: AxiosError) => {
      const originalRequest = err.config as AxiosRequestConfig & {
        _retry?: boolean;
      };
  
     
      // اگر خطای 401 بود و قبلاً تلاش برای رفرش نشده بود و روت مربوط به auth نباشد
      if (
        err.response?.status === 401 && 
        !originalRequest._retry && 
        originalRequest.url?.includes('/auth/check-login')
      ) {
        originalRequest._retry = true;
        try {
          console.log("refresh");
  
           await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            withCredentials: true,
          });
  
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          throw new UnauthorizedException(
           refreshError instanceof Error ? refreshError.message : "خطایی رخ داده است"
          );
        }
      }



      if (err.response) {
        const { status, data } = err.response;
        const errorMessage =
          (data as { message?: string })?.message || 'خطایی رخ داده است';

        switch (status) {
          case 400:
            throw new BadRequestException(errorMessage);
          case 401:
            throw new UnauthorizedException(errorMessage);
          case 403:
            throw new ForbiddenException(errorMessage);
          case 404:
            throw new NotFoundException(errorMessage);
          case 422:
            throw new ValidationException(errorMessage);
          default:
            throw new InternalServerException(errorMessage);
        }
      }

      throw new InternalServerException('خطا در برقراری ارتباط با سرور');
    },
  );

  return axiosInstance;
};
