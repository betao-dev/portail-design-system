let usage = `
<Slider
  class="ds-slider"
  header="Testimonials"
  actionType="slide"
  :startIndex.sync="fadeStartIndex"
>
  <template #slider-1>
   <div class="ds-demo-slider-content">
      ...
    </div>
  </template>
  <template #slider-2>
    <div class="ds-demo-slider-content">
      ...
    </div>
  </template>
    ...
</Slider>

<Slider
  class="ds-demo-slider"
  alt
  :startIndex.sync="altSlideStartIndex"
  actionType="fade"
  header="Partenaires"
  altHeaderRight="Tous les partenaires"
  altButtonTitle="Découvrir"
  :altFooterTitles="altSliderFooterTitles"
  height="312px"
  width="362px"
>
  <template #slider-1>
    <div class="ds-slider-alt-content">
      ...
    </div>
  </template>
    ...
</Slider>
`.slice(1);

export default {
  usage
};
