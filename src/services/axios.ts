import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    //baseURL: "http://localhost:3000/api",
    baseURL: "http://172.22.108.24:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
