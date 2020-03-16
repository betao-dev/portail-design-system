<template>
  <div class="row-col">
    <h3>MultiSelectDropdown</h3>

    Custom multi select dropdown
    <Description compnent-name="MultiSelectDropdown"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="example-wrapper">
      <MultiSelectDropdown
        sm
        label="Multi Select Small"
        class="example"
        v-model="multiSelectValue1"
        :options="options"
        :validators="multiSelectValidators"
        :placeholder="'Input Value'"
        :idMode="true"
      />

      <MultiSelectDropdown
        md
        label="Multi Select Medium"
        class="example"
        v-model="multiSelectValue2"
        :options="options"
        :validators="multiSelectValidators"
        :placeholder="'Input Value'"
        :idMode="true"
      />

      <MultiSelectDropdown
        lg
        label="Multi Select Large"
        class="example"
        v-model="multiSelectValue3"
        :options="options"
        :validators="multiSelectValidators"
        :placeholder="'Input Value'"
        :idMode="true"
      />
    </div>
  </div>
</template>

<script>
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { MultiSelectDropdownData } from '../../static/index';

export default {
  name: 'MultiSelectDropdownDemo',
  components: { MultiSelectDropdown, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: MultiSelectDropdownData.usage,
    multiSelectValue1: [
      {
        id: 1,
        value: 'Espèces'
      },
      {
        id: 2,
        value: 'Chèque'
      }
    ],
    multiSelectValue2: [],
    multiSelectValue3: [],
    options: [
      {
        id: 1,
        value: 'Espèces'
      },
      {
        id: 2,
        value: 'Chèque'
      },
      {
        id: 3,
        value: 'Virement'
      },
      {
        id: 4,
        value: 'Carte bancaire'
      },
      {
        id: 5,
        value: 'Tout moyen de paiement',
        deselectAll: true
      }
    ],
    multiSelectValidators: [
      {
        name: 'required',
        message: 'The field is required',
        validator: value => value && !!value.length
      }
    ]
  })
};
</script>

<style lang="less" scoped>
.example-wrapper {
  display: flex;
  align-items: center;

  .example {
    margin-right: 10px;
  }
}
</style>
