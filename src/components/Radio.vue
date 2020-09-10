<template>
  <span
    :class="{
      'ds-radio-component': true,
      'disabled': disabled
    }"
  >
    <div v-if="label" class="ds-label">{{ label }}</div>

    <div class="radio-container">
      <span
        :key="index"
        v-for="(radio, index) in list"
        class="ds-radio-wrapper"
      >
        <label class="ds-radio-body">
          <span
            class="ds-radio-container"
            :style="{
              backgroundColor: getRadioContainerColor(radio)
            }"
          >
          </span>

          <span :class="[{ 'ds-radio-circle': radioActive(radio) }]"></span>

          <span
            :class="[
              'ds-radio-text',
              {
                'ds-radio-text-active': radioActive(radio),
                'ds-radio-text-inactive': !radioActive(radio),
                'ds-radio-invalid': radioInvalid
              }
            ]"
            :style="{ marginRight: spaceBetweenItems }"
          >
            {{ radio.title }}
          </span>

          <input
            type="radio"
            name="default"
            :value="radio.title"
            v-model="radioValue"
            class="ds-radio-input"
          />
        </label>
      </span>
    </div>
  </span>
</template>

<script>
import _ from 'lodash';
import touch from './../mixins/touch';

export default {
  name: 'Radio',
  mixins: [touch],
  props: {
    value: null,
    list: Array,
    label: String,
    spaceBetweenItems: {
      type: String,
      default: '30px'
    },
    radioColor: {
      type: String,
      default: '#98A9BC'
    },
    objectMode: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validators: {
      type: Array,
      default: () => []
    },
    name: String,
    touchName: String
  },
  data: () => ({
    touched: false,
    validateEventName: undefined
  }),
  computed: {
    radioValue: {
      get() {
        return this.getRadioValue();
      },
      set(value) {
        this.$emit('input', this.setRadioValue(value));
      }
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
    radioInvalid() {
      return this.inputErrors.length && this.touched;
    }
  },
  methods: {
    getRadioValue() {
      return this.objectMode ? _.get(this.value, 'title') : this.value;
    },
    setRadioValue(value) {
      if (this.objectMode) {
        return this.list.find(item => item.title === value);
      } else {
        return value;
      }
    },
    radioActive(itemValue) {
      if (this.objectMode) {
        return _.get(this.value, 'id') === _.get(itemValue, 'id');
      } else {
        return this.value === itemValue.title;
      }
    },
    validate() {
      this.touched = true;
      this.$emit('validation', this.validation);
    },
    setTouched(touched) {
      this.touched = touched;
    },
    getRadioContainerColor(value) {
      if (this.radioInvalid) {
        return 'rgba(251, 69, 68, 0.15)';
      } else if (this.radioActive(value)) {
        return this.radioColor;
      } else {
        return '#E8ECEF';
      }
    }
  },
  mounted() {
    if (this.name) {
      this.validateEventName = `validate${this.name.charAt(0).toUpperCase() +
        this.name.slice(1).toLowerCase()}`;
      document.addEventListener(this.validateEventName, this.validate);
    } else {
      document.addEventListener('validate', this.validate);
    }
  },
  beforeDestroy() {
    if (this.name) {
      document.removeEventListener(this.validateEventName, this.validate);
    } else {
      document.removeEventListener('validate', this.validate);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-radio-component {
  .ds-label {
    font-size: 14px;
    line-height: 16px;
    font-family: @robotoLight;
    margin-bottom: 14px;
    color: @color-dark;
  }

  .radio-container {
    display: flex;
  }

  .ds-radio-wrapper {
    display: inline-flex;

    .ds-radio-body {
      display: inline-flex;
      align-items: center;
      position: relative;

      .ds-radio-container {
        height: 20px;
        width: 20px;
        border-radius: 10px;

        &.ds-radio-container-inactive {
          background-color: @color-gray-300;
        }

        &.ds-radio-container-active {
          background-color: @color-gray-400;
        }
      }

      .ds-radio-circle {
        display: inline-block;
        position: absolute;
        height: 8px;
        width: 8px;
        border-radius: 10px;
        background-color: @color-white;
        left: 6px;
      }

      .ds-radio-text {
        height: 16px;
        font-family: 'Roboto Light';
        font-size: 14px;
        line-height: 16px;
        margin-left: 10px;

        .ds-radio-text-active {
          color: @color-gray-500;
        }

        .ds-radio-text-inactive {
          color: @color-dark;
        }

        &.ds-radio-invalid {
          color: #fb4544;
        }
      }

      .ds-radio-input {
        display: none;
      }
    }

    &:last-child {
      .ds-radio-body {
        .ds-radio-text {
          margin-right: 0 !important;
        }
      }
    }
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.7;
  }
}
</style>
