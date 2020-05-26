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
      class="ds-collapser-header"
      :style="{ backgroundColor: bgColor }"
      @click="onCollapserClick"
    >
      <div class="ds-title" :style="{ textAlign: titleAlignment }">
        {{ label }}
      </div>
      <div class="ds-icon-wrapper">
        <Icon
          size="18px"
          :color="iconColor"
          :source="opened ? 'angle_down_solid' : 'angle_up_solid'"
        ></Icon>
      </div>
    </div>
    <div class="ds-collapser-body" v-show="opened">
      <slot></slot>
    </div>
  </div>
</template>

<script>
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
    bgColor: {
      type: String,
      default: '#E9F8F3'
    },
    iconColor: {
      type: String,
      default: '#1EB386'
    }
  },
  methods: {
    onCollapserClick() {
      this.$emit('update:opened', !this.opened);
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

  .ds-collapser-header {
    cursor: pointer;
    display: flex;
    width: 100%;
    height: 56px;
    align-items: center;

    .font-components-button-normal-alt-dark();

    & > div {
      display: flex;
      justify-content: center;
    }

    .ds-title {
      flex: 1;
      padding-left: 24px;
      padding-right: 15px;
      display: block;
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      font-family: @robotoFont;
      font-weight: 500;
      overflow: hidden;
      color: @color-primary;
    }

    .ds-icon-wrapper {
      width: 50px;
    }
  }

  .ds-collapser-body {
    padding: @collapser-body-padding;
    background-color: white;
  }
}
</style>
