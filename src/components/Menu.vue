<!--
  Menu

  Usage:

    <Menu
      :items="[...]"                      - Array of items to render
      @item:click="(...) => ..."          - Click on a menu item
    />

  Properties:

    items - Array<Object>, required. Items to display on the Menu. Where
      objects look like:

        :items="[{
          title: String,           - Displayed name
          icon: ?String,           - Icon name or svg code (See Icon.vue)
          disabled: ?Boolean,      - Is the item disabled
          href: ?String            - Optional hyperlink
        }, {
          ...
        }]

  Events:

    item:click - Click on the menu's item. Arguments:
      item       - Object from items array
      index      - index of the object in the items array
-->

<template>
  <div class="ds-menu-wrapper" :style="stylesWrapper">
    <div class="ds-menu-header">
      <slot name="header"></slot>
    </div>

    <div class="ds-item-wrapper">
      <template v-for="(item, index) in items">
        <a
          class="ds-item"
          :class="{ 'ds-disabled': item.disabled }"
          :key="index"
          :href="item.href"
          @click="itemClick(item, index)"
        >
          <Icon
            v-if="item.icon"
            :source="item.icon"
            size="18px"
            color="gray-500"
          />
          <span class="ds-menu-title">{{ item.title }}</span>
        </a>
      </template>
    </div>

    <div class="ds-menu-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'Menu',
  components: {
    Icon
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    width: String,
    height: String,
    title: String,
    opened: Boolean
  },
  data: () => ({}),
  methods: {
    itemClick(item, index) {
      if (item.disabled) return;
      this.$emit('item:click', item, index);
      this.closeMenu();
    },
    closeMenu() {
      this.$emit('update:opened', false);
    }
  },
  computed: {
    stylesWrapper() {
      return {
        width: this.width,
        height: this.height
      };
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-menu-wrapper {
  background-color: @color-white;
  box-shadow: @card-shadow;
  overflow: hidden;
  font-family: Roboto Medium;

  .ds-header-content {
    display: flex;
    justify-content: space-between;
    height: 56px;
    background-color: #f2f4f7;
    box-shadow: inset 0 -1px 0 0 @color-gray-300;

    .ds-header-title {
      height: 24px;
      color: @color-dark;
      font-family: Asap;
      font-size: 18px;
      line-height: 24px;
      margin: 16px 0 16px 16px;
      cursor: pointer;
    }

    .ds-header-icon {
      margin-top: 6px;

      &:active {
        background: none;
      }
    }
  }

  .ds-item-wrapper {
    .ds-item {
      text-decoration: none;
      color: @color-gray-500;
      font-family: Roboto Medium;
      display: flex;
      align-items: center;
      padding: 20px;
      cursor: pointer;

      &:hover:not(.ds-disabled) {
        text-decoration: none;
        color: @color-dark;

        .ds-icon {
          fill: @color-dark !important;
        }
      }

      &.ds-disabled {
        color: @color-gray-400;
      }

      .ds-divider {
        height: @app-menu-divider-height;
        width: 100%;
        background: @color-gray-300;
      }

      .ds-menu-title {
        margin-left: 8px;
        font-size: 12px;
        line-height: 14px;
        padding: 0;
      }
    }
  }

  .ds-menu-footer {
    > * {
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      width: 100%;
      background-color: #f2f4f7;
      box-shadow: inset 0 1px 0 0 @color-gray-300;
    }
  }
}
</style>
