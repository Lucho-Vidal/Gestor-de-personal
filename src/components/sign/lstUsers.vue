<template>
    <main>
        <div class="container-fluid px-4">
            <h2 class="d-flex justify-content-center m-3">
                Lista de usuarios habilitados
            </h2>
            <div class="d-flex  justify-content-end">
                <a class="btn btn-primary" href="/newUser"
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
                        <td class="col-2">
                            {{
                                getRolMayor(
                                    user.roles[getUbicacionRolMayor(user)].name
                                )
                            }}
                        </td>
                        <td class="col-1">
                            <i
                                class="material-icons cursor-hand"
                                @click="edit(user._id)"
                                >edit_note</i
                            >
                        </td>
                        <td class="col-1">
                            <i
                                class="material-icons cursor-hand rojo"
                                @click="eliminarUsuario(user._id, index)"
                                >delete_forever</i
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { deleteUser, getUsers, newToken } from "../../services/signService";
import { User } from "../../interfaces/IUser";
import { AxiosError } from "axios";
import { createRegistro } from "../../services/registrosService";
import { Registro } from "../../interfaces/IRegistro";

export default defineComponent({
    data() {
        return {
            users: [] as User[],
            rolMayor: "" as string,
            today: new Date(),
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
        getRolMayor(rol: string): string {
            return rol == "admin"
                ? "Administrador"
                : rol == "moderator"
                ? "Supervisor"
                : rol == "user"
                ? "Usuario"
                : "";
        },
        async eliminarUsuario(id: string, index: number) {
            try {
                const confirmacion = window.confirm(
                    "¿Estás seguro de que deseas eliminar este usuario?"
                );
                if (confirmacion) {
                    // guardamos registro
                    const registro: Registro = {
                        usuario: window.localStorage.getItem("username") || "",
                        fecha: this.today.toString(),
                        accion: `Elimino al usuario ${this.users[index].username}`,
                        user: this.users[index],
                    };
                    await createRegistro(registro);

                    await deleteUser(id);
                    this.users.splice(index, 1);
                }
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        getUbicacionRolMayor(user: User): number {
            let res = -1;
            user.roles.forEach((rol, index) => {
                if (rol.name == "admin") {
                    res = index;
                }
            });
            if (res >= 0) return res;
            else {
                user.roles.forEach((rol, index) => {
                    if (rol.name == "moderator") {
                        res = index;
                    }
                });
            }
            if (res >= 0) return res;
            else {
                user.roles.forEach((rol, index) => {
                    if (rol.name == "user") {
                        res = index;
                    }
                });
            }
            return res;
        },
        handleRequestError(error: AxiosError) {
            console.error("Error en la solicitud:", error);

            if (error.response && error.response.status === 401) {
                // Manejar la lógica de redirección a la página de inicio de sesión
                localStorage.removeItem("username");
                localStorage.removeItem("roles");
                localStorage.removeItem("token");
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
.cursor-hand {
    cursor: pointer;
}
.verde {
    color: #0f0;
}
.rojo {
    color: #f00;
}
.gris {
    color: #aaa;
}
</style>
