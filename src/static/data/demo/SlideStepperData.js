let usage = `
<SlideStepper :step-size="5" :current-step="3" class="ds-demo-slider-step">
  <template #header-1>
    <div class="ds-demo-title">Step 1</div>
    <div class="ds-demo-sub-title">This is step 1</div>
  </template>
    ...

  <template #content-1>
    <div class="ds-demo-content-wrapper">
      <div>Step 1 Content</div>
      <div>You can customize this content using slot</div>
    </div>
  </template>

    ...

</SlideStepper>
`;

export default {
  usage
};
