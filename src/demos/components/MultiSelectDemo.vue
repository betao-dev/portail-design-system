<template>
  <div class="row-col">
    <h3>MultiSelect</h3>
    <p>MultiSelect checkbox list</p>

    <Description compnent-name="MultiSelect"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <MultiSelect
      v-model="multiSelectValue"
      :options="options"
      title="Type:"
      titleIcon="tags-solid"
    >
    </MultiSelect>
  </div>
</template>

<script>
import MultiSelect from '../../components/MultiSelect.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { MultiSelectData } from '../../static/index';

export default {
  name: 'MultiSelectDemo',
  components: { MultiSelect, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: MultiSelectData.usage,
    multiSelectValue: [
      {
        id: 1,
        value: 'Bricolage'
      }
    ],
    options: [
      {
        id: 1,
        value: 'Bricolage'
      },
      {
        id: 2,
        value: 'Déménagement'
      },
      {
        id: 3,
        value: 'Menage'
      }
    ]
  })
};
</script>

<style lang="less" scoped></style>
