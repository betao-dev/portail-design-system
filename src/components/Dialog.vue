<!--
  Dialog component for displaying different content inside itself

  Usage:

  <Dialog
    :opened.sync="opened"                      - State the dialog window
    :backdropOpacity="backdropOpacity"         - Set backdrop opacity by value from 0..1.
    :fullScreen="fullScreen"                   - Set up full screen option of dialog modal
    :borderColor="borderColor"                 - Set up border color for dialog content
    :backgroundColor="backgroundColor"         - Set up background color of backdrop
    :dialogStyleObject="dialogStyleObject"     - Styles object responsible for styles which will be applied to dialog node
    :contentFullWidth="contentFullWidth"       - Set up full width of content
    :datepickerContainer="datepickerContainer" - Apply styles of mobile datepicker design to dialog
    :overflowCheck="overflowCheck"             - Check overflow depend on it option
  >
    Dialog content...
  </Dialog
-->

<template>
  <section
    v-if="opened"
    v-move-to-body
    class="ds-dialog"
    :style="dialogStyleObject"
    :id="backdropId"
  >
    <div
      :class="['ds-dialog-backdrop', {'ds-dialog-datepicker-backdrop': datepickerContainer}]"
      :style="{opacity: backdropOpacity, 'background-color': backgroundColor}"
      @click.stop="backdropClick()"
      @keydown="e => escapePress(e)"
    ></div>
      <div :class="['ds-dialog-content', {'ds-border-content': borderColor, 'ds-full-screen-content': fullScreen,
                    'ds-full-screen-active-content': fullScreenActive, 'ds-full-width': contentFullWidth,
                    'ds-dialog-datepicker-container': datepickerContainer, 'ds-dialog-top-offset': top}]"
           :style="{borderColor, minHeight, minWidth, overflowY, top}"
           :id="idContent">
        <div :class="['ds-dialog-wrapper', {'ds-full-width': contentFullWidth}]">
          <slot></slot>
        </div>
        <Loader v-if="enableLoader" v-model="enableLoader" :target="idContent"></Loader>
      </div>
  </section>
</template>

<script>
  import Loader from './Loader'
  import _ from 'lodash'

  const widthMD = 1280;

  export default {
    name: 'Dialog',
    components: {Loader},
    props: {
      opened: Boolean,
      backdropId: {
        type: String,
        default: ''
      },
      backdropOpacity: {
        type: String,
        default: '0.6'
      },
      fullScreen: {
        type: Boolean,
        default: false
      },
      borderColor: [String, Boolean],
      backgroundColor: String,
      dialogStyleObject: Object,
      contentFullWidth: {
        type: Boolean,
        default: false
      },
      datepickerContainer: {
        type: Boolean,
        default: false
      },
      overflowCheck: {
        type: Boolean,
        default: true
      },
      activeDatepickerComponent: {
        type: String
      },
      clickOutsideToClose: {
        type: Boolean,
        default: true
      },
      enableLoader: {
        type: Boolean,
        default: false
      },
      minHeight: String,
      minWidth: String,
      top: String
    },
    data: () => ({
      windowWidth: window.innerWidth,
      $_defaultStyles: {},
      idContent: 'ds-dialog-content-'.concat(Math.random().toString(15).substring(5)),
      scrollPositionY: 0
    }),
    mounted() {
      window.addEventListener('resize', this.onResize)
      document.addEventListener('keydown', this.escapePress)
      document.addEventListener('keydown', this.tabPress, true)
      // document.addEventListener('touchmove', this.touchMove, { passive: false })
    },

    directives: {
      moveToBody: {
        inserted: function (el) {
          document.body.appendChild(el)
        },
        unbind: function (el) {
          if(el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      },
    },

    methods: {
      backdropClick() {
        if (this.clickOutsideToClose) {
          this.openedDispatchWrapper(true)
        }
      },
      /**
       * Check if the dropdown iteself or the target element have/are
       * the specified element
       */
      hasElement(el) {
        while (el.parentNode) {
          if (el === this.$el || el === this.targetElement) {
            return true
          }

          el = el.parentNode
        }
        return false
      },
      /**
       * Close dropdown when the Escape key is pressed
       */
      escapePress(event) {
        if (this.opened && event.code === "Escape") {
          this.openedDispatchWrapper()
        }
      },

      /**
       * When the dropdown is opened, only focus within it through TAB
       */
      tabPress(event) {
        if (!this.opened || event.code !== "Tab") {
          return
        }

        if (
          this.hasElement(document.activeElement) &&
          !document.activeElement.classList.contains('focus-trap')
        ) {
          return
        }

        event.preventDefault()

        let focusableQuery = `
        a[href]:not([tabindex='-1']),
        area[href]:not([tabindex='-1']),
        input:not([disabled]):not([tabindex='-1']),
        select:not([disabled]):not([tabindex='-1']),
        textarea:not([disabled]):not([tabindex='-1']),
        button:not([disabled]):not([tabindex='-1']),
        iframe:not([tabindex='-1']),
        [tabindex]:not([tabindex='-1']):not(.focus-trap),
        [contentEditable=true]:not([tabindex='-1'])
      `;
        let focusableElements = this.$el.querySelectorAll(focusableQuery)

        if (!focusableElements.length) {
          document.activeElement.blur()
          return
        }
        if (event.shiftKey) {
          focusableElements[focusableElements.length - 1].focus()
        }
        else {
          focusableElements[0].focus()
        }
      },
      onResize() {
        this.windowWidth = window.innerWidth
      },
      // touchMove(event) {
      //   if (this.opened) {
      //     event.preventDefault()
      //   }
      // },
      openedDispatchWrapper(backdropClick) {
        if (backdropClick && !this.clickOutsideToClose) {
          return
        }
        if (_.isUndefined(this.activeDatepickerComponent) || this.activeDatepickerComponent === 'Dialog') {
          this.$emit('update:opened', false)
        }
      }
    },
    computed: {
      fullScreenActive() {
        return this.fullScreen && widthMD >= this.windowWidth
      },
      overflowY() {
        return this.enableLoader ? 'hidden' : 'auto'
      },
      isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      }
    },
    watch: {
      opened(value) {
        if (this.overflowCheck) {
          let htmlStyle = document.getElementsByTagName('html')[0].style
          let bodyStyle = document.getElementsByTagName('body')[0].style

          if (value) {
            if (this.isMobile) {
              this.scrollPositionY = window.pageYOffset
            }

            this.$_defaultStyles = {
              body: {},
              html: {}
            }

            this.$_defaultStyles.body = {
              position: bodyStyle.position || 'static',
              overflow: 'auto'
            }

            bodyStyle.overflow = 'hidden'
            bodyStyle.position = this.isMobile ? 'fixed' : 'relative'

            this.$_defaultStyles.html = {
              position: htmlStyle.position || 'static',
              overflow: htmlStyle.overflow,
              height: htmlStyle.height
            }

            htmlStyle.overflow = 'hidden'
            htmlStyle.position = this.isMobile ? 'fixed' : 'relative'
          } else {
            if (this.$_defaultStyles) {
              Object.assign(htmlStyle, this.$_defaultStyles.html)
              Object.assign(bodyStyle, this.$_defaultStyles.body)
            }

            if (this.isMobile) {
              window.scrollTo(0, this.scrollPositionY)
              this.scrollPositionY = 0
            }
          }
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
      document.removeEventListener('keydown', this.escapePress);
      document.removeEventListener('keydown', this.tabPress, true)
      // document.removeEventListener('touchmove', this.touchMove, { passive: false })
    },
  }
</script>

<style lang="less">
  @import "../styles/vars";

  .ds-dialog {
    position: fixed;
    display: flex;
    -ms-flex: 1 0 auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;

    .ds-dialog-backdrop {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      z-index: 1000;
      background-color: #000;
    }

    .ds-dialog-content {
      position: relative;
      width: auto;
      z-index: 1001;
      background-color: white;
      border-radius: 4px;
      height: auto;
      max-height: calc(100% - 128px);
      overflow-x: hidden;
      max-width: 1280px;

      @media @screen-small {
        width: 100%;
        height: 100vh;
        max-height: 100vh;
      }

      .ds-dialog-wrapper {
        height:100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;

        .ds-dialog-header:not(:empty) {
          .font-desktop-h-3-dark-center();
          padding: 16px;
          box-sizing: border-box;
          background-color: @color-white;
          box-shadow: inset 0 -1px 0 0 @color-gray-300;
        }
        @media @screen-medium, @screen-small {
          .ds-dialog-header:not(:empty) {
            padding: 12px;
          }
        }

        .ds-dialog-body {
          overflow: auto;
          height:100%;
        }

        &.ds-full-width {
          width: 100%;
        }
      }

      &.ds-full-width {
        width: 100%;
      }

      &.ds-dialog-datepicker-container {
        border-radius: 0;
        box-shadow: 0 -1px 1px 0 rgba(91,99,156,0.26);
      }

      &.ds-dialog-top-offset {
        position: absolute;
      }
    }

    @media only screen and (max-height: 556px) {
      .ds-dialog-content {
        max-height: 100%;
      }
    }

    .ds-border-content {
      border-style: solid;
      border-width: 1px;
    }

    .ds-full-screen-content {
      display: block;
      width: 1280px;
      height: 800px;
      max-height: 100%;
      max-width:1280px;

      .ds-dialog-content {
        flex-grow: 1;
      }
    }

    .ds-full-screen-active-content {
      width: 100% !important;
      height: 100% !important;
    }
  }

  @media @screen-small {
    .ds-dialog {
      .ds-dialog-datepicker-container {
        margin-bottom: auto;
        height: 430px;
      }

      .ds-dialog-datepicker-backdrop {
        opacity: 1 !important;
      }
    }
  }

</style>
