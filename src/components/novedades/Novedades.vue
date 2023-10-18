<template>
    <div>
        <NavBar />

        <main class="container">
            <h1 class="d-flex justify-content-center m-3">
                Novedades del Personal de Abordo
            </h1>
            <div class="d-flex">
                <a class="btn btn-primary d-flex end" href="/newNovedades"
                    >Nueva Novedad</a
                >
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="col-1" colspan="1">Num</th>
                        <th class="col-1" colspan="1">Legajo</th>
                        <th class="col-1" colspan="1">Apellido</th>
                        <th class="col-1" colspan="1">Nombres</th>
                        <th class="col-1" colspan="1">Base</th>
                        <th class="col-1" colspan="1">Novedad</th>
                        <th class="col-1" colspan="1">Fecha de Baja</th>
                        <th class="col-1" colspan="1">Fecha de Alta</th>
                        <th class="col-1">Ver</th>
                    </tr>
                </thead>
                <tbody
                v-for="(novedad, index) in novedades"
                        :key="index"
                        @dblclick="edit(novedad._id)"
                        @click="viewDetail(novedad)"
                >
                    <tr >
                        <td class="col-1">{{ novedad._id }}</td>
                        <td class="col-1">{{ novedad.legajo }}</td>
                        <td class="col-1">{{ novedad.apellido }}</td>
                        <td class="col-1">{{ novedad.nombres }}</td>
                        <td class="col-1">{{ novedad.base }}</td>
                        <td class="col-1">{{ novedad.tipoNovedad }}</td>
                        <td class="col-1">{{ new Date(novedad.fechaBaja + " 12:00").toLocaleDateString() }}</td>
                        <td class="col-1">{{ !novedad.HNA   ? new Date(novedad.fechaAlta + " 12:00").toLocaleDateString() : "" }}</td>
                        <td class="col-1">
                            <i
                                class="fa-solid fa-pen-to-square"
                                @click="edit(novedad._id)"
                            ></i>
                        </td>
                    </tr>
                    <tr v-if="novedad.viewDetail">
                        <td colspan="12">
                            <div class="row" v-if="novedad.remplazo[0]"> 
                                <h6 class="col-1">Releva:</h6> 
                                <p class="col-3">
                                    {{ novedad.remplazo[novedad.remplazo.length -1].apellido +" "+
                                    novedad.remplazo[novedad.remplazo.length -1].nombres  }}
                                </p>
                                <h6 class="col-1">Desde:</h6>
                                <p class="col-1">
                                    {{ novedad.remplazo[novedad.remplazo.length -1].inicioRelevo }}
                                </p>
                                <h6 class="col-1">Hasta:</h6>
                                <p class="col-1">
                                    {{ novedad.remplazo[novedad.remplazo.length -1].finRelevo }}
                                </p>
                                
                            </div>
                            <div v-else>
                                <h6>Sin Relevo</h6>
                            </div>
                            <div v-if="novedad.detalle">
                                <h6>Detalle:</h6>
                                <p>{{ novedad.detalle }}</p>
                            </div>
                            
                        </td>
                        
                    </tr>
                    
                </tbody>
            </table>
        </main>

        <footer-page />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../NavBar.vue";
import FooterPage from "../FooterPage.vue";
import { Novedad } from "../../interfaces/INovedades";
import { getNovedades } from "../../services/novedadesService";

export default defineComponent({
    
    data() {
        return {
            novedades: [] as Novedad[],
        };
    },
    methods: {
        async loadNovedades() {
            const res = await getNovedades();
            this.novedades = res.data;
            
        },
        edit(id:number){
            this.$router.push( `/editNovedades/${id}`)
        },
        viewDetail(novedad : Novedad){
            if(novedad.viewDetail){
                novedad.viewDetail = false;
            }else{
                novedad.viewDetail = true;
            }
        }
    },
    mounted() {
        this.loadNovedades();
        
    },
    name: "App",
    components: {
        NavBar,
        FooterPage,
    },
});
</script>
<style>
main {
    min-height: 81.6vh;
}

.hidden-row {
    display: none;
}

</style>
