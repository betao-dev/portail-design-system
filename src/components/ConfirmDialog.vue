<template>
  <Dialog
    :opened="opened"
    :borderColor="borderColor"
    :clickOutsideToClose="clickOutsideToClose"
    @update:opened="updateOpenStatus"
  >
    <div
      class="ds-confirm-wrapper"
      :style="getStyle"
    >
      <div class="ds-confirm-header">
        {{ title }}
      </div>

      <div class="ds-confirm-body">
        <slot name="ds-confirm-content"></slot>
      </div>

      <div class="ds-confirm-footer">
        <Button big padding="15px 40px" @click="updateOpenStatus(false)" alt>{{ rejectLabel }}</Button>
        <template v-if="extraButton">
          <Button big padding="15px 40px" @click="extraButtonClick">{{ extraButtonLabel }}</Button>
        </template>
        <Button big padding="15px 40px" @click="acceptStatus">{{ acceptLabel }}</Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from './Dialog'
import Button from './Button'

export default {
  name: 'confirm-dialog',
  components: {Dialog, Button},
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: '#e6e7eb'
    },
    width: {
      type: String,
      default: '544px'
    },
    title: String,
    clickOutsideToClose: {
      type: Boolean,
      default: true
    },
    acceptLabel: {
      type: String,
      default: 'Accept'
    },
    rejectLabel: {
      type: String,
      default: 'Cancel'
    },
    extraButton: {
      type: Boolean,
      default: false
    },
    extraButtonLabel: {
      type: String
    }
  },
  computed: {
    getStyle() {
      const style = {}
      style.width = this.width
      return style
    }
  },
  methods: {
    updateOpenStatus(status) {
      this.$emit('update:opened', status)
      this.$emit('accept', false)
    },
    acceptStatus() {
      this.$emit('update:opened', false)
      this.$emit('accept', true)
    },
    extraButtonClick() {
      this.$emit('update:opened', false),
      this.$emit('extraAction')
    }
  }
}
</script>

<style lang="less">
@import "../styles/vars";

.ds-confirm-wrapper {
  padding: 40px 28px;
  box-sizing: border-box;
  font-family: Lato;

  @media @screen-small {
    width: 100% !important;
    max-width: 100%;
  }

  .ds-confirm-header {
    font-size: 18px;
    line-height: 28px;
    color: @color-dark;
    font-weight: 600;
    text-align: center;
  }

  .ds-confirm-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;

    .ds-button-link-wrapper {
      margin-left: 16px;
    }
  }

  .ds-confirm-body {
    color: #3F4352;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
