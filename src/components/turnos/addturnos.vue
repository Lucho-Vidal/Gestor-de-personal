<template>
  <div id="sb-nav-fixed">
      <NavBar @update:isAsideBarVisible="handleAsideBarVisibility" />
      <asideBar v-if="isAsideBarVisible"/>
      <div
          id="layoutSidenav_content"
          class="body"
          :class="[
              isAsideBarVisible
                  ? 'layoutSidenav_content-width-max'
                  : 'layoutSidenav_content-width-min',
          ]"
      >
          <main>
            <div class="container-fluid px-4" v-if="Filtradas.length == 0">
              <div class="d-flex justify-content-center m-3">
                <h2>Cargar nuevos turnos o circulares</h2>
              </div>
              <div class="d-flex justify-content-center">
                <label for="nuevosTurnos" class="custom-file-upload">
                  Seleccionar archivo
                </label>
                <input type="file" name="nuevosTurnos" id="nuevosTurnos" @change="handleFileChange" accept=".xlsx,.xls">
              </div>
              <div class="d-flex flex-wrap my-3" v-if="sheetNames.length != 0">
                <h6>Selecciona las hojas a cargar:</h6>
                <div
                    v-for="(sheetName, index) in sheetNames"
                    :key="index"
                >
                    <label class="form-check-label mx-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            :value="sheetName"
                            v-model="sheetNamesSeleccionado"
                        />
                        {{ sheetName }}
                        <!-- Mostrar el valor de la variable circular en el label -->
                    </label>
                </div>
              </div>
              <div  class="d-flex justify-content-center" v-if="sheetNamesSeleccionado.length != 0">
                <button @click="ConvertirJson()">
                  Convertir
                </button>
              </div>

            </div>

              <div class="container-fluid px-4" v-if="Filtradas.length > 0">
                  <h2 class="d-flex justify-content-center m-3">
                      Cargar turnos 
                  </h2>
                  <div class="d-flex">
                      <router-link
                          class="btn btn-primary d-flex end"
                          to="/newTurno"
                          >Cargar</router-link
                      >
                  </div>

                  <div class="my-3 row">
                      <input
                          class="col-3 gap col"
                          type="text"
                          placeholder="Buscar por turno"
                          autofocus
                          v-on:keyup="filtrar"
                          v-model="search"
                      />
                      <label class="form-check-label mx-2 col-1">
                          <input
                              class="form-check-input"
                              type="checkbox"
                              :value="'H'"
                              v-model="itSeleccionado"
                              v-on:change="filtrar()"
                          />
                          Hábil
                      </label>
                      <label class="form-check-label mx-2 col-1">
                          <input
                              class="form-check-input"
                              type="checkbox"
                              :value="'S'"
                              v-model="itSeleccionado"
                              v-on:change="filtrar()"
                          />
                          Sábado
                      </label>
                      <label class="form-check-label mx-2 col-2">
                          <input
                              class="form-check-input"
                              type="checkbox"
                              :value="'D'"
                              v-model="itSeleccionado"
                              v-on:change="filtrar()"
                          />
                          Domingo
                      </label>
                  </div>

                  <h3 v-if="Filtradas.length == 0">
                      No se encontró ningún turno con los requerimientos
                      especificados.
                  </h3>

                  <table
                      v-if="Filtradas.length > 0"
                      class="table table-striped table-hover"
                  >
                      <thead>
                          <tr>
                              <th class="col-1" colspan="1">Turno</th>
                              <th class="col-1" colspan="1">Itinerario</th>
                              <th class="col-1" colspan="1">Circular</th>
                              <th class="col-1" colspan="1"></th>
                              <th class="col-1" colspan="1">Toma</th>
                              <th class="col-1" colspan="1">Deja</th>
                              <th class="col-1">Borrar</th>
                          </tr>
                      </thead>
                      <tbody
                          v-for="(turno, index) in Filtradas"
                          :key="index"
                          @dblclick="edit(turno._id)"
                          @click="viewDetail(turno)"
                      >
                          <tr class="Small shadow">
                              <td class="col-1">{{ turno.turno }}</td>
                              <td class="col-1">{{ turno.itinerario }}</td>
                              <td class="col-1">{{ turno.circular }}</td>
                              <td class="col-1">{{ turno.personal }}</td>
                              <td class="col-1">{{ turno.toma }}</td>
                              <td class="col-1">{{ turno.deja }}</td>
                              
                              <td class="col-1">
                                  <i
                                      class="material-icons cursor-hand rojo"
                                      @click="deleteTurno( index)"
                                      >delete_forever</i
                                  >
                              </td>
                          </tr>
                          <th
                              class="col-1"
                              colspan="1"
                              v-if="turno.viewDetail"
                          >
                              Vuelta
                          </th>
                          <th
                              class="col-1"
                              colspan="1"
                              v-if="turno.viewDetail"
                          >
                              Referencia
                          </th>
                          <th
                              class="col-1"
                              colspan="1"
                              v-if="turno.viewDetail"
                          >
                              Tren
                          </th>
                          <th
                              class="col-1"
                              colspan="1"
                              v-if="turno.viewDetail"
                          >
                              Origen
                          </th>
                          <th
                              class="col-1"
                              colspan="1"
                              v-if="turno.viewDetail"
                          >
                              Sale
                          </th>
                          <th
                              class="col-1"
                              colspan="1"
                              v-if="turno.viewDetail"
                          >
                              Destino
                          </th>
                          <th
                              class="col-1"
                              colspan="1"
                              v-if="turno.viewDetail"
                          >
                              Llega
                          </th>
                          <th
                              class="col-1"
                              colspan="1"
                              v-if="turno.viewDetail"
                          >
                              Observaciones
                          </th>
                          <tr
                              style="margin-bottom: 10px"
                              v-for="(vuelta, index) in turno.vueltas"
                              :key="index"
                          >
                              <td colspan="1" v-if="turno.viewDetail">
                                  {{ vuelta.vuelta }}
                              </td>
                              <td colspan="1" v-if="turno.viewDetail">
                                  {{ vuelta.refer }}
                              </td>
                              <td colspan="1" v-if="turno.viewDetail">
                                  {{ vuelta.tren }}
                              </td>
                              <td colspan="1" v-if="turno.viewDetail">
                                  {{ vuelta.origen }}
                              </td>
                              <td colspan="1" v-if="turno.viewDetail">
                                  {{ vuelta.sale }}
                              </td>
                              <td colspan="1" v-if="turno.viewDetail">
                                  {{ vuelta.destino }}
                              </td>
                              <td colspan="1" v-if="turno.viewDetail">
                                  {{ vuelta.llega }}
                              </td>
                              <td colspan="1" v-if="turno.viewDetail">
                                  {{ vuelta.observaciones }}
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </main>
          <FooterPage />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref  } from "vue";
import NavBar from "../NavBar.vue";
import asideBar from "../asideBar.vue";
import FooterPage from "../FooterPage.vue";
import { ITurno } from "../../interfaces/ITurno";
import * as XLSX from 'xlsx';
import { newToken } from "../../services/signService";
import { AxiosError } from "axios";

export default defineComponent({
  data() {
      return {
          search: "",
          turnos: [] as ITurno[],

          Filtradas: [] as ITurno[],
          username: "" as string,
          itSeleccionado: ["H", "S", "D"] as string[],
          today: new Date(),
          workbook: null as XLSX.WorkBook | null,
          sheetNames: [] as string[],
          sheetNamesSeleccionado: [] as string[],

      };
  },
  setup() {
      const isAsideBarVisible = ref(false); // Estado inicial visible
      function toggleAsideBar() {
          isAsideBarVisible.value = !isAsideBarVisible.value; // Cambia el estado de isAsideBarVisible
      }

      return {isAsideBarVisible,toggleAsideBar};
  },
  methods: {
    async handleFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];

        const arrayBuffer = await file.arrayBuffer();
        this.workbook = XLSX.read(arrayBuffer, { type: 'array' });
        console.log(this.workbook);
        
        // Obtener nombres de las hojas
        this.sheetNames = this.workbook.SheetNames;
      }
    },
    ConvertirJson(){
      this.sheetNamesSeleccionado.forEach(sheetName =>{
        const sheet = this.workbook!.Sheets[sheetName]
        const rangeRef = sheet['!ref'];
        if (rangeRef) {
          const range = XLSX.utils.decode_range(rangeRef);
          console.log(range.e.r - range.s.r + 1);//824
          console.log(range.e.c - range.s.c + 1);//9

        }
        
        // console.log(sheet);

        // console.log(this.workbook?.Sheets[sheet]['A1']['v']);
        // console.log(this.workbook?.Sheets[sheet]);
        
      })
    },
      // async loadTurnos() {
      //     try {
      //         const res = await getTurnos();
      //         this.turnos = res.data;
      //         this.filtrar();
      //     } catch (error) {
      //         this.handleRequestError(error as AxiosError);
      //     }
      // },
      async deleteTurno( index: number) {
          try {
              const confirmacion = window.confirm(
                  "¿Estás seguro de que deseas eliminar este turno?"
              );
              if (confirmacion) {
                  // await deleteTurno(id);

                  // guardamos registro
                  // const registro: Registro = {
                  //     usuario: window.localStorage.getItem("username") || "",
                  //     fecha: this.today.toString(),
                  //     accion: "Elimino",
                  //     turno: this.turnos[index],
                  // };
                  // await createRegistro(registro);

                  this.Filtradas.splice(index, 1);
              }
          } catch (error) {
              this.handleRequestError(error as AxiosError);
          }
      },
      handleAsideBarVisibility(isVisible: boolean) {
          this.isAsideBarVisible = isVisible;
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
      // edit(id: string) {
      //     this.$router.push(`/editTurno/${id}`);
      // },
      viewDetail(turno: ITurno) {
          if (turno.viewDetail) {
              turno.viewDetail = false;
          } else {
              turno.viewDetail = true;
          }
      },

      filtrar() {
          this.Filtradas = this.turnos.filter((t) => {
              return (
                  t.turno
                      .toLocaleLowerCase()
                      .includes(this.search.toLowerCase()) &&
                  this.itSeleccionado.includes(t.itinerario)
              );
          });
      },
  },
  created() {
      // this.loadTurnos();
      newToken();
      this.username = localStorage.getItem("username") || "";
  },
  name: "App",
  components: {
      NavBar,
      asideBar,
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
.cursor-hand {
  cursor: pointer;
}
.verde {
  color: #0f0;
}
.rojo {
  color: #f00;
}
.gris {
  color: #aaa;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }

  /* Ocultar el input file real */
  input[type="file"] {
    display: none;
  }

</style>

  