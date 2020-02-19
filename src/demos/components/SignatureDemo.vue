<template>
  <div class="row-col">
    <h3>Signature</h3>
    <p>Signature component for make signatures</p>

    <Description compnent-name="Signature"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Signature v-model="data"></Signature>
  </div>
</template>

<script>
import Signature from '../../components/Signature';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { SignatureData } from '../../static/index';

export default {
  name: 'SignatureDemo',
  components: { Signature, Collapser, Description },
  data: () => ({
    usage: SignatureData.usage,
    openUsage: true,
    data: undefined
  })
};
</script>

<style lang="less" scoped></style>
