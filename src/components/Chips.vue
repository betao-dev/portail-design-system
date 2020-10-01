<template>
  <div :class="['ds-chips-wrapper', { 'ds-chips-wrapper-alt': alt }]">
    <div
      :class="[
        'ds-chips-container',
        {
          'ds-chips-container-active': active,
          'ds-chips-container-error': error,
          'ds-chips-container-valid-backlight':
            showValidCheck && validBacklight,
          'ds-chips-container-invalid-backlight':
            showInvalidBlock && invalidBacklight
        }
      ]"
      :style="{ paddingRight: getPaddingRight }"
    >
      <div
        v-if="label"
        :class="[
          'ds-chips-label',
          { 'ds-chips-label-active': active, 'ds-chips-label-error': error }
        ]"
      >
        {{ label }}
      </div>

      <span
        :class="['ds-chips', { 'ds-new-chips': newChip }]"
        tabindex="0"
        @focus="onFocusChips(index)"
        @blur="onBlurChips(index)"
        :key="index"
        v-for="(title, index) in valueWrapper"
      >
        <span class="ds-chip-title">
          {{ title }}
        </span>

        <Icon
          :class="[
            'ds-chips-icon',
            { 'ds-chips-icon-selected': index === selectedChips }
          ]"
          close
          :color="getIconColor"
          v-if="removable"
          @click="onRemove(index)"
        >
        </Icon>
      </span>

      <input
        class="ds-chips-input"
        v-bind="inputAttrs"
        type="text"
        ref="chip-input"
        v-model="newChip"
        @focus="onFocusInput"
        @blur="onBlurInput"
        @keypress="onKeyPress"
        @keydown="onKeyDown"
        @click="onInputClick"
      />
    </div>
    <template v-if="isRight">
      <div class="ds-right-wrapper">
        <slot name="right"></slot>
      </div>
    </template>
    <div v-if="error" class="ds-chips-errors">
      <span v-if="error" class="ds-error-message">
        {{ inputErrors[0] }}
      </span>
    </div>

    <template v-if="searchable">
      <div class="ds-search-wrapper">
        <slot name="search"></slot>
      </div>
    </template>
  </div>
</template>

<script>
import Icon from './Icon';
import validation from './../mixins/validation';

export default {
  name: 'Chips',
  components: { Icon },
  mixins: [validation],
  props: {
    value: null,
    label: String,
    placeholder: String,
    removable: Boolean,
    searchable: {
      default: false,
      type: Boolean
    },
    validators: Array,
    showErrors: {
      type: Boolean,
      default: true
    },
    alt: Boolean,
    paddingRight: {
      type: String,
      default: '185px'
    },
    showCorrectCheck: {
      type: Boolean,
      default: true
    },
    showValidations: {
      type: Boolean,
      default: true
    },
    name: String
  },
  data: () => ({
    selectedChips: -1,
    newChip: '',
    valueWrapper: [],
    active: false,
    touched: false,
    validBacklight: false,
    invalidBacklight: false,
    validateEventName: undefined
  }),
  methods: {
    onFocusChips(index) {
      this.selectedChips = index;
    },
    onBlurChips() {
      this.selectedChips = -1;
    },
    onFocusInput() {
      this.active = true;
    },
    onBlurInput() {
      this.touched = true;
      this.active = false;
      this.addNewChip();
    },
    hasElement(el) {
      while (el.parentNode) {
        if (el === this.$el || el === this.targetElement) {
          return true;
        }
        el = el.parentNode;
      }
      return false;
    },
    outSideClick(e) {
      if (this.hasElement(e.target)) {
        return;
      }

      this.$emit('update:searchable', false);
    },
    onInputClick() {
      this.$emit('update:searchable', true);
    },
    setTouchEmitValidation() {
      this.touched = true;
      this.$emit('validation', this.validation);
    },
    onRemove(index) {
      this.valueWrapper.splice(index, 1);
      this.setTouchEmitValidation();
      this.$emit('input', this.valueWrapper);
      this.$emit('update:chips', this.valueWrapper);
    },
    onKeyPress(event) {
      let charCode = this.getCharCode(event);

      if (charCode === 32 || charCode === 13) {
        event.preventDefault();
        this.addNewChip();
      }
    },
    onKeyDown(event) {
      let charCode = this.getCharCode(event);

      if (charCode === 8 && this.newChip.length === 0) {
        this.removeChip();
      }
    },
    getCharCode(event) {
      event = event ? event : window.event;
      return event.which ? event.which : event.keyCode;
    },
    addNewChip() {
      if (
        this.newChip &&
        (!this.alt || (this.alt && this.checkValueValidation(this.newChip)))
      ) {
        this.valueWrapper = this.valueWrapper.concat(this.newChip);
        this.newChip = '';
        this.setTouchEmitValidation();
        this.$emit('input', this.valueWrapper);
        this.$emit('update:chips', this.valueWrapper);
      }
    },
    removeChip() {
      this.valueWrapper.pop();
      this.setTouchEmitValidation();
      this.$emit('input', this.valueWrapper);
      this.$emit('update:chips', this.valueWrapper);
    },
    checkValueValidation(value) {
      return this.validators.every(
        validator => validator.validator(value) === true
      );
    }
  },
  computed: {
    getPaddingRight() {
      return this.isRight && this.paddingRight;
    },
    error() {
      return this.inputErrors.length && this.touched && this.showErrors;
    },
    validation() {
      if (!this.validators || !this.validators.length) {
        return [];
      }

      let data = [];

      let requiredValidatorIndex = this.validators.findIndex(
        validator => validator.name === 'required'
      );

      if (~requiredValidatorIndex) {
        data.push([
          this.validators[requiredValidatorIndex].name,
          this.validators[requiredValidatorIndex].validator(this.valueWrapper),
          this.validators[requiredValidatorIndex].message
        ]);
      }

      for (let i = 0; i < this.validators.length; i++) {
        let invalid = false;
        for (let j = 0; j < this.valueWrapper.length; j++) {
          if (
            !invalid &&
            !this.validators[i].validator(this.valueWrapper[j]) &&
            this.validators[i].name !== 'required'
          ) {
            data.push([
              this.validators[i].name,
              this.validators[i].validator(this.valueWrapper[j]),
              this.validators[i].message
            ]);
            invalid = true;
          }
        }
      }

      return data;
    },
    inputErrors() {
      let errors = [];

      for (let i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validation[i][2]);
        }
      }

      return errors;
    },
    inputAttrs() {
      return {
        placeholder: this.placeholder
      };
    },
    getIconColor() {
      return '#98A9BC';
    },
    isRight() {
      return this.$slots.right;
    }
  },
  mounted() {
    document.addEventListener('click', this.outSideClick, true);

    if (this.name) {
      this.validateEventName = `validate${this.name.charAt(0).toUpperCase() +
        this.name.slice(1).toLowerCase()}`;
      document.addEventListener(this.validateEventName, this.validate);
    } else {
      document.addEventListener('validate', this.validate);
    }

    this.$emit('validation', this.validation);

    if (this.alt && this.value && this.value.length > 0) {
      this.value.forEach(val => {
        if (this.checkValueValidation(val)) {
          this.valueWrapper = this.valueWrapper.concat(val);
        }
      });
    }
  },
  beforeDestroy() {
    if (this.name) {
      document.removeEventListener(this.validateEventName, this.validate);
    } else {
      document.removeEventListener('validate', this.validate);
    }
  },
  watch: {
    value(val) {
      this.valueWrapper = val;
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';
@import '../styles/mixins';

.chips-container-general() {
  &.ds-chips-container-active {
    border-bottom: solid 1px @color-primary;
  }

  &.ds-chips-container-error {
    border-bottom: solid 1px @color-red;
  }

  &.ds-chips-container-valid-backlight {
    .input-valid-fade-animation();
  }

  &.ds-chips-container-invalid-backlight {
    .input-invalid-fade-animation();
  }
}

.ds-chips-wrapper {
  position: relative;

  .ds-chips-container {
    cursor: text;
    padding-bottom: 5px;
    border: solid 1px #e8ecef;
    border-radius: 3px;
    padding: 0 10px;
    background-color: white;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 42px;

    .ds-chips-label {
      color: @color-gray-500;
      font-family: Roboto, sans-serif;
      font-size: 12px;
      cursor: default;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.ds-chips-label-active {
        // color: @color-primary;
      }

      &.ds-chips-label-error {
        color: @color-red;
      }
    }

    .ds-chips {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: default;
      padding: 4px 8px 4px 10px;
      margin: 4px 10px 4px 0;
      border-radius: 2px;
      background-color: @color-gray-300;
      color: @color-gray-500;

      .ds-chip-title {
        font-size: 16px;
        font-family: Roboto, 'Helvetica Neue', sans-serif;
      }

      .ds-chips-icon {
        vertical-align: middle;
        cursor: pointer;

        &.ds-chips-icon-selected {
          fill: @color-white !important;
        }
      }

      &:focus {
        color: @color-white;
        outline: none;
      }
    }

    .ds-chips-input {
      padding: 12px 0 12px;
      border: none;
      background-color: transparent;
      flex-grow: 1;
      flex-shrink: 0;
      width: 30px;
      font-size: 14px;
      color: @color-dark;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: @color-gray-400;
      }
    }

    .chips-container-general();
  }

  .ds-chips-errors {
    font-size: 12px;
    color: @color-red;
  }

  .ds-search-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  &.ds-chips-wrapper-alt {
    .ds-chips-container {
      border: none;
      border-bottom: 1px solid @color-gray-300;
      border-radius: 0.5px;
      padding: 0;
      min-height: 36px;

      .ds-chips-label {
        margin-right: 8px;
        height: 16px;
        color: @color-gray-400;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 16px;
        padding-bottom: 2px;
      }

      .ds-chips-input {
        padding: 0;
        color: @color-dark;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 21px;
      }

      .ds-chips {
        background-color: unset;
        color: @color-primary;
        font-family: Roboto, sans-serif;
        margin: 0 3px 0 0;
        padding: 0;

        .ds-chip-title {
          font-size: 14px;
          letter-spacing: 0;
          line-height: 21px;
        }

        &:not(:last-of-type) {
          &::after {
            content: ',';
          }
        }

        &.ds-new-chips {
          &::after {
            content: ',';
          }
        }
      }

      .chips-container-general();
    }

    .ds-chips-errors {
      width: 100%;
      font-size: 11px;
      position: absolute;
      padding: 6px 0 0;
      line-height: normal;
      font-family: Roboto, sans-serif;
    }

    .ds-right-wrapper {
      position: absolute;
      top: 5px;
      right: 0;
    }
  }
}
</style>
