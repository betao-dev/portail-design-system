<template>
  <Dialog
    :opened="opened"
    :borderColor="borderColor"
    :clickOutsideToClose="clickOutsideToClose"
    @update:opened="updateOpenStatus"
  >
    <div class="ds-alert-wrapper" :style="getStyle">
      <div class="ds-alert-header">
        {{ title }}
      </div>

      <div class="ds-alert-body">
        <slot name="ds-alert-content"></slot>
      </div>

      <div class="ds-alert-footer">
        <Button @click="updateOpenStatus(false)" alt> {{ getOkTitle }} </Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from './Dialog';
import Button from './Button';

export default {
  name: 'alert-dialog',
  components: { Dialog, Button },
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
    okTitle: String,
    clickOutsideToClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getStyle() {
      const style = {};
      style.width = this.width;
      return style;
    },
    getOkTitle() {
      return this.okTitle ? this.okTitle : this.dsTranslate('OK');
    }
  },
  methods: {
    updateOpenStatus(status) {
      this.$emit('update:opened', status);
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-alert-wrapper {
  padding: 40px 40px 32px 40px;
  box-sizing: border-box;
  font-family: Lato;

  @media @screen-small {
    width: 100% !important;
    max-width: 100%;
  }

  .ds-alert-header {
    font-size: 24px;
    line-height: 28px;
    color: #3f4352;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .ds-alert-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .ds-alert-body {
    margin-bottom: 32px;
    color: #3f4352;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
