<template>
  <transition name="notification-popup">
    <div
      class="ds-notification-popup-wrapper"
      :style="{ backgroundColor, width, height, left: leftOffset, zIndex }"
      v-if="opened"
    >
      <div class="ds-notification-popup">
        <Icon
          class="ds-notification-popup-icon"
          :source="icon"
          :size="iconSize"
          :color="iconColor"
        ></Icon>
        <div class="ds-notification-popup-body">
          <div class="ds-notification-popup-message">{{ message }}</div>
          <Icon
            class="ds-notification-popup-icon-close"
            times-circle
            :color="iconColor"
            size="19px"
            @click="onClose"
          ></Icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from './Icon';
export default {
  name: 'NotificationPopup',
  components: { Icon },
  props: {
    message: String,
    backgroundColor: String,
    icon: String,
    value: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: String,
      default: '22px'
    },
    iconColor: {
      type: String,
      default: '#FFFFFF'
    },
    width: {
      type: String,
      default: '556px'
    },
    height: {
      type: String,
      default: '64px'
    },
    showTimeMls: {
      type: Number,
      default: 3000
    },
    leftOffset: String,
    zIndex: String
  },
  data: () => ({
    notificationTimerId: undefined
  }),
  computed: {
    opened: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    onClose() {
      this.opened = false;
      this.$emit('close');
    }
  },
  watch: {
    opened(value) {
      if (!value) {
        clearTimeout(this.notificationTimerId);
      } else {
        this.notificationTimerId = setTimeout(() => {
          this.onClose();
        }, this.showTimeMls);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-notification-popup-wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 18px;
  border-radius: 4px;
  box-shadow: 0 2px 16px 0 rgba(30, 179, 134, 0.15);
  z-index: 9101;
  cursor: default;

  .ds-notification-popup {
    display: flex;
    align-items: center;
    padding: 21px 20px 21px 24px;

    .ds-notification-popup-icon {
      margin-right: 14px;
    }

    .ds-notification-popup-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .ds-notification-popup-message {
        color: @color-white;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        letter-spacing: 0.2px;
        line-height: 19px;
      }

      .ds-notification-popup-icon-close {
        cursor: pointer;
      }
    }
  }
}

.notification-popup-enter-active,
.notification-popup-leave-active {
  transition: opacity 0.3s ease;
}

.notification-popup-enter,
.notification-popup-leave-to {
  opacity: 0;
}
</style>
