<template>
  <div class="row-col">
    <h3>Radio</h3>
    <p>Radio component is used to create a group of radio buttons</p>

    <Description compnent-name="Radio"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Radio
      v-model="value"
      :list="radioList"
      radioColor="#1EB386"
    />
  </div>
</template>

<script>
import Radio from '../../components/Radio.vue';
import Description from '../../descriptions/Description.vue';
import Collapser from '../../components/Collapser.vue';
import { RadioData } from '../../static/index';

export default {
  name: 'RadioDemo',
  components: { Radio, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: RadioData.usage,
    value: undefined,
    radioList: [
      {
        title: 'Madame'
      },
      {
        title: 'Monsieur'
      }
    ]
  })
};
</script>

<style lang="less" scoped></style>
