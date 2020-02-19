<!--
  TextArea - custom textarea component

  Usage:

  <TextArea v-model="value"                   - Binds value property to textarea
            :label="secondlabelText"          - Label at the top of the textarea
            :placeholder="placeholder"        - Placeholder directly to the textarea
            :rows="rows"                      - Sets the height as strings
            :validators="validators"          - Array of validator Objects. When multiple validators fail,
                                                only one error is displayed, determined by their order in the array.
                                                Each Object should have three fields:
                name    - Validator id
                message - Error message that shown when validation fails
                validator - Function that takes input value as an argument and returns Boolean

            :showErrors="showErrors"          - Responsible for showing error message
            :initValidation="initValidation"  - Responsible for initial run validation
            :initialTouched="initialTouched"  - Initial set of touched property
            @validation>                      - Emitted when the textarea value changes or in initial proccess depend
                                                on initValidation value
  </TextArea>
-->

<template>
  <div class="ds-text-area">
    <label>
      <div class="ds-label-text" v-if="label">{{label}}</div>
      <textarea
        v-model="textareaValue"
        :key="textAreaId"
        :placeholder="placeholder"
        :name="name"
        :rows="rows"
        :class="{
          'ds-error': showInvalidBlock && invalidBacklight,
          'ds-textarea-error': isInvalid,
          'ds-valid': showValidCheck && validBacklight
        }"
        :disabled="disabled"
        @blur="onBlur"
      />
    </label>
    <div class="ds-textarea-errors-wraper">
      <transition name="error-message">
        <span v-if="isInvalid" class="ds-error-message">
          {{ textareaErrors[0] }}
        </span>
      </transition>

      <div class="ds-notification">{{ notificationStr }}</div>
    </div>
  </div>
</template>

<script>
  import validation from '../mixins/validation';

  export default {
    name: "TextArea",
    mixins: [validation],
    props: {
      value: null,
      label: String,
      placeholder: String,
      name: String,
      rows: Number,
      disabled: Boolean,
      maxCharacters: Number,
      validators: Array,
      showErrors: {
        type: Boolean,
        default: true
      },
      initValidation: {
        type: Boolean,
        default: false
      },
      initialTouched: {
        type: Boolean,
        default: false
      },
      showValidations: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      validateEventName: undefined,
      touched: false,
      notificationStr: '',
      textAreaId: Math.random().toString(36).substring(7),
      validBacklight: false,
      invalidBacklight: false
    }),
    methods: {
      onBlur() {
        this.touched = true
      }
    },
    computed: {
      textareaValue: {
        get() {
          if (!this.value) {
            return ''
          }

          if (!this.maxCharacters || this.value.length < this.maxCharacters) {
            return this.value
          } else {
            return this.value.substring(0, this.maxCharacters)
          }
        },
        set(value) {
          this.$emit('input', value)
        }
      },
      validation() {
        let data = []

        if (!this.validators || !this.validators.length) {
          return data
        }

        for (let i = 0; i < this.validators.length; i++) {
          data.push([
            this.validators[i].name,
            this.validators[i].validator(this.textareaValue)
          ])
        }

        return data
      },
      textareaErrors() {
        let errors = []

        if (this.textareaValue && this.maxCharacters && this.textareaValue.length > this.maxCharacters) {
          errors.push(this.dsTranslateComplex(['Can input less characters (1/2)', 'Can input less characters (2/2)'],
                                              [`${this.maxCharacters}`]))
          this.$emit('validation', [['max-charactor', false]])
        }

        for (let i = 0; i < this.validation.length; i++) {
          if (!this.validation[i][1]) {
            errors.push(this.validators[i].message)
          }
        }

        return errors
      },
      isInvalid() {
        return this.textareaErrors.length && this.touched && this.showErrors
      },
      showValidCheck() {
        return this.validationShown && this.textareaErrors.length == 0
      },
      showInvalidBlock() {
        return this.validationShown && this.textareaErrors.length > 0
      }
    },
    mounted() {
      if (this.maxCharacters) {
        this.notificationStr = `${this.value ? this.value.length : 0}/${this.maxCharacters}`
      }

      this.$nextTick(() => {
        if (this.initValidation) {
          this.validate()
        }
      })

      if (this.name) {
        this.validateEventName = `validate${this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()}`;
        document.addEventListener(this.validateEventName, this.validate);
      }

      this.$emit('validation', this.validation)
    },
    beforeDestroy() {
      if (this.name) {
        document.removeEventListener(this.validateEventName, this.validate)
      }
    },
    watch: {
      textareaValue(val) {
        this.checkBacklight()
        this.$emit('validation', this.validation)
        if (this.maxCharacters) {
          this.notificationStr = `${val.length}/${this.maxCharacters}`
        }
      },
      initialTouched(value) {
        this.touched = value
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';
  @import '../styles/mixins';

  .ds-text-area {
    label {
      display: block;

      .ds-label-text {
        color: @color-dark;
        font-family: "Roboto Light";
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      textarea {
        .font-desktop-small-regular-dark();
        padding: 18px 16px;
        box-sizing: border-box;
        border: 1px solid @color-gray-300;
        border-radius: 4px;
        background-color: @color-white;
        width: 100%;
        resize: none;
        box-sizing: border-box;

        &::placeholder {
          color: @color-gray-400;
          font-family: Roboto, sans-serif;
          font-size: 14px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:focus:not(.ds-error):not(.ds-textarea-error) {
          border-color: @color-primary;
        }

        &:focus {
          outline: none;
        }

        &.ds-textarea-error {
          border-color: @color-red;
        }

        &.ds-error {
          .input-invalid-fade-animation();
        }

        &.ds-valid {
          border-color: @color-primary;
          .input-valid-fade-animation();
        }
      }
    }

    .ds-textarea-errors-wraper {
      box-sizing: border-box;
      font-size: 11px;
      line-height: 12px;
      max-width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .ds-error-message {
        color: @color-red;
        font-family: @font-family;
        list-style: none;
        padding: 0;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        max-width: 100%;
      }

      .ds-notification {
        .font-desktop-x-small-regular-gray();
        text-align: right;
        padding: 2px 0;
        flex-grow: 1;
        white-space: nowrap;
      }

      .error-message-enter-active, .error-message-leave-active {
        transition: opacity .3s;
      }
      .error-message-enter, .error-message-leave-to {
        opacity: 0;
      }
    }
  }

</style>
