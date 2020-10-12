<!--
  Pagination component for display data like table with pagination

  Usage:

  <Pagination
  />
-->

<template>
  <div class="ds-pagination-wrapper">
    <div class="ds-page-items">
      <template v-if="pageCount <= 5">
        <div class="page-item-wrapper" v-for="page of pageCount" :key="page">
          <div
            class="page-item"
            :class="{ active: current === page }"
            @click="changePage(page)"
          >
            {{ startPage + page - 1 }}
          </div>
        </div>
      </template>

      <template v-else>
        <div class="page-item-wrapper" v-for="page of 5" :key="page">
          <div
            class="page-item"
            :class="{ active: current === startPage + page - 1 }"
            @click="changePage(startPage + page - 1)"
          >
            {{ startPage + page - 1 }}
          </div>
        </div>
      </template>
    </div>

    <div class="ds-next-previous-wrapper">
      <div
        class="previous"
        :class="{ disabled: current === 1 }"
        @click="previous"
      >
        <Icon source="angle_left_solid" size="18px" padding="0" />
      </div>

      <div
        class="next"
        :class="{ disabled: current === pageCount }"
        @click="next"
      >
        <Icon source="angle_right_solid" size="18px" padding="0" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'Pagination',
  components: { Icon },
  props: {
    total: Number,
    pageSize: {
      default: 10,
      type: Number
    },
    current: Number
  },
  data: () => ({
    paginationCurrent: undefined
  }),
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    },
    startPage() {
      if (this.pageCount <= 5 || this.current - 1 <= 2) {
        return 1;
      } else if (this.current + 3 >= this.pageCount) {
        return this.pageCount - 4;
      } else {
        return this.current - 2;
      }
    },
    differenceWithFirstPage() {
      return this.current - 1;
    },
    differenceWithLastpage() {
      return this.pageCount - this.current;
    }
  },
  methods: {
    previous() {
      this.$emit('page:change', this.current - 1);
    },
    next() {
      this.$emit('page:change', this.current + 1);
    },
    changePage(page) {
      this.$emit('page:change', page);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-pagination-wrapper {
  display: inline-flex;

  .ds-page-items {
    display: flex;
    margin-right: 32px;

    .page-item-wrapper {
      margin-right: 4px;

      .page-item {
        box-sizing: border-box;
        height: 40px;
        width: 40px;
        border: 1px solid @color-gray-300;
        border-radius: 4px;
        font-size: 14px;
        line-height: 32px;
        letter-spacing: 0.21px;
        color: @color-gray-500;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &.active {
          background-color: @color-primary;
          color: @color-white;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .ds-next-previous-wrapper {
    display: flex;

    .previous,
    .next {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background-color: @color-gray-300;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    .previous {
      margin-right: 22px;
    }
  }
}
</style>
