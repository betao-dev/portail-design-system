<template>
  <div :class="['ds-loader', ...loaderWrapperClasses]" :style="{backgroundColor, height, maxHeight, transform}">
    <div :class="[...loaderClasses]"></div>
  </div>
</template>

<script>
  export default {
    name: 'Loader',
    props: {
      value: Boolean,
      target: null,
      fullScreen: {
        type: Boolean,
        default: false
      },
      opacity: {
        type: Number,
        default: 80
      }
    },
    data: () => ({
      height: undefined,
      maxHeight: undefined,
      transform: undefined
    }),
    computed: {
      backgroundColor() {
        return this.value ? `rgba(255, 255, 255, 0.${this.opacity})` : ''
      },
      targetElement() {
        let element = document.querySelector(`#${this.target}`)
        return element ? element : null
      },
      loaderClasses() {
        if (this.value) {
          return 'ds-base-loader'
        } else {
          return ''
        }
      },
      loaderWrapperClasses() {
        let loaderWrapperClasses = []

        if (this.value) {
          if (this.fullScreen) {
            loaderWrapperClasses.push('ds-full-screen')
            loaderWrapperClasses.push('ds-loader-wrapper')
          } else {
            loaderWrapperClasses.push('ds-loader-wrapper-mini')
          }
        }

        return loaderWrapperClasses
      }
    },
    methods: {
      setHeightTransform() {
        if (this.targetElement && this.value) {
          this.height = `${this.targetElement.clientHeight}px`
          this.maxHeight = this.height
          this.transform = `translate(${-this.targetElement.clientWidth / 2}px, ${-this.targetElement.clientHeight / 2}px)`
        }
      }
    },
    watch: {
      value(value) {
        if (value) {
          this.height = `100%`
        } else {
          this.height = '0'
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setHeightTransform()
      })
    },
    updated() {
      this.setHeightTransform()
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-loader-wrapper, .ds-loader-wrapper-mini {
    z-index: 5000;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .ds-loader {
      z-index: 5001;
    }
  }

  .ds-loader-wrapper {
    position: fixed;

    .ds-loader {
      position: fixed;
      margin: auto;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }

  .ds-loader-wrapper-mini {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .ds-base-loader {
    width: 32px;
    height: 32px;
    background-image: url('../icons/portail-loader-small.gif');
  }

  .ds-full-screen {
    height: 100%;
    width: 100%;
  }
</style>
