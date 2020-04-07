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

-->

<template>
  <div
    :class="[
      'ds-datepicker',
      {
        'ds-full-width': fullWidth,
        'ds-datepicker-select-day-list': selectDayList && !isMobile,
        'ds-datepicker-range': !rangeAvailable
      }
    ]"
  >
    <div class="ds-datepicker-sidebar">
      <div class="ds-datepicker-sidebar-header">
        <div class="ds-datepicker-sidebar-title">
          Pick a date
        </div>
        <Icon
          class="ds-close-icon"
          times_circle
          color="gray-500"
          size="16px"
          @click="onClear()"
        >
        </Icon>
      </div>

      <div class="ds-datepicker-sidebar-content">
        <div v-if="!dateUnset">
          <div class="ds-datepicker-sidebar-week-day">
            {{ getWeekDay(minDate) }},
          </div>
          <div>
            {{ minDateHeader }}
          </div>
          <div>
            {{ minFullYear }}
          </div>
        </div>

        <div v-if="maxDateHeader">
          <div>
            -
          </div>
          <div class="ds-datepicker-sidebar-week-day">
            {{ getWeekDay(maxDate) }},
          </div>
          <div>
            {{ maxDateHeader }}
          </div>
          <div>
            {{ maxFullYear }}
          </div>
        </div>
      </div>

      <div class="ds-datepicker-sidebar-footer-wrapper" v-if="rangeAvailable">
        <div class="ds-datepicker-sidebar-footer">
          <Button
            plain-two
            class="ds-datepicker-sidebar-clear"
            @click="onClear()"
          >
            Clear
          </Button>
          <Button @click="onSave()">
            Save
          </Button>
        </div>
      </div>
    </div>
    <div class="ds-main-content">
      <div class="ds-datepicker-header-additional">
        <span class="ds-additional-title">
          {{ additionalHeaderDate }}
        </span>
        <Icon
          class="ds-close-icon"
          times_circle
          color="gray-500"
          size="16px"
          @click="onClear()"
        >
        </Icon>
      </div>
      <div class="ds-datepicker-header">
        <div class="ds-datepicker-labels">
          <span class="ds-month" @click="onMonth()">
            {{ monthName }}
          </span>
          <span class="ds-year">
            {{ year }}
          </span>
          <Icon
            @click="onYear()"
            :source="view === 'year' ? 'angle_up_solid' : 'angle_down_solid'"
            color="gray-500"
            size="16px"
            class="ds-year-icon"
          >
          </Icon>
        </div>
        <div class="ds-buttons">
          <button @click="shift(-1)" :disabled="!canShiftBack">
            <Icon angle_left_solid color="gray-500" size="16px"></Icon>
          </button>
          <button @click="shift(1)" :disabled="!canShiftForward">
            <Icon angle_right_solid color="gray-500" size="16px"></Icon>
          </button>
        </div>
      </div>

      <div
        :class="[
          'ds-datepicker-body',
          {
            'ds-full-width': fullWidth,
            'ds-datepicker-body-select-day-list': selectDayList && !isMobile
          }
        ]"
      >
        <CalendarGridSelect
          :items="{ day: days, month: months, year: years }[view]"
          :labels-top="view === 'day' ? weekLabels : null"
          :value="value"
          :secondValue="secondDate"
          :rangeAvailable="rangeAvailable"
          :view="view"
          @input="select"
          #default="{item}"
        >
          <span :class="{ 'ds-grid-item-big': view !== 'day' }">{{
            item.title
          }}</span>
        </CalendarGridSelect>

        <div
          v-if="selectDayList && !isMobile"
          class="ds-select-day-list-wrapper"
        >
          <div class="ds-select-day-list">
            <div @click="setInitDay">Aujourd'hui</div>
            <div v-for="i in dateRangeList" @click="setDayRange(i)">
              Il y a {{ i }} jours
            </div>
          </div>
        </div>
      </div>
      <div class="ds-datepicker-footer" v-if="rangeAvailable">
        <Button plain-two class="ds-datepicker-clear" @click="onClear()">
          Clear
        </Button>
        <Button @click="onSave()">
          Save
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarGridSelect from './calendarComponents/CalendarGridSelect';
import Icon from './Icon';
import Button from './Button';

import moment from 'moment';

export default {
  name: 'Datepicker',
  components: {
    CalendarGridSelect,
    Icon,
    Button
  },
  props: {
    lang: String,
    max: Date,
    min: Date,
    value: {
      type: Date,
      default: () => new Date()
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    secondDate: null,
    rangeAvailable: Boolean,
    selectDayList: Boolean,
    isMobile: Boolean,
    dateUnset: {
      type: Boolean,
      default: false
    },
    autoInitialize: {
      type: Boolean,
      default: true
    },
    alternatingDateName: String
  },
  data() {
    return {
      displayed: new Date(this.value),
      view: 'day',
      ie:
        window.navigator.userAgent.indexOf('MSIE ') > 0 ||
        !!navigator.userAgent.match(/Trident.*rv:11\./),
      dateRangeList: [15, 30, 40, 60, 90],
      defaultDay: true,
      autoInitializeInit: false
    };
  },
  computed: {
    additionalHeaderDate() {
      if (this.dateUnset) {
        return `Pick a date`;
      } else if (this.secondDate) {
        return `${this.minDateHeader} ${this.minFullYear} - ${this.maxDateHeader} ${this.maxFullYear}`;
      } else {
        return `${this.minDateHeader}`;
      }
    },
    minFullYear() {
      return this.minMaxFullYear('min') || '';
    },
    maxFullYear() {
      return this.minMaxFullYear('max') || '';
    },
    locale() {
      return this.lang || this.$root.locale || 'fr-fr';
    },
    year() {
      return this.displayed.getFullYear();
    },
    month() {
      return this.displayed.getMonth();
    },
    monthName() {
      return this.capitalize(
        this.displayed.toLocaleString(this.locale, { month: 'long' })
      );
    },
    /**
     * Days for the day selection grid for the displayed month
     * @return {Array<Array<Date>>} 6 by 7 nested array
     */
    days() {
      let date = new Date(this.displayed);
      let displayedMonth = new Date(this.displayed).getMonth();

      date.setDate(1);
      date.setDate(2 - (date.getDay() || 7)); // first displayed Monday
      let days = [];
      for (let i = 0; i < 6; i++) {
        let week = [];
        for (let j = 0; j < 7; j++) {
          let day = new Date(date);
          day.title = day.getDate();
          day.key = day.getTime();
          day.class = [];

          if (this.min != null) {
            day.setHours(23, 59, 59, 999);
            if (day.getTime() < this.min.getTime()) {
              day.disabled = true;
              day.class.push('ds-disabled');
            }
          }
          if (this.max != null) {
            day.setHours(0, 0, 0, 0);
            if (day.getTime() > this.max.getTime()) {
              day.disabled = true;
              day.class.push('ds-disabled');
            }
          }

          if (day.getMonth() !== displayedMonth) {
            day.class.push('ds-another-month');
          }

          week.push(day);
          date.setDate(date.getDate() + 1);
        }
        days.push(week);
      }
      return days;
    },
    /**
     * Months for the month selection grid for the displayed year
     * @return {Array<Array<Object>>} 3 by 4 nested array
     */
    months() {
      let date = new Date(this.displayed);
      date.setMonth(0);
      date.setDate(1);
      let months = [];
      for (let i = 0; i < 4; i++) {
        let quarter = [];
        for (let j = 0; j < 3; j++) {
          let month = new Date(date);
          month.title = month.toLocaleString(this.locale, { month: 'long' });
          month.key = month.getFullYear() + '-' + month.getMonth();

          if (this.min != null) {
            month.setMonth(month.getMonth() + 1);
            month.setDate(0);
            month.setHours(23, 59, 59, 999);
            if (month.getTime() < this.min.getTime()) {
              month.disabled = true;
            }
          }
          if (this.max != null) {
            month.setDate(1);
            month.setHours(0, 0, 0, 0);
            if (month.getTime() > this.max.getTime()) {
              month.disabled = true;
            }
          }

          if (
            this.value &&
            this.value.getMonth() === month.getMonth() &&
            this.value.getFullYear() === month.getFullYear()
          ) {
            month.class = 'ds-selected-month';
          }

          month.title = this.capitalize(month.title);
          quarter.push(month);
          date.setMonth(date.getMonth() + 1);
        }
        months.push(quarter);
      }
      return months;
    },
    /**
     * Years for the year selection grid for the displayed decade
     * @return {Array<Array<Object>>} 3 by 4 nested array
     */
    years() {
      let date = new Date(this.displayed);
      date.setFullYear(Math.floor(date.getFullYear() / 30) * 30);
      let years = [];
      for (let i = 0; i < 6; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
          let year = new Date(date);
          year.key = year.title = year.getFullYear();

          if (this.min != null) {
            year.setMonth(12);
            year.setDate(0);
            year.setHours(23, 59, 59, 999);
            if (year.getTime() < this.min.getTime()) {
              year.disabled = true;
            }
          }
          if (this.max != null) {
            year.setMonth(0);
            year.setDate(1);
            year.setHours(0, 0, 0, 0);
            if (year.getTime() > this.max.getTime()) {
              year.disabled = true;
            }
          }

          if (this.value && this.value.getFullYear() === year.getFullYear()) {
            year.class = 'ds-selected-year';
          }

          row.push(year);
          date.setFullYear(date.getFullYear() + 1);
        }
        years.push(row);
      }

      return years;
    },
    weekLabels() {
      let labels = [];
      let date = new Date();
      date.setDate(date.getDate() - date.getDay() + 1); // set date to Monday
      for (let i = 1; i < 8; i++) {
        labels.push(this.getWeekDay(date));
        date.setDate(date.getDate() + 1);
      }
      return labels;
    },
    /**
     * Maximum and minimum date value for the current view
     * @return {[type]} [description]
     */
    bounds() {
      let min = new Date(this.displayed);
      let max = new Date(this.displayed);

      if (this.view === 'year') {
        min.setFullYear(this.years[0][0].getFullYear());
        max.setFullYear(this.years[3][1].getFullYear());
      }

      if (this.view !== 'day') {
        min.setMonth(0);
        max.setMonth(11);
      }

      min.setDate(1);
      min.setHours(0, 0, 0, 0);

      max.setMonth(max.getMonth() + 1);
      max.setDate(0);
      max.setHours(23, 59, 59, 999);

      return { min, max };
    },
    canShiftForward() {
      if (this.max == null) {
        return true;
      }
      return this.bounds.max.getTime() < this.max.getTime();
    },
    canShiftBack() {
      if (this.min == null) {
        return true;
      }
      return this.bounds.min.getTime() > this.min.getTime();
    },
    maxDateHeader() {
      if (!this.secondDate) {
        return undefined;
      } else if (this.value > this.secondDate) {
        return `${this.getDay(this.value)} ${this.getMonth(
          this.value,
          'short',
          1
        )}`;
      } else {
        return `${this.getDay(this.secondDate)} ${this.getMonth(
          this.secondDate,
          'short',
          1
        )}`;
      }
    },
    minDateHeader() {
      if (!this.secondDate || this.value < this.secondDate) {
        return `${this.getDay(this.value)} ${this.getMonth(
          this.value,
          'short',
          1
        )}`;
      } else {
        return `${this.getDay(this.secondDate)} ${this.getMonth(
          this.secondDate,
          'short',
          1
        )}`;
      }
    },
    minDate() {
      return !this.secondDate || this.value < this.secondDate
        ? this.value
        : this.secondDate;
    },
    maxDate() {
      return !this.secondDate
        ? undefined
        : this.value > this.secondDate
        ? this.value
        : this.secondDate;
    }
  },
  methods: {
    select(item) {
      this.displayed = item;
      if (this.view === 'year') {
        this.view = 'month';
      } else if (this.view === 'month') {
        this.view = 'day';
      } else if (this.view === 'day') {
        this.selectDay(new Date(item.valueOf()));
      }
      this.$emit('selectDate');
      this.$emit('update:dateUnset', false);
    },
    shift(delta) {
      if (this.view === 'day') {
        this.displayed.setMonth(this.month + delta);
      } else if (this.view === 'month') {
        this.displayed.setFullYear(this.year + delta);
      } else if (this.view === 'year') {
        this.displayed.setFullYear(this.year + delta * 30);
      }
      this.displayed = new Date(this.displayed);
    },
    capitalize(text) {
      let index = this.ie ? 1 : 0;
      return text.charAt(index).toUpperCase() + text.slice(++index);
    },
    onYear() {
      this.view = this.view === 'day' ? 'year' : 'day';
    },
    onMonth() {
      this.view = this.view === 'day' ? 'month' : 'day';
    },
    onSave() {
      this.$emit('save');
    },
    onClear() {
      this.$emit('update:dateUnset', true);
      this.$emit('input', null);
      if (this.rangeAvailable) {
        this.$emit('update:secondDate', undefined);
      }
    },
    _dateMinMaxInternal(id, value) {
      return {
        id: id,
        value: value
      };
    },
    selectDay(item) {
      const isDateRange = this.value && this.secondDate && this.rangeAvailable;
      let getTimeItem = new Date(item).getTime();

      if (isDateRange) {
        const isItemEqualFirstDate =
          getTimeItem == new Date(this.value).getTime();
        const isItemEqualSecondDate =
          getTimeItem == new Date(this.secondDate).getTime();

        if (isItemEqualFirstDate || isItemEqualSecondDate) {
          this.$emit('input', item);
          this.$emit('update:secondDate', undefined);
          return;
        }
      }

      if (isDateRange && !this.dateUnset) {
        let dateMin, dateMax;

        if (this.value - this.secondDate < 0) {
          dateMin = this._dateMinMaxInternal('input', this.value);
          dateMax = this._dateMinMaxInternal(
            'update:secondDate',
            this.secondDate
          );
        } else {
          dateMin = this._dateMinMaxInternal(
            'update:secondDate',
            this.secondDate
          );
          dateMax = this._dateMinMaxInternal('input', this.value);
        }

        if (dateMin.value < item && item < dateMax.value) {
          let diffValue = Math.abs(this.value - item);
          let diffSecondValue = Math.abs(this.secondDate - item);

          if (diffValue < diffSecondValue) {
            this.checkAlternating('input', item);
          } else {
            this.checkAlternating('update:secondDate', item);
          }
        } else if (dateMax.value > item) {
          this.checkAlternating(dateMin.id, item);
        } else {
          this.checkAlternating(dateMax.id, item);
        }
      } else if (
        this.value &&
        this.rangeAvailable &&
        !this.dateUnset &&
        !this.defaultDay
      ) {
        if (!this.autoInitialize && !this.autoInitializeInit) {
          this.$emit('input', this.value);
          this.autoInitializeInit = true;
        }

        this.$emit('update:secondDate', item);
      } else {
        this.$emit('input', item);
        if (!this.autoInitialize && !this.autoInitializeInit) {
          this.onSave();
          this.autoInitializeInit = true;
        }
      }

      this.defaultDay = false;
    },
    dateKey(date) {
      if (date) {
        date.key = date.getTime();
      }
    },
    setInitDay() {
      if (!this.autoInitialize) {
        this.$emit('input', new Date());
      }

      this.$emit('update:secondDate', undefined);
    },
    setDayRange(range) {
      let valueCopy = new Date(this.value.getTime());
      valueCopy.setDate(valueCopy.getDate() + range - 1);

      if (!this.autoInitialize) {
        this.$emit('input', this.value);
      }

      this.$emit('update:secondDate', valueCopy);
      this.onSave();
    },
    getMonth(value, monthFormat, sliceEnd) {
      if (value) {
        let month = this.capitalize(
          value.toLocaleString(this.locale, { month: monthFormat })
        );
        return sliceEnd ? month.slice(0, month.length - sliceEnd) : month;
      } else {
        return void 0;
      }
    },
    getDay(value) {
      return value && value.getDate();
    },
    getWeekDay(date) {
      return moment(date)
        .locale(this.locale)
        .format('ddd')
        .slice(0, 3)
        .toLowerCase();
    },
    minMaxFullYear(id) {
      if (this.minDate && this.maxDate) {
        let minFullYear = this.minDate.getFullYear();
        let maxFullYear = this.maxDate.getFullYear();

        if (minFullYear !== maxFullYear) {
          if (id === 'min') {
            return minFullYear;
          } else if (id === 'max') {
            return maxFullYear;
          }
        }
      }
    },
    checkAlternating(updateAlternating, item) {
      if (updateAlternating === this.alternatingDateName) {
        this.$emit('input', item);
        this.$emit('update:secondDate', undefined);
      } else {
        this.$emit(updateAlternating, item);
      }
    }
  },
  watch: {
    value(date) {
      this.$emit('update:alternatingDateName', 'input');
      this.dateKey(date);
      this.displayed = new Date(date);
    },
    secondDate(date) {
      this.$emit('update:alternatingDateName', 'update:secondDate');
      this.dateKey(date);
    }
  },
  mounted() {
    if (this.rangeAvailable) {
      this.defaultDay = false;
    }

    if (this.autoInitialize) {
      this.$emit('input', this.value);
    }

    this.autoInitializeInit = this.autoInitialize;
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-datepicker {
  background-color: @color-white;
  border-radius: 4px;
  box-shadow: @datepicker-shadow;
  box-sizing: border-box;
  height: 332px;
  width: 353px;
  display: flex;
  flex-direction: column;

  .ds-datepicker-header-additional {
    display: none;
  }

  .ds-datepicker-header {
    height: 60px;
    display: flex;
    padding: 0 20px;
    background-color: @color-gray-100;

    .ds-datepicker-labels {
      display: flex;
      align-items: center;
      flex: 1 0 auto;
      position: relative;

      * {
        transition: all 0.1s ease;
      }

      .ds-month {
        .font-components-datepicker-header-text();
        cursor: pointer;
      }

      .ds-year {
        .font-components-datepicker-header-text();
        cursor: default;
        margin-left: 5px;
      }

      .ds-year-icon {
        cursor: pointer;
        margin-left: 8px;
      }
    }

    .ds-buttons {
      display: flex;
      align-items: center;

      button {
        height: 18px;
        width: 18px;
        box-sizing: border-box;
        padding: 0;
        margin-left: 14px;
        border: none;
        background-color: transparent;
        border-radius: 0;
        cursor: pointer;

        &:focus {
          outline: none;
        }

        &:disabled {
          cursor: default;
        }
      }
    }

    &.ds-datepicker-header-mobile {
      background-color: @color-white;
      height: 40px;
    }
  }

  .ds-grid-select-row {
    .ds-item-cell {
      > .ds-item {
        box-sizing: content-box;
        line-height: 30px;
        min-width: 28px;
        color: #252631;

        > span {
          font-family: 'Roboto Regular';
        }

        &.ds-disabled {
          color: @color-gray-400;
          font-family: 'Roboto Light';
        }

        &.ds-selected-year,
        &.ds-selected-month {
          span {
            color: @color-white;
            background-color: @color-primary;
          }
        }
      }
    }
  }

  .ds-datepicker-body {
    height: 272px;
    width: 353px;
    padding: 21px 20px;
    box-sizing: border-box;

    .ds-labels-top {
      th {
        color: @color-gray-500;
        height: 16px;
        width: 29px;
        text-transform: capitalize;
        font-family: 'Roboto Regular';
        font-size: 14px;
        letter-spacing: 0.2px;
        line-height: 16px;
        padding-bottom: 12px;
      }
    }

    .ds-item-cell .ds-disabled {
      color: @color-gray-400;
    }

    .ds-item-cell .ds-grid-item-big {
      height: 18px;
      width: 32px;
      color: #252631;
      font-family: 'Roboto Regular';
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      padding: 4px;
    }

    .ds-item-cell.ds-disabled .ds-grid-item-big {
      color: @color-gray-400;
      font-family: 'Roboto Light';
    }

    .ds-item-cell.selected .ds-grid-item-big {
      color: @color-primary;
    }

    .ds-select-day-list-wrapper {
      width: 190px;
      display: flex;
      justify-content: center;
      margin-left: 25px;

      .ds-select-day-list {
        width: 110px;
        color: @color-primary;
        font-family: 'Roboto Medium';
        font-size: 14px;
        line-height: 21px;
        border-left: 1px solid @color-gray-300;
        padding-left: 25px;

        > div {
          cursor: pointer;
          margin-bottom: 20px;
        }
      }
    }

    &.ds-full-width {
      width: 100%;
    }

    &.ds-datepicker-body-select-day-list {
      display: flex;
      width: 526px;
    }
  }

  .ds-datepicker-footer {
    display: none;
  }

  &.ds-full-width {
    width: 100%;
  }

  &.ds-datepicker-select-day-list {
    width: 526px;
  }

  .ds-datepicker-sidebar {
    display: none;
  }
}

@media @screen-medium, @screen-small {
  .ds-datepicker {
    height: 411px;
    border-radius: 0;

    .ds-datepicker-header-additional {
      .font-components-datepicker-header-text();
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      height: 60px;
      box-sizing: border-box;
      background-color: @color-gray-100;

      .ds-additional-title {
        cursor: default;
      }
    }

    .ds-datepicker-header {
      background-color: @color-white;
      height: 40px;
      padding: 0 20px;

      .ds-year,
      .ds-month {
        color: @color-gray-500 !important;
      }
    }

    .ds-datepicker-body {
      padding-top: 10px;
      height: 261px;
      .ds-grid-select-row {
        height: 32px;
      }
    }

    .ds-datepicker-footer {
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
      padding: 0 14px 14px;
      height: 50px;

      .ds-datepicker-clear {
        margin-right: 12px;

        button {
          color: @color-gray-500;
          font-family: 'Roboto Medium';
          height: 14px;
          font-size: 12px;
          line-height: 14px;
          text-transform: uppercase;
        }
      }

      button {
        border-radius: 4px;
      }
    }

    .ds-close-icon {
      cursor: pointer;
    }

    &.ds-datepicker-range {
      height: 365px;
    }
  }
}

@media @screen-medium and (orientation: landscape),
  @screen-small and (orientation: landscape) {
  .ds-datepicker {
    display: flex;
    flex-direction: row;
    height: 315px;
    width: 583px;

    .ds-datepicker-header-additional {
      display: none;
    }

    .ds-datepicker-sidebar {
      display: flex;
      flex-direction: column;
      min-width: 190px;
      padding: 20px;
      background-color: @color-gray-100;

      .ds-datepicker-sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        height: 20%;

        .ds-datepicker-sidebar-title {
          height: 19px;
          color: #252631;
          font-family: 'Roboto Regular';
          font-size: 16px;
          letter-spacing: 0.2px;
          line-height: 19px;
        }
      }

      .ds-datepicker-sidebar-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 60%;

        color: #252631;
        font-family: 'Roboto Regular';
        font-size: 20px;
        letter-spacing: 0.2px;
        line-height: 24px;

        .ds-datepicker-sidebar-week-day {
          text-transform: capitalize;
        }
      }

      .ds-datepicker-sidebar-footer-wrapper {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        height: 20%;

        .ds-datepicker-sidebar-footer {
          display: flex;
          .ds-datepicker-sidebar-clear {
            margin-right: 30px;

            button {
              border-radius: 4px;
              font-family: 'Roboto Medium';
              color: @color-gray-500;
            }
          }
        }
      }
    }

    .ds-main-content {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;

      .ds-datepicker-body {
        height: 260px;
      }

      .ds-datepicker-footer {
        display: none;
      }
    }

    &.ds-datepicker-range {
      height: 315px;
    }
  }
}
</style>
