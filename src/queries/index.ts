import axios from "axios";

export const waiterServiceApi = axios.create({
  baseURL: "http://localhost:3000/api", 
  withCredentials: true,
  timeout: 5000,    
});