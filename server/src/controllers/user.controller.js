import User from "../models/User";
import {ClearUser} from '../middlewares'
import Role from "../models/Role";

export const getUsers = async (req, res) => {
    const users = await User.find().populate("roles");
    const clearUsers =  users.map(user =>{
        return ClearUser.clearPass(user)
    })
    res.json(clearUsers);
};

export const getUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).populate("roles");
    const clearUser = ClearUser.clearPass(user);
    res.json(clearUser);
};

export const updateUser = async (req,res) => {
    const { legajo, username, email, roles } = req.body;

    //const userFound = User.find({email})
    
    const newUser = new User({
        legajo,
        username,
        email,
    });
    if (roles.length > 0) {
        if (roles.includes('admin')){
            roles.push('moderator')
            roles.push('user')
        }else if(roles.includes('moderator')){
            roles.push('user')
        }

        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
    } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
    }

    const id = req.params.id;
    await newUser.findByIdAndUpdate(id);

    res.status(200)
}

