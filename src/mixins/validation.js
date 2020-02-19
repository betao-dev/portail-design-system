import _ from 'lodash'

export default {
  data: () => ({
    previousInvalidState: undefined,
    validationActive: false
  }),
  methods: {
    validate() {
      this.touched = true
      this.previousInvalidState = undefined
      this.checkBacklight()
      this.$emit('validation', this.validation)
    },
    validationBacklight(activeValidation, inactiveValidation) {
      const isInvalid = activeValidation === 'invalidBacklight'
      const toInvalid = !this.previousInvalidState && isInvalid
      const toValid = this.previousInvalidState && activeValidation === 'validBacklight'
      const isExistPreviousState = _.isUndefined(this.previousInvalidState)

      if ((toValid || toInvalid) && !isExistPreviousState || isExistPreviousState && isInvalid) {
        this[inactiveValidation] = false
        this[activeValidation] = true

        if (!this.validationActive) {
          this.validationActive = true

          setTimeout(() => {
            this[activeValidation] = false
            this.validationActive = false
            this.previousInvalidState = isInvalid
          }, 2000)
        }
      } else {
        this.previousInvalidState = isInvalid
      }
    },
    checkBacklight() {
      if (this.showValidCheck) {
        this.validationBacklight('validBacklight', 'invalidBacklight')
      } else if (this.showInvalidBlock) {
        this.validationBacklight('invalidBacklight', 'validBacklight')
      }
    }
  },
  computed: {
    validationShown() {
      return this.showValidations && this.touched
    },
    showValidCheck() {
      return this.validationShown && this.inputErrors.length == 0
    },
    showInvalidBlock() {
      return this.validationShown && this.inputErrors.length > 0
    },
    inputErrors() {
      let errors = []
      for (let i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message)
        }
      }
      return errors
    }
  },
  watch: {
    showValidCheck(value) {
      if (value) {
        this.validationBacklight('validBacklight', 'invalidBacklight')
      }
    },
    showInvalidBlock(value) {
      if (value) {
        this.validationBacklight('invalidBacklight', 'validBacklight')
      }
    }
  },
  mounted() {
    document.addEventListener('validate', this.validate)
  },
  beforeDestroy() {
    document.removeEventListener('validate', this.validate)
  }
}
