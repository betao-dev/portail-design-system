<template>
  <div class="ds-grid grid-select-demo">
    <div class="row-col">
      <h3>Datepicker</h3>

      Datepicker with min/max selection limit. Selected Date is updated through
      v-model directive
      <Description compnent-name="Datepicker"></Description>
      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      Localization support:

      <span v-for="lang in ['fr-fr', 'en-us', 'sv-se', 'ru-ru', 'ja-ja']">
        <input type="radio" :id="lang" :value="lang" v-model="$root.locale" />
        <label :for="lang">{{ lang }}</label>
      </span>

      <div class="ds-datepicker-selected-date">
        Selected date: {{ dateSelected }}
      </div>
      <Datepicker
        :min="new Date('2002-02-10')"
        :max="new Date('2018-12-21')"
        :dateUnset.sync="dateUnset"
        v-model="dateSelected"
      ></Datepicker>

      <div class="ds-datepicker-selected-date">
        <div>Selected date: {{ dateSelected2 }}</div>
        <div v-if="secondDate">Second selected date: {{ secondDate }}</div>
      </div>
      <Datepicker
        v-model="dateSelected2"
        :secondDate.sync="secondDate"
        :dateUnset.sync="dateUnsetRange"
        rangeAvailable
      ></Datepicker>
    </div>
  </div>
</template>

<script>
import Datepicker from '../../components/Datepicker';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { DatepickerData } from '../../static/index';

export default {
  name: 'DatepickerDemo',
  components: {
    Datepicker,
    Description,
    Collapser
  },
  data() {
    return {
      dateSelected: new Date('2006-02-12'),
      dateSelected2: new Date(),
      secondDate: null,
      usage: DatepickerData.usage,
      openUsage: true,
      dateUnset: false,
      dateUnsetRange: false
    };
  }
};
</script>

<style lang="less" scoped>
.ds-datepicker-selected-date {
  margin: 20px 0 10px;
}
</style>
