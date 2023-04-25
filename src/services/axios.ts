import axios, { AxiosInstance } from "axios";

const axiosIntance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    hearders: {
        "Content-Type": "application/json",
    },
});

export default axiosIntance;
