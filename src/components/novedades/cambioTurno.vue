<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Cambio de turno
            </h1>
            <div class="row">
                <div class="col-3" v-if="novedad.cambioTurno">
                    <label for="fechaBaja"></label>
                    Fecha del cambio
                    <input
                        required
                        class="form-control mb-3"
                        type="Date"
                        name="fechaBaja"
                        v-model="novedad.cambioTurno.fechaCambio"
                    />
                </div>
            </div>
            <div
                class="alert  row"
                :class="[message.status=='danger'?'alert-danger':message.status=='success'?'alert-success':message.status=='warning'?'alert-warning':'']"
                role="alert"
                v-if="message.activo"
            >
                <h4 class="alert-heading">{{ message.title }}</h4>
                <hr />
                {{ message.message }}
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
            <form @submit.prevent="saveNovedad()" @keydown.enter.prevent=""  class="row">
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
                            v-model="novedad.legajo"
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
                            v-model="novedad.apellido"
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
                            v-model="novedad.nombres"
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
                            v-model="novedad.base"
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
                            v-model="novedad.especialidad"
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
                
                
                <!-- Llamada Modal búsqueda -->
                <a class="btn btn-success col-2" @click="abrirModal(true)">Buscar Remplazo </a>
                <!-- Tabla remplazo -->
                <div class="row" v-if="novedad.cambioTurno">
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
                            @change="asignarRelevoPorLegajo(novedad.cambioTurno.legajo)"
                            v-model="novedad.cambioTurno.legajo"
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
                            v-model="novedad.cambioTurno.apellido"
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
                            v-model="novedad.cambioTurno.nombres"
                            disabled
                        />
                    </div>
                </div>
                <div class="row" v-if="novedad.cambioTurno">
                    <div class="col-1">
                        <label for="base"></label>
                        Base
                        <input
                            class="form-control mb-3"
                            placeholder=""
                            type="text"
                            name="base"
                            v-model="novedad.cambioTurno.base"
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
                            v-model="novedad.cambioTurno.especialidad"
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
                            v-model="novedad.cambioTurno.turno"
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
                            v-model="novedad.cambioTurno.franco"
                            disabled
                        />
                    </div>
                </div>

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
import { Novedad, Remplazo } from '../../interfaces/INovedades';
import {
    
    createNovedad,
    getNovedades,
    getUltimaNovedad,
    updateNovedad,
    
} from "../../services/novedadesService";
import { getPersonales } from "../../services/personalService";
import { IPersonal } from "../../interfaces/IPersonal";
import { newToken } from "../../services/signService";
import { AxiosError } from "axios";
import { createRegistro } from "../../services/registrosService";
import { Registro } from "../../interfaces/IRegistro";

export default defineComponent({
    data() {
        return {
            today: new Date(),
            novedades: [] as Novedad[],
            novedad: {
                cambioTurno:{
                    legajo: 0,
                    apellido: "",
                    nombres: "",
                    especialidad: "",
                    base: "",
                    turno: "",
                    franco: "",
                    fechaCambio: new Date().toISOString().split('T')[0],
                }
            } as Novedad,
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
            selectRemplazo: false,
            personalEncontrado: [] as IPersonal[],
            mostrarModalSearch: false,
            idNovedad: 0,
            cicloRelevando: false,
            message: {
                activo: false,
                status: "",
                title: "",
                message: "",
            },
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
                this.novedad._id = this.ultimoId;
                
                // Validaciones
                if(this.cicloRelevando){
                    this.message.activo = false;
                    this.actualizarRelevo()

                } 
                
                if (this.esInicioRelevoMayorIgualFechaBaja() || this.esFinRelevoMayorFinNovedad() || this.hayMasDeUnRelevo() || this.esFechaBajaMayorFechaAlta() || this.message.activo) {
                    if(this.message.activo){
                        this.message.message = "Ocurrió un problema con la validación. Si el error persiste, Contacte al administrador con capturas de pantalla del error."
                        this.message.status = 'danger'
                        this.idNovedad = 0;
                    }
                    return;
                }

                this.terminaNovedadMismaFechaFinRelevo();

                // Filtrar elementos vacíos en el array de remplazo
                if (this.novedad.remplazo) {
                    this.novedad.remplazo = this.novedad.remplazo.filter((remp) => remp.apellido !== "");
                }

                this.novedad.novedadInactiva = false;

                // Crear la novedad
                await createNovedad(this.novedad);
                
                // guardamos registro
                const registro: Registro = {
                            usuario : window.localStorage.getItem("username")||'',
                            fecha : this.today.toString() ,
                            accion: "Creo",
                            novedad : this.novedad,
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
                localStorage.removeItem("username")
                localStorage.removeItem("roles")
                localStorage.removeItem("token")
                this.$router.push("/login");
            } else if(error.response && error.response.status === 500){
                this.message.message = "Ocurrió un error al intentar guardar la novedad. Es posible que se deba a que el numero de novedad ya existe. por favor intente de nuevo."
                this.message.activo = true
                this.message.status = 'danger'
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        async actualizarRelevo(){
            const novedadesIndex = this.novedadesIndexada(this.novedades)
                novedadesIndex[this.idNovedad].remplazo.forEach(remp=>{
                    if(remp.legajo === this.novedad.legajo){
                        // const relevo:Remplazo = remp;
                        const fechaDiaAnterior = new Date(this.novedad.fechaBaja); 
                        fechaDiaAnterior.setDate(fechaDiaAnterior.getDate() - 1)
                        const fechaFinRelevo = remp.finRelevo;
                        remp.finRelevo = fechaDiaAnterior.toISOString().split('T')[0];
                        if(this.novedad.fechaAlta){
                            const fechaDiaPosterior = new Date(this.novedad.fechaAlta); 
                            fechaDiaPosterior.setDate(fechaDiaPosterior.getDate() + 1)
                            const remplazo: Remplazo = { ...remp };
                            remplazo.inicioRelevo = fechaDiaPosterior.toISOString().split('T')[0];
                            remplazo.finRelevo = fechaFinRelevo;
                            novedadesIndex[this.idNovedad].remplazo.push(remplazo)
                        }
                    }
                })
                
                if(novedadesIndex[this.idNovedad].detalle){
                    novedadesIndex[this.idNovedad].detalle = novedadesIndex[this.idNovedad].detalle + 
                    "\nEl Personal "+ this.novedad.apellido + " " + this.novedad.nombres + " fue dado de baja por la novedad N*"+ (this.ultimoId + 1)
                }else{
                    novedadesIndex[this.idNovedad].detalle = "El Personal "+ this.novedad.apellido + " " + this.novedad.nombres + " fue dado de baja por la novedad N*"+ (this.ultimoId + 1)
                }
                if(this.novedad.detalle){
                    this.novedad.detalle = this.novedad.detalle + "Este personal estaba relevando la Novedad N* "+ this.idNovedad 
                }else{
                    this.novedad.detalle = "Este personal estaba relevando la Novedad N* "+ this.idNovedad 
                }
            await updateNovedad(this.idNovedad,novedadesIndex[this.idNovedad]);
        },
        novedadesIndexada(novedades: Novedad[]) {
            return novedades.reduce((acumulador: Record<number, Novedad>, novedad: Novedad) => {
            acumulador[novedad._id] = novedad;
            return acumulador;
            }, {} as Record<number, Novedad>);
        },

        // Validaciones:
        esFechaMayor(dateMayor:string, dateMenor:string) {
            if(dateMayor && dateMenor){            
                const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
                const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
                return formattedDateMayor > formattedDateMenor
            }else{
                return false;
            }
        },
        esFechaMayorIgual(dateMayor:string, dateMenor:string) {
            if(dateMayor && dateMenor ){
                const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
                const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
                return formattedDateMayor >= formattedDateMenor;
            }else{
                return false;
            }
        },
        esInicioRelevoMayorIgualFechaBaja(){
            if (this.novedad.remplazo !== undefined ){
                if (this.esFechaMayor(this.novedad.fechaBaja, this.novedad.remplazo?.[0].inicioRelevo)) {
                    this.message.message = "La fecha de inicio del relevo no puede ser anterior a la del inicio de la novedad";
                    this.message.activo = true;
                    this.message.status = 'danger'
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        esFechaBajaMayorFechaAlta(){
            if(this.novedad.fechaAlta !== undefined){
                if (this.esFechaMayor(this.novedad.fechaBaja, this.novedad.fechaAlta)) {
                    this.message.message = "La fecha de fin de la novedad no puede ser anterior a la del inicio de la novedad";
                    this.message.activo = true;
                    this.message.status = 'danger'
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        esFinRelevoMayorFinNovedad(){
            if(this.novedad.remplazo == undefined){
                return false;
            }
            if(this.novedad.remplazo.length === 0){
                return false;
            }
            if(this.novedad.remplazo[this.novedad.remplazo.length - 1].finRelevo == ""){
                return false;
            }
            if(this.novedad.fechaAlta){
                if (this.esFechaMayor(this.novedad.remplazo[this.novedad.remplazo.length - 1].finRelevo , this.novedad.fechaAlta)) {
                    this.message.message = "La fecha de fin del relevo no puede ser posterior a la del fin de la novedad";
                    this.message.activo = true;
                    this.message.status = 'danger'
                    return true;
                }
            }
        },
        hayMasDeUnRelevo(){
            if (this.novedad.remplazo !== undefined) {
                let sinFechaFin = 0;
                for (let i = 0; i < this.novedad.remplazo.length - 1; i++) {
                    if (!this.novedad.remplazo[i].finRelevo) {
                        sinFechaFin++;
                    }
                    
                    if (this.esFechaMayor(this.novedad.remplazo[i].finRelevo, this.novedad.remplazo[i + 1].inicioRelevo)) {
                        this.message.message = "Un turno no puede ser relevado por dos personas el mismo día. Y los relevos deben están ordenados consecutivamente.";
                        this.message.activo = true;
                        this.message.status = 'danger'
                        return true;
                    }
                }
                if (sinFechaFin > 1){
                    this.message.message = "No puede haber más de un relevo sin fecha de finalización";
                    this.message.activo = true;
                    this.message.status = 'danger'
                    return true;
                }
            }
            return false;
        },
        terminaNovedadMismaFechaFinRelevo(){
            if(this.novedad.remplazo !== undefined){
                    if (!this.novedad.HNA && !(this.novedad.remplazo[this.novedad.remplazo.length - 1].finRelevo)) {
                    this.novedad.remplazo[this.novedad.remplazo.length - 1].finRelevo = this.novedad.fechaAlta;
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

                    const tieneRelevoActivo = !novedad.novedadInactiva && novedad.remplazo.some((remp: Remplazo) =>
                        remp && (!remp.finRelevo || this.esFechaMayorIgual(remp.finRelevo, this.today.toISOString())) && remp.legajo === personal.legajo
                    );

                    if (tieneRelevoActivo) {
                        this.idNovedad = novedad._id;
                        this.message.message = `El personal ${personal.apellido} ${personal.nombres} se encuentra relevando la novedad N°${novedad._id}.`;
                        this.message.status = 'warning'
                        this.message.activo = true;
                        this.cicloRelevando = true;
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
                        this.message.message = `Este personal ${personal.apellido} ${personal.nombres} se encuentra de baja por la siguiente novedad N°${novedad._id}. Por favor, finalice el relevo para poder continuar`;
                        this.message.activo = true;
                        this.message.status = 'danger'
                        encontrado = true;
                    }
                }
            }
        },
        // Funcionamiento del Formulario
        agregarRemplazo() {
            if (this.novedad.remplazo !== undefined) {
                this.novedad.remplazo.push({
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
                this.novedad.remplazo = [
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
        
        /* Este método cuando se hace click en el modal desplegado toma el item y asigna el novedad.legajo y
        llama a el método de búsqueda por legajo  */
        selectPersonal(personal: IPersonal) {
            if(this.selectRemplazo){
                this.agregarRemplazo()
                this.novedad.cambioTurno.legajo = personal.legajo;
                this.asignarRelevoPorLegajo(personal.legajo)
            }else{
                this.novedad.legajo = personal.legajo;
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
                            personal.dotacion
                                .toUpperCase()
                                .includes(this.novedad.base.toUpperCase()) &&
                            (this.novedad.especialidad.includes("Conductor")
                                ? personal.especialidad.includes("Conductor") ||
                                    personal.especialidad.includes(
                                        "Ayudante habilitado"
                                    )
                                : personal.especialidad ==
                                    this.novedad.especialidad)
                        );
                    }
                }
            );
        },
        searchPersonalPorLegajo() {
            /*  realiza la búsqueda por el legajo introducido en el respectivo input */
            this.message.message = "";
            this.message.status = '';
            this.message.activo = false;
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return personal.legajo == this.novedad.legajo;
                }
            );
            if (this.personalEncontrado[0]) {
                this.validaPersonalConNovedadActiva(this.personalEncontrado[0]);
                this.novedad.apellido = this.personalEncontrado[0].apellido;
                this.novedad.nombres = this.personalEncontrado[0].nombres;
                this.novedad.base = this.personalEncontrado[0].dotacion;
                this.novedad.especialidad =
                    this.personalEncontrado[0].especialidad;
                this.novedad.turno = this.personalEncontrado[0].turno;
                this.novedad.franco =
                    this.days[this.personalEncontrado[0].franco];
                /* this.novedad.fechaBaja = this.today
                    .toISOString()
                    .split("T")[0]; */
            }
        },
        asignarRelevoPorLegajo(legajo: number) {
            // al haber un cambio en el formulario remplazo.legajo se agregan el resto de los datos 
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return personal.legajo == legajo;
                }
            );
            if (this.personalEncontrado[0]) {
                this.validaPersonalConNovedadActiva(this.personalEncontrado[0]);
                this.novedad.cambioTurno.apellido = this.personalEncontrado[0].apellido;
                this.novedad.cambioTurno.nombres =this.personalEncontrado[0].nombres;
                this.novedad.cambioTurno.especialidad =this.personalEncontrado[0].especialidad;
                this.novedad.cambioTurno.base =this.personalEncontrado[0].dotacion;
                this.novedad.cambioTurno.turno =this.personalEncontrado[0].turno;
            } else {
                this.novedad.cambioTurno.apellido = "";
                this.novedad.cambioTurno.nombres = "";
                this.novedad.cambioTurno.especialidad = "";
                this.novedad.cambioTurno.base = "";
                this.novedad.cambioTurno.turno = "";
            }
        },
    },
    mounted() {
        try {
            this.obtenerUltimoId();
            this.loadPersonales();
            this.loadNovedades();
            // this.novedad.HNA = true;
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

