let usage = `
<Stepper v-model="steps"
  @current:step="setCurrentStep"
  :selectedStep="stepNumber"
  :linearMode="true"
  :optionalSteps="[3]"
  :disableForwardHeaderNavigation="disableForwardHeaderNavigation">
        
  <template #header></template>
  <template #step-1>
    <Card class="ds-dashboard-report">
      <div class="ds-report-title">
        Chiffre d'affaires réalisé en 2018
      </div>
      ...
    </Card>
  </template>
  <template #step-2>
    <Icon account_circle size="12px" padding="30px 2px" />
    ...
  </template>
  <template #step-3>
    <Input sm label="Small"/>
    ...
  </template>
  <template #footer></template>
</Stepper>  
`.slice(1);

export default {
  usage
};
