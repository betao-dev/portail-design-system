<!--
  Full-screen "window" with an optional header and middle-aligned content
  (content takes 8 columns in the middle).  The header slot also supports
  left and right corner buttons, add "left" or "right" to the button
  component class to get it attached in the respective corner

  Usage:

    <FullScreenModal>
      <template #header>Hello, World!</template>
      Lorem ipsum dolor sit amet...
    </FullScreenModal>
-->
<template>
  <div class="ds-full-screen-modal">
    <div class="ds-modal-header">
      <slot name="header"></slot>
    </div>

    <div class="ds-modal-main ds-grid">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8"><slot></slot></div>
        <div class="col-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullScreenModal'
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-full-screen-modal {
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: @color-gray-100;
  z-index: @z-index-full-screen-modal;
  top: 0;
  left: 0;

  .ds-modal-header:not(:empty) {
    .font-desktop-h-3-dark-center();
    padding: 16px;
    box-sizing: border-box;
    background-color: @color-white;
    box-shadow: inset 0 -1px 0 0 @color-gray-300;
  }
  @media @screen-medium, @screen-small {
    .ds-modal-header:not(:empty) {
      padding: 12px;
    }
  }

  .ds-modal-main {
    height: 100%;
  }
}
</style>
