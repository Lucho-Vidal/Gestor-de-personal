import { User } from "@/interfaces/IUser";
import axios from "./axios";
import { AxiosResponse } from "axios";
import router from '../router'

let roles = [] as string[];
let rolMayor = '';

export const getRolMayor = ():string =>{
    return rolMayor;
}
export const setRolMayor = (newRol:string):void =>{
    rolMayor = newRol;
}
export const getRoles = ():string[] =>{
    return roles
}
export const setRoles = (newRoles:string[]):void =>{
    roles = newRoles;
}
export const signIn = async (user: User): Promise<AxiosResponse> => {
    const res = await axios.post("/auth/signin", {
        "email":user.email,
        "password":user.password
    });
    return res;
};

export const refreshToken = async (): Promise<AxiosResponse> => {
    const res = await axios.get("/auth/refresh");
    return res;
};

export const signUp = async (user: User): Promise<AxiosResponse> => {
    const res = await axios.post("/auth/signup", {
        "legajo": user.legajo,
        "username": user.username,
        "email":user.email,
        "password":user.password,
        "roles": user.roles
    });
    return res;
    
};

export const newToken = async() => {
    try {
        const res = await refreshToken();
        if (res.status === 200) {
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("username", res.data.username);
            window.localStorage.setItem("roles", res.data.role);
            setRoles(res.data.role); 
        }

    } catch (error){
        console.log('hi');
        window.localStorage.clear()
        router.push('/login')
    }
    
}