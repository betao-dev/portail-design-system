<template>
  <div class="ds-calendar-grid-select">
    <div v-if="labelsTop" class="ds-calendar-labels-top">
      <span
        v-for="label in labelsTop"
        class="ds-calendar-label"
        :style="{
          paddingLeft: `calc((100% - 32 * ${items[0].length}px) / ${items[0]
            .length - 1})`
        }"
      >
        {{ label }}
      </span>
    </div>

    <div
      v-for="row in items"
      :class="['ds-grid-select-row', `ds-grid-select-row-${view}`]"
    >
      <span
        v-for="item in row"
        :class="[
          'ds-item-cell',
          {
            'ds-disabled': item.disabled,
            'ds-selected': getSelected(item),
            'ds-range': getRange(item),
            'ds-selected-range-start': getSelectedRangeStart(item),
            'ds-selected-range-end': getSelectedRangeEnd(item),
            'ds-date-range-equality': dateRangeEquality,
            'ds-multi-hover-range': getMultiHoverRange(item),
            'ds-multi-hover-range-start': getHoverRangeStart(item),
            'ds-multi-hover-range-end': getHoverRangeEnd(item)
          }
        ]"
        :tabindex="!item.disabled && 0"
        @click="!item.disabled && select(item)"
        @mouseover="onMouseOver(item)"
        @mouseout="onMouseOut"
        @keydown.enter.space.prevent="select(item)"
        :style="{ width: itemWidth, display: getDisplay }"
      >
        <span
          :class="['ds-item', ...item.class]"
          :style="{
            paddingLeft: `calc((100% - ${cellWidth} * ${
              items[0].length
            }px) / ${items[0].length - 1})`
          }"
        >
          <slot v-bind="{ item }">
            {{ item.title || item }}
          </slot>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
const cellWidth = {
  day: 29,
  month: 40,
  year: 50
};

export default {
  name: 'CalendarGridSelect',
  props: {
    items: {
      type: Array,
      required: true
    },
    labelsTop: Array,
    value: null,
    secondValue: null,
    rangeAvailable: Boolean,
    view: String
  },
  data: () => ({
    multiHoverDate: undefined
  }),
  computed: {
    cellWidth() {
      return cellWidth[this.view];
    },
    getDisplay() {
      return this.view === 'month' ? 'inline-block' : undefined;
    },
    itemWidth() {
      return 100 / this.items[0].length + '%';
    },
    initDate() {
      return new Date(this.value).getTime();
    },
    secondInitDate() {
      return new Date(this.secondValue).getTime();
    },
    multiHoverInitDate() {
      return new Date(this.multiHoverDate).getTime();
    },
    isHoverDataExist() {
      return this.initDate && this.secondInitDate && this.multiHoverInitDate;
    },
    dateRangeExist() {
      return this.value && this.secondValue && this.rangeAvailable;
    },
    dateRangeEquality() {
      return (
        this.value &&
        this.secondValue &&
        this.value.getTime() === this.secondValue.getTime()
      );
    }
  },
  methods: {
    onMouseOver(item) {
      if (this.rangeAvailable && this.value) {
        this.multiHoverDate = item;
      }
    },
    onMouseOut() {
      this.multiHoverDate = undefined;
    },
    getMultiHoverRange(item) {
      const isHoverRange = this.dateRangeExist && this.isHoverDataExist;

      if (isHoverRange && item.key !== undefined) {
        if (this.initDate < this.secondInitDate) {
          return (
            (this.multiHoverInitDate < item.key && item.key < this.initDate) ||
            (this.multiHoverInitDate > item.key &&
              item.key > this.secondInitDate)
          );
        } else if (this.secondInitDate < this.initDate) {
          return (
            (this.multiHoverInitDate < item.key &&
              item.key < this.secondInitDate) ||
            (this.multiHoverInitDate > item.key && item.key > this.initDate)
          );
        }
      } else if (isHoverRange) {
        if (this.value < this.secondValue) {
          return (
            (this.multiHoverDate < item && item < this.value) ||
            (this.multiHoverDate > item && item > this.secondValue)
          );
        } else if (this.secondValue < this.value) {
          return (
            (this.multiHoverDate < item && item < this.secondValue) ||
            (this.multiHoverDate > item && item > this.value)
          );
        }
      } else if (this.rangeAvailable && this.value) {
        if (item.key !== undefined) {
          return (
            (this.initDate < item.key && item.key < this.multiHoverInitDate) ||
            (this.initDate > item.key && item.key > this.multiHoverInitDate)
          );
        } else {
          return (
            (this.value < item && item < this.multiHoverDate) ||
            (this.value > item && item > this.multiHoverDate)
          );
        }
      } else {
        return false;
      }
    },
    getHoverRangeStart(item) {
      if (this.isHoverDataExist && this.rangeAvailable) {
        if (this.getSelectedRangeStart(item)) {
          if (item.key !== undefined) {
            return item.key > this.multiHoverInitDate;
          } else {
            return item > this.multiHoverDate;
          }
        }
      } else if (this.value && this.rangeAvailable) {
        return (
          this.getSingleSelected(item, this.value, this.initDate) &&
          this.multiHoverInitDate < this.initDate
        );
      } else {
        return false;
      }
    },
    getHoverRangeEnd(item) {
      if (this.isHoverDataExist && this.rangeAvailable) {
        const isBoundaryEnd =
          (this.initDate < this.secondInitDate &&
            this.secondInitDate < this.multiHoverInitDate) ||
          (this.secondInitDate < this.initDate &&
            this.initDate < this.multiHoverInitDate);

        return (
          isBoundaryEnd &&
          this.getSingleSelected(
            item,
            this.multiHoverDate,
            this.multiHoverInitDate
          )
        );
      } else if (this.value && this.rangeAvailable) {
        return (
          this.getSingleSelected(
            item,
            this.multiHoverDate,
            this.multiHoverInitDate
          ) && this.multiHoverInitDate > this.initDate
        );
      } else {
        return false;
      }
    },
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
        return (
          new Date(item.key).setHours(1) === new Date(dateMilles).setHours(1)
        );
      } else {
        return item === date;
      }
    }
  }
};
</script>

<style lang="less">
@import '../../styles/vars';

.ds-calendar-grid-select {
  width: 100%;
  height: 100%;
  border-collapse: collapse;

  :nth-child(2) {
    margin-top: 18px;
  }

  .ds-calendar-labels-top {
    .ds-calendar-label {
      min-width: 31.5px;
      color: @color-gray-500;
      font-family: 'Roboto Regular';
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      padding-top: 2px;
      text-align: center;
      text-transform: capitalize;
      user-select: none;
    }

    :first-child {
      padding-left: 0 !important;
    }
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
        text-align: center;
        transition: background 0.1s ease-in-out;
        user-select: none;
      }

      &:not(.ds-disabled) {
        cursor: pointer;

        &.ds-selected {
          .ds-item {
            span {
              display: inline-block;
              color: @color-white;
              background-color: @color-primary;
              border-radius: 4px;
              min-width: 28px;
            }
          }
        }

        &.ds-range {
          .ds-item {
            background-color: rgba(30, 179, 134, 0.1);
            color: @color-primary;
          }
        }

        &.ds-selected-range-start,
        &.ds-selected-range-end {
          .ds-item {
            color: @color-primary;

            span {
              display: inline-block;
              color: @color-white;
              background-color: @color-primary;
            }
          }
        }

        &.ds-selected-range-end {
          .ds-item {
            background-color: rgba(30, 179, 134, 0.1);
          }
        }

        &.ds-date-range-equality {
          .ds-item {
            background-color: transparent;
          }
        }

        &.ds-multi-hover-range {
          .ds-item {
            background-color: @color-gray-100;
          }
        }

        &.ds-multi-hover-range-start,
        &.ds-multi-hover-range-end {
          .ds-item {
            background-color: @color-gray-100;
          }
        }
      }

      &.ds-disabled > .ds-item {
        color: @color-gray-400;
      }

      &:focus {
        outline: none;
      }
    }

    :first-child {
      .ds-item {
        padding-left: 0 !important;
      }
    }

    :last-child,
    .ds-selected-range-end {
      .ds-item {
        padding-right: 0 !important;
      }
    }

    &.ds-grid-select-row-day,
    &.ds-grid-select-row-month,
    &.ds-grid-select-row-year {
      &:last-child {
        margin-bottom: 0;
      }
    }

    &.ds-grid-select-row-day {
      margin-bottom: 1px;

      .ds-item-cell {
        .ds-another-month {
          color: @color-gray-500;
        }

        .ds-disabled {
          color: @color-gray-400;
        }

        > .ds-item {
          > span {
            display: inline-block;
            width: 28px;
            font-family: 'Roboto Regular';
            &:hover {
              background-color: darken(@color-white, 10%);
              border-radius: 4px;
            }
          }
        }

        &.ds-range {
          > .ds-item {
            > span {
              &:hover {
                background-color: rgba(30, 179, 134, 0.2);
              }
            }
          }
        }

        &.ds-selected {
          > .ds-item {
            > span {
              &:hover {
                background-color: darken(@color-primary, 10%);
              }
            }
          }
        }

        &.ds-disabled {
          > .ds-item {
            > span {
              &:hover {
                background-color: transparent;
              }
            }
          }
        }
      }
    }

    &.ds-grid-select-row-month,
    &.ds-grid-select-row-year {
      .ds-item-cell {
        > .ds-item {
          > span {
            border-radius: 4px;
            &:hover {
              background-color: darken(@color-white, 10%);
            }
          }

          &.ds-selected-year,
          &.ds-selected-month {
            > span {
              border-radius: 4px;
              &:hover {
                background-color: darken(@color-primary, 10%);
              }
            }
          }
        }

        &.ds-disabled {
          > .ds-item {
            > span {
              &:hover {
                background-color: transparent;
              }
            }
          }
        }
      }
    }

    &.ds-grid-select-row-month {
      margin-bottom: 32px;

      span {
        margin-top: 0 !important;
      }

      .ds-item-cell {
        .ds-grid-item-big {
          display: inline-block;
          box-sizing: content-box;
          width: 70px;
          padding: 6px 4px;
        }
      }
    }

    &.ds-grid-select-row-year {
      margin-top: 0 !important;
      margin-bottom: 10px;

      .ds-item-cell {
        .ds-grid-item-big {
          display: inline-block;
          box-sizing: content-box;
          width: 42px;
          padding: 6px 4px;
        }
      }
    }
  }
}
</style>
