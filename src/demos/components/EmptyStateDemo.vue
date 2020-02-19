<template>
  <div class="row-col">
    <h3>EmptyState</h3>
    <p>Empty state component for empty pages</p>

    <Description compnent-name="EmptyState"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <EmptyState v-model="details"></EmptyState>
  </div>
</template>

<script>
import EmptyState from '../../components/EmptyState';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { EmptyStateData } from '../../static/index';

export default {
  name: 'EmptyStateDemo',
  components: { EmptyState, Collapser, Description },
  data: () => ({
    usage: EmptyStateData.usage,
    openUsage: true,
    details: EmptyStateData.details
  })
};
</script>

<style lang="less" scoped></style>
