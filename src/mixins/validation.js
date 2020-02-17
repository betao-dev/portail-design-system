export default {
  data: () => ({
    previousInvalidState: false
  }),
  methods: {
    validate() {
      this.touched = true
      this.checkBacklight()
      this.$emit('validation', this.validation)
    },
    validationBacklight(activeValidation, inactiveValidation) {
      if (this.previousInvalidState || activeValidation === 'invalidBacklight') {
        this[inactiveValidation] = false
        this[activeValidation] = true

        if (this.validationTimeoutId) {
          this.previousInvalidState = activeValidation === 'invalidBacklight'
          clearTimeout(this.validationTimeoutId)
        }

        this.validationTimeoutId = setTimeout(() => {
          this[activeValidation] = false
          this.previousInvalidState = activeValidation === 'invalidBacklight'
        }, 2000)
      } else {
        this.previousInvalidState = activeValidation === 'invalidBacklight'
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
