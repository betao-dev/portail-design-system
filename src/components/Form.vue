<template>
  <form name="dsForm" @submit="checkForm">
    <slot> </slot>
  </form>
</template>

<script>
import CustomEvent from 'custom-event';

window.CustomEvent = CustomEvent;

export default {
  name: 'Form',
  components: {},
  props: {
    prevent: {
      type: Boolean,
      default: true
    },
    stop: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    errors: []
  }),
  methods: {
    checkForm(e) {
      if (e) {
        this.prevent && e.preventDefault();
        this.stop && e.stopPropagation();
      }

      this.errors = [];
      this.setTouched(true);

      const children = this.$children;
      const submitVal = {};
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.setTouched) {
          if (!child.name) return;
          if (!child.inputErrors) return;

          child.inputErrors.map(error => {
            this.errors.push(`${child.name}: ${error}`);
          });
          submitVal[child.name] = child.value;
        }
      }

      if (this.errors.length !== 0) return;
      this.$emit('submit', submitVal);
    },
    setTouched(touched) {
      const children = this.$children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.setTouched) {
          child.setTouched(touched);
        }
      }
    },
    isValid() {
      if (this.errors.length === 0) return true;
      return false;
    }
  }
};
</script>

<style lang="less" scoped></style>
