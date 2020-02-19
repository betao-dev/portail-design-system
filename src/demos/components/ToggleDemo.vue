<template>
  <div class="row-col">
    <h3>Toggle</h3>
    <p>Custom toggle component</p>

    <Description compnent-name="Toggle"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Toggle v-model="value" label="A company"></Toggle>
  </div>
</template>

<script>
import Toggle from '../../components/Toggle.vue';
import Description from '../../descriptions/Description.vue';
import Collapser from '../../components/Collapser.vue';
import { ToggleData } from '../../static/index';

export default {
  name: 'ToggleDemo',
  components: { Toggle, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: ToggleData.usage,
    value: true
  })
};
</script>

<style lang="less" scoped></style>
