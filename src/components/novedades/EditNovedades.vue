<template>
    <div>
        <NavBar />
        <main class="container">
            <h1 class="d-flex justify-content-center m-3">Editar Novedad</h1>

            <div class="alert alert-danger" role="alert" v-if="alerta">
                <h4 class="alert-heading">ATENCIÓN!</h4>
                <hr />
                {{ alerta }}
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

            <form @submit.prevent="updateNovedad()" class="row">
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
                            v-for="(remplazo, index) in novedad.remplazo"
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
                                    @click="novedad.remplazo.splice(index, 1)"
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
import { Novedad } from "../../interfaces/INovedades";
import { getNovedad, getNovedades, updateNovedad } from "../../services/novedadesService";
import { IPersonal } from "../../interfaces/IPersonal";
import { getPersonales } from "../../services/personalService";
import { newToken } from "../../services/signService";
import { createRegistro } from "../../services/registrosService";
import { Registro } from "../../interfaces/IRegistro";
import { AxiosError } from "axios";

export default defineComponent({
    data() {
        return {
            novedades: [] as Novedad[],
            novedad: {} as Novedad,
            personales: [] as IPersonal[],
            today: new Date(),
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
        /* Este método busca la novedad en el backend por medio de una consulta HTML:GET */
        async loadNovedad(id: number) {
            try {
                const { data } = await getNovedad(id);
                this.novedad = data;
            } catch (error) {
                console.error(error);
            }
        },
        async loadNovedades() {
            const res = await getNovedades();
            this.novedades = res.data;
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
        async updateNovedad() {
            try {
                // Validaciones
                if (!this.validateFechaBaja() || !this.validateFechaAlta() || !this.validateRelevoOverlap() || !this.validateFechaAltaYBaja()) {
                    return;
                }

                this.validateFechaRemplazo();

                // Filtrar elementos vacíos en el array de remplazo
                if (this.novedad.remplazo) {
                    this.novedad.remplazo = this.novedad.remplazo.filter((remp) => remp.apellido !== "");
                }

                // Crear la novedad
                await updateNovedad(this.novedad._id, this.novedad);

                // guardamos registro
                const registro: Registro = {
                            usuario : window.localStorage.getItem("username")||'',
                            fecha : this.today.toString() ,
                            accion: "Edito",
                            novedad : this.novedad,
                        }
                await createRegistro(registro);

                // Redireccionar
                this.$router.push(`/novedades`);
                
            } catch (error) {
                this.handleRequestError(error as AxiosError);
            }
        },
        handleRequestError(error: AxiosError) {
            console.error("Error en la solicitud:", error);

            if (error.response && error.response.status === 401) {
                // Manejar la lógica de redirección a la página de inicio de sesión
                this.$router.push("/login");
            } else {
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        
        // Validaciones:
        esFechaMayor(dateMayor:string, dateMenor:string) {
        if(dateMayor!==''&& dateMenor!==''){
            const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
            const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
            return formattedDateMayor > formattedDateMenor
        }else{
            return true;
        }
        },
        esFechaMayorIgual(dateMayor:string, dateMenor:string) {
        if(dateMayor!==''&& dateMenor!==''){
            const formattedDateMayor = new Date(dateMayor).toISOString().split('T')[0];
            const formattedDateMenor = new Date(dateMenor).toISOString().split('T')[0];
            return formattedDateMayor >= formattedDateMenor;
        }else{
            return true;
        }
        },
        validateFechaBaja(){
            if (this.esFechaMayor(this.novedad.fechaBaja, this.novedad.remplazo?.[0].inicioRelevo)) {
                this.alerta = "La fecha de inicio del relevo no puede ser anterior a la del inicio de la novedad";
                return false;
            }
            return true;
        },
        validateFechaAltaYBaja(){
            if (this.esFechaMayor(this.novedad.fechaBaja, this.novedad.fechaAlta)) {
                this.alerta = "La fecha de fin de la novedad no puede ser anterior a la del inicio de la novedad";
                return false;
            }
            return true;
        },
        validateFechaAlta(){
            if (this.esFechaMayor(this.novedad.remplazo?.[this.novedad.remplazo.length - 1]?.finRelevo || "", this.novedad.fechaAlta)) {
                this.alerta = "La fecha de fin del relevo no puede ser posterior a la del fin de la novedad";
                return false;
            }
            return true;
        },
        validateRelevoOverlap(){
            if (this.novedad.remplazo?.length > 1) {
                for (let i = 0; i < this.novedad.remplazo.length - 1; i++) {
                    if (!this.novedad.remplazo[i].finRelevo) {
                        this.alerta = "No puede haber más de un relevo sin fecha de finalización";
                        return false;
                    }

                    if (this.esFechaMayor(this.novedad.remplazo[i].finRelevo, this.novedad.remplazo[i + 1].inicioRelevo)) {
                        this.alerta = "Un turno no puede ser relevado por dos personas el mismo día";
                        return false;
                    }
                }
            }
            return true;
        },
        validateFechaRemplazo(){
            if (!this.novedad.HNA && !(this.novedad.remplazo?.[this.novedad.remplazo.length - 1]?.finRelevo)) {
                this.novedad.remplazo[this.novedad.remplazo.length - 1].finRelevo = this.novedad.fechaAlta;
            }
        },

        // Funcionamiento del Formulario
        agregarRemplazo() {
            // Este método agrega un elemento nuevo a la lista remplazo
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
        selectPersonal(personal: IPersonal) {
            /* Este método cuando se hace click en el modal desplegado toma el item y asigna el novedad.legajo y 
            llama a el método de búsqueda por legajo */
            if(this.selectRemplazo){
                this.agregarRemplazo()
                this.novedad.remplazo[this.novedad.remplazo.length -1].legajo = personal.legajo;
                this.asignarRelevoPorLegajo(personal.legajo,this.novedad.remplazo.length -1)
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
                            personal.turno.toLowerCase().includes("ciclo") &&
                            personal.dotacion
                                .toUpperCase()
                                .includes(this.novedad.base.toUpperCase()) &&
                            (this.novedad.especialidad.includes("Conductor")
                                ? personal.especialidad.includes("Conductor") ||
                                    personal.especialidad.includes("Ayudante habilitado")
                                : personal.especialidad ==
                                    this.novedad.especialidad)
                        );
                    }
                }
            );
        },
        searchPersonalPorLegajo() {
            /*  realiza la búsqueda por el legajo introducido en el respectivo input */
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
        asignarRelevoPorLegajo(legajo: number, index: number) {
            // al haber un cambio en el formulario remplazo.legajo se agregan el resto de los datos 
            this.personalEncontrado = this.personales.filter(
                (personal: IPersonal) => {
                    return personal.legajo == legajo;
                }
            );
            if (this.personalEncontrado[0]) {
                this.novedad.remplazo[index].apellido =
                    this.personalEncontrado[0].apellido;
                this.novedad.remplazo[index].nombres =
                    this.personalEncontrado[0].nombres;
                this.novedad.remplazo[index].especialidad =
                    this.personalEncontrado[0].especialidad;
                this.novedad.remplazo[index].base =
                    this.personalEncontrado[0].dotacion;
                this.novedad.remplazo[index].turno =
                    this.personalEncontrado[0].turno;
            } else {
                this.novedad.remplazo[index].apellido = "";
                this.novedad.remplazo[index].nombres = "";
                this.novedad.remplazo[index].especialidad = "";
                this.novedad.remplazo[index].base = "";
                this.novedad.remplazo[index].turno = "";
            }
        },
    },
    mounted() {
        try {
            this.loadPersonales();
            if (typeof this.$route.params.id === "string") {
                this.loadNovedad(parseInt(this.$route.params.id));
            }
            this.loadNovedades();
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
