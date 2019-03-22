<template>
  <div class="portail-modal-backdrop" :class="{'active': visible}" @click="closeModal">
    <div class="portail-modal-wrapper" :class="{'fullscreen': fullscreen}" @click.stop>
      <slot></slot>
      <Icon class="close-icon" close @click="closeModal" padding="12px 12px 0 0" size="20px" />
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'Modal',
  components: {
    Icon
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('modal:close')
    }
  }
}
</script>

<style lang="less">
  @import '../styles/vars';

  .portail-modal-backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: @modal-backdrop-color;
    z-index: 99;
    display: none;
    

    &.active {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .portail-modal-wrapper {
      padding: @modal-spacing;
      position: relative;
      min-width: @modal-min-width;
      background-color: @color-white;
      border-radius: @modal-border-radius;
      margin-bottom: @modal-bottom-spacing;

      &.fullscreen {
        width: 100vw;
        height: 100vh;
        margin-bottom: 0;
        box-sizing: border-box;
      }

      .close-icon {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }
  }
</style>