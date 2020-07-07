<template>
  <div class="row-col">
    <h3>CollapserMenu</h3>
    <p>CollapserMenu component for displaying a list of collapse components</p>

    <Description compnent-name="CollapserMenu"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="ds-collapser-menu-wrapper">
      <CollapserMenu
        :active.sync="active"
        :titles="titles"
        :status-data="statusData"
      >
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
    <div class="ds-collapser-menu-wrapper">
      <CollapserMenu
        :active.sync="secondActive"
        :count-items="3"
        :header-slot-active="headerSlotActive"
      >
        <template #header1>
          <div>
            Custom header 1
          </div>
        </template>
        <template #1>
          <div class="ds-demo-collapser-menu-content">
            First Step body
          </div>
        </template>

        <template #header2>
          <div>
            Custom header 2
          </div>
        </template>
        <template #2>
          <div class="ds-demo-collapser-menu-content">
            Second Step body
          </div>
        </template>

        <template #header3>
          <div>
            Custom header 3
          </div>
        </template>
        <template #3>
          <div class="ds-demo-collapser-menu-content">
            Third Step body
          </div>
        </template>
      </CollapserMenu>
    </div>
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
    active: 1,
    secondActive: 1,
    headerSlotActive: true,
    statusData: [
      { name: 1, status: true, active: true },
      { name: 2, status: false, active: true },
      { name: 3, status: true, active: true }
    ]
  })
};
</script>

<style lang="less" scoped>
@import '../../styles/vars';
.ds-demo-collapser-menu-content {
  padding: @collapser-body-padding;
}

.ds-collapser-menu-wrapper {
  margin-top: 50px;
}
</style>
