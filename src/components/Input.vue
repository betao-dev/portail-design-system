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
      @validation                 - Emits validation result
    />

  Properties:
                            --- General ---

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

    validators - Array<Object>. Array of validator Objects. Each Object should
      have three fields:
        name (String) - Validator id
        message (String) - Error message that shown when validation fails
        validator (function) - Function that takes input value as an argument
          and returns true/false

      When multiple validators fail, only one error is displayed, determined
      by their order in the array

                             --- Date ---

    minDate - Date. Earliest selectable day for the datepicker

    maxDate - Date. Latest selectable day for the datepicker

    dateRangeStart - Date. Point of reference for the dateRange property

    dateRange - Object. An alternative to minDate/maxDate:
      :dateRange="{
        min: 10,  - 10 calendar days in the past from the dateRangeStart
        max: 20,  - 20 calendar days in the future from the dateRangeStart
      }"

    datepickerPosition - String. Forwarded to datepicker dropdown position

                            --- Select ---

    options - Array<Object>. Options for select. Each item is bound to an
              <option> element. Additionaly a .title property can be set to change
              the displayed value

    maxVisibleOptions - Number. This value restricts count of visible items at the select list.
                        By default all items will be visible.

  Events:

    validation - Emitted when the input value changes. The event payload is
      an array of the following structure:
        [['validator.name', isValid], ...]

  Model:

    Input value is updated through v-model directive
-->

<template>
  <div :class="['input', {sm, md, lg, standalone: sm || md || lg}]">
      <label>
        <div v-if="label" class="label-text">{{ label }}</div>

        <div
          ref="input"
          :class="['input-container',
            {
              'disabled': disabled,
              'focused': focused,
              'error': inputErrors.length && touched
            }
          ]">

          <input
            :disabled="disabled"
            v-bind="inputAttrs"
            v-model="inputValue"
            @keyup.esc="datepickerVisible = false"
            @blur="inputBlur"
            @focus="inputFocus"
          />

          <Icon
            :class="{'rotate_icon': type === 'select' && selectVisible}"
            v-if="icon_"
            color="gray-400"
            :source="icon_"
          />
        </div>
      </label>

    <div class="drawer">
      <span
        v-if="inputErrors.length && touched"
        class="error-message"
      >
        {{ inputErrors[0] }}
      </span>

      <span
        v-show="help && !(inputErrors.length && touched)"
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
      v-if="type === 'select'"
      :target="$refs.input"
      :opened.sync="selectVisible"
      class="select"
      just-fade
    >
      <div
        v-for="(option, index) in options"
        :class="['select-item', {
          selected: index === selected,
        }]"
        @click="selectItemClick(option, index)"
        @mousedown="selectItemClick(option, index)"
      >
        {{ option.title || option.value}}
      </div>
    </Dropdown>

    <Dropdown
      v-if="type === 'date'"
      :target="$refs.input"
      :opened.sync="datepickerVisible"
      :position="datepickerPosition"
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
    dateRangeStart: Date,  // will be new Date() if not set
    dateRange: Object,     // For example {min: 30, max: 180}
    datepickerPosition: {
      type: String,
      default: 'bottom-middle',
    },

    // For type="select"
    options: Array,
    maxVisibleOptions: Number
  },
  data: () => ({
    helpVisible: false,
    datepickerVisible: false,
    selectVisible: false,
    selected: undefined,
    touched: false,
    focused: false
  }),
  mounted() {
    this.$emit('validation', this.validation)
  },
  computed: {
    inputAttrs() {
      return {
        type: this.type === 'date' ? 'text' : this.type,
        placeholder: this.placeholder,
        disabled: this.disabled,
        readonly: this.type === 'date' || this.type === 'select',
      }
    },
    icon_() {
      if (this.type === 'date') {
        return 'today'
      }
      if (this.type === 'select') {
        return 'expand_more'
      }
      return this.icon
    },
    locale() {
      if (this.$root === this) {
        return this.lang || 'fr-fr'
      }
      return this.lang || this.$root.locale || 'fr-fr'
    },
    /**
     * Validation data for the current value and validators
     * this.validation -> [
     *   [
     *     'required',  // validator.name
     *     true         // is valid
     *   ],
     *   ...
     * ]
     */
    validation() {
      if (!this.validators || !this.validators.length) {
        return []
      }

      let data = []
      for (var i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.inputValue),
        ])
      }
      return data
    },
    inputErrors() {
      let errors = []
      for (var i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message)
        }
      }
      return errors
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
        this.datepickerVisible = false;
        this.$emit('input', value)
      }
    },
    dateRangeStart_() {
      return this.dateRangeStart || new Date()
    },
    datepickerMin() {
      if (this.dateRange && this.dateRange.min != null) {
        let minDate = new Date(this.dateRangeStart_)
        minDate.setDate(minDate.getDate() - this.dateRange.min)
        return minDate
      }
      return this.minDate
    },
    datepickerMax() {
      if (this.dateRange && this.dateRange.max != null) {
        let maxDate = new Date(this.dateRangeStart_)
        maxDate.setDate(maxDate.getDate() + this.dateRange.max)
        return maxDate
      }
      return this.maxDate
    },
  },
  methods: {
    inputFocus() {
      this.focused = true;

       if (this.type === 'date') {
        this.datepickerVisible = true
      }

      if (this.type === 'select') {
        this.selectVisible = true
      }
    },

    inputBlur() {
      this.touched = true;
      this.focused = false;
      this.selectVisible = false;
    },

    selectItemClick(option, index) {
      this.selected = index;
      this.inputValue = option.title || option.value;
    },
  },
  watch: {
    value() {
      this.$emit('validation', this.validation)
    },

    inputValue() {
      this.touched = true;
    }
  }
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

  .input-container {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    height: 38px;
    border: 1px solid @color-gray-300;
    border-radius: 2px;
    background-color: @color-white;
    align-items: center;
    padding: 0 12px;

    input {
      box-sizing: border-box;
      background-color: @color-white;
      width: 100%;
      border: none;
      outline: none;
      .font-desktop-small-regular-dark();

      &::placeholder {
        .font-desktop-small-regular-gray();
      }

      &[type="date"]::-webkit-inner-spin-button,
      &[type="date"]::-webkit-clear-button,
      &[type="date"]::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
        color: rgba(0,0,0,0);
        opacity:0;
      }

      // For IOS hide clear button
      &::-ms-clear {
        display: none;
      }

      // For IOS hide cursor and prevent selecting date content
      &[readonly]  {
        caret-color : transparent;

        &:focus {
          outline: none;
        }

        &::selection { background: transparent; }
      }

    }

    span.icon {
      pointer-events: none;

      &.rotate_icon {
        transform: rotate(180deg);
      }
    }

    &.focused:not(.error) {
      border-color: @color-primary;

      span.icon {
        fill: @color-primary !important;
      }
    }

    &.error {
      border-color: @color-red;
    }

    &.disabled {
      border: 1px solid #f2f4f7;

      &, &::placeholder {
        .font-desktop-small-regular-light-gray();
      }
    }
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

  .select {
    width: 100%;
    background-color: @color-white;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,0.05);

    div {
      padding: 8px 12px;
     .font-desktop-small-regular-dark();

      &.selected {
        .font-desktop-small-regular-accent();
      }

       &.hidden {
        display: none;
      }

      &:hover {
        cursor: pointer;
        background-color: darken(@color-white, 5%);
      }

    }
  }
}
</style>
