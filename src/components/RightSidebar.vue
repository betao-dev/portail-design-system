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
  data: () => ({
    $_defaultStyles: {},
    scrollPositionY: 0
  }),
  methods: {
    clickOverlay() {
      this.$emit('update:opened', !this.opened);
    }
  },
  watch: {
    opened(value) {
      let htmlStyle = document.getElementsByTagName('html')[0].style;

      if (value) {
        this.scrollPositionY = window.pageYOffset;
        this.$_defaultStyles = {
          html: {
            overflow: htmlStyle.overflow
          }
        };

        htmlStyle.overflow = 'hidden';
        window.scrollTo(0, 0);
      } else {
        if (this.$_defaultStyles) {
          Object.assign(htmlStyle, this.$_defaultStyles.html);

          window.scrollTo(0, this.scrollPositionY);
          this.scrollPositionY = 0;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ds-rightside-wrapper {
  position: fixed;
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
