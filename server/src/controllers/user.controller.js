import User from "../models/User";
import {clearPass} from '../middlewares'

export const getUsers = async (req, res) => {
    const users = await User.find().populate("roles");
    const clearUsers =  users.map(user =>{
        return clearPass(user)
    })
    res.json(clearUsers);
};

export const getUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).populate("roles");
    const clearUser = clearPass(user);
    res.json(clearUser);
};

