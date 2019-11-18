<script lang="ts">
import Vue from 'vue';
import { Bar } from 'vue-chartjs';
import { Component } from 'vue-property-decorator';
import { mixins } from "vue-class-component";

@Component({
  extends: Bar, // this is important to add the functionality to your component
})
export default class AnnualReport extends mixins(Bar) {

  getRandomValues(amount: number, min: number, max: number) {
    return [...Array(amount)].map(() => Math.floor(Math.random() * (max + min - 1)) + 1);
  }

  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: 'Presión Alta',
            backgroundColor: 'rgb(54, 162, 235)',
            data: this.getRandomValues(12, 0, 5),
            stack: 'Pressure',
            yAxisID: 'Users',
          },
          {
            label: 'Presión Baja',
            backgroundColor: 'rgb(75, 192, 192)',
            data: this.getRandomValues(12, 0, 5),
            stack: 'Pressure',
            yAxisID: 'Users',
          },
          {
            label: 'Sin Agua',
            backgroundColor: 'rgb(201, 203, 207)',
            data: this.getRandomValues(12, 0, 5),
            stack: 'Pressure',
            yAxisID: 'Users',
          },
          {
            label: 'Usuarios Activos',
            backgroundColor: 'rgb(255, 159, 64)',
            data: this.getRandomValues(12, 0, 5),
            stack: 'Activity',
            yAxisID: 'Users',
            // tooltip percentage
          },
          {
            label: 'Total de Registros',
            backgroundColor: 'rgb(153, 102, 255)',
            data: this.getRandomValues(12, 4, 10),
            stack: 'Entries',
            yAxisID: 'Entries',
          },
          {
            label: 'Promedio Registros por Usuario',
            backgroundColor: 'rgb(255, 99, 132)',
            data: this.getRandomValues(12, 1, 3),
            stack: 'AvgEntries',
            yAxisID: 'Entries',
          },
          {
            label: 'Max Registros por Usuario',
            backgroundColor: 'rgb(255, 205, 86)',
            data: this.getRandomValues(12, 2, 4),
            stack: 'MaxEntries',
            yAxisID: 'Entries',
          },
          {
            label: 'Comentarios',
            backgroundColor: 'rgb(54, 162, 235)',
            data: this.getRandomValues(12, 0, 2),
            stack: 'Comments',
            yAxisID: 'Entries',
          },
        ],
      },
      {
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [
            {
              display: true,
              stacked: true,
							position: 'left',
              id: 'Users',
              scaleLabel: {
                display: true,
                labelString: 'Usuarios',
              },
            },
            {
              display: true,
              stacked: true,
							position: 'right',
							id: 'Entries',
							gridLines: {
								drawOnChartArea: false,
							},
              scaleLabel: {
                display: true,
                labelString: 'Registros',
              },
            },
          ],
        },
        tooltips: {
          mode: 'index',
          intersect: true,
        },
      },
    );
  }
}
</script>
