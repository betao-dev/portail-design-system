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
  
      <div
        class="reference"
        slot="reference"
      >
        <slot name="reference"></slot>
      </div>
    </Popper>
  </div>
</template>

<script>

import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  name: "Tooltip",
  props: {
    placement: {
      type: String,
      default: 'auto'
    },
    offset: {
      type: Object,
      default: () => {return {offset: '0, 10px'}}
    },
  },
  components: {
    Popper
  },
  methods: {},
  computed: {}
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-tooltip-wrapper {
  display: inline-block;

  span::v-deep {
    .reference {
      display: inline-block;
    }

    .popper {
      background-color: @color-gray-500;
      border-radius: 2px;
      color: @color-white;
      border: solid 1px @color-gray-500;
      font-family: @font-family;
      font-size: 14px;
      line-height: 18px;
      padding: 16px;
      width: 300px;
      position: relative;
      text-align: left;
      box-shadow: none;
      margin-top: 10px;
      margin-bottom: 10px;

      &[x-placement^="bottom"] {
        [x-arrow] {
          &:before {
            content: '';
            position: absolute;
            left: -10px;
            top: -5px;
            border-bottom: 15px solid @color-gray-500;
            border-right: 15px solid transparent;
            border-left: 15px solid transparent;
            z-index: 1;
          }

          &:after {
            content: '';
            position: absolute;
            left: -10px;
            top: -5px;
            border-bottom: 15px solid @color-gray-500;
            border-right: 15px solid transparent;
            border-left: 15px solid transparent;
            z-index: 2;
          }
        }
      }

      &[x-placement^="top"] {
        [x-arrow] {
          &:before {
            content: '';
            position: absolute;
            left: -10px;
            bottom: -5px;
            border-top: 15px solid @color-gray-500;
            border-right: 15px solid transparent;
            border-left: 15px solid transparent;
            z-index: 1;
          }

          &:after {
            content: '';
            position: absolute;
            left: -10px;
            bottom: -5px;
            border-top: 15px solid @color-gray-500;
            border-right: 15px solid transparent;
            border-left: 15px solid transparent;
            z-index: 2;
          }
        }
      }

      &[x-placement^="left"] {
        [x-arrow] {
          &:before {
            content: '';
            position: absolute;
            top: -10px;
            right: -5px;
            border-left: 15px solid @color-gray-500;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            z-index: 1;
          }

          &:after {
            content: '';
            position: absolute;
            top: -10px;
            right: -5px;
            border-left: 15px solid @color-gray-500;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            z-index: 2;
          }
        }
      }

      &[x-placement^="right"] {
        [x-arrow] {
          &:before {
            content: '';
            position: absolute;
            top: -10px;
            left: -5px;
            border-right: 15px solid @color-gray-500;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            z-index: 1;
          }

          &:after {
            content: '';
            position: absolute;
            top: -10px;
            left: -5px;
            border-right: 15px solid @color-gray-500;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            z-index: 2;
          }
        }
      }
    }
  }

  [x-arrow] {
    position: absolute;
  }
}

</style>
