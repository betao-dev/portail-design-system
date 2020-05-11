<template>
  <div id="app" class="main-container">
    <Sidebar
      @item:click="sidebarClick"
      :items="sidebarItems"
      :activeKey="(item, index) => item.hash"
      :active.sync="sidebarActiveItem"
      :activeChild.sync="sidebarActiveChild"
      :opened.sync="sidebarOpened"
      :subSectionOpened.sync="subSectionOpened"
      alt
    ></Sidebar>
    <AppHeader>
      <template #left>
        <Button
          id="ds-open-sidebar-button"
          icon="menu"
          plain
          @click="sidebarOpened = !sidebarOpened"
        />
      </template>
      Portail v3 Design System
    </AppHeader>
    <div class="main-content ds-grid">
      <div class="row-col">
        Links:
        <a href="https://github.com/betao-dev/portail-design-system">
          Github Repo
        </a>
        |
        <a href="https://projects.invisionapp.com/dsm/betao/portail-v-3">
          Invision (DSM)
        </a>
        |
        <a href="https://www.npmjs.com/package/@betao/ds">
          NPM package
        </a>

        <h2>Installation</h2>
        <pre v-highlightjs="installation"><code class="bash"></code></pre>

        <h2>Usage</h2>
        In javascript:
        <pre v-highlightjs="usageJs"><code class="js"></code></pre>
        In Less (variables and font mixins):
        <pre v-highlightjs="usageLess"><code class="less"></code></pre>

        <h2>Main Layout</h2>
        <pre v-highlightjs="usageLayout"><code class="html"></code></pre>

        <h2>Vertical Rhythm</h2>
        Vertical Rhythm is used to guide in aligning all the objects on the
        screen vertically.
        <br />
        All object are aligned vertically using 4px (@vu less variable) as a
        core unit.
      </div>

      <GridDemo></GridDemo>
      <ColorsDemo></ColorsDemo>
      <TextDemo></TextDemo>
      <IconsDemo></IconsDemo>
      <ComponentsDemo></ComponentsDemo>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import AppHeader from './components/AppHeader.vue';
import Button from './components/Button.vue';

import GridDemo from './demos/GridDemo.vue';
import ColorsDemo from './demos/ColorsDemo.vue';
import TextDemo from './demos/TextDemo.vue';
import IconsDemo from './demos/IconsDemo.vue';
import ComponentsDemo from './demos/ComponentsDemo.vue';

let usageJs = `
import components from '@betao/ds' // Vue components
import '@betao/ds/css'             // Load prebuilt css
`.slice(1);

let usageLess = `
@import '~@betao/ds/vars';

.some-class {
  /* For list of color variables see Colors */
  color: @color-dark;
  /* For list of font mixins see Font Styles */
  .font-desktop-body-medium-dark-center();
}
`.slice(1);

let usageLayout = `
<!-- Root element -->
<div class="main-container">
  <!-- Sidebar component -->
  <div class="sidebar">
    <!-- ... -->
  </div>
  <!-- Rest of the app -->
  <div class="main-content">
    <!-- ... -->
  </div>
</div>
`.slice(1);

let sidebarIcons = [
  'assignment_outline',
  'receipt_outline',
  'group_outline',
  'work_outline',
  'assessment_outline',
  'new_releases_outline',
  'help_outline'
];

let docHeaders = [];

export default {
  name: 'App',
  components: {
    AppHeader,
    Button,
    Sidebar,
    GridDemo,
    ColorsDemo,
    TextDemo,
    IconsDemo,
    ComponentsDemo
  },
  data: () => ({
    installation: `$ npm install "@betao/ds" --save`,
    usageJs,
    usageLess,
    usageLayout,
    sidebarItems: [],
    sidebarActiveItem: 0,
    sidebarActiveChild: 0,
    sidebarOpened: false,
    subSectionOpened: false
  }),
  methods: {
    sidebarClick(item) {
      if (!item.children || !item.children.length) {
        window.location.hash = item.hash;
        this.sidebarOpened = false;
      }
    },
    handleScroll() {
      let vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = 0; i < docHeaders.length; i++) {
        let rect = docHeaders[i].getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= vh) {
          this.sidebarActiveItem = docHeaders[i].id.split(' - ')[0];
          this.sidebarActiveChild = docHeaders[i].id;
          break;
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // Compile sidebar items automatically from h2 and h3 headers
    docHeaders = document.querySelectorAll('h2, h3');
    let sidebarItems = [];
    let parentHeader = null;
    let children = [];

    for (var i = 0; i <= docHeaders.length; i++) {
      if (docHeaders[i] === undefined || docHeaders[i].tagName === 'H2') {
        if (parentHeader != null) {
          sidebarItems.push({
            icon: sidebarIcons[sidebarItems.length % sidebarIcons.length],
            title: parentHeader.innerText,
            hash: parentHeader.id,
            children
          });
        }
        if (docHeaders[i] === undefined) {
          break;
        }
        docHeaders[i].id = docHeaders[i].innerText;
        parentHeader = docHeaders[i];
        children = [];
      } else {
        // if H3
        docHeaders[i].id = parentHeader.id + ' - ' + docHeaders[i].innerText;
        children.push({
          title: docHeaders[i].innerText,
          hash: docHeaders[i].id
        });
      }
    }
    sidebarItems[0].badge = { text: 2, color: 'red' };
    sidebarItems[sidebarItems.length - 1].badge = {
      text: 'New',
      color: 'primary'
    };

    this.sidebarItems = sidebarItems;
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style lang="less">
@import './styles/main';
@import './styles/grid';
@import './styles/vars';

/* "Reset" */
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

.main-content {
  padding-bottom: 200px;
}

code {
  padding: 20px !important;
}

.dropzone .dz-message {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
