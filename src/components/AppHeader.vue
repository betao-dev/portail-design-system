<!--
  Page header

  Usage:

    <AppHeader>
      <MenuButton #left />
      Hello, World!
      <AccountMenu #right />
    </AppHeader>
-->

<template>
  <div class="ds-app-header">
    <slot name="left"></slot>
    <div class="ds-title">
      <slot></slot>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-app-header {
  background-color: @color-white;
  height: @app-header-height;
  box-shadow: inset 0 -1px 0 0 @color-gray-200;
  display: flex;
  align-items: center;
  justify-content: stretch;
  z-index: 1000;

  .ds-title {
    flex: 1 0 auto;
    .font-desktop-h-3-dark();
    padding: @app-header-title-padding;
    font-size: 20px;
    line-height: 30px;
  }
  @media @hide-sidebar {
    position: sticky;
    top: 0;

    .ds-title {
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  @media @screen-small {
    .ds-title {
      .font-desktop-body-medium-dark();
    }
  }
}
</style>
