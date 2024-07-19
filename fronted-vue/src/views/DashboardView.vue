<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <h1>inicio dahsboard</h1>

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

    <ejs-calendar :value="dateValue" min="minDate" :is-multi-selection="isMultiSelection">
    </ejs-calendar>

    <div id="app">
      <ejs-chart>
        <e-series-collection>
          <e-series type="Column">

          </e-series>
        </e-series-collection>
      </ejs-chart>
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
    'ejs-calendar': CalendarComponent
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
        { month: 'Enero', salesValue: 35 }, { month: 'Enero', salesValue: 35 },
        { month: 'Enero', salesValue: 35 }, { month: 'Enero', salesValue: 35 },
        { month: 'Enero', salesValue: 35 }, { month: 'Enero', salesValue: 35 },
        { month: 'Enero', salesValue: 35 }, { month: 'Enero', salesValue: 35 },
        { month: 'Enero', salesValue: 35 }, { month: 'Enero', salesValue: 35 },
        { month: 'Enero', salesValue: 35 }, { month: 'Enero', salesValue: 35 },
      ]
    }
  },
  provide: {
    chart: [ColumnSeries, Category]
  }
}

</script>

<style>
/*estilos del dasboard*/
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules//@syncfusion//ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";

.wrapper {
  max-width: 250px;
  margin: 0 auto;
}
</style>
