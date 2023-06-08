import { IPersonal } from "@/interfaces/IPersonal";
import axios  from "./axios";
import { AxiosResponse } from "axios";

export const getPersonales = async ():Promise<AxiosResponse<IPersonal[]>> => await axios.get("/Personal/Ctor");