<template>
  <transition name="fade">
    <div v-if="opened" class="ds-rightside-wrapper" :style="{ height: height }">
      <div class="ds-rightside-backdrop" @click.self="clickOverlay"></div>
      <div class="main-sidebar">
        <slot name="content"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'RightSidebar',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    height: String
  },
  methods: {
    clickOverlay() {
      this.$emit('update:opened', !this.opened);
    }
  }
};
</script>

<style lang="less" scoped>
.ds-rightside-wrapper {
  position: absolute;
  overflow-x: hidden;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 9000;

  .ds-rightside-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #2d3047c6;
    z-index: 9001;
  }

  .main-sidebar {
    width: 462px;
    height: 100%;
    z-index: 9002;
    background-color: white;
  }
}

.fade-enter,
.fade-leave-to {
  transition: 0.5s;

  .main-sidebar {
    margin-right: -100%;
    transition: 0.5s;
  }
}

.fade-enter-to,
.fade-leave {
  transition: 0.5s;

  .main-sidebar {
    margin-right: 0;
    transition: 0.5s;
  }
}
</style>
