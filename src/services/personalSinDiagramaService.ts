import {IPersonalSinDiagrama} from "@/interfaces/IPersonalSinDiagrama";
import axios from "./axios";
import { AxiosResponse } from "axios";

export const getPersonalesSinDiagrama = async (): Promise<AxiosResponse<IPersonalSinDiagrama[]>> =>
    await axios.get("/PersonalSinDiagrama");

export const getPersonalSinDiagrama = async (
    id: string
): Promise<AxiosResponse<IPersonalSinDiagrama>> => await axios.get(`/PersonalSinDiagrama/${id}`);

export const getPersonalSinDiagramaPorPeriodo = async (legajo:number,periodo: string)
    :Promise<AxiosResponse<IPersonalSinDiagrama>> => await axios.get(`/PersonalSinDiagramaPorPeriodo/${legajo}/${periodo}`);

export const createPersonalSinDiagrama = async (
    personal: IPersonalSinDiagrama
): Promise<AxiosResponse> => {
    const res = await axios.post("/PersonalSinDiagrama", personal);
    return res;
};

export const updatePersonalSinDiagrama = async (
    id: string,
    newPersonal: IPersonalSinDiagrama
): Promise<AxiosResponse<IPersonalSinDiagrama>> =>
    await axios.put(`/PersonalSinDiagrama/${id}`, newPersonal);

export const deletePersonalSinDiagrama = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/PersonalSinDiagrama/${id}`);
