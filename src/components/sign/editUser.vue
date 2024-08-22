<template>
            <main>
                <div class="container px-4">
                    <h1 class="d-flex justify-content-center m-3">
                        Editar usuario
                    </h1>
                    <div
                        class="alert row d-flex align-content-center justify-content-center nowrap"
                        :class="[
                            message.status == 'danger'
                                ? 'alert-danger'
                                : message.status == 'success'
                                ? 'alert-success'
                                : '',
                        ]"
                        role="alert"
                        v-if="
                            message.status == 'danger' ||
                            message.status == 'success'
                        "
                    >
                        <h4 class="alert-heading col-5">{{ message.title }}</h4>
                        <hr />
                        <p class="col-5">
                            {{ message.message }}
                        </p>
                    </div>
                    <form
                        name="form"
                        id="form"
                        v-on:submit.prevent="procesar()"
                        class="d-flex justify-content-center mb-5"
                    >
                        <div class="input-group-text col-5 row p-5">
                            <div>
                                <label
                                    for="number"
                                    class="mb-3 text-start"
                                    style="width: 100%"
                                >
                                    Legajo:
                                    <input
                                        type="number"
                                        name="legajo"
                                        placeholder="Legajo"
                                        class="form-control mb-3 text-center"
                                        v-model="user.legajo"
                                        autocomplete="off"
                                        autofocus
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label
                                    for="email"
                                    class="mb-3 text-start"
                                    style="width: 100%"
                                >
                                    Apellido y Nombre:
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Apellido y nombre"
                                        class="form-control mb-3 text-center"
                                        v-model="user.username"
                                        autocomplete="off"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label
                                    for="email"
                                    class="mb-3 text-start"
                                    style="width: 100%"
                                >
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        class="form-control mb-3 text-center"
                                        v-model="user.email"
                                        autocomplete="off"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label for="password" class="mb-3 text-start">
                                    Restablecer la contraseña
                                    <input
                                        type="checkbox"
                                        v-model="actualizarPass"
                                    />
                                </label>
                            </div>
                            <div class="col">
                                <label
                                    for="rol"
                                    class="text-start"
                                    style="width: 100%"
                                >
                                    Rol
                                    <select
                                        name="rol"
                                        id="rol"
                                        class="form-control mb-3 text-center"
                                        v-model="user.roles[rol].name"
                                    >
                                        <option value="user">Usuario</option>
                                        <option value="moderator">
                                            Supervisor
                                        </option>
                                        <option value="admin">
                                            Administrador
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <input
                                    type="submit"
                                    value="Editar Usuario"
                                    name="Editar Usuario"
                                    class="btn btn-primary col-5"
                                />
                            </div>
                        </div>
                    </form>
                    <div v-if="hasRole('user')" class="text-center">
                        <h3 class="text-center">Usuario:</h3>
                        <p class="text-center">Tiene acceso a:</p>
                        <div
                            class="d-flex align-content-center justify-content-center nowrap"
                        >
                            <ul class="text-center list-group col-5">
                                <li class="list-group-item">
                                    Buscador de trenes
                                </li>
                                <li class="list-group-item">
                                    Sabana de trenes
                                </li>
                                <li class="list-group-item">
                                    Lista de Personales
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-if="hasRole('moderator')">
                        <h3 class="text-center">Supervisor:</h3>
                        <p class="text-center">Tiene acceso a:</p>
                        <div
                            class="d-flex align-content-center justify-content-center nowrap"
                        >
                            <ul class="text-center list-group col-5">
                                <li class="list-group-item">
                                    Buscador de trenes
                                </li>
                                <li class="list-group-item">
                                    Sabana de trenes
                                </li>
                                <li class="list-group-item">
                                    Lista de Personales
                                </li>
                                <li class="list-group-item">Personal</li>
                                <li class="list-group-item">Novedades</li>
                            </ul>
                        </div>
                    </div>

                    <div v-if="hasRole('admin')">
                        <h3 class="text-center">Administrador:</h3>
                        <p class="text-center">Tiene acceso a:</p>
                        <div
                            class="d-flex align-content-center justify-content-center nowrap"
                        >
                            <ul class="text-center list-group col-5">
                                <li class="list-group-item">
                                    Buscador de trenes
                                </li>
                                <li class="list-group-item">
                                    Sabana de trenes
                                </li>
                                <li class="list-group-item">
                                    Lista de Personales
                                </li>
                                <li class="list-group-item">
                                    Edición de turnos
                                </li>
                                <li class="list-group-item">Personal</li>
                                <li class="list-group-item">Novedades</li>
                                <li class="list-group-item">
                                    Edición de turnos
                                </li>
                                <li class="list-group-item">Registros</li>
                                <li class="list-group-item">
                                    Administración de Usuarios
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
</template>

<script lang="ts">
import { defineComponent  } from "vue";
import { getUser, updateUser } from "../../services/signService";
import { Role, User } from "../../interfaces/IUser";
import { createRegistro } from "../../services/registrosService";
import { Registro } from "../../interfaces/IRegistro";

export default defineComponent({
    name: "editPersonal",

    data() {
        return {
            id: "" as string,
            user: {
                roles: [
                    {
                        _id: "",
                        name: "user",
                    } as Role,
                ],
            } as User,
            actualizarPass: false,
            rol: 0,
            message: {
                status: "",
                title: "",
                message: "",
            },
            today: new Date(),
        };
    },
    methods: {
        async loadUser(id: string) {
            try {
                const res = await getUser(id);
                this.user = res.data;
                this.removeLowerRoles()

            } catch (error) {
                console.error(error);
            }
        },
        hasRole(roleName: string): boolean {
            //recibe un rol en string por Parametro y verifica si ese rol lo tiene el el usuario
            return (
                Array.isArray(this.user.roles) &&
                this.user.roles.some((role: Role) => role.name === roleName)
            );
        },
        async procesar() {
            try {
                let message:string;
                if (this.actualizarPass) {
                    this.user.password = "Inicio1";
                    this.user.updatePass = true;
                    message =
                        "La edición se guardo con éxito. y se restableció la contraseña del usuario a 'Inicio1', seras redirigido en un momento...";
                } else {
                    message =
                        "La edición se guardo con éxito. seras redirigido en un momento...";
                }                

                const res = await updateUser(this.id, this.user);

                if (res.status === 200) {
                    this.message = {
                        status: "success",
                        title: "ATENCIÓN!",
                        message:
                            "Hola " +
                            localStorage.getItem("username") +
                            " " +
                            message,
                    };
                    // guardamos registro
                    const registro: Registro = {
                        usuario: window.localStorage.getItem("username") || "",
                        fecha: this.today.toString(),
                        accion: `Edito el usuario ${this.user.username}`,
                        user: this.user,
                    };
                    await createRegistro(registro);

                    setTimeout(() => this.$router.push("/users"), 3000);
                }
            } catch (error) {
                this.message = {
                    status: "danger",
                    title: "ATENCIÓN!",
                    message: "Los datos ingresados no son validos.",
                };
                /* this.user.legajo = 0;
                this.user.username = "";
                this.user.email = "";
                this.user.password = "";
                this.user.roles = [""]; */

                setTimeout(() => (this.message.status = ""), 10000);
            }
        },
        // Función para dejar solo el rol más alto en la lista de roles del usuario para la visualización 
        removeLowerRoles() {
            // Define el orden de prioridad de los roles
            const rolePriority = ["user", "moderator","admin" ];

            // Encuentra el rol más alto en la lista de roles del usuario
            const highestRole = this.user.roles.reduce((highest, current) => {
                // Si el rol actual tiene una prioridad más alta que el rol más alto hasta ahora, lo reemplaza
                return rolePriority.indexOf(current.name) > rolePriority.indexOf(highest.name) ? current : highest;
            });

            // Filtra la lista de roles del usuario para dejar solo el rol más alto
            this.user.roles = this.user.roles.filter((rol: Role) => rol.name === highestRole.name);
            
        }
    },
    created() {
        try {
            if (typeof this.$route.params.id === "string") {
                this.id = this.$route.params.id;
                this.loadUser(this.id);

            }
        } catch (error) {
            console.error(error);
        }
    },
    components: {
    },
});
</script>

<style>
main {
    margin-top: 5rem;
}
</style>
