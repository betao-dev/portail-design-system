<template>
  <form name="dsForm" @submit="checkForm">
    <slot>

    </slot>
  </form>
</template>

<script>
import CustomEvent from 'custom-event';

window.CustomEvent = CustomEvent;

export default {
  name: 'Form',
  components: {},
  props: {
  },
  data: () => ({}),
  methods: {
    checkForm(e) {
      e.preventDefault();
      e.stopPropagation();
      const event = new CustomEvent('validate', {})
      document.dispatchEvent(event)

      setTimeout(() => {
        const currentFormElements = document.forms['dsForm'].elements
        const emitValue = {}
        for (let i = 0; i < currentFormElements.length; i++) {
          if (currentFormElements[i].tagName !== 'BUTTON') {
            if (!currentFormElements[i].name) return
            if (currentFormElements[i].className.includes('ds-error')) return
            emitValue[currentFormElements[i].name] = currentFormElements[i].value
          }
        }
        this.$emit('submit', emitValue)
      }, 10)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
