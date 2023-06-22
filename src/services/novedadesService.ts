import { Novedad } from "@/interfaces/INovedades";
import { AxiosResponse } from "axios";
import axios from "./axios"

export const getNovedades = async (): Promise<AxiosResponse<Novedad[]>> =>
    await axios.get("/novedades");

export const getUltimaNovedad = async (): Promise<AxiosResponse<Novedad[]>> =>
    await axios.get("/ultimaNovedad");

export const getNovedad = async (id: string): Promise<AxiosResponse<Novedad>> =>
    await axios.get(`/novedades/${id}`);

export const createNovedad = async (novedad: Novedad): Promise<AxiosResponse> => {
    const res = await axios.post("/novedades", novedad);
    return res
}
    

export const updateNovedad = async (
    id: string,
    newNovedad: Novedad
): Promise<AxiosResponse<Novedad>> =>
    await axios.put(`/novedades/${id}`, newNovedad);

export const deleteNovedad = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/novedades/${id}`);
