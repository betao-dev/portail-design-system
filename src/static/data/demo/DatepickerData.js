let usage = `
<Datepicker
  :min="new Date('2002-02-10')"
  :max="new Date('2018-12-21')"
  :dateUnset.sync="dateUnset"
  v-model="dateSelected">
</Datepicker>

<Datepicker
  v-model="dateSelected2"
  :secondDate.sync="secondDate"
  :dateUnset.sync="dateUnsetRange"
  rangeAvailable
  :alternatingDateName.sync="alternatingDateName"
></Datepicker>
`.slice(1);

export default {
  usage
};
