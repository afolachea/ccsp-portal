<template>
  <JsonExcel
    class   = "btn btn-default"
    :data   = "data"
    :fields = "json_fields"
    worksheet = "My Worksheet"
    name    = "ccsp_report.xls">

    <v-btn color="primary"> Download Excel </v-btn>

  </JsonExcel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import JsonExcel from 'vue-json-excel/JsonExcel.vue';
import FakeData from '../mixins/FakeData';

@Component({
  components: {
    JsonExcel,
  }
})
export default class ExportButton extends Vue {
  @Prop() private data!: any[];

  json_fields = {
      'Año': 'datetime.year',
      'Mes': 'datetime.month',
      'Día': 'datetime.day',
      'Hora': 'datetime.hour',
      'Presión': {
        field: 'pressure',
        callback: (value: number) => {
          switch (value) {
            case 0: return 'Sin Agua';
            case 1: return 'Baja';
            case 2: return 'Media';
            case 3: return 'Alta';
            default: return '';
          }
        }
      },
      'Usuario': 'user.id',
  };
  json_meta = [
      [
          {
              'key': 'charset',
              'value': 'utf-8'
          }
      ]
  ];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
