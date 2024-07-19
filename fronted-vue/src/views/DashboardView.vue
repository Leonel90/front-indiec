<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <h1>inicio dahsboard</h1>
    </div>
  </div>

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


export default {
  name: "Dashboard",
  components: {
    ProtectedNavbar,
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
/*estilos del dasboard*/
</style>
