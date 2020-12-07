<!--
  Button with an optional icon and different styles

  Usage:

    <Button
      :big="true"                 - Bigger button
      :alt="boolean"              - Alternative design
      :plain="boolean"            - Close to no styling
      :disabled="boolean"         - Disabled
      :icon="account_circle"      - Left or the only icon
      :icon-right="edit"          - Right icon
      :link="https://example.com" - If link is set, component works as <a>  with button style
      :target="_blank"            - Same as the target attribute in <a>
      :mobile-bottom              - Show Button at the bottom with full width on mobile devices
    >
      Button label
    </Button>
-->

<template>
  <div
    :class="['ds-button-link-wrapper', { 'ds-mobile-bottom': mobileBottom }]"
  >
    <template v-if="link">
      <a
        v-on="$listeners"
        :href="link"
        :class="{
          'ds-button': true,
          'ds-button-primary': primary,
          'ds-button-red': red,
          'ds-button-gray': gray,
          'ds-button-big': big,
          'ds-button-small': small,
          'ds-button-alt': alt,
          'ds-button-plain': plain,
          'ds-button-plain-two': plainTwo,
          'ds-button-link-ico': linkIco,
          'ds-button-alt-two': altTwo,
          'ds-button-download': download
        }"
        :disabled="disabled"
        :target="target"
        :style="{
          padding,
          width,
          color: getTextColor,
          backgroundColor: getBackgroundColor
        }"
      >
        <Icon
          v-if="icon"
          :class="{ 'ds-button-icon': hasLabel }"
          :source="icon"
          :size="computedIconSize"
          :color="getIconColor"
          :style="{ marginRight: spaceBetween }"
        />
        <slot></slot>
        <Icon
          class="ds-button-icon"
          v-if="iconRight"
          :source="iconRight"
          :size="computedIconSize"
          :color="getIconColor"
          :style="{ marginLeft: spaceBetween }"
        />
      </a>
    </template>

    <template v-else>
      <button
        v-on="$listeners"
        :class="{
          'ds-button': true,
          'ds-button-primary': primary,
          'ds-button-red': red,
          'ds-button-gray': gray,
          'ds-button-big': big,
          'ds-button-small': small,
          'ds-button-alt': alt,
          'ds-button-plain': plain,
          'ds-button-plain-two': plainTwo,
          'ds-button-alt-two': altTwo,
          'ds-button-download': download
        }"
        :disabled="disabled"
        :style="{
          padding,
          width,
          color: getTextColor,
          backgroundColor: getBackgroundColor
        }"
      >
        <Icon
          v-if="icon"
          :class="{ 'ds-button-icon': hasLabel }"
          :source="icon"
          :size="computedIconSize"
          :color="getIconColor"
          :style="{ marginRight: spaceBetween }"
        />
        <slot></slot>
        <Icon
          class="ds-button-icon"
          v-if="iconRight"
          :source="iconRight"
          :size="computedIconSize"
          :color="getIconColor"
          :style="{ marginLeft: spaceBetween }"
        />
      </button>
    </template>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import { COLORS } from '../styles/vars';

export default {
  name: 'Button',
  components: { Icon },
  props: {
    big: Boolean,
    small: Boolean,
    red: Boolean,
    gray: Boolean,
    alt: Boolean,
    altTwo: Boolean,
    plain: Boolean,
    plainTwo: Boolean,
    linkIco: Boolean,
    disabled: Boolean,
    icon: String,
    iconRight: String,
    iconColor: String,
    iconSize: String,
    link: String,
    target: String,
    mobileBottom: Boolean,
    padding: String,
    color: String,
    width: String,
    backgroundColor: String,
    spaceBetween: {
      type: String,
      default: '8px'
    },
    download: Boolean
  },
  data: () => ({
    COLORS
  }),
  computed: {
    primary() {
      return !(
        this.alt ||
        this.altTwo ||
        this.plain ||
        this.plainTwo ||
        this.linkIco
      );
    },
    hasLabel() {
      return !!this.$slots.default;
    },
    computedIconSize() {
      if (this.iconSize) return this.iconSize;
      else if (this.big) return '28px';
      else if (this.small || this.plainTwo) return '16px';
      return '24px';
    },
    getTextColor() {
      return this.COLORS[this.color] || this.color;
    },
    getBackgroundColor() {
      return this.COLORS[this.backgroundColor] || this.backgroundColor;
    },
    getIconColor() {
      return this.COLORS[this.iconColor] || this.iconColor;
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-button-link-wrapper {
  display: inline-block;

  @media @screen-medium, @screen-small {
    &.ds-mobile-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0;
      line-height: normal;
      width: 100%;
      z-index: 2;
      .ds-button {
        width: 100%;
        text-align: center;
        padding-top: @mobile-button-padding-size;
        padding-bottom: @mobile-button-padding-size;
        font-size: @mobile-button-font-size;
        line-height: @mobile-button-line-height;
        border-radius: 0;
      }
    }
  }
}

.ds-button {
  -moz-appearance: none;
  -webkit-appearance: none;
  background: none;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0;
  text-decoration: none !important;
  padding: 10px 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &.ds-button-big {
    padding: 15px 24px;
  }

  &.ds-button-small {
    padding: 6px 8px;
    .font-components-button-small();

    .ds-icon {
      margin: 0;
    }
  }

  .ds-icon {
    fill: @color-dark;
    margin: -4px;
  }

  .ds-button-icon {
    vertical-align: middle;
  }

  &.ds-button-primary {
    color: @color-white;
    font-family: Roboto Medium, sans-serif;
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 16px;
    text-align: center;
    background: @color-primary;
    text-transform: uppercase;
    font-weight: 500;

    &.ds-button-big {
      .font-components-button-big();
    }

    &:hover,
    &:focus {
      background: darken(@color-primary, 5%);
    }

    &:active {
      background: darken(@color-primary, 7%);
    }

    .ds-icon {
      fill: @color-white;
    }
  }

  &.ds-button-red {
    color: @color-red;
    font-family: 'Roboto Medium';
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 16px;
    text-align: center;
    background: @color-red;
    text-transform: uppercase;

    &.ds-button-big {
      .font-components-button-big();
    }

    &:hover,
    &:focus {
      background: darken(@color-red, 5%);
    }

    &:active {
      background: darken(@color-red, 7%);
    }

    .ds-icon {
      fill: @color-white;
    }
  }

  &.ds-button-gray {
    color: @color-gray-500;
    background-color: @color-gray-300;
    font-family: Roboto Medium, sans-serif;
    border-radius: 4px;

    &:hover,
    &:focus {
      &:not(:disabled) {
        color: @color-gray-500;
        background-color: @color-gray-300;
      }
    }
  }

  &.ds-button-alt {
    .font-components-button-normal-alt();
    background: @color-white;
    border: 2px solid @color-gray-300;
    color: @color-gray-400;
    .ds-icon {
      fill: @color-primary;
    }
  }

  &.ds-button-alt-two {
    color: @color-gray-500;
    font-family: 'Roboto Medium';
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 16px;
    text-align: center;
    text-transform: uppercase;
    border: 2px solid @color-gray-300;
    border-radius: 4px;
  }

  &.ds-button-alt,
  &.ds-button-plain,
  &.ds-button-link-ico {
    &:hover,
    &:focus {
      background: darken(@color-white, 5%);
    }

    &:active {
      background: darken(@color-white, 7%);
    }
  }

  &.ds-button-plain-two {
    background-color: rgba(0, 0, 0, 0);
    color: @color-dark;
    text-transform: uppercase;
    font-family: 'Roboto Medium';
    font-size: 12px;
    line-height: 14px;

    &:hover,
    &:focus,
    &:active {
      color: @color-dark !important;
      background-color: rgba(0, 0, 0, 0);
    }

    &:disabled {
      background: inherit;
      color: @color-gray-400;
      cursor: not-allowed;

      .ds-icon {
        fill: @color-gray-400;
      }

      &:hover,
      &:focus,
      &:active {
        background-color: inherit;
      }
    }
  }

  &.ds-button-download {
    background-color: @color-white;
    color: @color-primary;
    font-family: Roboto Medium, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 16px;
    text-align: center;
    border: 2px solid @color-primary;
    border-radius: 4px;

    &:hover,
    &:focus,
    &:active {
      background-color: @color-white;
    }
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: @color-gray-300;
    color: @color-gray-400;
    cursor: not-allowed;

    .ds-icon {
      fill: @color-gray-100;
    }

    &:hover {
      background: @color-gray-300;
    }
  }

  &.ds-button-link-ico {
    .font-components-button-link-ico();
  }

  &::-moz-focus-inner {
    border: 0;
  }
}

.ds-footer-button-menu {
  .ds-button {
    color: @color-primary;
    padding: 0;
    text-transform: uppercase;
  }
}
</style>
