import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    //baseURL: "http://localhost:3000/api",
    //baseURL: "http://172.22.108.24:3000/api",
    baseURL: "https://gnpd.onrender.com/api",
    //withCredentials:true,
    headers: {
        "Content-Type": "application/json",
        
        'x-access-token': localStorage.getItem('token')
    },
});

export default axiosInstance;
