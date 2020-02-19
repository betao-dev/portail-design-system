<template>
  <div class="row-col">
    <h3>Badge</h3>
    Badge with an optional icon
    <Description compnent-name="Badge"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>
    <div class="badges">
      <Badge color="red">Annulée</Badge>
      <Badge color="gray">Brouillon</Badge>
      <Badge color="dark">En retard</Badge>
      <Badge color="primary">Payé</Badge>
      <Badge color="yellow">En attente</Badge>
      <Badge color="primary" icon="check_circle_outline" icon-size="20px"
        >Done</Badge
      >
      <Badge color="yellow" icon="query_builder" icon-size="20px"
        >Proccessing</Badge
      >
      <Badge color="red" icon="error_outline" icon-size="20px"
        >Needs Response</Badge
      >
    </div>
  </div>
</template>

<script>
import Badge from '../../components/Badge.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { BadgeData } from '../../static/index';

export default {
  name: 'BadgeDemo',
  components: { Badge, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: BadgeData.usage
  })
};
</script>

<style lang="less" scoped>
.badges {
  display: flex;
  justify-content: space-between;
}
</style>
