<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        CCSP Portal
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
      <AppDashboard/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppDashboard from './components/AppDashboard.vue';

export default Vue.extend({
  name: 'App',

  components: {
    AppDashboard,
  },

  data: () => ({
    //
  }),
});
</script>
