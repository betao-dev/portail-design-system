<template>
  <div class="ds-slide-stepper-container">
    <div class="ds-slide-stepper-header">
      <div class="ds-previous" @click="prev">
        <Icon
          v-if="current > 1"
          source="angle_left_solid"
          size="18px"
          color="#1EB386"
        />
      </div>
      <div class="ds-next" @click="next">
        <Icon
          v-if="current < stepSize"
          source="angle_right_solid"
          size="18px"
          color="#1EB386"
        />
      </div>

      <div
        v-for="step in stepSize"
        :key="step"
        :class="current == step ? 'current' : ''"
        class="ds-header-wrapper"
      >
        <slot :name="`header-${step}`"></slot>
      </div>
    </div>

    <div class="ds-slide-divider-container">
      <div
        v-for="step in stepSize"
        :key="step"
        :class="current == step ? 'current' : ''"
        class="ds-step-divider"
      ></div>
    </div>

    <div class="ds-slider-stepper-body">
      <div
        v-for="step in stepSize"
        :key="step"
        :class="current == step ? 'current' : ''"
        class="ds-step-body"
      >
        <slot :name="`content-${step}`"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'SlideStepper',
  components: { Icon },
  mounted() {
    if (this.currentStep) {
      this.current = this.currentStep;
    }
  },
  props: {
    stepSize: {
      type: Number,
      required: true
    },
    currentStep: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      current: 1
    };
  },
  methods: {
    prev() {
      if (this.current > 1) {
        this.current--;
      }
    },
    next() {
      if (this.current < this.stepSize) {
        this.current++;
      }
    }
  },
  watch: {
    currentStep(newVal) {
      if (newVal) {
        this.current = newVal;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ds-slide-stepper-container {
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 16px 0 rgba(153, 155, 168, 0.16);

  .ds-slide-stepper-header {
    padding: 17px 46px;
    position: relative;

    .ds-previous {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 46px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .ds-next {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 46px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .ds-header-wrapper {
      display: none;
      width: 100%;
      height: 100%;

      &.current {
        display: block;
      }
    }
  }

  .ds-slide-divider-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ds-step-divider {
      margin-right: 5px;
      background-color: #1eb386;
      height: 3px;
      opacity: 0.3;
      flex: 1;

      &.current {
        opacity: 1;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .ds-slider-stepper-body {
    .ds-step-body {
      display: none;
      width: 100%;
      height: 100%;

      &.current {
        display: block;
      }
    }
  }
}
</style>
