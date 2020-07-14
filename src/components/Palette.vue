<template>
  <div v-if="defaultMode" class="ds-palette-wrapper">
    <div
      v-for="defaultColor of defaultColors"
      :class="[
        'ds-palette',
        {
          'ds-palette-active': value && value.id === defaultColor.id
        }
      ]"
      @click="setActive(defaultColor)"
    >
      <div
        class="ds-palette-item"
        v-for="internalValue of defaultColor.internalValue"
        :style="{ backgroundColor: internalValue }"
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
          internalValue: ['#778CA2', '#AEBAC7', '#D6DCE3'],
          value: ['#778CA2', '#F2F4F6', '#F8FAFB']
        },
        {
          id: 2,
          internalValue: ['#1EB386', '#78D1B6', '#BBE8DA'],
          value: ['#1EB386', '#E9F8F3', '#F8FCFB']
        },
        {
          id: 3,
          internalValue: ['#09AFFF', '#6BCFFF', '#B5E7FF'],
          value: ['#09AFFF', '#DAF3FF', '#F2FBFF']
        },
        {
          id: 4,
          internalValue: ['#745BCC', '#AC9DE0', '#D5CDEF'],
          value: ['#745BCC', '#EEEBF8', '#F8F7FC']
        },
        {
          id: 5,
          internalValue: ['#F03F3F', '#F68C8C', '#FAC5C5'],
          value: ['#F03F3F', '#FDEBEB', '#FFF8F8']
        }
      ]
    };
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
    makeColorCopy(color) {
      let colorCopy = { ...color };
      delete colorCopy.internalValue;
      return colorCopy;
    },
    calcGradient(color) {
      let tmp = this.opacities.slice();
      return tmp.map(opacity => {
        return this.hexToRGBA(color, opacity);
      });
    },
    setActive(color) {
      if (this.defaultMode) {
        this.$emit('input', this.makeColorCopy(color));
      } else {
        this.$emit('input', this.calcGradient(color));
      }
    }
  },
  mounted() {
    let color = this.value;
    if (this.autoInit) {
      color = this.defaultMode ? this.defaultColors[0] : this.colors[0];
    }

    this.setActive(color);
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
