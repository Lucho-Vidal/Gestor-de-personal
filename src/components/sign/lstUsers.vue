<template>
    <div>
        <NavBar />

        <main class="container">
            <h2 class="d-flex justify-content-center m-3">
                Lista de usuarios habilitados
            </h2>
            <div class="d-flex">
                <a class="btn btn-primary d-flex end" href="/newUser"
                    >Nuevo Usuario</a
                >
            </div>
            <h3 v-if="users.length == 0">
                No se encontró ningún usuario con los requerimientos
                especificados.
            </h3>

            <table
                v-if="users.length > 0"
                class="table table-striped table-hover"
            >
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">Legajo</th>
                        <th class="col-1" colspan="1">Nombre y Apellido</th>
                        <th class="col-1" colspan="1">Email</th>
                        <th class="col-1" colspan="1">Roles</th>
                        <th class="col-1">Editar</th>
                        <th class="col-1">Eliminar</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(user, index) in users"
                    :key="index"
                    @dblclick="edit(user._id)"
                >
                    <tr class="Small shadow">
                        <td class="col-1">{{ user.legajo }}</td>
                        <td class="col-1">{{ user.username }}</td>
                        <td class="col-1">{{ user.email }}</td>
                        <td class="col-2">{{ getRolMayor(user.roles[getUbicacionRolMayor(user)].name) }}</td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-pen-to-square"
                                @click="edit(user._id)"
                            ></i>
                        </td>
                        <td class="col-1">
                            <i class="fa-solid fa-trash-can"
                                @click="eliminarUsuario(user._id,index)"
                            ></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>

        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { deleteUser, getUsers, newToken } from '../../services/signService';
import { User } from '../../interfaces/IUser';
import { AxiosError } from "axios";

export default defineComponent({
    data() {
        return {
            users:[] as User[],
            rolMayor: "" as string,
        };
    },
    methods: {
        async loadUsers() {
            const res = await getUsers();
            this.users = res.data;
        },
        edit(id: string) {
            this.$router.push(`/editUser/${id}`);
        },
        getRolMayor(rol:string):string {
            return (rol == 'admin'? 'Administrador' : rol == 'moderator'? 'Supervisor': rol == 'user' ? 'Usuario' : '')
        },
        async eliminarUsuario(id:string,index:number){
            try{
                const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
                if(confirmacion){
                    await deleteUser(id);
                    this.users.splice(index,1);
                }
            } catch (error) {
                this.handleRequestError(error as AxiosError)
            }
        },
        getUbicacionRolMayor(user:User):number{
            let res = -1;
            user.roles.forEach((rol,index)=>{
                if (rol.name == 'admin'){
                    res = index
                }
            }) 
            if (res >= 0) return res;
            else {
                user.roles.forEach((rol,index)=>{
                if (rol.name == 'moderator'){
                    res = index
                }
            }) 
            }
            if (res >= 0) return res;
            else{
                user.roles.forEach((rol,index)=>{
                if (rol.name == 'user'){
                    res = index
                }
            })
            }
            return res;
        },
    
        handleRequestError(error: AxiosError) {
            console.error("Error en la solicitud:", error);

            if (error.response && error.response.status === 401) {
                // Manejar la lógica de redirección a la página de inicio de sesión
                localStorage.removeItem("username")
                localStorage.removeItem("roles")
                localStorage.removeItem("token")
                this.$router.push("/login");
            } else {
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
    },
    created() {
        this.loadUsers();
        newToken();
    },
    name: "App",
    components: {
        NavBar,
        FooterPage,
    },
});
</script>
<style>
main {
    min-height: 81.6vh;
}

.hidden-row {
    display: none;
}
</style>
