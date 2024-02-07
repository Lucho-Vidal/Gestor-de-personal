<template>
    <div>
        <NavBar />

        <main class="container">
            <h2 class="d-flex justify-content-center m-3">
                Diagramación
            </h2>
            <div class="d-flex">
                <router-link class="btn btn-primary d-flex end"  to="/newTurno"
                    >Nuevo Turno</router-link
                >
            </div>

            <div class="my-3 row">
                <input
                    class="col-3 gap col"
                    type="text"
                    placeholder="Buscar por turno"
                    autofocus
                    v-on:keyup="filtrar"
                    v-model="search"
                />
                <label class="form-check-label mx-2 col-1">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        :value="'H'"
                        v-model="itSeleccionado"
                        v-on:change="filtrar()"
                    />
                    Hábil
                </label>
                <label class="form-check-label mx-2 col-1">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        :value="'S'"
                        v-model="itSeleccionado"
                        v-on:change="filtrar()"
                    />
                    Sábado
                </label>
                <label class="form-check-label mx-2 col-2">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        :value="'D'"
                        v-model="itSeleccionado"
                        v-on:change="filtrar()"
                    />
                    Domingo
                </label>
            </div>
            
            <h3 v-if="Filtradas.length == 0">
                No se encontró ningún turno con los requerimientos
                especificados.
            </h3>

            <table
                v-if="Filtradas.length > 0"
                class="table table-striped table-hover"
            >
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">Turno</th>
                        <th class="col-1" colspan="1">Itinerario</th>
                        <th class="col-1" colspan="1">Circular</th>
                        <th class="col-1" colspan="1"></th>
                        <th class="col-1" colspan="1">Toma</th>
                        <th class="col-1" colspan="1">Deja</th>
                        <th class="col-1">Ver</th>
                        <th class="col-1">Borrar</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(turno, index) in Filtradas"
                    :key="index"
                    @dblclick="edit(turno._id)"
                    @click="viewDetail(turno)"
                >
                    <tr class="Small shadow">
                        <td class="col-1">{{ turno.turno }}</td>
                        <td class="col-1">{{ turno.itinerario }}</td>
                        <td class="col-1">{{ turno.circular }}</td>
                        <td class="col-1">{{ turno.personal }}</td>
                        <td class="col-1">{{ turno.toma }}</td>
                        <td class="col-1">{{ turno.deja }}</td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-pen-to-square"
                                @click="edit(turno._id)"
                            ></i>
                        </td>
                        <td class="col-1">
                            
                            <i class="fa-solid fa-trash-can"
                                @click="deleteTurno(turno._id,index)"
                            ></i>
                        </td>
                    </tr>
                    <th class="col-1" colspan="1" v-if="turno.viewDetail">Vuelta</th>
                    <th class="col-1" colspan="1" v-if="turno.viewDetail">Referencia</th>
                    <th class="col-1" colspan="1" v-if="turno.viewDetail">Tren</th>
                    <th class="col-1" colspan="1" v-if="turno.viewDetail">Origen</th>
                    <th class="col-1" colspan="1" v-if="turno.viewDetail">Sale</th>
                    <th class="col-1" colspan="1" v-if="turno.viewDetail">Destino</th>
                    <th class="col-1" colspan="1" v-if="turno.viewDetail">Llega</th>
                    <th class="col-1" colspan="1" v-if="turno.viewDetail">Observaciones</th>
                    <tr 
                        style="margin-bottom: 10px;"
                        v-for="(vuelta, index) in turno.vueltas"
                        :key="index"
                    >
                        <td colspan="1" v-if="turno.viewDetail">
                            {{ vuelta.vuelta }}
                        </td>
                        <td colspan="1" v-if="turno.viewDetail">
                            {{ vuelta.refer }}
                        </td>
                        <td colspan="1" v-if="turno.viewDetail">
                            {{ vuelta.tren }}
                        </td>
                        <td colspan="1" v-if="turno.viewDetail">
                            {{ vuelta.origen }}
                        </td>
                        <td colspan="1" v-if="turno.viewDetail">
                            {{ vuelta.sale }}
                        </td>
                        <td colspan="1" v-if="turno.viewDetail">
                            {{ vuelta.destino }}
                        </td>
                        <td colspan="1" v-if="turno.viewDetail">
                            {{ vuelta.llega }}
                        </td>
                        <td colspan="1" v-if="turno.viewDetail">
                            {{ vuelta.observaciones }}
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
import { ITurno } from '../../interfaces/ITurno';
import { deleteTurno, getTurnos } from "../../services/turnosService";
import { newToken } from "../../services/signService";
import { AxiosError } from "axios";

export default defineComponent({
    data() {
        return {
            search:"",
            turnos: [] as ITurno[],
            Filtradas: [] as ITurno[],
            username: '' as string,
            itSeleccionado: ['H','S','D'] as string[]
        };
    },
    methods: {
        async loadTurnos() {
            try{
                const res = await getTurnos();
                this.turnos = res.data;
                this.filtrar();
            } catch (error) {
                this.handleRequestError(error  as AxiosError);
            }
        },
        edit(id: string) {
            this.$router.push(`/editTurno/${id}`);
        },
        viewDetail(turno: ITurno) {
            if (turno.viewDetail) {
                turno.viewDetail = false;
            } else {
                turno.viewDetail = true;
            }
        },
        async deleteTurno(id:string,index:number){
            try {
                const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este turno?");
            if(confirmacion){
                await deleteTurno(id);
                this.Filtradas.splice(index,1);
            }
            } catch (error) {
                this.handleRequestError(error as AxiosError)
            }
            
        },
        handleRequestError(error: AxiosError) {
            console.error('Error en la solicitud:', error);

            if (error.response && error.response.status === 401) {
                // Manejar la lógica de redirección a la página de inicio de sesión
                this.$router.push("/login");
            } else {
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        filtrar() {
            this.Filtradas = this.turnos.filter(t => {
                return (
                        t.turno.toLocaleLowerCase().includes(this.search.toLowerCase()) &&
                        this.itSeleccionado.includes(t.itinerario)
                    )
            })
        },
    },
    created() {
        this.loadTurnos();
        newToken();
        this.username = localStorage.getItem("username") || '';
        
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
