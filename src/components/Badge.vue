<!--
  Badge with an optional icon

  Usage:

    <Badge
      :color="red"           - Badge background color
      :icon="error_outline"  - Badge optional icon
      :icon-size="20px">     - Badge icon size
    </Badge>
-->

<template>
  <div class="ds-badge" :style="{backgroundColor, borderRadius}">
    <Icon v-if="icon" 
          class="ds-icon" 
          :source="icon" 
          :color="iconColor" 
          :size="iconSize" 
          :style="{padding: iconPadding}"/>
    <slot></slot>
  </div>
</template>

<script>
  import Icon from './Icon.vue'
  import {COLORS} from '../styles/vars'

  export default {
    name: 'Badge',
    components: {Icon},
    props: {
      icon: String,
      iconSize: String,
      iconColor: {
        type: String,
        default: 'white'
      },
      iconPadding: String,
      borderRadius: String,
      color: String
    },
    data: () => ({
      COLORS
    }),
    computed: {
      backgroundColor() {
        return this.COLORS[this.color] || this.color
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-badge {
    display: inline-flex;
    align-items: center;
    width: auto;
    border-radius: @badge-br;
    color: @color-white;
    padding: @badge-padding;
    cursor: default;

    .ds-icon {
      margin-right: @badge-icon-margin;
    }
  }
</style>
