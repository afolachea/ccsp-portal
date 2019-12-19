<template>
  <JsonExcel
    class   = "excel-export"
    :data   = "data"
    :fields = "json_fields"
    worksheet = "Continuidad y Calidad del Agua"
    name    = "ccsp_report.xls">

    <v-btn color="primary"> Descargar Excel </v-btn>

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
      'Continuidad': {
        field: 'pressure',
        callback: (value: number) => value ? 'Con Agua' : 'Sin Agua',
      },
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
      'Calidad': {
        field: 'qualities',
        callback: (value: number) => {
          return Object.entries(value).filter(x => x[1]).map(x => {
            switch (x[0]) {
              case 'transparent': return 'Transparente';
              case 'cloudy': return 'Turbia';
              case 'mud': return 'Lodo';
              case 'chlorine_smell': return 'Olor a Cloro';
              case 'air': return 'Aire';
              case 'salty': return 'Salada';
              case 'other': return 'Otro';
              default: return '';
            }
          }).join(', ');
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
  .excel-export {
    display: inline-block;
    margin: 0 1em;
  }
</style>
