<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Cargar Nuevo Personal
            </h1>
            <div class="alert alert-danger" role="alert" v-if="alerta">
                <h4 class="alert-heading">ATENCIÓN!</h4>
                <hr>
                {{ alerta }}
            </div>
            <!-- <modalBuscarPersonal :personales="personales" /> -->


            <form @submit.prevent="" class="row">
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
                            
                        />
                    </div>
                </div>
                <div class="row">
                    
                    <div class="col-1">
                        <label for="base">Base </label>
                        <select
                            name="base"
                            id="base"
                            class="form-control mb-3"
                            
                        >
                            <option value="PC">PC</option>
                            <option value="LLV">LLV</option>
                            <option value="TY">TY</option>
                            <option value="LP">LP</option>
                            <option value="K5">K5</option>
                            <option value="CÑ">CÑ</option>
                            <option value="AK">AK</option>
                        </select>
                    </div>
                    
                    <div class="col-3">
                        <label for="especialidad">Especialidad </label>
                        <select
                            name="especialidad"
                            id="especialidad"
                            class="form-control mb-3"
                            
                        >
                            <option value="Conductor Eléctrico">Conductor Eléctrico</option>
                            <option value="Conductor Diesel">Conductor Diesel</option>
                            <option value="Ayudante Habilitado">Ayudante Habilitado</option>
                            <option value="Ayudante Conductor">Ayudante Conductor</option>
                            <option value="GuardaTren Eléctrico">GuardaTren Eléctrico</option>
                            <option value="GuardaTren Diesel">GuardaTren Diesel</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <label for="turno"></label>
                        Turno/ Ciclo
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="turno"
                            
                        />
                    </div>
                    <div class="col-2">
                        <label for="franco">Franco </label>
                        <select
                            name="franco"
                            id="franco"
                            class="form-control mb-3"
                        >
                            <option value=0>Domingo</option>
                            <option value=1>Lunes</option>
                            <option value=2>Martes</option>
                            <option value=3>Miércoles</option>
                            <option value=4>Jueves</option>
                            <option value=5>Viernes</option>
                            <option value=6>Sábado</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <label for="orden"></label>
                        Orden
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="number"
                            name="orden"
                            
                        />
                    </div>
                </div>
                
                <div class="row">
                    <div class="col">
                        <label for="detalle"></label>
                        Observaciones
                        <textarea
                            class="form-control mb-3"
                            name="detalle"
                        ></textarea>
                    </div>
                </div>


                <button class="btn btn-primary col-1 m-2">Guardar</button>
                <i class="btn btn-secondary col-1 m-2" @click="cerrar()">Cerrar</i>
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
import {
    createNovedad,
    getNovedades,
    getUltimaNovedad,
} from "../../services/novedadesService";
import { getPersonales } from "../../services/personalService";
import { IPersonal } from "../../interfaces/IPersonal";

/* 
    export interface IPersonal {
    legajo: number;
    apellido: string;
    nombres: string;
    turno: string;
    franco: number;
    especialidad: string;
    dotacion: string;
    observaciones: string;
    orden: number;
    conocimientos?: IConocimientos;
}
export interface IConocimientos {
    CML: boolean;
    CKD: boolean;
    RO: boolean;
    MPN: boolean;
    OL: boolean;
    LCI: boolean;
    ELEC: boolean;
}

*/

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
                    if (
                        !this.newNovedad.HNA &&
                        (this.newNovedad.remplazo[
                            this.newNovedad.remplazo.length - 1
                        ].finRelevo == undefined ||
                            this.newNovedad.remplazo[
                                this.newNovedad.remplazo.length - 1
                            ].finRelevo == "")
                    ) {
                        //si la novedad no es HNA y la ultima novedad no tiene fecha de fin, le asigna la fecha de alta a el fin del ultimo remplazo
                        this.newNovedad.remplazo[
                            this.newNovedad.remplazo.length - 1
                        ].finRelevo = this.newNovedad.fechaAlta;
                    }
                    
                }
                if(this.alerta){
                    if (this.alerta.includes("ATENCIÓN")){
                        this.$router.push({ name: "Novedades" });
                    }else if(this.alerta.includes("finalice el relevo")){
                        this.alerta =  " ATENCIÓN!!! NO ES POSIBLE CARGAR ESTA NOVEDAD!      " + this.alerta 
                    }
                    
                    return;
                }
                await createNovedad(this.newNovedad);
                this.$router.push({ name: "Novedades" });
            } catch (error) {
                console.error(error);
            }
        },
        cerrar(){
            this.$router.push({ name: "Personal" });
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
            //this.novedadConRelevoAsignado(personal.legajo);
            //}
        },
        personalConNovedadActiva(personal:IPersonal) {
            /* Primero busco todas las novedades que tienen al personal relevando */
            let dateHoy = new Date()
            dateHoy.setHours(12)
            
            this.novedades.forEach((novedad: Novedad) => {
                if(personal.turno.includes("Ciclo")){
                    novedad.remplazo.forEach((remp: Remplazo) => {
                        if (remp) {
                            if (remp.legajo == personal.legajo) {

                                if (
                                    (remp.finRelevo === undefined || remp.finRelevo === "") 
                                    ||dateHoy < new Date(remp.finRelevo)
                                ) {
                                    this.alerta =
                                "Este personal se encuentra relevando la novedad N°"+ novedad._id + ". Por favor, finalice el relevo para poder continuar";
                                }
                            }
                        }
                    });
                }
                
                if (novedad.legajo == personal.legajo){
                    if (novedad.HNA){
                        this.alerta =
                                "Este personal se encuentra de baja por la siguiente novedad N°"+ novedad._id + ". Por favor, finalice el relevo para poder continuar";
                    }  
                }
            });
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
                            personal.dotacion === this.newNovedad.base &&
                            personal.especialidad == this.newNovedad.especialidad
                        );
                    }
                }
            );
        },
        /*  realiza la búsqueda por el legajo introducido en el respectivo input */
        searchPersonalPorLegajo() {
            this.alerta = "";
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return personal.legajo == this.newNovedad.legajo;
                }
            );
            if (this.personalEncontrado[0]) {
                
                this.personalConNovedadActiva(this.personalEncontrado[0]);
                
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
