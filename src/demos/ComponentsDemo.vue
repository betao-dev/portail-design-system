<template>
  <div class="ds-grid">
    <div class="row-col">
      <h2>Components</h2>

      <h3>Usage</h3>
      In vanilla javascript:
      <pre v-highlightjs="usage"><code class="js"></code></pre>
    </div>

    <component v-for="demo in componentDemos" :is="demo" :key="demo.name" />
  </div>
</template>

<script>
import { ComponentsData } from '../static/index';

let context = require.context('./components', false, /.*\.vue$/);
let componentDemos = context.keys().map(key => context(key).default);

export default {
  name: 'ComponentsDemo',
  data: () => ({
    usage: ComponentsData.usage,
    componentDemos
  })
};
</script>
