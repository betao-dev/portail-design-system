<template>
  <div class="row-col">
    <h3>OwlSlider</h3>
    <p>OwlSlider component</p>
    <Description compnent-name="OwlSlider"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage">
        <code class="html"></code>
      </pre>
    </Collapser>

    <div class="owl-slider-wrapper">
      <OwlSlider>
        <div class="img-wrapper">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/2016_BMW_i8.jpg" />
        </div>
        <div class="img-wrapper">
          <img
            src="https://images.autotrader.com/scaler/620/420/cms/images/cars/mazda/mazda3/2014/real-world/225938.jpg"
          />
        </div>
        <div class="img-wrapper">
          <img
            src="https://topgearrussia.ru/data/topgear/preview/2018-06/15/image-3a6c67d51529094657-640x400.jpg"
          />
        </div>
      </OwlSlider>
    </div>
  </div>
</template>

<script>
import OwlSlider from '../../components/OwlSlider';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser';
import { OwlSliderData } from '../../static/index';

export default {
  name: 'OwlSliderDemo',
  components: {
    OwlSlider,
    Description,
    Collapser
  },
  data: () => ({
    openUsage: true,
    usage: OwlSliderData.usage
  })
}
</script>

<style lang="less" scoped>
.owl-slider-wrapper {
  width: 400px;

  .img-wrapper {
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

