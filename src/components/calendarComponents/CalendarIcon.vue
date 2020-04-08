<template>
  <span
    class="ds-calendar-icon"
    v-html="code"
    v-on="$listeners"
    :style="stylesObject"
    :id="id"
  >
  </span>
</template>

<script>
import icons from '../../icons';
import { COLORS } from '../../styles/vars';

export default {
  name: 'CalendarIcon',
  props: {
    source: {
      type: String
    },
    size: {
      type: String,
      default: '18px'
    },
    padding: {
      type: String,
      default: '0'
    },
    color: String,
    noSize: {
      type: Boolean,
      default: false
    },
    id: String
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
    }
  }
};
</script>

<style lang="less">
@import '../../styles/vars';

.ds-calendar-icon {
  display: inline-block;
  vertical-align: bottom;

  svg {
    height: 100%;
    width: 100%;
    vertical-align: top;
    user-drag: none;
    user-select: none;
  }
}
</style>
