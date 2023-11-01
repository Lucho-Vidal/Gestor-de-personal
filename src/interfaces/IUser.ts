export interface User{
    _id: string;
    legajo: number;
    username: string;
    email: string;
    password: string;
    roles: Array<string>;
}