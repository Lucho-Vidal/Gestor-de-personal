import { IConductor } from "@/interfaces/IConductores";
import axios  from "./axios";
import { AxiosResponse } from "axios";

export const getConductor = async ():Promise<AxiosResponse<IConductor[]>> => await axios.get("/Personal/Ctor");