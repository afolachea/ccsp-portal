<script lang="ts">
import Vue from 'vue';
import { Line } from 'vue-chartjs';
import { Component } from 'vue-property-decorator';
import { mixins } from "vue-class-component";

@Component({
  extends: Line, // this is important to add the functionality to your component
})
export default class WeeklyReport extends mixins(Line) {

  getRandomValues(amount: number, min: number, max: number) {
    return [...Array(amount)].map(() => Math.floor(Math.random() * (max - min + 1)) + min);
  }

  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: ['Domingo', 'Luner', 'Martes', 'Miércoles', 'Jueves', 'Viérnes', 'Sábado'],
        datasets: [
          {
            label: 'Presión Alta',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            data: this.getRandomValues(7, 0, 5),
            // stack: 'Pressure',
            yAxisID: 'Users',
          },
          {
            label: 'Presión Baja',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            data: this.getRandomValues(7, 0, 5),
            // stack: 'Pressure',
            yAxisID: 'Users',
          },
          {
            label: 'Sin Agua',
            backgroundColor: 'rgba(201, 203, 207, 0.5)',
            borderColor: 'rgb(201, 203, 207)',
            borderWidth: 1,
            data: this.getRandomValues(7, 0, 5),
            // stack: 'Pressure',
            yAxisID: 'Users',
          },
          {
            label: 'Usuarios Activos',
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1,
            data: this.getRandomValues(7, 0, 5),
            // stack: 'Activity',
            yAxisID: 'Users',
            // tooltip percentage
          },
          {
            label: 'Total de Registros',
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 1,
            data: this.getRandomValues(7, 4, 10),
            // stack: 'Entries',
            yAxisID: 'Entries',
          },
          {
            label: 'Promedio Registros por Usuario',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            data: this.getRandomValues(7, 1, 3),
            // stack: 'AvgEntries',
            yAxisID: 'Entries',
          },
          {
            label: 'Max Registros por Usuario',
            backgroundColor: 'rgba(255, 205, 86, 0.5)',
            borderColor: 'rgb(255, 205, 86)',
            borderWidth: 1,
            data: this.getRandomValues(7, 2, 4),
            // stack: 'MaxEntries',
            yAxisID: 'Entries',
          },
          {
            label: 'Comentarios',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            data: this.getRandomValues(7, 0, 2),
            // stack: 'Comments',
            yAxisID: 'Entries',
          },
        ],
      },
      {
        scales: {
          yAxes: [
            {
              display: true,
              // stacked: true,
							position: 'left',
              id: 'Users',
              scaleLabel: {
                display: true,
                labelString: 'Usuarios',
              },
            },
            {
              display: true,
              // stacked: true,
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
