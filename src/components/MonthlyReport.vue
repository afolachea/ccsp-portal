<script lang="ts">
import Vue from 'vue';
import { Bar } from 'vue-chartjs';
import { Component } from 'vue-property-decorator';
import { mixins } from "vue-class-component";

@Component({
  extends: Bar, // this is important to add the functionality to your component
})
export default class MonthlyReport extends mixins(Bar) {

  getRandomValues(amount: number, min: number, max: number) {
    return [...Array(amount)].map(() => Math.floor(Math.random() * (max + min - 1)) + 1);
  }

  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        datasets: [
          {
            label: 'Presión Alta',
            backgroundColor: 'rgb(54, 162, 235)',
            data: this.getRandomValues(30, 0, 5),
            stack: 'Pressure',
            yAxisID: 'Users',
          },
          {
            label: 'Presión Baja',
            backgroundColor: 'rgb(75, 192, 192)',
            data: this.getRandomValues(30, 0, 5),
            stack: 'Pressure',
            yAxisID: 'Users',
          },
          {
            label: 'Sin Agua',
            backgroundColor: 'rgb(201, 203, 207)',
            data: this.getRandomValues(30, 0, 5),
            stack: 'Pressure',
            yAxisID: 'Users',
          },
          {
            label: 'Total de Registros',
            backgroundColor: 'rgb(153, 102, 255)',
            data: this.getRandomValues(30, 4, 10),
            stack: 'Entries',
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
