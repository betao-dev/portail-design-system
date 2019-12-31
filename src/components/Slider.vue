<template>
  <div class="ds-slider"
       :style="{width, height}">
    <div class="ds-slider-header">
      <span class="ds-slider-title">{{header}}</span>
      <div class="ds-title-header-controls">
        <Icon angle_left_solid
              size="18px"
              class="ds-slider-control-left"
              :class="{'disabled': sliderStartIndex == 1 }"
              :color="sliderStartIndex == 1 ? 'gray-300' : 'gray-500'"
              @click="changeSlide(-1)">
        </Icon>
        <Icon angle_right_solid
              size="18px"
              class="ds-slider-control-right"
              :class="{'disabled': sliderStartIndex == slideCount}"
              :color="sliderStartIndex == slideCount ? 'gray-300' : 'gray-500'"
              @click="changeSlide(1)">
        </Icon>
      </div>
    </div>
    <div class="ds-slider-body" >
      <div :class="{'slide-left-to-right': slideLeftToRight, 'slide-right-to-left': slideRightToLeft}">
        <slot :name="activeSlider"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon'

  export default {
    name: 'Slider',
    components: {
      Icon
    },
    props: {
      header: String,
      width: String,
      height: String,
      startIndex: Number,
    },
    data: () => ({
      slideLeftToRight: false,
      slideRightToLeft: false
    }),
    computed: {
      activeSlider() {
        return `slider-${this.startIndex}`
      },
      sliderStartIndex: {
        get() {
          return this.startIndex
        },
        set(value) {
          this.$emit('update:startIndex', value)
        }
      },
      slideCount() {
        return Object.keys(this.$slots).length
      }
    },
    methods: {
      changeSlide(value) {
        let slideCount = Object.keys(this.$slots).length

        if (value > 0 && slideCount && !this.slideLeftToRight) {
          this.slideLeftToRight = setTimeout(() => {
            this.sliderStartIndex += value
            this.slideLeftToRight = undefined
          }, 400)
        }

        if (value < 0 && slideCount && !this.slideRightToLeft) {
          this.slideRightToLeft = setTimeout(() => {
            this.sliderStartIndex += value
            this.slideRightToLeft = undefined
          }, 400)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-slider {
    background-color: @color-white;
    overflow: hidden;

    .ds-slider-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 0 23px;
      position: relative;
      border-bottom: 1px solid @color-gray-200;

      .ds-slider-title {
        height: 19px;
        color: @color-dark;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        letter-spacing: 0.2px;
        line-height: 19px;
        cursor: default;
      }

      .ds-title-header-controls {
        position: absolute;
        right: 23px;
        top: 21px;

        .ds-slider-control-left {
          padding-right: 14px;
        }

        .ds-slider-control-left,
        .ds-slider-control-right {
          cursor: pointer;

          &.disabled {
            pointer-events: none;
            color: red;
          }
        }
      }
    }

    .ds-slider-body {
      @keyframes sliderLeftToRight {
        0% { transform: translateX(0); }
        25% { transform: translateX(25%); }
        50% { transform: translateX(50%); }
        75% { transform: translateX(75%); }
        100% { transform: translateX(100%); }
      }

      @keyframes sliderRightToLeft {
        0% { transform: translateX(100%); }
        25% { transform: translateX(75%); }
        50% { transform: translateX(50%); }
        75% { transform: translateX(25%); }
        100% { transform: translateX(0); }
      }

      .slide-left-to-right {
        animation-name:sliderLeftToRight;
        animation-duration:0.4s;
        animation-timing-function: ease-in-out;
        animation-iteration-count:infinite;
      }

      .slide-right-to-left {
        animation-name:sliderRightToLeft;
        animation-duration:0.4s;
        animation-timing-function: ease-in-out;
        animation-iteration-count:infinite;
      }
    }
  }
</style>
