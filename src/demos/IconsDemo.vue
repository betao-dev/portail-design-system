<template>
  <div class="grid">
    <div class="row-col">
      <h2>Icons</h2>

      See also: <a href="#Components - Icon">Icon component</a>

      <pre v-highlightjs="usageJs"><code class="js"></code></pre>

    </div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-6" v-for="icon in icons" :key="icon">
        <Card class="icon-demo" >
          <div class="icon" v-html="context(icon)"></div>
          {{ icon.slice(2, -4) }}
          <br>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
let usageJs = `
import icons from '@betao/ds/icons'

icons['arrow_right'] // => '<svg>...</svg>' code
`.slice(1)

let context = require.context('@/icons', true, /\.svg$/)
let icons = context.keys()

import Card from '../components/Card.vue'

export default {
  name: 'IconsDemo',
  components: { Card },
  data: () => ({
    usageJs,
    icons,
    context,
  })
}
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
  }
}
</style>
