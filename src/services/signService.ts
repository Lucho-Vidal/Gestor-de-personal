import { User } from "@/interfaces/IUser";
import axios from "./axios";
import { AxiosResponse } from "axios";

export const signIn = async (user: User): Promise<AxiosResponse> => {
    const res = await axios.post("/auth/signin", {
        "email":user.email,
        "password":user.password
    });
    return res;
};

export const signUp = async (user: User): Promise<AxiosResponse> => {
    const res = await axios.post("/auth/signup", user);
    return res;
};

