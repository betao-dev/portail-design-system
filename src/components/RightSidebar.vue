<template>
  <transition name="fade">
    <div
      v-if="opened"
      class="ds-rightside-wrapper"
      :style="{ height: height }"
      @click.self="clickOverlay"
    >
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
    }
  },
  data() {
    return {
      height: '100vh'
    };
  },
  methods: {
    clickOverlay() {
      this.$emit('update:opened', !this.opened);
    }
  },
  mounted() {
    this.height = `${Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight
    )}px`;
  }
};
</script>

<style lang="less" scoped>
.ds-rightside-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #2d3047c6;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 9000;

  .main-sidebar {
    width: 462px;
    height: 100%;
    background-color: white;
  }
}

.fade-enter,
.fade-leave-to {
  transition: 0.2s;

  .main-sidebar {
    margin-right: -100%;
    transition: 0.2s;
  }
}

.fade-enter-to,
.fade-leave {
  transition: 0.2s;

  .main-sidebar {
    margin-right: 0;
    transition: 0.2s;
  }
}
</style>
