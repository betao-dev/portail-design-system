<template>
  <div class="row-col">
    <h3>Badge</h3>
    Badge with an optional icon
    <Description compnent-name="Badge"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>
    <div class="badges">
      <Badge mark color="red" @click="toggleActive" :active="active">
        Annulée
      </Badge>

      <Badge mark color="gray-400" @click="toggleActive" :active="active">
        Brouillon
      </Badge>

      <Badge mark color="dark" @click="toggleActive" :active="active">
        En retard
      </Badge>

      <Badge mark color="primary" @click="toggleActive" :active="active">
        Payé
      </Badge>

      <Badge mark color="yellow" @click="toggleActive" :active="active">
        En attente
      </Badge>

      <Badge
        color="primary"
        icon="check_circle_outline"
        icon-size="10px"
        icon-color="red"
        @click="toggleActive"
        :active="active"
      >
        Done
      </Badge>

      <Badge
        color="yellow"
        icon="query_builder"
        icon-size="10px"
        icon-color="red"
        @click="toggleActive"
        :active="active"
      >
        Proccessing
      </Badge>

      <Badge
        color="red"
        icon="error_outline"
        icon-size="10px"
        icon-color="red"
        @click="toggleActive"
        :active="active"
      >
        Needs Response
      </Badge>
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
    usage: BadgeData.usage,
    active: false
  }),
  methods: {
    toggleActive() {
      this.active = !this.active;
    }
  }
};
</script>

<style lang="less" scoped>
.badges {
  display: flex;
  justify-content: space-between;
}
</style>
