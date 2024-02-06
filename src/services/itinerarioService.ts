import { Itinerario } from "@/interfaces/Itinerario";
import axios from "./axios";
import { AxiosResponse } from "axios";

export const getItinerario = async (): Promise<AxiosResponse<Itinerario[]>> =>
    await axios.get("/itinerario");

export const getItinerarioPaginado = async (
    page: number,
    pageSize: number
): Promise<AxiosResponse<Itinerario[]>> => {
    return axios
        .get(`/itinerario?page=${page}&pageSize=${pageSize}`)
        .then((response: AxiosResponse<Itinerario[]>) => {
            // Verificar si la respuesta tiene la forma esperada (ajusta según tus necesidades)
            const itinerarioData: Itinerario[] = response.data;
            return { ...response, data: itinerarioData };
        })
        .catch((error) => {
            // Manejar errores aquí
            throw error;
        });
};
