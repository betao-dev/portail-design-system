<template>
  <div class="row-col">
    <h3>Menu</h3>

    Basic styled componnet: items, click event
    <Description compnent-name="Menu"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Button
      ref="menuDrop"
      @click="dropdownOpenedMenu = !dropdownOpenedMenu"
      class="ds-demo-menu-btn"
      >Open menu</Button
    >
    <Dropdown
      :target="$refs.menuDrop"
      :opened.sync="dropdownOpenedMenu"
      :position="positionMenu"
    >
      <Menu :items="items" @item:click="menuClick" />
    </Dropdown>
  </div>
</template>

<script>
import Button from '../../components/Button.vue';
import Dropdown from '../../components/Dropdown.vue';
import Menu from '../../components/Menu.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { MenuData } from '../../static/index';

export default {
  name: 'MenuDemo',
  components: { Button, Dropdown, Menu, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: MenuData.usage,
    dropdownOpenedMenu: false,
    positionMenu: 'bottom-right',
    items: [
      { title: 'Parameters du compte', icon: 'send', disabled: true },
      { title: 'Se deconnecter', icon: 'search' }
    ],
    title: 'Select your item'
  }),
  methods: {
    menuClick() {
      this.dropdownOpenedMenu = false;
    }
  }
};
</script>

<style lang="less" scoped>
.ds-demo-menu-btn {
  margin-right: 15px;
}
</style>
