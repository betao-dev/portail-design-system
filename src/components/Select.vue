<template>
  <div
    :class="['ds-select-wrapper', { 'ds-lg': lg, 'ds-md': md, 'ds-sm': sm }]"
    :style="{ width }"
  >
    <div v-if="label" class="ds-label">{{ label }}</div>
    <template v-if="customContent && value && value.id">
      <div class="ds-drop-content-wrapper">
        <slot :name="value.id"></slot>
      </div>
    </template>
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
    />
    <Icon
      v-else
      :source="
        openDropDownList && reversibleIcon ? 'expand_less' : 'expand_more'
      "
      color="gray-400"
      class="ds-drop-icon"
    />
    <input
      :class="[
        'ds-select',
        {
          'ds-input-error': checkError,
          'ds-error': isInvalidInput,
          'ds-valid': showValidCheck && validBacklight,
          'ds-input-custom': customContent
        }
      ]"
      type="text"
      ref="dsSelect"
      v-model="inputSelectValue"
      :placeholder="placeholder"
      :name="name"
      @click="toggleDropList"
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
      :opened.sync="openDropDownList"
      :position="dropdownPosition"
      :style="{ overflow: optionsOverflow }"
      :class="['ds-options', { 'ds-options-custom': customContent }]"
      just-fade
    >
      <div
        :class="[
          'ds-option-wrapper',
          { 'ds-option-wrapper-custom': customContent }
        ]"
        :style="{ ...optionStyles }"
        v-for="(option, index) in options"
        :key="index"
        @click="selectValue(option)"
      >
        {{ option.title }}
        <span v-if="!displayTitle">{{
          typeof option !== 'object' ? option : option.value
        }}</span>
        <template v-if="customContent">
          <slot :name="index + 1"></slot>
        </template>
      </div>
    </Dropdown>
  </div>
</template>

<script>
import _ from 'lodash';

import { cloneDeep, isEqual } from 'lodash';
import Dropdown from './Dropdown';
import Icon from './Icon';
import validation from './../mixins/validation';

export default {
  name: 'Select',
  components: { Dropdown, Icon },
  mixins: [validation],
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
    dataMode: Boolean
  },
  data() {
    return {
      openDropDownList: false,
      touched: false,
      helpVisible: false,
      inputSelectValue: undefined,
      validBacklight: false,
      invalidBacklight: false
    };
  },
  methods: {
    openDropList() {
      this.touched = true;
      this.openDropDownList = true;
      this.$emit('validation', this.validation);
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
    }
  },
  computed: {
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
          this.validators[i].validator(this.value)
        ]);
      }

      return data;
    },
    checkError() {
      return this.inputErrors.length && this.touched;
    },
    isInvalidInput() {
      return this.showInvalidBlock && this.invalidBacklight;
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

    this.$emit('validation', this.validation);
  },
  watch: {
    inputSelectValue(value) {
      if (this.dataMode) {
        this.$emit('input', { ...this.value, data: value });
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
        this.touched = true;
      }
    }
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
      padding: 12px 18px;

      &.ds-options-custom {
        top: 58px !important;
        padding: 12px 20px 15px;
        border: none;
      }

      .ds-option-wrapper {
        padding: 12px 0;
        line-height: 22px;

        &.ds-option-wrapper-custom {
          letter-spacing: 0;
          padding: 3px 0 3px;

          &:first-child {
            padding-top: 0;
          }

          &:last-child {
            padding-bottom: 0;
          }
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
    height: 16px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

      padding: 16px 116px 15px 16px;
      font-family: @robotoFont;

      .placeholder-input(@color-gray-400, @robotoFont, 0, 21px);
    }
  }

  .ds-drop-content-wrapper {
    cursor: pointer;
    position: absolute;
    pointer-events: none;
    top: 50%;
    margin-top: -20px;
    right: 50px;
  }

  .ds-drop-icon {
    cursor: pointer;
    position: absolute;
    pointer-events: none;
    right: 5px;
    bottom: 8px;
  }

  .ds-drop-icon-alt {
    cursor: pointer;
    position: absolute;
    pointer-events: none;
    top: 50%;
    margin-top: -9px;
    right: 16px;
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
}
</style>
