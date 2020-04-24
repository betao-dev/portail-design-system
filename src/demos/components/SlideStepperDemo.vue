<template>
  <div class="row-col">
    <h3>SlideStepper</h3>
    <h4>Usage</h4>
    <p>Users can customize header and body of each slider</p>

    <Description compnent-name="SlideStepper"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="ds-slider-step-container">
      <SlideStepper :step-size="5" :current-step="3">
        <template #header-1>
          <div class="title">Step 1</div>
          <div class="sub-title">This is step 1</div>
        </template>

        <template #header-2>
          <div class="title">Step 1</div>
          <div class="sub-title">This is step 2</div>
        </template>

        <template #header-3>
          <div class="title">Step 3</div>
        </template>

        <template #header-4>
          <div class="title">Step 4</div>
          <div class="sub-title">You can customize every header based on your requirement</div>
        </template>

        <template #header-5>
          <div class="title">Step 5</div>
        </template>

        <template #content-1>
          <div class="content-wrapper">
            <div>Step 1 Content</div>
            <div>You can customize this content using slot</div>
          </div>
        </template>

        <template #content-2>
          <div class="content-wrapper">
            <div>Step 2 Content</div>
            <div>You can customize this content using slot</div>
          </div>
        </template>

        <template #content-3>
          <div class="content-wrapper">
            <div>Step 3 Content</div>
            <div>You can customize this content using slot</div>
          </div>
        </template>

        <template #content-4>
          <div class="content-wrapper">
            <div>Step 4 Content</div>
            <div>You can customize this content using slot</div>
          </div>
        </template>

        <template #content-5>
          <div class="content-wrapper">
            <div>Step 5 Content</div>
            <div>You can customize this content using slot</div>
          </div>
        </template>
      </SlideStepper>
    </div>
  </div>
</template>

<script>
import SlideStepper from '../../components/SlideStepper';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser';
import { SlideStepperData } from '../../static/index'

export default {
  name: 'SlideStepperDemo',
  components: {
    SlideStepper,
    Description,
    Collapser
  },
  data() {
    return {
      openUsage: true,
      usage: SlideStepperData.usage
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/vars';


.ds-slider-step-container {
  width: 400px;

  .title {
    font-size: 18px;
    color: #1EB386;
    line-height: 28px;
    text-align: center;
  }

  .sub-title {
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: @color-gray-400;
  }

  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
