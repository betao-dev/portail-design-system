<template>
  <div class="row-col">
    <h3>Star</h3>
    <p>Stars list for rate</p>

    <Description compnent-name="Star"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Star v-model="starValue"></Star> <br />
    <Star v-model="disabledStarValue" disabled></Star> <br />
    <Star v-model="customStarValue" :starsCount="starsCount"></Star>
  </div>
</template>

<script>
import Star from '../../components/Star.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { StarData } from '../../static/index';

export default {
  name: 'StarDemo',
  components: { Star, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: StarData.usage,
    starValue: 1,
    disabledStarValue: 3,
    customStarValue: 5,
    starsCount: 20
  })
};
</script>

<style lang="less"></style>
