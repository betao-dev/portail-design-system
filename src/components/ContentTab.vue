<template>
  <div class="ds-content-tab" :style="{ height, width }">
    <div class="ds-content-tab-content">
      <div class="ds-content-tab-header">
        {{ header }}
      </div>
      <div class="ds-content-tab-description-wrapper">
        <div class="ds-content-tab-description" v-if="!defaultSlot">
          {{ description }}
        </div>
        <slot></slot>
      </div>
      <div
        class="ds-content-tab-icon-wrapper"
        :style="{ backgroundColor: hexToRGBA(iconColor, '0.1') }"
        v-if="icon"
      >
        <Icon :source="icon" :color="iconColor" :size="iconSize"></Icon>
      </div>
    </div>
    <div class="ds-content-tab-action" @click="onAction">
      <div class="ds-content-tab-action-text">
        {{ actionText }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon';
import convert from './../mixins/convert';

export default {
  name: 'ContentTab',
  components: { Icon },
  mixins: [convert],
  props: {
    header: String,
    description: String,
    actionText: String,
    action: String,
    icon: String,
    iconColor: {
      type: String,
      default: '#1EB386'
    },
    iconSize: {
      type: String,
      default: '18px'
    },
    height: {
      type: String,
      default: '187px'
    },
    width: {
      type: String,
      default: '360px'
    }
  },
  methods: {
    onAction() {
      this.$emit('action', this.action || this.actionText);
    }
  },
  computed: {
    defaultSlot() {
      return !!this.$scopedSlots.default;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-content-tab {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  background-color: @color-white;
  cursor: default;

  .ds-content-tab-content {
    padding: 20px 20px 24px;

    .ds-content-tab-header {
      height: 21px;
      color: @color-dark;
      font-family: Roboto, sans-serif;
      font-size: 18px;
      letter-spacing: 0.2px;
      line-height: 21px;
    }

    .ds-content-tab-description-wrapper {
      width: 231px;
      color: @color-gray-400;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      line-height: 21px;

      .ds-content-tab-description {
        margin-top: 6px;
      }
    }

    .ds-content-tab-icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 20px;
      right: 20px;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      min-width: 40px;
    }
  }

  .ds-content-tab-action {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    height: 57px;
    min-height: 57px;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid @color-gray-200;

    .ds-content-tab-action-text {
      margin: 0 24px;
      height: 16px;
      color: @color-primary;
      font-family: 'Roboto Medium';
      font-size: 14px;
      line-height: 16px;
    }

    &:hover {
      background-color: #e9f8f3;
    }
  }
}
</style>
