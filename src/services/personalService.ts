import { IConductor } from "@/interfaces/IConductores";
import { IGuarda } from "@/interfaces/IGuarda";
import axios  from "./axios";
import { AxiosResponse } from "axios";

export const getConductor = async ():Promise<AxiosResponse<IConductor[]>> => await axios.get("/Personal/Ctor");
export const getGuarda = async ():Promise<AxiosResponse<IGuarda[]>> => await axios.get("/Personal/Gda");