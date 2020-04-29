<template>
  <div class="row-col">
    <h3>Slider</h3>
    <p>Slider component with slidable content</p>

    <Description compnent-name="Slider"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Slider
      class="ds-demo-slider"
      header="Testimonials"
      actionType="slide"
      :startIndex.sync="fadeStartIndex"
    >
      <template #slider-1>
        <div class="ds-demo-slider-content">
          C'est vraiment pratique, l’utilisation du mini TPE est très complète
          (en plus d’être beaucoup moins cher qu'un TPE classique en location).
          Pouvoir faire en même temps caisse enregistreuse et avoir
          immédiatement les statistiques des ventes, c'est un vrai plus !
        </div>
      </template>
      <template #slider-2>
        <div class="ds-demo-slider-content">
          Slide 2
        </div>
      </template>
      <template #slider-3>
        <div class="ds-demo-slider-content">
          Mister France
        </div>
      </template>
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
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e9/2016_BMW_i8.jpg"
          />
        </div>
      </template>
      <template #slider-2>
        <div class="ds-slider-alt-content">
          <img
            src="https://images.autotrader.com/scaler/620/420/cms/images/cars/mazda/mazda3/2014/real-world/225938.jpg"
          />
        </div>
      </template>
      <template #slider-3>
        <div class="ds-slider-alt-content">
          <img
            src="https://topgearrussia.ru/data/topgear/preview/2018-06/15/image-3a6c67d51529094657-640x400.jpg"
          />
        </div>
      </template>
    </Slider>
  </div>
</template>

<script>
import Slider from '../../components/Slider.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { SliderData } from '../../static/index';

export default {
  name: 'SliderDemo',
  components: { Slider, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: SliderData.usage,
    fadeStartIndex: 1,
    altSlideStartIndex: 1,
    altSliderFooterTitles: [
      {
        title: 'MonaBanq 1',
        short_title: 'Finance 1'
      },
      {
        title: 'MonaBanq 2',
        short_title: 'Finance 2'
      },
      {
        title: 'MonaBanq 3',
        short_title: 'Finance 3'
      }
    ]
  })
};
</script>

<style lang="less" scoped>
.ds-demo-slider {
  margin-bottom: 20px;
}

.ds-demo-slider-content {
  padding: 25px;
}
</style>
