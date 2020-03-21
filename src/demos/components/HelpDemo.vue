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

    <div class="ds-demo-help-wrapper">
      <Button ref="help" padding="30px" alt-two>
        Custom Tooltip
      </Button>
      <Help :target="$refs.help" :position="position" :margin="20">
        <div class="ds-help-content">
          New Tooltip
        </div>
      </Help>
    </div>

    <div class="ds-demo-help-wrapper">
      <Button ref="helpDark" padding="30px" alt-two>
        Dark Custom Tooltip
      </Button>
      <Help :target="$refs.helpDark" :position="position" :margin="20" dark>
        <div class="ds-help-content">
          New Tooltip
        </div>
      </Help>
    </div>
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
    openUsage: true,
    position: 'right-center'
  })
};
</script>

<style lang="less" scoped>
.ds-demo-help-wrapper {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.ds-help-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
}
</style>
