<!--
  A styled input with an ability to set icon and validation

  Usage:

    <Input
      :placeholder='Placeholder' - Text displayed as placeholder value
      :type='email'              - Input type
      :validators='validators'   - Array of validators
      :top-title='Title'         - Title at the top
      :disabled='true'           - Disables input
      :icon='search'             - Icon name on the right of the input
      :help='Some help text'     - Shown when hovering help icon
      :bottom-help='bottomHelp'  - Object of bottom help
      v-model='value'            - Binds value property to input
      @validation                - Emits whether input has errors
    />

  Properties:

    placeholder - String. Sets html input tag's placeholder

    type - String. Sets html input tag's type

    validators - Array[Object]. Array of validator Objects. Each Object must have two fields:
      message (String) - Error message that will be displayed if a validation failed.
      validator (function) - Function that takes input value as an argument and implements
        validation logic.

    topTitle - String. Text that will be displayed as a label for input.

    disabled - Boolean. Defines if an input is disabled.

    icon - String (icon name or <svg>...</svg> code). Sets the icon displayed in the input
      on the right

    help - String or html code. When set this will add a help icon on the right of the input
      which when hovered will display a tooltip with received prop content.

    bottomHelp - Object. Will display a help text with a tooltip on hover at the bottom of the input.
      Object must contain two fields:
      label (String) - Text of help label.
      text (String or html code) - Content of the tooltip

  Events:

    validation - Emitted when an input value changes. Emits true/false which tells if an input has
      validation errors.
-->

<template>
  <div class="input-component-wrapper">
    <div v-if="topTitle" class="top-title">{{topTitle}}</div>
    <div class="input-field-wrapper">
      <div :class="['inner-wrapper', {'has-icon-help': help}]">
        <input
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="{
            'has-icon': rightIcon,
            'error': errors.length
          }"
          v-model="inputValue"
        />
        <Icon
          v-if="rightIcon"
          class="icon-right"
          :source="rightIcon"
        />
      </div>
      <div class="icon-help-wrapper"
        @mouseover="tooltipVisible = true"
        @mouseleave="tooltipVisible = false"
      >
        <Icon
          v-if="help"
          class="icon-help"
          source="help"
        />
        <Tooltip v-html="help" :visible="tooltipVisible"></Tooltip>
      </div>
    </div>
    <div v-if="bottomHelp" class="bottom-help-wrapper">
      <span
        class="bottom-help"
        @mouseover="tooltipBottomVisible = true"
        @mouseleave="tooltipBottomVisible = false"
      >{{`? ${bottomHelp.label}`}}</span>
      <Tooltip v-html="bottomHelp.text" :visible="tooltipBottomVisible"></Tooltip>
    </div>
    <ul class="error-list" v-if="errors.length">
      <li class="error-message" v-for="error in errors">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from './Icon'
import Tooltip from './Tooltip'
import {COLORS} from '../styles/vars'

export default {
  name: "Input",
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    validators: {
      type: Array,
      default: () => []
    },
    topTitle: String,
    disabled: Boolean,
    icon: String,
    help: String,
    bottomHelp: Object
  },
  components: {Tooltip, Icon},
  data: () => ({
    COLORS,
    tooltipVisible: false,
    tooltipBottomVisible: false
  }),
  mounted() {
    this.$emit('validation', !!this.errors.length)
  },
  computed: {
    rightIcon () {
      return this.disabled ? 'lock' : this.icon
    },
    errors () {
      if (this.validators.length) {
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
        return this.value
      },
      set(value) {
        this.$emit('validation', !!this.errors.length)
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.input-component-wrapper {
  display: inline-block;
  position: relative;

  .error-list {
    margin: 0;
    list-style: none;
    color: @color-red;
    font-size: 14px;
    padding-left: 10px;
  }

  .top-title {
    .font-desktop-small-regular-gray-right();
    line-height: 2;
    text-align: left;
  }

  .input-field-wrapper {
    display: flex;
    align-items: center;

    .icon-help-wrapper {
      position: relative;

      .icon-help {
        cursor: pointer;
        fill: @color-gray-400!important;

        &:hover {
          fill: @color-dark!important;
        }
      }
    }

    .inner-wrapper {
      display: inline-block;
      position: relative;
      width: 100%;

      &.has-icon-help {
        margin-right: 10px;
      }

      input {
        .font-desktop-body-regular-dark();
        padding: 8px 10px;
        border-radius: @input-border-radius;
        border: 1px solid @color-gray-200;
        width: 100%;
        box-sizing: border-box;

        @media @screen-large {
          font-size: 14px;
        }

        &.has-icon {
          padding-right: 40px;
        }

        &.error {
          border-color: @color-red;
        }

        &:disabled {
          user-select: none;
        }

        &:focus:not(.error) {
          border-color: @color-primary;
        }

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: @color-gray-500;
        }
      }

      .icon-right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        fill: @color-gray-400!important;
      }

      .icon-right {
        right: 8px;
      }
    }
  }

  .bottom-help-wrapper {
    display: inline-block;
    position: relative;
    padding-left: 10px;

    .bottom-help {
      .font-desktop-x-small-regular-gray();
      border-bottom: 1px dashed @color-gray-500;
      cursor: pointer;

      &:hover {
        color: @color-dark;
      }
    }
  }
}
</style>
