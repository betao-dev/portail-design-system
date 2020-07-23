<template>
  <div
    :class="['ds-calendar', { 'ds-sm': sm, 'ds-md': md, 'ds-lg': lg }]"
    :style="{ width }"
  >
    <label :class="{ 'ds-no-label': !label }">
      <div
        v-if="label"
        :id="labelId"
        :class="[
          'ds-label-text',
          { 'ds-slide-label': slideLabel, 'ds-label-focus': labelFocus },
          slideActive
            ? 'ds-slide-label-active'
            : slideLabel
            ? 'ds-slide-label-inactive'
            : ''
        ]"
        @click.prevent="onInputPrevent()"
      >
        {{ label }}
      </div>

      <CalendarIcon
        v-if="iconLeft"
        :source="getInputIcon"
        :size="iconSize"
        :color="iconColor"
        :class="[
          'ds-calendar-icon-left',
          {
            'active-icon': activeIcon
          }
        ]"
        :padding="iconPadding"
        :id="iconId"
        @click.prevent="onIconClick"
      />

      <input
        type="tel"
        v-model="inputValueWrapper"
        :maxlength="getMaxlength"
        :class="[
          'ds-has-icon',
          {
            'ds-error-backlight': showInvalidBacklight && invalidBacklight,
            'ds-valid-backlight': showValidBacklight && validBacklight,
            'ds-error': inputErrors.length && validateAvailable,
            'ds-slide-input': slideLabel,
            'ds-text-right': textAlign === 'right',
            'ds-placeholder-md': placeholderMd,
            'ds-calendar-input-focus': calendarVisible && inputBorderBacklight,
            'ds-calendar-input-read': !editableMode
          }
        ]"
        ref="input"
        :style="getStyle"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="!editableMode"
        @click.prevent="inputFocus"
        @blur="inputBlur"
        @keypress="onKeyPress"
      />

      <CalendarIcon
        v-if="!iconLeft"
        :source="getInputIcon"
        :size="iconSize"
        :color="iconColor"
        :class="{
          'active-icon': activeIcon
        }"
        :padding="iconPadding"
        :id="iconId"
        @click.prevent="onIconClick"
      />

      <div class="ds-drawer" v-if="inputErrors.length && validateAvailable">
        <span class="ds-error-message">
          {{ inputErrors[0] }}
        </span>
      </div>
    </label>

    <CalendarDropdown
      v-show="getCalendarPosition !== 'modal'"
      :target="$refs.input"
      :opened="calendarVisible"
      @update:opened="onUpdateCalendarVisible"
      :position="getCalendarPosition"
      :borderColor="!isMobile && borderColorDesktop"
      :labelId="labelId"
      :iconId="iconId"
      :activeDatepickerComponent="activeCalendarComponent"
      :margin="marginDropdown"
      just-fade
    >
      <Datepicker
        :min="datepickerMin"
        :max="datepickerMax"
        v-model="calendarValue"
        :secondDate.sync="calendarSecondValue"
        :rangeAvailable="rangeAvailable"
        :selectDayList="selectDayList"
        :isMobile="isMobile"
        :dateUnset.sync="dateUnset"
        :auto-initialize="autoInitialize"
        :alternatingDateName.sync="alternatingDateName"
        :dayListPositive="dayListPositive"
        @save="onSave"
        @selectDate="onResetEditDate"
      ></Datepicker>
    </CalendarDropdown>

    <CalendarDialog
      v-show="getCalendarPosition === 'modal'"
      :opened="calendarVisible"
      @update:opened="onUpdateCalendarVisible"
      :borderColor="!isMobile && borderColorDesktop"
      :datepickerContainer="isMobile"
      :backgroundColor="backgroundColor"
      :backdropOpacity="backdropOpacity"
      :dialogStyleObject="wrapperStyleObject"
      :contentFullWidth="fullWidth"
      :overflowCheck="getCalendarPosition === 'modal' && positionChangeable"
      :activeDatepickerComponent="activeCalendarComponent"
    >
      <Datepicker
        :min="datepickerMin"
        :max="datepickerMax"
        :fullWidth="fullWidth"
        v-model="calendarValue"
        :secondDate.sync="calendarSecondValue"
        :rangeAvailable="rangeAvailable"
        :selectDayList="selectDayList"
        :isMobile="isMobile"
        :dateUnset.sync="dateUnset"
        :auto-initialize="autoInitialize"
        :alternatingDateName.sync="alternatingDateName"
        :dayListPositive="dayListPositive"
        @save="onSave"
        @selectDate="onResetEditDate"
      ></Datepicker>
    </CalendarDialog>
  </div>
</template>

<script>
import _ from 'lodash';

import Datepicker from './Datepicker';
import CalendarDropdown from './calendarComponents/CalendarDropdown';
import CalendarIcon from './calendarComponents/CalendarIcon';
import CalendarDialog from './calendarComponents/CalendarDialog';

const DesktopWidth = 960;

export default {
  name: 'Calendar',
  components: { Datepicker, CalendarDropdown, CalendarIcon, CalendarDialog },
  props: {
    value: null,
    name: String,
    lg: Boolean,
    md: Boolean,
    sm: Boolean,
    placeholderMd: Boolean,
    width: String,
    lang: String,
    label: String,
    slideLabel: Boolean,
    placeholder: String,
    disabled: Boolean,
    minDate: Date,
    maxDate: Date,
    rangeStart: Date,
    range: Object, // For example {min: 30, max: 180}
    position: {
      type: String,
      default: 'bottom-middle'
    },
    positionChangeable: Boolean,
    marginDropdown: Number,
    fullWidth: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    iconSize: {
      type: String,
      default: '18px'
    },
    iconColor: {
      type: String,
      default: 'gray-400'
    },
    iconPadding: String,
    activeIcon: {
      type: Boolean,
      default: false
    },
    borderColorDesktop: String,
    backgroundColor: String,
    backdropOpacity: String,
    wrapperStyleObject: Object,
    validators: Array,
    validationClose: Boolean,
    showErrors: {
      type: Boolean,
      default: true
    },
    secondDate: null,
    rangeAvailable: Boolean,
    selectDayList: Boolean,
    dayListPositive: {
      type: Boolean,
      default: true
    },
    shortMonthFormat: Boolean,
    iconLeft: Boolean,
    backlight: {
      type: Boolean,
      default: false
    },
    inputBorderBacklight: Boolean,
    autoInitialize: {
      type: Boolean,
      default: true
    },
    editableMode: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    validateEventName: undefined,
    calendarVisible: false,
    slideActive: undefined,
    labelFocus: undefined,
    touched: false,
    windowWidth: window.innerWidth,
    positions: Array,
    labelId: Math.random()
      .toString(36)
      .substring(7),
    iconId: Math.random()
      .toString(36)
      .substring(7),
    dateUnset: false,
    oldValue: undefined,
    validationTimeoutId: undefined,
    validBacklight: false,
    invalidBacklight: false,
    alternatingDateName: undefined,
    editMode: false,
    inputEdit: undefined,
    inputEditLength: 0
  }),
  computed: {
    inputValueWrapper: {
      get() {
        if (!this.editMode) {
          if (this.dateUnset) {
            return '';
          } else if (!this.secondDate) {
            return this.inputValue;
          } else if (this.value < this.secondDate) {
            return `${this.inputValue} - ${this.secondInputValue}`;
          } else {
            return `${this.secondInputValue} - ${this.inputValue}`;
          }
        } else {
          return this.inputEdit;
        }
      },
      set(value) {
        this.setInputValueWrapper(value);
      }
    },
    inputValue() {
      if (
        !this.rangeAvailable &&
        !_.isNull(this.oldValue) &&
        !_.isUndefined(this.oldValue)
      ) {
        this.onSave();
      }

      return this.getValue(this.value);
    },
    secondInputValue() {
      return this.getValue(this.calendarSecondValue);
    },
    locale() {
      if (this.$root === this) {
        return this.lang || 'fr-fr';
      }
      return this.lang || this.$root.locale || 'fr-fr';
    },
    calendarValue: {
      get() {
        if (this.value && !isNaN(this.value)) {
          return this.value;
        }
        let date = new Date();
        if (
          this.datepickerMax &&
          date.getTime() > this.datepickerMax.getTime()
        ) {
          return this.datepickerMax;
        }
        if (
          this.datepickerMin &&
          date.getTime() < this.datepickerMin.getTime()
        ) {
          return this.datepickerMin;
        }
        return date;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    calendarSecondValue: {
      get() {
        return this.secondDate && !isNaN(this.secondDate)
          ? this.secondDate
          : null;
      },
      set(value) {
        this.$emit('update:secondDate', value);
      }
    },
    dateRangeStart_() {
      return this.rangeStart || new Date();
    },
    datepickerMin() {
      if (this.range && this.range.min != null) {
        let minDate = new Date(this.dateRangeStart_);
        minDate.setDate(minDate.getDate() - this.range.min);
        return minDate;
      }
      return this.minDate;
    },
    datepickerMax() {
      if (this.range && this.range.max != null) {
        let maxDate = new Date(this.dateRangeStart_);
        maxDate.setDate(maxDate.getDate() + this.range.max);
        return maxDate;
      }
      return this.maxDate;
    },
    isMobile() {
      return this.windowWidth <= DesktopWidth;
    },
    getCalendarPosition() {
      if (this.positionChangeable) {
        return this.isMobile ? this.positions[1] : this.positions[0];
      } else {
        return this.position;
      }
    },
    activeCalendarComponent() {
      if (this.getCalendarPosition === 'modal') {
        return 'Dialog';
      } else if (this.getCalendarPosition !== 'modal') {
        return 'Dropdown';
      } else {
        return void 0;
      }
    },
    getStyle() {
      const style = {};
      const padding = parseInt(this.iconSize) + 6;
      if (this.icon) {
        style.paddingRight = padding + 'px';
      }

      if (this.width) {
        style.width = this.width;
      }

      return style;
    },

    validation() {
      if (!this.validators || !this.validators.length) {
        return [];
      }

      let data = [];
      for (let i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.inputValue, this.confirmModel)
        ]);
      }
      return data;
    },

    inputErrors() {
      let errors = [];
      for (let i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message);
        }
      }
      return errors;
    },
    validateAvailable() {
      return this.touched && this.showErrors;
    },
    showValidBacklight() {
      return (
        this.inputErrors.length == 0 && this.validateAvailable && this.backlight
      );
    },
    showInvalidBacklight() {
      return (
        this.inputErrors.length > 0 && this.validateAvailable && this.backlight
      );
    },
    getInputIcon() {
      return this.inputValueWrapper ? 'close' : 'calendar';
    },
    getMaxlength() {
      return this.rangeAvailable ? 23 : 10;
    }
  },
  methods: {
    setInputValueWrapper(value) {
      let lastIndex = value.length - 1;

      if (this.inputEditLength < value.length) {
        switch (value.length) {
          case 11:
            this.checkMissedString(value, lastIndex, ' ', ' - ');
            break;
          case 12:
            this.checkMissedString(value, lastIndex, '-', '- ');
            break;
          case 13:
            this.checkMissedString(value, lastIndex, ' ', ' ');
            break;
          case 2:
          case 5:
          case 15:
          case 18:
            this.inputEdit = value + '/';
            break;
          case 3:
          case 6:
          case 16:
          case 19:
            this.checkMissedString(value, lastIndex, '/', '/');
            break;
          default:
            this.inputEdit = value;
            break;
        }
      } else {
        this.inputEdit = value;
      }

      this.inputEditLength = this.inputEdit.length;

      if (this.inputEditLength === 0) {
        this.resetDates();
      }

      if (this.inputEditLength === 10) {
        this.resetDates();
        this.calcCalendarFirstValue(this.inputEdit);
      }

      if (this.inputEditLength === 23) {
        this.calcCalendarFirstValue(this.inputEdit);
        this.calcCalendarSecondValue(this.inputEdit);
      }
    },
    checkMissedString(value, lastIndex, lastCharacter, insertString) {
      if (value[lastIndex] !== lastCharacter) {
        let endString = `${insertString}${value[lastIndex]}`;
        this.inputEdit = value.slice(0, lastIndex) + endString;
      }
    },
    resetDates() {
      this.$emit('input', null);
      if (this.rangeAvailable) {
        this.$emit('update:secondDate', undefined);
      }
    },
    onResetEditDate() {
      this.editMode = false;
      this.inputEdit = undefined;
    },
    calcCalendarFirstValue(value) {
      this.calendarValue = new Date(
        value
          .slice(0, 10)
          .split('/')
          .reverse()
          .join('-')
      );
    },
    calcCalendarSecondValue(value) {
      this.calendarSecondValue = new Date(
        value
          .slice(13)
          .split('/')
          .reverse()
          .join('-')
      );
    },
    onKeyPress(event) {
      this.editMode = true;
      event = event ? event : window.event;
      const charCode = event.which ? event.which : event.keyCode;
      const systemCharCodes = charCode > 31 && charCode < 48;

      /*
        preventing the first character of the day's number
        be more than 3 for calendarValue and calendarSecondValue
      */
      if (
        (this.inputEditLength === 0 || this.inputEditLength === 10) &&
        (systemCharCodes || charCode > 51)
      ) {
        event.preventDefault();
      }

      /*
        preventing the second character of the day's number be more than 1,
        if the first character more than 2 for calendarValue and calendarSecondValue
      */
      if (
        ((this.inputEditLength === 1 && this.inputEdit[0] > 2) ||
          (this.inputEditLength === 14 && this.inputEdit[13] > 2)) &&
        (systemCharCodes || charCode > 49)
      ) {
        event.preventDefault();
      }

      /*
        preventing the first character of the mounth's number
        be more than 1 for calendarValue and calendarSecondValue
       */
      if (
        (this.inputEditLength === 3 || this.inputEditLength === 16) &&
        (systemCharCodes || charCode > 49)
      ) {
        event.preventDefault();
      }

      /*
        preventing the second character of the mounth's number be more than 2,
        if the first character more than 0 for calendarValue and calendarSecondValue
      */
      if (
        ((this.inputEditLength === 4 && this.inputEdit[3] > 0) ||
          (this.inputEditLength === 17 && this.inputEdit[16] > 0)) &&
        (systemCharCodes || charCode > 50)
      ) {
        event.preventDefault();
      }

      if (systemCharCodes || charCode > 57) {
        event.preventDefault();
      }
    },
    onInputPrevent() {
      this.inputFocus();
    },
    inputFocus() {
      if (this.slideLabel) {
        this.labelFocus = true;
        this.slideActive = true;
      }
      if (!this.validationClose) {
        this.touched = true;
      }
      this.calendarVisible = !this.calendarVisible;

      if (this.getCalendarPosition === 'modal') {
        this.$refs.input.blur();
      }

      this.$emit('inputFocus');
    },
    inputBlur() {
      if (this.slideLabel) {
        this.labelFocus = false;

        if (!this.value) {
          this.slideActive = false;
        }
      }

      this.$emit('inputBlur');
    },
    slideInit() {
      if (this.slideLabel && this.value) {
        this.slideActive = true;
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    setOverflow(mobileMode) {
      if (this.calendarVisible) {
        if (mobileMode && this.getCalendarPosition === 'modal') {
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.overflowY = 'auto';
        }
      } else {
        document.body.style.overflowY = 'auto';
      }
      document.body.style.overflowX = 'hidden';
    },
    onIconClick() {
      if (this.inputEdit) {
        this.onResetEditDate();
      }

      if (!this.inputValueWrapper) {
        this.calendarVisible = !this.calendarVisible;

        if (this.calendarVisible) {
          this.$refs.input.focus();
        } else {
          this.$refs.input.blur();
        }
      }

      this.resetDates();
      this.$emit('icon-click');
    },
    validate() {
      this.touched = true;
      this.checkBacklight();
      this.$emit('validation', this.validation);
    },
    onSave() {
      this.calendarVisible = false;
    },
    buildShortMonthFormatDate(value) {
      let day = value.getDate();
      let year = value.getFullYear();

      let month = value
        .toLocaleDateString('fr-fr', { month: 'short' })
        .slice(0, 3);
      month = month.charAt(0).toUpperCase() + month.slice(1);

      return `${day} ${month} ${year}`;
    },
    getValue(value) {
      if (!value || isNaN(value) || _.isNull(value)) {
        return '';
      } else if (this.shortMonthFormat) {
        return this.buildShortMonthFormatDate(value);
      } else {
        return value.toLocaleDateString(this.locale);
      }
    },
    validationBacklight(activeValidation, inactiveValidation) {
      this[inactiveValidation] = false;
      this[activeValidation] = true;

      if (this.validationTimeoutId) {
        clearTimeout(this.validationTimeoutId);
      }

      this.validationTimeoutId = setTimeout(() => {
        this[activeValidation] = false;
      }, 2000);
    },
    checkBacklight() {
      this.$nextTick(() => {
        if (this.showValidBacklight) {
          this.validationBacklight('validBacklight', 'invalidBacklight');
        } else if (this.showInvalidBacklight) {
          this.validationBacklight('invalidBacklight', 'validBacklight');
        }
      });
    },
    isMinMaxSelectDataExist() {
      if (
        this.rangeAvailable &&
        this.calendarValue &&
        this.calendarSecondValue
      ) {
        const firstDateTime = this.calendarValue.getTime();
        const secondDateTime = this.calendarSecondValue.getTime();

        if (firstDateTime > secondDateTime) {
          this.$emit('maxSelectedDate', this.calendarValue);
          this.$emit('minSelectedDate', this.calendarSecondValue);
        } else {
          this.$emit('maxSelectedDate', this.calendarSecondValue);
          this.$emit('minSelectedDate', this.calendarValue);
        }
      }
    },
    onUpdateCalendarVisible(status) {
      this.calendarVisible = status;
      if (!this.touched && this.validationClose) {
        this.touched = true;
      }
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.oldValue = oldValue;
      if (this.slideLabel && !this.labelFocus && !newValue) {
        this.slideActive = false;
      }

      this.checkBacklight();

      this.slideInit();
      this.$emit('validation', this.validation);
    },
    isMobile(value) {
      this.setOverflow(value);
    },
    calendarVisible(value) {
      if (!value) {
        setTimeout(() => {
          document.body.removeAttribute('style');
        }, 300);
      }
      this.setOverflow(this.isMobile);
      this.$emit('calendarVisible', value);
    },
    showValidBacklight(value) {
      if (value) {
        this.validationBacklight('validBacklight', 'invalidBacklight');
      }
    },
    showInvalidBacklight(value) {
      if (value) {
        this.validationBacklight('invalidBacklight', 'validBacklight');
      }
    },
    calendarValue() {
      this.isMinMaxSelectDataExist();
    },
    calendarSecondValue() {
      this.isMinMaxSelectDataExist();
    }
  },
  mounted() {
    if (this.name) {
      this.validateEventName = `validate${this.name.charAt(0).toUpperCase() +
        this.name.slice(1).toLowerCase()}`;
      document.addEventListener(this.validateEventName, this.validate);
    }

    if (
      (this.minDate && this.maxDate && this.value < this.minDate) ||
      this.value > this.maxDate
    ) {
      this.$emit('input', new Date(this.minDate));
    }

    if (this.positionChangeable) {
      this.positions = this.position.split(' ');
      window.addEventListener('resize', this.onResize);
    }

    document.addEventListener('validate', this.validate);
    this.$emit('validation', this.validation);

    this.isMinMaxSelectDataExist();
    setTimeout(() => this.slideInit(), 500);
  },
  beforeDestroy() {
    if (this.positionChangeable) {
      window.removeEventListener('resize', this.onResize);
    }

    if (this.name) {
      document.removeEventListener(this.validateEventName, this.validate);
    }

    document.removeEventListener('validate', this.validate);
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';
@import '../styles/mixins';

.ds-calendar {
  display: inline-block;

  label {
    display: block;
    position: relative;
  }

  &.ds-sm {
    width: 144px;
  }
  &.ds-md {
    width: 252px;

    input {
      height: 42px;
    }
  }
  &.ds-lg {
    width: 464px;

    input {
      height: 52px;
    }
  }
  @media @screen-small {
    &.ds-lg {
      width: 296px;
    }
  }

  .ds-label-text {
    .font-desktop-x-small-regular-gray();
    height: 16px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ds-slide-label {
    position: absolute;
    left: 5px;
    top: 20px;
    z-index: 1;
    padding: 0 0 0 6px;
    margin-bottom: 20px;
    max-width: 100%;
    height: 20px;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif !important;
    color: #828282;
    background: linear-gradient(
      @color-white 90%,
      hsla(0, 0%, 100%, 0)
    ) !important;
    border-right: 2.5px solid #fff;
    cursor: pointer;

    &.ds-slide-label-active {
      transform: translateY(-20px) scale(0.85, 0.85);
      transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      color: #989898;
      font-size: 17px;
      padding: 0 10px;
      left: 0;
    }

    &.ds-slide-label-inactive {
      transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    &.ds-label-focus {
      color: @color-dark;
    }
  }

  input {
    .font-desktop-small-regular-dark();
    padding: 7px 12px;
    box-sizing: border-box;
    border: 1px solid @color-gray-300;
    border-radius: 2px;
    background-color: @color-white;
    width: 100%;

    &.ds-has-icon {
      padding-right: 30px;
    }

    &.ds-slide-input {
      margin-top: 10px;
    }

    &.ds-text-right {
      text-align: right;
    }

    &.ds-placeholder-md {
      .placeholder-font-size(14px);
    }

    .input-placeholder();

    &.ds-calendar-input-focus:not(.ds-error) {
      border-color: @color-primary;
    }

    &:focus {
      outline: none;
    }

    &.ds-error {
      border-color: @color-red;
    }

    &.ds-error-backlight {
      border-color: @color-red;
      background-color: #ffedec;
    }

    &.ds-valid-backlight {
      border-color: @color-primary;
      background-color: #e9f8f3;
    }

    &.ds-calendar-input-read {
      cursor: pointer;
    }

    &:disabled {
      border: 1px solid #f2f4f7;
    }

    &:disabled,
    &:disabled::placeholder {
      .font-desktop-small-regular-light-gray-base();
    }
  }

  input[type='date']::-webkit-inner-spin-button,
  input[type='date']::-webkit-clear-button,
  input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
    color: rgba(0, 0, 0, 0);
    opacity: 0;
  }

  .ds-no-label {
    input + .ds-calendar-icon {
      height: 100% !important;
      bottom: 0;
      top: 0;
    }
  }

  input + .ds-calendar-icon {
    cursor: pointer;
    position: absolute;
    bottom: 8%;
    right: 6px;
    height: 50% !important;
  }

  input + .active-icon {
    cursor: pointer;
  }

  input {
    cursor: auto;
  }

  .ds-drawer {
    box-sizing: border-box;
    font-size: 11px;
    line-height: 12px;
    padding: 3px 0;
    position: absolute;
    text-align: left;
    max-width: 100%;
    width: 100%;
  }

  .ds-error-message {
    color: @color-red;
    font-family: @font-family;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    display: inline-block;
    max-width: 100%;
  }

  &.ds-lg {
    input {
      .placeholder-font-size(16px);
      font-size: 16px;

      &.ds-placeholder-md {
        .placeholder-font-size(14px);
      }
    }
  }

  .ds-calendar-icon-left {
    cursor: pointer;
    position: absolute;
    bottom: 5px;
    left: 6px;
    height: 50% !important;
  }

  .ds-calendar-icon-left + input {
    padding-left: 40px;
  }
}
</style>
