<template>
  <div class="ds-tooltip-wrapper">
    <Popper
      :options="{
        placement: placement,
        modifiers: { offset: offset }
      }"
    >
      <div class="popper">
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
    }
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
}
</style>
