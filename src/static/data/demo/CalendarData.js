let usage = `
<Calendar
  sm
  label="Date input"
  v-model="dateValue"
/>

<Calendar
  sm
  label="Min and max dates"
  placeholder="Date"
  :minDate="new Date('2019-02-16')"
  :maxDate="new Date('2019-02-25')"
  v-model="dateValue2"
/>

<Calendar
  sm
  label="N days min/max range"
  :borderColorDesktop="borderColor"
  placeholder="Date"
  :dateRange="{min: 5, max: 10}"
  v-model="dateValue3"
/>

<Calendar
  sm
  label="Modal"
  position="modal"
  placeholder="Date"
  v-model="dateValue4"
/>

<Calendar
  sm
  label="Changeable datepicker"
  position="default modal"
  :backgroundColor="backgroundColor"
  :backdropOpacity="backdropOpacity"
  :wrapperStyleObject="wrapperStyleObject"
  :fullWidth="fullWidth"
  :borderColorDesktop="borderColor"
  positionChangeable
  placeholder="Date"
  v-model="dateValue5"
/>

<Calendar
  md
  label="Changeable Range datepicker"
  position="default modal"
  :backgroundColor="backgroundColor"
  :backdropOpacity="backdropOpacity"
  :wrapperStyleObject="wrapperStyleObject"
  :fullWidth="fullWidth"
  :borderColorDesktop="borderColor"
  positionChangeable
  placeholder="Date"
  v-model="dateValue6"
  :secondDate.sync="dateValue7"
  rangeAvailable
/>

<Calendar
  md
  label="Changeable Range datepicker with select list"
  position="default modal"
  :backgroundColor="backgroundColor"
  :backdropOpacity="backdropOpacity"
  :wrapperStyleObject="wrapperStyleObject"
  :fullWidth="fullWidth"
  :borderColorDesktop="borderColor"
  positionChangeable
  placeholder="Date"
  v-model="dateValue8"
  :secondDate.sync="dateValue9"
  rangeAvailable
  selectDayList
  shortMonthFormat
/>
`.slice(1);

export default {
  usage
};
