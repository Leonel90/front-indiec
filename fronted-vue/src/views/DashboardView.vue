<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <div id="inicio">
        <h1>Inicio</h1>
      </div>
      <div id="capa-padre">
        <div>
          <div class="chart-container">
            <div class="chart-item">
              <canvas id="barChart"></canvas>
            </div>
            <div class="chart-item larger-chart">
              <canvas id="lineChart"></canvas>
            </div>
          </div>
          <div class="cards-container">
            <div v-for="(data, index) in percentageData" :key="data.id" class="card">
              <img
                class="hero-image"
                src="https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg"
                alt="Spinning glass cube"
              />
              <div class="main-content">
                <h2 class="percentage">{{ data.percentage }}%</h2>
                <p>{{ data.name }}</p>
                <div class="rating-container">
                  <div class="coin-base">
                    <img
                      src="https://i.postimg.cc/T1F1K0bW/Ethereum.png"
                      alt="Ethereum"
                      class="small-image"
                    />
                  </div>
                  <div class="star-rating">
                    <input
                      type="radio"
                      :id="'star5-' + data.id"
                      :name="'rating-' + data.id"
                      value="5"
                      v-model="ratings[index]"
                      @change="updateCharts"
                    />
                    <label :for="'star5-' + data.id" title="5 stars">&#9733;</label>
                    <input
                      type="radio"
                      :id="'star4-' + data.id"
                      :name="'rating-' + data.id"
                      value="4"
                      v-model="ratings[index]"
                      @change="updateCharts"
                    />
                    <label :for="'star4-' + data.id" title="4 stars">&#9733;</label>
                    <input
                      type="radio"
                      :id="'star3-' + data.id"
                      :name="'rating-' + data.id"
                      value="3"
                      v-model="ratings[index]"
                      @change="updateCharts"
                    />
                    <label :for="'star3-' + data.id" title="3 stars">&#9733;</label>
                    <input
                      type="radio"
                      :id="'star2-' + data.id"
                      :name="'rating-' + data.id"
                      value="2"
                      v-model="ratings[index]"
                      @change="updateCharts"
                    />
                    <label :for="'star2-' + data.id" title="2 stars">&#9733;</label>
                    <input
                      type="radio"
                      :id="'star1-' + data.id"
                      :name="'rating-' + data.id"
                      value="1"
                      v-model="ratings[index]"
                      @change="updateCharts"
                    />
                    <label :for="'star1-' + data.id" title="1 star">&#9733;</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "Dashboard",
  components: {
    ProtectedNavbar,
  },
  setup() {
    const percentageData = ref([
      { id: 1, name: "Cantante 1", percentage: 10 },
      { id: 2, name: "Cantante 2", percentage: 20 },
      { id: 3, name: "Cantante 3", percentage: 30 },
      { id: 4, name: "Cantante 4", percentage: 40 },
      { id: 5, name: "Cantante 5", percentage: 50 },
    ]);

    const ratings = ref(Array(percentageData.value.length).fill(null));

    const chartData = ref({
      labels: percentageData.value.map((data) => data.name),
      datasets: [
        {
          label: "Porcentaje",
          data: percentageData.value.map((data) => data.percentage),
          backgroundColor: ["#FF8977", "#89A2EB", "#FFCE89", "#FFCE19"],
        },
      ],
    });

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

    const barChart = ref(null);
    const lineChart = ref(null);

    const updateCharts = () => {
      const selectedRatings = ratings.value.map((rating) => rating || 0);
      chartData.value.datasets[0].data = selectedRatings;
      lineChartData.value.datasets[0].data = selectedRatings;

      const barCtx = document.getElementById("barChart")?.getContext("2d");
      if (barCtx) {
        if (barChart.value) {
          barChart.value.destroy(); // Destruye el gráfico anterior
        }
        barChart.value = new Chart(barCtx, {
          type: "bar",
          data: chartData.value,
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
      } else {
        console.error("No se pudo obtener el contexto del canvas para barChart.");
      }

      const lineCtx = document.getElementById("lineChart")?.getContext("2d");
      if (lineCtx) {
        if (lineChart.value) {
          lineChart.value.destroy(); // Destruye el gráfico anterior
        }
        lineChart.value = new Chart(lineCtx, {
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
      } else {
        console.error("No se pudo obtener el contexto del canvas para lineChart.");
      }
    };

    onMounted(() => {
      updateCharts(); // Inicializa los gráficos después de que el DOM esté listo
    });

    watch(ratings, updateCharts, { deep: true });

    return { percentageData, ratings };
  },
};
</script>

<style scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";

/* Estilos del dashboard */
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
  overflow: hidden; /* Evita el desbordamiento */
}

#app-2 {
  text-align: center;
}

.chart-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  /* Espacio entre gráficos */
}

.chart-item {
  width: 48%;
  /* Tamaño fijo para evitar movimiento */
}

.larger-chart {
  width: 48%;
}

canvas {
  width: 100% !important;
  height: auto !important;
}

.table-container {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 10px;
  width: 80%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden; /* Evita el desbordamiento */
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

/* Estilos para las cartas */
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 50px;
}

.card {
  width: 1000px;
  height: 250px;
  /* Tamaño más pequeño de las cartas */
  background-color: #00033c;
  border-radius: 15px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  overflow: hidden; /* Evita el desbordamiento */
  text-align: center; /* Centrar contenido */
}

.hero-image {
  width: 130px;
  height: 100px;
  height: auto; /* Asegura que la imagen no distorsione */
  border-radius: 100px;
  display: block;
  margin: 0 auto; /* Centrar la imagen */
}

.main-content {
  text-align: center;
  color: #ddd;
}

.percentage {
  font-size: 1.5em; /* Tamaño del porcentaje */
  margin-bottom: 0.5em; /* Añadir espacio debajo del porcentaje */
}

.rating-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  font-size: 0.95em; /* Tamaño pequeño del texto */
}

.coin-base {
  display: flex;
  justify-content: center;
  align-items: center;
}

.small-image {
  width: 1em;
  margin-right: 0.5em;
}

.star-rating {
  direction: rtl;
  display: inline-block;
  font-size: 0.95em; /* Tamaño pequeño de las estrellas */
}

.star-rating input[type="radio"] {
  display: none;
}

.star-rating label {
  font-size: 15px;
  color: #ffffff;
  cursor: pointer;
}

.star-rating label,
.star-rating label~label {
  color: #ccc; /* Color de las estrellas no seleccionadas */
}

.star-rating input[type="radio"]:checked~label {
  color: #d9ff00; /* Color de las estrellas seleccionadas */
}

#rating-message {
  margin-top: 1em;
  color: var(--var-soft-blue);
}

/* Responsive */
@media (min-width: 600px) {
  .card {
    max-width: 140px;
  }
}

@media (min-width: 768px) {
  .card {
    max-width: 160px;
  }
}

@media (min-width: 992px) {
  .card {
    max-width: 180px;
  }
}

@media (min-width: 1200px) {
  .cards-container {
    justify-content: space-around;
  }
}
</style>
