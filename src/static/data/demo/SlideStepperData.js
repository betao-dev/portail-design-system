let usage = `
<SlideStepper :step-size="5">
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
    <div>You can customize every header based on your requirement</div>
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
`

export default {
  usage,
}
