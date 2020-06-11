<template>
  <div class="ds-palette-wrapper">
    <div
      :class="[
        'ds-palette',
        { 'ds-palette-active': value[0] === hexToRGBA(color, opacities[0]) }
      ]"
      v-for="color of colors"
      @click="setActive(color)"
    >
      <div
        class="ds-palette-item"
        v-for="opacity of opacities"
        :style="{ backgroundColor: hexToRGBA(color, opacity) }"
      ></div>
    </div>
  </div>
</template>

<script>
import convert from './../mixins/convert';
export default {
  name: 'Palette',
  mixins: [convert],
  props: {
    value: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      required: true
    },
    opacities: {
      type: Array,
      required: true
    },
    autoInit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    calcGradient(color) {
      let tmp = this.opacities.slice();
      return tmp.map(opacity => {
        return this.hexToRGBA(color, opacity);
      });
    },
    setActive(color) {
      this.$emit('input', this.calcGradient(color));
    }
  },
  mounted() {
    if (this.autoInit) {
      this.$emit('input', this.calcGradient(this.colors[0]));
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-palette-wrapper {
  display: flex;

  .ds-palette {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 9.75px;
    height: 47.2px;
    width: 100%;
    max-width: 80.2px;
    border-radius: 5px;
    box-sizing: border-box;

    &.ds-palette-active {
      background-color: @color-white;
      border: 1.6px solid @color-gray-500;

      :first-child {
        margin-left: 1.5px;
      }

      :last-child {
        margin-right: 1.5px;
      }
    }

    .ds-palette-item {
      cursor: pointer;
      width: 100%;
      max-width: 24px;
      height: 41px;
    }

    :first-child {
      border-radius: 4px 0 0 4px;
    }

    :last-child {
      border-radius: 0 4px 4px 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
