import { Conductor, Guarda } from "@/class/Personal";
import axios  from "./axios";
import { AxiosResponse } from "axios";

export const getConductor = async ():Promise<AxiosResponse<Conductor[]>> => await axios.get("/Personal/Ctor");
export const getGuarda = async ():Promise<AxiosResponse<Guarda[]>> => await axios.get("/Personal/Gda");