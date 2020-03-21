<template>
  <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div
      v-if="opened"
      class="ds-help"
      :style="{
        ...positionStyle,
        transition: `opacity ${transitionTime}ms ease`
      }"
      @mouseout="onMouseout"
    >
      <div
        :class="[
          'ds-help-content',
          { 'ds-help-content-dark': dark },
          primaryAlignment
        ]"
        ref="helpContent"
        :style="{
          transition: `transform ${transitionTime}ms ease`
        }"
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Help',
  props: {
    target: null,
    justFade: {
      type: Boolean,
      default: true
    },
    justFadeIn: Boolean,
    justFadeOut: Boolean,
    position: {
      type: String,
      validator(value) {
        return !!~[
          'top-left',
          'top-middle',
          'top-right',
          'left-top',
          'right-top',
          'left-center',
          'right-center',
          'left-bottom',
          'right-bottom',
          'bottom-left',
          'bottom-middle',
          'bottom-right'
        ].indexOf(value);
      },
      default: 'bottom-right'
    },
    mouseoutClose: {
      type: Boolean,
      default: true
    },
    transitionTime: {
      type: Number,
      default: 300
    },
    margin: {
      type: Number,
      default: 4
    },
    dark: Boolean
  },
  data: () => ({
    opened: false,
    contentRect: null,
    targetRect: null,
    offsetParent: null,
    targetCoordinates: {
      top: null,
      bottom: null,
      left: null,
      right: null
    }
  }),
  computed: {
    primaryAlignment() {
      return `ds-help-arrow-${this.position.split('-')[0]}`;
    },
    targetElement() {
      let element = this.target;

      if (element == null) {
        return;
      }

      if (element.length) {
        element = element[0];
      }

      if (element.$el) {
        element = element.$el;
      }

      if (typeof element === 'string') {
        element = document.querySelector(element);
      }

      return element;
    },
    positionStyle() {
      let left, top;

      if (this.contentRect == null || this.targetRect == null) {
        return { position: 'absolute' };
      }

      if (this.targetElement) {
        // Get a fresh targetRect in case the window got scrolled
        // after the last update
        let targetRect = this.targetElement.getBoundingClientRect();
        left = targetRect.left + window.pageXOffset;
        top = targetRect.top + window.pageYOffset;
      }

      let targetHeight = _.get(this.targetRect, 'height', 0);
      let targetWidth = _.get(this.targetRect, 'width', 0);
      let contentHeight = _.get(this.contentRect, 'height', 0);
      let contentWidth = _.get(this.contentRect, 'width', 0);

      let margin = this.margin;
      let [primaryAlignment, secondaryAlignment] = this.position.split('-');

      switch (primaryAlignment) {
        case 'top':
          top -= contentHeight + margin;
          break;
        case 'left':
          left -= contentWidth + margin;
          break;
        case 'right':
          left += targetWidth + margin;
          break;
        case 'bottom':
          top += targetHeight + margin;
      }

      switch (secondaryAlignment) {
        case 'left':
          left -= contentWidth - targetWidth;
          break;
        case 'middle':
          left -= (contentWidth - targetWidth) / 2;
          break;
        case 'right':
          break;
        case 'bottom':
          top -= contentHeight - targetHeight;
          break;
        case 'center':
          top -= (contentHeight - targetHeight) / 2;
          break;
        case 'top':
      }

      // Check if it goes beyond the screen (horizontally)
      // and adjust accordingly if needed
      if (contentWidth + margin * 2 > window.innerWidth) {
        left = (window.innerWidth - contentWidth) / 2; // Center
      } else if (left < margin) {
        left = margin;
      } else if (left + contentWidth + margin > window.innerWidth) {
        left = window.innerWidth - contentWidth - margin;
      }

      // Offset for non-static-positioned parents if needed
      let el = this.offsetParent;
      while (el) {
        left -= el.offsetLeft;
        top -= el.offsetTop;
        el = el.offsetParent;
      }

      return {
        left: `${left}px`,
        top: `${top}px`
      };
    },
    /**
     * 2D transformation matrix for CSS transform parameter
     */
    transformationMatrix() {
      if (this.contentRect == null || this.targetRect == null) {
        return 'matrix(1, 0, 0, 1, 0, 0)';
      }

      let targetWidth = this.targetRect.width;
      let targetHeight = this.targetRect.height;
      let contentWidth = this.contentRect.width;
      let contentHeight = this.contentRect.height;

      let scaleX = targetWidth / contentWidth;
      let scaleY = targetHeight / contentHeight;

      let translateX =
        this.targetRect.left -
        this.contentRect.left -
        contentWidth / 2 +
        targetWidth / 2;
      let translateY =
        this.targetRect.top -
        this.contentRect.top -
        contentHeight / 2 +
        targetHeight / 2;

      return `matrix(
        ${scaleX}, ${0},
        ${0}, ${scaleY},
        ${translateX}, ${translateY}
      )`;
    }
  },
  methods: {
    /**
     * Transition methods:
     * For enter transition we first render an invisible help to get
     * content's height, width and .offsetParent for positioning
     */
    beforeEnter(el) {
      el.style.opacity = '0';
      window.addEventListener('scroll', this.preventScroll);
    },

    enter(el, done) {
      this.offsetParent = el.offsetParent;
      this.targetRect = this.targetElement
        ? this.targetElement.getBoundingClientRect()
        : null;
      this.contentRect = this.$refs.helpContent
        ? this.$refs.helpContent.getBoundingClientRect()
        : null;

      setTimeout(done, this.transitionTime);

      // The timeout and the second contentRect assignment below aren't
      // generally needed by fix the slightly off first-time opening animation
      setTimeout(() => {
        this.contentRect = this.$refs.helpContent
          ? this.$refs.helpContent.getBoundingClientRect()
          : null;
        if (this.justFade || this.justFadeIn) {
          el.style.opacity = '1';
          return;
        }

        if (this.$refs.helpContent) {
          this.$refs.helpContent.style.transform = this.transformationMatrix;
        }
        el.style.display = 'none';

        el.offsetHeight; // Forcing layout update

        el.style.display = 'block';

        el.offsetHeight; // Forcing layout update

        if (this.$refs.helpContent) {
          this.$refs.helpContent.style.transform = 'none';
        }
        el.style.opacity = '1';
      }, 0);
    },

    leave(el, done) {
      window.removeEventListener('scroll', this.preventScroll);
      this.targetRect = this.targetElement
        ? this.targetElement.getBoundingClientRect()
        : null;
      this.contentRect = this.$refs.helpContent
        ? this.$refs.helpContent.getBoundingClientRect()
        : null;

      setTimeout(done, this.transitionTime);

      if (this.justFade || this.justFadeOut) {
        el.style.opacity = '0';
        return;
      }

      if (this.$refs.helpContent) {
        this.$refs.helpContent.style.transform = this.transformationMatrix;
      }
      el.style.opacity = '0';
    },

    onMouseout() {
      if (this.mouseoutClose) {
        this.openedDispatchWrapper();
      }
    },

    /**
     * Check if the help iteself or the target element have/are
     * the specified element
     */
    hasElement(el) {
      while (el.parentNode) {
        if (el === this.$el || el === this.targetElement) {
          return true;
        }
        el = el.parentNode;
      }
      return false;
    },
    outsideClick(event) {
      if (!this.opened || this.hasElement(event.target)) {
        return;
      }

      this.openedDispatchWrapper();
    },
    escapePress(event) {
      if (this.opened && event.code === 'Escape') {
        this.openedDispatchWrapper();
      }
    },
    openedDispatchWrapper() {
      this.opened = false;
    },
    onHelpShow($event) {
      this.targetCoordinates = {
        top: $event.target.offsetTop,
        bottom: Math.ceil($event.target.offsetTop + $event.target.offsetHeight),
        left: $event.target.offsetLeft,
        right: Math.ceil($event.target.offsetLeft + $event.target.offsetWidth)
      };

      this.opened = true;
    },
    onHelpHide($event) {
      let mainComponentDirection = this.position.split('-')[0];

      if (
        ($event.pageY < this.targetCoordinates.top &&
          mainComponentDirection === 'top') ||
        ($event.pageY >= this.targetCoordinates.bottom &&
          mainComponentDirection === 'bottom') ||
        ($event.pageX < this.targetCoordinates.left &&
          mainComponentDirection === 'left') ||
        ($event.pageX >= this.targetCoordinates.right &&
          mainComponentDirection === 'right')
      ) {
        return;
      }

      this.opened = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.target) {
        this.target.$el.addEventListener('mouseover', this.onHelpShow);
        this.target.$el.addEventListener('mouseleave', this.onHelpHide);
      }
    });

    document.addEventListener('click', this.outsideClick, true);
    document.addEventListener('keydown', this.escapePress);
  },
  beforeDestroy() {
    this.$nextTick(() => {
      if (this.target) {
        this.target.$el.removeEventListener('mouseover', this.onHelpShow);
        this.target.$el.removeEventListener('mouseleave', this.onHelpHide);
      }
    });

    document.removeEventListener('click', this.outsideClick, true);
    document.removeEventListener('keydown', this.escapePress);
  }
};
</script>

<style lang="less" scoped>
@import '../styles/mixins';
@import '../styles/vars';

.ds-help {
  position: absolute;
  z-index: @z-index-help;

  .ds-help-content {
    position: relative;
    z-index: @z-index-help-content;
    box-shadow: @dropdown-shadow;
    background: @color-white;
    box-sizing: border-box;
    border: 1px solid @color-gray-300;
    font-family: 'Roboto Medium';
    color: @color-dark;

    .ds-help-arrow-base() {
      &:after,
      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
      }

      &:after {
        border-color: transparent transparent transparent @color-white;
      }

      &:before {
        border-color: transparent transparent transparent @color-gray-300;
      }

      &.ds-help-content-dark {
        &:after {
          border-color: transparent transparent transparent @color-gray-500;
        }

        &:before {
          border-color: transparent transparent transparent @color-gray-500;
        }
      }
    }

    &.ds-help-content-dark {
      background-color: @color-gray-500;
      border: 1px solid @color-gray-500;
      color: @color-white;
    }

    &.ds-help-arrow-top {
      .ds-help-arrow-base();
      &:after,
      &:before {
        top: calc(100% - 0.1px);
      }

      &:after {
        transform: rotate(90deg);
        left: calc(50% - 10px);
        border-width: 9px;
      }

      &:before {
        transform: rotate(90deg);
        left: calc(49% - 10px);
        border-width: 11px;
      }
    }

    &.ds-help-arrow-right {
      .ds-help-arrow-base();
      &:after,
      &:before {
        right: calc(100% - 0.1px);
      }

      &:after {
        transform: rotate(180deg);
        top: calc(50% - 10px);
        border-width: 10px;
      }

      &:before {
        transform: rotate(180deg);
        top: calc(49% - 10px);
        border-width: 11px;
      }
    }

    &.ds-help-arrow-bottom {
      .ds-help-arrow-base();
      &:after,
      &:before {
        bottom: calc(100% - 0.1px);
      }

      &:after {
        transform: rotate(-90deg);
        right: calc(50% - 10px);
        border-width: 9px;
      }

      &:before {
        transform: rotate(-90deg);
        right: calc(49% - 10px);
        border-width: 11px;
      }
    }

    &.ds-help-arrow-left {
      .ds-help-arrow-base();
      &:after,
      &:before {
        left: calc(100% - 0.1px);
      }

      &:after {
        top: calc(50% - 10px);
        border-width: 10px;
      }

      &:before {
        top: calc(49% - 10px);
        border-width: 11px;
      }
    }
  }
}
</style>
