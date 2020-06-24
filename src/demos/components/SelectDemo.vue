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
        alt-icon
        class="ds-select-demo"
        v-model="selectValue3"
        :options="options2"
        :validators="selectValidators"
        placeholder="Enter a percentage"
        id-mode
        :option-styles="optionStyles"
        custom-content
        reversible-icon
        width="414px"
      >
        <template #1>
          <div class="ds-demo-square">
            <Icon percent-solid size="18px" color="primary"></Icon>
          </div>
        </template>
        <template #2>
          <div class="ds-demo-square">
            <Icon euro_symbol size="18px" color="primary"></Icon>
          </div>
        </template>
      </Select>
    </div>
  </div>
</template>

<script>
import Select from '../../components/Select';
import Icon from '../../components/Icon';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { SelectData } from '../../static/index';

export default {
  name: 'SelectDemo',
  components: { Select, Icon, Description, Collapser },
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
        justifyContent: 'space-between',
        alignItems: 'center'
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 50px;
  border-radius: 4px;
  background-color: rgba(30, 179, 134, 0.1);
}
</style>
