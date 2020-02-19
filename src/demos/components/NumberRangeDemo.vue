<template>
  <div class="row-col">
    <h3>NumberRange</h3>
    <p>NumberRange component for displaying Range of Numbers</p>

    <Description compnent-name="NumberRange"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <NumberRange
      :minLimit="0"
      :maxLimit="200"
      :min="10"
      :max="100"
      prefix="€"
    />
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
  })
};
</script>

<style lang="less" scoped></style>
