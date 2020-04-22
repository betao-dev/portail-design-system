<!--
  Button with an optional icon and different styles

  Usage:

    --- Tabs --

    Tabs can get properties:

      disabled - disable all tabs.
      active: 0 - index of active tab. Required property.
      tabs: [] - Array of objects. Required property. Each object describes one tab and can have next properties:

        - text - tab name
        - hidden - Boolean value.
        - disabled - Boolean value.

    Example:
        [
          {
            text: 'TAB 1',  (String)
          },
          {
            text: 'TAB 2',  (String)
            disabled: true  (Boolean)
          },
          {
            text: 'TAB 3',  (String)
          }
      ]

    Events:

    @tab:click - Return tab object
-->
<template>
  <div class="ds-tabs-container" :class="cardWrapper && 'ds-card-wrapper'">
    <div
      :class="{
        'ds-simple-tabs-header': simpleTabs,
        'ds-alt-tabs-header': altTabs,
        'ds-tabs-header': !simpleTabs && !altTabs
      }"
      :style="{ 'justify-content': tabsAlign }"
    >
      <div class="ds-tabs-row" :class="fullHeader && 'full-header'">
        <template v-for="(tab, index) in tabs">
          <div
            v-if="!tab.hidden"
            :key="index"
            :class="[
              activeTabClass(index),
              {
                'ds-simple-tab': simpleTabs,
                'ds-alt-tab': altTabs,
                'ds-tab': !simpleTabs && !altTabs,
                'ds-disabled': disabled || tab.disabled
              }
            ]"
            @click="onTabClick(tab, index)"
          >
            <template v-if="$slots[`tab-header-${index + 1}`]">
              <slot :name="`tab-header-${index + 1}`"></slot>
            </template>
            <template v-else>
              {{ tab.text }}
            </template>
          </div>
        </template>
      </div>
    </div>

    <span
      class="ds-tabs-header-additional-content"
      :style="additionalContentStyles"
    >
      <slot name="tabs-header-additional-content"></slot>
    </span>
    <div class="ds-tabs-body" :id="idContent">
      <slot :name="activeTabBody"></slot>
      <Loader
        v-if="enableLoader"
        v-model="enableLoader"
        :target="idContent"
      ></Loader>
    </div>
  </div>
</template>

<script>
import Loader from './Loader';

export default {
  name: 'Tabs',
  components: { Loader },
  props: {
    tabsAlign: {
      type: String,
      default: 'center',
      validator(value) {
        return (
          ['center', 'flex-start', 'flex-end', 'space-between'].indexOf(
            value
          ) !== -1
        );
      }
    },
    simpleTabs: Boolean,
    altTabs: Boolean,
    fullHeader: {
      type: Boolean,
      default: false
    },
    cardWrapper: {
      type: Boolean,
      default: false
    },
    active: {
      required: true,
      type: Number
    },
    disabled: Boolean,
    tabs: {
      required: true,
      type: [Array, Number]
    },
    enableLoader: {
      type: Boolean,
      default: false
    },
    additionalContentStyles: Object
  },
  data: () => ({
    startX: undefined,
    minDistance: 100,
    idContent: 'ds-tabs-content-'.concat(
      Math.random()
        .toString(15)
        .substring(5)
    )
  }),
  computed: {
    activeTabBody() {
      return `tabs-${this.active}`;
    }
  },
  methods: {
    activeTab(index) {
      return this.active - 1 === index;
    },
    onTabClick(tab, index) {
      if (this.disabled || tab.disabled) return;
      this.$emit('tab:click', tab, ++index);
    },
    swipeTab(regulator) {
      let futureTab = this.active + regulator;

      if (futureTab < this.tabs.length && futureTab >= 0) {
        this.onTabClick(this.tabs[futureTab], futureTab);
      }
    },
    touchstart(event) {
      this.startX = event.changedTouches[0].pageX;
      event.preventDefault();
    },
    touchend(event) {
      let endX = event.changedTouches[0].pageX - this.startX;
      if (Math.abs(endX) > this.minDistance) {
        this.swipeTab(endX > 0 ? 1 : -1);
      }
      event.preventDefault();
    },
    activeTabClass(index) {
      if (this.activeTab(index)) {
        if (this.simpleTabs) {
          return 'ds-simple-active';
        } else if (this.altTabs) {
          return 'ds-alt-active';
        } else {
          return 'ds-active';
        }
      }
    }
  },
  mounted() {
    if (!this.simpleTabs) {
      this.$el.addEventListener('touchstart', this.touchstart);
      this.$el.addEventListener('touchend', this.touchend);
    }
  }
};
</script>

<style scoped lang="less">
@import '../styles/vars';

.ds-tabs-container {
  position: relative;

  &.ds-card-wrapper {
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 16px 0 rgba(153,155,168,0.16);

    .ds-tabs-header {
      border-bottom: 1px solid #F2F4F6;
    }

    .ds-tabs-body {
      padding: 20px;
    }
  }

  .ds-tabs-header,
  .ds-simple-tabs-header {
    display: flex;
    width: 100%;
    height: auto;

    .ds-tabs-row {
      display: flex;
      width: 50%;

      &.full-header {
        width: 100%;

        .ds-tab {
          flex: 1;
          padding: 19px;
          line-height: 19px;
          font-size: 16px;
          height: auto;
          border-left: none;
          border-right: none;
        }
      }

      @media @screen-mobile-all {
        & {
          width: 100%;
        }
      }
    }
  }

  .ds-tabs-header,
  .ds-alt-tabs-header {
    background-color: @color-white;
  }

  .ds-alt-tabs-header {
    display: flex;
    padding: 0 24px;
    border-bottom: 1px solid @color-gray-200;

    .ds-tabs-row {
      display: flex;

      &.full-header {
        width: 100%;

        .ds-tab {
          flex: 1;
          padding: 19px;
          line-height: 19px;
          font-size: 16px;
          height: auto;
          border-left: none;
          border-right: none;
        }
      }

      .ds-alt-tab > {
        margin-right: 26px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .ds-tab,
  .ds-simple-tab,
  .ds-alt-tab {
    display: flex;
    cursor: pointer;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    height: 48px;
  }

  .ds-tab {
    .font-components-tab-inactive();
    border-right: 1px solid @color-gray-300;

    &:first-child {
      border-left: 1px solid @color-gray-300;
    }

    &:not(.ds-disabled) {
      &:hover,
      &:focus,
      &.ds-active {
        .font-components-tab-active();
      }

      &.ds-active {
        box-shadow: inset 0 -3px 0 -1px @color-primary;
      }
    }
  }

  .ds-simple-tab {
    height: 38px;
    border-radius: 2px 2px 0 0;
    color: @color-gray-500;
    font-family: Lato;
    font-size: 14px;
    line-height: 20px;

    &:not(.ds-disabled) {
      &.ds-simple-active {
        color: @color-primary;
        background-color: @color-white;
      }
    }
  }

  .ds-alt-tab {
    height: 54.5px;
    color: @color-gray-500;
    font-family: 'Roboto Medium';
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    &:not(.ds-disabled) {
      &.ds-alt-active {
        color: @color-dark;
        border-bottom: 1.5px solid @color-dark;
      }
    }
  }

  .ds-tabs-header-additional-content {
    display: inline-block;
    position: absolute;
  }

  .ds-tabs-body {
    position: relative;
  }

  @media @screen-mobile-all {
    .ds-simple-tabs-header {
      border: 1px solid @color-gray-300;
      .ds-tabs-row {
        &.full-header {
          width: 100%;

          .ds-tab {
            flex: 1;
            padding: 19px;
            line-height: 19px;
            font-size: 16px;
            height: auto;
            border-left: none;
            border-right: none;
          }
        }

        .ds-simple-tab {
          height: 36px;
          border-right: 1px solid @color-gray-300;
          background-color: @color-gray-100;

          &:last-child {
            border-right: none;
          }
        }

        .ds-simple-active {
          background-color: @color-white;
          color: @color-dark;
        }
      }
    }
  }
}
</style>
