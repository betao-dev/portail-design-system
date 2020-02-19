<template>
  <div class="ds-grid">
    <div class="row-col">
      <h2>Icons</h2>

      See also: <a href="#Components - Icon">Icon component</a>

      <pre v-highlightjs="usage"><code class="js"></code></pre>
    </div>
    <div class="row">
      <div class="col-12"></div>
      <div class="col-6" v-for="icon in icons">
        <div class="ds-card icon-demo">
          <div class="icon" v-html="context(icon)"></div>
          {{ icon.slice(2, -4) }}
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IconsData } from '../static/index';

let context = require.context('@/icons', true, /\.svg$/);
let icons = context.keys();

export default {
  name: 'IconsDemo',
  data: () => ({
    usage: IconsData.usage,
    icons,
    context
  })
};
</script>

<style lang="less">
@import '~@/styles/vars';

.icon-demo {
  margin-bottom: @vu * 2;

  .icon {
    display: inline-block;
    vertical-align: bottom;
    height: 24px;
    width: 24px;
    padding-right: 24px;

    > svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
