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
  <div :class="['sidebar-container', {opened, disabled}]">
    <div class="sidebar">
      <div class="header">
        <slot name="header">Sidebar header</slot>
      </div>

      <div class="items">
        <template v-for="(item, index) in items">
          <a
            :class="['item', {
              active: activeKey(item, index) === active,
              disabled: disabled || item.disabled
            }]"
            :href="item.href"
            :key="activeKey(item, index)"
            :tabindex="!disabled && !item.disabled && 0"
            @keypress.enter.space.prevent="itemClick(item, index, null, $event)"
            @click="itemClick(item, index, null, $event)"
          >
            <Icon
              v-if="item.icon"
              :source="item.icon"
              size="18px"
              padding="6px 0"
              color="gray-400"
            />

            <div class="title">{{ item.title }}</div>

            <div v-if="item.badge" class="badge" :style="{
              'background-color':
                disabled || item.disabled ?
                  COLORS['gray-300'] :
                  COLORS[item.badge.color] || item.badge.color || 'red',
            }">
              {{item.badge.text}}
            </div>

            <Icon
              v-if="item.children && item.children.length"
              expand_more
            />
          </a>
          <section :key="index" :class="[
            'children',
            {opened: activeKey(item, index) === active},
          ]">
            <a
              v-for="(child, childIndex) in item.children"
              :key="activeKey(child, childIndex)"
              :class="['item', 'child-item', {
                active: activeKey(child, childIndex) === activeChild,
                disabled: disabled || child.disabled
              }]"
              :href="item.href"
              :tabindex="
                !disabled &&
                activeKey(item, index) === active &&
                !child.disabled &&
                0
              "
              @keypress.enter.space.prevent="itemClick(child, index, childIndex, $event)"
              @click="itemClick(child, index, childIndex, $event)"
            >
              {{ child.title }}
            </a>
          </section>
        </template>
      </div>

      <div class="footer"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'
import {COLORS} from '../styles/vars'

export default {
  name: 'Sidebar',
  components: {
    Icon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    activeKey: {
      type: Function,
      default: (item, index) => index,
    },
    active: {
      default: 0,
    },
    activeChild: {
      default: 0,
    },
    opened: Boolean,
    disabled: Boolean,
  },
  data: () => ({COLORS}),
  methods: {
    itemClick(item, index, childIndex, event) {
      if (this.disabled || item.disabled) {
        return
      }
      this.$emit('update:active', this.activeKey(item, index))
      this.$emit(
        'update:activeChild',
        childIndex || this.activeKey(item, childIndex)
      )
      this.$emit('item:click', item, index, childIndex, event)
    },
    outsideClick(event) {
      // Close sidebar on an outside click
      if (!this.opened) {
        return
      }
      let el = event.target
      while (el.parentNode) {
        if (el === this.$el) {
          return
        }
        el = el.parentNode
      }
      this.$emit('update:opened', false)
    },
  },
  mounted() {
    document.addEventListener('click', this.outsideClick, true)
    this.$el.parentNode.classList.add('sidebar-padding')
  },
  beforeDestroy() {
    document.removeEventListener('click', this.outsideClick, true)
  },
}
</script>

<style lang="less">
@import '../styles/vars';

.sidebar-container {
  bottom: 0;
  box-shadow: @sidebar-shadow;
  box-sizing: border-box;
  left: 0;
  overflow: hidden;
  position: fixed;
  z-index: 1;
  top: 0;
  width:  @sidebar-width;
}

.sidebar {
  background-color: @color-white;
  height: 100%;
  display: flex;
  flex-direction: column;
  width:  @sidebar-width + 20px;  //
  overflow-y: scroll;             //
  & > * {                         // Hiding scrollbar
    max-width: @sidebar-width;    //
  }                               //


  &.disabled {
    background: @color-gray-100;
  }

  .header, .item {
    box-shadow: @sidebar-item-shadow;
    box-sizing: border-box;
    height: @sidebar-item-height;
    padding: @sidebar-item-padding;
    flex: 0 0 auto;
  }

  .header, .items {
    margin-bottom: 16px;
  }

  ul, li {
    margin:0;
    padding: 0;
    text-indent: 0;
    list-style-type: 0;
  }

  .item {
    .font-desktop-body-regular-dark();
    align-items: center;
    cursor: pointer;
    display: flex;
    transition: all .1s ease-in-out;

    &.child-item {
      .font-desktop-body-regular-gray();
      padding-left: 50px;
    }

    .icon[expand_more] {
      transition: transform .1s ease;
    }

    &.active {
      .font-desktop-body-regular-accent();
      .icon svg {
        fill: @color-primary;
      }
      .icon[expand_more] {
        transform: rotate(180deg);
      }
    }

    &.disabled {
      background: @color-gray-100;
      color: @color-gray-400;
      cursor: initial;
      .icon svg {
        fill: @color-gray-400;
      }
      &:hover {
        background: @color-gray-100;
      }
    }

    &:hover, &:focus  {
      background: darken(@color-white, 5%);
      text-decoration: none;
      outline: none;
    }

    &:active {
      background: darken(@color-white, 10%);
    }

    .title {
      padding-left: 12px;
      flex: 1 0 auto;
    }

    .badge {
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

  .children {
    transition: max-height .1s ease;
    max-height: 1000px;
    overflow: hidden;
    &:not(.opened) {
      max-height: 0;
    }
  }

  .footer:not(:empty) {
    box-sizing: border-box;
    margin-top: auto;
    padding: @sidebar-item-padding;
    box-shadow: inset 0 1px 0 0 #F1F1F1;
  }
}

@media @hide-sidebar {
  .sidebar-container {
    transition: left .1s ease;
    &:not(.opened) {
      left: -@sidebar-width;
    }
  }
}

@media @show-sidebar {
  .sidebar-padding {
    padding-left: @sidebar-width;
  }
  #open-sidebar-button {
    display: none;
  }
}
</style>
