<template>
  <div
    class="ds-multi-select-dropdown-wrapper"
    :class="{ sm: sm, md: md, lg: lg }"
  >
    <div v-if="label" class="ds-label-text">{{ label }}</div>
    <input
      :class="['ds-multi-select', { 'ds-multi-select-error': checkError }]"
      type="text"
      ref="multiSelect"
      v-model="inputSelectValue"
      :placeholder="placeholder"
      @click="updateOpenState"
      readonly="readonly"
    />
    <Icon
      expand_more
      color="gray-400"
      class="ds-multi-select-icon"
      @click="updateOpenState"
    />
    <div class="ds-multi-select-error-message-wrapper" v-if="checkError">
      {{ multiSelectErrors[0] }}
    </div>
    <Dropdown
      :target="$refs.multiSelect"
      :opened.sync="openDropDownList"
      :position="dropDownPosition"
      class="ds-multi-select-container"
    >
      <div class="ds-multi-select-dropdown-content">
        <div
          class="ds-checkbox-container-wrapper"
          v-for="(option, index) in options"
          :key="index"
        >
          <label class="ds-checkbox-container">
            <input
              class="ds-checkbox-input"
              type="checkbox"
              :value="option"
              v-model="multiSelectValue"
            />
            <span class="ds-checkbox-text">{{
              idMode ? option.value : valueMode ? option : option.title
            }}</span>
            <span class="ds-checkbox-checkmark"></span>
          </label>
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script>
import { isEqual, cloneDeep } from 'lodash';
import Dropdown from './Dropdown';
import Icon from './Icon';

export default {
  name: 'MultiSelectDropdown',
  components: { Dropdown, Icon },
  props: {
    sm: Boolean,
    md: Boolean,
    lg: Boolean,
    value: null,
    options: Array,
    label: String,
    dropDownPosition: {
      type: String,
      default: 'bottom-middle'
    },
    idMode: {
      type: Boolean,
      default: false
    },
    valueMode: {
      type: Boolean,
      default: false
    },
    validators: Array,
    initValidation: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    inputSelectValue: undefined,
    touched: false,
    openDropDownList: false
  }),
  computed: {
    multiSelectValue: {
      get() {
        this.validate();
        return this.value || [];
      },
      set(value) {
        let deselectIndex = -1;

        this.options.forEach(option => {
          if (option.deselectAll) {
            deselectIndex = value.findIndex(val => isEqual(val, option));
          }
        });

        if (~deselectIndex) {
          if (deselectIndex === value.length - 1) {
            value = [value[deselectIndex]];
          } else {
            value.splice(deselectIndex, 1);
          }
        }

        this.touched = true;
        this.inputSelectValue = this.calcInputSelectValue(value);
        this.$emit('input', value);
      }
    },
    validation() {
      if (!this.validators || !this.validators.length) {
        return [];
      }

      let data = [];
      for (let i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.inputSelectValue)
        ]);
      }

      return data;
    },
    multiSelectErrors() {
      let errors = [];

      for (let i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message);
        }
      }

      return errors;
    },
    checkError() {
      return this.multiSelectErrors.length && this.touched;
    }
  },
  methods: {
    updateOpenState() {
      this.openDropDownList = !this.openDropDownList;
    },
    calcInputSelectValue(multiSelectValue) {
      if (Array.isArray(multiSelectValue)) {
        if (this.idMode) {
          return multiSelectValue.map(value => value.value);
        } else if (this.valueMode) {
          return multiSelectValue;
        } else {
          return multiSelectValue.map(value => value.title);
        }
      } else {
        return multiSelectValue;
      }
    },
    validate() {
      if (this.initValidation || this.touched) {
        this.$emit('validation', this.validation);
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
  mounted() {
    this.inputSelectValue = this.calcInputSelectValue(this.multiSelectValue);
  },
  watch: {
    value(val) {
      this.$emit('validation', this.validation);
      this.inputSelectValue = this.calcInputSelectValue(val);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-multi-select-dropdown-wrapper {
  position: relative;
  width: 252px;

  &.md {
    input.ds-multi-select {
      height: 42px;
    }

    .ds-multi-select-icon {
      top: 8px;
    }

    .ds-label-text ~ .ds-multi-select-icon {
      top: 28px;
    }
  }

  &.sm {
    input.ds-multi-select {
      height: 38px;
    }
  }

  &.lg {
    input.ds-multi-select {
      height: 52px;
    }

    .ds-multi-select-icon {
      top: 14px;
    }

    .ds-label-text ~ .ds-multi-select-icon {
      top: 34px;
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

  .ds-multi-select {
    .font-desktop-small-regular-dark();
    padding: 7px 25px 7px 12px;
    box-sizing: border-box;
    border: 1px solid @color-gray-300;
    border-radius: 2px;
    background-color: @color-white;
    cursor: pointer;
    width: 100%;

    &:focus:not(.ds-error) {
      border-color: @color-primary;
    }
    &:focus {
      outline: none;
    }

    &.ds-multi-select-error {
      border: 1px solid @color-red;
    }
  }

  .ds-multi-select-icon {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 6px;
  }

  .ds-label-text ~ .ds-multi-select-icon {
    top: 26px;
  }

  .ds-multi-select-error-message-wrapper {
    width: 100%;
    font-size: 12px;
    color: @color-red;
    position: absolute;
  }

  .ds-multi-select-container {
    left: 0;
    right: 0;
  }

  .ds-multi-select-dropdown-content {
    display: block;
    border-radius: 2px;
    box-shadow: @dropdown-shadow;
    padding: 24px 20px;
    background: white;

    .ds-checkbox-container-wrapper {
      &:last-child {
        .ds-checkbox-container {
          margin-bottom: 0;
        }
      }

      .ds-checkbox-container {
        display: block;
        position: relative;
        padding-left: 32px;
        margin-bottom: 24px;
        color: @color-dark;
        cursor: pointer;
        line-height: 20px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        /* Hide the browser's default checkbox */
        .ds-checkbox-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;

          /* When the checkbox is checked, add a blue background */
          &:checked {
            ~ .ds-checkbox-checkmark {
              background-color: #e8ecef;
              border-color: rgba(0, 0, 0, 0);

              /* Show the ds-checkbox-checkmark when checked and apply styles the ds-checkbox-checkmark/indicator */
              &:after {
                display: block;
                left: 7px;
                top: 3px;
                width: 4px;
                height: 8px;
                border: solid #1eb386;
                border-width: 0 2px 2px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
              }
            }
          }
        }

        /* Create a custom checkbox */
        .ds-checkbox-checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          border-radius: 2px;
          background-color: #e8ecef;
          box-sizing: border-box;

          /* Create the ds-checkbox-checkmark/indicator (hidden when not checked) */
          &:after {
            content: '';
            position: absolute;
            display: none;
          }
        }

        .ds-checkbox-text {
          font-size: 14px;
          line-height: 16px;
          color: #1b1e24;
          font-family: Roboto, sans-serif;
        }
      }
    }
  }
}
</style>
