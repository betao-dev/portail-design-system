<!--
  Table component for displaying list of data

  Usage:

  <Table v-model="value"                    - Data for displaying table
         :headers="headers"                 - Array of object which contains configuration of the each rows
         :identifierField="identifierField" - Field which is identifier for emit data from pickup event
         @pickup>                           - Emitted when click on record, will emit current record data or identifier
                                              data with index on current page.
  </Table>
-->

<template>
  <div :class="['ds-table-wrapper', { 'ds-table-swipe-active': swipeActive }]">
    <div
      :class="['ds-table-header', { 'ds-table-header-mobile': mobileHeaders }]"
    >
      <Card class="ds-header-wrapper">
        <div
          class="ds-header"
          v-for="(header, index) in headers"
          :style="getStyles(header)"
          :key="index"
        >
          <div
            class="ds-title-wrapper"
            :class="header.sortable && 'ds-sortable'"
            @click="sorting(header)"
            v-if="hasFilter(header)"
          >
            <span class="ds-header-title">{{ header.title }}</span>
            <Icon
              color="#778CA2"
              v-if="header.sortable && sortKey === header.key"
              :source="sortType === '+' ? 'arrow_upward' : 'arrow_downward'"
              size="16px"
            />
          </div>
          <slot :name="getFilterSlotName(header)"></slot>
        </div>
      </Card>
    </div>

    <div class="ds-table-body-wrapper">
      <div
        class="ds-table-body"
        v-for="(row, dataIndex) in pageItems"
        :key="dataIndex"
        @click="onClick(row, dataIndex)"
        v-swipe:ds-swipe-container.left.single
      >
        <div
          :class="[
            'ds-data-wrapper',
            dataIndex === hoverRowIndex
              ? 'ds-data-wrapper-hover'
              : 'ds-data-wrapper-blur'
          ]"
          @mouseover="onMouseover(dataIndex)"
          @mouseleave="onMouseleave"
        >
          <span
            v-for="(header, index) in headers"
            :class="[
              'ds-data-item',
              { 'ds-data-desktop-item': isMobile && header.desktopOnly }
            ]"
            :style="getStyles(header)"
            :key="index"
          >
            <slot
              :name="getSlotName(header)"
              :value="getCellValue(row, header)"
              :orgValue="getOrgValue(row, header)"
              :row="row"
            >
            </slot>

            <template v-if="!hasSlot(header)">
              {{ getCellValue(row, header) }}
            </template>
          </span>
          <slot name="swipe-container" :row="row" :index="dataIndex"></slot>
        </div>
      </div>
    </div>

    <div class="ds-table-footer">
      <div
        v-if="pagination && (!isMobile || !mobileFooter)"
        :class="[
          'pagination-wrapper',
          { 'pagination-minimal-wrapper': paginationMinimal }
        ]"
      >
        <div class="left" v-if="!paginationMinimal">
          <span>{{ 'Total :' | dsTranslate }}</span>
          <span> {{ total }} </span>
          <span> {{ unit }} </span>
        </div>

        <div class="right">
          <div class="ds-size-select-wrapper" v-if="!paginationMinimal">
            <span>{{ 'Show' | dsTranslate }}</span>
            <Select
              md
              class="ds-size-selector"
              @change="updatePageSize"
              :value="pageSize"
              :valueMode="true"
              :options="pageSizes"
            />
            <span>{{ 'per page' | dsTranslate }}</span>
          </div>

          <Pagination
            :total="total"
            :pageSize="pageSize"
            :current="current"
            @page:change="updatePage"
          />
        </div>
      </div>
      <div
        :class="[
          'ds-mobile-loader-wrapper',
          { 'ds-mobile-loader-apply': loader }
        ]"
        v-else-if="pagination && isMobile && mobileFooter"
      >
        <Loader v-model="loader" :opacity="0"></Loader>
      </div>
    </div>
  </div>
</template>

<script>
const SORT_TYPES = {
  ASC: '+',
  DSC: '-'
};

import Card from './Card';
import Icon from './Icon';
import Pagination from './Pagination';
import Loader from './Loader';
import Select from './Select';
import Swipe from './../directives/swipe';
import { get } from 'lodash';
import { MOBILE_WIDTH } from '../styles/vars';

export default {
  name: 'Table',
  components: { Card, Icon, Pagination, Select, Loader },
  directives: {
    swipe: Swipe
  },
  props: {
    value: Array,
    headers: {
      type: Array,
      default: () => []
    },
    pagination: Boolean,
    paginationMinimal: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: Number,
    current: Number,
    unit: String,
    identifierField: String,
    orderingKey: String,
    mobileHeaders: Boolean,
    mobileFooter: Boolean,
    loader: Boolean,
    swipeActive: Boolean
  },
  data: () => ({
    sortType: null,
    sortKey: null,
    pageItems: [],
    pageSizes: [5, 10, 15, 20, 25, 50],
    hoverRowIndex: undefined,
    windowWidth: window.innerWidth
  }),
  methods: {
    getSlotName(header) {
      return this.isMobile && header.desktopOnly
        ? undefined
        : `cell-${header.key}`;
    },
    getFilterSlotName(header) {
      return this.isMobile && header.desktopOnly
        ? undefined
        : `filter-${header.key}`;
    },
    hasFilter(header) {
      return this.isMobile && header.desktopOnly ? false : header.title;
    },
    hasSlot(header) {
      if (this.isMobile && header.desktopOnly) {
        return true;
      } else {
        const slotName = `cell-${header.key}`;
        return !!this.$scopedSlots[slotName];
      }
    },
    getStyles(header) {
      let styles = {};
      if (this.isMobile && header.desktopOnly) {
        return styles;
      } else {
        let width = this.isMobile
          ? header.mobileWidth || header.width
          : header.width;
        let minWidth = this.isMobile
          ? header.mobileMinWidth || header.minWidth
          : header.minWidth;

        width ? (styles.flexBasis = width) : (styles.flex = 1);
        styles.minWidth = minWidth;

        return styles;
      }
    },
    onClick(data, dataIndex) {
      if (this.identifierField) {
        this.$emit('pickup', data[this.identifierField], dataIndex);
      } else {
        this.$emit('pickup', data, dataIndex);
      }
    },
    getCellValue(value, header) {
      let cellValue = get(value, header.key, '') || '';
      if (header.filter) {
        cellValue = header.filter(cellValue);
      }
      cellValue = `${header.prefix || ''} ${cellValue} ${header.suffix || ''}`;
      return cellValue;
    },
    getOrgValue(value, header) {
      return get(value, header.key, '');
    },
    sorting(header) {
      if (!header.sortable) return;
      if (this.sortKey === header.key && this.sortType === SORT_TYPES.ASC) {
        this.sortType = SORT_TYPES.DSC;
      } else {
        this.sortType = SORT_TYPES.ASC;
      }
      this.sortKey = header.key;

      const sortCombinationKey = (this.sortType + this.sortKey).replace(
        '+',
        ''
      );
      this.$emit('sort', sortCombinationKey);
    },
    updatePage(page) {
      this.$emit('update:page', page);
    },
    updatePageSize(size) {
      this.$emit('update:size', size);
      this.$emit('update:page', 1);
    },
    onMouseover(index) {
      this.hoverRowIndex = index;
    },
    onMouseleave() {
      this.hoverRowIndex = undefined;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  computed: {
    isMobile() {
      return this.windowWidth <= MOBILE_WIDTH;
    }
  },
  mounted() {
    this.pageItems = this.value;
    if (this.orderingKey) {
      if (this.orderingKey.includes('-')) {
        this.sortType = SORT_TYPES.DSC;
      } else {
        this.sortType = SORT_TYPES.ASC;
      }
      this.sortKey = this.orderingKey.replace('-', '');
    }

    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  watch: {
    value(val) {
      this.pageItems = val;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-table-wrapper {
  color: @color-gray-500;

  .ds-table-header {
    &:not(.ds-table-header-mobile) {
      @media @screen-mobile {
        display: none;
      }
    }

    .ds-header-wrapper {
      display: flex;
      font-family: Roboto Medium;
      font-size: 12px;
      line-height: 20px;
      padding: 0 0 14px;
      cursor: default;
      background-color: transparent;
      box-shadow: none;

      .ds-header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: center;
        padding-right: 16px;
        box-sizing: border-box;

        &:last-child {
          padding-right: 0px;
        }

        .ds-title-wrapper {
          display: flex;
          align-items: center;
          width: 100%;
          height: 20px;
          margin-bottom: 8px;

          &.ds-sortable {
            cursor: pointer;
          }

          .ds-header-title {
            font-size: 12px;
            line-height: 14px;
            text-transform: uppercase;
          }
        }

        &::v-deep {
          > * {
            width: 100% !important;
          }
        }
      }
    }
  }

  .ds-table-body-wrapper {
    color: @color-dark;
    font-family: Lato;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    overflow: hidden;

    .ds-table-body {
      .ds-data-wrapper {
        display: flex;
        padding: 10px 0;
        margin-bottom: 6px;
        background-color: @color-white;
        align-items: center;
        border-radius: 4px;
        box-shadow: none;
        border-color: white;
        box-sizing: border-box;

        @media @screen-mobile {
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 16px 16px 12px 16px;
        }

        span {
          box-sizing: border-box;
          padding-right: 16px;

          &::v-deep {
            > * {
              max-width: 100%;
            }
          }

          @media @screen-mobile {
            font-size: 14px;
          }

          &:first-child {
            padding-left: 24px;
          }

          &:last-child {
            padding-right: 24px;
          }
        }

        &.ds-data-wrapper-hover {
          box-shadow: 0 2px 16px 0 rgba(153, 155, 168, 0.16);
          transition: box-shadow 0.3s;
          z-index: 99;
        }

        &.ds-data-wrapper-blur {
          transition: box-shadow 0.3s;
        }

        .ds-data-item {
          &.ds-data-desktop-item {
            display: none;
            padding: 0;
          }
        }
      }

      &:last-child {
        .ds-data-wrapper {
          margin-bottom: 24px;
        }
      }
    }
  }

  .ds-table-footer {
    .pagination-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
      align-items: center;

      .left {
        font-size: 14px;
        line-height: 16px;
        color: @color-gray-500;
      }

      .right {
        display: flex;
        align-items: center;

        .ds-size-select-wrapper {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 32px;

          .ds-size-selector {
            width: 70px;
          }

          > * {
            margin-right: 8px;
          }
        }
      }

      &.pagination-minimal-wrapper {
        justify-content: flex-end;
      }
    }

    .ds-mobile-loader-wrapper {
      position: relative;

      &.ds-mobile-loader-apply {
        height: 36px;

        &::v-deep {
          .ds-loader {
            top: 20px;
            left: 20px;
          }
        }
      }
    }
  }
}
</style>
