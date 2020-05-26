<template>
  <div class="row-col">
    <h3>Tooltip</h3>

    A styled tooltip
    <Description compnent-name="Tooltip"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="row-col tooltip-buttons">
      <Tooltip placement="right">
        <div slot="popover">
          C'est vraiment pratique, l’utilisation du mini TPE est très complète
          (en plus d’être beaucoup moins cher qu'un TPE classique en location).
        </div>

        <Button slot="reference" padding="10px">Dark Tooltip</Button>
      </Tooltip>
    </div>

    <div class="row-col tooltip-buttons">
      <Tooltip white placement="right">
        <div slot="popover">
          C'est vraiment pratique, l’utilisation du mini TPE est très complète
          (en plus d’être beaucoup moins cher qu'un TPE classique en location).
        </div>

        <Button slot="reference" padding="10px">White Tooltip</Button>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import Tooltip from '../../components/Tooltip';
import Button from '../../components/Button.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { TooltipData } from '../../static/index';

export default {
  name: 'TooltipDemo',
  components: { Tooltip, Description, Collapser, Button },
  data: () => ({
    openUsage: true,
    usage: TooltipData.usage
  }),
  methods: {}
};
</script>

<style lang="less" scoped>
@import '../../styles/vars';

.tooltip-buttons {
  margin-bottom: 20px;
}
</style>
