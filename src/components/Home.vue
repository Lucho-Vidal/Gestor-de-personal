<template>
    <main>
        <div class="container-fluid px-4">
            <h1 class="d-flex justify-content-center m-3">
                Gestión de Novedades del Personal de Abordo
            </h1>
            <p class="fs-4  mt-5 mx-5">
                El Gestor de Novedades de Personal de Abordo representa un hito en la gestión integral del
                área, concebido y materializado por personal idóneo del Puesto Control Trenes de la línea
                Roca. Este sistema, guiado por los estándares del manual de procedimientos de operaciones
                (OPE.30.20.10.30), surge como una evolución significativa en el seguimiento y registro de
                novedades relacionadas con el personal de abordo. Inspirado en la visión pionera de
                herramientas como el buscador de trenes ideado anteriormente por el supervisor de personal 
                Luciano Vidal y el Sistema de Información para la Gestión del Personal de Abordo (SIPA) 
                desarrollado por el SubGerente de transporte, Ingeniero Hourcade Lucas, el Gestor de 
                Novedades de Personal de Abordo amalgama la experiencia acumulada con las necesidades 
                específicas del contexto operativo de la línea Roca.
                Es importante reconocer el valioso respaldo brindado por el Licenciado Córdoba Ricardo, cuya
                contribución fue fundamental para la realización de este proyecto.
            </p>
            <p class="fs-4  mb-5 mx-5">
                El Gestor de Novedades de Personal de Abordo se ha diseñado como una herramienta integral
                para la gestión cotidiana del personal de abordo, así como para el registro preciso de todos los
                eventos relevantes relacionados con dicho personal.
            </p>
            <div class="procesos ">
                <h2>Procesos operativos:</h2>
                <h4>30. Trasporte > 20. Personal Operativo > 10. Gestión Personal Operativo > 30. Gestión de Novedades del Personal de Abordo</h4>
                <img class="" src="../assets/GNPA diagrama procesos.JPG" alt="Flujograma">
                <ul class="mx-5">
                    <li>Operador del CCPT / CCP: Personal oficina de conducción</li>
                    <li>Coordinador de TR: Coordinador de PCT</li>
                </ul>
            </div>
            <hr>
            <div class="container">
                <h1 class="d-flex justify-content-center m-3" >Noticias</h1>
                <div v-if="rolMayor == 'admin'">
                    <h3>Nueva Noticia</h3>
                    <form @submit.prevent="guardarNovedad()">
                        <input v-model="editNovedadHome.titulo" class="form-control my-2" type="text" required placeholder="Titulo">
                        <textarea v-model="editNovedadHome.description" class="form-control my-2" name="description" id="" required placeholder="Descripción" cols="30" rows="10"></textarea>
                        <input class="form-control my-2" type="file" accept=".jpg,.jpeg,.png" @change="onFileSelected">
                        <p v-if="message">{{ message }}</p>
                        <button class="btn btn-primary my-3" type="submit">Guardar</button>
                    </form>

                </div>
                <div class="" v-for="(novedad,index) in novedadesHome" :key="index">
                    <hr>
                    <div v-if="rolMayor == 'admin'|| novedad.activo">
                        <h5>{{ novedad.titulo }}</h5>
                        <span>{{ novedad.fecha }}</span>
                        <img
                        v-if=" novedad.img"
                        :src="`http://localhost:3000/${novedad.img}`"
                        class="container-fluid"
                        alt="imagen"
                    />
                        <p>{{ novedad.description }}</p>
                        <button  v-if="rolMayor == 'admin'" class="btn btn-danger" @click="eliminarNoticia(novedad._id,index)">Eliminar</button>
                        <button  v-if="rolMayor == 'admin'" class="btn btn-success mx-3" @click="editarNoticia(novedad)">Editar</button>
                        <label v-if="rolMayor == 'admin'" class="mx-3">
                            Visible
                            <input type="checkbox" v-model="novedad.activo" name="Visible" @click="cambiarVisibilidad(index)">
                        </label>

                    </div>
                </div>
            </div>
            <div class="my-5">
                <p>
                    Esta es una aplicación que fue desarrollada por personal de
                    control trenes de la linea Roca para la gestión del personal de
                    abordo.
                    Ante cualquier inconveniente o sugerencia comuníquese con el administrador o
                    envié un mail a:
                    <a href="mailto:luciano.vidal@trenesargentinos.gob.ar"
                        >luciano.vidal@trenesargentinos.gob.ar</a
                    >
                </p>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getRoles } from "../services/signService";
import { NovedadHome } from '../interfaces/INovedadesHome';
import { createNovedadHome, deleteNovedadHome, getNovedadesHome, updateNovedadHome } from "../services/novedadesHomeService";
import { handleRequestError } from "../utils/funciones";
import { AxiosError } from "axios";
import { uploadImg } from "../services/novedadesHomeService";

export default defineComponent({
    name: "App",
    components: {
    },
    data() {
        return {
            fileEvent: null as Event | null,
            fecha: new Date(),
            roles: [] as string[],
            rolMayor: "" as string,
            novedadesHome: [] as NovedadHome[],
            editNovedadHome: {} as NovedadHome,
            selectedFile: null as File | null, // El archivo seleccionado
            message: '', // Mensaje de éxito o error
        };
    },
    methods: {
        async getNovedadesHome(){
            try{
                const res = await getNovedadesHome();
                this.novedadesHome = res.data;
            } catch (error) {
                handleRequestError(error as AxiosError);
            }
        },
        async guardarNovedad(){
            try {
                if(this.editNovedadHome._id){
                    await updateNovedadHome(this.editNovedadHome._id,this.editNovedadHome)
                }else{
                    this.editNovedadHome.fecha = this.fecha.toLocaleString()
                    this.editNovedadHome.activo = true
                    this.uploadImage()
                    // const res = await createNovedadHome(this.editNovedadHome);
                    // if (this.fileEvent) {
                    //     this.handleFileChange(this.fileEvent, res.data._id); // Pasa el evento si no es null
                    // } else {
                    //     console.error("No se ha seleccionado un archivo.");
                    // }
                }
            } catch (error) {
                handleRequestError(error as AxiosError);
            }
        },
        // Manejar la selección del archivo
        onFileSelected(event: Event) {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files.length > 0) {
                this.selectedFile = input.files[0];
            }
        },
        // Subir la imagen
        async uploadImage() {
            try {
                let noticiaId = '';
                if (this.editNovedadHome._id) {
                    // Actualiza una noticia existente
                    noticiaId = this.editNovedadHome._id;
                    await updateNovedadHome(noticiaId, this.editNovedadHome);
                } else {
                    // Crea una nueva noticia
                    const res = await createNovedadHome(this.editNovedadHome);
                    noticiaId = res.data._id;
                }
                if (!this.selectedFile) {
                    this.message = 'No se subió ninguna Imagen.';
                }else{
                    const formData = new FormData();
                    formData.append('noticiaImg', this.selectedFile);
                    
                    // Subir imagen
                    const response = await uploadImg(formData, noticiaId);
    
                    // Actualiza el campo de la imagen en la noticia
                    this.editNovedadHome.img = response.data.Img;
    
                    this.message = 'Imagen subida exitosamente.';
                    console.log('Respuesta del servidor:', response.data);
                }
                this.novedadesHome.push(this.editNovedadHome)

            } catch (error) {
                this.message = 'Error al subir la imagen.';
                console.error('Error al subir la imagen:', error);
            }
        },
        async cambiarVisibilidad(index:number){
            try {
                const res = confirm(`Desea cambiar la visibilidad de esta noticia? ${this.novedadesHome[index].titulo} `)
                if(res){
                    this.novedadesHome[index].activo = !this.novedadesHome[index].activo 
                    await updateNovedadHome(this.novedadesHome[index]._id,this.novedadesHome[index])
                }
            } catch (error) {
                console.error('Error al modificar la visibilidad de la noticia:', error);
            }
        },
        editarNoticia(novedad:NovedadHome){
            this.editNovedadHome = novedad
        },
        async eliminarNoticia(id:string,index:number){
            try {
                const res = confirm(`Esta seguro que va a eliminar esta Noticia? ${this.novedadesHome[index].titulo}`)
                if(res) {
                    await deleteNovedadHome(id);
                    this.novedadesHome.splice(index,1)
                }
            } catch (error) {
                console.error('Error al eliminar la noticia:', error);
            }
        },
        handleFile(event: Event){
            this.fileEvent = event;
        },
        async handleFileChange(event: Event, id: string) {
            if (!event?.target) return; // Verifica que el evento y el target existan
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                const formData = new FormData();
                formData.append('myFile', file);

                try {
                    const response = await uploadImg(formData, id);
                    this.editNovedadHome.img = response.data.Img; // Ajusta según el nombre del campo en la respuesta
                    await updateNovedadHome(id, this.editNovedadHome); // para guardar img
                } catch (error) {
                    console.error('Error al subir el archivo:', error);
                }
            }
        },
        getRol() {
            if (
                getRoles().length == 0 &&
                localStorage.getItem("roles") != null
            ) {
                this.roles = localStorage.getItem("roles")?.split(",") || [];
            } else {
                this.roles = getRoles();
            }
        },
        getRolMayor() {
            this.rolMayor =
                this.roles.find((rol: string) => rol == "admin") ||
                this.roles.find((rol: string) => rol == "moderator") ||
                this.roles.find((rol: string) => rol == "user") ||
                "";
        },
    },
    created() {
        this.getRol();
        this.getRolMayor();
        this.getNovedadesHome();
    },
});
</script>
<style>
main {
  margin-top: 4rem;
}
img{
    border: 2px solid #000;
    margin: 1rem;
}
.procesos {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
