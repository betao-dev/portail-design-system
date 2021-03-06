<template>
  <div
    :class="[
      'ds-notification-wrapper',
      {
        'ds-notification-wrapper-base': !short,
        'ds-notification-wrapper-unread': !read && !short
      }
    ]"
  >
    <div :class="['ds-notification', { 'ds-notification-base': !short }]">
      <div
        class="ds-notification-icon-wrapper"
        :style="{ backgroundColor: hexToRGBA(color, '0.1') }"
      >
        <Icon :source="icon" :size="iconSize" :color="color" />
      </div>
      <div
        :class="[
          'ds-notification-body-wrapper',
          { 'ds-notification-body-wrapper-short': short }
        ]"
      >
        <template v-if="!defaultSlot">
          <div class="ds-notification-body-center">
            <div
              :class="{
                'ds-notification-title': !short,
                'ds-notification-title-short': short
              }"
            >
              {{ title }}
            </div>
            <div
              :class="{
                'ds-notification-description': !short,
                'ds-notification-description-short': short
              }"
            >
              <div v-html="description"></div>
            </div>
          </div>
        </template>
        <slot></slot>
        <div class="ds-notification-body-right">
          <Badge
            v-if="badge && !short"
            :color="hexToRGBA(color, '0.1')"
            :icon="badgeIcon"
            :icon-color="color"
            :icon-size="badgeIconSize"
            :icon-padding="badgeIconPadding"
            class="ds-notification-badge"
          >
            <span class="ds-notification-badge-value">
              {{ badgeTitle }}
            </span>
          </Badge>
          <div v-if="!badge && !short" class="ds-notification-additional-data">
            <div
              v-if="additionalTitle"
              class="ds-notification-additional-title"
              :style="{ color }"
            >
              {{ additionalTitle }}
            </div>
            <div
              v-if="additionalDescription"
              class="ds-notification-additional-description"
            >
              <div v-html="additionalDescription"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import Badge from './Badge.vue';
import convert from './../mixins/convert';

export default {
  name: 'Notification',
  components: { Icon, Badge },
  mixins: [convert],
  props: {
    title: String,
    description: String,
    additionalTitle: String,
    additionalDescription: String,
    icon: String,
    color: String,
    iconSize: {
      type: String,
      default: '18px'
    },
    badge: Boolean,
    badgeTitle: String,
    badgeIcon: {
      type: String,
      default: 'round'
    },
    badgeIconSize: {
      type: String,
      default: '16px'
    },
    badgeIconPadding: {
      type: String,
      default: '0 6px 0 0'
    },
    short: Boolean,
    read: Boolean
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

.ds-notification-wrapper {
  width: 100%;
  border-radius: 4px;
  background-color: @color-white;
  box-sizing: border-box;
  cursor: default;

  &.ds-notification-wrapper-base {
    height: 74px;

    &:hover {
      border: 1px solid @color-gray-300;
      box-shadow: 0 2px 16px 0 rgba(153, 155, 168, 0.12);

      .ds-notification-base {
        padding: 15px 23px;
      }
    }
  }

  .ds-notification {
    display: flex;
    box-sizing: border-box;

    &.ds-notification-base {
      padding: 16px 24px;
    }

    .ds-notification-icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      min-width: 40px;
    }

    .ds-notification-body-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-left: 12px;

      &.ds-notification-body-wrapper-short {
        margin-left: 15px;
      }

      .ds-notification-body-center {
        .ds-notification-title {
          height: 19px;
          color: @color-dark;
          font-family: Roboto, sans-serif;
          font-size: 16px;
          letter-spacing: 0.2px;
          line-height: 19px;
          margin-bottom: 1px;
        }

        .ds-notification-title-short {
          height: 21px;
          color: @color-dark;
          font-family: Roboto, sans-serif;
          font-size: 14px;
          line-height: 21px;
        }

        .ds-notification-description {
          height: 21px;
          color: @color-gray-400;
          font-family: Roboto, sans-serif;
          font-size: 14px;
          letter-spacing: 0.2px;
          line-height: 21px;

          &::v-deep {
            .highlight-text {
              font-family: 'Roboto Medium';
              color: @color-primary;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        .ds-notification-description-short {
          color: @color-gray-400;
          font-family: Roboto, sans-serif;
          font-size: 14px;
          letter-spacing: 0.2px;
          line-height: 21px;

          &::v-deep {
            .highlight-text {
              font-family: 'Roboto Medium';

              &:hover {
                cursor: pointer;
                color: @color-dark;
              }
            }
          }
        }
      }

      .ds-notification-body-right {
        .ds-notification-badge {
          padding: 10px 16px;

          .ds-notification-badge-value {
            height: 16px;
            color: @color-dark;
            font-family: Roboto, sans-serif;
            font-size: 14px;
            line-height: 16px;
          }
        }

        .ds-notification-additional-data {
          .ds-notification-additional-title {
            height: 16px;
            font-family: 'Roboto Medium';
            font-size: 14px;
            letter-spacing: 0.17px;
            line-height: 16px;
            text-align: right;
          }

          .ds-notification-additional-description {
            height: 21px;
            color: @color-gray-400;
            font-family: Roboto, sans-serif;
            font-size: 14px;
            line-height: 21px;
            text-align: right;
          }
        }
      }
    }
  }

  &.ds-notification-wrapper-unread {
    .ds-notification {
      padding-left: 21px;
    }

    border-left: 3px solid @color-primary;

    &:hover {
      border-left: 3px solid @color-primary;

      .ds-notification-base {
        padding: 15px 23px 15px 21px;
      }
    }
  }
}
</style>
