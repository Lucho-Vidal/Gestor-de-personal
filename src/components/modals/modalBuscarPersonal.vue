<template>
    <div>
        <button
            type="button"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        >
            Buscar Personal
        </button>

        <!-- Modal -->
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Buscar Personal
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <input
                            type="text"
                            class="form-control my-3"
                            placeholder="Ingrese Nombre o Apellido"
                            list="personales"
                            v-model="search"
                            autofocus
                            @keyup="searchPersonal()"
                        />
                        <table class="table table-hover" v-if="search">
                            <thead>
                                <tr>
                                    <th>Legajo</th>
                                    <th>Apellido</th>
                                    <th>Nombre</th>
                                    <th>Dotacion</th>
                                    <th>Turno</th>
                                    <th>Franco</th>
                                    <th>Especialidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(
                                        personal, index
                                    ) in personalEncontrado"
                                    :key="index"
                                    
                                >
                                    <td class="col-1">
                                        {{ personal.legajo }}
                                    </td>
                                    <td class="col-1">
                                        {{ personal.apellido }}
                                    </td>
                                    <td class="col-2">
                                        {{ personal.nombres }}
                                    </td>
                                    <td class="col-1">
                                        {{ personal.dotacion }}
                                    </td>
                                    <td class="col-1">
                                        {{ personal.turno }}
                                    </td>
                                    <td class="col-1">
                                        {{ days[personal.franco] }}
                                    </td>
                                    <td class="col-1">
                                        {{ personal.especialidad }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IPersonal } from "../../interfaces/IPersonal";

export default defineComponent({
    data() {
        return {
            personales:[] as IPersonal[],
            days: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ],
            search: "" as string,
            personalEncontrado: [] as IPersonal[],
        };
    },
    propE:{
        

    },
    methods: {
        searchPersonal() {
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return (
                        personal.apellido.toLowerCase() +
                        personal.nombres.toLowerCase()
                    ).includes(this.search.toLowerCase());
                }
            );
        },
    },
    mounted() {console.log();
    
    },
});
</script>
