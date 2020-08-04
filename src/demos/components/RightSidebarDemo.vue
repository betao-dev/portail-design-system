<template>
  <div class="row-col">
    <h3>RightSidebar</h3>
    <p>
      RightSidebar component is used to show the sidebar in the right of the
      page
    </p>
    <Description compnent-name="RightSidebar"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="right-sidebar-toggle">
      <Button @click="toggleRightSidebar">Toggle Sidebar</Button>
    </div>
    <RightSidebar :opened.sync="showSidebar">
      <div slot="content">
        <div class="sidebar-header">
          <div class="title">Sidebar Title</div>
          <div class="close" @click="toggleRightSidebar">
            <Icon size="14px" color="white" close />
          </div>
        </div>
      </div>
    </RightSidebar>
  </div>
</template>

<script>
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser';
import RightSidebar from '../../components/RightSidebar';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { RightSidebarData } from '../../static/index';

export default {
  name: 'RightSidebarDemo',
  components: {
    Description,
    Collapser,
    RightSidebar,
    Button,
    Icon
  },
  data: () => ({
    usage: RightSidebarData.usage,
    openUsage: true,
    showSidebar: false
  }),
  methods: {
    toggleRightSidebar() {
      this.showSidebar = !this.showSidebar;
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/vars';

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d3047;
  height: 58px;
  padding: 0 24px;
  color: white;

  .title {
    font-family: @robotoFont;
  }

  .close {
    width: 16px;
    height: 16px;
    border-radius: 9px;
    border: solid 1px white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
