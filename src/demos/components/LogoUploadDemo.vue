<template>
  <div class="row-col">
    <h3>LogoUpload</h3>

    <Description compnent-name="LogoUpload"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="row logo-upload">
      <LogoUpload v-model="file" />
    </div>
  </div>
</template>

<script>
import LogoUpload from '../../components/LogoUpload';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser';
import { LogoUploadData } from '../../static/index';

export default {
  name: 'LogoUploadDemo',
  components: {
    LogoUpload,
    Description,
    Collapser
  },
  data: () => ({
    openUsage: true,
    usage: LogoUploadData.usage,
    file: null
  }),
  methods: {}
};
</script>
