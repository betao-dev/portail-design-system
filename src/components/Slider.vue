<template>
  <div v-if="!alt" class="ds-slider" :style="{ width, height }">
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
    <div>
      <div
        :class="{
          'ds-slide-left-to-right': slideLeftToRight,
          'ds-slide-right-to-left': slideRightToLeft,
          'ds-fade-in': fadeIn,
          'ds-fade-out': fadeOut
        }"
      >
        <slot :name="activeSlider"></slot>
      </div>
    </div>
  </div>
  <div v-else class="ds-slider-alt" :style="{ width, height }">
    <div class="ds-slider-alt-header">
      <div class="ds-header-title">
        {{ header }}
      </div>
      <div class="ds-header-right" @click="emitActive">
        {{ altHeaderRight }}
      </div>
    </div>
    <div class="ds-slider-alt-body">
      <div class="ds-slider-control-left" @click="changeSlide(startIndex - 1)">
        <div class="ds-control-box"></div>
        <Icon
          class="ds-control-arrow-left"
          angle_left_solid
          size="18px"
          color="white"
        >
        </Icon>
      </div>
      <div class="ds-slider-control-right" @click="changeSlide(startIndex + 1)">
        <div class="ds-control-box"></div>
        <Icon
          class="ds-control-arrow-right"
          angle_right_solid
          size="18px"
          color="white"
        >
        </Icon>
      </div>
      <div>
        <div
          :class="[
            'ds-slider-alt-content-wrapper',
            {
              'ds-slide-left-to-right': slideLeftToRight,
              'ds-slide-right-to-left': slideRightToLeft,
              'ds-fade-in': fadeIn,
              'ds-fade-out': fadeOut
            }
          ]"
        >
          <slot :name="activeSlider"></slot>
        </div>
      </div>
    </div>
    <div class="ds-slider-alt-footer">
      <div
        :class="[
          'ds-footer-titles-wrapper',
          { 'ds-fade-in': fadeIn, 'ds-fade-out': fadeOut }
        ]"
      >
        <div class="ds-footer-title">
          {{ getAltFooterTitle }}
        </div>
        <div class="ds-footer-additional">
          {{ getAltFooterAdditional }}
        </div>
      </div>
      <div class="ds-footer-button-wrapper" v-if="altButtonTitle">
        <Button big padding="15px 30px" @click="emitActiveSlide">
          {{ altButtonTitle }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
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
    altHeaderRight: String,
    altButtonTitle: String,
    altFooterTitles: Array
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
    },
    getAltFooterTitle() {
      return _.get(
        this.altFooterTitles,
        `[${this.sliderStartIndex - 1}].title`
      );
    },
    getAltFooterAdditional() {
      return _.get(
        this.altFooterTitles,
        `[${this.sliderStartIndex - 1}].additional`
      );
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
    },
    emitActiveSlide() {
      this.$emit('active-slide', this.sliderStartIndex);
    },
    emitActive() {
      this.$emit('active');
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
}
.ds-slider-alt {
  width: 100%;
  height: 100%;
  cursor: default;
  position: relative;

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
    width: 100%;
    height: calc(100% - 39px - 86px); // 39 header height, 86 footer height
    position: relative;
    overflow: hidden;
    margin: 0;

    .ds-slider-control-left,
    .ds-slider-control-right {
      position: absolute;
      top: calc(50% - 16px);
      display: inline-block;
      cursor: pointer;
      border-radius: 50%;
      height: 32px;
      width: 32px;
      z-index: 20;

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

    .ds-slider-control-left {
      left: 14px;
    }

    .ds-slider-control-right {
      right: 14px;
    }

    .ds-slider-alt-content-wrapper {
      .ds-slider-alt-content {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        min-height: 100%;
        min-width: 100%;
        transform: translate(-50%, -50%);
      }
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

    .ds-footer-button-wrapper {
      ::v-deep {
        .ds-button-link-wrapper {
          button {
            color: @color-white;
            font-family: 'Roboto Medium';
            font-size: 14px;
            letter-spacing: 0.3px;
            line-height: 16px;
            text-align: center;
          }
        }
      }
    }
  }
}

@keyframes slide {
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

.ds-slide-left-to-right {
  animation-name: slide;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.ds-slide-right-to-left {
  animation-name: slide;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: reverse;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-ms-keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-o-keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.ds-fade-in {
  -webkit-animation: fade 0.4s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fade 0.4s; /* Firefox < 16 */
  -ms-animation: fade 0.4s; /* Internet Explorer */
  -o-animation: fade 0.4s; /* Opera < 12.1 */
  animation: fade 0.4s;
}

.ds-fade-out {
  -webkit-animation: fade 0.4s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fade 0.4s; /* Firefox < 16 */
  -ms-animation: fade 0.4s; /* Internet Explorer */
  -o-animation: fade 0.4s; /* Opera < 12.1 */
  animation: fade 0.4s;
  animation-direction: reverse;
}
</style>
