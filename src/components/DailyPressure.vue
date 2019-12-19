<script lang="ts">
import Vue from 'vue';
import { Line } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from "vue-class-component";

const colors = [
  'hsla(45, 100%, 70%, 0.5)',
  'hsla(135, 100%, 70%, 0.5)',
  'hsla(225, 100%, 70%, 0.5)',
  'hsla(315, 100%, 70%, 0.5)',
]

@Component({
  extends: Line, // this is important to add the functionality to your component
})
export default class DailyPressure extends mixins(Line) {
  @Prop() private data!: any[];

  mounted () {
    const hours = [...Array(24)].map(x => null);
    const hoursLabels = hours.map((x, i) => `${i}`.padStart(2, '0') + ':00');
    const average = (arr: number[]) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

    const datasets = this.data.map((x, i) => {
      const pointRadius = hours.map((h, j) => x[j] ? x[j].length*5 : 0);
      
      return {
        cubicInterpolationMode: 'monotone' as 'monotone',
        spanGaps: true,
        label: 'Presión del día ' + (i + 1),
        data: hours.map((h, j) => x[j] ? average(x[j]) : null),
        pointRadius,
        pointHoverRadius: pointRadius,
        backgroundColor: colors[i],
        borderColor: colors[i],
        fill: false,
      }
    });
    
    const getValueLabel = (value: number) => {
      switch (value) {
        case 3: return 'Alta'
        case 2: return 'Media'
        case 1: return 'Baja'
        case 0: return 'Sin Agua'
        default: return ''
      }
    }

    // Overwriting base render method with actual data.
    this.renderChart({
      labels: hoursLabels,
      datasets,
    },
    {
      scales: {
        yAxes: [{
          ticks: {
            maxTicksLimit: 6,
            suggestedMax: 4,
            suggestedMin: -1,
            callback: (value, index, values) => getValueLabel(value),
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            if (!data.datasets) return '';
            // console.log(tooltipItem);
            try {
              // @ts-ignore: Object is possibly 'undefined'.
              return (data.datasets[tooltipItem.datasetIndex].pointRadius[tooltipItem.index] / 5) + ' ' + getValueLabel(tooltipItem.yLabel);
            } catch (error) {
              return '';
            }
          }
        }
      },
      maintainAspectRatio: false,
    })
  }
}
</script>

<style lang="scss" scoped>
  canvas {
    max-width: 1000px;
    max-height: 400px;
  }
</style>