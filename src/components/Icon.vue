<!--
  SVG Icon of a specified size (square)

  Usage:

    <Icon
      source="account_circle"  - Icon name or <svg>...</svg> code
      size="16px"              - Icon size
      padding="4px 2px"        - Outher element padding
      color="brand"            - Color name or CSS value
    />

    Instead of using the source property for the icon name, it can be passed
    as an attribute on its own:

    <icon account_circle /> is equal to <icon source="account_circle" />

  Properties:

    source - String, required. Icon name for icons from src/icons folder
      or an `<svg>...</svg>` code

    size - String. Must be valid css value. Size for the inner svg element

    padding - String. Must be valid css value. Padding around the svg

    color - String. Color variable name or a CSS value
-->

<template>
  <div class="icon-wrapper" :style="wrapperStyle" :class="type">
    <span v-if="tooltip">
      <span
        class="ds-icon"
        v-html="code"
        v-on="$listeners"
        :style="stylesObject"
        ref="tooltipIcon"
        @mouseover="tooltipVisible = true"
      ></span>

      <Dropdown
        :target="$refs.tooltipIcon"
        :opened.sync="tooltipVisible"
        just-fade
        mouseoutClose
      >
        <Tooltip v-html="tooltip" dynamicWidth />
      </Dropdown>
    </span>

    <span
      v-else
      class="ds-icon"
      v-html="code"
      v-on="$listeners"
      :style="stylesObject"
    ></span>
  </div>
</template>

<script>
import icons from '../icons';
import { COLORS } from '../styles/vars';

import Tooltip from './Tooltip';
import Dropdown from './Dropdown';

export default {
  name: 'Icon',
  components: { Tooltip, Dropdown },
  props: {
    source: {
      type: String
    },
    size: {
      type: String,
      default: '24px'
    },
    padding: {
      type: String,
      default: '0'
    },
    color: String,
    backgroundColor: {
      type: String,
      default: '#F2F4F6'
    },
    tooltip: String,
    noSize: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    },
    styles: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    icons,
    COLORS,
    tooltipVisible: false
  }),
  computed: {
    code() {
      if (this.source) {
        return icons[this.source] || this.source;
      }
      for (let key in this.$attrs) {
        if (key in icons) {
          return icons[key];
        }
      }
      throw 'Icon code is missing';
    },
    stylesObject() {
      let styles = {
        padding: this.padding,
        fill: this.COLORS[this.color] || this.color
      };

      if (!this.noSize) {
        styles.height = this.size;
        styles.width = this.size;
      }
      return styles;
    },
    wrapperStyle() {
      let styles = {
        width: this.size,
        height: this.size
      };

      if (this.type === 'circle') {
        styles.width = '40px';
        styles.height = '40px';
        styles.borderRadius = '20px';
        styles.backgroundColor = this.backgroundColor;
      }

      styles = Object.assign({}, styles, this.styles);

      return styles;
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .ds-icon {
    display: inline-block;
    vertical-align: bottom;

    svg {
      height: 100%;
      width: 100%;
      vertical-align: top;
      user-select: none;
    }
  }
}
</style>
