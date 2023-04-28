import { Itinerario } from "@/interfaces/Itinerario";
import axios  from "./axios";
import { AxiosResponse } from "axios";

export const getItinerario = async ():Promise<AxiosResponse<Itinerario[]>> => await axios.get("/itinerarioH");