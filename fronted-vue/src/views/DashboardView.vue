<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <div id="inicio">
        <h1>Inicio</h1>
      </div>

      <div id="capa-padre">
        <div>
          <div class="container izquierda">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>DNI</th>
                  <th>TELEFONO</th>
                  <th>CORREO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>3</th>
                  <td>leonel</td>
                  <td>48459</td>
                  <td>0985478652</td>
                  <td>Leo@gmail.com</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>leonel</td>
                  <td>48459</td>
                  <td>0985478652</td>
                  <td>Leo@gmail.com</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>leonel</td>
                  <td>48459</td>
                  <td>0985478652</td>
                  <td>Leo@gmail.com</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>leonel</td>
                  <td>48459</td>
                  <td>0985478652</td>
                  <td>Leo@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="app-2">
        <ejs-calendar
          :value="dateValue"
          min="minDate"
          :is-multi-selection="isMultiSelection"
        >
        </ejs-calendar>

        <ejs-chart>
          <e-series-collection>
            <e-series type="Column"> </e-series>
          </e-series-collection>
        </ejs-chart>
      </div>
    </div>
  </div>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";
import { CalendarComponent } from "@syncfusion/ej2-vue-calendars";
import { ChartPlugin, ColumnSeries, Category } from "@syncfusion/ej2-vue-charts";
import { Vue } from "vue-class-component";

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

  data() {
    return {
      salesData: [
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
        { month: "Enero", salesValue: 35 },
      ],
    };
  },
  provide: {
    chart: [ColumnSeries, Category],
  },
};
</script>

<style scoped>
/*estilos del dasboard*/
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules//@syncfusion//ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";

#inicio {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/public/img/fondo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center; /* Centra el texto dentro del div */
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
</style>
