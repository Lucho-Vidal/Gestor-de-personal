


export const clearPass = (user) => {
    
    let {_id,legajo,username, email, roles} = user;
        roles = roles.map((rol) => {
            return rol.name
        })
        return {
            _id,
            legajo,
            username,
            email,
            roles 
        }
    
}