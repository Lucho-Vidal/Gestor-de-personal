<template>
    <main>
        <h1>
            {{  titulo }}
        </h1>
        <div
            class="alert row"
            :class="[
                message.status == 'danger'
                    ? 'alert-danger'
                    : message.status == 'success'
                    ? 'alert-success'
                    : message.status == 'warning'
                    ? 'alert-warning'
                    : '',
            ]"
            role="alert"
            v-if="message.activo"
        >
            <h4 class="alert-heading">{{ message.title }}</h4>
            <hr />
            {{ message.message }}
            <button
                v-if="idNovedad !== 0"
                class="btn btn-danger col-2"
                @click="$router.push(`/editNovedades/${idNovedad}`)"
            >
                Ir a la novedad
            </button>
        </div>
        <!-- Modal de búsqueda -->

        <div>
            <div class="modal" :class="{ 'd-block': mostrarModalSearch }"  @click.self="cerrarModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Buscar personales</h5>
                            <button
                                type="button"
                                class="close btn btn-danger"
                                @click="cerrarModal"
                            >
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
                                @keyup="searchPersonal(selectRemplazo)"
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
                                        <tr
                                            v-for="(personal,
                                            index) in personalEncontrado"
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
                                                {{ days[personal.franco] }}
                                            </td>
                                            <td class="col-1">
                                                {{ personal.especialidad }}
                                            </td>
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
        <form @submit.prevent="saveNovedad()">
            <div>
                <button
                    class="btn btn-success"
                    @click.prevent="abrirModal(false)"
                >
                    Buscar Personal
                </button>
            </div>
            <div class="justify-content-between row">
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
            <div class="justify-content-between row">
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
            <div class="justify-content-between row">
                <div class="col-3">
                    <label for="tipoNovedad">Tipo de Novedad </label>
                    <select
                        name="tipoNovedad"
                        id="tipoNovedad"
                        class="form-control mb-3"
                        v-model="novedad.tipoNovedad"
                        required
                    >
                        //Enfermos
                        <option value="Enfermedad">Enfermedad</option>
                        <option value="ART">ART</option>
                        <hr>
                        //res558
                        <option value="Arrollamiento 558">Arrollamiento 558</option>
                        <hr>
                        //LicenciaAnual
                        <option value="Licencia Anual">Licencia Anual</option>
                        <hr>
                        //escTecnica
                        <option value="Escuela Tecnica">Escuela Tecnica</option>
                        <hr>
                        //disciplinarios
                        <option value="Suspension">Suspension</option>
                        <hr>
                        //Legales y convencionales
                        <option value="Estudio">Estudio</option>
                        <option value="Licencia Deportiva">Licencia Deportiva</option>
                        <option value="Licencia Gremial">Licencia Gremial</option>
                        <option value="Examen">Examen</option>
                        <option value="Art17-23">Art 17 FT / Art 23 UF</option>
                        <option value="Donación Sangre">Donación Sangre</option>
                        <option value="Donación Plaqueta">Donación Plaqueta</option>
                        <option value="Casamiento">Casamiento</option>
                        <option value="Duelo">Duelo</option>
                        <hr>
                        //OtrosMotivos
                        <option value="Ausente">Ausente</option>
                        <hr>
                        //Franco
                        <option value="Descanso Adeudado">Descanso Adeudado</option>
                        <hr>
                        //sin efecto en el estadistico
                        <option value="Practica">Practica via</option>
                        <option value="Revision Medica">Revision Medica</option>
                        <option value="Baja definitiva">Baja definitiva</option>
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
                        required
                        class="form-control mb-3"
                        type="Date"
                        name="fechaAlta"
                        v-model="novedad.fechaAlta"
                        @change="calcularDiasNovedad(true)"
                    />
                </div>
                <div class="col-3" v-if="!novedad.HNA">
                    <label for="fechaAlta"></label>
                    Cantidad de días
                    <input
                        required
                        class="form-control mb-3"
                        type="number"
                        name="cantidadDias"
                        v-model="cantDias"
                        @change="calcularDiasNovedad(false)"
                        @focus="handleInputFocus"
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
                        v-model="novedad.detalle"
                    ></textarea>
                </div>
            </div>
            <!-- Llamada Modal búsqueda -->
            <button class="btn btn-success col-2" @click.prevent="abrirModal(true)" >
                Buscar Remplazo
            </button>
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
                                class="material-icons cursor-hand verde"
                                @click="agregarRemplazo()"
                                >person_add</i
                            >
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
                                class="form-control mb-3"
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
                                class="material-icons cursor-hand rojo"
                                @click="novedad.remplazo.splice(index, 1)"
                                >clear</i
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button class="btn btn-primary col-1 m-2">Guardar</button>
                <button
                    class="btn btn-secondary col-1 m-2"
                    @click="$router.push('/novedades')"
                >
                    Cerrar
                </button>
            </div>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Novedad, Remplazo } from "../../interfaces/INovedades";
import {
    createNovedad,
    getNovedad,
    getNovedades,
    getUltimaNovedad,
    updateNovedad,
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
            novedad: {} as Novedad,
            titulo:"" as string,
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
            //alerta: "" as string,
            mostrarModalSearch: false,
            cantDias: 1,
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
        async loadPersonales() {
            /* Este método trae la lista de todos los personales */
            const res = await getPersonales();
            this.personales = res.data;
        },
        async saveNovedad() {
            /* Método utilizado para realizar la consulta HTML:POST al backend para el guardado de los datos */
            try {
                
                // Validaciones
                if (this.cicloRelevando) {
                    this.message.activo = false;
                    this.actualizarRelevo();
                }

                if (
                    this.esInicioRelevoMayorIgualFechaBaja() ||
                    this.esFinRelevoMayorFinNovedad() ||
                    this.hayMasDeUnRelevo() ||
                    this.esFechaBajaMayorFechaAlta() ||
                    this.message.activo
                ) {
                    if (this.message.activo) {
                        this.message.message =
                            "Ocurrió un problema con la validación. Si el error persiste, Contacte al administrador con capturas de pantalla del error.";
                        this.message.status = "danger";
                        this.idNovedad = 0;
                    }
                    return;
                }

                this.terminaNovedadMismaFechaFinRelevo();

                // Filtrar elementos vacíos en el array de remplazo
                if (this.novedad.remplazo) {
                    this.novedad.remplazo = this.novedad.remplazo.filter(
                        (remp:Remplazo) => remp.apellido !== ""
                    );
                }

                let accion = ""
                // Crear la novedad
                if (this.$route.params.id && typeof this.$route.params.id === "string") {

                    accion = "Edito"
                    console.log(this.novedad._id);
                    await updateNovedad(this.novedad._id, this.novedad);
                } else {
                    this.ultimoId++;
                    this.novedad._id = this.ultimoId;
                    this.novedad.fecha = this.today.toISOString().split("T")[0];
                    this.novedad.novedadInactiva = false;
                    accion = "Creo"
                    await createNovedad(this.novedad);
                }

                // guardamos registro
                const registro: Registro = {
                    usuario: window.localStorage.getItem("username") || "",
                    fecha: this.today.toString(),
                    accion: accion,
                    novedad: this.novedad,
                };
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
                localStorage.removeItem("username");
                localStorage.removeItem("roles");
                localStorage.removeItem("token");
                this.$router.push("/login");
            } else if (error.response && error.response.status === 500) {
                this.message.message =
                    "Ocurrió un error al intentar guardar la novedad. Es posible que se deba a que el numero de novedad ya existe. por favor intente de nuevo.";
                this.message.activo = true;
                this.message.status = "danger";
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        async actualizarRelevo() {
            const novedadesIndex = this.novedadesIndexada(this.novedades);
            novedadesIndex[this.idNovedad].remplazo.forEach((remp) => {
                if (remp.legajo === this.novedad.legajo) {
                    // const relevo:Remplazo = remp;
                    const fechaDiaAnterior = new Date(
                        this.novedad.fechaBaja
                    );
                    fechaDiaAnterior.setDate(fechaDiaAnterior.getDate() - 1);
                    const fechaFinRelevo = remp.finRelevo;
                    remp.finRelevo = fechaDiaAnterior
                        .toISOString()
                        .split("T")[0];
                    if (this.novedad.fechaAlta) {
                        const fechaDiaPosterior = new Date(
                            this.novedad.fechaAlta
                        );
                        fechaDiaPosterior.setDate(
                            fechaDiaPosterior.getDate() + 1
                        );
                        const remplazo: Remplazo = { ...remp };
                        remplazo.inicioRelevo = fechaDiaPosterior
                            .toISOString()
                            .split("T")[0];
                        remplazo.finRelevo = fechaFinRelevo;
                        novedadesIndex[this.idNovedad].remplazo.push(remplazo);
                    }
                }
            });

            if (novedadesIndex[this.idNovedad].detalle) {
                novedadesIndex[this.idNovedad].detalle =
                    novedadesIndex[this.idNovedad].detalle +
                    "\nEl Personal " +
                    this.novedad.apellido +
                    " " +
                    this.novedad.nombres +
                    " fue dado de baja por la novedad N*" +
                    (this.ultimoId + 1);
            } else {
                novedadesIndex[this.idNovedad].detalle =
                    "El Personal " +
                    this.novedad.apellido +
                    " " +
                    this.novedad.nombres +
                    " fue dado de baja por la novedad N*" +
                    (this.ultimoId + 1);
            }
            if (this.novedad.detalle) {
                this.novedad.detalle =
                    this.novedad.detalle +
                    "Este personal estaba relevando la Novedad N* " +
                    this.idNovedad;
            } else {
                this.novedad.detalle =
                    "Este personal estaba relevando la Novedad N* " +
                    this.idNovedad;
            }
            await updateNovedad(this.idNovedad, novedadesIndex[this.idNovedad]);
        },
        novedadesIndexada(novedades: Novedad[]) {
            return novedades.reduce(
                (acumulador: Record<number, Novedad>, novedad: Novedad) => {
                    acumulador[novedad._id] = novedad;
                    return acumulador;
                },
                {} as Record<number, Novedad>
            );
        },
        handleInputFocus(event: FocusEvent) {
            const inputElement = event.target as HTMLInputElement;
            if (inputElement) {
                inputElement.select(); // Selecciona el contenido del input
            }
        },
        // Validaciones:
        esFechaMayor(dateMayor: string, dateMenor: string) {
            if (dateMayor && dateMenor) {
                const formattedDateMayor = new Date(dateMayor)
                    .toISOString()
                    .split("T")[0];
                const formattedDateMenor = new Date(dateMenor)
                    .toISOString()
                    .split("T")[0];
                return formattedDateMayor > formattedDateMenor;
            } else {
                return false;
            }
        },
        esFechaMayorIgual(dateMayor: string, dateMenor: string) {
            if (dateMayor && dateMenor) {
                const formattedDateMayor = new Date(dateMayor)
                    .toISOString()
                    .split("T")[0];
                const formattedDateMenor = new Date(dateMenor)
                    .toISOString()
                    .split("T")[0];
                return formattedDateMayor >= formattedDateMenor;
            } else {
                return false;
            }
        },
        esInicioRelevoMayorIgualFechaBaja() {
            if (this.novedad.remplazo !== undefined) {
                if (
                    this.esFechaMayor(
                        this.novedad.fechaBaja,
                        this.novedad.remplazo?.[0].inicioRelevo
                    )
                ) {
                    this.message.message =
                        "La fecha de inicio del relevo no puede ser anterior a la del inicio de la novedad";
                    this.message.activo = true;
                    this.message.status = "danger";
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        esFechaBajaMayorFechaAlta() {
            if (this.novedad.fechaAlta !== undefined) {
                if (
                    this.esFechaMayor(
                        this.novedad.fechaBaja,
                        this.novedad.fechaAlta
                    )
                ) {
                    this.message.message =
                        "La fecha de fin de la novedad no puede ser anterior a la del inicio de la novedad";
                    this.message.activo = true;
                    this.message.status = "danger";
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        esFinRelevoMayorFinNovedad() {
            if (this.novedad.remplazo == undefined) {
                return false;
            }
            if (this.novedad.remplazo.length === 0) {
                return false;
            }
            if (
                this.novedad.remplazo[this.novedad.remplazo.length - 1]
                    .finRelevo == ""
            ) {
                return false;
            }
            if (this.novedad.fechaAlta) {
                if (
                    this.esFechaMayor(
                        this.novedad.remplazo[
                            this.novedad.remplazo.length - 1
                        ].finRelevo,
                        this.novedad.fechaAlta
                    )
                ) {
                    this.message.message =
                        "La fecha de fin del relevo no puede ser posterior a la del fin de la novedad";
                    this.message.activo = true;
                    this.message.status = "danger";
                    return true;
                }
            }
        },
        hayMasDeUnRelevo() {
            if (this.novedad.remplazo !== undefined) {
                let sinFechaFin = 0;
                for (let i = 0; i < this.novedad.remplazo.length - 1; i++) {
                    if (!this.novedad.remplazo[i].finRelevo) {
                        sinFechaFin++;
                    }

                    if (
                        this.esFechaMayor(
                            this.novedad.remplazo[i].finRelevo,
                            this.novedad.remplazo[i + 1].inicioRelevo
                        )
                    ) {
                        this.message.message =
                            "Un turno no puede ser relevado por dos personas el mismo día. Y los relevos deben están ordenados consecutivamente.";
                        this.message.activo = true;
                        this.message.status = "danger";
                        return true;
                    }
                }
                if (sinFechaFin > 1) {
                    this.message.message =
                        "No puede haber más de un relevo sin fecha de finalización";
                    this.message.activo = true;
                    this.message.status = "danger";
                    return true;
                }
            }
            return false;
        },
        terminaNovedadMismaFechaFinRelevo() {
            if (this.novedad.remplazo !== undefined) {
                if (
                    !this.novedad.HNA &&
                    !this.novedad.remplazo[
                        this.novedad.remplazo.length - 1
                    ].finRelevo
                ) {
                    this.novedad.remplazo[
                        this.novedad.remplazo.length - 1
                    ].finRelevo = this.novedad.fechaAlta;
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
                    const tieneRelevoActivo =
                        !novedad.novedadInactiva &&
                        novedad.remplazo.some(
                            (remp: Remplazo) =>
                                remp &&
                                (!remp.finRelevo ||
                                    this.esFechaMayorIgual(
                                        remp.finRelevo,
                                        this.today.toISOString()
                                    )) &&
                                remp.legajo === personal.legajo
                        );

                    if (tieneRelevoActivo) {
                        this.idNovedad = novedad._id;
                        this.message.message = `El personal ${personal.apellido} ${personal.nombres} se encuentra relevando la novedad N°${novedad._id}. 
                        Si desea proceder se finalizara su relevo automáticamente.`;
                        this.message.status = "warning";
                        this.message.activo = true;
                        this.cicloRelevando = true;
                        encontrado = true;
                    }
                }

                if (novedad.legajo === personal.legajo) {
                    const estaDeBaja =
                        !novedad.novedadInactiva &&
                        ((novedad.HNA &&
                            this.esFechaMayorIgual(
                                this.today.toString(),
                                novedad.fechaBaja
                            )) ||
                            (this.esFechaMayorIgual(
                                this.today.toString(),
                                novedad.fechaBaja
                            ) &&
                                this.esFechaMayorIgual(
                                    novedad.fechaAlta,
                                    this.today.toString()
                                )));

                    if (estaDeBaja) {
                        this.idNovedad = novedad._id;
                        this.message.message = `Este personal ${personal.apellido} ${personal.nombres} se encuentra de baja por la siguiente novedad N°${novedad._id}. Por favor, finalice el relevo para poder continuar`;
                        this.message.activo = true;
                        this.message.status = "danger";
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
        calcularDiasNovedad(esFecha: boolean) {
            if (this.cantDias < 1) {
                this.cantDias = 1;
                return;
            }
            try {
                if (esFecha) {
                    // Supongamos que tienes dos fechas almacenadas en variables llamadas "fecha1" y "fecha2"
                    const fecha1: Date = new Date(this.novedad.fechaBaja);
                    const fecha2: Date = new Date(this.novedad.fechaAlta);

                    // Calcula la diferencia en miliSegundos entre las dos fechas
                    const diferenciaEnMiliSegundos =
                        fecha2.getTime() - fecha1.getTime();

                    // Convierte la diferencia de miliSegundos a días
                    const diferenciaEnDias =
                        diferenciaEnMiliSegundos / (1000 * 60 * 60 * 24);

                    this.cantDias = diferenciaEnDias + 1;
                } else {
                    const newFechaAlta = new Date(this.novedad.fechaBaja);
                    newFechaAlta.setDate(
                        newFechaAlta.getDate() + this.cantDias - 1
                    );
                    this.novedad.fechaAlta = newFechaAlta
                        .toISOString()
                        .split("T")[0];
                }
            } catch (error) {
                console.error(error)
            }
            
        },
        /* Este método cuando se hace click en el modal desplegado toma el item y asigna el novedad.legajo y
        llama a el método de búsqueda por legajo  */
        selectPersonal(personal: IPersonal) {
            if (this.selectRemplazo) {
                this.agregarRemplazo();
                this.novedad.remplazo[
                    this.novedad.remplazo.length - 1
                ].legajo = personal.legajo;
                this.asignarRelevoPorLegajo(
                    personal.legajo,
                    this.novedad.remplazo.length - 1
                );
            } else {
                this.novedad.legajo = personal.legajo;
            }

            this.search = "";
            this.cerrarModal();
            this.searchPersonalPorLegajo();
        },
        abrirModal(selectRemplazo: boolean) {
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
            this.search = "";
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
            this.message.status = "";
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
                this.novedad.especialidad = this.personalEncontrado[0].especialidad;
                this.novedad.turno = this.personalEncontrado[0].turno;
                this.novedad.franco = this.days[
                    this.personalEncontrado[0].franco
                ];
                /* this.novedad.fechaBaja = this.today
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
                this.novedad.remplazo[
                    index
                ].apellido = this.personalEncontrado[0].apellido;
                this.novedad.remplazo[
                    index
                ].nombres = this.personalEncontrado[0].nombres;
                this.novedad.remplazo[
                    index
                ].especialidad = this.personalEncontrado[0].especialidad;
                this.novedad.remplazo[
                    index
                ].base = this.personalEncontrado[0].dotacion;
                this.novedad.remplazo[
                    index
                ].turno = this.personalEncontrado[0].turno;
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
            if (this.$route.params.id && typeof this.$route.params.id === "string") {
                this.titulo = "Editar novedad"
                this.loadNovedad(parseInt(this.$route.params.id));
            }else{
                this.titulo = "Cargar nueva novedad"
                this.obtenerUltimoId();
            }
            this.loadNovedades();
            this.novedad.HNA = true;
            newToken();
        } catch (error) {
            console.error(error);
        }
    },
    components: {},
});
</script>
<style>
main {
    margin-top: 5rem;
    /* margin-left: 300px; */
}
h1 {
    display: flex;
    justify-content: center;
}
form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 250px;
    width: 75%;
}
.row {
    margin-left: 0px;
}
</style>
