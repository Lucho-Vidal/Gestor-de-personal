<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">Editar Novedad</h1>

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

            <form @submit.prevent="handleUpdateNovedad()" class="row">
                <div class="row">
                    <div class="col-2">
                        <label for="legajo"></label>
                        Legajo
                        <input
                            class="form-control mb-3"
                            placeholder="Ingrese Legajo"
                            type="text"
                            name="legajo"
                            v-model="novedad.legajo"
                            @change="searchPersonalPorLegajo()"
                            autofocus
                        />
                    </div>
                    <div class="col-3">
                        <label for="apellido"></label>
                        Apellido
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="apellido"
                            v-model="novedad.apellido"
                            disabled
                        />
                    </div>
                    <div class="col-4">
                        <label for="nombre"></label>
                        Nombre
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="nombre"
                            v-model="novedad.nombres"
                            disabled
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-1">
                        <label for="Base"></label>
                        Base
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="Base"
                            v-model="novedad.base"
                            disabled
                        />
                    </div>
                    <div class="col-3">
                        <label for="especialidad"></label>
                        Especialidad
                        <input
                            class="form-control mb-3"
                            type="text"
                            name="especialidad"
                            v-model="novedad.especialidad"
                            disabled
                        />
                    </div>
                    <div class="col-2">
                        <label for="turno"></label>
                        Turno
                        <input
                            class="form-control mb-3"
                            type="text"
                            name="turno"
                            v-model="novedad.turno"
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
                            v-model="novedad.franco"
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
                            v-model="novedad.tipoNovedad"
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
                            v-model="novedad.fechaBaja"
                        />
                    </div>
                    <div class="form-check form-check-inline m-0">
                        <input
                            class="form-check-input valoresCheck"
                            type="checkbox"
                            name="HNA"
                            id="HNA"
                            checked
                            v-model="novedad.HNA"
                        />
                        <label class="form-check-label" for="HNA">HNA</label>
                    </div>
                    <div class="col-3" v-if="!novedad.HNA">
                        <label for="fechaAlta"></label>
                        Fecha de fin
                        <input
                            class="form-control mb-3"
                            type="Date"
                            name="fechaAlta"
                            v-model="novedad.fechaAlta"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="Detalle"></label>
                        Detalle
                        <textarea
                            class="form-control mb-3"
                            name="Detalle"
                            v-model="novedad.detalle"
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
                                    autofocus
                                    @keyup="searchPersonal(true)"
                                />
                                <table class="table table-hover" v-if="search">
                                    <thead>
                                        <tr>
                                            <th>Legajo</th>
                                            <th>Apellido</th>
                                            <th>Nombre</th>
                                            <th>Dotación</th>
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
                            v-for="(remplazo, index) in novedad.remplazo"
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
                                    @click="novedad.remplazo.splice(index, 1)"
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
import { Novedad, Remplazo } from "../../interfaces/INovedades";
import { getNovedad, updateNovedad } from "../../services/novedadesService";
import { IPersonal } from "../../interfaces/IPersonal";
import { getPersonales } from "../../services/personalService";

export default defineComponent({
    data() {
        return {
            novedad: {} as Novedad,
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
        };
    },
    methods: {
        /* Este método busca la novedad en el backend por medio de una consulta HTML:GET */
        async loadNovedad(id: string) {
            try {
                const { data } = await getNovedad(id);
                this.novedad = data;
            } catch (error) {
                console.error(error);
            }
        },
        /* Este método trae la lista de todos los personales.
        DADO QUE EL TIEMPO DE ESTA CONSULTA ES SUPERIOR AL DE LA NOVEDAD. Tuve que llamar a la función 
        searchPersonalPorLegajo desde selectPersonal*/
        async loadPersonales() {
            const res = await getPersonales();
            this.personales = res.data;
            this.searchPersonalPorLegajo();
        },
        /* Este método actualiza los cambios en el formulario */
        async handleUpdateNovedad() {
            try {
                if (typeof this.$route.params.id === "string") {
                    if (this.novedad.HNA) {
                        this.novedad.fechaAlta = "";
                    }
                    if (this.novedad.remplazo !== undefined) {
                        if (
                            new Date(this.novedad.fechaBaja) >
                            new Date(this.novedad.remplazo[0].inicioRelevo)
                        ) {
                            alert(
                                "La fecha de inicio del relevo no puede ser anterior a la del inicio de la novedad"
                            );
                            return;
                        }
                        if (
                            new Date(this.novedad.fechaAlta) <
                            new Date(this.novedad.remplazo[0].finRelevo)
                        ) {
                            alert(
                                "La fecha de fin del relevo no puede ser posterior a la del fin de la novedad"
                            );
                            return;
                        }
                        if (this.novedad.remplazo.length > 1) {
                            console.log();
                            for (
                                let i = 0;
                                i < this.novedad.remplazo.length - 1;
                                i++
                            ) {
                                if (!this.novedad.remplazo[i].finRelevo) {
                                    alert(
                                        "No puede haber mas de un relevo sin fecha de finalización "
                                    );
                                    return;
                                }
                                if (
                                    new Date(
                                        this.novedad.remplazo[i].finRelevo
                                    ) >=
                                    new Date(
                                        this.novedad.remplazo[
                                            i + 1
                                        ].inicioRelevo
                                    )
                                ) {
                                    alert(
                                        "Un turno no puede ser relevado por dos personas el mismo dia"
                                    );
                                    return;
                                }
                            }
                        }
                    }

                    await updateNovedad(this.$route.params.id, this.novedad);
                    this.$router.push(`/novedades`);
                }
            } catch (error) {
                console.error(error);
            }
        },
        /* Este método cuando se hace click en el modal desplegado toma el item y asigna el novedad.legajo y 
        llama a el método de búsqueda por legajo */
        selectPersonal(personal: IPersonal) {
            this.novedad.legajo = personal.legajo;
            this.searchPersonalPorLegajo();
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

            if (this.novedad.remplazo === undefined) {
                this.novedad.remplazo = [remplazo];
            } else {
                this.novedad.remplazo.push(remplazo);
            }
        },
        /* Este método funciona dentro del modal, al escribir dentro del input filtra por 
        nombre y apellido el personal */
        searchPersonal(soloCiclo:boolean) {
            this.personalEncontrado = this.personales.filter((personal: IPersonal) => {
                if(!soloCiclo)  {
                    return(
                    personal.apellido.toLowerCase() +
                    " " +
                    personal.nombres.toLowerCase()
                ).includes(this.search.toLowerCase())
                }else{//el remplazo debe ser personal de ciclo y de la misma base
                    return(
                    personal.apellido.toLowerCase() +
                    " " +
                    personal.nombres.toLowerCase()
                ).includes(this.search.toLowerCase()) &&
                personal.turno.toLowerCase().includes("ciclo")&&
                personal.dotacion === this.novedad.base
                }
            })
        },
        /*  realiza la búsqueda por el legajo introducido en el respectivo input */
        searchPersonalPorLegajo() {
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return personal.legajo == Number(this.novedad.legajo);
                }
            );

            if (this.personalEncontrado[0]) {
                this.novedad.apellido = this.personalEncontrado[0].apellido;
                this.novedad.nombres = this.personalEncontrado[0].nombres;
                this.novedad.base = this.personalEncontrado[0].dotacion;
                this.novedad.especialidad =
                    this.personalEncontrado[0].especialidad;
                this.novedad.turno = this.personalEncontrado[0].turno;
                this.novedad.franco =
                    this.days[this.personalEncontrado[0].franco];
            }
        },
    },
    mounted() {
        this.loadPersonales();
        if (typeof this.$route.params.id === "string") {
            this.loadNovedad(this.$route.params.id);
        }
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
</style>
