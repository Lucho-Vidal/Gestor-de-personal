import User from "../models/User";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import config from "../config";


export const singUp = async (req, res) => {
    const { legajo, username, email, password, roles } = req.body;

    //const userFound = User.find({email})
    
    const newUser = new User({
        legajo,
        username,
        email,
        password: await User.encryptPassword(password),
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
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 600 //86400, //en segundos es un dia o 24hs
    });

    res.status(200).json({ token });
};

export const singIn = async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email }).populate(
        "roles"
    );
    if (!userFound) return res.status(400).json({ message: "User not found" });
    const matchPassword = await User.comparePassword(
        req.body.password,
        userFound.password
    );

    if (!matchPassword)return res.status(401).json({ token: null, message: "Invalid password" });
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 3600 //86400,
    });
    userFound.password = "";

    res.status(200).json({
        token,
        username: userFound.username,
        role: userFound.roles.map(rol => rol.name),
        updatePass: userFound.updatePass
    });
};

export const refreshToken = async (req,res) => {
    try {
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, config.SECRET);
        const user = await User.findById(decoded.id).populate('roles');
        const newToken = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 3600 //86400,
        });
        res.json({
            token: newToken,
            username: user.username,
            role: user.roles.map(rol => rol.name),
        });
    } catch (error) {
        return res.status(500).json({error: "error de server"});
    }
}