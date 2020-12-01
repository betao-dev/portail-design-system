<!--
  Signature component for make signatures

  Usage:

  <Signature v-model="value"                            - Set signature pad value
             :signaturePadWidth="signaturePadWidth"     - Width signature pad
             :signaturePadHeight="signaturePadHeight"   - Height signature pad
             :lockSignaturePad="lockSignaturePad"       - Lock signature pad
             @empty                                     - Emitted when next events are triggering like mouseup,
                                                          mouseleave or clear button pressed, will return isEmpty status
                                                          of signature pad
             @mouseup                                   - Emitted when is mouseup event is trigger on signature pad and
                                                          signature data is not empty and changed state,
                                                          will return signature pad data value
             @mouseleave                                - Emitted when is mouseleave event is trigger on signature pad
                                                          and signature data is not empty and changed state,
                                                          will return signature pad data value
  >
  </Signature>
-->

<template>
  <div class="ds-signature-wrapper" :style="{ width: signaturePadWidth }">
    <div
      class="ds-signature-pad-wrapper"
      @mousedown="clearPlaceholder"
      @mouseup="mouseup"
      @mouseleave="mouseleave"
    >
      <VueSignaturePad
        class="ds-signature-pad"
        :width="signaturePadWidth"
        :height="signaturePadHeight"
        ref="signaturePad"
      />
    </div>
    <div class="ds-clear-signature-wrapper" v-if="!lockSignaturePad">
      <Icon
        trash
        size="18px"
        color="gray-500"
        class="ds-signature-icon"
        @click="clear"
        >></Icon
      >
      <span class="ds-clear-signature" @click="clear">
        {{ clearTitle }}
      </span>
    </div>
    <slot name="loader"></slot>
  </div>
</template>

<script>
import VueSignaturePad from 'vue-signature-pad';
import Icon from './Icon';

export default {
  name: 'Signature',
  components: { VueSignaturePad, Icon },
  props: {
    value: {
      type: String
    },
    signaturePadWidth: {
      type: String,
      default: '420px'
    },
    signaturePadHeight: {
      type: String,
      default: '160px'
    },
    lockSignaturePad: {
      type: Boolean,
      default: false
    },
    clearTitle: {
      type: String,
      default: 'EFFACER'
    },
    signaruteInitText: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    showPlaceholder: true,
    signatureData: undefined
  }),
  methods: {
    getSignaturePad() {
      let canvas = this.$refs.signaturePad.signaturePad.canvas;
      let ctx = canvas.getContext('2d');

      return { canvas, ctx };
    },
    initSignature() {
      if (this.value) {
        this.$refs.signaturePad.fromDataURL(this.value);
      } else {
        let { canvas, ctx } = this.getSignaturePad();

        ctx.font = '500 18px Lato';
        ctx.fillStyle = '#babcc2';
        ctx.textAlign = 'center';
        ctx.fillText(
          this.signaruteInitText,
          canvas.width / 2,
          canvas.height / 2
        );
      }
      this.checkLockSignaturePad(this.lockSignaturePad);
      this.$emit('empty', this.$refs.signaturePad.saveSignature().isEmpty);
    },
    clearPlaceholder() {
      if (this.showPlaceholder && !this.value) {
        let { canvas, ctx } = this.getSignaturePad();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.showPlaceholder = false;
      }
    },
    clear() {
      this.$refs.signaturePad.clearSignature();
      this.$emit('empty', this.$refs.signaturePad.saveSignature().isEmpty);
    },
    mouseup() {
      this.emitMouseEvent('mouseup');
    },
    mouseleave() {
      this.emitMouseEvent('mouseleave');
    },
    emitMouseEvent(eventType) {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      this.$emit('empty', isEmpty);
      if (!isEmpty && this.signatureData !== data) {
        this.signatureData = data;
        this.$emit(eventType, data);
      }
    },
    checkLockSignaturePad(isLock) {
      if (isLock) {
        this.$refs.signaturePad.lockSignaturePad();
        this.showPlaceholder = false;
      }
    },
    setSignature() {
      const { data: signature } = this.$refs.signaturePad.saveSignature();
      this.$emit('input', signature);
    }
  },
  watch: {
    lockSignaturePad(value) {
      this.checkLockSignaturePad(value);
    }
  },
  mounted() {
    this.$nextTick(() => this.initSignature());
    document.addEventListener('signature', this.setSignature);
  },
  beforeDestroy() {
    document.removeEventListener('signature', this.setSignature);
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-signature-wrapper {
  display: inline-block;
  position: relative;

  .ds-signature-pad-wrapper {
    .ds-signature-pad {
      border: 1px solid @color-gray-300;
      border-radius: 4px;
    }
  }

  .ds-clear-signature-wrapper {
    display: flex;
    align-items: center;
    margin-top: 12px;

    .ds-signature-icon {
      margin-right: 8px;
      cursor: pointer;
    }

    .ds-clear-signature {
      color: @color-gray-500;
      font-family: Roboto Medium, sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0;
      line-height: 14px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
