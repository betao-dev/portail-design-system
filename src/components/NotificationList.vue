<template>
  <div
    v-if="value.length"
    class="ds-notification-list-wrapper"
    :style="{ width }"
  >
    <div class="ds-notification-list-header-base" v-if="!short && !headerSlot">
      <div class="ds-notification-list-header">
        {{ title }}
      </div>
      <div class="ds-notification-list-header-right" @click="onTitleRightClick">
        {{ titleRight }}
      </div>
    </div>

    <div
      class="ds-notification-list-header-short"
      v-if="short && !headerSlot && title"
    >
      {{ title }}
    </div>

    <slot name="header"></slot>
    <div
      :class="['ds-notification-item', { 'ds-notification-item-short': short }]"
      v-for="(notification, index) of value"
      :key="index"
      @click="onNotificationActive(notification)"
    >
      <Notification v-bind="notification" :short="short">
        <slot :name="getSlotName(index)"></slot>
      </Notification>
    </div>
  </div>
</template>

<script>
import Notification from './Notification';

export default {
  name: 'NotificationList',
  components: { Notification },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    short: {
      type: Boolean,
      default: false
    },
    width: String,
    title: String,
    titleRight: String
  },
  methods: {
    getSlotName(index) {
      return `notification${++index}`;
    },
    onNotificationActive(notification) {
      this.$emit('active', notification);
    },
    onTitleRightClick() {
      this.$emit('titleRightClick');
    }
  },
  computed: {
    headerSlot() {
      return !!this.$scopedSlots.header;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-notification-list-wrapper {
  .ds-notification-list-header-base {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    cursor: default;

    .ds-notification-list-header {
      height: 19px;
      color: @color-gray-500;
      font-family: Roboto, sans-serif;
      font-size: 16px;
      letter-spacing: 0.2px;
      line-height: 19px;
    }

    .ds-notification-list-header-right {
      height: 14px;
      color: #252631;
      font-family: 'Roboto Medium';
      font-size: 12px;
      line-height: 14px;
      cursor: pointer;
    }
  }

  .ds-notification-list-header-short {
    height: 14px;
    color: @color-gray-500;
    font-family: 'Roboto Medium';
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 18px;
    cursor: default;
  }

  .ds-notification-item {
    margin-bottom: 8px;

    &.ds-notification-item-short {
      margin-bottom: 18px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
