<template>
  <div class="row-col">
    <h3>NumberRange</h3>
    <p>NumberRange component for displaying Range of Numbers</p>

    <Description compnent-name="NumberRange"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="examples">
      <NumberRange
        sm
        class="example"
        prefix="€"
        placeholder="Number Range"
        :minLimit="0"
        :maxLimit="200"
        :min="0"
        :max="0"
        @change:range="rangeUpdate"
      />

      <NumberRange
        md
        class="example"
        prefix="€"
        placeholder="Number Range Select"
        :minLimit="0"
        :maxLimit="200"
        :min="0"
        :max="0"
        @change:range="rangeUpdate"
      />

      <NumberRange
        lg
        class="example"
        prefix="€"
        placeholder="Number Range Select"
        :minLimit="0"
        :maxLimit="200"
        :min="0"
        :max="0"
        @change:range="rangeUpdate"
      />
    </div>
  </div>
</template>

<script>
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import NumberRange from '../../components/NumberRange';
import { NumberRangeData } from '../../static/index';

export default {
  name: 'NumberRangeDemo',
  components: { Collapser, Description, NumberRange },
  data: () => ({
    usage: NumberRangeData.usage,
    openUsage: true
  }),
  methods: {
    rangeUpdate() {}
  }
};
</script>

<style lang="less" scoped>
.examples {
  display: flex;
  align-items: center;

  .example {
    margin-right: 10px;
  }
}
</style>
