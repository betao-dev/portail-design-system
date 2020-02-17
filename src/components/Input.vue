<template>
  <div
    :class="[getType, {
      'ds-input': true,
      'ds-disabled': disabled,
      'ds-sm': sm,
      'ds-md': md,
      'ds-lg': lg,
      'ds-has-label': label,
      'ds-input-error': showInvalidBlock
    }]"
    :style="{width}"
    @click="onInputClick"
  >
    <label>
      <div
        v-if="label"
        :id="id"
        :class="{
          'ds-label-text': true,
          'ds-slide-label': slideLabel,
          'ds-label-focus': labelFocus,
          'ds-label-error': showInvalidBlock,
          'ds-slide-label-active': slideActive
        }"
      >
        <span class="ds-main-label">{{ label }}</span>

        <Icon
          class="ds-input-label-icon"
          v-if="labelIcon"
          size="16px"
          :color="labelIconColor"
          :source="labelIcon"
        />

        <span
          v-if="help || $slots.help"
          class="ds-help-label"
          ref="helpLabel"
          @mouseover="helpVisible = true"
        >
          <Popper
            trigger="hover"
            :delay-on-mouse-over="0"
            :delay-on-mouse-out="0"
            :options="{
              modifiers: { offset: offset }
            }"
          >
            <div class="reference" slot="reference">
              <Icon help_outline color="gray-500" size="18px"></Icon>
            </div>

            <div class="popper">
              <template v-if="$slots.help">
                <slot name="help"></slot>
              </template>
              <template v-else>
                {{ help }}
              </template>
            </div>
          </Popper>
        </span>
      </div>

      <Icon
        v-if="iconLeft && showIcon"
        :size="iconSize"
        :color="iconColor"
        :source="iconLeft"
        :class="['ds-general-icon', 'ds-icon-left', {'active-icon': activeIcon}]"
        :style="generalIconStyle"
        :padding="iconPadding"
        @click="onIconClick"
      />

      <input
        v-if="!mask"
        v-bind="inputAttrs"
        :[checkMaxLength]="maxlength"
        :[checkPasswordType]="type"
        :name="name"
        :class="{
          'ds-has-icon': icon,
          'ds-input-error': showInvalidBlock,
          'ds-error': isInvalidInput,
          'ds-valid': showValidCheck && validBacklight,
          'ds-slide-input': slideLabel,
          'ds-has-left-icon': iconLeft,
          'ds-text-right': textAlign === 'right',
          'ds-placeholder-dark': placeholderDark
        }"
        :key="inputId"
        v-model="inputValue"
        :style="{...getStyle, borderRadius, ...inputStyle}"
        @focus.prevent="inputFocus"
        @click.prevent="inputFocus"
        @blur="inputBlur"
        @keypress="onKeyPress"
        @keydown="onKeyDown"
        @paste.prevent="onPaste($event)"
      />

      <input
        v-else
        v-bind="inputAttrs"
        :[checkMaxLength]="maxlength"
        :[checkPasswordType]="type"
        :name="name"
        :class="{
          'ds-has-icon': icon,
          'ds-input-error': showInvalidBlock,
          'ds-error': isInvalidInput,
          'ds-valid': showValidCheck && validBacklight,
          'ds-slide-input': slideLabel,
          'ds-has-left-icon': iconLeft,
          'ds-text-right': textAlign === 'right',
          'ds-placeholder-dark': placeholderDark
        }"
        :key="inputId"
        v-model="inputValue"
        :style="{...getStyle, borderRadius, ...inputStyle}"
        v-mask="mask"
        @focus.prevent="inputFocus"
        @click.prevent="inputFocus"
        @blur="inputBlur"
        @keypress="onKeyPress"
        @keydown="onKeyDown"
        @paste.prevent="onPaste($event)"
      />

      <Icon
        v-if="getIcon && showIcon"
        :size="iconSize"
        :color="iconColor"
        :class="['ds-general-icon', {'active-icon': activeIcon}]"
        :style="generalIconStyle"
        :source="getIcon"
        :padding="iconPadding"
        @click="onIconClick"
      />

      <div class="ds-drawer">
        <transition name="error-message">
          <span v-if="showInvalidBlock" class="ds-error-message">
            {{ inputErrors[0] }}
          </span>
        </transition>
        <span v-if="subLabel && !(inputErrors.length && touched)" class="ds-sub-label">
          {{subLabel}}
        </span>
      </div>
    </label>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import Popper from 'vue-popperjs';
import Icon from './Icon'
import 'vue-popperjs/dist/vue-popper.css';
import validation from './../mixins/validation';

import _ from 'lodash'

export default {
  name: 'Input',
  components: {Icon, Popper},
  mixins: [validation],
  props: {
    disabled: Boolean,
    help: String,
    name:  String,
    icon: String,
    iconLeft: String,
    iconSize: {
      type: String,
      default: '24px'
    },
    iconColor: {
      type: String,
      default: 'gray-400'
    },
    iconPadding: String,
    labelIcon: String,
    labelIconColor: {
      type: String,
      default: 'gray-500'
    },
    label: String,
    subLabel: String,
    lang: String,
    lg: Boolean,
    md: Boolean,
    sm: Boolean,
    placeholder: String,
    placeholderDark: Boolean,
    type: {
      type: String,
      validator(value) {
        return ['text', 'password', 'number', 'number-dot', 'payment-card', 'tel'].indexOf(value) !== -1
      },
      default: 'text'
    },
    validators: {
      type: Array,
      default: () => []
    },
    value: null,
    slideLabel: Boolean,
    showValidations: {
      type: Boolean,
      default: true
    },
    maxlength: Number,
    pattern: RegExp,
    referenceModel: null,
    activeIcon: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    width: String,
    borderRadius: {
      type: String,
      default: '4px'
    },
    generalIconStyle: Object,
    inputStyle: Object,
    textAlign: {
      type: String,
      default: 'left'
    },
    mask: String,
    required: {
      type: Boolean,
      default: false
    },
    constantlyInvalidBacklight: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    validateEventName: undefined,
    helpVisible: false,
    touched: false,
    slideActive: undefined,
    labelFocus: undefined,
    timeoutId: undefined,
    validationTimeoutId: undefined,
    validBacklight: false,
    invalidBacklight: false,
    offset: {offset: '0, 10px'},
    id: Math.random().toString(36).substring(7),
    inputId: Math.random().toString(36).substring(7),
    showPassword: false
  }),
  mounted() {
    if (this.name) {
      this.validateEventName = `validate${this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()}`;
      document.addEventListener(this.validateEventName, this.validate);
    }

    if (this.required) {
      this.validators.push({
        name: 'required',
        message: 'This field is required',
        validator: (value) => !!value
      })
    }

    this.checkValuePattern()
    this.$emit('validation', this.validation)
    setTimeout(() => this.slideInit(), 500)
  },
  computed: {
    inputAttrs() {
      return {
        type: this.type === 'number' || (this.type === 'password' && this.showPassword) ? 'text' : this.type,
        placeholder: this.placeholder,
        disabled: this.disabled
      }
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
      for (let i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.inputValue, this.referenceModel),
        ])
      }
      return data
    },
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        this.$emit('change', value)
      }
    },
    getType() {
      return `ds-${this.type}`
    },
    getIcon() {
      if (this.type === 'password') {
        if (this.showPassword) {
          return 'lock'
        } else {
          return 'eye'
        }
      }

      return this.icon
    },
    checkMaxLength() {
      return (this.type === 'text' || this.type === 'password' || this.type === 'number' || this.type === 'number-dot' ||
              this.type === 'payment-card') && this.maxlength ? 'maxlength' : null
    },
    checkPasswordType() {
      return this.getType === 'ds-password' ? this.type : null
    },
    getStyle() {
      const style = {}

      if (this.icon) {
        style.paddingRight = this.calcIconPadding(_.get(this, 'generalIconStyle.right', '6px'))
      } else if (this.iconLeft) {
        style.paddingLeft = this.calcIconPadding(_.get(this, 'generalIconStyle.left', '6px'))
      }

      if (this.width) {
        style.width = this.width
      }

      return style
    },
    isInvalidInput() {
      return this.showInvalidBlock && (this.invalidBacklight || this.constantlyInvalidBacklight)
    }
  },
  methods: {
    getNumberFromStringPX(strPX) {
      return +strPX.substring(0, strPX.length - 2)
    },
    calcIconPadding(iconPadding) {
      let padding = this.getNumberFromStringPX(iconPadding)
      let iconSize = this.getNumberFromStringPX(this.iconSize)

      return `${padding + iconSize}px`
    },
    onInputClick(e) {
      this.$emit('click', e)
    },
    inputFocus() {
      if (this.slideLabel) {
        this.labelFocus = true;
        this.slideActive = true;
      }

      this.$emit('inputFocus')
    },
    inputBlur() {
      if (this.slideLabel) {
        this.labelFocus = false;

        if (!this.value) {
          this.slideActive = false;
        }
      }

      this.touched = true;
      this.$emit('inputBlur')
    },
    slideInit() {
      if (this.slideLabel && this.value) {
        this.slideActive = true;
      }
    },
    onKeyPress(event) {
      event = event ? event : window.event
      let charCode = event.which ? event.which : event.keyCode

      if ((this.type === 'payment-card' && charCode > 32 || this.type === 'number' && charCode > 31 ||
          (this.type === 'number-dot' && (charCode > 31 && charCode !== 46))) &&
          (charCode < 48 || charCode > 57)) {

        event.preventDefault()
      }
    },
    onKeyDown() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }

      this.timeoutId = setTimeout(() => {
        this.$emit('lastKeyDownDelay')
      }, 300)
    },
    setValidity(field, value) {
      const orgValidators = cloneDeep(this.validators)
      this.validators = this.validators.map(validator => {
        if (validator.name === field) {
          validator.validator = () => value
        }
        return validator
      })
      this.$emit('validation', this.validation)
      this.validators = cloneDeep(orgValidators)
    },
    checkValuePattern(paste, value) {
      if (this.value || paste) {
        let patternObj = {
          'number': /[^0-9]+/g,
          'number-dot': /[^0-9.]+/g,
          'payment-card': /[^0-9 ]+/g
        }

        let pattern = patternObj[this.type]
        this.setValueByPatternLength(pattern, value || this.inputValue)
      }
    },
    onPaste(event) {
      let value = (this.inputValue || '') + event.clipboardData.getData('Text')
      this.checkValuePattern(true, value)
    },
    setValueByPatternLength(pattern, value) {
      if (pattern) {
        value = value.replace(pattern, '')
      }

      this.inputValue = typeof value === 'string' ? value.slice(0, this.maxlength) : value
    },
    onIconClick() {
      if (this.type === 'password') {
        this.showPassword = !this.showPassword
      }
      this.$emit('icon-click')
    },
    setTouched(touched) {
      this.touched = touched
    }
  },
  watch: {
    value(newValue) {
      if (this.slideLabel && !this.labelFocus && !newValue) {
        this.slideActive = false;
      }

      this.checkBacklight()
      this.slideInit()
      this.$emit('validation', this.validation)
    }
  },
  beforeDestroy() {
    if (this.name) {
      document.removeEventListener(this.validateEventName, this.validate);
    }
  },
}
</script>

<style lang="less" scoped>
@import '../styles/vars';
@import '../styles/mixins';

.ds-input {
  display: inline-block;

  label {
    display: block;
    position: relative;
  }

  @media @screen-small {
    &.ds-lg {
      width: 296px;
    }
  }

  &.ds-text, &.ds-password, &.ds-number, &.ds-number-dot, &.ds-payment-card, &.ds-tel {
    .ds-label-text {
      .font-desktop-x-small-regular-gray();
      display: flex;
      align-items: center;
      height: 16px;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .ds-main-label {
        margin-right: 5px;
      }

      .ds-help-label {
        cursor: pointer;
        color: @color-gray-500;
        font-family: Roboto, sans-serif;
        font-size: 12px;
        line-height: 14px;

        &::v-deep {
          .popper {
            font-size: 12px;
            line-height: 16px;
            max-width: 330px;
            min-width: 300px;
            width: auto;
            white-space: initial;
            .poper();

            &[x-placement^="left"] {
              [x-arrow] {
                &:before {
                  top: -5px;
                  right: -10px;
                }
              }
            }
          }
        }
      }
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
      background: linear-gradient(@color-white 90%, hsla(0,0%,100%,0)) !important;
      border-right: 2.5px solid #fff;
      transition: .4s cubic-bezier(.25,.8,.25,1);

      &.ds-slide-label-active {
        transform: translateY(-20px) scale(0.85, 0.85);
        color: #989898;
        font-size: 17px;
        padding: 0 10px;
        left: 0;
      }

      &.ds-label-focus {
        color: @color-dark;
      }
    }

    input {
      color: #1B1E24;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      line-height: 16px;
      padding: 10px 12px;
      box-sizing: border-box;
      border: 1px solid @color-gray-300;
      background-color: @color-white;
      width: 100%;

      &.ds-has-icon {
        padding-right: 30px;
      }

      &.ds-has-left-icon {
        padding-left: 30px;
      }

      &.ds-slide-input {
        margin-top: 10px;
      }

      &.ds-text-right {
        text-align: right;
      }

      &:focus:not(.ds-error) {
        border-color: @color-primary;
      }
      &:focus {
        outline: none;
      }

      &.ds-input-error {
        &:focus {
          border-color: @color-red;
        }
      }

      &.ds-error {
        .input-invalid-fade-animation();
      }

      &.ds-valid {
        .input-valid-fade-animation();
      }

      .placeholder-input(14px, @robotoFont, @color-gray-400, 16px);

      &.ds-placeholder-dark {
        .placeholder-input(14px, @robotoFont, @form-placeholder-color, 16px);
      }

      &:disabled {
        border: 1px solid #E8ECEF;
        background-color: @color-gray-100;
      }
      &:disabled, &:disabled::placeholder {
        .font-desktop-small-regular-light-gray-base();
      }
    }

    input + .icon-wrapper {
        position: absolute;
        bottom: 24%;
        right: 6px;
        height: 50% !important;
    }

    .ds-icon-left {
      pointer-events: none;
      position: absolute;
      bottom: 5px;
      left: 6px;
      height: 50% !important;
    }

    input + .active-icon {
      cursor: pointer;
      pointer-events: auto;
    }
  }

  &.ds-has-label {
    input + .icon-wrapper {
      bottom: 8%;
    }
  }

  &.ds-input-error {
    padding-bottom: 10px;
  }

  .ds-drawer {
    box-sizing: border-box;
    font-size: 11px;
    line-height: 12px;
    padding: 6px 0 0;
    position: absolute;
    text-align: left;
    max-width: 100%;
    width: 100%;

    .error-message-enter-active, .error-message-leave-active {
      transition: opacity .3s;
    }
    .error-message-enter, .error-message-leave-to {
      opacity: 0;
    }
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

  .ds-sub-label {
    cursor: pointer;
    color: @color-gray-500;
    font-family: Roboto, sans-serif;
    font-size: 12px;
    line-height: 14px;
  }

  .ds-help-label {
    line-height: 18px;
  }

  &.ds-lg {
    input {
      padding: 14px 16px 16px;
    }
  }

  &.ds-error {
    input {
      color: @color-red !important;
      border-color: @color-red !important;
    }
  }

    &.ds-sm {
    width: 144px;

    input {
      height: 38px;
    }
  }

  &.ds-md {
    width: 252px;

    input {
      height: 42px;
    }
  }

  &.ds-lg {
    &.ds-text, &.ds-password, &.ds-number, &.ds-number-dot, &.ds-payment-card, &.ds-tel {
      .ds-label-text {
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 14px;
      }
    }

    input {
      height: 52px;
    }

    input + .icon-wrapper {
      position: absolute;
      bottom: 24%;
      right: 15px;
      height: 50% !important;
    }
  }

  &.ds-lg {
    &.ds-has-label {
      input + .icon-wrapper {
        bottom: 6%;
      }
    }
  }
}
</style>
