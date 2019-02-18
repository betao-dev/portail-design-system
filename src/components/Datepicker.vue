<!--
  Datepicker with min/max selection limit.

  Usage:

    <Datepicker
      :lang="'en-en'"  - BCP 47 localization code
      :min="minDate"   - earliest selectable day
      :max="manDate"   - upper bound for the selection
      v-model="date"   - selected date
    />

  Properties:

    lang - String. BCP 47 code. Language to be used in the datepicker
      for month names and weekday labels. Can be set globally with
      $root.locale. This property overrides global setting

    min - Date. Optional earliest selectable day

    max - Date. Optional latest selectable day

  Model:

    Selected Date is updated through v-model directive
-->

<template>
  <div class="datepicker">
    <div class="header">
      <div class="labels">
        <div
          :class="{
            'hidden': view === 'day' || view === 'month',
            'label-main': view === 'year',
          }"
          @click="view = 'month'"
        >
          {{ decade }}
        </div>
        <div
          :class="{
            'hidden': view === 'year',
            'label-sup': view === 'day',
            'label-main': view === 'month',
          }"
          @click="view = 'year'"
        >
          {{ year }}
        </div>

        <div
          :class="{
            'hidden': view === 'month' || view === 'year',
            'label-main': view === 'day',
          }"
          @click="view = 'month'"
        >
          {{ monthName }}
        </div>
      </div>
      <div class="buttons">
        <Button
          plain icon="arrow_left" @click="shift(-1)" :disabled="!canShiftBack"
        ></Button>
        <Button
          plain icon="arrow_right" @click="shift(1)" :disabled="!canShiftForward"
        ></Button>
      </div>
    </div>

    <div class="body">
      <GridSelect
        :items="{'day': days, 'month': months, 'year': years}[view]"
        :labels-top="view === 'day' ? weekLabels : null"
        :value="value"
        @input="select"
        #default="{item}"
      >
        <span :class="{'grid-item-big': view !== 'day'}">{{item.title}}</span>
      </GridSelect>
    </div>
  </div>
</template>

<script>
import GridSelect from './GridSelect'
import Button from './Button'

export default {
  name: 'Datepicker',
  components: {
    GridSelect,
    Button,
  },
  props: {
    lang: String,
    max: Date,
    min: Date,
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      displayed: new Date(this.value),
      view: 'day',
    }
  },
  created () {
    this.range && this.setRange()
  },
  computed: {
    locale() {
      return this.lang || this.$root.locale || 'fr-fr'
    },
    decade() {
      let start = Math.floor(this.displayed.getFullYear() / 10) * 10
      return `${start} — ${start + 9}`
    },
    year() {
      return this.displayed.getFullYear()
    },
    month() {
      return this.displayed.getMonth()
    },
    monthName() {
      return this.displayed.toLocaleString(this.locale, {month: 'long'})
    },
    /**
     * Days for the day selection grid for the displayed month
     * @return {Array<Array<Date>>} 6 by 7 nested array
     */
    days() {
      let date = new Date(this.displayed)
      date.setDate(1)
      date.setDate(2 - (date.getDay() || 7))  // first displayed Monday
      let days = []
      for (let i = 0; i < 6; i++) {
        let week = []
        for (let j = 0; j < 7; j++) {
          let day = new Date(date)
          day.title = day.getDate()
          day.key = day.getTime()

          if (day.getMonth() !== this.month) {
            day.class = 'other-month'
          }

          if (this.min != null) {
            day.setHours(23, 59, 59, 999)
            if (day.getTime() < this.min.getTime()) {
              day.disabled = true
            }
          }
          if (this.max != null) {
            day.setHours(0, 0, 0, 0)
            if (day.getTime() > this.max.getTime()) {
              day.disabled = true
            }
          }

          week.push(day)
          date.setDate(date.getDate() + 1)
        }
        days.push(week)
      }
      return days
    },
    /**
     * Months for the month selection grid for the displayed year
     * @return {Array<Array<Object>>} 3 by 4 nested array
     */
    months() {
      let date = new Date(this.displayed)
      date.setMonth(0)
      let months = []
      for (let i = 0; i < 4; i++) {
        let quarter = []
        for (let j = 0; j < 3; j++) {
          let month = new Date(date)
          month.title = (month.toLocaleString(this.locale, {month: 'long'}))
          month.key = month.getFullYear() + '-' + month.getMonth()

          if (this.min != null) {
            month.setMonth(month.getMonth() + 1)
            month.setDate(0)
            month.setHours(23, 59, 59, 999)
            if (month.getTime() < this.min.getTime()) {
              month.disabled = true
            }
          }
          if (this.max != null) {
            month.setDate(1)
            month.setHours(0, 0, 0, 0)
            if (month.getTime() > this.max.getTime()) {
              month.disabled = true
            }
          }

          quarter.push(month)
          date.setMonth(date.getMonth() + 1)
        }
        months.push(quarter)
      }
      return months
    },
    /**
     * Years for the year selection grid for the displayed decade
     * @return {Array<Array<Object>>} 3 by 4 nested array
     */
    years() {
      let date = new Date(this.displayed)
      date.setFullYear(Math.floor(date.getFullYear() / 10) * 10)
      let years = []
      for (let i = 0; i < 4; i++) {
        let row = []
        for (let j = 0; j < 3; j++) {
          let year = new Date(date)
          year.key = year.title = year.getFullYear()

          if (this.min != null) {
            year.setMonth(12)
            year.setDate(0)
            year.setHours(23, 59, 59, 999)
            if (year.getTime() < this.min.getTime()) {
              year.disabled = true
            }
          }
          if (this.max != null) {
            year.setMonth(0)
            year.setDate(1)
            year.setHours(0, 0, 0, 0)
            if (year.getTime() > this.max.getTime()) {
              year.disabled = true
            }
          }

          row.push(year)
          date.setFullYear(date.getFullYear() + 1)
        }
        years.push(row)
      }
      years[3] = [
        {title: '', disabled: true, key: -Infinity},
        years[3][0],
        {title: '', disabled: true, key: Infinity},
      ]
      return years
    },
    weekLabels() {
      let labels = []
      let date = new Date()
      date.setDate(date.getDate() - date.getDay() + 1)  // set date to Monday
      for (let i = 1; i < 8; i++) {
        labels.push(date.toLocaleString(this.locale, {weekday: 'long'})[0])
        date.setDate(date.getDate() + 1)
      }
      return labels
    },
    /**
     * Maximum and minimum date value for the current view
     * @return {[type]} [description]
     */
    bounds() {
      let min = new Date(this.displayed)
      let max = new Date(this.displayed)

      if (this.view === 'year') {
        min.setFullYear(this.years[0][0].getFullYear())
        max.setFullYear(this.years[3][1].getFullYear())
      }

      if (this.view !== 'day') {
        min.setMonth(0)
        max.setMonth(11)
      }

      min.setDate(1)
      min.setHours(0, 0, 0, 0)

      max.setMonth(max.getMonth() + 1)
      max.setDate(0)
      max.setHours(23, 59, 59, 999)

      return {min, max}
    },
    canShiftForward() {
      if (this.max == null) {
        return true
      }
      return this.bounds.max.getTime() < this.max.getTime()
    },
    canShiftBack() {
      if (this.min == null) {
        return true
      }
      return this.bounds.min.getTime() > this.min.getTime()
    },
  },
  methods: {
    select(item) {
      this.displayed = item
      if (this.view === 'year') {
        this.view = 'month'
      }
      else if (this.view === 'month') {
        this.view = 'day'
      }
      else if (this.view === 'day') {
        this.$emit('input', item)
      }
    },
    shift(delta) {
      if (this.view === 'day') {
        this.displayed.setMonth(this.month + delta)
      }
      else if (this.view === 'month') {
        this.displayed.setFullYear(this.year + delta)
      }
      else if (this.view === 'year') {
        this.displayed.setFullYear(this.year + delta * 10)
      }
      this.displayed = new Date(this.displayed)
    },
  }
}
</script>

<style lang="less">
@import '../styles/vars';

.datepicker {
  background-color: @color-white;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  height: 336px;
  padding: 20px 13.5px;
  width: 336px;
  display: flex;
  flex-direction: column;

  .header {
    padding: 0 10.5px;
    height: 64px;
    display: flex;

    .labels {
      flex: 1 0 auto;
      position: relative;

      * {
        transition: all .1s ease;
      }

      .hidden {
        display: none;
      }

      .label-sup {
        .font-desktop-small-regular-gray();
        position: absolute;
        top: 0px;
        cursor: pointer;
      }

      .label-main {
        .font-desktop-body-medium-dark();
        text-transform: capitalize;
        position: absolute;
        top: 20px;
        cursor: pointer;
      }
    }

    // Buttons as designed:
    .buttons {
      padding-top: 18px;
      button {
        height: 24px;
        width: 24px;
        box-sizing: border-box;
        padding: 0;
        margin-left: 8px;
        border: 1px solid #E1E2E6;
        background-color: #F2F4F7;
        border-radius: 0;

        .icon {
          margin: 0;
        }

        &:disabled {
          opacity: 0.5;
          .icon {
            fill: @color-dark;
          }
        }
      }
    }

    // // Proposal:
    // .buttons {
    //   button {
    //     height: 44px;
    //     width: 44px;
    //     margin-left: 8px;
    //     .icon {
    //       margin-left: -6px;
    //     }

    //     &:disabled {
    //       background: @color-white;
    //     }
    //   }
    // }
  }

  .body {
    height: 232px;
    width: 308px;

    .grid-select .item-cell .item.other-month {
      color: @color-gray-400;
    }
    .grid-select .item-cell.selected .item.other-month {
      color: @color-white;
      background-color: fade(@color-primary, 50%);
    }

    .item-cell .grid-item-big {
      .font-desktop-body-medium-dark();
      text-transform: capitalize;
      padding: 4px;
    }
    .item-cell.disabled .grid-item-big {
      color: @color-gray-400;
    }
    .item-cell.selected .grid-item-big {
      color: @color-white;
    }
  }
}
</style>
