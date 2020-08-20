<template>
  <div :class="['ds-tooltip-wrapper', { 'ds-tooltip-wrapper-white': white }]">
    <Popper
      :options="{
        placement: placement,
        modifiers: { offset: offset }
      }"
    >
      <div class="popper" :style="{ width: poperWidth }">
        <slot name="popover"></slot>
      </div>

      <div class="reference" slot="reference">
        <slot name="reference"></slot>
      </div>
    </Popper>
  </div>
</template>

<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  name: 'Tooltip',
  props: {
    placement: {
      type: String,
      default: 'auto'
    },
    offset: {
      type: Object,
      default: () => {
        return { offset: '0, 10px' };
      }
    },
    white: {
      type: Boolean,
      default: false
    },
    poperWidth: String
  },
  components: {
    Popper
  },
  methods: {},
  computed: {}
};
</script>

<style lang="less" scoped>
@import '../styles/vars';
@import '../styles/mixins';

.ds-tooltip-wrapper {
  display: inline-block;

  span::v-deep {
    .reference {
      display: inline-block;
    }

    .popper {
      font-size: 14px;
      line-height: 18px;
      width: 300px;
      .poper();
    }
  }

  [x-arrow] {
    position: absolute;
  }

  &.ds-tooltip-wrapper-white {
    span::v-deep {
      .popper {
        box-sizing: border-box;
        width: 270px;
        .poper-white();
      }
    }
  }
}
</style>
