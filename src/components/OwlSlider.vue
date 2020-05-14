<template>
  <div class="carousel-wrapper">
    <carousel
      :loop="loop"
      :autoplay="autoplay"
      :items="items"
      :dots="dots"
      :nav="nav"
      :autoPlayTimeout="autoPlayTimeout"
    >
      <template slot="prev">
        <div class="custom-prev" @click="prevClicked">
          <Icon
            class="ds-control-arrow-left"
            angle_left_solid
            size="18px"
            color="white"
          />
        </div>
      </template>
      <template slot="next">
        <div class="custom-next" @click="nextClicked">
          <Icon
            class="ds-control-arrow-right"
            angle_right_solid
            size="18px"
            color="white"
          />
        </div>
      </template>
      <slot></slot>
    </carousel>
  </div>
</template>

<script>
import carousel from 'v-owl-carousel';
import Icon from './Icon';

export default {
  name: 'OwlSlider',
  components: { carousel, Icon },
  props: {
    autoplay: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: true
    },
    items: {
      type: Number,
      default: 1
    },
    nav: {
      type: Boolean,
      default: false
    },
    dots: {
      type: Boolean,
      default: false
    },
    autoPlayTimeout: {
      type: Number,
      default: 5000
    }
  },
  methods: {
    prevClicked() {
      this.$emit('prev')
    },
    nextClicked() {
      this.$emit('next')
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.carousel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .custom-prev {
    width: 32px;
    height: 32px;
    border-radius: 50px;
    background-color: @color-primary;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: calc(50% - 16px);
    left: 10px;
    z-index: 9;
    cursor: pointer;
  }

  .custom-next {
    width: 32px;
    height: 32px;
    border-radius: 50px;
    background-color: @color-primary;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 16px);
    right: 10px;
    z-index: 9;
    position: absolute;
    cursor: pointer;
  }
}
</style>
