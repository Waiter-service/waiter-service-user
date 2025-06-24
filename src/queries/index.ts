import axios from "axios";

export const waiterServiceApi = axios.create({
  baseURL: "https://localhost:3000/api", 
  timeout: 5000,    
});