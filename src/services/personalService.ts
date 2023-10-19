import { IPersonal } from "@/interfaces/IPersonal";
import axios from "./axios";
import { AxiosResponse } from "axios";

export const getPersonales = async (): Promise<AxiosResponse<IPersonal[]>> =>
    await axios.get("/Personal");

export const getPersonal = async (
    id: string
): Promise<AxiosResponse<IPersonal>> => await axios.get(`/Personal/${id}`);

export const createPersonal = async (
    personal: IPersonal
): Promise<AxiosResponse> => {
    const res = await axios.post("/Personal", personal);
    return res;
};

export const updatePersonal = async (
    id: string,
    newPersonal: IPersonal
): Promise<AxiosResponse<IPersonal>> =>
    await axios.put(`/Personal/${id}`, newPersonal);

export const deletePersonal = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/Personal/${id}`);
