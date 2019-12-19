<script lang="ts">
import Vue from 'vue';
import { Line } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from "vue-class-component";
import { ChartDataSets } from 'chart.js';
import moment from 'moment'

const colors = [
  'hsla(0, 100%, 50%, 0.5)',
  'hsla(45, 100%, 50%, 0.5)',
  'hsla(90, 100%, 50%, 0.5)',
  'hsla(135, 100%, 50%, 0.5)',
  'hsla(180, 100%, 50%, 0.5)',
  'hsla(225, 100%, 50%, 0.5)',
  'hsla(270, 100%, 50%, 0.5)',
  'hsla(315, 100%, 50%, 0.5)',
]

@Component({
  extends: Line, // this is important to add the functionality to your component
})
export default class QualityReport extends mixins(Line) {
  @Prop() private data!: any[];
  @Prop() private minDate!: string;
  @Prop() private maxDate!: string;

  mounted () {

    const getQualityLabel = (value: number) => {
      switch (value) {
        case 1: return 'Transparente';
        case 2: return 'Turbia';
        case 3: return 'Lodo';
        case 4: return 'Olor a Cloro';
        case 5: return 'Aire';
        case 6: return 'Salada';
        case 7: return 'Otro';
        default: return ''
      }
    }

    const datasets = this.data.map((x, i) => {
      return {
        // cubicInterpolationMode: 'monotone' as 'monotone',
        lineTension: 0,
        // steppedLine: 'middle',
        // spanGaps: true,
        label: i ? getQualityLabel(i) : 'Continuidad',
        data: x,
        borderColor: colors[i],
        pointRadius: 0,
        borderWidth: 2,
        fill: false,
        yAxisID: i ? 'Calidad' : 'Continuidad',
      } as ChartDataSets
    });
    
    const getContinuityLabel = (value: number) => {
      switch (value) {
        case 1: return 'Con Agua'
        case 0: return 'Sin Agua'
        default: return ''
      }
    }

    // Overwriting base render method with actual data.
    this.renderChart(
      {
        datasets,
      },
      {
        animation: {
          duration: 0,
        },
        scales: {
          yAxes: [{
            id: 'Continuidad',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Continuidad',
            },
            ticks: {
              maxTicksLimit: 4,
              suggestedMax: 2,
              suggestedMin: -1,
              callback: (value, index, values) => getContinuityLabel(value),
            }
          },
          {
            id: 'Calidad',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: 'Calidad',
            },
            ticks: {
              maxTicksLimit: 40,
              suggestedMax: 20,
              suggestedMin: -10,
              callback: (value, index, values) => {
                switch (value) {
                  case 14: return 'Característica Presente'
                  case -4: return 'Característica Ausente'
                  default: return ''
                }
              },
            }
          }],
          xAxes: [{
            type: 'time',
            ticks: {
              min: this.minDate ? moment(this.minDate).valueOf() : moment('20190115').valueOf(),
              max: this.maxDate ? moment(this.maxDate).valueOf() : moment('20190130').valueOf(),
            }
          }],
        },
        // tooltips: {
        //   callbacks: {
        //     label: (tooltipItem, data) => {
        //       if (!data.datasets) return '';
              
        //       // console.log(tooltipItem, data.datasets);
              
        //       try {
        //         // @ts-ignore: Object is possibly 'undefined'.
        //         return getQualityLabel(tooltipItem.datasetIndex);
        //       } catch (error) {
        //         return '';
        //       }
        //     }
        //   }
        // },
        maintainAspectRatio: false,
      },
    );
  }
}
</script>

<style lang="scss" scoped>
  canvas {
    max-height: 400px;
  }
</style>