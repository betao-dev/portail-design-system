<template>
  <div class="row-col">
    <h3>Select</h3>

    Custom Select component
    <Description compnent-name="Select"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="row-col">
      <Select
        lg
        class="ds-select-demo"
        v-model="selectValue"
        label="Select"
        :options="options"
        :validators="selectValidators"
        :placeholder="'Input Value'"
        :idMode="true"
      />

      <Select
        md
        class="ds-select-demo"
        v-model="selectValue2"
        label="Select"
        help="This is an explanation of what the select is used for."
        :options="options"
        :idMode="true"
      />

      <Select
        lg
        class="ds-select-demo"
        v-model="selectValue3"
        label="Select"
        :options="options2"
        :validators="selectValidators"
        :placeholder="'Input Value'"
        :idMode="true"
        :option-styles="optionStyles"
        custom-content
        reversible-icon
      >
        <template #1>
          <div class="ds-demo-square ds-demo-red-square"></div>
        </template>
        <template #2>
          <div class="ds-demo-square ds-demo-green-square"></div>
        </template>
      </Select>
    </div>
  </div>
</template>

<script>
import Select from '../../components/Select';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { SelectData } from '../../static/index';

export default {
  name: 'SelectDemo',
  components: { Select, Description, Collapser },
  data() {
    return {
      openUsage: true,
      usage: SelectData.usage,
      selectValue: '',
      selectValue2: { id: 1 },
      selectValue3: '',
      options: [
        { id: 1, value: 'Espèces' },
        { id: 2, value: 'Chèque' },
        { id: 3, value: 'Virement' },
        { id: 4, value: 'Carte bancaire' }
      ],
      options2: [
        { id: 1, value: 'Espèces' },
        { id: 2, value: 'Chèque' }
      ],
      selectValidators: [
        {
          name: 'required',
          message: this.dsTranslate('Field Required'),
          validator: value => value && !!value
        }
      ],
      optionStyles: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    };
  }
};
</script>

<style lang="less" scoped>
.ds-select-demo {
  margin-bottom: 50px;
}

.ds-demo-square {
  width: 20px;
  height: 20px;
}

.ds-demo-red-square {
  background-color: red;
}

.ds-demo-green-square {
  background-color: green;
}
</style>
