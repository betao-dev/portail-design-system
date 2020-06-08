<template>
  <div class="row-col">
    <h3>Palette</h3>
    <p>Palette component for display gradients of colors</p>

    <Description compnent-name="Palette"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Palette
      v-model="palette"
      :colors="colors"
      :opacities="opacities"
      auto-init
    ></Palette>
  </div>
</template>

<script>
import Palette from '../../components/Palette';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { PaletteData } from '../../static/index';

export default {
  name: 'PaletteDemo',
  components: { Palette, Collapser, Description },
  data: () => ({
    usage: PaletteData.usage,
    openUsage: true,
    palette: [],
    colors: ['#778CA2', '#1EB386', '#09AFFF', '#745BCC', '#F03F3F'],
    opacities: [1, 0.6, 0.33]
  })
};
</script>

<style lang="less" scoped></style>
