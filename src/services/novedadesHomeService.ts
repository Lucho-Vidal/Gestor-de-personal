import { AxiosResponse } from "axios";
import axios from "./axios"
import { NovedadHome } from "@/interfaces/INovedadesHome";

export const getNovedadesHome = async (): Promise<AxiosResponse<NovedadHome[]>> =>
    await axios.get("/novedadesHome");

export const getNovedadHome = async (id: string): Promise<AxiosResponse<NovedadHome>> =>
    await axios.get(`/novedadesHome/${id}`);

export const createNovedadHome = async (novedad: NovedadHome): Promise<AxiosResponse> => {
    const res = await axios.post("/novedadesHome", novedad);
    return res
}

export const updateNovedadHome = async (
    id: string,
    newNovedad: NovedadHome
): Promise<AxiosResponse<NovedadHome>> =>
    await axios.put(`/novedadesHome/${id}`, newNovedad);

export const deleteNovedadHome = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/novedadesHome/${id}`);


export const uploadImg = async (formData: FormData, id: string): Promise<AxiosResponse> => {
    return await axios.post(`/novedadesHome/${id}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
