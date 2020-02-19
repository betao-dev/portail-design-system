<!--
  Empty state component for empty pages

  Usage:

  <EmptyState v-model="value"  - Data object data which consist next field:
                                      title    - Title of empty component
                                      moreInfo - Additional text data of empty component
                                      btnLabel - Title of button component
                                      imgName  - Image name of empty component

              @create >        - Emitted when button is clicked
  </EmptyState>
-->

<template>
  <div class="ds-empty-page-container">
    <div class="ds-empty-state-wrapper">
      <div class="row ds-img-row">
        <Icon :[imageName]="imageName" noSize class="ds-empty-img"></Icon>
      </div>
      <div class="row ds-title-row">
        <span class="ds-empty-state-title">{{ value.title }}</span>
      </div>
      <div class="row ds-more-info-row">
        <span class="ds-empty-state-content">{{ value.moreInfo }}</span>
      </div>
      <div class="row ds-btn-row">
        <Button @click="onCreate">{{ value.btnLabel }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button';
import Icon from './Icon';

export default {
  name: 'EmptyState',
  components: { Button, Icon },
  props: {
    value: Object
  },
  methods: {
    onCreate() {
      this.$emit('create');
    }
  },
  computed: {
    imageName() {
      return this.value.imgName;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

@max-width-empty-state: 570px;

.ds-empty-page-container {
  text-align: center;
  display: block;
  margin: 0 auto;
  font-family: @font-family;
  word-wrap: break-word;
  max-width: @max-width-empty-state;

  div {
    padding: 8px 0;
  }

  .ds-img-row {
    margin-bottom: 10px;
  }

  .ds-empty-img {
    max-height: 152px;
    max-width: 365px;

    @media @screen-small {
      height: auto;
      width: 80%;
    }
  }

  .ds-empty-state-title {
    color: @font-desktop-h-2-dark-color;
    font-size: @font-desktop-h-2-dark-font-size;
    line-height: @font-desktop-h-2-dark-line-height;
    font-weight: @font-desktop-h-2-dark-font-weight;

    @media @screen-small {
      font-size: 20px;
    }
  }

  .ds-empty-state-content {
    color: @font-desktop-body-regular-dark-color;
    font-size: @font-desktop-body-regular-dark-font-size;
    line-height: @font-desktop-body-regular-dark-line-height;

    @media @screen-small {
      font-size: 14px;
    }
  }

  .ds-btn-row {
    margin: 20px;

    @media @screen-small {
      margin: 12px 0;
    }
  }
}
</style>
