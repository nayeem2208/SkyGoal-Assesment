import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, 
  });
  
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('SkyUser');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  export default axiosInstance;