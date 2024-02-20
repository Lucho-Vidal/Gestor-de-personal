<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Cargar Nueva Novedad
            </h1>
            <div class="alert alert-danger" role="alert" v-if="alerta">
                <h4 class="alert-heading">ATENCIÓN!</h4>
                <hr />
                {{ alerta }}
                <a v-if="idNovedad!==0"   class="btn btn-danger col-2" @click="$router.push(`/editNovedades/${idNovedad}`);">Ir a la novedad</a>
            </div>
            <!-- Modal de búsqueda -->

            <div>
                <button class="btn btn-success" @click="abrirModal(false)">Buscar Personal</button>

                <div class="modal" :class="{ 'd-block': mostrarModalSearch }">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Buscar personales </h5>
                                <button type="button" class="close" @click="cerrarModal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <input
                                ref="inputSearch"
                                type="text"
                                class="form-control my-3"
                                placeholder="Ingrese Nombre o Apellido"
                                list="personales"
                                
                                v-model="search"
                                autofocus
                                @keyup="searchPersonal(false)"
                                />

                                <div class="table-container">
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
                                            <tr v-for="(personal, index) in personalEncontrado" :key="index" @click="selectPersonal(personal)">
                                                <td class="col-1">{{ personal.legajo }}</td>
                                                <td class="col-1">{{ personal.apellido }}</td>
                                                <td class="col-2">{{ personal.nombres }}</td>
                                                <td class="col-1">{{ personal.dotacion }}</td>
                                                <td class="col-1">{{ personal.turno }}</td>
                                                <td class="col-1">{{ days[personal.franco] }}</td>
                                                <td class="col-1">{{ personal.especialidad }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Formulario -->
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
                            required
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
                <!-- Llamada Modal búsqueda -->
                <a class="btn btn-success col-2" @click="abrirModal(true)">Buscar Remplazo </a>
                <!-- Tabla remplazo -->
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
                            <th class="col-1 px-5">
                                <i
                                    class="fa-solid fa-circle-plus"
                                    @click="agregarRemplazo()"
                                ></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(remplazo, index) in newNovedad.remplazo"
                            :key="index"
                        >
                            <td>
                                <input
                                    type="number"
                                    name="legajo"
                                    v-model="remplazo.legajo"
                                    @change="
                                        asignarRelevoPorLegajo(
                                            remplazo.legajo,
                                            index
                                        )
                                    "
                                />
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

                <button class="btn btn-primary col-1 m-2">Guardar</button>
                <i class="btn btn-secondary col-1 m-2" @click="$router.push('/novedades')"
                    >Cerrar</i
                >
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
import { newToken } from "../../services/signService";
import { AxiosError } from "axios";
import { Registro } from "../../interfaces/IRegistro";
import { createRegistro } from "../../services/registrosService";

export default defineComponent({
    data() {
        return {
            novedades: [] as Novedad[],
            newNovedad: {} as Novedad,
            ultimoId: 0,
            today: new Date(),
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
            selectRemplazo: false,
            personalEncontrado: [] as IPersonal[],
            alerta: "" as string,
            mostrarModalSearch: false,
            idNovedad: 0,
        };
    },
    methods: {
        // Conexión con la API
        async obtenerUltimoId() {
            /* Este método obtiene a traves de una consulta HTML:GET el ultimo
            Id de los documentos guardados con el fin de asignarle a la nueva novedad el id proximo */
            const res = await getUltimaNovedad();
            this.ultimoId = res.data[0]._id;
        },
        async loadNovedades() {
            const res = await getNovedades();
            this.novedades = res.data;
        },
        async loadPersonales() {
            /* Este método trae la lista de todos los personales */
            const res = await getPersonales();
            this.personales = res.data;
        },
        async saveNovedad() {
            /* Método utilizado para realizar la consulta HTML:POST al backend para el guardado de los datos */
            try {
                this.ultimoId++;
                this.newNovedad._id = this.ultimoId;
                
                // Validaciones
                if (this.esInicioRelevoMayorIgualFechaBaja() || this.esFinRelevoMayorFinNovedad() || this.hayMasDeUnRelevo() || this.esFechaBajaMayorFechaAlta() || this.alerta) {
                    if(this.alerta){
                        this.alerta = "Ocurrió un problema con la validación. Si el error persiste, Contacte al administrador con capturas de pantalla del error."
                        this.idNovedad = 0;
                    }
                    return;
                }

                this.terminaNovedadMismaFechaFinRelevo();

                // Filtrar elementos vacíos en el array de remplazo
                if (this.newNovedad.remplazo) {
                    this.newNovedad.remplazo = this.newNovedad.remplazo.filter((remp) => remp.apellido !== "");
                }

                this.newNovedad.novedadInactiva = false;

                // Crear la novedad
                await createNovedad(this.newNovedad);
                
                // guardamos registro
                const registro: Registro = {
                            usuario : window.localStorage.getItem("username")||'',
                            fecha : this.today.toString() ,
                            accion: "Creo",
                            novedad : this.newNovedad,
                        }
                await createRegistro(registro);

                // Redireccionar
                this.$router.push({ name: "Novedades" });
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        handleRequestError(error: AxiosError) {
            console.error("Error en la solicitud:", error);

            if (error.response && error.response.status === 401) {
                // Manejar la lógica de redirección a la página de inicio de sesión
                this.$router.push("/login");
            } else if(error.response && error.response.status === 500){
                this.alerta = "Ocurrió un error al intentar guardar la novedad. Es posible que se deba a que el numero de novedad ya existe. por favor intente de nuevo."
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        

        // Validaciones:
        esFechaMayor(dateMayor:string, dateMenor:string) {
            if(dateMayor!== undefined && dateMenor!== undefined){            
                const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
                const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
                return formattedDateMayor > formattedDateMenor
            }else{
                return false;
            }
        },
        esFechaMayorIgual(dateMayor:string, dateMenor:string) {
            if(dateMayor!== undefined && dateMenor!== undefined ){
                const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
                const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
                return formattedDateMayor >= formattedDateMenor;
            }else{
                return false;
            }
        },
        esInicioRelevoMayorIgualFechaBaja(){
            if (this.newNovedad.remplazo !== undefined ){
                if (this.esFechaMayor(this.newNovedad.fechaBaja, this.newNovedad.remplazo?.[0].inicioRelevo)) {
                    this.alerta = "La fecha de inicio del relevo no puede ser anterior a la del inicio de la novedad";
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        esFechaBajaMayorFechaAlta(){
            if(this.newNovedad.fechaAlta !== undefined){
                if (this.esFechaMayor(this.newNovedad.fechaBaja, this.newNovedad.fechaAlta)) {
                    this.alerta = "La fecha de fin de la novedad no puede ser anterior a la del inicio de la novedad";
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        esFinRelevoMayorFinNovedad(){
            if(this.newNovedad.remplazo == undefined ){
                return false;
            }
            if(this.newNovedad.remplazo[this.newNovedad.remplazo.length - 1].finRelevo == ""){
                return false;
            }

            if (this.esFechaMayor(this.newNovedad.remplazo[this.newNovedad.remplazo.length - 1].finRelevo , this.newNovedad.fechaAlta)) {
                this.alerta = "La fecha de fin del relevo no puede ser posterior a la del fin de la novedad";
                return true;
            }
        },
        hayMasDeUnRelevo(){
            if (this.newNovedad.remplazo !== undefined) {
                let sinFechaFin = 0;
                for (let i = 0; i < this.newNovedad.remplazo.length - 1; i++) {
                    if (!this.newNovedad.remplazo[i].finRelevo) {
                        sinFechaFin++;
                    }
                    
                    if (this.esFechaMayor(this.newNovedad.remplazo[i].finRelevo, this.newNovedad.remplazo[i + 1].inicioRelevo)) {
                        this.alerta = "Un turno no puede ser relevado por dos personas el mismo día. Y los relevos deben están ordenados consecutivamente.";
                        return true;
                    }
                }
                if (sinFechaFin > 1){
                    this.alerta = "No puede haber más de un relevo sin fecha de finalización";
                    return true;
                }
            }
            return false;
        },
        terminaNovedadMismaFechaFinRelevo(){
            if(this.newNovedad.remplazo !== undefined){
                    if (!this.newNovedad.HNA && !(this.newNovedad.remplazo[this.newNovedad.remplazo.length - 1].finRelevo)) {
                    this.newNovedad.remplazo[this.newNovedad.remplazo.length - 1].finRelevo = this.newNovedad.fechaAlta;
                }
            }
        },
        validaPersonalConNovedadActiva(personal: IPersonal) {
            let encontrado = false;
            
            for (const novedad of this.novedades) {
                if (encontrado) {
                    break; // Salir del bucle si ya se encontró un caso
                }

                if (personal.turno.includes("Ciclo")) {

                    const tieneRelevoActivo = novedad.remplazo.some((remp: Remplazo) =>
                        remp && (!remp.finRelevo || this.esFechaMayorIgual(remp.finRelevo, this.today.toISOString())) && remp.legajo === personal.legajo
                    );

                    if (tieneRelevoActivo) {
                        this.idNovedad = novedad._id;
                        this.alerta = `Este personal ${personal.apellido} ${personal.nombres} se encuentra relevando la novedad N°${novedad._id}. Por favor, finalice el relevo para poder continuar`;
                        encontrado = true;
                    }
                }

                if (novedad.legajo === personal.legajo) {
                    const estaDeBaja =
                        !novedad.novedadInactiva &&
                        ((novedad.HNA && this.esFechaMayorIgual(this.today.toString(), novedad.fechaBaja)) ||
                            (this.esFechaMayorIgual(this.today.toString(), novedad.fechaBaja) && this.esFechaMayorIgual(novedad.fechaAlta, this.today.toString())));

                    if (estaDeBaja) {
                        this.idNovedad = novedad._id;
                        this.alerta = `Este personal ${personal.apellido} ${personal.nombres} se encuentra de baja por la siguiente novedad N°${novedad._id}. Por favor, finalice el relevo para poder continuar`;
                        encontrado = true;
                    }
                }
            }
        },
        // Funcionamiento del Formulario
        agregarRemplazo() {
            if (this.newNovedad.remplazo !== undefined) {
                this.newNovedad.remplazo.push({
                    legajo: 0,
                    apellido: "",
                    nombres: "",
                    especialidad: "",
                    inicioRelevo: this.today.toISOString().split("T")[0],
                    finRelevo: "",
                    base: "",
                    turno: "",
                    franco: "",
                    HNA: true,
                });
            } else {
                this.newNovedad.remplazo = [
                    {
                        legajo: 0,
                        apellido: "",
                        nombres: "",
                        especialidad: "",
                        inicioRelevo: this.today.toISOString().split("T")[0],
                        finRelevo: "",
                        base: "",
                        turno: "",
                        franco: "",
                        HNA: true,
                    },
                ];
            }
        },
        
        /* Este método cuando se hace click en el modal desplegado toma el item y asigna el newNovedad.legajo y
        llama a el método de búsqueda por legajo  */
        selectPersonal(personal: IPersonal) {
            if(this.selectRemplazo){
                this.agregarRemplazo()
                this.newNovedad.remplazo[this.newNovedad.remplazo.length -1].legajo = personal.legajo;
                this.asignarRelevoPorLegajo(personal.legajo,this.newNovedad.remplazo.length -1)
            }else{
                this.newNovedad.legajo = personal.legajo;
            }
            
            this.search = '';
            this.cerrarModal()
            this.searchPersonalPorLegajo();
            
        },
        abrirModal(selectRemplazo:boolean) {
            // Con este método abro el modal poniendo el focus en el input de búsqueda y asigno valor booleano 
            // a la variable selectRemplazo la cual hace de bypass entre buscar personal de la novedad o al remplazo
            this.mostrarModalSearch = true;
            this.$nextTick(() => {
                if (this.$refs.inputSearch) {
                (this.$refs.inputSearch as HTMLInputElement).focus();
                }
            });
            this.selectRemplazo = selectRemplazo;
        },
        cerrarModal() {
            this.mostrarModalSearch = false;
            this.search = '';
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
                            personal.dotacion
                                .toUpperCase()
                                .includes(this.newNovedad.base.toUpperCase()) &&
                            (this.newNovedad.especialidad.includes("Conductor")
                                ? personal.especialidad.includes("Conductor") ||
                                    personal.especialidad.includes(
                                        "Ayudante habilitado"
                                    )
                                : personal.especialidad ==
                                    this.newNovedad.especialidad)
                        );
                    }
                }
            );
        },
        searchPersonalPorLegajo() {
            /*  realiza la búsqueda por el legajo introducido en el respectivo input */
            this.alerta = "";
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return personal.legajo == this.newNovedad.legajo;
                }
            );
            if (this.personalEncontrado[0]) {
                this.validaPersonalConNovedadActiva(this.personalEncontrado[0]);
                this.newNovedad.apellido = this.personalEncontrado[0].apellido;
                this.newNovedad.nombres = this.personalEncontrado[0].nombres;
                this.newNovedad.base = this.personalEncontrado[0].dotacion;
                this.newNovedad.especialidad =
                    this.personalEncontrado[0].especialidad;
                this.newNovedad.turno = this.personalEncontrado[0].turno;
                this.newNovedad.franco =
                    this.days[this.personalEncontrado[0].franco];
                /* this.newNovedad.fechaBaja = this.today
                    .toISOString()
                    .split("T")[0]; */
            }
        },
        asignarRelevoPorLegajo(legajo: number, index: number) {
            // al haber un cambio en el formulario remplazo.legajo se agregan el resto de los datos 
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return personal.legajo == legajo;
                }
            );
            if (this.personalEncontrado[0]) {
                this.validaPersonalConNovedadActiva(this.personalEncontrado[0]);
                this.newNovedad.remplazo[index].apellido =
                    this.personalEncontrado[0].apellido;
                this.newNovedad.remplazo[index].nombres =
                    this.personalEncontrado[0].nombres;
                this.newNovedad.remplazo[index].especialidad =
                    this.personalEncontrado[0].especialidad;
                this.newNovedad.remplazo[index].base =
                    this.personalEncontrado[0].dotacion;
                this.newNovedad.remplazo[index].turno =
                    this.personalEncontrado[0].turno;
            } else {
                this.newNovedad.remplazo[index].apellido = "";
                this.newNovedad.remplazo[index].nombres = "";
                this.newNovedad.remplazo[index].especialidad = "";
                this.newNovedad.remplazo[index].base = "";
                this.newNovedad.remplazo[index].turno = "";
            }
        },
    },
    mounted() {
        try {
            this.obtenerUltimoId();
            this.loadPersonales();
            this.loadNovedades();
            this.newNovedad.HNA = true;
            newToken();
        } catch (error) {
            console.error(error);
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
    min-height: 82vh;
}
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    
    width: 80%;
    --bs-modal-width: 1200px !important;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    max-height: 90vh;
    border-radius: 10px;
}

.d-block {
    display: block !important;
}

.scroll-div {
    overflow-y: scroll;
    max-height: 800px; /* Ajusta según tus necesidades */
}
.table-container {
  max-height: 600px; /* Ajusta según tus necesidades */
  overflow-y: auto;
  background-color: #fff; /* Estilo de fondo para el contenedor de la tabla */
  border-radius: 15px; /* Ajusta según tus necesidades */
}
.table-container table {
  width: 100%; /* Hacer que la tabla ocupe el 100% del contenedor */
}
.custom-modal .modal-dialog {
  max-width: 1200px; /* Ajusta el ancho máximo según tus necesidades */
  margin: 0 auto; /* Centra modal-dialog */
}
</style>

