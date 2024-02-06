import axios, { AxiosInstance, AxiosError } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Agregar un interceptor para incluir el token de acceso en cada solicitud
axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        } catch (error) {
            console.error('Error al intentar obtener el token desde el almacenamiento local:', error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Agregar un interceptor para manejar errores de autorización
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        try {
            if (error.response && error.response.status === 401) {
                // Manejar la lógica de renovación de token o redirección a la página de inicio de sesión
                console.error('Error de autorización: Token no válido o caducado');
            }
        } catch (error) {
            console.error('Error al manejar la respuesta:', error);
        }
        return Promise.reject(error);
    }
);



export default axiosInstance;
