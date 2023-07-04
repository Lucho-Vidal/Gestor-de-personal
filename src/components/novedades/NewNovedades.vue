<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Cargar Nueva Novedad
            </h1>
            <div class="alert alert-danger" role="alert" v-if="alerta">
                {{ alerta }}
            </div>
            <!-- <modalBuscarPersonal :personales="personales" /> -->

            <button
                type="button"
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalBuscar"
            >
                Buscar Personal
            </button>

            <div
                class="modal fade"
                id="modalBuscar"
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
                                @keyup="searchPersonal(false)"
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
                                        @click="selectPersonal(personal)"
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
                                            {{ personal.franco }}
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

            <form @submit.prevent="saveNovedad()" class="row">
                <div class="row">
                    <div class="col-2">
                        <label for="legajo"></label>
                        Legajo
                        <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="number"
                            name="legajo"
                            autofocus
                            required
                            @change="searchPersonalPorLegajo()"
                            v-model="newNovedad.legajo"
                        />
                    </div>
                    <div class="col-3">
                        <label for="Apellido"></label>
                        Apellido
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="apellido"
                            v-model="newNovedad.apellido"
                            disabled
                        />
                    </div>
                    <div class="col-4">
                        <label for="nombres"></label>
                        Nombre
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="nombres"
                            v-model="newNovedad.nombres"
                            disabled
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label for="base"></label>
                        Base
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="base"
                            v-model="newNovedad.base"
                            disabled
                        />
                    </div>
                    <div class="col-3">
                        <label for="especialidad"></label>
                        Especialidad
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="especialidad"
                            v-model="newNovedad.especialidad"
                            disabled
                        />
                    </div>
                    <div class="col-2">
                        <label for="turno"></label>
                        Turno
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="turno"
                            v-model="newNovedad.turno"
                            disabled
                        />
                    </div>
                    <div class="col-2">
                        <label for="franco"></label>
                        Franco
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="franco"
                            v-model="newNovedad.franco"
                            disabled
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label for="tipoNovedad">Tipo de Novedad </label>
                        <select
                            name="tipoNovedad"
                            id="tipoNovedad"
                            class="form-control mb-3"
                            v-model="newNovedad.tipoNovedad"
                            required
                        >
                            <option value="Ordenamiento">Ordenamiento</option>
                            <option value="Estudio">Estudio</option>
                            <option value="Enfermedad">Enfermedad</option>
                            <option value="ART">ART</option>
                            <option value="Arrollamiento 558">
                                Arrollamiento 558
                            </option>
                            <option value="Resolución 404">
                                Resolución 404
                            </option>
                            <option value="Servicio Especial">
                                Servicio Especial
                            </option>
                            <option value="Tarea Liviana">Tarea Liviana</option>
                            <option value="Licencia Gremial">
                                Licencia Gremial
                            </option>
                            <option value="Ausente">Ausente</option>
                            <option value="Practica">Practica</option>
                            <option value="Suspension">Suspension</option>
                            <option value="Rev. Medica">Rev. Medica</option>
                            <option value="Descanso Anticipado">
                                Descanso Anticipado
                            </option>
                            <option value="Licencia Anual">
                                Licencia Anual
                            </option>
                            <option value="Baja definitiva">
                                Baja definitiva
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label for="fechaBaja"></label>
                        Fecha de inicio
                        <input
                            required
                            class="form-control mb-3"
                            type="Date"
                            name="fechaBaja"
                            v-model="newNovedad.fechaBaja"
                        />
                    </div>
                    <div class="form-check form-check-inline m-0">
                        <input
                            class="form-check-input valoresCheck"
                            type="checkbox"
                            name="HNA"
                            id="HNA"
                            checked
                            v-model="newNovedad.HNA"
                        />
                        <label class="form-check-label" for="HNA">HNA</label>
                    </div>
                    <div class="col-3" v-if="!newNovedad.HNA">
                        <label for="fechaAlta"></label>
                        Fecha de fin
                        <input
                            class="form-control mb-3"
                            type="Date"
                            name="fechaAlta"
                            v-model="newNovedad.fechaAlta"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="detalle"></label>
                        Detalle
                        <textarea
                            class="form-control mb-3"
                            name="detalle"
                            v-model="newNovedad.detalle"
                        ></textarea>
                    </div>
                </div>

                <button
                    type="button"
                    class="btn btn-success col-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalRemplazo"
                >
                    Agregar Remplazo
                </button>

                <div
                    class="modal fade"
                    id="modalRemplazo"
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
                                    placeholder="Ingrese algo"
                                    v-model="search"
                                    @keyup="searchPersonal(true)"
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
                                            @click="selectRemplazo(personal)"
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

                <table>
                    <thead>
                        <tr>
                            <th>Legajo</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Función</th>
                            <th>Desde</th>
                            <th>Hasta</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(remplazo, index) in newNovedad.remplazo"
                            :key="index"
                        >
                            <td>
                                {{ remplazo.legajo }}
                            </td>
                            <td>
                                {{ remplazo.apellido }}
                            </td>
                            <td>
                                {{ remplazo.nombres }}
                            </td>
                            <td>
                                {{ remplazo.especialidad }}
                            </td>
                            <td>
                                <input
                                    required
                                    class="form-control mb-3"
                                    type="Date"
                                    name="FechaBaja"
                                    v-model="remplazo.inicioRelevo"
                                />
                            </td>
                            <td>
                                <input
                                    class="form-control mb-3"
                                    type="Date"
                                    name="FechaBaja"
                                    v-model="remplazo.finRelevo"
                                />
                            </td>
                            <td>
                                <i
                                    class="fa-solid fa-x fa-xl"
                                    style="color: #ff0000"
                                    @click="
                                        newNovedad.remplazo.splice(index, 1)
                                    "
                                ></i>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button class="btn btn-primary col-1">Guardar</button>
            </form>
        </main>

        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { Novedad, Remplazo } from '../../interfaces/INovedades';
import {
    createNovedad,
    getNovedades,
    getUltimaNovedad,
} from "../../services/novedadesService";
import { getPersonales } from "../../services/personalService";
import { IPersonal } from "../../interfaces/IPersonal";

export default defineComponent({
    data() {
        return {
            novedades: [] as Novedad[],
            newNovedad: {} as Novedad,
            ultimoId: 0,
            personales: [] as IPersonal[],
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
            alerta: "" as string,
        };
    },
    methods: {
        /* Método utilizado para realizar la consulta HTML:POST al backend para el guardado de los datos */
        async saveNovedad() {
            try {
                this.newNovedad._id = this.ultimoId + 1;
                if (this.newNovedad.HNA) {
                    this.newNovedad.fechaAlta = "";
                }
                if (this.newNovedad.remplazo !== undefined) {
                    if (
                        new Date(this.newNovedad.fechaBaja) >
                        new Date(this.newNovedad.remplazo[0].inicioRelevo)
                    ) {
                        this.alerta =
                            "La fecha de inicio del relevo no puede ser anterior a la del inicio de la novedad";
                        return;
                    }
                    if (
                        new Date(this.newNovedad.fechaAlta) <
                        new Date(this.newNovedad.remplazo[0].finRelevo)
                    ) {
                        this.alerta =
                            "La fecha de fin del relevo no puede ser posterior a la del fin de la novedad";
                        return;
                    }
                    if (this.newNovedad.remplazo.length > 1) {
                        console.log();
                        for (
                            let i = 0;
                            i < this.newNovedad.remplazo.length - 1;
                            i++
                        ) {
                            if (!this.newNovedad.remplazo[i].finRelevo) {
                                this.alerta =
                                    "No puede haber mas de un relevo sin fecha de finalización ";
                                return;
                            }
                            if (
                                new Date(
                                    this.newNovedad.remplazo[i].finRelevo
                                ) >=
                                new Date(
                                    this.newNovedad.remplazo[i + 1].inicioRelevo
                                )
                            ) {
                                this.alerta =
                                    "Un turno no puede ser relevado por dos personas el mismo dia";
                                return;
                            }
                        }
                    }
                }
                await createNovedad(this.newNovedad);
                this.$router.push({ name: "Novedades" });
            } catch (error) {
                console.log(error);
            }
        },
        /* Este método obtiene a traves de una consulta HTML:GET el ultimo
        Id de los documentos guardados con el fin de asignarle a la nueva novedad el id proximo */
        async obtenerUltimoId() {
            const res = await getUltimaNovedad();
            this.ultimoId = res.data[0]._id;
        },
        async loadNovedades() {
            const res = await getNovedades();
            this.novedades = res.data;
        },
        /* Este método trae la lista de todos los personales */
        async loadPersonales() {
            const res = await getPersonales();
            this.personales = res.data;
        },
        /* Este método cuando se hace click en el modal desplegado toma el item y asigna el newNovedad.legajo y
        llama a el método de búsqueda por legajo  */
        selectPersonal(personal: IPersonal) {
            this.newNovedad.legajo = personal.legajo;
            this.searchPersonalPorLegajo();
            //si es de ciclo voy a verificar que no este en un turno
            //if(personal.turno.includes("Ciclo")){
                this.novedadConRelevoAsignado(personal.legajo);
            //}
            
        },
        novedadConRelevoAsignado(legajo:number) {
            /* Primero busco todas las novedades que tienen al personal relevando */
            let resultado:Novedad[] = []; 
            this.novedades.forEach((novedad: Novedad )=>{

                novedad.remplazo.forEach((remp:Remplazo) =>{
                    if (remp){
                        if (remp.legajo == legajo){
                            resultado.push(novedad)
                        } 
                    }                    
                })
                
            })
            if(resultado){
                resultado.forEach(nov=>{
                    nov.remplazo.filter(rem=>{
                        console.log(rem.finRelevo);
                        
                        console.log( new Date() < new Date(rem.finRelevo) )
                        
                    })
                })
            }
            console.log(resultado);
            
        },
        /* Este método al igual que el anterior al desplegar el modal y hacer click asigna el personal
         pero esta vez a la lista de remplazo */
        selectRemplazo(personal: IPersonal) {
            let remplazo = {
                legajo: personal.legajo,
                apellido: personal.apellido,
                nombres: personal.nombres,
                base: personal.dotacion,
                especialidad: personal.especialidad,
                turno: personal.turno,
                franco: this.days[personal.franco],
                HNA: false,
            } as Remplazo;

            if (this.newNovedad.remplazo === undefined) {
                this.newNovedad.remplazo = [remplazo];
            } else {
                this.newNovedad.remplazo.push(remplazo);
            }
        },

        searchPersonal(soloCiclo: boolean) {
            /* Este método funciona dentro del modal, al escribir dentro del input filtra por
        nombre y apellido el personal */
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    if (!soloCiclo) {
                        return (
                            personal.apellido.toLowerCase() +
                            " " +
                            personal.nombres.toLowerCase()
                        ).includes(this.search.toLowerCase());
                    } else {
                        //el remplazo debe ser personal de ciclo y de la misma base
                        return (
                            (
                                personal.apellido.toLowerCase() +
                                " " +
                                personal.nombres.toLowerCase()
                            ).includes(this.search.toLowerCase()) &&
                            personal.turno.toLowerCase().includes("ciclo") &&
                            personal.dotacion === this.newNovedad.base
                        );
                    }
                }
            );
        },
        /*  realiza la búsqueda por el legajo introducido en el respectivo input */
        searchPersonalPorLegajo() {
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return personal.legajo == this.newNovedad.legajo;
                }
            );
            if (this.personalEncontrado[0]) {
                this.newNovedad.apellido = this.personalEncontrado[0].apellido;
                this.newNovedad.nombres = this.personalEncontrado[0].nombres;
                this.newNovedad.base = this.personalEncontrado[0].dotacion;
                this.newNovedad.especialidad =
                    this.personalEncontrado[0].especialidad;
                this.newNovedad.turno = this.personalEncontrado[0].turno;
                this.newNovedad.franco =
                    this.days[this.personalEncontrado[0].franco];
            }
        },
    },
    mounted() {
        this.obtenerUltimoId();
        this.loadPersonales();
        this.loadNovedades();
        this.newNovedad.HNA = true;
    },
    components: {
        NavBar,
        FooterPage,
    },
});
</script>
<style>
main {
    min-height: 87vh;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.8);
}
.Modal {
    position: fixed;

    transform: translate((-50%, -50%));
    background: #fff;
    padding: 70px;
    border-radius: 15px;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
    z-index: 101;
}
</style>
