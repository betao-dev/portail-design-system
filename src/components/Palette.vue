<template>
  <div v-if="defaultMode" class="ds-palette-wrapper">
    <div
      v-for="defaultColor of defaultColors"
      :class="[
        'ds-palette',
        {
          'ds-palette-active':
            value && value.value[0] === defaultColor.value[0]
        }
      ]"
      @click="setActive(defaultColor)"
    >
      <div
        class="ds-palette-item"
        v-for="value of defaultColor.value"
        :style="{ backgroundColor: value }"
      ></div>
    </div>
  </div>
  <div v-else class="ds-palette-wrapper">
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
  data: function() {
    return {
      defaultColors: [
        {
          id: 1,
          value: ['#778CA2', '#AEBAC7', '#D2D9E1']
        },
        {
          id: 2,
          value: ['#40B387', '#78D1B6', '#B5E6D7']
        },
        {
          id: 3,
          value: ['#11ADF7', '#6CCEF8', '#AFE4FA']
        },
        {
          id: 4,
          value: ['#745ECC', '#AB9DE0', '#D1C9EE']
        },
        {
          id: 5,
          value: ['#F0414A', '#F68C8C', '#FAC0C0']
        }
      ]
    }
  },
  props: {
    value: null,
    colors: Array,
    opacities: Array,
    autoInit: {
      type: Boolean,
      default: false
    },
    defaultMode: {
      type: Boolean,
      default: true
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
      if (this.defaultMode) {
        this.$emit('input', color);
      } else {
        this.$emit('input', this.calcGradient(color));
      }
    }
  },
  mounted() {
    if (this.autoInit) {
      if (this.defaultMode) {
        this.$emit('input', this.defaultColors[0]);
      } else {
        this.$emit('input', this.calcGradient(this.colors[0]));
      }
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
