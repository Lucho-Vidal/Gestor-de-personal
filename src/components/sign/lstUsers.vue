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
                        <td class="col-2">{{ user.roles }}</td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-pen-to-square"
                                @click="edit(user._id)"
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
import { getUsers, newToken } from "../../services/signService";
import { User } from "../../interfaces/IUser";

export default defineComponent({
    data() {
        return {
            users:[] as User[],
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
