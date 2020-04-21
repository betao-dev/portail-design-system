<!--
  Basic styled component: background, padding, shadow.

  Also includes styling for some special case cards. See CardDemo.vue

  Usage:

    <Card>Hello, World!</Card>
-->
<template>
  <div @click="onClick" :class="['ds-card', { 'ds-card-alt': alt }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    alt: Boolean
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-card {
  border-radius: @card-br;
  background-color: @color-white;
  box-shadow: @card-shadow;
  padding: @card-padding;

  &.ds-card-alt {
    border-radius: 4px;
    box-shadow: 0 2px 16px 0 rgba(153, 155, 168, 0.16);
    padding: 0;
  }

  // Dashboard report card
  &.ds-dashboard-report {
    .ds-report-title {
      .font-desktop-body-regular-dark();
    }
    .ds-report-amount {
      margin-top: 12px;
      font-family: @font-family;
      font-size: 24px;
      line-height: 24px;

      &.green {
        color: @color-primary;
        svg {
          fill: @color-primary;
        }
      }
      &.yellow {
        color: @color-yellow;
        svg {
          fill: @color-yellow;
        }
      }
      &.red {
        color: @color-red;
        svg {
          fill: @color-red;
        }
      }
    }
    .ds-report-subtitle {
      .font-desktop-small-regular-gray();
      margin-top: 20px;
    }
  }

  .ds-dashboard-report {
    .ds-report-title {
      .font-desktop-body-regular-dark();
    }
    .ds-report-amount {
      margin-top: 12px;
      font-family: @font-family;
      font-size: 24px;
      line-height: 24px;

      &.green {
        color: @color-primary;
        svg {
          fill: @color-primary;
        }
      }
      &.yellow {
        color: @color-yellow;
        svg {
          fill: @color-yellow;
        }
      }
      &.red {
        color: @color-red;
        svg {
          fill: @color-red;
        }
      }
    }
    .ds-report-subtitle {
      .font-desktop-small-regular-gray();
      margin-top: 20px;
    }
  }

  // User TODO card
  &.ds-user-todo {
    display: flex;

    .ds-icon {
      margin-right: 18px;
    }
    .ds-todo-title {
      .font-desktop-small-regular-dark();
      padding: 2px 0;
      flex: 1 0 auto;
    }
    .ds-todo-badge {
      box-sizing: border-box;
      color: @color-white;
      font-family: @font-family;
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      height: 24px;
      padding: 5px 6px 3px;
      border-radius: 12px;
      background-color: #4a7a91;
    }
  }

  .ds-user-todo {
    display: flex;

    .ds-icon {
      margin-right: 18px;
    }
    .ds-todo-title {
      .font-desktop-small-regular-dark();
      padding: 2px 0;
      flex: 1 0 auto;
    }
    .ds-todo-badge {
      box-sizing: border-box;
      color: @color-white;
      font-family: @font-family;
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      height: 24px;
      padding: 5px 6px 3px;
      border-radius: 12px;
      background-color: #4a7a91;
    }
  }
}
</style>
