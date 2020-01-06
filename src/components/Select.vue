<template>
  <div :class="['ds-select-wrapper', {'ds-lg': lg, 'ds-md': md, 'ds-sm': sm}]">
    <div v-if="label" class="ds-label">{{ label }} {{ required ? '*' : ''}}</div>
    <Icon :source="openDropDownList && reversibleIcon ? 'expand_less' : 'expand_more'"
          color="gray-400"
          class="ds-drop-icon"/>
    <input
      :class="['ds-select', {
        'ds-error': checkError,
        'ds-valid': !checkError && touched,
      }]"
      type="text"
      ref="dsSelect"
      v-model="inputSelectValue"
      :placeholder="placeholder"
      :name="name"
      @click="toggleDropList"
      readonly="readonly"
    />
    <div class="ds-error-message-wrapper" v-if="checkError">
      {{selectErrors[0]}}
    </div>
    <div v-if="help && !checkError"
         class="ds-select-help"
         ref="helpLabel"
         @mouseover="helpVisible = true">
      {{helpLabel}}
      <Dropdown :target="$refs.helpLabel" :opened.sync="helpVisible" just-fade>
        <Tooltip v-html="help"/>
      </Dropdown>
    </div>

    <Dropdown
      :target="$refs.dsSelect"
      :opened.sync="openDropDownList"
      :position="dropdownPosition"
      :style="{overflow: optionsOverflow}"
      class="ds-options"
    >
      <div
        class="ds-option-wrapper"
        v-for="(option, index) in options"
        :key="index"
        @click="selectValue(option)"
      >
        {{option.title}} <span v-if="!displayTitle">{{option.value}}</span>
      </div>
    </Dropdown>
  </div>
</template>

<script>
  import _ from 'lodash';

  import { cloneDeep, isEqual } from 'lodash'
  import Dropdown from './Dropdown'
  import Icon from './Icon'

  export default {
    name: 'Select',
    components: { Dropdown, Icon },
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
        default: "default"
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
      }
    },
    data() {
      return {
        openDropDownList: false,
        touched: false,
        helpVisible: false,
        inputSelectValue: undefined
      }
    },
    methods: {
      openDropList() {
        this.touched = true
        this.openDropDownList = true
        this.$emit('validation', this.validation)
      },
      toggleDropList() {
        this.openDropDownList = !this.openDropDownList
        this.$emit('validation', this.validation)
      },
      selectValue(option) {
        this.setInputSelectValue(option)
        this.$emit('input', option)
        this.$emit('change', option)
        this.openDropDownList = false
      },
      validate() {
        this.touched = true
        this.$emit('validation', this.validation)
      },
      setInputSelectValue(value) {
        if (this.idMode) {
          const selectedOption = this.options.find(option => option.id ===  _.get(value, 'id'))
          this.inputSelectValue = selectedOption ? selectedOption.value : ''
        } else if (this.valueMode) {
          const selectedOption = this.options.find(option => option === value)
          this.inputSelectValue = selectedOption || ''
        } else if (typeof value === 'object' && value) {
          const selectedOption = this.options.find(option => isEqual(option, value))
          this.inputSelectValue = selectedOption ? selectedOption.title : ''
        }
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
      setTouched(touched) {
        this.touched = touched
      }
    },
    computed: {
      validation() {
        if (!this.validators || !this.validators.length) {
          return []
        }

        let data = []
        for (let i = 0; i < this.validators.length; i++) {
          data.push([
            this.validators[i].name,
            this.validators[i].validator(this.value)
          ])
        }

        return data
      },
      selectErrors() {
        let errors = []
        for (let i = 0; i < this.validation.length; i++) {
          if (!this.validation[i][1]) {
            errors.push(this.validators[i].message)
          }
        }
        return errors
      },
      checkError() {
        return this.selectErrors.length && this.touched
      }
    },
    mounted() {
      this.setInputSelectValue(this.value)

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

      document.addEventListener('validate', this.validate);
      this.$emit('validation', this.validation)
    },
    watch: {
      value(val) {
        this.$emit('validation', this.validation)
        this.setInputSelectValue(val)
      },
      options() {
        if (this.value) {
          this.$emit('validation', this.validation)
          this.setInputSelectValue(this.value)
        }
      },
      openDropDownList(newVal, oldVal) {
        if (!newVal && oldVal) {
          this.touched = true
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-select-wrapper {
    position: relative;
    width: 252px;
    text-align: left;

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

      &:focus:not(.ds-error) {
        border-color: @color-primary;
      }
      &:focus {
        outline: none;
      }

      &.ds-error {
        border: 1px solid @color-red;
        background-color: #ffedec;
      }

      &.ds-valid {
        border-color: @color-primary;
        background-color: #e9f8f3;
      }
    }

    .ds-drop-icon {
      cursor: pointer;
      position: absolute;
      pointer-events: none;
      right: 5px;
      bottom: 8px;
    }

    .ds-error-message-wrapper {
      width: 100%;
      font-size: 12px;
      color: @color-red;
      position: absolute;
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
      max-height: 150px;
      overflow-y: auto;
      overflow-x: hidden;

      .ds-option-wrapper {
        padding: 5px 10px;
        cursor: pointer;
        text-align: left;
      }
    }
  }
</style>
