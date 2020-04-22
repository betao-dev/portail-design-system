<template>
  <div class="ds-slider" :style="{ width, height }" v-if="!alt">
    <div class="ds-slider-header">
      <span class="ds-slider-title">
        {{ header }}
      </span>
      <div class="ds-title-header-controls" v-if="slideCount > 1">
        <Icon
          angle_left_solid
          size="18px"
          class="ds-slider-control-left"
          color="gray-500"
          @click="changeSlide(startIndex - 1)"
        >
        </Icon>
        <Icon
          angle_right_solid
          size="18px"
          class="ds-slider-control-right"
          color="gray-500"
          @click="changeSlide(startIndex + 1)"
        >
        </Icon>
      </div>
    </div>
    <div
      :class="{
        'ds-slider-body': actionType === 'slide',
        'ds-fade-body': actionType === 'fade'
      }"
    >
      <div
        :class="{
          'slide-left-to-right': slideLeftToRight,
          'slide-right-to-left': slideRightToLeft,
          'fade-in': fadeIn,
          'fade-out': fadeOut
        }"
      >
        <slot :name="activeSlider"></slot>
      </div>
    </div>
  </div>
  <div class="ds-slider-alt" v-else :style="{ width, height }">
    <div class="ds-slider-alt-header">
      <div class="ds-header-title">
        {{ header }}
      </div>
      <div class="ds-header-right">
        {{ altHeaderRight }}
      </div>
    </div>
    <div
      class="ds-slider-alt-body"
      :style="{ width: altBodyWidth, height: altBodyHeight }"
    >
      <slot :name="activeSlider"></slot>
    </div>
    <div class="ds-slider-control-left">
      <div class="ds-control-box"></div>
      <Icon
        class="ds-control-arrow-left"
        angle_left_solid
        size="18px"
        color="white"
        @click="changeSlide(startIndex - 1)"
      >
      </Icon>
    </div>
    <div class="ds-slider-control-right">
      <div class="ds-control-box"></div>
      <Icon
        class="ds-control-arrow-right"
        angle_right_solid
        size="18px"
        color="white"
        @click="changeSlide(startIndex + 1)"
      >
      </Icon>
    </div>

    <div class="ds-slider-alt-footer">
      <div class="ds-footer-titles-wrapper">
        <div class="ds-footer-title">
          {{ altFooterTitle }}
        </div>
        <div class="ds-footer-additional">
          {{ altFooterAdditional }}
        </div>
      </div>
      <div>
        <Button big padding="15px 30px">
          {{ altButtonTitle }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon';
import Button from './Button';

export default {
  name: 'Slider',
  components: {
    Icon,
    Button
  },
  props: {
    header: String,
    width: String,
    height: String,
    startIndex: Number,
    actionType: {
      type: String,
      default: 'slide'
    },
    alt: Boolean,
    altBodyWidth: String,
    altBodyHeight: String,
    altHeaderRight: String,
    altButtonTitle: String,
    altFooterTitle: String,
    altFooterAdditional: String
  },
  data: () => ({
    slideLeftToRight: false,
    slideRightToLeft: false,
    fadeIn: false,
    fadeOut: false
  }),
  computed: {
    activeSlider() {
      return `slider-${this.startIndex}`;
    },
    sliderStartIndex: {
      get() {
        return this.startIndex;
      },
      set(value) {
        this.$emit('update:startIndex', value);
      }
    },
    slideCount() {
      return Object.keys(this.$slots).length;
    }
  },
  methods: {
    changeSlide(value) {
      if (this.slideCount) {
        if (value < 1) {
          this.slideMove(this.slideCount, 'slideRightToLeft');
        } else if (value > this.slideCount) {
          this.slideMove(1, 'slideLeftToRight');
        } else {
          let direction =
            this.sliderStartIndex > value
              ? 'slideRightToLeft'
              : 'slideLeftToRight';
          this.slideMove(value, direction);
        }
      }
    },
    slideMove(activeSlide, direction) {
      if (this.actionType === 'slide') {
        this[direction] = setTimeout(() => {
          this.sliderStartIndex = activeSlide;
          this[direction] = undefined;
        }, 400);
      } else if (this.actionType === 'fade') {
        this.fadeOut = true;

        setTimeout(() => {
          this.fadeOut = undefined;
          this.fadeIn = true;
          this.sliderStartIndex = activeSlide;
        }, 400);

        setTimeout(() => {
          this.fadeIn = false;
        }, 800);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-slider {
  border-radius: 4px;
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
      }
    }
  }

  .ds-slider-body {
    @keyframes sliderLeftToRight {
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(25%);
      }
      50% {
        transform: translateX(50%);
      }
      75% {
        transform: translateX(75%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    @keyframes sliderRightToLeft {
      0% {
        transform: translateX(100%);
      }
      25% {
        transform: translateX(75%);
      }
      50% {
        transform: translateX(50%);
      }
      75% {
        transform: translateX(25%);
      }
      100% {
        transform: translateX(0);
      }
    }

    .slide-left-to-right {
      animation-name: sliderLeftToRight;
      animation-duration: 0.4s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    .slide-right-to-left {
      animation-name: sliderRightToLeft;
      animation-duration: 0.4s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
  }

  .ds-fade-body {
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    /* Internet Explorer */
    @-ms-keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    .fade-in {
      -webkit-animation: fadein 0.4s; /* Safari, Chrome and Opera > 12.1 */
      -moz-animation: fadein 0.4s; /* Firefox < 16 */
      -ms-animation: fadein 0.4s; /* Internet Explorer */
      -o-animation: fadein 0.4s; /* Opera < 12.1 */
      animation: fadein 0.4s;
    }

    .fade-out {
      -webkit-animation: fadeout 0.4s; /* Safari, Chrome and Opera > 12.1 */
      -moz-animation: fadeout 0.4s; /* Firefox < 16 */
      -ms-animation: fadeout 0.4s; /* Internet Explorer */
      -o-animation: fadeout 0.4s; /* Opera < 12.1 */
      animation: fadeout 0.4s;
    }
  }
}
.ds-slider-alt {
  width: 100%;
  height: 100%;
  cursor: default;

  .ds-slider-alt-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;

    .ds-header-title {
      height: 19px;
      color: @color-gray-500;
      font-family: Roboto, sans-serif;
      font-size: 16px;
      letter-spacing: 0.2px;
      line-height: 19px;
    }

    .ds-header-right {
      height: 12px;
      color: @color-dark;
      font-family: 'Roboto Medium';
      font-size: 12px;
      letter-spacing: 0;
      line-height: 12px;
      border-bottom: 1px solid @color-dark;
      text-transform: uppercase;
      cursor: pointer;
    }
  }

  .ds-slider-alt-body {
    background-color: @color-white;
  }

  .ds-slider-control-left,
  .ds-slider-control-right {
    display: inline-block;
    cursor: pointer;
    border-radius: 50%;

    .ds-control-box {
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: @color-primary;
    }

    .ds-control-arrow-left,
    .ds-control-arrow-right {
      position: relative;
      bottom: 25px;
    }

    .ds-control-arrow-left {
      left: 6px;
    }

    .ds-control-arrow-right {
      left: 8px;
    }
  }

  .ds-slider-alt-footer {
    display: flex;
    justify-content: space-between;
    background-color: @color-white;
    padding: 20px;

    .ds-footer-titles-wrapper {
      .ds-footer-title {
        height: 19px;
        color: @color-dark;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        letter-spacing: 0.2px;
        line-height: 19px;
      }

      .ds-footer-additional {
        height: 21px;
        color: @color-dark;
        font-family: 'Roboto Light';
        font-size: 14px;
        letter-spacing: 0;
        line-height: 21px;
      }

      :nth-child(2) {
        margin-top: 6px;
      }
    }
  }
}
</style>
