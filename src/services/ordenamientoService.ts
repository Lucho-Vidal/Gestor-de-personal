import { AxiosResponse } from "axios";
import axios from "./axios"
import { Ordenamiento } from "@/interfaces/IOrdenamientos";

export const getOrdenamientos = async (): Promise<AxiosResponse<Ordenamiento[]>> =>
    await axios.get("/ordenamientos");

export const getOrdenamiento = async (id: string): Promise<AxiosResponse<Ordenamiento>> =>
    await axios.get(`/ordenamientos/${id}`);

export const createOrdenamiento = async (ordenamiento: Ordenamiento): Promise<AxiosResponse> => {
    const res = await axios.post("/ordenamientos", ordenamiento);
    return res
}
    

export const updateOrdenamiento = async (
    id: string,
    newOrdenamiento: Ordenamiento
): Promise<AxiosResponse<Ordenamiento>> =>
    await axios.put(`/ordenamientos/${id}`, newOrdenamiento);

export const deleteOrdenamiento = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/ordenamientos/${id}`);
