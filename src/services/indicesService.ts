import { Indice } from "@/interfaces/Indice";
import axios  from "./axios";
import { AxiosResponse } from "axios";

export const getIndice = async ():Promise<AxiosResponse<Indice[]>> => await axios.get("/indices");
