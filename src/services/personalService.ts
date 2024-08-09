import {
    IConocimientosVias,
    IDatoPersonal,
    IPersonal,
} from "@/interfaces/IPersonal";
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

export const createMultiplePersonal = async (
    personales: IPersonal[]
): Promise<AxiosResponse> => {
    console.log(
        `Tamaño del payload: ${JSON.stringify(personales).length} bytes`
    );
    const res = await axios.post("/Personal-multiple", personales);
    return res;
};

export const updatePersonal = async (
    id: string,
    newPersonal: IPersonal
): Promise<AxiosResponse<IPersonal>> =>
    await axios.put(`/Personal/${id}`, newPersonal);

export const deletePersonal = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/Personal/${id}`);

export const deleteMultiplePersonal = async (): Promise<AxiosResponse> =>
    await axios.delete("/Personal-multiple");

//--------------------------------------------------------------------------------------------
// Datos Personales
export const getDatosPersonales = async (): Promise<
    AxiosResponse<IDatoPersonal[]>
> => await axios.get("/DatoPersonal");

export const getDatoPersonal = async (
    id: string
): Promise<AxiosResponse<IDatoPersonal>> =>
    await axios.get(`/DatoPersonal/${id}`);

export const createDatoPersonal = async (
    personal: IDatoPersonal
): Promise<AxiosResponse> => {
    const res = await axios.post("/DatoPersonal", personal);
    return res;
};

export const updateDatoPersonal = async (
    id: string,
    newPersonal: IDatoPersonal
): Promise<AxiosResponse<IDatoPersonal>> =>
    await axios.put(`/DatoPersonal/${id}`, newPersonal);

export const deleteDatoPersonal = async (id: string): Promise<AxiosResponse> =>
    await axios.delete(`/DatoPersonal/${id}`);

//--------------------------------------------------------------------------------------------
// Cargar imagen de datos personales
export const uploadImg = async (formData: FormData,id: string): Promise<AxiosResponse> => {
    try {
        const res = await axios.post(`/upload/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (error) {
        console.error("Error al Subir imagen:", error);
        throw error;
    }
};

//--------------------------------------------------------------------------------------------
// Conocimiento de Vias
export const getConocimientosVias = async (): Promise<
    AxiosResponse<IConocimientosVias[]>
> => await axios.get("/vias");

export const getConocimientoVia = async (
    id: string
): Promise<AxiosResponse<IConocimientosVias>> => await axios.get(`/vias/${id}`);

export const createConocimientoVia = async (
    via: IConocimientosVias
): Promise<AxiosResponse> => {
    const res = await axios.post("/vias", via);
    return res;
};

export const updateConocimientoVia = async (
    id: string,
    newVia: IConocimientosVias
): Promise<AxiosResponse<IConocimientosVias>> =>
    await axios.put(`/vias/${id}`, newVia);

export const deleteConocimientoVia = async (
    id: string
): Promise<AxiosResponse> => await axios.delete(`/vias/${id}`);
