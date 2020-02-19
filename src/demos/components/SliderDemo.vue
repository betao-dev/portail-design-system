<template>
  <div class="row-col">
    <h3>Slider</h3>
    <p>Slider component with slidable content</p>

    <Description compnent-name="Slider"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Slider :startIndex.sync="startIndex" header="Testimonials">
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
    startIndex: 2
  })
};
</script>

<style lang="less" scoped>
.ds-demo-slider-content {
  padding: 25px;
}
</style>
