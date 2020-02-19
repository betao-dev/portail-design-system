<template>
  <div class="row-col">
    <h3>Icon</h3>

    An icon of a specific size (default 24px), with optional padding for easier
    alignment and color property that supports
    <a href="#Colors">color variables</a>.
    <Description compnent-name="Icon"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>
    <div class="ds-icon-demo-wrapper">
      <Icon account_circle size="12px" padding="30px 2px" />
      <Icon account_circle size="16px" padding="28px 2px" color="primary" />
      <Icon account_circle padding="24px 2px" color="blue" />
      <Icon account_circle size="36px" padding="18px 2px" color="red" />
      <Icon account_circle size="52px" padding="10px 2px" color="gray-400" />
      <Icon account_circle size="72px" color="#55aaff" :tooltip="tooltip" />
    </div>
  </div>
</template>

<script>
import Icon from '../../components/Icon.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { IconData } from '../../static/index';

export default {
  name: 'IconDemo',
  components: { Icon, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: IconData.usage,
    tooltip: 'This is an explanation of what the field is used for.'
  })
};
</script>

<style lang="less">
.ds-icon-demo-wrapper {
  display: flex;
  height: 80px;
}
</style>
