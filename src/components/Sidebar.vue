<!--
  Side menu with header and footer

  Usage:

    <Sidebar
      :items="[...]"                      - Array of items to render
      :active-key="(item, index) => ..."  - Value for "is active" check
      :active.sync="active"               - Value for active item
      :active-child.sync="activeChild"    - Value for active child item
      :opened="sidebarOpened"             - Is it opened (in mobile view)
      :disabled="bool"                    - Disable the entire sidebar
      @item:click="(...) => ..."          - Click on a sidebar item
    >

    </Sidebar>

  Properties:

    items - Array<Object>, required. Items to display on the sidebar. Where
      objects look like:

        :items="[{
          title: String,           - Displayed name
          icon: ?String,           - Icon name or svg code (See Icon.vue)
          children: ?Array<Item>,  - Submenu items
          disabled: ?Boolean,      - Is the item disabled
          badge: ?{text, color},   - Badge on the right of the element
          href: ?String            - Optional hyperlink
        }, {
          ...
        }}

    activeKey - Function. Allows you to override value determining
      the active item. Values are compared with `===` operator. By default
      item's index is used

    active - Any. Index (can be changed with activeKey property) for the
      currently active item. Supports .sync modifier

    activeChild - Any. Same as active, but for child element

    opened - Boolean. Is sidebar shown in the mobile view. Supports .sync
      modifier that lets the component close itself (when user clicks outside)

    disabled - Boolean. Disables the entire component

  Events:

    item:click - Click on the sidebar's item. Arguments:
      item       - Object from items array
      index      - index of the object in the items array
      childIndex - index of the child in the item.children array or null
      event      - click event
-->

<template>
  <div
    :class="[
      'ds-sidebar-container',
      {
        'ds-opened': opened,
        'ds-collapsed': collapsed,
        'ds-disabled': disabled,
        'ds-alt': alt
      }
    ]"
  >
    <div class="ds-sidebar">
      <div class="ds-header">
        <slot name="header">
          <div class="ds-header-default">
            Sidebar header
          </div>
        </slot>
      </div>

      <div class="ds-items">
        <template v-for="(item, index) in items">
          <div class="ds-item-wrapper">
            <a
              :class="[
                'ds-item',
                {
                  'ds-active':
                    activeKey(item, index) === active ||
                    temporaryActiveItem === activeKey(item, index),
                  'ds-disabled': disabled || item.disabled,
                  'ds-item-opened':
                    isItemHaveChild(item) ||
                    temporaryActiveItem === activeKey(item, index)
                }
              ]"
              :href="item.href"
              :key="activeKey(item, index)"
              :tabindex="!disabled && !item.disabled && 0"
              @keypress.enter.space.prevent="
                itemClick(item, index, null, $event)
              "
              @click="itemClick(item, index, null, $event)"
            >
              <Icon
                v-if="item.icon"
                :source="item.icon"
                size="22px"
                padding="6px 0"
                color="gray-400"
              />

              <div class="ds-title">{{ item.title }}</div>

              <div
                v-if="item.badge"
                class="ds-badge"
                :style="{
                  'background-color':
                    disabled || item.disabled
                      ? COLORS['gray-300']
                      : COLORS[item.badge.color] || item.badge.color || 'red'
                }"
              >
                {{ item.badge.text }}
              </div>

              <Icon
                class="ds-expand-icon"
                v-if="item.children && item.children.length && !collapsed"
                :source="
                  (activeKey(item, index) === active && subSectionOpened) ||
                  (temporaryActiveItem === activeKey(item, index) &&
                    temporaryOpened)
                    ? 'expand_less'
                    : 'expand_more'
                "
              />
            </a>
            <section
              :class="[
                'ds-children',
                {
                  'ds-opened':
                    (activeKey(item, index) === active && subSectionOpened) ||
                    (temporaryActiveItem === activeKey(item, index) &&
                      temporaryOpened)
                }
              ]"
              :key="index"
            >
              <a
                v-for="(child, childIndex) in item.children"
                :key="activeKey(child, childIndex)"
                :class="[
                  'ds-item',
                  'ds-child-item',
                  {
                    'ds-active': activeKey(child, childIndex) === activeChild,
                    'ds-disabled': disabled || child.disabled
                  }
                ]"
                :href="item.href"
                :tabindex="
                  !disabled &&
                    activeKey(item, index) === active &&
                    !child.disabled &&
                    0
                "
                @keypress.enter.space.prevent="
                  itemClick(child, index, childIndex, $event)
                "
                @click="itemClick(child, index, childIndex, $event)"
              >
                {{ child.title }}
              </a>
            </section>
          </div>
        </template>
      </div>
      <div class="ds-footer"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import { COLORS } from '../styles/vars';

export default {
  name: 'Sidebar',
  components: {
    Icon
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    activeKey: {
      type: Function,
      default: (item, index) => index
    },
    active: {
      default: 0
    },
    activeChild: {
      default: 0
    },
    alt: Boolean,
    opened: Boolean,
    collapsed: Boolean,
    disabled: Boolean,
    subSectionOpened: Boolean
  },
  data: () => ({
    COLORS,
    isActiveChild: false,
    temporaryActiveItem: undefined,
    temporaryOpened: false
  }),
  methods: {
    temporaryReset() {
      this.temporaryActiveItem = undefined;
      this.temporaryOpened = false;
    },
    isItemHaveChild(item) {
      return item.children && item.children.length > 0;
    },
    itemClick(item, index, childIndex, event) {
      if (this.disabled || item.disabled) {
        return;
      }

      if (this.isItemHaveChild(item)) {
        if (this.activeKey(item, index) === this.active) {
          this.temporaryReset();
          this.$emit('update:sub-section-opened', !this.subSectionOpened);
        }

        if (this.activeKey(item, index) === this.temporaryActiveItem) {
          this.temporaryOpened = !this.temporaryOpened;
        } else {
          this.temporaryOpened = true;
        }

        if (this.active !== this.activeKey(item, index)) {
          this.temporaryActiveItem = this.activeKey(item, index);
        }

        return;
      }

      this.$emit(
        'update:activeChild',
        this.activeKey ? this.activeKey(item, childIndex) : childIndex
      );
      this.$emit('item:click', item, index, childIndex, event);

      if (childIndex === null) {
        this.$emit('update:sub-section-opened', false);
      }

      this.temporaryReset();
    },
    outsideClick(event) {
      // Close sidebar on an outside click
      if (!this.opened) {
        return;
      }
      let el = event.target;
      while (el.parentNode) {
        if (el === this.$el) {
          return;
        }
        el = el.parentNode;
      }
      this.$emit('update:opened', false);
    }
  },
  mounted() {
    document.addEventListener('click', this.outsideClick, true);
    if (this.collapsed) {
      this.$el.parentNode.classList.add('ds-sidebar-collpased-padding');
    } else {
      this.$el.parentNode.classList.add('ds-sidebar-padding');
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.outsideClick, true);
  },
  watch: {
    collapsed(value) {
      if (value) {
        this.$el.parentNode.classList.remove('ds-sidebar-padding');
        this.$el.parentNode.classList.add('ds-sidebar-collpased-padding');
      } else {
        this.$el.parentNode.classList.remove('ds-sidebar-collpased-padding');
        this.$el.parentNode.classList.add('ds-sidebar-padding');
      }
    },
    activeChild: {
      immediate: true,
      handler(value) {
        this.isActiveChild = value.toString().split('-').length > 1;
        this.$emit('update:sub-section-opened', this.isActiveChild);
      }
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-sidebar-container {
  box-shadow: @sidebar-shadow;
  box-sizing: border-box;
  left: 0;
  overflow: hidden;
  position: fixed;
  z-index: @z-index-sidebar;
  width: @sidebar-width;
  height: @sidebar-height;

  &.ds-collapsed {
    width: 76px;

    .ds-sidebar {
      width: 100%;
      overflow-y: auto;

      .ds-header,
      .ds-item {
        width: 100%;

        .ds-title {
          display: none;
        }

        .ds-badge {
          display: none;
        }
      }

      .ds-child-item {
        display: none;
      }
    }
  }
}

.ds-sidebar {
  background-color: @color-white;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: @sidebar-width + 20px; //
  overflow-y: scroll; //
  & > * {
    // Hiding scrollbar
    max-width: @sidebar-width; //
  } //

  &.ds-disabled {
    background: @color-gray-100;
  }

  .ds-header,
  .ds-item {
    box-sizing: border-box;
    height: @sidebar-item-height;
    padding: 21px 26px 21px 28px;
    flex: 0 0 auto;
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    text-indent: 0;
    list-style-type: 0;
  }

  .ds-item {
    font-family: @robotoFont;
    font-size: 14px;
    line-height: 16px;
    color: @color-dark;
    align-items: center;
    cursor: pointer;
    display: flex;
    transition: all 0.1s ease-in-out;

    .ds-icon[expand_more] {
      transition: transform 0.1s ease;
    }

    &.ds-active {
      border-left: solid 2px @color-primary;
      padding-left: 26px;
      background-color: @color-gray-100;

      .ds-icon svg {
        fill: @color-primary;
      }
      .ds-icon[expand_more] {
        transform: rotate(180deg);
      }
    }

    &.ds-disabled {
      background: @color-gray-100;
      color: @color-gray-400;
      cursor: initial;
      .ds-icon svg {
        fill: @color-gray-400;
      }
      &:hover {
        background: @color-gray-100;
      }
    }

    &:hover,
    &:focus {
      background-color: @color-gray-100;
      text-decoration: none;
      outline: none;
    }

    &:active {
      background: darken(@color-white, 10%);
    }

    &.ds-child-item {
      padding-left: 64px;

      &.ds-active {
        border-left: none;
        background-color: @color-gray-100;
      }
    }

    .ds-title {
      padding-left: 18px;
      flex: 1 0 auto;
    }

    .ds-badge {
      height: 20px;
      min-width: 20px;
      margin: 2px;
      padding: 2px 6px;
      box-sizing: border-box;
      border-radius: 10px;
      font-family: Cabin;
      font-size: 12px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.33;
      letter-spacing: normal;
      text-align: center;
      color: @color-white;
    }
  }

  .ds-children {
    transition: max-height 0.1s ease;
    max-height: 5000px;
    overflow-y: hidden;
    &:not(.ds-opened) {
      max-height: 0;
    }
  }

  .ds-footer:not(:empty) {
    box-sizing: border-box;
    margin-top: auto;
    padding: @sidebar-item-padding;
    box-shadow: inset 0 1px 0 0 #f1f1f1;
  }
}

.ds-sidebar-container {
  &.ds-alt {
    .ds-sidebar {
      .ds-header,
      .ds-items,
      .ds-footer {
        background-color: #2d3047;
      }

      .ds-header {
        height: 70px;
        padding: 0 14px;

        .ds-header-default {
          display: flex;
          align-items: center;
          height: 100%;
          color: @color-gray-400;
          cursor: default;
          margin-left: 14px;
        }
      }

      .ds-items {
        .ds-item-wrapper {
          min-height: 58px;
          margin: 0 14px;
          .ds-item {
            border-radius: 4px;
            height: 52px;
            padding: 15px 12px;

            .ds-title {
              height: 16px;
              font-family: Roboto, sans-serif;
              font-size: 14px;
              letter-spacing: 0.3px;
              line-height: 16px;
              color: @color-gray-400;
              padding-left: 12px;
            }

            .icon-wrapper {
              .ds-icon {
                fill: @color-gray-400 !important;
              }
            }

            &:not(.ds-active) {
              &:hover {
                background-color: #2d3047;
                color: #fafbff;

                .ds-title {
                  color: #fafbff;
                }

                .icon-wrapper {
                  .ds-icon {
                    fill: #fafbff !important;
                  }
                }
              }
            }

            &.ds-active {
              border-left: none;

              .ds-title {
                color: #2d3047;
              }

              &.ds-item-opened {
                background-color: #2d3047;

                .ds-title {
                  color: #fafbff;
                }

                .ds-expand-icon {
                  .ds-icon svg {
                    fill: #fafbff !important;
                  }
                }
              }
            }
          }

          .ds-children {
            .ds-child-item {
              height: 40px !important;
              padding: 12px 0 12px 46px;

              height: 16px;
              font-family: Roboto, sans-serif;
              font-size: 14px;
              letter-spacing: 0.3px;
              line-height: 16px;
              color: @color-gray-400;

              &.ds-active {
                color: #2d3047;
              }
            }
          }
        }
      }

      .ds-footer {
        height: 100%;
      }
    }
  }
}

@media @hide-sidebar {
  .ds-sidebar-container {
    transition: left 0.1s ease;
    &:not(.ds-opened) {
      left: -@sidebar-width;
    }
  }
}

@media @show-sidebar {
  .ds-sidebar-padding {
    padding-left: @sidebar-width;
  }

  .ds-sidebar-collpased-padding {
    padding-left: 76px;
  }

  #ds-open-sidebar-button {
    display: none;
  }
}
</style>
