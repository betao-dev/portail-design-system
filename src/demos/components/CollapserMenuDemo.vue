<template>
  <div class="row-col">
    <h3>CollapserMenu</h3>
    <p>CollapserMenu component for displaying a list of collapse components</p>

    <Description compnent-name="CollapserMenu"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <CollapserMenu :active.sync="active" :titles="titles">
      <template #1>
        <div class="ds-demo-collapser-menu-content">
          First Step
        </div>
      </template>
      <template #2>
        <div class="ds-demo-collapser-menu-content">
          Second Step
        </div>
      </template>
      <template #3>
        <div class="ds-demo-collapser-menu-content">
          Third Step
        </div>
      </template>
    </CollapserMenu>
  </div>
</template>

<script>
import CollapserMenu from '../../components/CollapserMenu';
import Description from '../../descriptions/Description';
import { CollapserMenuData } from '../../static/index';

export default {
  name: 'CollapserMenuDemo',
  components: { CollapserMenu, Description },
  data: () => ({
    usage: CollapserMenuData.usage,
    openUsage: true,
    titles: ['First', 'Second', 'Third'],
    active: 1
  })
};
</script>

<style lang="less" scoped>
@import '../../styles/vars';
.ds-demo-collapser-menu-content {
  padding: @collapser-body-padding;
}
</style>
