<template>
  <div class="grid">
    <div class="row-col">
      <h2>Colors</h2>
      <pre v-highlightjs="usageLess"><code class="less"></code></pre>
    </div>
    <div class="row-col" v-for="(group, groupName) in colors" :key="groupName">
      <h3 class="group-name">{{ groupName }}</h3>
      <Card
        v-for="colorName in group"
        :key="colorName"
        :class="['color-demo', colorName]"
      >@{{ colorName }}</Card>
    </div>
  </div>
</template>

<script>
let usageLess = `
@import '~@betao/ds/vars';

.some-class {
  color: @color-gray-100;
}
`.slice(1)

import Card from '../components/Card.vue'

export default {
  name: 'ColorsDemo',
  components: { Card },
  data: () => ({
    usageLess,
    colors: {
      grays: [
        'color-gray-100',
        'color-gray-200',
        'color-gray-300',
        'color-gray-400',
        'color-gray-500',
      ],
      primary: [
        'color-dark',
        'color-primary',
        'color-white',
      ],
      system: [
        'color-blue',
        'color-red',
        'color-yellow',
      ],
    }
  })
}
</script>

<style lang="less">
@import "~@/styles/vars";

.group-name {
  text-transform: capitalize;
}

.color-demo {
  display: inline-block;
  &.color-gray-100 {background: @color-gray-100; color: @color-dark;}
  &.color-gray-200 {background: @color-gray-200; color: @color-dark;}
  &.color-gray-300 {background: @color-gray-300; color: @color-dark;}
  &.color-gray-400 {background: @color-gray-400; color: @color-dark;}
  &.color-gray-500 {background: @color-gray-500; color: @color-white;}
  &.color-dark {background: @color-dark; color: @color-white;}
  &.color-primary {background: @color-primary; color: @color-white;}
  &.color-white {background: @color-white; color: @color-dark;}
  &.color-blue {background: @color-blue; color: @color-white;}
  &.color-red {background: @color-red; color: @color-white;}
  &.color-yellow {background: @color-yellow; color: @color-white;}
}
</style>
