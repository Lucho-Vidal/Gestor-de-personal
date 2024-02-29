export interface User{
    _id: string;
    legajo: number;
    username: string;
    email: string;
    password: string;
    updatePass:boolean;
    roles: Role[];
}

export interface Role{
    _id: string,
    name: string
}
