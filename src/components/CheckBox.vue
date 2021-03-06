<template>
  <span
    :class="[
      'ds-checkbox-component-wrapper',
      {
        'ds-checkbox-disabled': disabled,
        'ds-checkbox-invalid': checkboxInvalid
      }
    ]"
  >
    <label
      :class="[
        'ds-checkbox-wrapper',
        { 'ds-checkbox-text-through-wrapper': textThrough }
      ]"
    >
      <span
        class="ds-checkbox-container"
        :class="{
          'ds-checkbox-container-inactive': !checkboxValue && !textThrough,
          'ds-checkbox-container-active': checkboxValue,
          'ds-checkbox-container-text-through-inactive':
            !checkboxValue && textThrough
        }"
      >
      </span>

      <Icon
        v-if="checkboxValue"
        check_box
        size="11px"
        class="ds-checkbox-icon"
      />

      <span
        class="ds-checkbox-text"
        :class="{
          'ds-checkbox-text-active':
            checkboxValue && !boldLabel && !textThrough,
          'ds-checkbox-text-inactive':
            !checkboxValue && !boldLabel && !textThrough,
          'ds-checkbox-text-bold': boldLabel,
          'ds-checkbox-text-through-active': checkboxValue && textThrough,
          'ds-checkbox-text-through-inactive': !checkboxValue && textThrough,
          'ds-checkbox-text-slot': isLabelSlot
        }"
      >
        <span v-if="!isLabelSlot" class="ds-main-label">{{ label }}</span>
        <slot></slot>
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
      </span>

      <input
        type="checkbox"
        v-model="checkboxValue"
        class="ds-checkbox-input"
      />
    </label>
  </span>
</template>

<script>
import Icon from './Icon';
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

import touch from './../mixins/touch';

export default {
  name: 'CheckBox',
  mixins: [touch],
  components: { Icon, Popper },
  props: {
    value: Boolean,
    label: String,
    boldLabel: Boolean,
    help: String,
    autoInit: {
      type: Boolean,
      default: true
    },
    textThrough: Boolean,
    disabled: Boolean,
    validators: {
      type: Array,
      default: () => []
    },
    name: String,
    touchName: String
  },
  data: () => ({
    offset: { offset: '0, 10px' },
    touched: false
  }),
  computed: {
    checkboxValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    isLabelSlot() {
      return !!this.$slots.default;
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
    checkboxInvalid() {
      return this.inputErrors.length && this.touched;
    }
  },
  methods: {
    validate() {
      this.touched = true;
      this.$emit('validation', this.validation);
    },
    setTouched(touched) {
      this.touched = touched;
    }
  },
  mounted() {
    if (this.autoInit) {
      this.$nextTick(() => {
        this.$emit('input', this.checkboxValue);
      });
    }

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

.ds-checkbox-component-wrapper {
  .ds-checkbox-wrapper {
    display: inline-flex;
    align-items: center;
    position: relative;

    .ds-checkbox-container {
      display: inline-block;
      cursor: pointer;
      height: 20px;
      width: 20px;
      min-width: 20px;
      min-height: 20px;
      border-radius: 2px;

      &.ds-checkbox-container-active {
        background-color: rgba(30, 179, 134, 0.15);
      }

      &.ds-checkbox-container-inactive {
        background-color: @color-gray-300;
      }
    }

    .ds-checkbox-icon {
      position: absolute;
      left: 5px;
    }

    .ds-checkbox-text {
      height: 16px;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;

      &.ds-checkbox-text-active {
        font-family: 'Roboto Light';
        color: @color-dark;
        margin-left: 10px;
      }

      &.ds-checkbox-text-inactive {
        font-family: 'Roboto Light';
        color: @color-gray-500;
        margin-left: 10px;
      }

      &.ds-checkbox-text-bold {
        color: #1b1e24;
        font-family: Roboto, sans-serif;
        margin-left: 12px;
      }

      .ds-help-label {
        cursor: pointer;
        color: @color-gray-500;
        font-family: Roboto, sans-serif;
        font-size: 12px;
        line-height: 14px;
        margin-left: 5px;

        &::v-deep {
          .popper {
            background-color: @color-gray-500;
            border-radius: 2px;
            color: @color-white;
            border: solid 1px @color-gray-500;
            font-family: @font-family;
            font-size: 12px;
            line-height: 16px;
            padding: 16px;
            position: relative;
            text-align: left;
            box-shadow: none;
            margin-top: 10px;
            margin-bottom: 10px;
            max-width: 330px;
            min-width: 300px;
            width: auto;
            white-space: initial;

            &[x-placement^='bottom'] {
              [x-arrow] {
                &:before {
                  content: '';
                  position: absolute;
                  left: -10px;
                  top: -5px;
                  border-bottom: 15px solid @color-gray-500;
                  border-right: 15px solid transparent;
                  border-left: 15px solid transparent;
                  z-index: 1;
                }

                &:after {
                  content: '';
                  position: absolute;
                  left: -10px;
                  top: -5px;
                  border-bottom: 15px solid @color-gray-500;
                  border-right: 15px solid transparent;
                  border-left: 15px solid transparent;
                  z-index: 2;
                }
              }
            }

            &[x-placement^='top'] {
              [x-arrow] {
                &:before {
                  content: '';
                  position: absolute;
                  left: -10px;
                  bottom: -5px;
                  border-top: 15px solid @color-gray-500;
                  border-right: 15px solid transparent;
                  border-left: 15px solid transparent;
                  z-index: 1;
                }

                &:after {
                  content: '';
                  position: absolute;
                  left: -10px;
                  bottom: -5px;
                  border-top: 15px solid @color-gray-500;
                  border-right: 15px solid transparent;
                  border-left: 15px solid transparent;
                  z-index: 2;
                }
              }
            }

            &[x-placement^='left'] {
              [x-arrow] {
                &:before {
                  content: '';
                  position: absolute;
                  top: -5px;
                  right: -10px;
                  border-left: 15px solid @color-gray-500;
                  border-top: 15px solid transparent;
                  border-bottom: 15px solid transparent;
                  z-index: 1;
                }

                &:after {
                  content: '';
                  position: absolute;
                  top: -10px;
                  right: -5px;
                  border-left: 15px solid @color-gray-500;
                  border-top: 15px solid transparent;
                  border-bottom: 15px solid transparent;
                  z-index: 2;
                }
              }
            }

            &[x-placement^='right'] {
              [x-arrow] {
                &:before {
                  content: '';
                  position: absolute;
                  top: -10px;
                  left: -5px;
                  border-right: 15px solid @color-gray-500;
                  border-top: 15px solid transparent;
                  border-bottom: 15px solid transparent;
                  z-index: 1;
                }

                &:after {
                  content: '';
                  position: absolute;
                  top: -10px;
                  left: -5px;
                  border-right: 15px solid @color-gray-500;
                  border-top: 15px solid transparent;
                  border-bottom: 15px solid transparent;
                  z-index: 2;
                }
              }
            }
          }
        }
      }

      &.ds-checkbox-text-slot {
        margin-left: 0;
      }
    }

    .ds-checkbox-input {
      display: none;
    }

    &.ds-checkbox-text-through-wrapper {
      align-items: flex-start;

      .ds-checkbox-icon {
        top: 5px;
      }

      .ds-checkbox-container-text-through-inactive {
        background-color: @color-white;
      }

      .text-through() {
        height: unset;
        display: flex;
        align-items: baseline;
        font-family: 'Roboto Light';
        font-size: 14px;
        font-weight: 300;
        letter-spacing: 0;
        line-height: 20px;
        margin-left: 10px;
      }

      .ds-checkbox-text-through-active {
        .text-through();
        color: @color-gray-500;
        text-decoration: line-through;
      }

      .ds-checkbox-text-through-inactive {
        .text-through();
        color: @color-dark;
      }

      .ds-checkbox-text-slot {
        margin-left: 0;
      }
    }
  }

  &.ds-checkbox-disabled {
    pointer-events: none;
  }

  &.ds-checkbox-invalid {
    .ds-checkbox-wrapper {
      .ds-checkbox-container {
        background-color: rgba(251, 69, 68, 0.15);
      }

      .ds-main-label {
        color: #fb4544;
      }
    }
  }
}
</style>
