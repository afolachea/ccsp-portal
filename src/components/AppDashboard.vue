<template>
  <v-container>
    <v-btn @click="loadData()">Generar Datos</v-btn>
    <ExportButton v-if="fullData.length" :data="fullData"/>
    <DailyPressure v-if="pressures.length" :data="pressures"/>
    <div v-if="qualities.length">
      <QualityReport ref="qualityReport" :data="qualities" :minDate="minDate" :maxDate="maxDate"/>
      <label for="start-date">Fecha inicio: </label>
      <input id="start-date" type="date" v-model="minDate" min="2019-01-01" max="2019-02-28" @change="dateChanged">
      <label for="end-date">Fecha final: </label>
      <input id="end-date" type="date" v-model="maxDate" min="2019-01-01" max="2019-02-28" @change="dateChanged">
    </div>
    <!-- <WeeklyReport/> -->
    <!-- <MonthlyReport/> -->
    <!-- <AnnualReport/> -->
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TestTable from './TestTable.vue';
import ExportButton from './ExportButton.vue';
import DailyPressure from './DailyPressure.vue';
import WeeklyReport from './WeeklyReport.vue';
import MonthlyReport from './MonthlyReport.vue';
import AnnualReport from './AnnualReport.vue';
import QualityReport from './QualityReport.vue';
import FakeData, { Qualities } from '../mixins/FakeData';
import moment from 'moment'

const staticData = new FakeData();

@Component({
  components: {
    TestTable,
    ExportButton,
    DailyPressure,
    WeeklyReport,
    MonthlyReport,
    AnnualReport,
    QualityReport,
  }
})
export default class AppDashboard extends Vue {

  minDate = '2019-01-01';
  maxDate = '2019-01-07';

  fullData: any[] = [];
  pressures: any[] = [];
  qualities: any[] = [];

  dateChanged() {
    // console.log(arguments, this.minDate, this.maxDate);
    // const qualityReport = this.$refs.qualityReport as QualityReport;
    // console.log(this.$refs, qualityReport);
    // console.log(qualityReport.mounted, qualityReport.$forceUpdate, qualityReport.$mount, qualityReport.renderChart);
    // qualityReport.$mount(qualityReport.$el, false);

    const qualities = this.qualities;
    this.qualities = [];
    setTimeout(() => {
      this.qualities = qualities;
    }, 10)
  }

  loadData() {
    staticData.generate();
    
    // console.log(staticData.entries);
    this.fullData = staticData.entries;

    const getPressuresPerHour = (day: number) => {
      return staticData.entries.filter(x => x.datetime.month === 1 && x.datetime.day === day)
        .reduce((p, c, a) => {
            p[c.datetime.hour] = p[c.datetime.hour] || []
            p[c.datetime.hour].push(c.pressure);
            return p;
          }, {} as any);
    } 

    const getQualitiesPerHour = (i: number, quality?: keyof Qualities) => {
      return staticData.entries.map(x => (
        {
          t: moment({
            year: x.datetime.year,
            month: x.datetime.month - 1,
            day: x.datetime.day,
            hour: x.datetime.hour,
            minutes: x.datetime.minutes,
          } as moment.MomentInputObject).toDate(),
          y: quality
            ? x.qualities[quality] ? 10 + i : 0 - i
            : x.pressure ? 1 : 0,
        }
      ));
    } 

    this.pressures = [
      getPressuresPerHour(1),
      getPressuresPerHour(2),
      getPressuresPerHour(3),
      getPressuresPerHour(4),
    ];

    this.qualities = [
      getQualitiesPerHour(0),
      getQualitiesPerHour(1, 'transparent'),
      getQualitiesPerHour(2, 'cloudy'),
      getQualitiesPerHour(3, 'mud'),
      getQualitiesPerHour(4, 'chlorine_smell'),
      getQualitiesPerHour(5, 'air'),
      getQualitiesPerHour(6, 'salty'),
      getQualitiesPerHour(7, 'other'),
    ];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
