<template>
  <div class="row-col">
    <h3>Collapser</h3>
    <p>Collapser component for displaying collapsible content</p>

    <Description compnent-name="Collapser"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="collapser-demo-wrapper">
      <Collapser
        :opened.sync="openCollapser"
        :label="label"
        titleAlignment="left"
      >
        <p>We are the stewards of the hierarchy</p>
      </Collapser>
    </div>
  </div>
</template>

<script>
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { CollapserData } from '../../static/index';

export default {
  name: 'CollapserDemo',
  components: { Collapser, Description },
  data: () => ({
    usage: CollapserData.usage,
    openUsage: true,
    data: undefined,
    label: 'Collapser',
    openCollapser: false
  })
};
</script>

<style lang="less" scoped>
.collapser-demo-wrapper {
  margin-top: 50px;
}
</style>
