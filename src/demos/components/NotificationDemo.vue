<template>
  <div class="row-col">
    <h3>Notification</h3>
    <p>Notification component for displaying notifications data</p>

    <Description compnent-name="Notification"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Notification/>
  </div>
</template>

<script>
  import Collapser from '../../components/Collapser';
  import Description from '../../descriptions/Description';
  import Notification from '../../components/Notification';
  import { NotificationData } from '../../static/index';

  export default {
    name: 'NotificationDemo',
    components: { Collapser, Description, Notification },
    data: () => ({
      usage: NotificationData.usage,
      openUsage: true
    })
  };
</script>

<style lang="less" scoped>

</style>
