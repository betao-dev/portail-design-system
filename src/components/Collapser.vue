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
          :color="iconColor"
          :source="opened ? 'expand_less' : 'expand_more'"
        ></Icon>
      </div>
    </div>
    <div
      class="ds-collapser-body"
      :style="{ backgroundColor: bgColor }"
      v-show="opened"
    >
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
      default: '#ffffff'
    },
    iconColor: {
      type: String,
      default: '#3F4352'
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
  box-shadow: @card-shadow;
  margin-bottom: @collapser-margin-bottom;
  box-shadow: 0 1px 1px 0 rgba(91, 99, 156, 0.26);

  .ds-collapser-header {
    cursor: pointer;
    display: flex;
    width: 100%;
    height: 56px;
    align-items: center;

    background-color: white;
    .font-components-button-normal-alt-dark();

    & > div {
      display: flex;
      justify-content: center;
    }

    .ds-title {
      flex: 1;
      padding-left: 15px;
      padding-right: 15px;
      display: block;
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      font-family: Lato;
      font-weight: 500;
      overflow: hidden;
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
