export interface User{
    legajo: number;
    username: string;
    email: string;
    password: string;
    roles: Array<string>;
}