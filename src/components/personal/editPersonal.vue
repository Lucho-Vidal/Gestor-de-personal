<template>
        <main>
            <h1>
                Editar Personal
            </h1>
            <div class="alert alert-danger" role="alert" v-if="alerta">
                <h4 class="alert-heading">ATENCIÓN!</h4>
                <hr>
                {{ alerta }}
            </div>
            <!-- <modalBuscarPersonal:personales="personales" /> -->
            <form 
                @submit.prevent="editPersonal()" >
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
                            v-model="personal.legajo"
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
                            v-model="personal.apellido"
                            required
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
                            v-model="personal.nombres"
                            required
                        />
                    </div>
                </div>
                <div class="justify-content-between row">
                    
                    <div class="col-1">
                        <label for="base">Base </label>
                        <select
                            name="base"
                            id="base"
                            class="form-control mb-3"
                            v-model="personal.dotacion"
                            
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
                            v-model="personal.especialidad"
                            required
                        >
                            <option value="Conductor electrico">Conductor Eléctrico</option>
                            <option value="Conductor diesel">Conductor Diesel</option>
                            <option value="Ayudante habilitado">Ayudante Habilitado</option>
                            <option value="Ayudante conductor">Ayudante Conductor</option>
                            <option value="GuardaTren electrico">GuardaTren Eléctrico</option>
                            <option value="GuardaTren diesel">GuardaTren Diesel</option>
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
                            v-model="personal.turno"
                        />
                    </div>
                    <div class="col-2">
                        <label for="franco">Franco </label>
                        <select
                            name="franco"
                            id="franco"
                            class="form-control mb-3"
                            v-model="personal.franco"
                            required
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
                            v-model="personal.orden"
                        />
                    </div>
                </div>

                <div class="justify-content-between row" 
                    v-if="
                        personal.especialidad.includes('Conductor') || 
                        personal.especialidad.includes('Ayudante')" >
                    <h5>Conocimientos</h5>
                    <div class="col-1">
                        <label for="turno"></label>
                        CML
                        <input type="checkbox" v-model="personal.conocimientos.CML" />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        CKD
                        <input type="checkbox" v-model="personal.conocimientos.CKD" />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        RO                        
                        <input type="checkbox" v-model="personal.conocimientos.RO" />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        MPN                        
                        <input type="checkbox" v-model="personal.conocimientos.MPN" />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        OL
                        <input type="checkbox" v-model="personal.conocimientos.OL" />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        LCI
                        <input type="checkbox" v-model="personal.conocimientos.LCI" />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        ELEC
                        <input type="checkbox" v-model="personal.conocimientos.ELEC" />
                    </div>
                    <div class="col-1">
                        <label for="turno"></label>
                        DUAL
                        <input type="checkbox" v-model="personal.conocimientos.DUAL" />
                    </div>
                    
                </div>
                
                <div class="row">
                    <div class="col">
                        <label for="detalle"></label>
                        Observaciones
                        <textarea
                            class="form-control mb-3"
                            name="detalle"
                            v-model="personal.observaciones"
                        ></textarea>
                    </div>
                </div>
                <div>
                    <button class="btn btn-primary col-1 m-2">Guardar</button>
                    <button class="btn btn-secondary col-1 m-2" @click="cerrar()">Cerrar</button>
                </div>
            </form>
            
        </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getPersonal , updatePersonal } from "../../services/personalService";
import { IPersonal } from "../../interfaces/IPersonal";
import { newToken } from "../../services/signService";
import { Registro } from "../../interfaces/IRegistro";
import { createRegistro } from "../../services/registrosService";
import { AxiosError } from "axios";



export default defineComponent({
    data() {
        return {
            
            personal: {especialidad: ""} as IPersonal,
            days: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
            ],
            alerta: "" as string,
            today: new Date()
        };
    },
    methods: {
        async editPersonal() {
            try {
                if(this.alerta){
                    this.alerta =  " ATENCIÓN!!! NO ES POSIBLE ACTUALIZAR ESTA NOVEDAD!      " + this.alerta 
                    return;
                }
                await updatePersonal(
                    this.personal._id,
                    this.personal
                    );
                
                // guardamos registro
                const registro: Registro = {
                            usuario : window.localStorage.getItem("username")||'',
                            fecha : this.today.toString() ,
                            accion: "Edito",
                            personal : this.personal,
                        }
                await createRegistro(registro);

                this.$router.push({ name: "Personal" });
            } catch (error) {
                this.handleRequestError(error as AxiosError)
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
            } else {
                // Manejar otros errores de solicitud
                // Puedes mostrar un mensaje de error o tomar otras acciones según tus necesidades
            }
        },
        cerrar(){
            this.$router.push({ name: "Personal" });
        },
        /* Este método trae la lista de todos los personales */
        async loadPersonal(id:string) {
            try {
                const res = await getPersonal(id);
                this.personal = res.data;  
                
            } catch (error) {
                console.error(error);
            }
            const res = await getPersonal(id);
            this.personal = res.data;
        },
        
    },
    mounted() {
        if (typeof this.$route.params.id === "string") {
            this.loadPersonal(this.$route.params.id);
        }
        newToken();
    },
    components: {
    },
});
</script>
<style>
main {
    margin-top: 5rem;
    /* margin-left: 300px; */
}
h1{
    display: flex;
    justify-content: center;
}
form{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 300px;
    width: 75%;
}
row{
    margin-left: 200px;
}
</style>
