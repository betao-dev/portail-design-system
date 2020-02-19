<template>
  <span class="ds-star">
    <span v-for="star in stars">
      <svg width="20" height="20" viewBox="0 0 51 48" v-show="disabled">
        <path
          v-show="value <= star"
          fill="#D7D1D1"
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        />
        <path
          v-show="value >= star"
          fill="#F4C164"
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        />
      </svg>
      <svg
        v-show="!disabled"
        class="ds-rating-svg"
        width="20"
        height="20"
        viewBox="0 0 51 48"
        @click="setStars(star)"
        @mouseover="starOver(star)"
        @mouseleave="starLeave()"
      >
        <path
          fill="#D7D1D1"
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        />
        <path
          v-show="value >= star"
          fill="#F4C164"
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        />
        <path
          v-show="hoverToFill >= star"
          fill="#F4C164"
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        />
      </svg>
    </span>
  </span>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Star',
  props: {
    value: Number,
    disabled: Boolean,
    starsCount: {
      type: Number,
      default: 5
    }
  },
  data: () => ({
    stars: undefined,
    hoverToFill: 0
  }),
  methods: {
    setStars(value) {
      this.$emit('input', value);
    },
    starOver(star) {
      this.hoverToFill = star;
    },
    starLeave() {
      this.hoverToFill = 0;
    }
  },
  mounted() {
    let end = this.starsCount;
    this.stars = _.range(1, ++end);
  }
};
</script>

<style lang="less">
.ds-star {
  .ds-rating-svg {
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
}
</style>
