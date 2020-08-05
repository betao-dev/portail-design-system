<template>
  <div class="ds-multi-select-dropdown-wrapper">
    <div v-if="label" class="ds-label-text">
      {{ label }}
    </div>
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
        <Input
          class="ds-search-wrapper"
          type="text"
          placeholder="Search for a client"
          v-model="searchStr"
        />
        <div
          class="ds-checkbox-container-wrapper"
          v-for="(option, index) in filteredOptions"
          :key="index"
        >
          <label class="ds-checkbox-container">
            <input
              class="ds-checkbox-input"
              type="checkbox"
              :value="option"
              v-model="multiSelectValue"
            />
            <div class="ds-visible-values">
              <div class="ds-checkbox-text">{{ getTitle(option) }}</div>
              <div class="ds-additions">
                {{ getAddress(option) }}, {{ getZipCode(option) }}
                {{ getCity(option) }}
              </div>
            </div>
            <Star v-if="getRating(option)" :value="getRating(option)" />
            <span class="ds-checkbox-checkmark"></span>
          </label>
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script>
import { isEqual, cloneDeep, get, isEmpty } from 'lodash';
import Dropdown from './Dropdown';
import Icon from './Icon';
import Star from './Star';
import Input from './Input';

export default {
  name: 'FilterSelect',
  components: { Dropdown, Icon, Star, Input },
  props: {
    value: null,
    options: Array,
    optionTitleIndex: String,
    optionRatingIndex: String,
    optionAddressIndex: String,
    optionZipCodeIndex: String,
    optionCityIndex: String,
    label: String,
    dropDownPosition: {
      type: String,
      default: 'default'
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
    openDropDownList: false,
    searchStr: '',
    filteredOptions: []
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
      return (
        (Array.isArray(multiSelectValue) &&
          multiSelectValue.map(value => this.getTitle(value))) ||
        ''
      );
    },
    getTitle(option) {
      return get(option, this.optionTitleIndex);
    },
    getRating(option) {
      return get(option, this.optionRatingIndex);
    },
    getAddress(option) {
      return get(option, this.optionAddressIndex);
    },
    getZipCode(option) {
      return get(option, this.optionZipCodeIndex);
    },
    getCity(option) {
      return get(option, this.optionCityIndex);
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
    this.filteredOptions = [...this.options];
  },
  watch: {
    value(val) {
      this.$emit('validation', this.validation);
      this.inputSelectValue = this.calcInputSelectValue(val);
    },
    options(value) {
      if (!isEmpty(value)) {
        this.filteredOptions = [...this.options];
      }
    },
    searchStr(value) {
      this.filteredOptions = this.options.filter(option =>
        this.getTitle(option)
          .toLowerCase()
          .includes(value)
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-multi-select-dropdown-wrapper {
  position: relative;
  width: 400px;

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
  }

  .ds-label-text ~ .ds-multi-select-icon {
    top: 26px;
  }

  .ds-multi-select-icon {
    top: 6px;
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
    padding: 15px;
    background: white;

    .ds-search-wrapper {
      width: 100%;
      margin-bottom: 10px;
    }

    .ds-checkbox-container-wrapper {
      /* Customize the label (the ds-checkbox-container) */
      .ds-checkbox-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        color: @color-dark;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .ds-visible-values {
          .ds-additions {
            font-size: 12px;
          }
        }

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
              background-color: @color-primary;
              border-color: rgba(0, 0, 0, 0);

              /* Show the ds-checkbox-checkmark when checked and apply styles the ds-checkbox-checkmark/indicator */
              &:after {
                display: block;
                left: 6px;
                top: 2px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
              }
            }

            ~ .ds-checkbox-text {
              color: @color-primary;
            }
          }
        }

        /* Create a custom checkbox */
        .ds-checkbox-checkmark {
          position: absolute;
          left: 0;
          height: 20px;
          width: 20px;
          border: 2px solid @color-gray-500;
          border-radius: 2px;
          background-color: @color-white;

          /* Create the ds-checkbox-checkmark/indicator (hidden when not checked) */
          &:after {
            content: '';
            position: absolute;
            display: none;
          }
        }

        .ds-checkbox-text {
          font-size: 16px;
        }
      }

      &:hover {
        background-color: @color-gray-200;
      }
    }
  }
}
</style>
