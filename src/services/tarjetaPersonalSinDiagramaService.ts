import {ITarjetaPersonalSinDiagrama} from "../interfaces/ITarjetaPersonalSinDiagrama";
import axios from "./axios";
import { AxiosResponse } from "axios";

export const getTarjetaPersonalesSinDiagrama = async (): Promise<AxiosResponse<ITarjetaPersonalSinDiagrama[]>> =>
    await axios.get("/tarjetaPersonalSinDiagrama");

export const getTarjetaPersonalSinDiagrama = async (id: string): Promise<AxiosResponse<ITarjetaPersonalSinDiagrama>> => 
    await axios.get(`/tarjetaPersonalSinDiagrama/${id}`);

export const getTarjetaPersonalSinDiagramaPorLegajo = async (legajo: number, mes: string): Promise<AxiosResponse<ITarjetaPersonalSinDiagrama>> => 
    await axios.get(`/tarjetaPersonalSinDiagramaPorMes?legajo=${legajo}&mes=${mes}`);


export const createTarjetaPersonalSinDiagrama = async (personal: ITarjetaPersonalSinDiagrama): Promise<AxiosResponse> => {
    const res = await axios.post("/tarjetaPersonalSinDiagrama", personal);
    return res;
};

export const updateTarjetaPersonalSinDiagrama = async (legajo: number,newPersonal: ITarjetaPersonalSinDiagrama): Promise<AxiosResponse<ITarjetaPersonalSinDiagrama>> => {
    return await axios.put(`/tarjetaPersonalSinDiagrama/${legajo}`, newPersonal)
}

export const deleteTarjetaPersonalSinDiagrama = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/tarjetaPersonalSinDiagrama/${id}`);
