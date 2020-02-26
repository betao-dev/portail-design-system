<template>
  <div class="ds-notification-wrapper">
    <div class="ds-notification">
      <Icon account_circle size="40px" padding="18px 2px" color="red" />
    </div>
  </div>
</template>

<script>
  import Icon from './Icon.vue';

  export default {
    name: 'Notification',
    components: {Icon}
  };
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-notification-wrapper {
    height: 74px;
    width: 100%;
    border-radius: 4px;
    background-color: @color-white;

    &:hover {
      border-left: 3px solid @color-primary;
    }

    .ds-notification {
      padding: 16px 24px;
    }
  }
</style>
