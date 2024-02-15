
import { Registro } from "@/interfaces/IRegistro";
import axios from "./axios";
import { AxiosResponse } from "axios";

export const getRegistros = async():Promise<AxiosResponse<Registro[]>> => await axios.get("/registros");

export const createRegistro = async (registro:Registro):Promise<AxiosResponse> => {
        const res = await axios.post("/registros", registro)
        return res;
}