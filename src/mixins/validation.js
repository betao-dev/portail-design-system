import _ from 'lodash';
export default {
  data: () => ({
    previousInvalidState: undefined,
    validationActive: false,
    timeoutId: undefined
  }),
  methods: {
    validate() {
      this.touched = true;
      this.previousInvalidState = undefined;
      this.checkBacklight();
      this.$emit('validation', this.validation);
    },
    validationBacklight(activeValidation, inactiveValidation, forceRun) {
      const isExistPreviousState = _.isUndefined(this.previousInvalidState);
      const isInvalid = activeValidation === 'invalidBacklight';
      const toValid =
        activeValidation === 'validBacklight' &&
        inactiveValidation === 'invalidBacklight';

      if (
        (!isExistPreviousState &&
          ((toValid && this.previousInvalidState) ||
            (!toValid && !this.previousInvalidState))) ||
        (isExistPreviousState && isInvalid)
      ) {
        this[inactiveValidation] = false;
        this[activeValidation] = true;
        this.previousInvalidState = isInvalid;

        if (!this.validationActive || forceRun) {
          this.validationActive = true;

          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }

          this.timeoutId = setTimeout(() => {
            this[activeValidation] = false;
            this.validationActive = false;
          }, 2000);
        }
      } else {
        this.previousInvalidState = isInvalid;
      }
    },
    checkBacklight() {
      if (this.showValidCheck) {
        this.validationBacklight('validBacklight', 'invalidBacklight');
      } else if (this.showInvalidBlock) {
        this.validationBacklight('invalidBacklight', 'validBacklight');
      }
    }
  },
  computed: {
    validationShown() {
      return this.showValidations && this.touched;
    },
    showValidCheck() {
      return this.validationShown && this.inputErrors.length == 0;
    },
    showInvalidBlock() {
      return this.validationShown && this.inputErrors.length > 0;
    },
    inputErrors() {
      let errors = [];
      for (let i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message);
        }
      }
      return errors;
    }
  },
  watch: {
    showValidCheck(value) {
      if (value) {
        this.validationBacklight('validBacklight', 'invalidBacklight', true);
      }
    },
    showInvalidBlock(value) {
      if (value) {
        this.validationBacklight('invalidBacklight', 'validBacklight', true);
      }
    }
  },
  mounted() {
    document.addEventListener('validate', this.validate);
  },
  beforeDestroy() {
    document.removeEventListener('validate', this.validate);
  }
};
