<template>
  <div class="ds-help-wrapper">
    <div class="ds-help-popover">
      <slot name="popover"></slot>
    </div>
    <div class="ds-help-reference">
      <slot name="reference" ref="reference"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help',
  props: {
    placement: {
      type: String,
      default: 'right',
      validator(value) {
        return !!~['top', 'right', 'left', 'bottom'].indexOf(value);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-help-wrapper {
  position: relative;

  .ds-help-popover {
    position: absolute;
  }

  .ds-help-reference {
  }
}
</style>
