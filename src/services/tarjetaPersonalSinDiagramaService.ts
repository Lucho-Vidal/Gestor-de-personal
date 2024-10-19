import {ITarjetaPersonalSinDiagrama} from "../interfaces/ITarjetaPersonalSinDiagrama";
import axios from "./axios";
import { AxiosResponse } from "axios";

export const getTarjetaPersonalesSinDiagrama = async (): Promise<AxiosResponse<ITarjetaPersonalSinDiagrama[]>> =>
    await axios.get("/tarjetaPersonalSinDiagrama");

export const getTarjetaPersonalSinDiagrama = async (id: string): Promise<AxiosResponse<ITarjetaPersonalSinDiagrama>> => 
    await axios.get(`/tarjetaPersonalSinDiagramaById/${id}`);

export const getTarjetaPersonalSinDiagramaPorLegajoYMes = async (legajo: number, mes: string): Promise<AxiosResponse<ITarjetaPersonalSinDiagrama>> => 
    await axios.get(`/tarjetaPersonalSinDiagramaPorLegajoYMes?legajo=${legajo}&mes=${mes}`);


export const createTarjetaPersonalSinDiagrama = async (personal: ITarjetaPersonalSinDiagrama): Promise<AxiosResponse> => {
    const res = await axios.post("/tarjetaPersonalSinDiagrama", personal);
    return res;
};

export const updateTarjetaPersonalSinDiagrama = async (id: string,newPersonal: ITarjetaPersonalSinDiagrama): Promise<AxiosResponse<ITarjetaPersonalSinDiagrama>> => {
    return await axios.put(`/tarjetaPersonalSinDiagrama/${id}`, newPersonal)
}

export const deleteTarjetaPersonalSinDiagrama = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/tarjetaPersonalSinDiagrama/${id}`);
