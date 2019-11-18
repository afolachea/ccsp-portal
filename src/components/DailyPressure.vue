<script lang="ts">
import Vue from 'vue';
import { Line } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from "vue-class-component";

const colors = [
  'rgba(153, 102, 255, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(201, 203, 207, 0.5)',
  'rgba(255, 159, 64, 0.5)',
]

@Component({
  extends: Line, // this is important to add the functionality to your component
})
export default class DailyPressure extends mixins(Line) {
  @Prop() private data!: any[];

  mounted () {
    const hours = [...Array(24)].map(x => null);
    const average = (arr: number[]) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

    const datasets = this.data.map((x, i) => {
      return {
        spanGaps: true,
        label: 'Presión del día ' + (i + 1),
        data: hours.map((h, j) => x[j] ? average(x[j]) : null),
        pointRadius: hours.map((h, j) => x[j] ? x[j].length*5 : 0),
        backgroundColor: colors[i],
      }
    })

    // Overwriting base render method with actual data.
    this.renderChart({
      labels: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00',
      ],
      datasets,
    },
    {
      scales: {
        yAxes: [{
          ticks: {
            maxTicksLimit: 4,
            callback: (value, index, values) => {
              switch (value) {
                case 3: return 'Alta'
                case 2: return 'Media'
                case 1: return 'Baja'
                case 0: return 'Sin Agua'
                default: return 'Sin Agua'
              }
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            if (!data.datasets) return '';
            try {
              // @ts-ignore: Object is possibly 'undefined'.
              return (data.datasets[0].pointRadius[tooltipItem.index] / 5) + '';
            } catch (error) {
              return '';
            }
          }
        }
      }
    })
  }
}
</script>