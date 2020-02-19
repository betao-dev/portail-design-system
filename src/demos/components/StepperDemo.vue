<template>
  <div class="row-col">
    <h3>Stepper</h3>
    <p>Stepper component for outputting components as step</p>

    <Description compnent-name="Stepper"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Stepper
      v-model="steps"
      @current:step="setCurrentStep"
      :selectedStep="stepNumber"
      :linearMode="true"
      :optionalSteps="[3]"
      :disableForwardHeaderNavigation="disableForwardHeaderNavigation"
    >
      <template #header></template>
      <template #step-1>
        <Card class="ds-dashboard-report">
          <div class="ds-report-title">
            Chiffre d'affaires réalisé en 2018
          </div>
          <div class="ds-report-amount green">
            <Icon arrow_upward></Icon>95,00 €
          </div>
          <div class="ds-report-subtitle">
            dont 0,00 € ce mois-ci
          </div>
        </Card>
      </template>
      <template #step-2>
        <Icon account_circle size="12px" padding="30px 2px" />
        <Icon account_circle size="16px" padding="28px 2px" color="primary" />
        <Icon account_circle padding="24px 2px" color="blue" />
        <Icon account_circle size="36px" padding="18px 2px" color="red" />
        <Icon account_circle size="52px" padding="10px 2px" color="gray-400" />
        <Icon account_circle size="72px" color="#55aaff" />
      </template>
      <template #step-3>
        <Input sm label="Small" />
        <Input md label="Medium" />
        <Input lg label="Large" />
      </template>
      <template #footer></template>
    </Stepper>

    <div class="control-buttons">
      <Button @click="prevStep">Preview</Button>
      <Button @click="nextStep">Next</Button>
      <Button @click="onDisableSwitcher">Disable mode switcher</Button>
    </div>
    <div>
      <span><b>Disable mode:</b> {{ disableForwardHeaderNavigation }}</span>
    </div>
  </div>
</template>

<script>
import Stepper from '../../components/Stepper';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser';
import { StepperData } from '../../static/index';

export default {
  name: 'StepperDemo',
  components: { Stepper, Card, Icon, Input, Button, Description, Collapser },
  data: () => ({
    usage: StepperData.usage,
    openUsage: true,
    steps: [{ name: 'Card' }, { name: 'Icon' }, { name: 'Input' }],
    stepNumber: 1,
    disableForwardHeaderNavigation: true
  }),
  methods: {
    setCurrentStep(index) {
      this.stepNumber = index;
    },
    nextStep() {
      this.stepNumber = this.stepNumber + 1;
    },
    prevStep() {
      this.stepNumber = this.stepNumber - 1;
    },
    onDisableSwitcher() {
      this.disableForwardHeaderNavigation = !this
        .disableForwardHeaderNavigation;
    }
  }
};
</script>

<style lang="less" scoped>
.control-buttons {
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    margin: 20px;
  }
}
</style>
