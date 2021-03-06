<template>
  <div
    :class="[
      'ds-select-wrapper',
      {
        'ds-lg': lg,
        'ds-md': md,
        'ds-sm': sm,
        'ds-select-error': checkError && extraErrorPadding,
        'ds-select-error-full': checkError && extraErrorPaddingFull,
        'ds-select-disabled': disabled,
        'ds-select-alt': altSelect,
        'ds-select-color': color
      }
    ]"
    :style="{ width }"
  >
    <div v-if="label" :class="['ds-label', { 'ds-label-tooltip': isTooltip }]">
      {{ label }}

      <Tooltip
        class="ds-select-tooltip-wrapper"
        placement="bottom"
        :poper-width="tooltipWidth"
        v-if="isTooltip"
      >
        <div slot="popover">
          <div v-if="isTooltipSlot">
            <slot name="tooltip"></slot>
          </div>
          <div v-else>
            {{ tooltipMessage }}
          </div>
        </div>
        <Icon
          class="ds-tooltip-icon"
          slot="reference"
          question-circle
          size="18px"
          color="gray-500"
        ></Icon>
      </Tooltip>
    </div>

    <template v-if="customContent && value && value.id">
      <div
        id="custom-content"
        class="ds-drop-content-wrapper"
        @click="toggleDropList"
      >
        <slot :name="value.id"></slot>
      </div>
    </template>
    <template v-if="!hideIcon">
      <Icon
        v-if="altIcon"
        :source="
          openDropDownList && reversibleIcon
            ? 'angle_up_solid'
            : 'angle_down_solid'
        "
        color="gray-500"
        size="18px"
        class="ds-drop-icon-alt"
        id="icon-alt"
        @click="toggleDropList"
      />
      <Icon
        v-else
        :source="
          openDropDownList && reversibleIcon ? 'expand_less' : 'expand_more'
        "
        color="gray-400"
        class="ds-drop-icon"
        id="icon"
        @click="toggleDropList"
      />
    </template>
    <template>
      <span
        v-if="value && value.color"
        class="ds-input-select-color"
        :style="{ backgroundColor: COLORS[value.color] || value.color }"
      ></span>
    </template>
    <input
      :class="[
        'ds-select',
        {
          'ds-input-error': checkError,
          'ds-error': isInvalidInput,
          'ds-valid': showValidCheck && validBacklight,
          'ds-input-custom': customContent,
          'ds-input-alt': altSelect,
          'ds-input-color': value && value.color
        }
      ]"
      :style="{ height }"
      type="text"
      ref="dsSelect"
      v-model="inputSelectValue"
      :placeholder="placeholder"
      :name="name"
      @click="toggleDropListWrapper"
      @keypress="onKeyPress"
      @paste.prevent="onPaste($event)"
      :maxlength="maxlength"
      :[checkReadonly]="readonly"
    />
    <transition name="error-message">
      <div class="ds-error-message-wrapper" v-if="checkError">
        {{ inputErrors[0] }}
      </div>
    </transition>
    <div
      v-if="help && !checkError"
      class="ds-select-help"
      ref="helpLabel"
      @mouseover="helpVisible = true"
    >
      {{ helpLabel }}
      <Dropdown :target="$refs.helpLabel" :opened.sync="helpVisible" just-fade>
        <Tooltip v-html="help" />
      </Dropdown>
    </div>

    <Dropdown
      :target="$refs.dsSelect"
      :opened="openDropDownList"
      @update:opened="onDropdownOpened"
      :position="dropdownPosition"
      :style="{ overflow: optionsOverflow }"
      :avoid-close="avoidClose"
      :class="[
        'ds-options',
        {
          'ds-options-custom': customContent,
          'ds-options-content': optionContent
        }
      ]"
      just-fade
    >
      <div v-if="optionContent">
        <div v-for="(option, index) in options" class="ds-option-content">
          <slot :name="`option${index + 1}`"></slot>
        </div>
      </div>
      <div v-else>
        <div
          :class="[
            'ds-option-wrapper',
            {
              'ds-option-wrapper-custom': customContent,
              'ds-option-wrapper-selected':
                (typeof option !== 'object' ? option : option.value) ===
                inputSelectValue
            }
          ]"
          :style="{ ...optionStyles }"
          v-for="(option, index) in options"
          :key="index"
          @click="selectValue(option)"
        >
          <span
            class="ds-select-color"
            v-if="option.color"
            :style="{ backgroundColor: COLORS[option.color] || option.color }"
          ></span>
          {{ option.title }}
          <span v-if="!displayTitle">{{
            typeof option !== 'object' ? option : option.value
          }}</span>
          <template v-if="customContent">
            <slot :name="index + 1"></slot>
          </template>
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script>
import _ from 'lodash';

import { COLORS } from '../styles/vars';
import { cloneDeep, isEqual } from 'lodash';
import Dropdown from './Dropdown';
import Icon from './Icon';
import validation from './../mixins/validation';
import touch from './../mixins/touch';

export default {
  name: 'Select',
  components: { Dropdown, Icon },
  mixins: [validation, touch],
  props: {
    value: null,
    options: Array,
    label: String,
    placeholder: String,
    sm: Boolean,
    md: Boolean,
    lg: Boolean,
    name: String,
    validators: {
      type: Array,
      default: () => []
    },
    optionsOverflow: String,
    help: String,
    helpLabel: {
      type: String,
      default: '? explication'
    },
    required: {
      type: Boolean,
      default: false
    },
    dropdownPosition: {
      type: String,
      default: 'default'
    },
    idMode: {
      type: Boolean,
      default: false
    },
    valueMode: {
      type: Boolean,
      default: false
    },
    reversibleIcon: {
      type: Boolean,
      default: false
    },
    displayTitle: {
      type: Boolean,
      default: false
    },
    emitFullOption: {
      type: Boolean,
      default: false
    },
    showValidations: {
      type: Boolean,
      default: true
    },
    width: String,
    customContent: {
      type: Boolean,
      default: false
    },
    optionStyles: Object,
    altIcon: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: true
    },
    dataMode: Boolean,
    type: {
      type: String,
      default: 'text',
      validation(value) {
        return (
          [
            'text',
            'number',
            'number-dot',
            'number-dot-comma',
            'number-dot-comma-delimiter'
          ].indexOf(value) !== -1
        );
      }
    },
    maxlength: Number,
    extraErrorPadding: Boolean,
    extraErrorPaddingFull: Boolean,
    referenceModel: null,
    disabled: {
      type: Boolean,
      default: false
    },
    altSelect: {
      type: Boolean,
      default: false
    },
    countSymbolAfterDelimiter: {
      type: Number,
      default: 2
    },
    touchName: String,
    showCorrectCheck: {
      type: Boolean,
      default: true
    },
    tooltipMessage: String,
    tooltipWidth: String,
    optionContent: {
      type: Boolean,
      default: false
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    height: String,
    color: Boolean
  },
  data: () => ({
    openDropDownList: false,
    touched: false,
    helpVisible: false,
    inputSelectValue: undefined,
    validBacklight: false,
    invalidBacklight: false,
    avoidClose: ['icon-alt', 'icon'],
    COLORS
  }),
  methods: {
    onDropdownOpened(status, hardUpdate) {
      if (!this.customContent || hardUpdate) {
        this.openDropDownList = status;
      }
    },
    openDropList() {
      if (!this.dataMode) {
        this.touched = true;
      }
      this.openDropDownList = true;
      this.$emit('validation', this.validation);
    },
    toggleDropListWrapper() {
      if (this.readonly) {
        this.toggleDropList();
      } else {
        this.openDropDownList = false;
      }
    },
    toggleDropList() {
      this.openDropDownList = !this.openDropDownList;
      this.$emit('validation', this.validation);
    },
    selectValue(option) {
      if (this.dataMode) {
        if (option.id === this.value.id) {
          option = { ...option, data: this.inputSelectValue };
        }

        this.touched = false;
      }

      this.setInputSelectValue(option);
      this.$emit('input', option);
      this.$emit('change', option);
      this.openDropDownList = false;
    },
    setInputSelectValue(value) {
      if (this.dataMode) {
        this.inputSelectValue = value.data;
      } else if (this.idMode) {
        const selectedOption = this.options.find(
          option => option.id === _.get(value, 'id')
        );
        this.inputSelectValue = selectedOption ? selectedOption.value : '';
      } else if (this.valueMode) {
        const selectedOption = this.options.find(option => option === value);
        this.inputSelectValue = selectedOption || '';
      } else if (typeof value === 'object' && value) {
        const selectedOption = this.options.find(option =>
          isEqual(option, value)
        );
        this.inputSelectValue = selectedOption ? selectedOption.title : '';
      }
    },
    setValidity(field, value) {
      const orgValidators = cloneDeep(this.validators);
      this.validators = this.validators.map(validator => {
        if (validator.name === field) {
          validator.validator = () => value;
        }
        return validator;
      });
      this.$emit('validation', this.validation);
      this.validators = cloneDeep(orgValidators);
    },
    setTouched(touched) {
      this.touched = touched;
    },
    applyDelimiterHelper(event, partsArray, separator, value, isPaste) {
      let isApply = partsArray.length > 1;
      if (isApply) {
        let lastItem = partsArray[partsArray.length - 1];
        if (lastItem.length >= this.countSymbolAfterDelimiter) {
          partsArray.pop();
          lastItem = lastItem.slice(0, this.countSymbolAfterDelimiter);
          partsArray.push(lastItem);
          value = partsArray.join(separator);

          if (!_.isNull(event)) {
            event.preventDefault();
          }
        }
      }

      if (isPaste) {
        this.applyMaxLength(value);
      }

      return isApply;
    },
    applyDelimiter(event, value, isPaste) {
      if (value) {
        let commaParts = value.split(',');
        let dotParts = value.split('.');

        let status = this.applyDelimiterHelper(
          event,
          commaParts,
          ',',
          value,
          isPaste
        );

        if (!status) {
          this.applyDelimiterHelper(event, dotParts, '.', value, isPaste);
        }
      }
    },
    onKeyPress(event) {
      this.touched = true;
      event = event ? event : window.event;
      let charCode = event.which ? event.which : event.keyCode;

      if (this.type === 'number-dot-comma-delimiter') {
        this.applyDelimiter(event, this.inputSelectValue);
      }

      if (
        ((this.type === 'number' && charCode > 31) ||
          (this.type === 'number-dot' && charCode > 31 && charCode !== 46) ||
          ((this.type === 'number-dot-comma' ||
            this.type === 'number-dot-comma-delimiter') &&
            charCode > 31 &&
            charCode !== 46 &&
            charCode !== 44)) &&
        (charCode < 48 || charCode > 57)
      ) {
        event.preventDefault();
      }
    },
    onPaste(event) {
      this.touched = true;
      let value =
        (this.inputSelectValue || '') + event.clipboardData.getData('Text');
      this.checkValuePattern(true, value);
    },
    checkValuePattern(paste, value) {
      if (this.value || paste) {
        let patternObj = {
          'number': /[^0-9]+/g,
          'number-dot': /[^0-9.]+/g,
          'number-dot-comma': /[^0-9.,]+/g,
          'number-dot-comma-delimiter': /[^0-9.,]+/g
        };

        let pattern = patternObj[this.type];
        this.setValueByPatternLength(pattern, value || this.inputSelectValue);
      }
    },
    setValueByPatternLength(pattern, value) {
      if (pattern) {
        value = (value || '').toString();
        value = value.replace(pattern, '');
      }

      if (this.type === 'number-dot-comma-delimiter') {
        this.applyDelimiter(null, value, true);
      } else {
        this.applyMaxLength(value);
      }
    },
    checkMaxLength() {
      return this.maxlength ? 'maxlength' : null;
    },
    applyMaxLength(value) {
      this.inputSelectValue =
        typeof value === 'string' ? value.slice(0, this.maxlength) : value;
    }
  },
  computed: {
    isTooltip() {
      return this.tooltipMessage || this.isTooltipSlot;
    },
    checkReadonly() {
      return this.readonly ? 'readonly' : null;
    },
    validation() {
      if (!this.validators || !this.validators.length) {
        return [];
      }

      let data = [];
      for (let i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.value, this.referenceModel)
        ]);
      }

      return data;
    },
    checkError() {
      return this.inputErrors.length && this.touched;
    },
    isInvalidInput() {
      return this.showInvalidBlock && this.invalidBacklight;
    },
    isTooltipSlot() {
      return !!this.$slots.tooltip;
    }
  },
  mounted() {
    this.setInputSelectValue(this.value);

    if (this.name) {
      this.validateEventName = `validate${this.name.charAt(0).toUpperCase() +
        this.name.slice(1).toLowerCase()}`;
      document.addEventListener(this.validateEventName, this.validate);
    }

    if (this.required) {
      this.validators.push({
        name: 'required',
        message: this.dsTranslate('Field Required'),
        validator: value => !!value
      });
    }
    if (this.customContent) {
      this.avoidClose.push('custom-content');
    }
    this.checkValuePattern();
    this.$emit('validation', this.validation);
  },
  watch: {
    inputSelectValue: {
      deep: true,
      handler(value) {
        if (this.dataMode) {
          this.$emit('input', { ...this.value, data: value });
        }
      }
    },
    value(val) {
      this.$emit('validation', this.validation);
      this.setInputSelectValue(val);
    },
    options() {
      if (this.value) {
        this.$emit('validation', this.validation);
        this.setInputSelectValue(this.value);
      }
    },
    openDropDownList(newVal, oldVal) {
      if (!newVal && oldVal) {
        if (!this.dataMode) {
          this.touched = true;
        }
      }
    }
  },
  beforeDestroy() {
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

.ds-select-wrapper {
  position: relative;
  width: 252px;
  text-align: left;
  font-family: Roboto, sans-serif;

  &.ds-lg {
    .ds-label {
      font-size: 14px;
      margin-bottom: 14px;
    }

    input {
      height: 52px;
    }

    .icon-wrapper {
      bottom: 12px;
    }

    .ds-options {
      padding: 12px 0;

      &.ds-options-custom {
        top: 58px !important;
        padding: 12px 0 15px;
        border: none;
      }

      .ds-option-wrapper {
        padding: 12px 18px;
        line-height: 22px;

        &.ds-option-wrapper-custom {
          letter-spacing: 0;
          padding: 3px 20px 3px;

          &:first-child {
            padding-top: 0;
          }

          &:last-child {
            padding-bottom: 0;
          }
        }

        &.ds-option-wrapper-selected {
          color: @color-primary;
        }

        &:hover {
          background-color: @color-gray-100;
        }

        .ds-select-color {
          display: inline-block;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          margin-right: 8px;
        }
      }

      &.ds-options-content {
        box-shadow: 0 2px 16px 0 rgba(153, 155, 168, 0.12);
        border-radius: 4px;
        margin-top: 6px;
        padding: 11px 0;
        border: none;

        .ds-option-content {
          padding: 12.5px 20px 6.5px;
          padding-left: 20px;
          padding-right: 20px;

          &:hover {
            background-color: @color-gray-100;
          }
        }
      }
    }

    &.ds-select-error {
      padding-bottom: 10px;

      .ds-drop-content-wrapper {
        margin-top: -25px;

        + .ds-drop-icon-alt,
        + .ds-drop-icon {
          margin-top: -14px;
        }
      }

      &:not(.ds-drop-content-wrapper) {
        .ds-drop-icon-alt,
        .ds-drop-icon {
          top: 50%;
        }
      }
    }
  }

  &.ds-md {
    input {
      height: 42px;
    }
  }

  &.ds-sm {
    input {
      height: 30px;
    }
  }

  .ds-label {
    .font-desktop-x-small-regular-gray();
    font-weight: 300;
    height: 16px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 0;

    &.ds-label-tooltip {
      display: flex;
      align-items: center;

      .ds-select-tooltip-wrapper {
        .ds-tooltip-icon {
          margin-left: 4px;
        }
      }
    }
  }

  .ds-select {
    .font-desktop-small-regular-dark();
    padding: 10px 25px 10px 12px;
    box-sizing: border-box;
    border: 1px solid @color-gray-300;
    border-radius: 2px;
    background-color: @color-white;
    cursor: pointer;
    width: 100%;

    &:focus:not(.ds-error):not(.ds-input-error) {
      border-color: @color-primary;
    }
    &:focus {
      outline: none;
    }

    &.ds-input-error {
      border-color: @color-red;
    }

    &.ds-error {
      .input-invalid-fade-animation();
    }

    &.ds-valid {
      .select-valid-fade-animation();
    }

    &.ds-input-custom {
      .placeholder-input(@color, @fontFamily, @letterSpacing, @lineHeight) {
        &::-webkit-input-placeholder {
          color: @color;
          font-family: @fontFamily;
          letter-spacing: @letterSpacing;
          line-height: @lineHeight;
        }
        &::-moz-placeholder {
          color: @color;
          font-family: @fontFamily;
          letter-spacing: @letterSpacing;
          line-height: @lineHeight;
        }
        &:-ms-input-placeholder {
          color: @color;
          font-family: @fontFamily;
          letter-spacing: @letterSpacing;
          line-height: @lineHeight;
        }
        &::placeholder {
          color: @color;
          font-family: @fontFamily;
          letter-spacing: @letterSpacing;
          line-height: @lineHeight;
        }
      }

      cursor: text;
      padding: 16px 116px 15px 16px;
      font-family: @robotoFont;

      .placeholder-input(@color-gray-400, @robotoFont, 0, 21px);
    }

    &.ds-input-color {
      padding-left: 38.5px;
    }
  }

  .ds-drop-content-wrapper {
    cursor: pointer;
    position: absolute;
    top: 50%;
    margin-top: -20px;
    right: 50px;
  }

  .ds-drop-icon {
    cursor: pointer;
    position: absolute;
    right: 5px;
    bottom: 8px;
  }

  .ds-drop-icon-alt {
    cursor: pointer;
    position: absolute;
    top: 50%;
    margin-top: -9px;
    right: 16px;
  }

  .ds-input-select-color {
    position: absolute;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    left: 16.5px;
    top: 50%;
    margin-top: -5px;
  }

  &.ds-select-error-full {
    padding-bottom: 18px;

    .ds-drop-icon-alt {
      margin-top: -17px;
    }
  }

  .ds-error-message-wrapper {
    width: 100%;
    font-size: 11px;
    color: @color-red;
    position: absolute;
    padding: 6px 0 0;
    line-height: normal;
  }

  .ds-select-help {
    cursor: pointer;
    position: absolute;
    width: 100%;
    color: @color-gray-500;
    font-family: @font-family;
    font-size: 11px;
    line-height: 12px;
    padding: 3px 12px;
    text-decoration: underline dashed;
  }

  .ds-options {
    left: 0;
    right: 0;
    top: auto !important;
    box-shadow: @dropdown-shadow;
    border: solid 1px #eee;
    background-color: white;
    z-index: 999;
    max-height: 204px;
    overflow-y: auto;
    overflow-x: hidden;

    .ds-option-wrapper {
      padding: 5px 10px;
      cursor: pointer;
      text-align: left;
      font-size: 14px;
      line-height: 16px;
      color: #1b1e24;
      font-family: Roboto, sans-serif;

      &.ds-option-wrapper-selected {
        color: @color-primary;
      }

      &:hover {
        background-color: @color-gray-100;
      }
    }
  }

  .error-message-enter-active,
  .error-message-leave-active {
    transition: opacity 0.3s;
  }
  .error-message-enter,
  .error-message-leave-to {
    opacity: 0;
  }

  &.ds-select-alt {
    .ds-label {
      margin-bottom: 10px;

      + .ds-drop-icon-alt {
        top: 66.6%;
      }
    }

    .ds-select {
      padding: 14px 38px 16px 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    input {
      .alternative-placeholder-wrapper();
    }

    &.ds-select-error {
      .ds-label {
        + .ds-drop-icon-alt {
          top: calc(50% + 9px);
        }
      }
    }
  }

  &.ds-select-disabled {
    pointer-events: none;

    .ds-label {
      color: #2d3047;
      font-weight: 300;
    }

    .ds-select {
      border: 1px solid @color-gray-300;
      border-radius: 4px;
      background-color: @color-gray-100;
      color: @color-gray-400;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 16px;
    }
  }

  &.ds-select-color {
    &.ds-lg,
    &.ds-md,
    &.ds-sm {
      .ds-options {
        top: 53px !important;
        max-height: unset;
        padding: 9px 0;

        .ds-option-wrapper {
          padding: 12px 16px;
        }
      }
    }
  }
}
</style>
