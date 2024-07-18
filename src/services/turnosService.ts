import { ITurno } from "@/interfaces/ITurno";
import axios from "./axios";
import { AxiosResponse } from "axios";

export const getTurnos = async (): Promise<AxiosResponse<ITurno[]>> =>
    await axios.get("/turnos");

export const getTurno = async (id: string): Promise<AxiosResponse<ITurno>> =>
    await axios.get(`/turno/${id}`);

export const createTurno = async (turno: ITurno): Promise<AxiosResponse> => {
    const res = await axios.post("/turno", turno);
    return res;
};

export const createMultipleTurnos = async (turnos: ITurno[]): Promise<AxiosResponse> => {
    const res = await axios.post("/turnos/multiple", turnos);
    return res;
};

export const updateTurno = async (
    id: string,
    newTurno: ITurno
): Promise<AxiosResponse<ITurno>> => 
    await axios.put(`/turno/${id}`,newTurno);

export const deleteTurno =async (id: string): Promise<AxiosResponse> => 
    await axios.delete(`/turno/${id}`);
