import User from "../models/User";
import Role from "../models/Role";

export const getUsers = async (req, res) => {
    try {
        // Utiliza proyección para excluir la contraseña
        const users = await User.find().select('-password').populate("roles");

        const clearUsers = users.map(user => ({
            _id: user._id,
            legajo: user.legajo,
            username: user.username,
            email: user.email,
            roles: user.roles.map(role => ({ _id: role._id, name: role.name })),
        }));

        res.json(clearUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error de servidor al obtener los usuarios" });
    }
};

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Utiliza proyección para excluir la contraseña
        const user = await User.findById(id).select('-password').populate("roles");

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error de servidor al obtener el usuario" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { legajo, username, email, roles } = req.body;
        const id = req.params.id;

        // Verificar si el usuario existe
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar los campos proporcionados
        existingUser.legajo = legajo || existingUser.legajo;
        existingUser.username = username || existingUser.username;
        existingUser.email = email || existingUser.email;

        if (roles && roles.length > 0) {
            // Solo actualiza los roles si se proporciona alguno
            const foundRoles = await Role.find({ name: { $in: roles.map(role => role.name) } });
            existingUser.roles = foundRoles.map((role) => role._id);
        }

        // Guardar los cambios
        await existingUser.save();

        res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error de servidor al actualizar el usuario" });
    }
};


export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.userId; // Asumiendo que has almacenado el ID del usuario en el token durante la autenticación

        const user = await User.findById(userId);

        // Verifica que la contraseña actual sea válida
        const matchPassword = await User.comparePassword(currentPassword, user.password);
        if (!matchPassword) {
            return res.status(401).json({ message: "Contraseña actual incorrecta" });
        }

        // Cambia la contraseña
        user.password = await User.encryptPassword(newPassword);
        await user.save();

        res.status(200).json({ message: "Contraseña cambiada exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error de servidor al cambiar la contraseña" });
    }
};

export const deleteUser = async (req,res) =>{
    try {
        const id = req.params.id; // Asegúrate de obtener el ID del parámetro de la solicitud
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            // Si el usuario no se encuentra, devuelve un error 404
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error de servidor al eliminar usuario" });
    }
}