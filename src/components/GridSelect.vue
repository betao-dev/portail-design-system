<!--
  Render items in a table with optional labels at the top and an ability
  to select an item. Used in the Datepicker component

  Usage:

    <GridSelect
      :items="[[...], ...]"    - Items to be rendered
      :labels-top="[...]"      - Headings for the columns
      v-model="selected"       - Selected item
    ></GridSelect>

  Properties:

    items - Array<Array<any>>, required. Items to be rendered in the grid.
      Where each items may have:

        title - String. Will be used in rendering if provided, otherwise
          item will be rendered as {{ item }}. Also, a scoped slot can be
          used for even finer control of item representation

        disabled - Boolean. Makes item not selectable

        class - String or Array<String> cutom classes to add to the element

        key - String or Number. Value for is selected check and :key value
          for v-for

    labelsTop - Array<string>. Table header items

  Model:

    Selected value is updated through v-model directive on mouse click, enter
    or space key. During rendering "selected" class is added to item that
    satisfies === comparison with the v-model. Value for the check can be
    overridden with selectedKey property
-->

<template>
  <table class="grid-select">
    <tr v-if="labelsTop" class="labels-top">
      <th v-for="label in labelsTop">
        {{ label }}
      </th>
    </tr>

    <tr v-for="row in items" class="row">
      <td
        v-for="item in row"
        :key="item.key !== undefined ? item.key : item"
        :class="['item-cell', {
          disabled: item.disabled,
          selected:
            item.key !== undefined ? item.key === value.key : item === value,
        }]"
        :tabindex="!item.disabled && 0"
        @click="!item.disabled && select(item)"
        @keypress.enter.space.prevent="select(item)"
        :style="{width: itemWidth}"
      >
        <span :class="['item', ...item.class]">
          <slot v-bind="{item}">
            {{ item.title || item }}
          </slot>
        </span>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'GridSelect',
  props: {
    items: {
      type: Array,
      required: true
    },
    labelsTop: Array,
    value: null,
  },
  computed: {
    itemWidth() {
      return 100 / this.items[0].length + '%'
    }
  },
  methods: {
    select(item) {
      this.$emit('input', item)
    }
  },
}
</script>

<style lang="less">
@import '../styles/vars';

.grid-select {
  width: 100%;
  height: 100%;
  border-collapse: collapse;

  .labels-top th {
    color: @color-gray-500;
    font-family: @font-family;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    padding-top: 2px;
    padding-bottom: 8px;
    text-align: center;
    text-transform: uppercase;
    user-select: none;
  }

  .row {
    .item-cell {
      text-align: center;
      > .item {
        border-radius: 2px;
        box-sizing: border-box;
        color: @color-dark;
        display: inline-block;
        font-family: @font-family;
        font-size: 14px;
        line-height: 24px;
        min-width: 24px;
        padding: 0 2px;
        text-align: center;
        transition: all .1s ease-in-out;
        user-select: none;
      }

      &:not(.disabled) {
        cursor: pointer;

        &:hover > .item,
        &:focus > .item {
          background: darken(@color-white, 5%);
        }

        &:active > .item {
          background: darken(@color-white, 10%);
        }

        &.selected > .item {
          color: @color-white;
          background-color: @color-primary;
        }
      }

      &.disabled > .item {
        color: @color-gray-400;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
