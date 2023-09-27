import { IPersonal } from "@/interfaces/IPersonal";
import axios  from "./axios";
import { AxiosResponse } from "axios";

export const getPersonales = async ():Promise<AxiosResponse<IPersonal[]>> => await axios.get("/Personal/Ctor");

export const createPersonal= async (personal: IPersonal): Promise<AxiosResponse> => {
    const res = await axios.post("/Personal", personal);
    return res
}