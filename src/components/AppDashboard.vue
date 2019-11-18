<template>
  <v-container>
    <v-btn @click="loadData()">Generate</v-btn>
    <ExportButton v-if="fullData.length" :data="fullData"/>
    <DailyPressure v-if="pressures.length" :data="pressures"/>
    <WeeklyReport/>
    <MonthlyReport/>
    <AnnualReport/>
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
import FakeData from '../mixins/FakeData';

const staticData = new FakeData();

@Component({
  components: {
    TestTable,
    ExportButton,
    DailyPressure,
    WeeklyReport,
    MonthlyReport,
    AnnualReport,
  }
})
export default class AppDashboard extends Vue {

  fullData: any[] = [];
  pressures: any[] = [];

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

    this.pressures = [
      getPressuresPerHour(1),
      getPressuresPerHour(2),
      getPressuresPerHour(3),
      getPressuresPerHour(4),
    ]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
