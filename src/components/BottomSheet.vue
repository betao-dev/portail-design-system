<template>
  <transition name="fade">
    <div v-if="opened" class="ds-bottom-sheet-wrapper">
      <div class="ds-bottom-sheet-backdrop" @click.self="clickOverlay"></div>
      <div class="main-bottom-sheet" :style="{ height, borderRadius }">
        <slot name="content"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BottomSheet',
  props: {
    opened: Boolean,
    height: String,
    borderRadius: String
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

<style scoped lang="less">
@import '../styles/vars';

.ds-bottom-sheet-wrapper {
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

  .ds-bottom-sheet-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #2d3047c6;
    z-index: 9001;
  }

  .main-bottom-sheet {
    width: 100%;
    z-index: 9002;
    position: fixed;
    bottom: 0;
    background-color: white;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;

  .main-bottom-sheet {
    margin-bottom: 0;
    transition: 0.5s;
  }
}

.fade-enter,
.fade-leave-to {
  transition: 0.5s;

  .main-bottom-sheet {
    margin-bottom: -100%;
    transition: 0.5s;
  }
}
</style>
