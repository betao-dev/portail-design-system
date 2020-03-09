<template>
  <div class="ds-grid grid-select-demo">
    <div class="row-col">
      <h3>GridSelect</h3>

      Render items in a table with optional labels at the top and an ability to
      select an item. Used in the Datepicker component
      <Description compnent-name="GridSelect"></Description>
      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      <GridSelect
        :items="[
          [1, 2, 3],
          [4, { title: 5, disabled: true }, 6],
          [7, 8, 9]
        ]"
        :labels-top="['A', 'B', 'C']"
        v-model="selected"
      ></GridSelect>

      <!-- Using scoped slot -->
      <GridSelect
        :items="[
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ]"
        :labels-top="['A', 'B', 'C']"
        v-model="selected"
        #default="{item}"
      >
        {{ item + 10 }}
      </GridSelect>
    </div>
  </div>
</template>

<script>
import GridSelect from '../../components/GridSelect';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { GridSelectData } from '../../static/index';

export default {
  name: 'GridSelectDemo',
  data: () => ({
    openUsage: true,
    usage: GridSelectData.usage,
    selected: {}
  }),
  components: {
    GridSelect,
    Description,
    Collapser
  }
};
</script>

<style scoped>
.ds-grid-select {
  display: inline-table;
  margin: 10px;
  width: 300px;
}
</style>
