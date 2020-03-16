<template>
  <div class="row-col">
    <h3>Help</h3>
    <p>
      Help component it's a custom version of Tooltip component not based on
      Tooltip component
    </p>

    <Description compnent-name="Help"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Help placement="right">
      <div slot="popover">
        C'est vraiment pratique, l’utilisation du mini TPE est très complète (en
        plus d’être beaucoup moins cher qu'un TPE classique en location).
      </div>

      <Button slot="reference" padding="10px">Custom Tooltip</Button>
    </Help>
  </div>
</template>

<script>
import Help from '../../components/Help';
import Button from '../../components/Button';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { HelpData } from '../../static/index';

export default {
  name: 'HelpDemo',
  components: { Help, Button, Collapser, Description },
  data: () => ({
    usage: HelpData.usage,
    openUsage: true
  })
};
</script>

<style lang="less" scoped></style>
