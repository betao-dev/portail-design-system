<template>
  <div class="row-col calendar-demo">
    <h3>Calendar</h3>

    <p>Calendar allows managing displaying the date</p>
    <Description compnent-name="Calendar"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Calendar
      sm
      label="Date input"
      v-model="dateValue"
      :auto-initialize="false"
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
      :dateRange="{ min: 5, max: 10 }"
      :validators="calendarValidator"
      name="calendar"
      v-model="dateValue3"
      :auto-initialize="false"
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
      position="bottom-middle modal"
      :backgroundColor="backgroundColor"
      :backdropOpacity="backdropOpacity"
      :wrapperStyleObject="wrapperStyleObject"
      :fullWidth="fullWidth"
      :borderColorDesktop="borderColor"
      positionChangeable
      placeholder="Sélectionner"
      v-model="dateValue6"
      :secondDate.sync="dateValue7"
      rangeAvailable
      @maxSelectedDate="onMaxSelectedDate"
      @minSelectedDate="onMinSelectedDate"
      :auto-initialize="false"
    />

    <Calendar
      md
      label="Changeable Range datepicker with select list"
      position="bottom-middle modal"
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
      iconLeft
    />

    <Button @click="validate">Validate Third Calendar</Button>
  </div>
</template>

<script>
import Calendar from '../../components/Calendar';
import Button from '../../components/Button';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser';
import { CalendarData } from '../../static/index';

export default {
  name: 'CalendarDemo',
  components: { Button, Calendar, Description, Collapser },
  data: function() {
    return {
      openUsage: true,
      usage: CalendarData.usage,
      dateValue: new Date(),
      dateValue2: null,
      dateValue3: null,
      dateValue4: null,
      dateValue5: null,
      dateValue6: null,
      dateValue7: null,
      dateValue8: null,
      dateValue9: null,
      borderColor: '#e6e7eb',
      backgroundColor: '#fff',
      backdropOpacity: '0.8',
      wrapperStyleObject: {
        alignItems: 'flex-end'
      },
      fullWidth: true,
      maxSelectedDate: undefined,
      minSelectedDate: undefined,
      calendarValidator: [
        {
          name: 'required',
          message: this.dsTranslate('Field Required'),
          validator: value => !!value
        }
      ],
      calendarValidatorName: 'validateCalendar'
    };
  },
  methods: {
    onMaxSelectedDate(maxDate) {
      this.maxSelectedDate = maxDate;
    },
    onMinSelectedDate(minDate) {
      this.minSelectedDate = minDate;
    },
    validate() {
      const event = new CustomEvent(this.calendarValidatorName, {});
      document.dispatchEvent(event);
    }
  }
};
</script>

<style scoped lang="less">
.calendar-demo {
  .ds-calendar {
    margin-right: 32px;
    margin-bottom: 60px;
  }
}
</style>
