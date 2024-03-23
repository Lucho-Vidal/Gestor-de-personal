import { CambioTurno } from "@/interfaces/ICambioTurno";
import { AxiosResponse } from "axios";
import axios from "./axios"

export const getCambioTurnos = async (): Promise<AxiosResponse<CambioTurno[]>> =>
    await axios.get("/cambioTurnos");

export const getUltimoCambioTurno = async (): Promise<AxiosResponse<CambioTurno[]>> =>
    await axios.get("/ultimoCambioTurno");

export const getCambioTurno = async (id: number): Promise<AxiosResponse<CambioTurno>> =>
    await axios.get(`/cambioTurno/${id}`);

export const createCambioTurno = async (cambioTurno: CambioTurno): Promise<AxiosResponse> => {
    const res = await axios.post("/cambioTurno", cambioTurno);
    return res
}
    

export const updateCambioTurno = async (
    id: number,
    newCambioTurno: CambioTurno
): Promise<AxiosResponse<CambioTurno>> =>
    await axios.put(`/cambioTurno/${id}`, newCambioTurno);

export const deleteCambioTurno = async (id: number): Promise<AxiosResponse> =>
    await axios.delete(`/cambioTurno/${id}`);
