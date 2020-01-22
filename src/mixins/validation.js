export default {
  methods: {
    validate() {
      this.touched = true
      this.checkBacklight()
      this.$emit('validation', this.validation)
    },
    validationBacklight(activeValidation, inactiveValidation) {
      this[inactiveValidation] = false
      this[activeValidation] = true

      if (this.validationTimeoutId) {
        clearTimeout(this.validationTimeoutId)
      }

      this.validationTimeoutId = setTimeout(() => {
        this[activeValidation] = false
      }, 2000)
    },
    checkBacklight() {
      this.$nextTick(() => {
        if (this.showValidCheck) {
          this.validationBacklight('validBacklight', 'invalidBacklight')
        } else if (this.showInvalidBlock) {
          this.validationBacklight('invalidBacklight', 'validBacklight')
        }
      })
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
