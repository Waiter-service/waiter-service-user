import axios from "axios";

export const waiterServiceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WAITER_API_URL, 
  withCredentials: true,
  timeout: 5000,    
});