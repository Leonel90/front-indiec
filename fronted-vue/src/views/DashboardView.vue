<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <div id="inicio">
        <h1>Inicio</h1>
      </div>

      <div id="capa-padre">
        <div>

          <!-- Gráficos -->
          <div class="chart-container">

            <!-- Barras -->
            <div class="chart-item">
              <canvas id="barChart"></canvas>
            </div>

            <!-- Líneas -->
            <div class="chart-item larger-chart">
              <canvas id="lineChart"></canvas>
            </div>
                
          </div>

          <!-- Tabla de % -->
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Calificación</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in percentageData" :key="data.id">
                  <td>{{ data.id }}</td>
                  <td>{{ data.name }}</td>
                  <td>{{ data.percentage }}%</td>
                </tr>
              </tbody>
            </table>
             
          </div>
            
        </div>

        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nro</th>
              <th>Nombre</th>
              <th>Dni / Cédula</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Sin Banderas</td>
              <td>48459</td>
              <td>0985478652</td>
              <td>sinb@gmail.com</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Carlos Vives</td>
              <td>74589</td>
              <td>0958962365</td>
              <td>Cvives@gmail.com</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Reik</td>
              <td>78549</td>
              <td>0985321456</td>
              <td>rky@gmail.com</td>
            </tr>
            <tr>
              <th>4</th>
              <td>Camilo</td>
              <td>65238</td>
              <td>0985123624</td>
              <td>Cam@gmail.com</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
    <div id="app-2">

      <div class="contenedor">
        <ejs-calendar :value="dateValue" min="minDate" :is-multi-selection="isMultiSelection">
        </ejs-calendar>
      </div>


      <ejs-chart>
        <e-series-collection>
          <e-series type="Column"> </e-series>
        </e-series-collection>
      </ejs-chart>
    </div>
  </div>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";
import { CalendarComponent } from "@syncfusion/ej2-vue-calendars";
import { Vue } from "vue-class-component";

import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
//import ProtectedNavbar from "../components/ProtectedNavbar.vue";

//Vue.use(ChartPlugin);

export default {
  name: "Dashboard",
  components: {
    ProtectedNavbar,
    "ejs-calendar": CalendarComponent,
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },

  setup() {
    const percentageData = ref([
      { id: 1, name: "Cantante 1", percentage: 15 },
      { id: 2, name: "Cantante 2", percentage: 70 },
      { id: 3, name: "Cantante 3", percentage: 45 },
      { id: 4, name: "Cantante 4", percentage: 10 },
    ]);

    const lineChartData = ref({
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
      datasets: [
        {
          label: "Calificación",
          data: [10, 20, 30, 40, 50, 60, 70],
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
      ],
    });

    onMounted(() => {
      const barCtx = document.getElementById("barChart").getContext("2d");
      new Chart(barCtx, {
        type: "bar",
        data: {
          labels: percentageData.value.map((data) => data.name),
          datasets: [
            {
              label: "Porcentaje",
              data: percentageData.value.map((data) => data.percentage),
              backgroundColor: ["#FF8977", "#89A2EB", "#FFCE89", "#FFCE19"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              barPercentage: 0.5,
              categoryPercentage: 0.5,
            },
          },
        },
      });

      const lineCtx = document.getElementById("lineChart").getContext("2d");
      new Chart(lineCtx, {
        type: "line",
        data: lineChartData.value,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    });

    return { percentageData, lineChartData };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
}
</script>

<style scoped>
/*estilos del dasboard*/
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules//@syncfusion//ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";

/*Estilos Calendar*/
.contenedor {
  height: 40vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

#inicio {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/public/img/fondo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
  /* Centra el texto dentro del div */
  padding: 5px;
  border-radius: 20px;

}

#capa-padre {
  background-color: aliceblue;
  border-radius: 20px;
  text-align: center;
  margin: 5px auto;
  padding: 10px;
  box-shadow: 5px 2px 3px 1px rgba(0, 0, 0, 0.164);
  font-size: 16px;
  color: black;
}

#app-2 {
  text-align: center;
}

.chart-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  /* Alineación de los gráficos */
}

.chart-item {
  width: 50%;
  /* Ajusta el tamaño de cada gráfico */
}

.larger-chart {
  width: 50%;
  /* Ajusta el tamaño del gráfico de líneas para que sea más grande */
}

canvas {
  width: 100% !important;
  /* Asegura que el canvas llene su contenedor */
  height: auto !important;
  /* Asegura que el canvas mantenga la proporción */
}

.table-container {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 10px;
  width: 80%;
  /* Ajusta el tamaño de la tabla */
  max-width: 800px;
  /* Ajusta el tamaño máximo de la tabla */
  margin-left: auto;
  margin-right: auto;
  /* Centra horizontalmente */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>