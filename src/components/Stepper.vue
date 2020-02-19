<!--
  Stepper

  Usage:

    <Step v-model="steps">
      <template #header></template>
      <template #step-1>
        <Card class="dashboard-report">
          <div class="report-title">
            Chiffre d'affaires réalisé en 2018
          </div>
          <div class="report-amount green">
            <Icon arrow_upward></Icon>95,00 €
          </div>
          <div class="report-subtitle">
            dont 0,00 € ce mois-ci
          </div>
        </Card>
      </template>
      <template #step-2>
        <Icon account_circle size="12px" padding="30px 2px" />
        <Icon account_circle size="16px" padding="28px 2px" color="primary" />
        <Icon account_circle padding="24px 2px" color="blue"/>
        <Icon account_circle size="36px" padding="18px 2px" color="red" />
        <Icon account_circle size="52px" padding="10px 2px" color="gray-400" />
        <Icon account_circle size="72px" color="#55aaff" />
      </template>
      <template #step-3>
        <Input sm label="Small"/>
        <Input md label="Medium"/>
        <Input lg label="Large"/>
      </template>
      <template #footer></template>
    </Step>

  Properties:

    value - Array<Object> Steps to display on the Stepper. Where objects look like:
      [{
        name: String           - Displayed step name
      }, {
        ...
      }]
-->

<template>
  <div class="ds-stepper">
    <slot name="header"></slot>
    <div v-if="value.length">
      <div :class="['ds-step']" :style="{ height: `${isMobile ? 40 : 56}px` }">
        <div
          v-for="(step, index) in value"
          @click="nextStep(index + 1)"
          :key="index"
        >
          <Icon
            :source="
              index + 1 === invalidStep
                ? 'info'
                : isMobile
                ? 'round'
                : 'check_circle'
            "
            :color="getIconColor(index)"
            size="18px"
            padding="3px"
          >
          </Icon>

          <span v-if="!isMobile" :class="getIconColor(index)">
            {{ step.name }}
          </span>

          <Icon
            source="arrow_right"
            :color="getIconColor(index)"
            size="18px"
            padding="3px"
            v-if="!isMobile && index + 1 !== value.length"
          >
          </Icon>
        </div>
      </div>

      <div class="ds-slot-container" :style="{ maxHeight: maxHeight }">
        <slot :name="activeStepName"></slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import Icon from './Icon';

const DesktopWidth = 960;

export default {
  name: 'Stepper',
  components: { Icon },
  props: {
    value: {
      type: Array
    },
    selectedStep: {
      default: 1,
      type: Number
    },
    linearMode: {
      type: Boolean,
      default: false
    },
    optionalSteps: {
      type: Array,
      default: () => []
    },
    valid: {
      type: Boolean,
      default: true
    },
    disableForwardHeaderNavigation: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String,
      default: '400px'
    }
  },
  data: () => ({
    windowWidth: window.innerWidth,
    stepIndex: 1,
    startX: undefined,
    minDistance: 100,
    invalidStep: -1,
    disabledStep: -1,
    previousDisabledState: undefined,
    lastAvailableHeaderStep: 1,
    forbidUpdateLastStep: false
  }),
  computed: {
    activeStepName() {
      return `step-${this.stepIndex}`;
    },
    isMobile() {
      return this.windowWidth <= DesktopWidth;
    }
  },
  methods: {
    getIconColor(index) {
      switch (true) {
        case this.invalidStep === index + 1:
          return 'red';
        case this.stepIndex > index + 1:
          return 'primary';
        case this.stepIndex === index + 1:
          return 'dark';
        default:
          return 'gray-400';
      }
    },

    nextStep(index) {
      if (this.linearMode) {
        if (
          (!this.valid && index > this.invalidStep) ||
          (this.disableForwardHeaderNavigation &&
            index > this.lastAvailableHeaderStep)
        ) {
          return;
        }

        if (this.optionalSteps.includes(index) || index - this.stepIndex <= 1) {
          this.updateStepHelper(index);
        }
      } else {
        this.updateStepHelper(index);
      }
    },

    swipeStep(regulator) {
      let futureStep = this.stepIndex + regulator;

      if (futureStep <= this.value.length && futureStep >= 1) {
        this.stepIndex += regulator;
      }
    },

    touchStart(event) {
      this.startX = event.changedTouches[0].pageX;
      event.preventDefault();
    },

    touchEnd(event) {
      let endX = event.changedTouches[0].pageX - this.startX;
      if (Math.abs(endX) > this.minDistance) {
        this.swipeStep(endX > 0 ? 1 : -1);
      }
      event.preventDefault();
    },

    onResize() {
      this.windowWidth = window.innerWidth;
    },

    checkInvalidStep(valid) {
      this.invalidStep = !valid ? this.selectedStep : -1;
    },

    checkDisableStep(disable) {
      if (this.previousDisabledState !== this.disableForwardHeaderNavigation) {
        this.disabledStep = disable ? this.selectedStep : -1;
      } else if (this.disableForwardHeaderNavigation) {
        this.disabledStep =
          this.selectedStep > this.disabledStep
            ? this.selectedStep
            : this.disabledStep;
      }

      this.previousDisabledState = this.disableForwardHeaderNavigation;
    },
    updateStepHelper(index) {
      if (this.stepIndex !== index) {
        this.forbidUpdateLastStep = this.disableForwardHeaderNavigation;
      }

      this.stepIndex = index;
      this.$emit('current:step', this.stepIndex);
    }
  },
  watch: {
    selectedStep(val) {
      if (this.linearMode) {
        if (!this.valid && val > this.invalidStep) {
          this.$emit('current:step', this.stepIndex);
          return;
        }

        if (
          (this.optionalSteps.includes(val) || val - this.stepIndex <= 1) &&
          val > 0 &&
          val <= this.value.length
        ) {
          this.stepIndex = val;
        }
        this.$emit('current:step', this.stepIndex);
      } else {
        if (val < 1) {
          this.stepIndex = this.value.length;
        } else if (val < this.value.length) {
          this.stepIndex = 1;
        } else {
          this.stepIndex = val;
        }
        this.$emit('current:step', this.stepIndex);
      }

      if (!this.forbidUpdateLastStep) {
        this.lastAvailableHeaderStep = this.stepIndex;
      }
      this.forbidUpdateLastStep = false;

      this.checkDisableStep(this.disableForwardHeaderNavigation);
    },
    valid(val) {
      this.checkInvalidStep(val);
    },
    disableForwardHeaderNavigation(val) {
      this.checkDisableStep(val);
    }
  },
  mounted() {
    this.checkInvalidStep(this.valid);
    this.checkDisableStep(this.disableForwardHeaderNavigation);

    window.addEventListener('resize', this.onResize);

    this.$el.addEventListener('touchstart', this.touchStart);
    this.$el.addEventListener('touchend', this.touchEnd);
    this.lastAvailableHeaderStep = this.stepIndex;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-stepper {
  .ds-step {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @color-white;
    box-shadow: @card-shadow;
    margin-bottom: @stepper-step-margin-bottom;
    cursor: pointer;
  }

  .ds-slot-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .primary {
    color: @color-primary;
  }
  .gray-400 {
    color: @color-gray-400;
  }
  .dark {
    color: @color-dark;
  }
  .red {
    color: @color-red;
  }
}
</style>
