import { Novedad } from "@/interfaces/INovedades";
import axios, { AxiosResponse } from "axios";

export const getNovedades = async (): Promise<AxiosResponse<Novedad[]>> =>
    await axios.get("/Novedades");

export const getNovedad = async (id: string): Promise<AxiosResponse<Novedad>> =>
    await axios.get(`/Novedades/${id}`);

export const createNovedad = async (novedad: Novedad): Promise<AxiosResponse> =>
    await axios.post("/Novedades", novedad);

export const updateNovedad = async (
    id: string,
    newNovedad: Novedad
): Promise<AxiosResponse<Novedad>> =>
    await axios.put(`/Novedades/${id}`, newNovedad);

export const deleteNovedad = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/Novedades/${id}`);
