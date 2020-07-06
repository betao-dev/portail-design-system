<template>
  <div class="row-col">
    <h3>Radio</h3>
    <p>Radio component is used to create a group of radio buttons</p>

    <Description compnent-name="Radio"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="radio-wrapper">
      <Radio v-model="value" :list="radioList" radioColor="#1EB386" />
    </div>
    <div class="radio-wrapper">
      <Radio
        v-model="value2"
        :list="radioList2"
        radioColor="#1EB386"
        objectMode
      />
    </div>
    <div class="radio-wrapper">
      <Radio
        v-model="value3"
        :list="radioList2"
        radioColor="#1EB386"
        objectMode
        disabled
      />
    </div>
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
    value2: undefined,
    value3: undefined,
    radioList: [
      {
        title: 'Madame'
      },
      {
        title: 'Monsieur'
      }
    ],
    radioList2: [
      {
        id: 1,
        title: 'Vente de marchandises'
      },
      {
        id: 2,
        title: 'Prestation de services'
      }
    ]
  })
};
</script>

<style lang="less" scoped>
.radio-wrapper {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
