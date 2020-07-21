<!--
  Collapser component for displaying collapsible content

  Usage:

  <Collapser :opened.sync="openUsage"  -  Responsible on open status of Collapser component
             :label="label">           -  Label of collapser component

    Collapser content...
  </Collapser>
-->

<template>
  <div class="ds-collapser" :style="{ backgroundColor: bgColor }">
    <div
      v-if="headerSlotName"
      :class="[
        'ds-collapser-header-custom',
        { 'ds-collapser-header-custom-active': opened }
      ]"
      @click="onCollapserClick"
    >
      <slot :name="headerSlotName"></slot>
    </div>
    <div
      v-else
      :class="['ds-collapser-header', { 'ds-collapser-header-active': opened }]"
      :style="{ backgroundColor: bgColor }"
      @click="onCollapserClick"
    >
      <div
        :class="['ds-title', { 'ds-title-active': opened }]"
        :style="{ textAlign: titleAlignment }"
      >
        {{ label }}
      </div>
      <div class="ds-icon-status-wrapper" v-if="isStatus">
        <Icon
          size="22px"
          :color="statusData.status ? 'primary' : 'red'"
          :source="
            statusData.status
              ? 'check-circle'
              : 'exclamation-circle-solid-standard'
          "
        ></Icon>
      </div>
      <div class="ds-icon-wrapper">
        <Icon
          size="18px"
          :color="iconColorWrapper"
          :source="opened ? 'angle_up_solid' : 'angle_down_solid'"
        ></Icon>
      </div>
    </div>
    <div class="ds-collapser-body" v-show="opened">
      <slot :name="bodySlotName"></slot>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Icon from './Icon';

export default {
  components: { Icon },
  name: 'Collapser',
  props: {
    label: String,
    opened: Boolean,
    titleAlignment: {
      type: String,
      default: 'center'
    },
    bgColor: String,
    iconColor: String,
    bodySlotName: {
      type: [Number, String],
      default: 'default'
    },
    headerSlotName: String,
    statusData: {
      type: Object,
      default: () => {}
    },
    preventUpdateOpened: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconColorWrapper() {
      if (this.iconColor) {
        return this.iconColor;
      } else {
        return this.opened ? 'primary' : 'gray-500';
      }
    },
    isStatus() {
      return _.get(this.statusData, 'active');
    }
  },
  methods: {
    onCollapserClick() {
      this.$emit('beforeUpdateOpened', !this.opened);

      if (!this.preventUpdateOpened) {
        this.$emit('update:opened', !this.opened);
      }
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-collapser {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: @collapser-margin-bottom;
  border-radius: 4px;

  .ds-collapser-header-custom {
    &.ds-collapser-header-custom-active {
      border-radius: 4px 4px 0 0;
    }
  }

  .ds-collapser-header {
    cursor: pointer;
    display: flex;
    width: 100%;
    height: 56px;
    align-items: center;
    border-radius: 4px;
    background-color: @color-white;

    .font-components-button-normal-alt-dark();

    &.ds-collapser-header-active {
      background-color: #e9f8f3;
      border-radius: 4px 4px 0 0;
    }

    & > div {
      display: flex;
      justify-content: center;
    }

    .ds-title {
      flex: 1;
      padding-left: 24px;
      padding-right: 15px;
      display: block;
      overflow: hidden;
      font-weight: normal;
      font-family: @robotoFont;
      color: @color-dark;
      height: 19px;
      font-size: 16px;
      letter-spacing: 0.2px;
      line-height: 19px;

      &.ds-title-active {
        color: @color-primary;
      }
    }

    .ds-icon-status-wrapper {
      margin-right: 12px;
    }

    .ds-icon-wrapper {
      width: 50px;
    }
  }

  .ds-collapser-body {
    padding: @collapser-body-padding;
    background-color: @color-white;
    border-radius: 0 0 4px 4px;
  }
}
</style>
