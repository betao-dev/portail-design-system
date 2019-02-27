<!--
  A styled input with an ability to set icon and validation

  Usage:

    <Input
      :disabled="true"            - Disables input
      :help="'Some help text'"    - Shown when hovering help label
      :helpLabel="'Show help'"    - Text for the help label
      :icon="'search'""           - Icon name or svg code
      :label="'My Input'"         - Label at the top of the input
      :lang="'en-en'"             - BCP 47 localization code
      :lg="false"                 - Large size
      :md="false"                 - Medium size
      :sm="false"                 - Small size
      :placeholder='Placeholder'  - Text used as the placeholder
      :type='email'               - Input type
      :validators='validators'    - Array of validators

      :minDate=" pastDate"        - Earliest date for the datepicker
      :maxDate="futureDate"       - Latest date for the datepicker
      :dateRangeStart="today"     - Starting point for the dateRange
      :dateRange="{min: 30}"      - N days in past/future date range

      v-model='value'             - Binds value property to input
      @validation                 - Emits whether input has errors
    />

  Properties:

    disabled - Boolean. Is input disabled. Passed directly to the input

    help - String. Text for the tooltip at the bottom of the input

    helpLabel - String. Text for the tooltip label

    icon - String. Icon name for icons from src/icons folder or an svg code

    label - String. Label at the top of the input

    lang - String. BCP 47 code. Language to be used in the datepicker
      for month names and weekday labels. Can be set globally with
      $root.locale. This property overrides global setting

    lg - Boolean. Large size - 464px

    md - Boolean. Medium size - 252px

    sm - Boolean. Small size -  144px

    placeholder - String. Passed directly to the input

    type - String. Passed to the input with type_ computed property.
      <Input type="date" /> results in <input type="text" />

    validators - Array[Object]. Array of validator Objects. Each Object must have two fields:
      message (String) - Error message that will be displayed if a validation failed.
      validator (function) - Function that takes input value as an argument and implements
        validation logic.

    minDate - Date. Earliest selectable day for the datepicker

    maxDate - Date. Latest selectable day for the datepicker

    dateRangeStart - Date. Point of reference for the dateRange property

    dateRange - Object. An alternative to minDate/maxDate:
      :dateRange="{
        min: 10,  - 10 calendar days in the past from the dateRangeStart
        max: 20,  - 20 calendar days in the future from the dateRangeStart
      }"

  Events:

    validation - Emitted when an input value changes. Emits true/false which tells if an input has
      validation errors.
-->

<template>
  <div :class="['input', {sm, md, lg, standalone: sm || md || lg}]">
    <label class="label">
      <div class="label-text">{{label}}</div>
      <input
        v-bind="inputAttrs"
        :class="{'has-icon': icon_, 'error': inputErrors.length && touched}"
        v-model="inputValue"
        ref="input"
        @focus="inputFocus"
        @click="inputFocus"
      />
    </label>

    <Icon v-if="icon_" color="gray-400" :source="icon_" />

    <div class="drawer">
      <span v-if="inputErrors.length && touched" class="error-message">
        {{ inputErrors[0] }}
      </span>

      <span
        v-show="help && !inputErrors.length && touched"
        class="help-label"
        ref="helpLabel"
        @mouseover="helpVisible = true"
      >
        {{ helpLabel }}
        <Dropdown :target="$refs.helpLabel" :opened.sync="helpVisible" just-fade>
          <Tooltip v-html="help" />
        </Dropdown>
      </span>
    </div>

    <Dropdown
      v-if="type === 'date'"
      :target="$refs.input"
      :opened.sync="datepickerVisible"
      position="bottom-middle"
      just-fade
    >
      <Datepicker
        :min="datepickerMin"
        :max="datepickerMax"
        v-model="datepickerValue"
      ></Datepicker>
    </Dropdown>
  </div>
</template>

<script>
import Datepicker from './Datepicker'
import Dropdown from './Dropdown'
import Icon from './Icon'
import Tooltip from './Tooltip'

export default {
  name: "Input",
  components: {Datepicker, Dropdown, Icon, Tooltip},
  props: {
    // General
    disabled: Boolean,
    help: String,
    helpLabel: {
      type: String,
      default: '? explication'
    },
    icon: String,
    label: String,
    lang: String,
    lg: Boolean,
    md: Boolean,
    sm: Boolean,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    validators: Array,
    value: null,

    // For type="date"
    minDate: Date,
    maxDate: Date,
    dateRangeStart: {
      type: Date,
      default: () => new Date(),
    },
    dateRange: Object,  // For example {min: 30, max: 180}
  },
  data: () => ({
    helpVisible: false,
    datepickerVisible: false,
    touched: false
  }),
  mounted() {
    this.$emit('validation', !!this.inputErrors.length)
  },
  computed: {
    inputAttrs() {
      return {
        type: this.type === 'date' ? 'text' : this.type,
        placeholder: this.placeholder,
        disabled: this.disabled,
        readonly: this.type === 'date',
      }
    },
    icon_() {
      if (this.type === 'date') {
        return 'today'
      }
      return this.icon
    },
    locale() {
      return this.lang || this.$root.locale || 'fr-fr'
    },
    inputErrors() {
      if (this.validators && this.validators.length) {
        return this.validators.reduce((acc, validator) => {
          if (!validator.validator(this.inputValue)) {
            acc.push(validator.message);
          }
          return acc;
        }, [])
      }
      return [];
    },
    inputValue: {
      get() {
        if (this.type === 'date') {
          if (!this.value || isNaN(this.value)) {
            return ''
          }

          return this.value.toLocaleDateString(this.locale)
        }

        return this.value
      },
      set(value) {
        if (this.type === 'date') {
          return
        }

        this.touched = true
        this.$emit('validation', !!this.inputErrors.length)
        this.$emit('input', value)
      }
    },
    datepickerValue: {
      get() {
        if (this.value && !isNaN(this.value)) {
          return this.value
        }
        let date = new Date()
        if (this.datepickerMax && date.getTime() > this.datepickerMax.getTime()) {
          return this.datepickerMax
        }
        if (this.datepickerMin && date.getTime() < this.datepickerMin.getTime()) {
          return this.datepickerMin
        }
        return date
      },
      set(value) {
        this.datepickerVisible = false
        this.$emit('validation', !!this.inputErrors.length)
        this.$emit('input', value)
      }
    },
    datepickerMin() {
      if (this.dateRange && this.dateRange.min != null) {
        let minDate = new Date(this.dateRangeStart)
        minDate.setDate(minDate.getDate() - this.dateRange.min)
        return minDate
      }
      return this.minDate
    },
    datepickerMax() {
      if (this.dateRange && this.dateRange.max != null) {
        let maxDate = new Date(this.dateRangeStart)
        maxDate.setDate(maxDate.getDate() + this.dateRange.max)
        return maxDate
      }
      return this.maxDate
    },
  },
  methods: {
    inputFocus() {
      if (this.type === 'date') {
        this.datepickerVisible = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.input {
  position: relative;
  display: inline-block;
  width: 100%;

  &.standalone {
    margin-right: 32px;
  }

  &.sm {
    width: 144px;
  }
  &.md {
    width: 252px;
  }
  &.lg {
    width: 464px;
  }
  @media @screen-small {
    &.lg {
      width: 296px;
    }
  }

  .label-text {
    height: 16px;
    margin-bottom: 4px;
    .font-desktop-x-small-regular-gray()
  }

  input {
    padding: 8px 12px;
    box-sizing: border-box;
    border: 1px solid @color-gray-300;
    border-radius: 2px;
    background-color: @color-white;
    width: 100%;
    .font-desktop-small-regular-dark();

    &.has-icon {
      padding-right: 30px;
    }

    &::placeholder {
      .font-desktop-small-regular-gray();
    }

    &:focus:not(.error) {
      border-color: @color-primary;
    }
    &:focus {
      outline: none;
    }

    &.error {
      border-color: @color-red;
    }

    &:disabled {
      border: 1px solid #f2f4f7;
    }
    &:disabled,
    &:disabled::placeholder {
      .font-desktop-small-regular-light-gray();
    }
  }

  .icon {
    pointer-events: none;
    position: absolute;
    margin-left: -30px; // 24 + 6, icon size and padding
    margin-top: 6px;    // center the 24px icon in the 36px input
  }

  .drawer {
    box-sizing: border-box;
    font-size: 11px;
    line-height: 12px;
    padding: 3px 12px;
    position: absolute;
    width: 100%;

  }

  .error-message {
    color: @color-red;
    font-family: @font-family;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 100%;
  }

  .help-label {
    cursor: pointer;
    color: @color-gray-500;
    font-family: @font-family;
    text-decoration: underline dashed;
  }

  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-clear-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
    color: rgba(0,0,0,0);
    opacity:0;
  }
}
</style>
