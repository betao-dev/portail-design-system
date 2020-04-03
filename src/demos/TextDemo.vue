<template>
  <div class="ds-grid">
    <div class="row-col">
      <h2>Fonts</h2>

      <h3>Roboto</h3>
      The font is linked trough css. Available specimens:<br />

      <div class="font-demo">
        <div style="font-weight: 400">400 Regular</div>
        <div style="font-weight: 400; font-style: italic">
          400 Regular Italic
        </div>
        <div style="font-weight: 500">500 Medium</div>
        <div style="font-weight: 600">600 Semi-Bold</div>
        <div style="font-weight: 700">700 Bold</div>
      </div>

      <h3>Style list</h3>
    </div>
    <div class="row">
      <div class="col-6" v-for="fontStyle in fontStyles">
        <div :class="['ds-card', 'font-style-demo', fontStyle]">
          .{{ fontStyle }}();
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TextData } from '../static/index';

export default {
  name: 'TextDemo',
  data: () => ({
    linkSnippet:
      '<link href="https://fonts.googleapis.com/css?family=' +
      'Cabin:400,400i,500,600,700" rel="stylesheet">',
    usage: TextData.usage,
    fontStyles: TextData.fontStyles
  })
};
</script>

<style lang="less">
@import '~@/styles/vars';

.font-demo {
  font-family: Lato;
  font-size: 36px;
  line-height: 40px;
}

.font-style-demo {
  margin-bottom: @vu * 2;
}

.font-components-button-big {
  .font-components-button-big();
  &.card {
    background: @color-primary;
  }
}
.font-components-button-normal {
  .font-components-button-normal();
  &.card {
    background: @color-primary;
  }
}
.font-components-button-normal-alt {
  .font-components-button-normal-alt();
}
.font-components-button-normal-alt-center {
  .font-components-button-normal-alt-center();
}
.font-components-button-normal-alt-dark {
  .font-components-button-normal-alt-dark();
}
.font-components-button-normal-center {
  .font-components-button-normal-center();
  &.card {
    background: @color-primary;
  }
}
.font-components-button-normal-right {
  .font-components-button-normal-right();
  &.card {
    background: @color-primary;
  }
}
.font-components-tab-active {
  .font-components-tab-active();
}
.font-components-tab-inactive {
  .font-components-tab-inactive();
}
.font-desktop-body-medium-dark {
  .font-desktop-body-medium-dark();
}
.font-desktop-body-medium-dark-center {
  .font-desktop-body-medium-dark-center();
}
.font-desktop-body-medium-dark-right {
  .font-desktop-body-medium-dark-right();
}
.font-desktop-body-medium-gray {
  .font-desktop-body-medium-gray();
}
.font-desktop-body-medium-gray-center {
  .font-desktop-body-medium-gray-center();
}
.font-desktop-body-medium-light-gray {
  .font-desktop-body-medium-light-gray();
}
.font-desktop-body-medium-light-gray-center {
  .font-desktop-body-medium-light-gray-center();
}
.font-desktop-body-medium-primary {
  .font-desktop-body-medium-primary();
}
.font-desktop-body-medium-primary-center {
  .font-desktop-body-medium-primary-center();
}
.font-desktop-body-regular-accent {
  .font-desktop-body-regular-accent();
}
.font-desktop-body-regular-dark {
  .font-desktop-body-regular-dark();
}
.font-desktop-body-regular-dark-center {
  .font-desktop-body-regular-dark-center();
}
.font-desktop-body-regular-gray {
  .font-desktop-body-regular-gray();
}
.font-desktop-body-regular-gray-center {
  .font-desktop-body-regular-gray-center();
}
.font-desktop-h-2-dark {
  .font-desktop-h-2-dark();
}
.font-desktop-h-2-dark-center {
  .font-desktop-h-2-dark-center();
}
.font-desktop-h-3-dark {
  .font-desktop-h-3-dark();
}
.font-desktop-h-3-dark-center {
  .font-desktop-h-3-dark-center();
}
.font-desktop-small-italic-gray {
  .font-desktop-small-italic-gray();
}
.font-desktop-small-medium-accent-center {
  .font-desktop-small-medium-accent-center();
}
.font-desktop-small-medium-dark {
  .font-desktop-small-medium-dark();
}
.font-desktop-small-medium-dark-center {
  .font-desktop-small-medium-dark-center();
}
.font-desktop-small-medium-dark-right {
  .font-desktop-small-medium-dark-right();
}
.font-desktop-small-regular-accent {
  .font-desktop-small-regular-accent();
}
.font-desktop-small-regular-accent-center {
  .font-desktop-small-regular-accent-center();
}
.font-desktop-small-regular-dark {
  .font-desktop-small-regular-dark();
}
.font-desktop-small-regular-dark-center {
  .font-desktop-small-regular-dark-center();
}
.font-desktop-small-regular-dark-right {
  .font-desktop-small-regular-dark-right();
}
.font-desktop-small-regular-gray {
  .font-desktop-small-regular-gray();
}
.font-desktop-small-regular-gray-center {
  .font-desktop-small-regular-gray-center();
}
.font-desktop-small-regular-gray-right {
  .font-desktop-small-regular-gray-right();
}
.font-desktop-small-regular-light-gray {
  .font-desktop-small-regular-light-gray();
}
.font-desktop-x-small-regular-accent {
  .font-desktop-x-small-regular-accent();
}
.font-desktop-x-small-regular-dark {
  .font-desktop-x-small-regular-dark();
}
.font-desktop-x-small-regular-gray {
  .font-desktop-x-small-regular-gray();
}
.font-desktop-x-small-regular-gray-right {
  .font-desktop-x-small-regular-gray-right();
}
</style>
