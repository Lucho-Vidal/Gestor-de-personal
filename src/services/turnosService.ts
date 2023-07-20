import { ITurno } from "@/interfaces/ITurno";
import axios  from "./axios";
import { AxiosResponse } from "axios";

export const getTurnos = async ():Promise<AxiosResponse<ITurno[]>> => await axios.get("/turnos");
