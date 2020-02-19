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
    or space key. During rendering "ds-selected" class is added to item that
    satisfies === comparison with the v-model. Value for the check can be
    overridden with selectedKey property
-->

<template>
  <table class="ds-grid-select">
    <tr v-if="labelsTop" class="ds-labels-top">
      <th v-for="label in labelsTop">
        {{ label }}
      </th>
    </tr>

    <tr v-for="row in items" class="ds-grid-select-row">
      <td
        v-for="item in row"
        :class="[
          'ds-item-cell',
          {
            'ds-disabled': item.disabled,
            'ds-selected': getSelected(item),
            'ds-range': getRange(item),
            'ds-selected-range-start': getSelectedRangeStart(item),
            'ds-selected-range-end': getSelectedRangeEnd(item)
          }
        ]"
        :tabindex="!item.disabled && 0"
        @click="!item.disabled && select(item)"
        @keydown.enter.space.prevent="select(item)"
        :style="{ width: itemWidth }"
      >
        <span :class="['ds-item', ...item.class]">
          <slot v-bind="{ item }">
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
    secondValue: null,
    rangeAvailable: Boolean
  },
  computed: {
    itemWidth() {
      return 100 / this.items[0].length + '%';
    },
    initDate() {
      return new Date(this.value).getTime();
    },
    secondInitDate() {
      return new Date(this.secondValue).getTime();
    },
    dateRangeExist() {
      return this.value && this.secondValue && this.rangeAvailable;
    }
  },
  methods: {
    select(item) {
      this.$emit('input', item);
    },
    getSelected(item) {
      if (this.dateRangeExist) {
        return (
          this.getSingleSelected(item, this.value, this.initDate) ||
          this.getSingleSelected(item, this.secondValue, this.secondInitDate)
        );
      } else {
        return this.getSingleSelected(item, this.value, this.initDate);
      }
    },
    getRange(item) {
      if (this.dateRangeExist && item.key !== undefined) {
        return (
          this.initDate &&
          this.secondInitDate &&
          ((this.initDate < item.key && item.key < this.secondInitDate) ||
            (this.secondInitDate < item.key && item.key < this.initDate))
        );
      } else if (this.dateRangeExist) {
        return (
          (this.value < item && item < this.secondValue) ||
          (this.secondValue < item && item < this.value)
        );
      } else {
        return false;
      }
    },
    getSelectedRangeStart(item) {
      if (this.dateRangeExist && this.value < this.secondValue) {
        return this.getSingleSelected(item, this.value, this.initDate);
      } else if (this.dateRangeExist) {
        return this.getSingleSelected(
          item,
          this.secondValue,
          this.secondInitDate
        );
      } else {
        return false;
      }
    },
    getSelectedRangeEnd(item) {
      if (this.dateRangeExist && this.value > this.secondValue) {
        return this.getSingleSelected(item, this.value, this.initDate);
      } else if (this.dateRangeExist) {
        return this.getSingleSelected(
          item,
          this.secondValue,
          this.secondInitDate
        );
      } else {
        return false;
      }
    },
    getSingleSelected(item, date, dateMilles) {
      if (item.key !== undefined) {
        return item.key === dateMilles;
      } else {
        return item === date;
      }
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-grid-select {
  width: 100%;
  height: 100%;
  border-collapse: collapse;

  .ds-labels-top th {
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

  .ds-grid-select-row {
    .ds-item-cell {
      text-align: center;
      > .ds-item {
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
        transition: background 0.1s ease-in-out;
        user-select: none;
      }

      &:not(.ds-disabled) {
        cursor: pointer;

        &:hover > .ds-item,
        &:focus > .ds-item {
          background: darken(@color-white, 5%);
        }

        &:active > .ds-item {
          background: darken(@color-white, 10%);
        }

        &.ds-selected > .ds-item {
          color: @color-white;
          background-color: @color-primary;
        }

        &.ds-range {
          .ds-item {
            width: 100%;
            padding: 0 1px;
            background-color: rgba(30, 179, 134, 0.1);
            color: @color-primary;
          }
        }
        &.ds-selected-range-start,
        &.ds-selected-range-end {
          .ds-item {
            width: 100%;
            padding: 0 1px;
            color: @color-primary;

            span {
              display: inline-block;
              width: 100%;
              color: @color-white;
              background-color: @color-primary;
            }
          }
        }
      }

      &.ds-disabled > .ds-item {
        color: @color-gray-300;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
