<template>
  <div class="ds-grid">
    <div class="row-col">
      <h2>Colors</h2>
      <pre v-highlightjs="usage"><code class="less"></code></pre>
    </div>
    <div class="row-col" v-for="(group, groupName) in colors">
      <h3 class="group-name">{{ groupName }}</h3>
      <div
        v-for="colorName in group"
        :class="['ds-card', 'color-demo', colorName]"
      >
        @{{ colorName }}
      </div>
    </div>
  </div>
</template>

<script>
import { ColorsData } from '../static/index';

export default {
  name: 'ColorsDemo',
  data: () => ({
    usage: ColorsData.usage,
    colors: ColorsData.colors
  })
};
</script>

<style lang="less">
@import '~@/styles/vars';

.group-name {
  text-transform: capitalize;
}

.color-demo {
  display: inline-block;
  &.color-gray-100 {
    background: @color-gray-100;
    color: @color-dark;
  }
  &.color-gray-200 {
    background: @color-gray-200;
    color: @color-dark;
  }
  &.color-gray-300 {
    background: @color-gray-300;
    color: @color-dark;
  }
  &.color-gray-400 {
    background: @color-gray-400;
    color: @color-dark;
  }
  &.color-gray-500 {
    background: @color-gray-500;
    color: @color-white;
  }
  &.color-dark {
    background: @color-dark;
    color: @color-white;
  }
  &.color-primary {
    background: @color-primary;
    color: @color-white;
  }
  &.color-white {
    background: @color-white;
    color: @color-dark;
  }
  &.color-blue {
    background: @color-blue;
    color: @color-white;
  }
  &.color-red {
    background: @color-red;
    color: @color-white;
  }
  &.color-yellow {
    background: @color-yellow;
    color: @color-white;
  }
  &.color-indigo {
    background: @color-indigo;
    color: @color-white;
  }
  &.color-orange {
    background: @color-orange;
    color: @color-white;
  }
  &.color-soft-blue {
    background: @color-soft-blue;
    color: @color-dark;
  }
  &.color-soft-red {
    background: @color-soft-red;
    color: @color-dark;
  }
  &.color-soft-yellow {
    background: @color-soft-yellow;
    color: @color-dark;
  }
  &.color-soft-indigo {
    background: @color-soft-indigo;
    color: @color-dark;
  }
  &.color-soft-orange {
    background: @color-soft-orange;
    color: @color-dark;
  }
}
</style>
